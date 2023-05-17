// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Button } from "@mui/material";
// import { useState } from "react";
// import { useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "data/firebase";
// import { useDispatch, useSelector } from "react-redux";

// function createData(
//   id,
//   id_Trip,
//   fullname,
//   email,
//   // startTime,
//   nameTrip,
//   // dateCheckout,
//   totalSeated,
//   totalPrice,
//   status
// ) {
//   return {
//     id,
//     id_Trip,
//     fullname,
//     email,
//     // startTime,
//     nameTrip,
//     // dateCheckout,
//     totalSeated,
//     totalPrice,
//     status,
//   };
// }

// export default function DenseTable() {
//   const [data, setData] = useState([]);
//   const dispatch = useDispatch();
//   const { email } = useSelector((state) => state.user);
//   // console.log(displayName);
//   useEffect(() => {
//     async function fetchData() {
//       const accountsCol = collection(db, "Checkout");
//       const accountsSnapshot = await getDocs(accountsCol);
//       const accountsList = accountsSnapshot.docs.map((doc) => {
//         return {
//           id: doc.id,
//           ...doc.data(),
//         };
//       });
//       setData(accountsList);
//     }
//     fetchData();
//   }, []);
//   //craete data
//   const rows = data.map((item) =>
//     createData(
//       item.id,
//       item.ID_Trip,
//       item.FullName,
//       item.Email,
//       // item.StartTime,
//       item.NameTrip,
//       // item.DateCheckout,
//       item.TotalSeated,
//       item.TotalPrice,
//       item.Status
//     )
//   );
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell style={{ width: "%" }} align="">
//               Khách hàng
//             </TableCell>
//             <TableCell style={{ width: "%" }} align="">
//               Email/Sdt
//             </TableCell>
//             <TableCell style={{ width: "%" }} align="">
//               Chuyến xe
//             </TableCell>
//             <TableCell style={{ width: "15%" }} align="center">
//               Ngày khởi hành
//             </TableCell>
//             <TableCell style={{ width: "%" }} align="center">
//               Số vé
//             </TableCell>
//             <TableCell style={{ width: "%" }} align="center">
//               Tổng thanh toán
//             </TableCell>
//             <TableCell style={{ width: "%" }} align="center">
//               Ngày thanh toán
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows
//             .filter((row) => row.status === "Success" && email === row.email)

//             .map((row) => (
//               <TableRow
//                 key={row.name}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell align="">{row.fullname}</TableCell>
//                 <TableCell align="">{row.email}</TableCell>
//                 <TableCell align="">{row.nameTrip}</TableCell>
//                 <TableCell align="center">Thời gian khởi hành</TableCell>
//                 <TableCell align="center">{row.totalSeated}</TableCell>
//                 <TableCell align="center">
//                   {row.totalPrice.toLocaleString()}
//                 </TableCell>

//                 <TableCell align="center">Ngày thanh toán</TableCell>

//                 <Button>Yêu cầu huỷ vé </Button>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
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

export default function DenseTable() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { email, displayName } = useSelector((state) => state.user);
  const currentDate = new Date();
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
  const [open, setOpen] = useState(false);
  const [infoTickets, setInfoTickets] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [status, setStatus] = useState("");
  const handleClickCancel = (id, nameTrips, startTime, status) => {
    setOpen(true);
    setIdUpdate(id);
    setInfoTickets(nameTrips + " vào lúc: " + startTime);
    setStatus(status);
  };
  const handleUpdate = () => {
    setOpen(false);
    //update
    const statisticsRef = doc(collection(db, "Checkout"), `${idUpdate}`);
    {
      status === "Success"
        ? updateDoc(statisticsRef, {
            Status: "Wait",
          })
            .then(() => {
              alert("ĐỢI thông báo");
            })
            .catch((error) => {
              alert("huỷ vé thất bại");
            })
        : updateDoc(statisticsRef, {
            Status: "Success",
          })
            .then(() => {
              alert("ĐỢI thông báo");
            })
            .catch((error) => {
              alert("huỷ vé thất bại");
            });
    }
  };
  const handleClose = () => {
    setOpen(false);
    setIdUpdate("");
    setStatus("");
  };
  const handleClose2 = () => {
    setOpen(false);
    setIdUpdate("");
    setStatus("");
  };
  console.log('setIdUpdate',idUpdate);
  return (
    <>
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
              .filter(
                (row) =>
                  (row.status === "Success" || row.status === "Wait") &&
                  email === row.email &&
                  row.startTime >= currentDate
              )

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
                  <Button
                    disabled={
                      row.startTime.getTime() - currentDate.getTime() <=
                      24 * 60 * 60 * 1000
                    }
                    onClick={(id) => {
                      handleClickCancel(
                        row.id,
                        row.nameTrip,
                        row.startTime.toLocaleString(),
                        row.status
                      );
                    }}
                  >
                    {row.status === "Wait" ? "Đang xem xét" : "Huỷ vé"}
                  </Button>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={() => handleClose2()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận huỷ vé"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {status === "Success" ? (
              <span>
                {displayName} ơi, bạn muốn huỷ chuyến xe: {infoTickets}?
              </span>
            ) : (
              <span>
                {displayName} ơi, bạn hoàn tác huỷ chuyến xe: {infoTickets}?
              </span>
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose()}>Hủy</Button>
          <Button
            onClick={() => {
              handleUpdate();
            }}
            color="primary"
            autoFocus
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
