import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "data/firebase";
import { useDispatch, useSelector } from "react-redux";
import './Tab.css'

function createData(
  id,
  id_Trip,
  fullname,
  email,
  nameTrip,
  totalSeated,
  totalPrice,
  status,
  startTime,
  dateCheckout
) {
  return {
    id,
    id_Trip,
    fullname,
    email,
    nameTrip,
    totalSeated,
    totalPrice,
    status,
    startTime,
    dateCheckout,
  };
}

export default function TicketsCancel() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);

  //get data from  db , sort : startTime
  const dataRef = collection(db, "Checkout");
  const getDatas = query(dataRef, orderBy("StartTime", "asc"));
  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(getDatas);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);
  //craete data
  const rows = data.map((item) => {
    const startTime = new Date(item.StartTime?.seconds * 1000);
    const dateCheckout = new Date(item.DateCheckout?.seconds * 1000);
    return createData(
      item.id,
      item.ID_Trip,
      item.FullName,
      item.Email,
      item.NameTrip,
      item.TotalSeated,
      item.TotalPrice,
      item.Status,
      startTime,
      dateCheckout
    );
  });
  return (
    <TableContainer component={Paper} className="form-table-container">
      <Table sx={{ minWidth: 600 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "%" }} align="">
              Khách hàng
            </TableCell>
            <TableCell style={{ width: "20%" }} align="">
              Email/Sdt
            </TableCell>
            <TableCell style={{ width: "%" }} align="">
              Chuyến xe
            </TableCell>
            <TableCell style={{ width: "15%" }} align="center">
              Ngày khởi hành
            </TableCell>
            <TableCell style={{ width: "%" }} align="center">
              Số vé
            </TableCell>
            <TableCell style={{ width: "%" }} align="center">
              Tổng thanh toán
            </TableCell>
            <TableCell style={{ width: "%" }} align="center">
              Ngày thanh toán
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .filter((row) => row.status === "Cancel" && email === row.email)

            .map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="">{row.fullname}</TableCell>
                <TableCell align="">{row.email}</TableCell>
                <TableCell align="">{row.nameTrip}</TableCell>
                <TableCell align="center">
                  {row.startTime.toLocaleString()}
                </TableCell>

                <TableCell align="center">{row.totalSeated}</TableCell>
                <TableCell align="center">
                  {row.totalPrice.toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {row.dateCheckout.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
