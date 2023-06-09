import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TableHead,
} from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "data/firebase";
import { useState } from "react";
import { useEffect } from "react";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import MDBox from "Admin/components/MDBox";
import MDTypography from "Admin/components/MDTypography";
// toasst
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// function createData(name, calories, fat) {
//   return { name, calories, fat };
// }

function createData(
  id,
  id_Trip,
  fullname,
  email,
  startTime,
  nameTrip,
  dateCheckout,
  totalSeated,
  totalPrice,
  status
) {
  return {
    id,
    id_Trip,
    fullname,
    email,
    startTime,
    nameTrip,
    dateCheckout,
    totalSeated,
    totalPrice,
    status,
  };
}

export default function CancelTickets() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //getData
  const [data, setData] = useState([]);

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
  //craete Data
  const rows = data
    .map((item) => {
      const startTime = new Date(item.StartTime?.seconds * 1000);
      const dateCheckout = new Date(item.DateCheckout?.seconds * 1000);
      return createData(
        item.id,
        item.ID_Trip,
        item.FullName,
        item.Email,
        startTime,
        item.NameTrip,
        dateCheckout,
        item.TotalSeated,
        item.TotalPrice,
        item.Status
      );
    })
    .sort((a, b) => (a.calories < b.calories ? -1 : 1));
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //onlcik
  const [open1, setOpen1] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");
  const [idTrip, setIdTrip] = useState("");
  const handleClose = () => {
    setOpen1(false);
    setIdUpdate("");
    setIdTrip("");
  };
  const handleClickStatus = (id, id_Trip) => {
    console.log("idUpdate: " + id);
    console.log("idTrip: " + id_Trip);
    setOpen1(true);
    setIdUpdate(id);
    setIdTrip(id_Trip);
  };

  const handleUpdate = () => {
    setOpen1(false);

    // update seat tcollection tripss when cancel ticket

    const tripRef = doc(collection(db, "Tripss"), idTrip);

    const updateTrip = async () => {
      try {
        const checkoutDocRef = doc(db, "Checkout", `${idUpdate}`);
        const checkoutDocSnapshot = await getDoc(checkoutDocRef);
        let dataSendEmail = [];
        let listSeat = [];
        if (checkoutDocSnapshot.exists()) {
          const checkoutData = checkoutDocSnapshot.data();
          dataSendEmail.push(checkoutData);
          listSeat = checkoutData.ListSeated;
        }

        const docSnap = await getDoc(tripRef);
        const data = docSnap.data();
        const updatedSeat = data.seat.map((s) => {
          if (listSeat.includes(s.name)) {
            return { ...s, status: "empty" };
          }
          return s;
        });

        await updateDoc(tripRef, { seat: updatedSeat });
        // update status checkout
        const statisticsRef = doc(collection(db, "Checkout"), `${idUpdate}`);
        updateDoc(statisticsRef, {
          Status: "Cancel",
        });
        toast.success("Hủy vé thành công!", {
          autoClose: 1000,
        });
        const templateParams = {
          toEmail: dataSendEmail[0].Email,
          fullName: dataSendEmail[0].FullName,
          nameGarage: dataSendEmail[0].NameGarage,
          idTrip: dataSendEmail[0].ID_Trip,
          nameTrip: dataSendEmail[0].NameTrip,
          totalSeated: dataSendEmail[0].TotalSeated,
          listSeated: dataSendEmail[0].ListSeated,
          totalPrice: dataSendEmail[0].TotalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          }),
        };

        // emailjs
        //   .send(
        //     "gmail",
        //     "template_03k3cnb",
        //     templateParams,
        //     "nw10q72SaDSc17UUF"
        //   )
        //   .then(
        //     (response) => {
        //       console.log("SUCCESS!", response.status, response.text);
        //     },
        //     (error) => {
        //       console.log("FAILED...", error);
        //     }
        //   );
      } catch (e) {
        toast.error("Đã có lỗi xảy ra!" + error.message, {
          autoClose: 1000,
        });
      }
    };
    updateTrip();
    // send mail when cancel ticket
  };
  const handleClose2 = () => {
    setOpen1(false);
    setIdUpdate("");
    setIdTrip("");
    // setStatus("");
  };
  const reUpdateData = ( ) => {
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
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item md={6}>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "80px",
                  }}
                >
                  <MDTypography variant="h6" color="white">
                    <div style={{ width: "400px", display: "flex" , fontWeight: "bold"}}>
                      <h3 className="h3Title" style={{fontWeight: "bold"} }> QUẢN LÝ HUỶ VÉ XE</h3>
                      <div className="btnAdd"></div>
                    </div>
                  </MDTypography>
                  <Button variant="contained" onClick={reUpdateData}>
                    <MDTypography variant="h6" color="white">
                      Cập nhật
                    </MDTypography>
                  </Button>
                </MDBox>
                <Box sx={{ width: "100%" }}>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 500 }}
                      aria-label="custom pagination table"
                      style={{ display: "block", padding: "1%" }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ width: "13%" }} align="">
                            Khách hàng
                          </TableCell>
                          <TableCell style={{ width: "19%" }} align="">
                            Email/Sdt
                          </TableCell>
                          <TableCell style={{ width: "15%" }} align="">
                            Chuyến xe
                          </TableCell>
                          <TableCell style={{ width: "15%" }} align="center">
                            Ngày khởi hành
                          </TableCell>
                          <TableCell style={{ width: "5%" }} align="center">
                            Số vé{" "}
                          </TableCell>
                          <TableCell style={{ width: "15%" }} align="center">
                            Tổng thanh toán
                          </TableCell>
                          <TableCell style={{ width: "15%" }} align="center">
                            Ngày thanh toán
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? rows
                              .filter((row) => row.status === "Wait")
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                          : rows.filter((row) => row.status === "Wait")
                        ).map((row, index) => (
                          <TableRow key={index}>
                            <TableCell align="">{row.fullname}</TableCell>
                            <TableCell align="">{row.email}</TableCell>
                            <TableCell align="">{row.nameTrip}</TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {row.startTime.toLocaleString()}
                            </TableCell>
                            <TableCell align="center">
                              {row.totalSeated}
                            </TableCell>
                            <TableCell align="center">
                              {row.totalPrice.toLocaleString()}
                            </TableCell>
                            <TableCell align="center">
                              {row.dateCheckout.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                style={{
                                  backgroundColor: "#49a3f1",
                                  color: "white",
                                  display: "table",
                                  height: "fit-content",
                                  margin: "2px 0px",
                                }}
                                variant="contained"
                                color="success"
                                onClick={(id, id_Trip) =>
                                  handleClickStatus(row.id, row.id_Trip)
                                }
                              >
                                {row.status}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}

                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[
                              5,
                              10,
                              25,
                              { label: "All", value: -1 },
                            ]}
                            colSpan={3}
                            count={
                              rows.filter((row) => row.status === "Wait").length
                            }
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: {
                                "aria-label": "rows per page",
                              },
                              native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Box>
                <Dialog
                  open={open1}
                  onClose={() => handleClose2()}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Xác nhận huỷ vé"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Bạn có chắc chắn hoàn thành thao tác HUỶ VÉ này?
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
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
    </DashboardLayout>
  );
}
