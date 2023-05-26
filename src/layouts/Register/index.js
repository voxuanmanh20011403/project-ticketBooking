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
import * as Yup from "yup";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { auth } from "data/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "data/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// toasst
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  // YUP: VALIDATION
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Bạn chưa nhập email hoặc số điện thoại.")
      .required("email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    lastname: Yup.string()
      .required("Bạn chưa nhập Name.")
      .required("lastname is required"),
    firstname: Yup.string()
      .required("Bạn chưa nhập Name.")
      .required("firstname is required"),
    numberphone: Yup.string()
      .required("Bạn chưa nhập Số điện thoại.")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("NumberPhone is required"),
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
      //Add thong tin vào authen
      const users = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      //add display name cho user
      const updateName = () => {
        return updateProfile(auth.currentUser, {
          displayName: lastName + " " + firstName,
        });
      };
      updateName();
      //add thong tin vào bằng user với role default : role=1 =user;
      const currentDate = new Date();
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 10)
        .replace("T", " ");
      try {
        const docRef = await addDoc(collection(db, "Account"), {
          Email: data.email,
          Password: data.password,
          Name: lastName + " " + firstName,
          Role: "1",
          CreateTime: formattedDate,
          NumberPhone: numberPhone,
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
        updateDoc(statisticsRef, { UserNew: increment(1) })
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
            setDoc(statisticsRef, { UserNew: 1 })
              .then(() => {
                console.log(
                  `Created new statistics record for ${year}-${month}`
                );
              })
              .catch((error) => {
                console.error(`Error creating new statistics record: ${error}`);
              });
          }
        });
        //end
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      sendEmailVerification(auth.currentUser).then(() => {
        toast.success("Đăng kí thành công. Vui lòng kiểm tra email để thực hiện veri tài khoản !!!", {
          autoClose: 1000,
        });

      });
      setTimeout(() => {
        history("/SignIn");
      }, 2000);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra! " + error.message, {
        autoClose: 2000,
      });
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
            <marquee style={{ fontSize: " 70%" }}>
              Đăng kí tài khoản SwiftRide
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
                  id="lastname"
                  name="lastname"
                  fullWidth
                  placeholder="Họ đệm"
                  variant="outlined"
                  // margin="dense"
                  {...register("lastname")}
                  error={errors.lastname ? true : false}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.lastname?.message}
                </Typography>
              </Grid>
              {/* Passwword */}
              <Grid className="row2__input">
                <TextField
                  required
                  id="firstname"
                  name="firstname"
                  fullWidth
                  placeholder="Tên"
                  variant="outlined"
                  {...register("firstname")}
                  error={errors.firstname ? true : false}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.firstname?.message}
                </Typography>
              </Grid>
              <Grid className="row2__input">
                <TextField
                  required
                  id="email"
                  name="email"
                  fullWidth
                  placeholder="Email tài khoản"
                  variant="outlined"
                  {...register("email")}
                  error={errors.email ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.email?.message}
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
              <Grid className="row2__input">
                <TextField
                  required
                  id="phone"
                  name="phone"
                  type="tel"
                  inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
                  fullWidth
                  placeholder="Số điện thoại"
                  variant="outlined"
                  {...register("numberphone")}
                  error={errors.numberphone ? true : false}
                  onChange={(e) => {
                    setNumberPhone(e.target.value);
                  }}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.numberphone?.message}
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
                Tạo tài khoản mới
              </Button>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Bạn đã có tài khoản?{" "}
                <MDTypography
                  component={Link}
                  to="/"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Đăng nhập
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
