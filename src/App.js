import { useState, useEffect, useMemo } from "react";

// react-router components
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
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
import Footer from "layouts/Footer/Footer";
import Home from "layouts/Home/Home";


export default function App() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return (
    
  <ThemeProvider theme={darkMode ? themeDark : theme}>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/SignIN" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}
