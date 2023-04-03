import React, { useState } from "react";
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

const dataTrips = [
  {
    id_xe: "xept",
    ten_xe: "Phương Trang",
    hinh_anh: "",
    gia_ve: "300 000đ",
    noi_xp: "Hà Nội",
    noi_den: "Đà Nẵng",
    h_xp: "7:00 24/03/2023",
    h_den: "10:00 25/03/2023",
    h_di: "27h",
    so_ghe: 5,
    cho_ngoi: [
      {
        id_cn: "01",
        ten_ghe: "A1",
        trang_thai: "trống",
        nguoi_dat: "",
        ui: seatEmptyUI(),
      },
      {
        id_cn: "02",
        ten_ghe: "A2",
        trang_thai: "đã đặt",
        nguoi_dat: "Tân",
        ui: seatNullUI(),
      },
      {
        id_cn: "03",
        ten_ghe: "B1",
        trang_thai: "trống",
        nguoi_dat: "",
        ui: seatEmptyUI(),
      },
      {
        id_cn: "04",
        ten_ghe: "B2",
        trang_thai: "trống",
        nguoi_dat: "",
        ui: seatEmptyUI(),
      },
      {
        id_cn: "05",
        ten_ghe: "B3",
        trang_thai: "đã đặt",
        nguoi_dat: "Dũng",
        ui: seatNullUI(),
      },
      {
        id_cn: "06",
        ten_ghe: "A1",
        trang_thai: "trống",
        nguoi_dat: "",
        ui: seatEmptyUI(),
      },
      {
        id_cn: "07",
        ten_ghe: "A1",
        trang_thai: "trống",
        nguoi_dat: "",
        ui: seatEmptyUI(),
      },
      {
        id_cn: "12",
        ten_ghe: "A1",
        trang_thai: "trống",
        nguoi_dat: "",
        ui: seatEmptyUI(),
      },
      {
        id_cn: "08",
        ten_ghe: "A1",
        trang_thai: "trống",
        nguoi_dat: "",
        ui: seatEmptyUI(),
      },
      {
        id_cn: "09",
        ten_ghe: "A1",
        trang_thai: "trống",
        nguoi_dat: "",
        ui: seatEmptyUI(),
      },
      {
        id_cn: "10",
        ten_ghe: "A1",
        trang_thai: "trống",
        nguoi_dat: "",
        ui: seatEmptyUI(),
      },
      {
        id_cn: "11",
        ten_ghe: "A1",
        trang_thai: "trống",
        nguoi_dat: "",
        ui: seatEmptyUI(),
      },
    ],
  },
];

const ListSeat = () => {
  const [choNgoi, setChoNgoi] = useState(dataTrips[0].cho_ngoi);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleChoNgoi = (id_cn, ten_ghe) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(id_cn)) {
        setTotalPrice(totalPrice - parseFloat(dataTrips[0].gia_ve));
        return prevSelectedSeats.filter((seatId) => seatId !== id_cn);
      } else {
        setTotalPrice(totalPrice + parseFloat(dataTrips[0].gia_ve));
        return [...prevSelectedSeats, id_cn];
      }
    });

    const newChoNgoi = [...choNgoi];
    // console.log(
    //   "Trạng thái ban đầu: " +
    //     "Trạng thái - " +
    //     JSON.stringify(newChoNgoi[0].trang_thai) +
    //     "Người đặt - " +
    //     JSON.stringify(newChoNgoi[0].nguoi_dat)
    // );

    const updatedChoNgoi = newChoNgoi.map((item) => {
      if (item.id_cn === id_cn) {
        return {
          ...item,
          trang_thai: item.trang_thai === "trống" ? "đã đặt" : "trống",
          nguoi_dat: item.trang_thai === "trống" ? "username" : "",
        };
      } else {
        return item;
      }
    });
    // console.log(
    //   "Trạng thái sau khi click: " +
    //     "Trạng thái - " +
    //     JSON.stringify(updatedChoNgoi[0].trang_thai) +
    //     "Người đặt - " +
    //     JSON.stringify(updatedChoNgoi[0].nguoi_dat)
    // );
    setChoNgoi(updatedChoNgoi);
  };
  const renderSeatColumns = (choNgoi) => {
    const numSeats = choNgoi.length;
    const numCols = 4; // số cột muốn hiển thị
    const seatsPerCol = Math.ceil(numSeats / numCols);
    const seatCols = [];

    for (let i = 0; i < numCols; i++) {
      const colStart = i * seatsPerCol;
      const colEnd = colStart + seatsPerCol;
      const seatCol = choNgoi.slice(colStart, colEnd);
      seatCols.push(seatCol);
    }

    return seatCols.map((col, colIndex) => (
      <TableColumn key={colIndex} seats={col} />
    ));
  };
  const TableColumn = ({ seats }) => (
    <TableCell>
      {seats.map((seat) => (
        <div
          key={seat.id_cn}
          onClick={() => handleChoNgoi(seat.id_cn, seat.ten_ghe)}
          className={
            selectedSeats.includes(seat.id_cn) ? "seat__note_choose" : ""
          }
        >
          <Tooltip title={seat.ten_ghe} placement="top">
            {seat.ui}
          </Tooltip>
        </div>
      ))}
    </TableCell>
  );

  const SeatTable = ({ choNgoi }) => (
    <div>
      <TableContainer
        component={Paper}
        size="small"
        sx={{ width: "100px", height: "auto", minWidth: 300 }}
      >
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
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
      <div className="btn__tt">
        <div>Tổng tiền: {totalPrice} đ</div>
        <Button variant="contained" size="small">
          Tiếp tục
          <ArrowRightAltIcon />
        </Button>
      </div>
    </div>
  );
  return <SeatTable choNgoi={choNgoi} />;
};

export default ListSeat;
