import React, { useEffect, useState } from "react";
import "./AddGarage.css";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import imageCompression from "browser-image-compression";
import { Box } from "@mui/system";
import {
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  Modal,
  NativeSelect,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import { db } from "data/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "data/firebase";
import DoneIcon from "@mui/icons-material/Done";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
function AddGarage(props) {
  const { activeButton, setActiveButton, data, setReLoad } = props;
  const [URLImage, setURLImage] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);
  const [nameGarage, setNameGarage] = useState("");
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");
  const [hotline, setHotline] = useState("");
  const [idGarage, setIdGarage] = useState("");

  //YUP
  // YUP: VALIDATION
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const validationSchema = Yup.object().shape({
    idGarage: Yup.string().required("ID nhà xe không được bỏ trống"),
    nameGarage: Yup.string().required("Tên nhà xe không được bỏ trống"),
    owner: Yup.string().required("Bạn chưa nhập tên chủ nhà xe"),
    address: Yup.string().required("Địa chỉ nhà xe không được bỏ trống"),
    hotline: Yup.string()
      .required("Số điện thoại không được bỏ trống.")
      .matches(phoneRegExp, "Định dạng số điện thoại chưa đúng"),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  //set show/hide form
  const open = true;
  // const open = true;
  // const addPost = () => {};
  const handleClose = () => {
    setActiveButton(false);
  };
  //implement add image and video
  useEffect(() => {
    if (uploadComplete) {
      handleSubmit(); // Gọi hàm handleSubmit khi việc tải lên ảnh đã hoàn thành
    }
  }, [uploadComplete]);
  //TODO : CUSTOM FIELD THÊM NHÀ XE
  const [formData, setFormData] = useState({});
  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //start image
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const handleUpload = (e) => {
    e.preventDefault();
    //start image
    if (!file) {
      toast.error("Vui lòng chọn ảnh nhà xe.", {
        autoClose: 1000,
      });
    }
    const storageRef = ref(storage, `/imageGarage/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setURLImage(url);
          setUploadComplete(true);
         
        });
      }
    );
  };
  //end iamge

  const onSubmit = async (e) => {
    const existingGarage = data.find((item) => item.ID_Garage === idGarage);
    if (existingGarage) {
      // alert(`ID: ${formData.ID_Garage} đã tồn tại`);
      toast.error(`ID: ${idGarage} đã tồn tại`, {
        autoClose: 1000,
      });
      return;
    }
    const existingGarage1 = data.find((item) => item.NameGarage === nameGarage);

    if (existingGarage1) {
      // alert(`ID: ${formData.ID_Garage} đã tồn tại`);
      toast.error(`${nameGarage} đã tồn tại`, {
        autoClose: 1000,
      });
      return;
    }

    const existingGarage2 = data.find((item) => item.Hotline === hotline);

    if (existingGarage2) {
      // alert(`ID: ${formData.ID_Garage} đã tồn tại`);
      toast.error(`${hotline} đã tồn tại ở 1 nhà xe khác`, {
        autoClose: 1000,
      });
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "Garage"), {
        Address: address,
        Hotline: hotline,
        ID_Garage: idGarage,
        NameGarage: nameGarage,
        Owner: owner,
        URLImage: URLImage,
      });
      toast.success(`Thêm thành công nhà xe ${nameGarage}`, {
        autoClose: 1000,
      });
      setActiveButton(false);
      setReLoad((pre) => !pre);
    } catch (e) {}
  };
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
                  <Typography>Thêm nhà xe </Typography>
                  <IconButton>
                    <CloseIcon onClick={handleClose} />
                  </IconButton>
                </div>
                <div>
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <fieldset>
                      <Grid className="Garage">
                        <TextField
                          required
                          id="idGarage"
                          name="idGarage"
                          fullWidth
                          placeholder="ID nhà xe"
                          label="ID nhà xe"
                          variant="outlined"
                          // margin="dense"
                          {...register("idGarage")}
                          error={errors.idGarage ? true : false}
                          onChange={(e) => {
                            setIdGarage(e.target.value);
                          }}
                        />
                        <div
                          variant="inherit"
                          color="textSecondary"
                          className="error-message"
                        >
                          {errors.idGarage?.message}
                        </div>
                      </Grid>
                      <Grid className="Garage">
                        <TextField
                          required
                          id="nameGarage"
                          name="nameGarage"
                          fullWidth
                          placeholder="Tên nhà xe"
                          label="Tên nhà xe"
                          variant="outlined"
                          // margin="dense"
                          {...register("nameGarage")}
                          error={errors.nameGarage ? true : false}
                          onChange={(e) => {
                            setNameGarage(e.target.value);
                          }}
                        />
                        <div variant="inherit" className="error-message">
                          {errors.nameGarage?.message}
                        </div>
                      </Grid>
                      <Grid className="Garage">
                        <TextField
                          required
                          id="owner"
                          name="owner"
                          fullWidth
                          placeholder="Tên chủ xe"
                          label="Tên chủ xe"
                          variant="outlined"
                          // margin="dense"
                          {...register("owner")}
                          error={errors.owner ? true : false}
                          onChange={(e) => {
                            setOwner(e.target.value);
                          }}
                        />
                        <div
                          variant="inherit"
                          color="textSecondary"
                          className="error-message"
                        >
                          {errors.owner?.message}
                        </div>
                      </Grid>

                      <Grid className="Garage">
                        <TextField
                          required
                          label="Địa chỉ nhà xe"
                          id="address"
                          name="address"
                          fullWidth
                          placeholder="Địa chỉ nhà xe"
                          variant="outlined"
                          // margin="dense"
                          {...register("address")}
                          error={errors.address ? true : false}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                        <div
                          variant="inherit"
                          color="textSecondary"
                          className="error-message"
                        >
                          {errors.address?.message}
                        </div>
                      </Grid>

                      <Grid className="Garage">
                        <TextField
                          required
                          label="Hotline"
                          id="hotline"
                          name="hotline"
                          fullWidth
                          placeholder="Hotline"
                          variant="outlined"
                          // margin="dense"
                          {...register("hotline")}
                          error={errors.hotline ? true : false}
                          onChange={(e) => {
                            setHotline(e.target.value);
                          }}
                        />
                        <div
                          variant="inherit"
                          color="textSecondary"
                          className="error-message"
                        >
                          {errors.hotline?.message}
                        </div>
                      </Grid>

                      <div className="modal__body Garage">
                        <form>
                          <div className="modal__footer">
                            <Grid
                              container
                              xs={10}
                              className="modal__footer__left "
                            >
                              <p>Thêm hình ảnh</p>
                            </Grid>
                            <Grid
                              container
                              xs={12}
                              className=""
                              style={{ width: "100%", display: "flex" }}
                            >
                              <input
                                id="upload-image"
                                type="file"
                                onChange={handleChange}
                                accept="/image/*"
                                style={{ width: "80%", padding: "10px 0" }}
                              />
                              <IconButton
                                style={{
                                  width: "15%",
                                  textAlign: "center",
                                  margin: "0 ",
                                }}
                              >
                                {percent < 100 ? (
                                  <UploadFileIcon onClick={handleUpload} />
                                ) : (
                                  <DoneIcon />
                                )}
                              </IconButton>
                            </Grid>
                          </div>
                        </form>
                      </div>
                      <Button
                        variant="contained"
                        style={{
                          width: "60%",
                          margin: "0 20% 0 20%",
                        }}
                        color="primary"
                        onClick={handleSubmit(onSubmit)}
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

export default AddGarage;
