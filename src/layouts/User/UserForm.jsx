
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
          <Tab label="Lịch sử đặt vé" {...a11yProps(2)} />
          <Tab label="Đăng xuất" onClick={logout} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <FormInfo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormTicket />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6} >
          {/* <a href="/">đăng xuất</a> */}abc
        </TabPanel>
      </Box>
    </Box>
  );
}