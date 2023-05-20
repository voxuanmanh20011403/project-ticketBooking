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

function AddGarage(props) {
  const { activeButton, setActiveButton, data } = props;
  //set show/hide form
  const open = true;
  // const addPost = () => {};
  const handleClose = () => {
    setActiveButton(false);
  };
  //implement add image and video

  //TODO : CUSTOM FIELD THÊM NHÀ XE
  const [formData, setFormData] = useState({});
  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingGarage = data.find(
      (item) => item.ID_Garage === formData.ID_Garage
    );
    if (existingGarage) {
      alert(`ID: ${formData.ID_Garage} đã tồn tại`);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "Garage"), {
        ...formData,
      });
      console.log("Document written with ID: ");
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
                      <TextField
                        id="outlined-basic"
                        label="ID nhà xe"
                        variant="outlined"
                        name="ID_Garage"
                        value={formData.ID_Garage}
                        onChange={handleChangeValue}
                        placeholder="ID nhà xe"
                        className="Garage"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Tên nhà xe"
                        variant="outlined"
                        name="NameGarage"
                        value={formData.NameGarage}
                        onChange={handleChangeValue}
                        placeholder="Tên nhà xe"
                        className="Garage"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Chủ sở hữu"
                        variant="outlined"
                        name="Owner"
                        value={formData.Owner}
                        onChange={handleChangeValue}
                        placeholder="Chủ sở hữu nhà xe"
                        className="Garage"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Địa chỉ nhà xe"
                        variant="outlined"
                        name="Address"
                        value={formData.Address}
                        onChange={handleChangeValue}
                        placeholder="Địa chỉ nhà xe"
                        className="Garage"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Hotline"
                        variant="outlined"
                        name="Hotline"
                        value={formData.Hotline}
                        onChange={handleChangeValue}
                        placeholder="Hotline"
                        className="Garage"
                      />

                      <div className="modal__body">
                        <form>
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

export default AddGarage;
