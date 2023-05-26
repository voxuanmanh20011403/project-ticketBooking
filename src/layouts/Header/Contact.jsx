import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import Login from "./../Login/index";
import { useDispatch, useSelector } from "react-redux";

import { auth } from 'data/firebase';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Hotline from 'layouts/Header/Hotline';
import Email from 'layouts/Header/Email'
import { Link } from 'react-router-dom';
import "./Header.css"


function handleCartClick() {
  const cart = document.getElementById("cart"); // lấy thẻ chứa tuyến phổ biến
  cart.scrollIntoView({ behavior: "smooth" }); // cuộn trang web đến vị trí của thẻ cart
}

function handleBusClick() {
  const bus = document.getElementById("bus"); // lấy thẻ chứa tuyến phổ biến
  bus.scrollIntoView({ behavior: "smooth" }); // cuộn trang web đến vị trí của thẻ cart
}

function handlePolicyClick() {
  const policy = document.getElementById("policy"); // lấy thẻ chứa tuyến phổ biến
  policy.scrollIntoView({ behavior: "smooth" }); // cuộn trang web đến vị trí của thẻ cart
}

export default function Contact() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    auth.signOut();
    localStorage.clear();
    navigate("/");
  };

  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.user);
  console.log(displayName);

  const [userName, setUserName] = useState("");

  // const handleLoginSuccess = (user) => {
  //   setIsLoggedIn(true);
  //   setUserName(user.name);
  // };
  const navigate = useNavigate();

  const Logged = localStorage.getItem("isLoggedIn");
  // console.log(Logged);
  // get role from local
  const [role, setRole] = useState("");
  useEffect(() => {
    var data = JSON.parse(localStorage.getItem("account"));
    const role = data ? data.Role : "-1";
    setRole(role);
  }, []);
  const handleDashboard = () => {
    navigate("/admin");
  };
  const handleLoginClick = () => {
    // Lưu dữ liệu vào localStorage

    // Chuyển hướng đến tab login
    navigate("/SignIn");
    // console.log(handleLoginClick);
  };
  const handleRegisterClick = () => {
    localStorage.setItem("isLoggedIn", true);
    navigate("/Register");
  };
  const handleUserClick = () => {
    localStorage.setItem("isLoggedIn", true);
    navigate("/user");
  };
  // const navigate1 = useNavigate();
  // const auth = firebase.auth();
  // const logout = () => {
  //   auth.signOut();
  //   localStorage.clear();
  //   navigate('/');
  // };

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  function handleLogin() {
    // Xử lý đăng nhập ở đây
    setIsLoggedIn(true);
  }
  return (
    <React.Fragment>


<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
  {/* Thẻ bên trái */}

  <Link to="/" className="logo__link" style={{ minWidth: 100 }}>
    <div className='logo__img'></div>
  </Link>

  

  {/* Phần con của Box */}
  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: 2 }}>
    <Typography fontSize="large" fontWeight="500" sx={{ minWidth: 200 }} variant="button" className="head_cart" color="info" onClick={handleCartClick}>
    Tuyến Phổ Biến
    </Typography>
    <Typography fontSize="large" fontWeight="500" sx={{ minWidth: 150 }} variant="button" color="info" className="head_cart" onClick={handleBusClick}>
    Bến Xe Khách
    </Typography>
    <Typography fontSize="large" fontWeight="500" sx={{ minWidth: 250 }} variant="button" className="head_cart" color="info"  onClick={handlePolicyClick} >
    Chính Sách Hủy Vé
    </Typography>
    <Stack direction="row" spacing={1}>
      <Email />
      <Hotline />
    </Stack>
    <Tooltip title="Account settings">
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <div className='icon'>
          <div display='flex'>
            {Logged ? (
              <p>Xin chào, {displayName} </p>
            ) : (
              <Avatar sx={{ width: 40, height: 40 }} />
            )}
          </div>
        </div>
      </IconButton>
    </Tooltip>
  </Box>
</Box>


      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -1.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {Logged ? (
          <>
            <MenuItem onClick={handleUserClick}>Thông Tin</MenuItem>
            <MenuItem onClick={logout}>Đăng xuất</MenuItem>
            {role === "0" ? (
              <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
            ) : (
              ""
            )}
            <Divider />
          </>
        ) : null}
        {!Logged ? (
          <>
            <MenuItem onClick={handleLoginClick}>Đăng Nhập</MenuItem>
            <MenuItem onClick={handleRegisterClick}>Đăng Ký</MenuItem>
            <Divider />
          </>
        ) : null}
      </Menu>
    </React.Fragment>
  );
}
