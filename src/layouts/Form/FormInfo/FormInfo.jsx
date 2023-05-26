import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
// import { db, docRef } from "../../data/firebase";
import { Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "redux/slices/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "data/firebase";
import { db } from "data/firebase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const useStyles = makeStyles((theme) => ({
  container: {
    height: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
  },
  saveButton: {
    width: "200px",
    margin: "0 auto",
    marginTop: theme.spacing(2),
  },
}));

import { collection, doc, updateDoc } from "firebase/firestore";
const FormInfo = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setID] = useState("");
  


  useEffect(() => {
    const dataAccount = JSON.parse(localStorage.getItem("account"));
    console.log(dataAccount);
    setEmail(dataAccount.Email);
    setName(dataAccount.Name);
    setPhone(dataAccount.NumberPhone);
    setID(dataAccount.id);
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        toast.success("Cập nhật thành công!", {
          autoClose: 1000,
        });
      })
      .catch((error) => {
        toast.error("Đã có lỗi xảy ra!" + error.message, {
          autoClose: 1000,
        });
      });

    const statisticsRef = doc(collection(db, "Account"), `${id}`);

    updateDoc(statisticsRef, {
      Name: name,
      NumberPhone: phone,
    })
      .then(() => {
        console.log(
          `Updated viewer count for NameGarage ${formData.NameGarage}`
        );
      })
      .catch((error) => {
        console.error(`Error updating viewer count: ${error}`);
      });

    const existingAccountJSON = localStorage.getItem("account");
    const existingAccount = JSON.parse(existingAccountJSON);
    existingAccount.Name = name;
    existingAccount.NumberPhone = phone;
    const updatedAccountJSON = JSON.stringify(existingAccount);
    localStorage.setItem("account", updatedAccountJSON);
    // sendEmailVerification(auth.currentUser)
    // .then(() => {
    //   alert("dang xác minh")
    // });

  };


  

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Paper elevation={4} className={classes.paper}>
          <h2 style={{
            fontWeight: 'bold',
            color: 'primary',
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#2474e5',
          }}>
            Thông Tin Tài Khoản
          </h2>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  fullWidth
                  variant="outlined"
                  label="Email"
                  type="email"
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Họ và Tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Số Điện Thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.saveButton}
                >
                  <SaveIcon sx={{ marginRight: 1 }} />
                  Lưu
                </Fab>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>

  );
};
export default FormInfo;

