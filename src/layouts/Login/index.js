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
import { signInWithEmailAndPassword } from "firebase/auth";
import Notification from "layouts/notication/Notification";
import './login.css'
function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const history = useNavigate();
  //CUSTOM VALIDATION USING YUP!
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Bạn chưa nhập email hoặc số điện thoại.')
      .required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  //Onclick submit
  const onSubmit = async (data) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.username,
        data.password,
      ); 
      //Update +1 views in month while login success

      //end
      const token = user?.user?.accessToken;
      localStorage.setItem('token', token);
      history('/admin');
    } catch (e) { 
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1000); 
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
            <marquee style={{ fontSize: ' 65%' }}  > Hệ thống đặt vé xe đường dài - SwiftRide</marquee>
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
              {/* Passwword */}
              <Grid className="row2__input">
                <TextField
                  required
                  id="password"
                  name="password"
                  // label="Password"
                  type="password"
                  fullWidth
                  placeholder="Mật khẩu"
                  variant="outlined"
                  // margin="dense"
                  {...register('password')}
                  error={errors.password ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.password?.message}
                </Typography>
              </Grid>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
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
                Đăng nhập
              </Button>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Bạn chưa có tài khoản?{" "}
                <MDTypography
                  component={Link}
                  to="/register"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Đăng ký
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        { showError ? <Notification message="Login failed. Please try again." severity="error" /> : <></>}
      </Card>
    </BasicLayout>
  );
}

export default SignIn;
