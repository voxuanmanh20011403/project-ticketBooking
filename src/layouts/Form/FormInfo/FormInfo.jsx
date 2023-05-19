import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@material-ui/core";
// import { db, docRef } from "../../data/firebase";

import { collection, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "redux/slices/auth";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "data/firebase";
import { db } from "data/firebase";
const FormInfo = () => {
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        // ...
        alert("Updated");
      })
      .catch((error) => {
        // An error occurred
        // ...
        alert("No update");
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
    sendEmailVerification(auth.currentUser)
    .then(() => {
      alert("dang xác minh")
    });
   
  };
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={20} sm={20} md={6} lg={4}>
        <Paper elevation={3}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Thông Tin Tài Khoản
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Lưu
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FormInfo;
