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

const ListSeat = ({ items }) => {
  let listSeat = items.seat;
  // console.log("trước: "+ listSeat);

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
  // console.log("sau: " + newListSeat);

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

    // const numCols = 5;
    // const numSeatsPerCol = [6, 1, 6, 1, 6];
    // const seatCols = [];

    // for (let i = 0; i < numCols; i++) {
    //   const colStart = seatCols.reduce((acc, col) => acc + col.length, 0);
    //   const colEnd = colStart + numSeatsPerCol[i];
    //   const seatCol = choNgoi.slice(colStart, colEnd);
    //   seatCols.push(seatCol);
    // }

    // const numSeats = choNgoi.length;
    // const numCols = 5; // số cột muốn hiển thị
    // const colConfigs = [
    //   { numSeats: 6, showLastSeat: false },
    //   { numSeats: 1, showLastSeat: true },
    //   { numSeats: 6, showLastSeat: false },
    //   { numSeats: 1, showLastSeat: true },
    //   { numSeats: 6, showLastSeat: false },

    // ];
    // const seatCols = [];

    // for (let i = 0; i < numCols; i++) {
    //   const { numSeats, showLastSeat } = colConfigs[i];
    //   const colStart = seatCols.reduce(
    //     (total, seats) => total + seats.length,
    //     0
    //   );
    //   const colEnd = colStart + numSeats;
    //   const seatCol = choNgoi.slice(colStart, colEnd);
    //   if (showLastSeat && seatCol.length > 0) {
    //     seatCol[seatCol.length - 1].isLastSeat = true;
    //   }
    //   seatCols.push(seatCol);
    // }

    // const numSeats = choNgoi.length;
    // const numCols = 5; // số cột muốn hiển thị
    // const seatsPerCols = [6, 1, 6, 1, 6]; // Số ghế cho từng cột
    // const seatCols = [];

    // let seatIndex = 0;
    // for (let i = 0; i < numCols; i++) {
    //   const colSeats = choNgoi.slice(seatIndex, seatIndex + seatsPerCols[i]);
    //   seatCols.push(colSeats);
    //   seatIndex += seatsPerCols[i];
    // }

    // const numSeats = choNgoi.length;
    // const numCols = 4; // số cột muốn hiển thị
    // const seatsPerCol = Math.ceil(numSeats / numCols);
    // const seatCols = [];

    // for (let i = 0; i < numCols; i++) {
    //   const colStart = i * seatsPerCol;
    //   const colEnd = colStart + seatsPerCol;
    //   const seatCol = choNgoi.slice(colStart, colEnd);
    //   seatCols.push(seatCol);
    // }

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
          className={selectedSeats.includes(seat.id) ? "seat__note_choose" : ""}
        >
          <Tooltip title={seat.name} placement="top">
            {seat.ui}
          </Tooltip>
        </div>
      ))}
    </TableCell>
  );

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
      <div>
        <span>Danh sách ghế đang đặt:</span>
        {selectedSeatNames.map((name) => (
          <span key={name}>{name} </span>
        ))}
        <br />
        <span>Tổng số lượng ghế: {selectedSeatNames.length}</span>
      </div>
      <div className="btn__tt">
        <div className="total">Tổng tiền: {totalPrice} đ</div>
        <Button variant="contained" size="small" className="btn">
          Tiếp tục
          <ArrowRightAltIcon className="icon" />
        </Button>
      </div>
    </div>
  );
  return <SeatTable choNgoi={choNgoi} />;
};

export default ListSeat;
