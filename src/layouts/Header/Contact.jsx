import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import Login from './../Login/index';
import { useDispatch, useSelector } from "react-redux";
// import { auth } from './../../data/firebase';


function handleCartClick() {
  const cart = document.getElementById('cart'); // lấy thẻ chứa tuyến phổ biến
  cart.scrollIntoView({ behavior: 'smooth' }); // cuộn trang web đến vị trí của thẻ cart
}

function handleBusClick() {
  const bus = document.getElementById('bus'); // lấy thẻ chứa tuyến phổ biến
  bus.scrollIntoView({ behavior: 'smooth' }); // cuộn trang web đến vị trí của thẻ cart
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

  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.user);
  console.log(displayName);

  const [userName, setUserName] = useState('');

  // const handleLoginSuccess = (user) => {
  //   setIsLoggedIn(true);
  //   setUserName(user.name);
  // };
  const navigate = useNavigate();

  const Logged = localStorage.getItem("isLoggedIn");
  console.log(Logged);

  const handleLoginClick = () => {
    // Lưu dữ liệu vào localStorage

    // Chuyển hướng đến tab login
    navigate('/SignIn');

    console.log(handleLoginClick);
  };
  const handleRegisterClick = () => {
    localStorage.setItem('isLoggedIn', true)
    navigate('/Register');
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
        <Typography className='logo__img' sx={{ minWidth: 300 }}></Typography>
        <Typography fontSize="large" sx={{ minWidth: 150 }} count={13} variant="outlined" className="head_cart" color="secondary"  >Tìm Chuyến</Typography>
        <Typography fontSize="large" sx={{ minWidth: 150 }} count={13} variant="outlined" color="secondary" className="head_cart" onClick={handleCartClick} >
          Tuyến Phổ Biến
        </Typography>
        <Typography fontSize="large" sx={{ minWidth: 150 }} count={13} variant="outlined" className="head_cart" color="secondary" onClick={handleBusClick}>Bến Xe Khách</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 20 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          > <div className='icon'>
              <div>
                {Logged ? (
                  <>
                    <p>Xin chào, {displayName}</p>
               
                  </>
                ) : (
                  <Avatar sx={{ width: 40, height: 40 }} />
                )}
              </div>
            </div>


          </IconButton>
        </Tooltip>
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
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -1.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={handleLoginClick} >
          {/* onClick={handleLogin} >  */}
          Đăng Nhập
        </MenuItem>
        <MenuItem onClick={handleRegisterClick}>
          Đăng Ký
        </MenuItem>
        <MenuItem >
        Đăng xuất
        </MenuItem>
        <Divider />
      </Menu>
    </React.Fragment>
    
  );
}