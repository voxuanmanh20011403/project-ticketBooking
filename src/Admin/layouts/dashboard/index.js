import Grid from "@mui/material/Grid";
import { useState, useEffect, useCallback } from "react";
import MDBox from "Admin/components/MDBox";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "Admin/examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "data/firebase";
import { ChartNe } from "./Chart/LineChartViewer";
import { useMemo } from "react";
import Projects from "./components/Projects";
import OrdersOverview from "./components/OrdersOverview";
import { BarChart } from "./Chart/BarChart";
function Dashboard() {
  const [viewerLastest, setViewerLastest] = useState(0);
  const [viewerLastMonth, setViewerLastMonth] = useState(0);
  const [userLastest, setUserLastest] = useState(0);
  const [userLastMonth, setUserLastMonth] = useState(0);

  const handleSnapshot = useCallback((snapshot) => {
    // let ViewerLastest = 0;
    // let  ViewerLastMonth =0;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    snapshot.forEach((doc) => {
      const { viewer, UserNew } = doc.data();
      const id = doc.id;
      const [year2, month2] = id.split("-");

      if (
        currentYear === parseInt(year2) &&
        currentMonth === parseInt(month2)
      ) {
        setViewerLastest(viewer);
        setUserLastest(UserNew);
      }
      if (
        currentYear === parseInt(year2) &&
        currentMonth === parseInt(month2) + 1
      ) {
        setViewerLastMonth(viewer);
        setUserLastMonth(UserNew);
      }
    });
  }, []);
  // growth = (viewerLastest - viewerLastMonth) / viewerLastMonth * 100
  useEffect(() => {
    const garagesCol = collection(db, "statistics");
    const unsubscribe = onSnapshot(garagesCol, handleSnapshot);
    return unsubscribe;
  }, [handleSnapshot]);
 
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
                icon="weekend"
                title="Số đặt vé thành công"
                count={viewerLastest}
                percentage={{
                  color:
                    viewerLastest > viewerLastMonth ? "success" : "primary",
                  amount: (
                    ((viewerLastest - viewerLastMonth) / viewerLastMonth) *
                    100
                  ).toFixed(0),
                  label:
                    viewerLastest >= viewerLastMonth
                      ? "% Tăng so với tháng trước"
                      : "% giảm so với tháng trước",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Tổng tiền thu về hệ thống"
                count={viewerLastest}
                percentage={{
                  color:
                    viewerLastest > viewerLastMonth ? "success" : "primary",
                  amount: (
                    ((viewerLastest - viewerLastMonth) / viewerLastMonth) *
                    100
                  ).toFixed(0),
                  label:
                    viewerLastest >= viewerLastMonth
                      ? "% Tăng so với tháng trước"
                      : "% giảm so với tháng trước",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Lượt truy cập hệ thống"
                count={viewerLastest}
                percentage={{
                  color:
                    viewerLastest > viewerLastMonth ? "success" : "primary",
                  amount: (
                    ((viewerLastest - viewerLastMonth) / viewerLastMonth) *
                    100
                  ).toFixed(0),
                  label:
                    viewerLastest >= viewerLastMonth
                      ? "% Tăng so với tháng trước"
                      : "% giảm so với tháng trước",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Tài khoản mới trong tháng"
                count={userLastest}
                percentage={{
                  color: userLastest > userLastMonth ? "success" : "primary",
                  amount: (
                    ((userLastest - userLastMonth) / userLastMonth) *
                    100
                  ).toFixed(0),
                  label:
                    userLastest >= userLastMonth
                      ? "% Tăng so với tháng trước"
                      : "% giảm so với tháng trước",
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
                <BarChart/>
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
