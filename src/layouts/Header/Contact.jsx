// import React from 'react'
// import PhoneIcon from '@mui/icons-material/Phone';
// import styles from './Header.css';



// const Contact = () => {
//   // const navigate = useNavigate();
//   return (
//     <>
//       <div className='logo'>
//         <div
//           onClick={() => {
//             // navigate('/');
//           }}
//           className='logo__img' >
//           {/* {<img src="assets\img/logo.png" alt="logo" width='160px' height='33px' />} */}
//         </div>
//       </div>
//        <div className='contact'>
//     <div className='contact__phone' >
//               <PhoneIcon/>
//               <span>1900 888684</span>
//               <div>
//               <span>Thuê Xe</span>
//               </div>
//               <div><span>Quản lý đơn hàng</span></div>
//               <div><span>Trở thành đối tác</span></div> 
//        </div> 
//        </div> 
//     </>
//   )
// }

// export default Contact


import * as React from 'react';
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

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography className='logo__img' sx={{ minWidth: 200}}></Typography>
        <div className='logo'>SwiftRide</div>
        <Typography sx={{ minWidth: 150 }}>Tìm Chuyến</Typography>
        <Typography sx={{ minWidth: 150 }}>Tuyến Đường Phổ Biến</Typography>
        <Typography sx={{ minWidth: 150 }}>Ưu Đãi Nổi Bật</Typography>
        <Typography sx={{ minWidth: 150 }}>Bến Xe Khách</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
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
        <MenuItem onClick={handleClose}>
           Đăng Nhập
        </MenuItem>
        <MenuItem onClick={handleClose}>
           Đăng Ký
        </MenuItem>
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}