import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Line, Bar } from "react-chartjs-2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import MDBox from "Admin/components/MDBox";

//DatePicker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
//firebase
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "data/firebase";

const RevenueStatistics = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [revenueData, setRevenueData] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setStart(true);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleStatistics = async () => {
    const isoDateStart = Timestamp.fromDate(startDate.toDate());
    const isoDateEnd = Timestamp.fromDate(endDate.toDate());
    try {
      const checkoutCol = collection(db, "Checkout");
      const status = "Success";
      const q = query(
        checkoutCol,
        where("DateCheckout", ">=", isoDateStart),
        where("DateCheckout", "<=", isoDateEnd),
        where("Status", "==", status)
      );
      const querySnapshot = await getDocs(q);

      const revenueByGarage = {};
      let totalRevenue = 0;

      querySnapshot.forEach((doc) => {
        const { DateCheckout, ID_Garage, Status, TotalPrice, NameGarage } =
          doc.data();

        if (revenueByGarage[ID_Garage]) {
          revenueByGarage[ID_Garage].revenue += TotalPrice;
        } else {
          revenueByGarage[ID_Garage] = {
            nameGarage: NameGarage,
            revenue: TotalPrice,
            dates: [],
          };
        }
        revenueByGarage[ID_Garage].dates.push(DateCheckout);
        totalRevenue += TotalPrice;
      });

      const formattedRevenueData = Object.values(revenueByGarage);
      formattedRevenueData.sort(
        (a, b) =>
          new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime()
      );
      setRevenueData(formattedRevenueData);
      setRevenue(totalRevenue);
      setEnd(true);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };
  // console.log("revenueData:  " + JSON.stringify(revenueData));
  // console.log("revenueData:  " + JSON.stringify(revenue));

  const chartData = {
    labels: revenueData.map((item) => item.nameGarage),
    datasets: [
      {
        label: "Doanh thu",
        data: revenueData.map((item) => item.revenue),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const dateStart = new Date(startDate).toLocaleDateString();
  const dateEnd = new Date(endDate).toLocaleDateString();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <MDBox mb={1.5}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <DatePicker
                label="Ngày bắt đầu"
                value={startDate}
                onChange={handleStartDateChange}
                showTodayButton
              ></DatePicker>
              <DatePicker
                label="Ngày kết thúc"
                value={endDate}
                onChange={handleEndDateChange}
                showTodayButton
              ></DatePicker>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStatistics}
              >
                Thống kê
              </Button>
            </Stack>
            {start && end ? (
              <Typography variant="h5" gutterBottom>
                Thống kê từ ngày: {dateStart} - {dateEnd}
              </Typography>
            ) : (
              ""
            )}
          </LocalizationProvider>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nhà xe</TableCell>
                <TableCell>Doanh thu: </TableCell>
              </TableRow>
            </TableHead>
            {revenueData ? (
              revenueData.map((item, index) => (
                <TableBody key={index}>
                  <TableRow>
                    <TableCell>{item.nameGarage}</TableCell>
                    <TableCell>
                      {item.revenue.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>Không có chuyến xe nào</TableCell>
                </TableRow>
              </TableBody>
            )}
            <TableBody>
              <TableRow>
                <TableCell>
                  {revenue === 0 ? "" : "Tổng doanh thu: "}{" "}
                </TableCell>
                <TableCell>
                  {revenue === 0
                    ? ""
                    : revenue.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <MDBox mb={1.5}>
          <Bar data={chartData} />
        </MDBox>
      </Grid>
    </Grid>
  );
};

export default RevenueStatistics;
