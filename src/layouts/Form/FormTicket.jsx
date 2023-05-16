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
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "data/firebase";
import { useState } from "react";
import { useEffect } from "react";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import MDBox from "Admin/components/MDBox";

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
  console.log("checkout", data);
  //craete Data
  const rows = data
    .map((item) =>
      createData(
        item.id,
        item.ID_Trip,
        item.FullName,
        item.Email,
        item.StartTime,
        item.NameTrip,
        item.DateCheckout,
        item.TotalSeated,
        item.TotalPrice,
        item.Status
      )
    )
    .sort((a, b) => (a.calories < b.calories ? -1 : 1));
  //onlcik
  const [open1, setOpen1] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");

  const handleClose = () => {
    setOpen1(false);
    setIdUpdate("");
  };
  const handleClickStatus = (id) => {
    setOpen1(true);
    setIdUpdate(id);
  };

  return (
    <DashboardLayout>
      <Grid item md={6}>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <Box sx={{ width: "120%" }}>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 700 }}
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
                          <TableCell style={{ width: "15%" }} align="center">
                            Trạng Thái
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? rows
                              .filter((row) => row.status === "Xem xét")
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                          : rows.filter((row) => row.status === "Xem xét")
                        ).map((row) => (
                          <TableRow key={row.id_Trip}>
                            <TableCell align="">{row.fullname}</TableCell>
                            <TableCell align="">{row.email}</TableCell>
                            <TableCell align="">{row.nameTrip}</TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {row.startTime}
                            </TableCell>
                            <TableCell align="center">
                              {row.totalSeated}
                            </TableCell>
                            <TableCell align="center">
                              {row.totalPrice.toLocaleString()}
                            </TableCell>
                            <TableCell align="center">
                              {row.dateCheckout}
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
                                onClick={(id) => handleClickStatus(row.id)}
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
                              rows.filter((row) => row.status === "Xem xét")
                                .length
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
                  onClose={() => setOpen1(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                </Dialog>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
    </DashboardLayout>
  );
}