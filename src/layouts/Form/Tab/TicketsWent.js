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
import { collection, getDocs } from "firebase/firestore";
import { db } from "data/firebase";
import { useDispatch, useSelector } from "react-redux";

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

export default function TicketsWent() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);
  console.log("email", email);

  useEffect(() => {
    async function fetchData() {
      const accountsCol = collection(db, "Checkout");
      const accountsSnapshot = await getDocs(accountsCol);
      const accountsList = accountsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setData(accountsList);
    }
    fetchData();
  }, []);
  //craete data
  const rows = data.map((item) => {
    const startTime = new Date(item.StartTime?.seconds * 1000);
    console.log("startTime", startTime);
    return createData(
      item.id,
      item.ID_Trip,
      item.FullName,
      item.Email,
      item.NameTrip,
      item.TotalSeated,
      item.TotalPrice,
      item.Status,
      // item.StartTime,
      startTime,
      item.DateCheckout
    );
  });
  console.log("rows", rows);
  // Chuyển đổi giá trị startTime thành đối tượng Date

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "%" }} align="">
              Khách hàng
            </TableCell>
            <TableCell style={{ width: "%" }} align="">
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
            .filter((row) => {
              let checkDate = false;
              const currentDate = new Date(); // Thời gian hiện tại
              const startTime = new Date(row.startTime); // Chuyển đổi startTime từ string thành đối tượng Date
              if (startTime < currentDate) {
                return (checkDate = true);
              }
              console.log('emailqtc',email);
              console.log('emailqtc',row.email);

              return (
                row.status === "Success" &&
                email === row.email &&
                checkDate === true
              );
            })
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

                <TableCell align="center">Ngày thanh toán</TableCell>

                <Button>Đánh giá</Button>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
