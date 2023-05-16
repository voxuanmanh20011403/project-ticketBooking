
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { auth, db } from 'data/firebase';
import FormTicket from 'layouts/Form/FormTicket';
import FormInfo from 'layouts/Form/FormInfo';
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
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function UserForm() {
  const [value, setValue] = React.useState(0);
  // const [accounts, setAccounts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await db.collection("Account").get();
  //     setAccounts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   fetchData();
  // }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    localStorage.clear();
    navigate('/');
  };
  return (
    // sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}
    >
      <Box sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        Height: 224
      }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Thông tin tài khoản" {...a11yProps(0)} />
          <Tab label="Vé của tôi" {...a11yProps(1)} />
          <Tab label="Đăng xuất" onClick={logout} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <FormInfo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormTicket />
        </TabPanel>
      </Box>
    </Box>
  );
}

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
// import { useTheme } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
//  import FormTicket from 'layouts/Form/FormTicket';
//  import FormInfo from 'layouts/Form/FormInfo';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     'aria-controls': `full-width-tabpanel-${index}`,
//   };
// }

// export default function FullWidthTabs() {
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center'}}>
//     <Box sx={{ bgcolor: 'background.paper', width: 1550, marginTop: '100px',  }}>
//       <AppBar position="static">
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           indicatorColor="secondary"
//           textColor="inherit"
//           variant="fullWidth"
//           aria-label="full width tabs example"
//         >
//           <Tab label="Thông tin tài khoản" {...a11yProps(0)}sx={{ minWidth: '200px' }} />
//           <Tab label="Quản lý vé" {...a11yProps(1)} />
//         </Tabs>
//       </AppBar>
//       <SwipeableViews
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//       >
//         <TabPanel value={value} index={0} dir={theme.direction}>
//         <FormInfo />
//         </TabPanel>
//         <TabPanel value={value} index={1} dir={theme.direction}>
//         <FormTicket />
//         </TabPanel>

//       </SwipeableViews>
//     </Box>
//     </div>
//   );
// }