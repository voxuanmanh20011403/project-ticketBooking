import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import bgImage from "../../../src/Admin/assets/images/bg-sign-in-basic.jpeg";
import BasicLayout from "../../Admin/layouts/authentication/components/BasicLayout";
import MDBox from "Admin/components/MDBox";
import MDTypography from "Admin/components/MDTypography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography } from "@mui/material";
import { auth } from "data/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // YUP: VALIDATION
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Bạn chưa nhập email hoặc số điện thoại.')
      .required('Username is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    lastname: Yup.string()
      .required('Bạn chưa nhập Name.')
      .required('Username is required'),
    firstname: Yup.string()
      .required('Bạn chưa nhập Name.')
      .required('Username is required'),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const history = useNavigate();
  const onSubmit = async (data) => {
    try {
      //Register
      const users = await createUserWithEmailAndPassword(
        auth,
        data.username,
        data.password,
      );
      //add display name cho user
      const updateName = () => {
        return updateProfile(auth.currentUser, {
          displayName: lastName + ' ' + firstName,
        });
      };
      updateName();
      history('/login')

    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            <marquee style={{ fontSize: ' 70%' }}  >Đăng kí tài khoản SwiftRide</marquee>
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>

            </MDBox>
            <MDBox mb={2}>
              <Grid className="row2__input">
                <TextField
                  required
                  id="lastname"
                  name="lastname"
                  fullWidth
                  placeholder="lastname"
                  variant="outlined"
                  // margin="dense"
                  {...register('lastname')}
                  error={errors.lastname ? true : false}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.name?.message}
                </Typography>
              </Grid>
              {/* Passwword */}
              <Grid className="row2__input">
                <TextField
                  required
                  id="firstname"
                  name="firstname"
                  fullWidth
                  placeholder="firstname"
                  variant="outlined"
                  {...register('firstname')}
                  error={errors.firstname ? true : false}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.name?.message}
                </Typography>
              </Grid>
              <Grid className="row2__input">
                <TextField
                  required
                  id="username"
                  name="username"
                  fullWidth
                  placeholder="Email hoặc số điện thoại"
                  variant="outlined"
                  {...register('username')}
                  error={errors.username ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.username?.message}
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
                  {...register('password')}
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
                  {...register('confirmPassword')}
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
                  width: '60%',
                  margin: '0 20% 0 20%'
                }}
                color="error"
                onClick={handleSubmit(onSubmit)}
              >
                Tạo tài khoản mới
              </Button>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Register;
