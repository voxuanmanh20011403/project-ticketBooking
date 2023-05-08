import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import bgImage from "../../../src/Admin/assets/images/bg-sign-in-basic.jpeg";
import BasicLayout from "../../Admin/layouts/authentication/components/BasicLayout";
import MDBox from "Admin/components/MDBox";
import MDTypography from "Admin/components/MDTypography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import Notification from "layouts/notication/Notification";
import "./login.css";
import { getDocs } from "firebase/firestore";
import { collection, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from "data/firebase";
function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const history = useNavigate();
  //CUSTOM VALIDATION USING YUP!
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Bạn chưa nhập email hoặc số điện thoại.")
      .required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  //Onclick submit
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const getAccounts = async () => {
      const querySnapshot = await getDocs(collection(db, "Account"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAccounts(data);
    };
    getAccounts();
  }, []);
  console.log("setAccounts", accounts);
  const onSubmit = async (data) => {
    try {
      for (let i = 0; i < accounts.length; i++) {
        if (
          data.username === accounts[i].Email &&
          data.password === accounts[i].Password
        ) {
          // Thực hiện hành động mong muốn nếu email và password khớp với dữ liệu người dùng
          console.log("accounts[i]", accounts[i]);
          const user = await signInWithEmailAndPassword(
            auth,
            data.username,
            data.password
          );
          //Update +1 views in month while login success

          //end
          const token = user?.user?.accessToken;
          localStorage.setItem("token", token);
          var accountJSON = JSON.stringify({
            id: accounts[i].id,
            NumberPhone: accounts[i].NumberPhone,
            Password: accounts[i].Password,
            CreateTime: accounts[i].CreateTime,
            Email: accounts[i].Email,
            Name: accounts[i].Name,
            Role: accounts[i].Role,
          });

          //start
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1;

          // Tạo reference đến document thống kê của tháng hiện tại
          const statisticsRef = doc(
            collection(db, "statistics"),
            `${year}-${month}`
          );

          // Tăng trường "viewer" lên 1 đơn vị
          updateDoc(statisticsRef, { viewer: increment(1) })
            .then(() => {
              console.log(`Updated viewer count for ${year}-${month}`);
            })
            .catch((error) => {
              console.error(`Error updating viewer count: ${error}`);
            });

          // Kiểm tra xem bản ghi thống kê đã tồn tại chưa
          getDoc(statisticsRef).then((doc) => {
            if (!doc.exists()) {
              // Nếu chưa tồn tại, tạo bản ghi mới với trường "viewer" có giá trị là 1
              setDoc(statisticsRef, { viewer: 1 })
                .then(() => {
                  console.log(
                    `Created new statistics record for ${year}-${month}`
                  );
                })
                .catch((error) => {
                  console.error(
                    `Error creating new statistics record: ${error}`
                  );
                });
            }
          });
          //end
          localStorage.setItem("account", accountJSON);
          {
            accounts[i].Role === "1" ? history("/") : history("/admin");
          }
          break;
        }
      }
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
            <marquee style={{ fontSize: " 65%" }}>
              {" "}
              Hệ thống đặt vé xe đường dài - SwiftRide
            </marquee>
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}></MDBox>
            <MDBox mb={2}>
              <Grid className="row2__input">
                <TextField
                  required
                  id="username"
                  name="username"
                  fullWidth
                  placeholder="Email hoặc số điện thoại"
                  variant="outlined"
                  {...register("username")}
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
                  {...register("password")}
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
                  width: "60%",
                  margin: "0 20% 0 20%",
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
        {showError ? (
          <Notification
            message="Login failed. Please try again."
            severity="error"
          />
        ) : (
          <></>
        )}
      </Card>
    </BasicLayout>
  );
}

export default SignIn;
