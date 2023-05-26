import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import {
  Button,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import { db } from "data/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function UpdateListCar(props) {
  const {
    activeButton,
    setActiveButtonUpdate,
    price,
    id,
    endPoint,
    startPoint,
    pakingEnd,
    pakingStart,
    duration,
  } = props;
  //set show/hide form
  const [open, setOpen] = React.useState(true);
  // const [post, setPost] = useState();
  const handleOpen = () => {
    // console.log("da click vao add post");
  };
  // const addPost = () => {};
  const handleClose = () => {
    setActiveButtonUpdate(false);
  };
  //implement add image and video

  //TODO : CUSTOM FIELD THÊM NHÀ XE
  const [formData, setFormData] = useState({
    Price:price ,
    EndPoint:endPoint ,
    StartPoint:  startPoint,
    PakingEnd: pakingEnd,
    PakingStart: pakingStart,
    duration: duration,
  });
  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const statisticsRef = doc(collection(db, "ListCar"), `${id}`);

    // Tăng trường "viewer" lên 1 đơn vị
    updateDoc(statisticsRef, {
      Price:formData.Price ,
      EndPoint: formData.EndPoint,
      StartPoint: formData.StartPoint ,
      PakingEnd: formData.PakingEnd,
      PakingStart: formData.PakingStart,
      duration: formData.duration,
    })
      .then(() => {
        toast.success("Cập nhật thành công!", {
          autoClose: 1000,
        });
        setActiveButtonUpdate(false);
      })
      .catch((error) => {
        toast.error(`Cập nhật thất bài, lỗi: ${error} `, {
          autoClose: 1000,
        });
      });
    // try {
    //   const docRef = await addDoc(collection(db, "Garage"), {
    //     ...formData,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {}
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
                  <Typography>Cập nhật thông tin nhà xe </Typography>
                  <IconButton>
                    <CloseIcon onClick={handleClose} />
                  </IconButton>
                </div>
                <div>
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <fieldset>
                      <TextField
                        id="outlined-basic"
                        label="Điểm đi"
                        variant="outlined"
                        name="StartPoint"
                        value={formData.StartPoint}
                        onChange={handleChangeValue}
                        placeholder="Điểm đi"
                        className="Garage"
                        defaultValue={startPoint}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Điểm đến"
                        variant="outlined"
                        name="EndPoint"
                        value={formData.EndPoint}
                        onChange={handleChangeValue}
                        placeholder="Điểm đến"
                        className="Garage"
                        defaultValue={endPoint}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Bến xe xuất phát"
                        variant="outlined"
                        name="PakingStart"
                        value={formData.PakingStart}
                        onChange={handleChangeValue}
                        placeholder="Bến xe xuất phát"
                        className="Garage"
                        defaultValue={pakingStart}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Bến xe kết thúc"
                        variant="outlined"
                        name="PakingEnd"
                        value={formData.PakingEnd}
                        onChange={handleChangeValue}
                        placeholder="Bến xe kết thúc"
                        className="Garage"
                        defaultValue={pakingEnd}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Thời gian di chuyển"
                        variant="outlined"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChangeValue}
                        placeholder="Thời gian di chuyển"
                        className="Garage"
                        defaultValue={duration}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Giá vé"
                        variant="outlined"
                        name="Price"
                        value={formData.Price}
                        onChange={handleChangeValue}
                        placeholder="Giá vé"
                        className="Garage"
                        defaultValue={price}
                      />

                      <Button
                        variant="contained"
                        className="modal__footer11"
                        color="primary"
                        type="submit"
                      >
                        Cập nhật nhà xe
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

export default UpdateListCar;
