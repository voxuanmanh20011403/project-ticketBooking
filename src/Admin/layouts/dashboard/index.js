import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import MDBox from "Admin/components/MDBox";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import Footer from "Admin/examples/Footer";
import ReportsBarChart from "Admin/examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "Admin/examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "Admin/examples/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsBarChartData from "./data/reportsBarChartData";
import reportsLineChartData from "./data/reportsLineChartData";
import OrdersOverview from "./components/OrdersOverview";
import Projects from "./components/Projects";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "data/firebase";
import { ChartNe } from "./Chart/LineChartViewer";


function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* so user ở dashboard */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                // icon="weekend"
                // title="Bookings"
                // count="2,300"
                // percentage={{
                //   color: 120 > 100 ? "success" : "primary",
                //   amount: percent,
                //   label: "than lask month",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Month's Users"
                count="2,300"
                percentage={{
                  color: "secondary",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}></MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}></MDBox>
          </Grid>
        </Grid>
        {/* phan2 : chart */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ChartNe />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ChartNe />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ChartNe />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      
    </DashboardLayout>
  );
}

export default Dashboard;
