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
import FormInfo from "../FormInfo/FormInfo";
import FormPassWord from "../FormPassWord/FormPassWord";
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
        <Box sx={{ p: 3 }}>gi
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
  return (
    <>
      <Grid container rowSpacing={1} style={{ width: "100%", minHeight: "600px", paddingTop:'6rem' }}>
        <Grid xs={2} style={{ display: "grid" }}>
          <Button onClick={() => setValueTab(1)}>Thông tin cá nhân</Button>
          <Button onClick={() => setValueTab(2)}>Lịch sử đặt vé</Button>
          <Button onClick={() => setValueTab(3)}>Đổi mật khẩu</Button>

        </Grid>
        <Grid
          xs={10}
          style={{ width: "100%", height: "100%", border: "1px solid black" }}
        >
          {valueTab === 1 ? <FormInfo /> : (valueTab === 2 ? <FormTicket /> : <FormPassWord />)}
        </Grid>
      </Grid>
    </>
  );
}
