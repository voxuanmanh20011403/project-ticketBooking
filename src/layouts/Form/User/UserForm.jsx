import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { auth, db } from "data/firebase";
import FormTicket from "layouts/Form/FormTicket";

import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import { Button, Grid } from "@mui/material";
import FormPassWord from "../FormPassWord/FormPassWord";
import Bg from "layouts/Body/Cart/Bg";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import './UerForm.css';
import FormInfo from "../FormInfo/FormInfo";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function UserForm() {
  const [value, setValue] = React.useState(0);
  const [valueTab, setValueTab] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    localStorage.clear();
    navigate("/");
  };
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);

  return (
    <>
      <Grid
        container
        rowSpacing={0}
        style={{ width: "100%", minHeight: "600px", paddingTop: "8rem" }}
      >

        <Grid xs={2} style={{ display: "grid" }}>
          <Button
          className={active1 === true ? "slide-right-button" : ""}
            onClick={() => {
              setValueTab(1);
              setActive1(true);
              setActive2(false);
              setActive3(false);
            }}
          >
            Thông tin cá nhân
            <span className="animation">
            {active1 === true ? <KeyboardDoubleArrowRightIcon /> : <></>}

            </span>
          </Button>
          <Button
            className={active2 === true ? "slide-right-button" : ""}
            onClick={() => {
              setValueTab(2);
              setActive1(false);
              setActive2(true);
              setActive3(false);
            }}
          >
            Lịch sử đặt vé
            <span className="animation">
            {active2 === true ? <KeyboardDoubleArrowRightIcon /> : <></>}

            </span>
          </Button>
          
          <Button
            onClick={() => {
              setValueTab(3);
              setActive1(false);
              setActive2(false);
              setActive3(true);
            }}
          >
            Đổi mật khẩu
            <span className="animation">
            {active3 === true ? <KeyboardDoubleArrowRightIcon /> : <></>}

            </span>
          </Button>
        </Grid>
        
        <Grid
          item xs={10}
          style={{ width: "100%", height: "100%", }}
        >
          {valueTab === 1 ? <FormInfo /> : (valueTab === 2 ? <FormTicket /> : <FormPassWord />)}
        </Grid>
       
      </Grid>
    </>
  );
}
