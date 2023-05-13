import React, { useEffect, useState } from "react";
import "./AddUser.css";
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
  MenuItem,
  Modal,
  NativeSelect,
  Paper,
  Select,
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "data/firebase";
import MDBox from "Admin/components/MDBox";

function AddUser(props) {
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
  //check email đã tồn tại hay chưa
  const [accounts, setAccounts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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
  const onSubmit = async (data) => {
    const emailExist = accounts.find((account) => account.Email === data.email);
    if (emailExist) {
      console.log("Email đã tồn tại trong database");
      return;
    }
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
          displayName: data.lastName + " " + data.firstName,
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
          Name: data.lastname + " " + data.firstname,
          numberphone: data.numberphone,
          CreateTime: formattedDate,
          role:"0",
          ...formData,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const { activeButton, setActiveButton } = props;
  //set show/hide form
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    // console.log("da click vao add post");
  };
  // const addPost = () => {};
  const handleClose = () => {
    setActiveButton(false);
  };

  const [formData, setFormData] = useState({});

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
                  <MDBox component="form" role="form">
                    <form className="form-horizontal">
                      <fieldset>
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
                            inputProps={{
                              pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
                            }}
                            fullWidth
                            placeholder="Số điện thoại"
                            variant="outlined"
                            {...register("numberphone")}
                            error={errors.numberphone ? true : false}
                          />
                          <Typography variant="inherit" color="textSecondary">
                            {errors.numberphone?.message}
                          </Typography>
                        </Grid>
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
                      </fieldset>
                    </form>
                  </MDBox>
                </div>
              </div>
            </Paper>
          </Box>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
export default AddUser;
