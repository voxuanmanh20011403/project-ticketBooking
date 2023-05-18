import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@material-ui/core";
// import { db, docRef } from "../../data/firebase";

import { collection, doc, updateDoc } from "firebase/firestore";
import { Box } from "@mui/material";
import MDBox from "Admin/components/MDBox";
import './FormInfo.css'
const FormInfo = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState("Hiển Thị");

  useEffect(() => {
    const dataAccount = JSON.parse(localStorage.getItem("account"));
    console.log(dataAccount);
    setEmail(dataAccount.Email);
    setName(dataAccount.Name);
    setPhone(dataAccount.NumberPhone);
    setPassword(dataAccount.Password);
  }, []);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setShowPasswordText(showPassword ? "Hiển Thị" : "Ẩn");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Name", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Password:", password);
    // const dataAccount = JSON.parse(localStorage.getItem("account"));
    // const updatedData = {
    //   ...dataAccount,
    //   Name: name,
    //   NumberPhone: phone,
    //   Password: password,
    // };
    // localStorage.setItem("account", JSON.stringify(updatedData));
  };
  return (
    <>
      <Box>
        <Paper className="paper" elevation={4}>
          <div>
            <div className="modalHeading">
              <Typography
                variant="h5"
                component="h1"
                align="center"
                gutterBottom
              >
                Thông Tin Tài Khoản
              </Typography>
            </div>
          </div>
          <MDBox component="form" role="form">
            <form className="form-horizontal">
              <fieldset>
                <Grid item xs={12} className="row2__input">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} className="row2__input">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Họ và Tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} className="row2__input">
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
                    Lưu thông tin
                  </Button>
                </Grid>
              </fieldset>
            </form>
          </MDBox>
        </Paper>
      </Box>
      {/* <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={20} sm={20} md={6} lg={4}>
          <Paper elevation={3}>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              Thông Tin Tài Khoản
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Mật Khẩu"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={15}>
                  <Button
                    onClick={handleShowPassword}
                    variant="contained"
                    color="secondary"
                  >
                    {showPasswordText} Mật Khẩu
                  </Button>
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
      </Grid> */}
    </>
  );
};

export default FormInfo;
