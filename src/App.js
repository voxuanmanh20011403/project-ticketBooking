import { useState, useEffect, useMemo } from "react";

// react-router components
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/Admin/assets/theme";
import themeDark from "../src/Admin/assets/theme-dark";

import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "Admin/context";
import Admin from "Admin/admin";
// import Register from "layouts/Signup/Register";
import NotFoundPage from "layouts/404/NotFoundPage";
import SignIn from "layouts/Login";
import Register from "layouts/Register";
import Booking from "layouts/Booking/Booking";
import TestAddCar from "Admin/layouts/TestAddCar";
import Garage from "Admin/layouts/Garage/Garage";
import AddUser from "Admin/layouts/AddUser/AddUser/AddUser";

import Footer from "layouts/Footer/Footer";
import Home from "layouts/Home/Home";
import Payment from "layouts/Payment/Payment";
import Return from "./layouts/Payment/Return";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "data/firebase";
import { LoginAction } from "redux/slices/auth";
import { LogoutAction } from "redux/slices/auth";
import { in4 } from "redux/slices/auth";
import { Infor } from "redux/slices/auth";

import { TripsAuto } from "Admin/layouts/RenderTableTripsAuto/TripsAuto";
import FormComment from "layouts/Comment/FormComment";
import User from "layouts/Form/User/User";
import Messenger from "layouts/Messenger/Messenger";

export default function App() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  // chuyển đối tượng từ dạng JSON sang đối tượng JavaScript
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState("");
  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    var accountJSON = localStorage.getItem("account");

    setAccount(accountJSON);
  }, []);
  // console.log("account", account);
  const [uid, setUid] = useState();

  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.user);

  useEffect(() => {
    var data = JSON.parse(localStorage.getItem("account"));
    const role = data ? data.Role : "-1";
    setRole(role);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(LoginAction(authUser));
      } else {
        dispatch(LogoutAction());
      }
      // setUid(authUser.uid);
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <Routes>
        {role === "0" && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/SignIN" element={<SignIn />} />
          </>
        )}

        {/* Các route dành cho role User */}
        {role === "1" && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/SignIN" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/return" element={<Return />} />
            <Route path="/comment" element={<FormComment />} />
            <Route path="/user" element={<User />} />
          </>
        )}

        {/* Các route cho các trường hợp còn lại */}
        {role !== "1" && role !== "0" && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/SignIN" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {/* Route mặc định cho các trường hợp không hợp lệ */}
        <Route path="*" element={<NotFoundPage />} />

        {/* Role: Admin */}
        {/* {role === "0" ? (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/SignIN" element={<SignIn />} />
          </>
        ) : role === "1" ? (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/SignIN" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/booking" element={<Booking />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="/return" element={<Return />}></Route>
            <Route path="/comment" element={<FormComment />}></Route>
            <Route path="/user" element={<User />} />
          </>
        ) : role !== "1" && role !== "0" ? (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/booking" element={<Booking />}></Route>
            <Route path="/SignIN" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <Route path="*" element={<NotFoundPage />} />
        )} */}

        {/* <Route path="*" element={<NotFoundPage />} /> */}

        {/* <Route path="TestAddCar" element={<TestAddCar />} />
        <Route path="addusser" element={<AddUser />} />
        <Route path="/chatbot" element={<Messenger />}></Route> */}
        {/*  <Route path="/" element={<Home />}></Route>
        <Route path="/SignIN" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/return" element={<Return />}></Route>
        {
          role === "0" ? <Route path="/admin" element={<Admin />}></Route> : (
            <Route path="*" element={<NotFoundPage />} />
          )
        }
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/user" element={<User/>} />

        <Route path="TestAddCar" element={<TestAddCar />} />
        <Route path="addusser" element={<AddUser />} />
        <Route path='/comment' element ={<FormComment />}></Route>
        <Route path="/chatbot" element={<Messenger />}></Route> */}
      </Routes>
      <TripsAuto />
    </ThemeProvider>
  );
}
