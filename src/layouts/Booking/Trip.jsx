import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InfoTrip from "./InfoTrip";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Skeleton from "@mui/material/Skeleton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "./../../data/firebase";
// Router
import { useNavigate, useHistory } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "redux/slices/tripsSilce";
import "./style.css";
import BannerSearch from "layouts/Body/Banner/BannerSearch";
import dayjs from "dayjs";
import '../Body/Banner/Banner.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };
// Breadcrumbs
function handleClick(event) {
  event.preventDefault();
  // console.info("You clicked a breadcrumb.");
}
const SkeletonCustom = () => {
  return (
    <Stack spacing={1} direction="row">
      {/* For other variants, adjust the size with `width` and `height` */}
      {/* <Skeleton variant="circular" width={40} height={40} /> */}
      <Skeleton variant="rectangular" width={210} height={180} />
      <Skeleton variant="rounded" width={700} height={210} />
    </Stack>
  );
};

const Trip = ({ fetchData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  let [filteredData, setFilteredData] = useState();
  //Typography
  const [selectedTypography, setSelectedTypography] = useState("");
  const [statusSeat, setStatusSeat] = useState(false);

  const [startPointRedux, setStartPointRedux] = useState("");
  const [endPointRedux, setEndPointRedux] = useState("");
  // const [selectDate, setSelectDate] = useState("");
  const navigate = useNavigate();

  filteredData = fetchData.filter((item) => {
    if (selectedCheckboxes.length === 0) {
      return item.NameGarage.toLowerCase().includes(searchValue.toLowerCase());
    } else {
      const startTime = item.StartTime;
      const startHour = new Date(startTime.seconds * 1000).getHours();
      if (
        selectedCheckboxes.includes("morning") &&
        startHour >= 0 &&
        startHour < 12
      ) {
        return item.NameGarage.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      }
      if (
        selectedCheckboxes.includes("afternoon") &&
        startHour >= 12 &&
        startHour < 18
      ) {
        return item.NameGarage.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      }
      if (
        selectedCheckboxes.includes("evening") &&
        startHour >= 18 &&
        startHour < 24
      ) {
        return item.NameGarage.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      } else {
        return (
          item.TypeVehicle === selectedCheckboxes[0] &&
          item.NameGarage.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
    }
    return false;
    // if (selectedCheckboxes.length === 0) {
    //   return item.NameGarage.toLowerCase().includes(searchValue.toLowerCase());
    // } else {
    //   return (
    //     item.TypeVehicle === selectedCheckboxes[0] &&
    //     item.NameGarage.toLowerCase().includes(searchValue.toLowerCase())
    //   );
    // }
  });

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== value)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };

  // xử lý sort theo price
  const handleClickTypography = (sortType) => {
    setSelectedTypography(sortType);

    const sortedData = fetchData.sort((a, b) => {
      if (selectedTypography === "desc") {
        return a.Price - b.Price;
      } else if (selectedTypography === "asc") {
        return b.Price - a.Price;
      }
    });
    console.log("selectedTypography: " + selectedTypography);
    setFilteredData(sortedData);
  };
  // xử lý sort theo chỗ ngồi
  const handleSortSeat = () => {
    setStatusSeat((x) => !x);
  };
  useEffect(() => {
    const sortedData = fetchData.sort((a, b) => {
      const numEmptySeatsA = a.seat.filter(
        (seat) => seat.status === "empty"
      ).length;
      const numEmptySeatsB = b.seat.filter(
        (seat) => seat.status === "empty"
      ).length;

      if (statusSeat) return numEmptySeatsA - numEmptySeatsB;
      else return numEmptySeatsB - numEmptySeatsA;
    });

    // console.log("sortedData: " + JSON.stringify(sortedData));
    setFilteredData(sortedData);
  }, [statusSeat]);

  // get data from redux
  const stateSearch = useSelector((state) => state.trip.stateSearch);
  useEffect(() => {
    try {
      setStartPointRedux(stateSearch[0].origin);
      setEndPointRedux(stateSearch[0].destination);
      // setSelectDate(stateSearch[0].selectDate);
    } catch (e) {
      navigate("/");
    }
  }, []);

  // console.log("filteredData: " + JSON.stringify(filteredData));

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" onClick={handleClick}>
      Home
    </Link>,
    <Link underline="hover" key="2" color="inherit" onClick={handleClick}>
      Tìm vé
    </Link>,
    <Typography key="3" color="text.primary">
      {startPointRedux} - {endPointRedux}
    </Typography>,
  ];
  // CircularProgress for {fetchData.length}
  const [showNumber, setShowNumber] = useState(false);

  setTimeout(() => {
    setShowNumber(true);
  }, 3000);

  // Search and datetime 
  const [dataFake, setDataFake] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const accountsCol = collection(db, "Location");
      const accountsSnapshot = await getDocs(accountsCol);
      const accountsList = accountsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log("accountsList", accountsList);
      setDataFake(accountsList[0].title);
    }
    fetchData();
  }, []);

  const locations = dataFake;
  const [origin, setOrigin] = useState(locations);
  const [destination, setDestination] = useState(locations);

  const [stateOrigin, setStateOrigin] = useState(false);
  const [stateDestination, setStateDestination] = useState(false);

  const handleOriginChange = (event, value) => {
    setOrigin(value);
    setStateOrigin(true);
  };
  const handleDestinationChange = (event, value) => {
    setDestination(value);
    setStateDestination(true);
  };
  //handle click 1 chiều set từ đi ssang đến
  const destinationOptions = locations.filter(
    (location) => location !== origin
  );

  const [selectDate, setSelectDate] = useState(dayjs());

  const today = dayjs().startOf("day");
  const isDateDisabled = (date) => {
    return date.isBefore(today, "day");
  };
  const handleChangeDate = (date) => {
    setSelectDate(date);
  };
