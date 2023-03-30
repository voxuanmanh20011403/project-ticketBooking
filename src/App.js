

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/Admin/assets/theme";
import themeDark from "../src/Admin/assets/theme-dark";
import Register from "register/Signup/Register";

import NotFoundPage from "register/404/NotFoundPage";
import { useMaterialUIController , setMiniSidenav, setOpenConfigurator  } from "Admin/context";
import Admin from "Admin/admin";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav, 
    openConfigurator,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };
  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };
  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
  
    
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <Routes>
          <Route path="/"  element={<Register/>}/>
          <Route path="/admin"  element={<Admin/>}/>
          <Route path="/Register"  element={<Register/>}/>
          <Route path="*"  element={<NotFoundPage/>}/>
      </Routes>
    </ThemeProvider>
    
  
    
    
  )
}
