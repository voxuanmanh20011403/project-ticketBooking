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

function UpdateListCar(props) {
  const {
    activeButton,
    setActiveButtonUpdate,
    price,
    id,
    
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
  const [formData, setFormData] = useState({});
  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const statisticsRef = doc(collection(db, "Garage"), `${id}`);

    // Tăng trường "viewer" lên 1 đơn vị
    updateDoc(statisticsRef, {
      // NameGarage: formData.NameGarage,
      // Address: formData.Address,
      // Owner: formData.Owner,
      // Hotline: formData.Hotline
    })
      .then(() => {
        console.log(
          `Updated viewer count for NameGarage ${formData.NameGarage}`
        );
      })
      .catch((error) => {
        console.error(`Error updating viewer count: ${error}`);
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
                  <Typography>Cập nhật thông tin nhà xe  </Typography>
                  <IconButton>
                    <CloseIcon onClick={handleClose} />
                  </IconButton>
                </div>
                <div>
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <fieldset>
                      <TextField
                        id="outlined-basic"
                        label="Giá vé"
                        variant="outlined"
                        name="NameGarage"
                        value={formData.NameGarage}
                        onChange={handleChangeValue}
                        placeholder="Giá vé"
                        className="Garage"
                        defaultValue={price}
                       
                      />
                       <TextField
                        id="outlined-basic"
                        label="Tên nhà xe"
                        variant="outlined"
                        name="NameGarage"
                        value={formData.NameGarage}
                        onChange={handleChangeValue}
                        placeholder="ID nhà xe"
                        className="Garage"
                        // defaultValue={}
                       
                      />
                       <TextField
                        id="outlined-basic"
                        label="Tên nhà xe"
                        variant="outlined"
                        name="NameGarage"
                        value={formData.NameGarage}
                        onChange={handleChangeValue}
                        placeholder="ID nhà xe"
                        className="Garage"
                        // defaultValue={}

                       
                      />
                       <TextField
                        id="outlined-basic"
                        label="Tên nhà xe"
                        variant="outlined"
                        name="NameGarage"
                        value={formData.NameGarage}
                        onChange={handleChangeValue}
                        placeholder="ID nhà xe"
                        className="Garage"
                        // defaultValue={}

                       
                      />
                       <TextField
                        id="outlined-basic"
                        label="Tên nhà xe"
                        variant="outlined"
                        name="NameGarage"
                        value={formData.NameGarage}
                        onChange={handleChangeValue}
                        placeholder="ID nhà xe"
                        className="Garage"
                        // defaultValue={}

                       
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
