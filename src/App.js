import { useState, useEffect, useMemo } from "react";

// react-router components
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Redirect
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

import User from "layouts/User/User";

import { TripsAuto } from "Admin/layouts/RenderTableTripsAuto/TripsAuto";


export default function App() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  var accountJSON = localStorage.getItem("account");

  // chuyển đối tượng từ dạng JSON sang đối tượng JavaScript

  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    var accountJSON = localStorage.getItem("account");

    setAccount(accountJSON);
  }, []);
  console.log("account", account);
  const [uid, setUid] = useState();

  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.user);

  let role = 0;
  const data = JSON.parse(localStorage.getItem("account"));
  console.log("data: " + data);
  try{
    role = data.Role;
  }catch(e) {
    console.log(e);
  }
  

  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(LoginAction(authUser));
      } else {
        dispatch(LogoutAction());
      }
      setUid(authUser.uid);
    });
  }, [dispatch]);
  console.log("role: " + role);
  
  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/SignIN" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/return" element={<Return />}></Route>
        {
          role === "3" ? <Route path="/admin" element={<Admin />}></Route> : (
            <Route path="*" element={<NotFoundPage />} />
          )
        }
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/user" element={<User/>} />

        <Route path="TestAddCar" element={<TestAddCar />} />
        <Route path="addusser" element={<AddUser />} />

      </Routes>
      <TripsAuto />
    </ThemeProvider>
  );
}
