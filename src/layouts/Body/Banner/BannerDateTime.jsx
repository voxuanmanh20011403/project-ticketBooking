import React, { useState, useEffect  } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// router
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { tripActions } from "redux/slices/tripsSilce";
// toast 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './Banner.css'

export default function BannerDateTime({
  origin,
  destination,
  stateOrigin,
  stateDestination,
}) {
  const [selectDate, setSelectDate] = useState(dayjs());
  // check role là admin thì k cho navigate tới booking 
  const [role, setRole] = useState("");
  useEffect(() => {
    var data = JSON.parse(localStorage.getItem("account"));
    const role = data ? data.Role : "-1";
    setRole(role);
  }, []);

  const today = dayjs().startOf("day");
  const isDateDisabled = (date) => {
    return date.isBefore(today, "day");
  };
  const handleChangeDate = (date) => {
    setSelectDate(date);
  };
console.log("selectDate: " + selectDate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (stateOrigin === true && stateDestination === true) {
      toast.loading("Đang tìm kiếm...", { duration: 1000, autoClose: true });
      setTimeout(() => {
        toast.dismiss(); // đóng toast
      }, 1000);
      setTimeout(() => {
        toast.success("Tìm kiếm thành công!", {
          autoClose: 1000,
        });
      }, 1000);
      try {
        // reset lại data trước khi search
        await dispatch(
          tripActions.clearStateSearch()
        );

        await dispatch(
          tripActions.addSearch({
            origin: origin,
            destination: destination,
            selectDate: selectDate,
          })
        );
          if(role !==  0) {
            setTimeout(() => {
              navigate("/booking");
            }, 2500);
          }else{
            navigate("*");
          }
       
      } catch (error) {
        toast.error("Tìm kiếm thất bại!");
      }
    } else if (stateOrigin === false && stateDestination === true) {
      toast.error("Bạn chưa nhập nơi đi!");
    } else if (stateDestination === false && stateOrigin === true) {
      toast.error("Bạn chưa nhập nơi đến!");
    } else {
      toast.error("Bạn chưa nhập nơi đi và nơi đến!");
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Ngày đi"
        value={selectDate}
        onChange={handleChangeDate}
        shouldDisableDate={isDateDisabled}
        disablePast
        showTodayButton
        todayLabel="Now"
      ></DatePicker>
      <Stack direction="row">
        <Button variant="contained" disableElevation onClick={handleSearch}>
          <h3 className="btn">Tìm Chuyến</h3>
        </Button>
      </Stack>
    </LocalizationProvider>
  );
}
