import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Box, Stack, Typography } from '@mui/material';
import BannerDateTime from './BannerDateTime';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { collection, query, getDocs, getFirestore } from 'firebase/firestore';
import { db } from 'data/firebase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});
export default function BannerSearch() {
  const dataFake = ["1", "3", "5", "7", "9"]
  const [location, setLocations] = useState([]);
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();

  const [fromLocation, setfromLocation] = useState(dataFake);
  const [toLocation, settoLocation] = useState(dataFake);
  const [inputValue, setInputValue] = React.useState();
  const [inputValue1, setInputValue1] = React.useState();

  // console.log(location);
  // const handleDeparture = (event, value) => {
  //   console.log(value);
  //   setfromLocation(value);
  // };
  // const handleDestination = (event, value1) => {
  //   console.log(value1);
  //   settoLocation(value1);
  // };
  const fetchLocations = async () => {
    const db = getFirestore();
    const locationRef = collection(db, "Location");
    const querySnapshot = await getDocs(locationRef);
    const data = querySnapshot.docs.map((doc) => doc.data());
    console.log("data: " + JSON.stringify(data));
    const title = data[0].title;
    console.log(title); // in giá trị của title ra console
    setLocations(title); };

  useEffect(() => {
    fetchLocations();
  }, [])

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <div>
        <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div>
        <br />
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            settoLocation(toLocation.filter((item) => item !== String(newValue)))
          }}
          // inputValue={inputValue}
          // onInputChange={(event, newInputValue) => {
          //   setInputValue(newInputValue);
          //   console.log("vao day", newInputValue);
          // }}
          id="controllable-states-demo"
          options={dataFake}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Nơi xuất phát" />}
        />
      </div>
      <div>
        <div>{`value: ${toLocation !== null ? `'${toLocation}'` : 'null'}`}</div>
        <div>{`inputValue: '${inputValue1}'`}</div>
        <br />
        <Autocomplete
          value={value1}
          onChange={(event, newValue) => {
            setValue(newValue);
            settoLocation(newValue);
            // settoLocation(fromLocation.filter((item) => item !== String(newValue)));
          }}
          inputValue={inputValue1}
          // onInputChange={(event, newInputValue1) => {
          //   setInputValue1(newInputValue1);
          // }}
          id="controllable-states-demo1"
          // options={toLocation}
          options={Array.isArray(toLocation) ? toLocation : []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Nơi đến" />}
        />
      </div>
      {/* <Autocomplete
        id="filter-from-location"
        options={location}
        // getOptionLabel= {(option) => option.title} 
        // value={fromLocation}
        onChange={handleDeparture}
        filterOptions={filterOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Nơi xuất phát" />}
      />
      <Autocomplete
        id="filter-to-location"
        options={location}
        onChange={handleDestination}
        // getOptionLabel= {(option) => option.title}
        // filterOptions={filterOptions}
        // value={toLocation}

        filterOptions={filterOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Nơi đến" />}
      /> */}
      <BannerDateTime></BannerDateTime>
    </Stack>



  );
}