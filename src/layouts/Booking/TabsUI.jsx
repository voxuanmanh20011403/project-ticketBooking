import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import Carousel from "./Carousel";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import StarIcon from "@mui/icons-material/Star";
import StarRateIcon from "@mui/icons-material/StarRate";
import Comment from "./Comment.jsx";
import { db } from "./../../data/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
// Tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const TabsUI = ({ items }) => {
  const [value, setValue] = React.useState(0);
  const [dataComment, setDataComment] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    try {
      const q = query(
        collection(db, "Comment"),
        where("ID_Garage", "==", items.ID_Garage)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let tempDB = [];
        querySnapshot.forEach((doc) => {
          tempDB.push({ ...doc.data(), id: doc.id });
        });
        // console.log(tempDB);
        setDataComment(tempDB);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Hình ảnh" {...a11yProps(0)} />
          <Tab label="Điểm đón - trả" {...a11yProps(1)} />
          <Tab label="Đánh giá" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Carousel />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container fixed>
          <span>
            Lưu ý: Các mốc thời gian đón, trả bên dưới là thời gian dự kiến.
          </span>
          <Box sx={{ height: "auto" }} className="location">
            <div className="location__left">
              <span>Điểm đón</span>
              <ul>
                <li> 7:00 - Bến xe phía Đông</li>
              </ul>
            </div>
            <div className="location__right">
              <span>Điểm trả</span>
              <ul>
                <li> 12:00 - Bến xe Trung tâm Đà Nẵng</li>
              </ul>
            </div>
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <Comment comments={dataComment} />
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default TabsUI;
