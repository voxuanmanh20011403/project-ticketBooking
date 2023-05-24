import React, { useState ,useEffect} from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TabsUI from "./TabsUI";
import ChooseSeat from "./ChooseSeat";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "data/firebase";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const UIFT = () => {
  return (
    <svg
      class="TicketPC__LocationRouteSVG-sc-1mxgwjh-4 eKNjJr"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="74"
      viewBox="0 0 14 74"
    >
      <path
        fill="none"
        stroke="#787878"
        stroke-linecap="round"
        stroke-width="2"
        stroke-dasharray="0 7"
        d="M7 13.5v46"
      ></path>
      <g fill="none" stroke="#484848" stroke-width="3">
        <circle cx="7" cy="7" r="7" stroke="none"></circle>
        <circle cx="7" cy="7" r="5.5"></circle>
      </g>
      <path
        d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z"
        fill="#787878"
      ></path>
    </svg>
  );
};

const InfoTrip = ({ items }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showListSeat, setShowListSeat] = useState(false);
  const [imgGagare, setImgGagare] = useState("");

  const timeStart = items.StartTime;
  const dateS = new Date(timeStart.seconds * 1000);
  const dayS = dateS.getDate();
  const monthS = dateS.getMonth() + 1;
  const yearS = dateS.getFullYear();
  const hoursS = dateS.getHours();
  const minutesS = dateS.getMinutes();

  const endTime = items.EndTime;
  const date = new Date(endTime.seconds * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const seatEmpty = () => {
    let countSeat = 0;
    const listSeat = items.seat;
    listSeat.forEach((item) => {
      if (item.status === "empty") {
        countSeat++;
      }
    });
    return countSeat;
  };
  const handleStateDetails = () => {
    setShowDetails(!showDetails);
  };
  const handleShowListSeat = () => {
    setShowListSeat(!showListSeat);
  };

  // get img from collection Gagare
  useEffect(() => {
    const getGarageUrlImage = async () => {
      try {
        const id = items.ID_Garage;
        const garageCol = collection(db, "Garage");
        const q = query(garageCol, where("ID_Garage", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const garageData = querySnapshot.docs[0].data();
          const urlImage = garageData.UrlImage;
          console.log("img: " + urlImage);
          setImgGagare(urlImage);
        }
      } catch (error) {
        console.error("Lỗi: ", error);
      }
    };
    getGarageUrlImage()
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} className="listtrip">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item>
            <img
              src={imgGagare}
              alt="Hình ảnh nhà xe"
              style={{ objectFit: "cover", height: "70%", width: "100%" }}
            />
          </Item>
        </Grid>
        <Grid item xs={9} className="info__main">
          <Item>
            <div className="v__info">
              <span className="ten__xe">
                Xe {items.NameGarage}
                <span className="star">
                  <StarIcon sx={{ fontSize: 15 }} />
                  4.2(42)
                </span>
              </span>
              <span className="cost">
                {items.Price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
                /ghế
              </span>
            </div>
            <div className="type">{items.TypeVehicle}</div>
            <div className="type">
              Ngày khởi hành: {dayS + "-" + monthS + "-" + yearS}
            </div>
            <div className="lich__trinh">
              <div>
                <UIFT />
              </div>
              <div className="start__end">
                <span className="noi__den">
                  {hoursS + ":" + minutesS}- {items.PakingStart}
                </span>
                <span className="time"> {items.duration} </span>
                <span className="noi__den">
                  {hours + ":" + minutes} - {items.PakingEnd}
                </span>
              </div>
              <div className="ghe__trong">
                <h4>{seatEmpty()} ghế trống</h4>
              </div>
              <div className="tabs">
                <Link
                  href="#"
                  className="tabs__link"
                  onClick={handleStateDetails}
                >
                  Thông tin chi tiết
                  {showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Link>
                {/*  */}
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  className="tab__btn"
                  onClick={handleShowListSeat}
                >
                  Chọn vị trí
                </Button>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} className="info__main popup">
          <Item>{showDetails && <TabsUI items={items} />}</Item>
          <Item>{showListSeat && <ChooseSeat items={items} />}</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoTrip;
