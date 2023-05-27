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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EastIcon from '@mui/icons-material/East';
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// Router
import { useNavigate, useHistory } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { tripActions } from "redux/slices/tripsSilce";

import "./style.css";

import "../Body/Banner/Banner.css";
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

  const [selectedTypography, setSelectedTypography] = useState("");
  const [statusSeat, setStatusSeat] = useState(false);

  const [startPointRedux, setStartPointRedux] = useState("");
  const [endPointRedux, setEndPointRedux] = useState("");

  const [removeStateSearch, setRemoveStateSearch] = useState(false);

  const stateSearch = useSelector((state) => state.trip.stateSearch);

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
  useEffect(() => {
    try {
      setStartPointRedux(stateSearch[0].origin);
      setEndPointRedux(stateSearch[0].destination);

      // setSelectDate(stateSearch[0].selectDate);
      setRemoveStateSearch(true);
    } catch (e) {
      navigate("/");
    }
  }, []);
  const dispatch = useDispatch();
  if (removeStateSearch) {
  }
  // console.log("filteredData: " + JSON.stringify(filteredData));

  const breadcrumbs = [
    <Link   underline="hover" key="1" color="inherit" >
      <a href="" style={{ color: 'blue' }}>Trang Chủ</a>
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

  return (

    <React.Fragment>
      {/* <Header/> */}
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
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <TextField
                className="search__input"
                variant="outlined"
                placeholder="Tìm kiếm tên nhà xe..."
                size="medium"
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: 8,
                    height: 40,
                    fontSize: 16,
                    paddingLeft: 10,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "#888" }} fontSize="medium" />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
                style={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 8,
                  padding: "8px 12px",
                }}
              />
            </Grid>
            <Grid item xs={10}></Grid>
            <Grid item xs={3}>
              <Item className="cnt__filter">
                <Typography className="filter">Bộ lọc</Typography>
                <FormGroup>
                  <Typography className="filter__title">Loại xe:</Typography>
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label="Xe giường nằm 20 chỗ"
                    value="Xe giường nằm 20 chỗ"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckboxes.includes(
                      "Xe giường nằm 20 chỗ"
                    )}
                  />
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label="Xe giường nằm 36 chỗ"
                    value="Xe giường nằm 36 chỗ"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckboxes.includes(
                      "Xe giường nằm 36 chỗ"
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
              <Item style={{ border: '1px solid #3ba59c', padding: '10px' }}>
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
                    <EastIcon fontSize="default" /> {endPointRedux}{" "}
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
                      className={`typo__sort ${selectedTypography === "asc" ? "selected" : ""
                        }`}
                      onClick={() => handleClickTypography("asc")}
                    >
                      Giá thấp - cao
                    </Typography>
                    <Typography
                      variant="button"
                      display="block"
                      gutterBottom
                      className={`typo__sort ${selectedTypography === "desc" ? "selected" : ""
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
