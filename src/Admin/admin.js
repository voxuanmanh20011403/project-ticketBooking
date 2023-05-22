import { useState, useEffect, useMemo } from "react";
import { Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import themeDark from "../Admin/assets/theme-dark";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

// Material Dashboard 2 React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "./context";

// Images
import brandWhite from "./assets/images/logo-ct.png";
import brandDark from "./assets/images/logo-ct-dark.png";
import MDBox from "./components/MDBox";
import Sidenav from "./examples/Sidenav";
import Configurator from "./examples/Configurator";
import theme from "./assets/theme";
import Dashboard from "./layouts/dashboard";

import Billing from "./layouts/billing";

import UserTable from "./layouts/AddUser/ShowUsers";
import TestAddCar from "./layouts/TestAddCar";
import Garage from "./layouts/Garage/Garage";
import Tables from "./layouts/tables";
import ListCar from "./layouts/ListCar/ListCar";
import { ManagerTickets } from "./layouts/ManagerTickets/ManagerTickets";
import CancelTickets from "./layouts/CancelTickets/CancelTickets";

export default function Admin() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

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
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );
  const [selectedValue, setSelectedValue] = useState(1);

  const onValueSelected = (value) => {
    setSelectedValue(value);
  };
  const renderComponent = () => {
    return selectedValue === 1 ? (
      <Dashboard />
    ) : selectedValue === 2 ? (
      <UserTable />
    ) : selectedValue === 3 ? (
      <Garage />
    ) : selectedValue === 4 ? (
      <ListCar />
    ) : selectedValue === 5 ? (
      <ManagerTickets />
    ) : (
      <CancelTickets />
    );
  };
  return (
    <>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        <>
          <Sidenav
            color={sidenavColor}
            brand={
              (transparentSidenav && !darkMode) || whiteSidenav
                ? brandDark
                : brandWhite
            }
            brandName="Material Dashboard 2"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            onValueSelected={onValueSelected}
          />
          <Configurator />
          {configsButton}
        </>

        {renderComponent()}
      </ThemeProvider>
    </>
  );
}
