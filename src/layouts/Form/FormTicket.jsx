import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DenseTable from "./Tab/TicketsNow";
import TicketsCancel from "./Tab/TicketsCancel";
import TicketsWent from "./Tab/TicketsWent";
import { Grid } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FormTicket() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper',height: '60vh'
    }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
         
        >
      <Tab
    label={<Typography variant="body1" fontWeight="bold">Vé xe chưa đi</Typography>}
    {...a11yProps(0)}
    style={{ color: 'blue' }}
  />
  <Tab
    label={<Typography variant="body1" fontWeight="bold">Vé xe đã đi</Typography>}
    {...a11yProps(1)}
    style={{ color: 'blue' }}
  />
  <Tab
    label={<Typography variant="body1" fontWeight="bold">Vé xe đã huỷ</Typography>}
    {...a11yProps(2)}
    style={{ color: 'blue' }} />
          
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <DenseTable />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TicketsWent />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <TicketsCancel />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );

}