// console.log("selectDate: " + selectDate);
  const dispatch = useDispatch();

  const handleSearchDateTime = async () => {
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
         await dispatch(
          tripActions.addSearch({
            origin: origin,
            destination: destination,
            selectDate: selectDate,
          })
        );
        // setTimeout(() => {
        //   navigate("/booking");
        // }, 2500);
      } catch (error) {
        toast.error("Tìm kiếm thất bại!");
      }

    } else if(stateOrigin === false && stateDestination === true) {
      toast.error("Bạn chưa nhập nơi đi!");
    } else if(stateDestination === false && stateOrigin === true){
      toast.error("Bạn chưa nhập nơi đến!");
    } else{
      toast.error("Bạn chưa nhập nơi đi và nơi đến!");
    }
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <div className="ctn__trip">
        <Container className="breadcrumb" maxWidth="lg">
          <Stack spacing={2}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Container>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} className="form__search">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <div>
                  <Autocomplete
                    value={origin}
                    onChange={handleOriginChange}
                    id="fromLocation"
                    options={locations}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Nơi xuất phát" />
                    )}
                  />
                </div>
                <div>
                  <Autocomplete
                    value={destination}
                    onChange={handleDestinationChange}
                    id="toLocation"
                    options={destinationOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Nơi đến" />
                    )}
                  />
                </div>
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
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={handleSearchDateTime}
                    >
                      <h3 className="btn">Tìm Chuyến</h3>
                    </Button>
                  </Stack>
                </LocalizationProvider>
              </Stack>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <TextField
                className="search__input"
                variant="outlined"
                placeholder="Tìm kiếm tên nhà xe..."
                size="medium"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="medium" />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
            </Grid>
            <Grid item xs={10}></Grid>
            <Grid item xs={3}>
              <Item className="cnt__filter">
                <Typography className="filter">Lọc</Typography>
                <FormGroup>
                  <Typography className="filter__title">Loại xe:</Typography>
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label="Xe giường nằm 22 chỗ"
                    value="Xe giường nằm 22 chỗ"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckboxes.includes(
                      "Xe giường nằm 22 chỗ"
                    )}
                  />
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label="Xe giường nằm 34 chỗ"
                    value="Xe giường nằm 34 chỗ"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckboxes.includes(
                      "Xe giường nằm 34 chỗ"
                    )}
                  />
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label="Xe giường nằm 40 chỗ"
                    value="Xe giường nằm 40 chỗ"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckboxes.includes(
                      "Xe giường nằm 40 chỗ"
                    )}
                  />
                </FormGroup>
              </Item>
              <Item className="cnt__filter">
                <FormGroup>
                  <Typography className="filter__title">
                    Thời gian khởi hành:
                  </Typography>
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label="Sáng (từ 00:00 - 11:59)"
                    value="morning"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckboxes.includes("morning")}
                  />
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label="Chiều (từ 12:00 - 18:59)"
                    value="afternoon"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckboxes.includes("afternoon")}
                  />
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label="Tối (từ 19:00 - 23:59)"
                    value="evening"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckboxes.includes("evening")}
                  />
                </FormGroup>
              </Item>
              <Item>
                <Typography className="">Đánh giá:</Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Rating name="half-rating-read" defaultValue={2} readOnly />
                  <Typography variant="h6" display="block" gutterBottom>
                    trở lên
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Rating name="half-rating-read" defaultValue={3} readOnly />
                  <Typography variant="h6" display="block" gutterBottom>
                    trở lên
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={3}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="h6" display="block" gutterBottom>
                    trở lên
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={4}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="h6" display="block" gutterBottom>
                    trở lên
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Rating name="half-rating-read" defaultValue={5} readOnly />
                  <Typography variant="h6" display="block" gutterBottom>
                    trở lên
                  </Typography>
                </Stack>
              </Item>
            </Grid>
            <Grid item xs={9}>
              <div className="cnt__info">
                {showNumber ? (
                  <span className="cnt__info result">
                    {" "}
                    Chuyến xe từ {startPointRedux}{" "}
                    <ArrowRightAltIcon fontSize="large" /> {endPointRedux}{" "}
                    <span className="trip__length">
                      ({fetchData.length} chuyến được tìm thấy)
                    </span>
                  </span>
                ) : (
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                )}
              </div>
              <Item className="container__sort">
                {showNumber ? (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={0}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      className="typo__sort"
                    >
                      Sắp xếp:
                    </Typography>
                    <Typography
                      variant="button"
                      gutterBottom
                      className={`typo__sort`}
                      onClick={() => handleSortSeat()}
                    >
                      chỗ ngồi{" "}
                      {statusSeat ? (
                        <ArrowDropUpIcon fontSize="large" />
                      ) : (
                        <ArrowDropDownIcon fontSize="large" />
                      )}
                    </Typography>

                    <Typography
                      variant="button"
                      display="block"
                      gutterBottom
                      className={`typo__sort ${
                        selectedTypography === "asc" ? "selected" : ""
                      }`}
                      onClick={() => handleClickTypography("asc")}
                    >
                      Giá thấp - cao
                    </Typography>
                    <Typography
                      variant="button"
                      display="block"
                      gutterBottom
                      className={`typo__sort ${
                        selectedTypography === "desc" ? "selected" : ""
                      }`}
                      onClick={() => handleClickTypography("desc")}
                    >
                      Giá cao - thấp
                    </Typography>
                  </Stack>
                ) : (
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                )}
              </Item>
              <Item className="cnt__listtrip">
                {showNumber ? (
                  filteredData?.map((items, index) => (
                    <InfoTrip items={items} key={index} />
                  ))
                ) : (
                  <SkeletonCustom />
                )}
              </Item>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Trip;
