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
} from "@mui/material";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import { db } from "data/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGarages = garages.filter((garage) =>
    garage.NameGarage.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [selectedTripId, setSelectedTripId] = useState(null);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item md={6}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Tên nhà xe</TableCell>
              <TableCell>Số xe chạy</TableCell>
              <TableCell>Tổng tiền thu về</TableCell>
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
                      (checkout.Status === "Thành công" ||
                        checkout.Status === "Thành công 1")
                  );
                  const totalPrice = tripCheckoutData.reduce(
                    (total, checkout) => total + checkout.TotalPrice,
                    0
                  );
                  totalRevenue += totalPrice;
                });
              return (
                <React.Fragment key={garage.id}>
                  <TableRow onClick={() => handleRowClick(garage.id)}>
                    <TableCell>
                      <IconButton size="small">
                        {openRow === garage.id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{garage.NameGarage}</TableCell>
                    <TableCell>
                      {
                        trips.filter((trip) => {
                          const today = new Date();
                          const tripStartTime = new Date(
                            trip.StartTime.toDate()
                          );
                          console.log("today", today.getDate());
                          tripStartTime.setHours(tripStartTime.getHours() - 2);

                          return (
                            trip.ID_Garage === garage.ID_Garage &&
                            // tripStartTime.getHours() <= today.getHours() &&
                            tripStartTime.getDate() === today.getDate() &&
                            tripStartTime.getMonth() === today.getMonth() &&
                            tripStartTime.getFullYear() === today.getFullYear()
                          );
                        }).length
                      }
                    </TableCell>
                    {/* Tổng tiền thu về */}
                    <TableCell>{totalRevenue}</TableCell>
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
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  {trips
                                    .filter((trip) => {
                                      const today = new Date();
                                      const tripStartTime = new Date(
                                        trip.StartTime.toDate()
                                      );
                                      const tripStartTime2 = new Date(
                                        trip.StartTime.toDate()
                                      );
                                      console.log("trip", trip);
                                      tripStartTime.setHours(
                                        tripStartTime.getHours() - 2
                                      );

                                      return (
                                        trip.ID_Garage === garage.ID_Garage &&
                                        // tripStartTime.getHours() <=
                                        //   today.getHours() &&
                                        tripStartTime.getDate() ===
                                          today.getDate() &&
                                        tripStartTime.getMonth() ===
                                          today.getMonth() &&
                                        tripStartTime.getFullYear() ===
                                          today.getFullYear()
                                      );
                                    })
                                    .map((trip) => {
                                      const tripCheckoutData =
                                        checkoutData.filter(
                                          (checkout) =>
                                            checkout.ID_Trip === trip.id &&
                                            (checkout.Status === "Thành công" ||
                                              checkout.Status ===
                                                "Thành công 1")
                                        );
                                      const totalSeats =
                                        tripCheckoutData.reduce(
                                          (total, checkout) =>
                                            total + checkout.ListSeated.length,
                                          0
                                        );
                                      const totalPrice =
                                        tripCheckoutData.reduce(
                                          (total, checkout) =>
                                            total + checkout.TotalPrice,
                                          0
                                        );
                                      return (
                                        <TableRow
                                          key={trip.id}
                                          onClick={() =>
                                            setSelectedTripId(trip.id)
                                          }
                                        >
                                          <TableCell>
                                            Biển số xe:{trip.LicensePlate}
                                            -Tuyến:
                                            {trip.NameTrip}
                                          </TableCell>
                                          <Table>
                                            <TableHead>
                                              <TableRow>
                                                <TableCell>
                                                  Số điện thoại
                                                </TableCell>
                                                <TableCell>Tên khách</TableCell>
                                                <TableCell>Số ghế</TableCell>
                                                <TableCell>Tổng tiền</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              {checkoutData
                                                .filter(
                                                  (checkout) =>
                                                    checkout.ID_Trip ===
                                                      trip.id &&
                                                    (checkout.Status ===
                                                      "Thành công" ||
                                                      checkout.Status ===
                                                        "Thành công 1")
                                                )
                                                .map((checkout) => (
                                                  <TableRow key={checkout.id}>
                                                    <TableCell>
                                                      {checkout.Email}
                                                    </TableCell>
                                                    <TableCell>
                                                      {checkout.FullName}
                                                    </TableCell>
                                                    <TableCell>
                                                      {
                                                        checkout.ListSeated
                                                          .length
                                                      }
                                                    </TableCell>
                                                    <TableCell>
                                                      {checkout.TotalPrice}
                                                    </TableCell>
                                                  </TableRow>
                                                ))}
                                              <TableRow>
                                                <TableCell colSpan={2} />
                                                <TableCell>
                                                  Số ghế đã đặt: {totalSeats}
                                                </TableCell>
                                                <TableCell>
                                                  Tổng tiền: {totalPrice}
                                                </TableCell>
                                                <TableCell colSpan={1} />
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
      </Grid>
    </DashboardLayout>
  );
}
