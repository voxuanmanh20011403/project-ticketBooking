import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@material-ui/core";
// import { db, docRef } from "../../data/firebase";

import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "data/firebase";
import { useDispatch, useSelector } from "react-redux";
import MDBox from "Admin/components/MDBox";
import { Card } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { auth } from "data/firebase";
import {
  EmailAuthProvider,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  sendEmailVerification,
} from "firebase/auth";

const FormPassWord = () => {
  // const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const validationSchema = Yup.object().shape({
    passwordNow: Yup.string()
      .required("Bạn chưa nhập mật khẩu hiện tại.")
      .required("Mật khẩu hiện tại là bắt buộc"),
    password: Yup.string()
      .required("Mật khẩu mới là bắt buộc")
      .notOneOf(
        [Yup.ref("passwordNow"), null],
        "Mật khẩu mới phải khác mật khẩu hiện tại"
      ),
    confirmPassword: Yup.string()
      .required("Xác nhận Mật khẩu  khớp")
      .oneOf([Yup.ref("password"), null], "Xác nhận Mật khẩu không khớp"),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [listAccounts, setListAccounts] = useState([]);
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);
  const user = auth.currentUser;
  useEffect(() => {
    async function fetchData() {
      const accountsCol = collection(db, "Account");
      const accountsSnapshot = await getDocs(accountsCol);
      const accountsList = accountsSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((account) => account.Email === user.email);

      setListAccounts(accountsList);
    }
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const user = auth.currentUser;
    if (password === listAccounts[0].Password) {
      //cập nhật trong authen
      updatePassword(user, data.password)
        .then(() => {
          console.log("Update successful");
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });
      const statisticsRef = doc(
        collection(db, "Account"),
        `${listAccounts[0].id}`
      );
      // Cập nhật trong collection
      updateDoc(statisticsRef, {
        Password: data.password,
      }).then(() => {
        console.log(
          `Updated viewer count for NameGarage ${formData.NameGarage}`
        );
      });
    } else {
      alert("Mật khẩu hiện tại chưa chính xác");
    }
  };
  const HandleSendMailVeri = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("đã gửi email veri !!!");
    });
  };
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={20} sm={20} md={6} lg={4}>
        <Paper elevation={3}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Đổi mật khẩu
          </Typography>

          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              {user.emailVerified === true ? (
                <>
                  <MDBox mb={2}>
                    <Grid className="row2__input">
                      <TextField
                        required
                        id="passwordNow"
                        name="passwordNow"
                        fullWidth
                        placeholder="Mật khẩu hiện tại"
                        variant="outlined"
                        // margin="dense"
                        {...register("passwordNow")}
                        error={errors.passwordNow ? true : false}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <Typography variant="inherit" color="textSecondary">
                        {errors.passwordNow?.message}
                      </Typography>
                    </Grid>

                    <Grid className="row2__input">
                      <TextField
                        required
                        id="password"
                        name="password"
                        type="password"
                        fullWidth
                        placeholder="Mật khẩu"
                        variant="outlined"
                        {...register("password")}
                        error={errors.password ? true : false}
                      />
                      <Typography variant="inherit" color="textSecondary">
                        {errors.password?.message}
                      </Typography>
                    </Grid>
                    <Grid className="row2__input">
                      <TextField
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        placeholder="Xác nhận mật khẩu"
                        variant="outlined"
                        {...register("confirmPassword")}
                        error={errors.confirmPassword ? true : false}
                      />
                      <Typography variant="inherit" color="textSecondary">
                        {errors.password?.message}
                      </Typography>
                    </Grid>
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <Button
                      variant="contained"
                      style={{
                        width: "60%",
                        margin: "0 20% 0 20%",
                      }}
                      color="error"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Đổi mật khẩu
                    </Button>
                  </MDBox>
                </>
              ) : (
                <>
                  <MDBox mb={2}>
                    <Grid className="row2__input">
                      Tài khoản của bạn chưa thực hiện veri email, vui lòng thực
                      hiện veri để thực hiện tính năng đổi mật khẩu này
                    </Grid>
                    <TextField
                      disabled
                      id="outlined-basic"
                      label="Email tài khoản"
                      variant="outlined"
                      name="IdGarage"
                      value={email}
                      onChange={() => setEmailVeri(email)}
                      placeholder="ID nhà xe"
                      className="Garage"
                    />
                    <Button
                      onClick={() => {
                        HandleSendMailVeri();
                      }}
                    >
                      Gửi email veri tài khoản
                    </Button>
                  </MDBox>
                </>
              )}
            </MDBox>
          </MDBox>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FormPassWord;
