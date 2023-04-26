import React, { useEffect, useState } from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  NativeSelect,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import { db } from "data/firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { CustomTextField } from "../../../components/CustomTextField";
import { CustomDatePicker } from "Admin/components/CustomDatePicker";
import "./AddCar.css";

function AddCar(props) {
  const { activeButton, setActiveButton } = props;
  //set show/hide form
  const [open, setOpen] = React.useState(true);
  // const [post, setPost] = useState();
  const handleOpen = () => {
    // console.log("da click vao add post");
  };
  // const addPost = () => {};
  const handleClose = () => {
    setActiveButton(false);
  };
  //implement add image and video
  const [uploadData, setUploadData] = useState({
    description: "",
    file: {
      type: "",
      name: "",
      data: "",
    },
  });

  const [progress, setProgress] = useState("");

  const uploadToFirebaseDB = (fileData) => {
    // uploading to collection called posts
    db.collection("posts")
      .add({
        profile: photoURL,
        username: displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        description: uploadData.description,
        fileType: uploadData.file.type,
        fileName: uploadData.file.name,
        fileData: fileData,
      })
      .then(() => resetState());
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();

    // verify atleast one of the input fields are not empyt
    if (uploadData.description || uploadData.file.data) {
      // if file input is true...upload the file to Fire-Store
      if (uploadData.file.data) {
        const id = uuid();
        const uploadTask = storage
          .ref(`posts/${id}`)
          .putString(uploadData.file.data, "data_url");
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const value = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(value);
          },

          (error) => {
            alert(error);
          },

          () => {
            storage
              .ref("posts")
              .child(id)
              .getDownloadURL()
              .then((url) => uploadToFirebaseDB(url));
          }
        );

        // do not go further..
        return;
      }
      // if not file input provided
      uploadToFirebaseDB(uploadData.file.data);
    } else {
    }
  };

  // if file name is too long.. compress it
  const resetState = () => {
    setUploadData({
      description: "",
      file: {
        type: "",
        name: "",
        data: "",
      },
    });
    setProgress("");
  };
  //TODO : CUSTOM FIELD THÊM NHÀ XE
  const [formData, setFormData] = useState({});
  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    // try {
    //   const docRef = await addDoc(collection(db, "a"), {
    //     ...formData,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {}
  };
  const [garages, setGarages] = useState([]);
  const [selectedGarage, setSelectedGarage] = useState("");
  const [garageInfo, setGarageInfo] = useState([]);
  // Lấy danh sách ID từ bảng Garage
  useEffect(() => {
    const garagesCol = collection(db, "Garage");
    const unsubscribe = onSnapshot(garagesCol, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        const { Name, ID_Garage, Hotline } = doc.data();
        data.push({
          value: doc.id,
          label: Name,
          hotline: Hotline,
          ID_Garage: ID_Garage,
        });
      });
      setGarages(data);
    });
    return unsubscribe;
  }, []);
  //get Data từ Db dựa vào ID vừa lấy được ở phía select nhà xe
  useEffect(() => {
    const unsub = async () => {
      if (selectedGarage !== "") {
        const docRef = doc(db, "Garage", selectedGarage);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGarageInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("Error getting document:", error);
      }
    };
    unsub();
  }, [selectedGarage]);
 
  return (
    <DashboardLayout>
      <div className="addpost">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Paper className="paper" elevation={4}>
              <div>
                <div className="modalHeading">
                  <Typography>Thêm xe </Typography>
                  <IconButton>
                    <CloseIcon onClick={handleClose} />
                  </IconButton>
                </div>
                <div>
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <fieldset>
                      <FormControl className="Garage">
                        <NativeSelect
                          defaultValue={30}
                          inputProps={{
                            name: "NameGarage",
                            id: "uncontrolled-native",
                          }}
                          onChange={(e) => setSelectedGarage(e.target.value)}
                          value={selectedGarage}
                        >
                          {garages.map((item) => {
                            return (
                              <option value={item.value}>{item.label}</option>
                            );
                          })}
                        </NativeSelect>
                      </FormControl>
                      <TextField
                        disabled
                        id="standard-disabled"
                        label="ID Garage"
                        defaultValue="ID Garage"
                        variant="outlined"
                        name="ID_Garage"
                        value={garageInfo.ID_Garage}
                        onChange={handleChangeValue}
                        placeholder="ID Nhà xe"
                        className="RenderFromGarage Garage"
                      />
                      <TextField
                        disabled
                        id="standard-disabled"
                        label="Hotline"
                        defaultValue="Hotline"
                        variant="outlined"
                        name="Hotline"
                        value={garageInfo.Hotline}

                        placeholder="Hotline"
                        className="RenderFromGarage Garage"
                      />

                      <CustomTextField
                        label="Điểm đi"
                        name="PakingStart"
                        value={formData.PakingStart}
                        onChange={handleChangeValue}
                        placeholder="Điểm đi"
                        className="Garage RenderFromGarage"
                      />
                      <CustomTextField
                        label="Điểm đến"
                        name="PakingEnd"
                        value={formData.PakingEnd}
                        onChange={handleChangeValue}
                        placeholder="Điểm đến"
                        className="Garage RenderFromGarage"
                      />
                      <FormControl className="Garage RenderFromGarage">
                        <InputLabel
                          style={{ backgroundColor: "white" }}
                          id="demo-simple-select-required-label"
                          name="Price"
                          value={formData.Price}
                          onChange={handleChangeValue}
                        >
                          Giá vé
                        </InputLabel>
                        <OutlinedInput
                          value={formData.Owner}
                          onChange={handleChangeValue}
                          placeholder="Giá vé"
                          id="outlined-adornment-weight"
                          endAdornment={
                            <InputAdornment position="end">vnd</InputAdornment>
                          }
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />
                      </FormControl>
                      <CustomTextField
                        label="Biển số"
                        name="LicensePlate"
                        value={formData.LicensePlate}
                        onChange={handleChangeValue}
                        placeholder="Biển số"
                        className="Garage RenderFromGarage"
                      />
                      <FormControl
                        className="Garage RenderFromGarage"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel id="demo-simple-select-required-label">
                          Số ghế
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-required-label"
                          id="demo-simple-select-required"
                          className="Type  "
                          label="Age *"
                          defaultValue={1}
                          name="Seat"
                          value={formData.Seat}
                          onChange={handleChangeValue}
                        >
                          <MenuItem value={20}>Xe giường nằm 20 chỗ </MenuItem>
                          <MenuItem value={34}>Xe giường nằm 34 chỗ</MenuItem>
                          <MenuItem value={44}>Xe giường nằm 44 chỗ</MenuItem>
                        </Select>
                      </FormControl>
                      <CustomTextField
                        label="Thời gian hành trình"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChangeValue}
                        placeholder="Thời gian hành trình"
                      />
                      <CustomDatePicker
                        label="Ngày bắt đầu chạy"
                        className="Garage RenderFromGarage "
                      />
                      <CustomDatePicker
                        label="Ngày quay xe"
                        className="Garage RenderFromGarage "
                      />

                      <div className="modal__body">
                        <form onSubmit={handleSubmitButton}>
                          <div className="modal__footer">
                            <Grid
                              container
                              xs={10}
                              className="modal__footer__left "
                            >
                              <p>Thêm hình ảnh minh hoạ cho nhà xe</p>
                            </Grid>
                            <Grid container xs={2} className="">
                              <IconButton>
                                <label htmlFor="upload-image">
                                  <PhotoLibraryIcon
                                    className="modal__footer__rigth"
                                    style={{
                                      color: "green",
                                      textAlign: "center",
                                    }}
                                  />
                                </label>
                              </IconButton>
                            </Grid>
                          </div>
                        </form>
                      </div>
                      <Button
                        variant="contained"
                        className="modal__footer11"
                        color="primary"
                        type="submit"
                      >
                        Thêm mới nhà xe
                      </Button>
                    </fieldset>
                  </form>
                </div>
              </div>
            </Paper>
          </Box>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default AddCar;
