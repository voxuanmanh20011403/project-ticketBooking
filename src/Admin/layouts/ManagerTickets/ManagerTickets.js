import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Card,
} from "@mui/material";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import { styled } from "@mui/material/styles";
import { db } from "data/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MDBox from "Admin/components/MDBox";
import { tableCellClasses } from "@mui/material/TableCell";
import MDTypography from "Admin/components/MDTypography";
import TableContainer from "@mui/material/TableContainer";

import "./ManagerTickets.css";
import {
  DatePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function ManagerTickets() {
  const [garages, setGarages] = useState([]);
  const [trips, setTrips] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const accountsCol = collection(db, "Garage");
      const accountsSnapshot = await getDocs(accountsCol);
      const accountsList = accountsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setGarages(accountsList);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const accountsCol = collection(db, "Trips");
      const accountsSnapshot = await getDocs(accountsCol);
      const accountsList = accountsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTrips(accountsList);
    }
    fetchData();
  }, []);
  const [checkoutData, setCheckoutData] = useState([]);
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
      setCheckoutData(accountsList);
    }
    fetchData();
  }, []);
  console.log("trips", trips);

  const [openRow, setOpenRow] = useState("");

  const handleRowClick = (id) => {
    setOpenRow((prevOpenRow) => (prevOpenRow === id ? "" : id));
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const filteredGarages = garages.filter((garage) =>
    garage.NameGarage.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [selectedTripId, setSelectedTripId] = useState(null);
  // const handleDateChange = (date) => {
  //   // Lấy giá trị ngày từ đối tượng date
  //   const selectedDate = date.getDate();

  //   console.log('selectedDate',selectedDate); // In giá trị ngày ra console
  // };
  const [selectDate, setSelectDate] = useState(dayjs());
  const handleChangeDate = (date) => {
    setSelectDate(date);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar onSearch={handleSearch} />
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
                  marginTop="10px"
                >
                  <MDTypography variant="h6" color="white">
                    <div style={{ width: "100%", display: "flex" }}>
                      <h3 className="h3Title"> Quản lý danh sách xe</h3>
                      <div className="btnAdd">
                        <Box
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              defaultValue={dayjs()}
                              onChange={handleChangeDate}
                            />
                          </LocalizationProvider>
                        </Box>
                      </div>
                    </div>
                  </MDTypography>
                </MDBox>
                <Box sx={{ width: "100%" }}>
                  <TableContainer>
                    <Table style={{ marginTop: "10px" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="right" className="code-container" />
                          <TableCell
                            style={{ width: "40%", marginLeft: "10px" }}
                          >
                            Tên nhà xe
                          </TableCell>
                          <TableCell
                            style={{ width: "30%", textAlign: "center" }}
                          >
                            Số xe chạy
                          </TableCell>
                          <TableCell
                            style={{ width: "30%", textAlign: "center" }}
                          >
                            Tổng tiền thu về
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredGarages.map((garage) => {
                          let totalRevenue = 0;
                          trips
                            .filter((trip) => {
                              // filter trips for this garage
                              return trip.ID_Garage === garage.ID_Garage;
                            })
                            .forEach((trip) => {
                              // calculate revenue for each trip
                              const tripCheckoutData = checkoutData.filter(
                                (checkout) =>
                                  checkout.ID_Trip === trip.id &&
                                  (checkout.Status === "Success" ||
                                    checkout.Status === "Wait")
                              );
                              const totalPrice = tripCheckoutData.reduce(
                                (total, checkout) =>
                                  total + checkout.TotalPrice,
                                0
                              );
                              totalRevenue += totalPrice;
                            });
                          return (
                            <React.Fragment key={garage.id}>
                              <TableRow
                                onClick={() => handleRowClick(garage.id)}
                              >
                                <TableCell>
                                  <IconButton size="small">
                                    {openRow === garage.id ? (
                                      <KeyboardArrowUpIcon />
                                    ) : (
                                      <KeyboardArrowDownIcon />
                                    )}
                                  </IconButton>
                                </TableCell>
                                <TableCell
                                  style={{
                                    display: "flex",
                                    marginLeft: "30px",
                                    textAlign: "center",
                                  }}
                                >
                                  {garage.NameGarage}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  {
                                    trips.filter((trip) => {
                                      const today = new Date();
                                      const tripStartTime = new Date(
                                        trip.StartTime.toDate()
                                      );
                                      console.log("today", today.getDate());
                                      tripStartTime.setHours(
                                        tripStartTime.getHours() - 2
                                      );
                                      const date = new Date(selectDate);
                                      return (
                                        trip.ID_Garage === garage.ID_Garage &&
                                        // tripStartTime.getHours() <= today.getHours() &&
                                        tripStartTime.getDate() ===
                                          date.getDate() &&
                                        tripStartTime.getMonth() ===
                                          date.getMonth() &&
                                        tripStartTime.getFullYear() ===
                                          date.getFullYear()
                                      );
                                    }).length
                                  }
                                </TableCell>
                                {/* Tổng tiền thu về */}
                                <TableCell style={{ textAlign: "center" }}>
                                  {totalRevenue.toLocaleString()}
                                </TableCell>
                                {/* <TableCell>{garage.id}</TableCell> */}
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{ paddingBottom: 0, paddingTop: 0 }}
                                  colSpan={6}
                                >
                                  <Collapse
                                    in={openRow === garage.id}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <Box margin={1}>
                                      <Table
                                        size="small"
                                        aria-label="purchases"
                                      >
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>
                                              {trips
                                                .filter((trip) => {
                                                  // const today = new Date();
                                                  const date = new Date(
                                                    selectDate
                                                  );
                                                  const tripStartTime =
                                                    new Date(
                                                      trip.StartTime.toDate()
                                                    );
                                                  const tripStartTime2 =
                                                    new Date(
                                                      trip.StartTime.toDate()
                                                    );

                                                  tripStartTime.setHours(
                                                    tripStartTime.getHours() - 2
                                                  );

                                                  return (
                                                    trip.ID_Garage ===
                                                      garage.ID_Garage &&
                                                    // tripStartTime.getHours() <=
                                                    //   today.getHours() &&
                                                    tripStartTime.getDate() ===
                                                      date.getDate() &&
                                                    tripStartTime.getMonth() ===
                                                      date.getMonth() &&
                                                    tripStartTime.getFullYear() ===
                                                      date.getFullYear()
                                                  );
                                                })
                                                .map((trip) => {
                                                  const tripCheckoutData =
                                                    checkoutData.filter(
                                                      (checkout) =>
                                                        checkout.ID_Trip ===
                                                          trip.id &&
                                                        (checkout.Status ===
                                                          "Success" ||
                                                          checkout.Status ===
                                                            "Wait")
                                                    );
                                                  const totalSeats =
                                                    tripCheckoutData.reduce(
                                                      (total, checkout) =>
                                                        total +
                                                        checkout.ListSeated
                                                          .length,
                                                      0
                                                    );
                                                  const totalPrice =
                                                    tripCheckoutData.reduce(
                                                      (total, checkout) =>
                                                        total +
                                                        checkout.TotalPrice,
                                                      0
                                                    );
                                                  return (
                                                    <TableRow
                                                      key={trip.id}
                                                      onClick={() =>
                                                        setSelectedTripId(
                                                          trip.id
                                                        )
                                                      }
                                                      style={{
                                                        display: "flex",
                                                        borderBottom:
                                                          "2px red solid",
                                                        marginTop: "20px",
                                                      }}
                                                    >
                                                      <TableCell
                                                        style={{ width: "40%" }}
                                                      >
                                                        Biển số xe:
                                                        {trip.LicensePlate}
                                                        Tuyến:
                                                        {trip.NameTrip}
                                                      </TableCell>
                                                      <Table
                                                        style={{
                                                          marginTop: "0px",
                                                        }}
                                                      >
                                                        <TableHead>
                                                          <TableRow>
                                                            <TableCell
                                                              style={{
                                                                width: "25%",
                                                              }}
                                                            >
                                                              Số điện
                                                              thoại/Email
                                                            </TableCell>
                                                            <TableCell
                                                              style={{
                                                                width: "25%",
                                                              }}
                                                            >
                                                              Tên khách
                                                            </TableCell>
                                                            <TableCell
                                                              style={{
                                                                width: "25%",
                                                              }}
                                                            >
                                                              Số ghế
                                                            </TableCell>
                                                            <TableCell
                                                              yle={{
                                                                width: "25%",
                                                              }}
                                                            >
                                                              Tổng tiền
                                                            </TableCell>
                                                          </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                          {checkoutData
                                                            .filter(
                                                              (checkout) =>
                                                                checkout.ID_Trip ===
                                                                  trip.id &&
                                                                (checkout.Status ===
                                                                  "Success" ||
                                                                  checkout.Status ===
                                                                    "Wait")
                                                            )
                                                            .map((checkout) => (
                                                              <TableRow
                                                                key={
                                                                  checkout.id
                                                                }
                                                              >
                                                                <TableCell>
                                                                  {
                                                                    checkout.Email
                                                                  }
                                                                </TableCell>
                                                                <TableCell>
                                                                  {
                                                                    checkout.FullName
                                                                  }
                                                                </TableCell>
                                                                <TableCell>
                                                                  {
                                                                    checkout
                                                                      .ListSeated
                                                                      .length
                                                                  }
                                                                </TableCell>
                                                                <TableCell>
                                                                  {checkout.TotalPrice.toLocaleString()}
                                                                </TableCell>
                                                              </TableRow>
                                                            ))}
                                                          <TableRow>
                                                            <TableCell
                                                              colSpan={2}
                                                            />
                                                            <TableCell
                                                              style={{
                                                                fontWeight:
                                                                  "bold",
                                                              }}
                                                            >
                                                              Số ghế đã đặt:{" "}
                                                              {totalSeats}
                                                            </TableCell>
                                                            <TableCell
                                                              style={{
                                                                fontWeight:
                                                                  "bold",
                                                              }}
                                                            >
                                                              Tổng tiền:{" "}
                                                              {totalPrice.toLocaleString()}
                                                            </TableCell>
                                                            <TableCell
                                                              colSpan={1}
                                                            />
                                                          </TableRow>
                                                        </TableBody>
                                                      </Table>
                                                    </TableRow>
                                                  );
                                                })}
                                            </TableCell>
                                          </TableRow>
                                        </TableHead>
                                      </Table>
                                    </Box>
                                  </Collapse>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
    </DashboardLayout>
  );
}
