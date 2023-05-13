import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import { seatEmptyUI, seatChooseUI, seatNullUI } from "./UISeat";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// redux
import { tripActions } from "redux/slices/tripsSilce";
import { useDispatch, useSelector } from "react-redux";
// Router
import { useNavigate } from "react-router-dom";

const ListSeat = ({ items }) => {
  // console.log("data: " + JSON.stringify(items.id));

  let listSeat = items.seat;

  const newListSeat = listSeat.map((seat) => {
    if (seat.status === "empty") {
      return {
        ...seat,
        ui: seatEmptyUI(),
      };
    } else if (seat.status === "book") {
      return {
        ...seat,
        ui: seatNullUI(),
      };
    } else {
      return seat;
    }
  });

  const [choNgoi, setChoNgoi] = useState(newListSeat);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatNames, setSelectedSeatNames] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleChoNgoi = (id, name) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(id)) {
        setTotalPrice(totalPrice - parseFloat(items.Price));
        return prevSelectedSeats.filter((seatid) => seatid !== id);
      } else {
        setTotalPrice(totalPrice + parseFloat(items.Price));
        return [...prevSelectedSeats, id];
      }
    });

    const newChoNgoi = [...choNgoi];
    // console.log(
    //   "Trạng thái ban đầu: " +
    //     "Trạng thái - " +
    //     JSON.stringify(newChoNgoi[0].status) +
    //     "Người đặt - " +
    //     JSON.stringify(newChoNgoi[0].nguoi_dat)
    // );

    const updatedChoNgoi = newChoNgoi.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === "empty" ? "book" : "empty",
          // nguoi_dat: item.status === "empty" ? "username" : "",
        };
      } else {
        return item;
      }
    });
    // console.log(
    //   "Trạng thái sau khi click: " +
    //     "Trạng thái - " +
    //     JSON.stringify(updatedChoNgoi[0].status) +
    //     "Người đặt - " +
    //     JSON.stringify(updatedChoNgoi[0].nguoi_dat)
    // );
    setChoNgoi(updatedChoNgoi);
  };

  useEffect(() => {
    const names = choNgoi
      .filter((seat) => selectedSeats.includes(seat.id))
      .map((seat) => seat.name);
    setSelectedSeatNames(names);
  }, [selectedSeats, choNgoi]);

  const renderSeatColumns = (choNgoi) => {
    const seatCols = [];
    if (choNgoi.length === 20) {
      const numSeats = choNgoi.length;
      const numCols = 4; // số cột muốn hiển thị
      const seatsPerCol = Math.ceil(numSeats / numCols);

      for (let i = 0; i < numCols; i++) {
        const colStart = i * seatsPerCol;
        const colEnd = colStart + seatsPerCol;
        const seatCol = choNgoi.slice(colStart, colEnd);
        seatCols.push(seatCol);
      }
    } else if (choNgoi.length === 34) {
      const numSeats = choNgoi.length;
      const numCols = 6; // số cột muốn hiển thị
      const seatsPerCol = Math.ceil(numSeats / numCols);

      for (let i = 0; i < numCols; i++) {
        const colStart = i * seatsPerCol;
        const colEnd = colStart + seatsPerCol;
        const seatCol = choNgoi.slice(colStart, colEnd);
        seatCols.push(seatCol);
      }
    } else {
      const numSeats = choNgoi.length;
      const numCols = 10;
      const seatsPerCol = [6, 1, 6, 1, 6, 6, 1, 6, 1, 6];

      let currentIndex = 0;

      for (let i = 0; i < numCols; i++) {
        const numSeatsInCol = seatsPerCol[i];
        const seatCol = choNgoi.slice(
          currentIndex,
          currentIndex + numSeatsInCol
        );
        seatCols.push(seatCol);
        currentIndex += numSeatsInCol;
      }
    }
    return seatCols.map((col, colIndex) => (
      <TableColumn key={colIndex} seats={col} />
    ));
  };
  const TableColumn = ({ seats }) => (
    <TableCell size="small">
      {seats.map((seat) => (
        <div
          key={seat.id}
          onClick={() => handleChoNgoi(seat.id, seat.name)}
          className={` ${seats.length === 1 ? "seat__note_single" : ""} 
            ${selectedSeats.includes(seat.id) ? "seat__note_choose" : ""}
          `}
        >
          <Tooltip title={seat.name} placement="top">
            {seat.ui}
          </Tooltip>
        </div>
      ))}
    </TableCell>
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const tokenLocal = localStorage.getItem("token");

  const handleContinue = () => {
    // console.log("data: " + JSON.stringify(items));
    if (totalPrice === 0) {
      // console.log("1232121");
      toast.error("Bạn chưa chọn vé!");
      console.log(typeof(tokenLocal));
    } else {
      if(tokenLocal){
        dispatch(
          tripActions.addBooking({
            id: items.id,
            // IdTrip: items.ID_Trip,
            ID_Garage: items.ID_Garage,
            NameGarage: items.NameGarage,
            NameTrip: items.NameTrip,
            StartTime: items.StartTime,
            PakingStart: items.PakingStart,
            PakingEnd: items.PakingEnd,
            EndTime: items.EndTime,
            duration: items.duration,
            price: items.Price,
            totalSeat: selectedSeatNames.length,
            listSeated: selectedSeatNames,
            totalPrice,
          })
        );
        setTimeout(() => {
          navigate("/payment");
        }, 1500);
      }else {
        toast.error("Bạn chưa đăng nhập!",{
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/SignIN");
        }, 1500);
      }
    }
  };

  const SeatTable = ({ choNgoi }) => (
    <div className="table">
      <TableContainer
        component={Paper}
        size="large"
        sx={{ width: "300 ", height: "auto", minWidth: 400 }}
      >
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <ControlCameraIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>{renderSeatColumns(choNgoi)}</TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={1}
      >
        <span>
          {selectedSeatNames.length} vé: {` `}
          {selectedSeatNames.map((name, index) => (
            <span key={index}>
              {name}
              {index !== selectedSeatNames.length - 1 && ", "}
            </span>
          ))}
        </span>
        <div className="total ">
          Tổng tiền:{" "}
          {totalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        spacing={0}
      >
        <Button
          size="small"
          className="btn"
          onClick={handleContinue}
        >
          Tiếp tục
        </Button>
        <ArrowRightAltIcon fontSize="large" color="white"/>
      </Stack>
    </div>
  );
  return <SeatTable choNgoi={choNgoi} />;
};

export default ListSeat;
