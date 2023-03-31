

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/Admin/assets/theme";
import themeDark from "../src/Admin/assets/theme-dark";



import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "Admin/context";
import Admin from "Admin/admin";
import Register from "layouts/Signup/Register";
import NotFoundPage from "layouts/404/NotFoundPage";

export default function App() {
  const [controller] = useMaterialUIController();
  const {
    darkMode,
  } = controller;
  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Register" element={<Register/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>




  )
}
