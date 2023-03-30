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

function Dashboard() {

  const { sales, tasks } = reportsLineChartData;
  const [count,setCount]=useState(0);
  const [percent, setPercent]=useState();
  useEffect(() => {
    const value=190/100*100;
    value>=100 ? setPercent("+ "+(value-100)+" % "): setPercent(" - "+(100-value)+" % " )
    setCount(1209);
  },[]);
  return (
    <DashboardLayout>
      {/* Header */}
      <DashboardNavbar />
      <MDBox py={3}>
        {/* so user ở dashboard */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={count}
                percentage={{
                  color:120>100?"success":"primary",
                  amount: percent,
                  label: "than lask month",
                }}
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
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Viewer"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Revenue month"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* phan2 : chart */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            {/* bên phai */}
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            {/* bên trái */}
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
