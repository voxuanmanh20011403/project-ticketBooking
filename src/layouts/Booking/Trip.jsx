import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "redux/slices/tripsSilce";
import "./style.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Trip = ({ fetchData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

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

  const filteredData = fetchData.filter((item) => {
    if (selectedCheckboxes.length === 0) {
      return item.NameGarage.toLowerCase().includes(searchValue.toLowerCase());
    } else {
      return (
        item.TypeVehicle === selectedCheckboxes[0] &&
        item.NameGarage.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  });
  // console.log("filteredData: " + filteredData);
  console.log("filteredData: " + JSON.stringify(filteredData));

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" onClick={handleClick}>
      Home
    </Link>,
    <Link underline="hover" key="2" color="inherit" onClick={handleClick}>
      Tìm vé
    </Link>,
    <Typography key="3" color="text.primary">
      Tên chuyến đi !!!!
    </Typography>,
  ];
  // CircularProgress for {fetchData.length}
  const [showNumber, setShowNumber] = useState(false);

  setTimeout(() => {
    setShowNumber(true);
  }, 4000);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: "#dfe4ea", height: "100vh" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                placeholder="Search"
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
            <Grid item xs={4}>
              <Item>
                Lọc theo loại xe:
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label="Xe giường nằm 22 chỗ"
                    value="Xe giường nằm 22 chỗ"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckboxes.includes("Xe giường nằm 22 chỗ")}
                  />
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label="Xe giường nằm 34 chỗ"
                    value="Xe giường nằm 34 chỗ"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckboxes.includes("Xe giường nằm 34 chỗ")}
                  />
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label="Xe giường nằm 40 chỗ"
                    value="Xe giường nằm 40 chỗ"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckboxes.includes("Xe giường nằm 40 chỗ")}
                  />
                </FormGroup>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                {filteredData?.map((items, index) => (
                  <InfoTrip items={items} key={index} />
                ))}
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Trip;
