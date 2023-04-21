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
import AdjustIcon from '@mui/icons-material/Adjust';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});
export default function BannerSearch() {
  // const dataFake = ["1", "3", "5", "7", "9"]
  // const [location, setLocations] = useState([]);
  // const [value, setValue] = React.useState();
  // const [value1, setValue1] = React.useState();

  // const [fromLocation, setfromLocation] = useState(dataFake);
  // const [toLocation, settoLocation] = useState(dataFake);
  // const [inputValue, setInputValue] = React.useState();
  // const [inputValue1, setInputValue1] = React.useState();
  const [dataFake, setDataFake] = useState([]);
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState();


  // useEffect(() => {
  //   const fetchLocations = async () => {
  //     const db = getFirestore();
  //     const locationRef = collection(db, "Location");
  //     const querySnapshot = await getDocs(locationRef);
  //     const data = querySnapshot.docs.map((doc) => doc.data());
  //     console.log("data: " + JSON.stringify(data));
  //     const title = data[0].title;
  //     console.log(title); // in giá trị của title ra console
  //     setLocations(title); };
  //   fetchLocations();
  // }, [])

  useEffect(() => {
    async function fetchData() {
      const accountsCol = collection(db, 'Location');
      const accountsSnapshot = await getDocs(accountsCol);
      const accountsList = accountsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      console.log('accountsList', accountsList);
      setDataFake(accountsList[0].title);
    }
    fetchData();
  },[]);
  const locations = dataFake;
  const [origin, setOrigin] = useState(locations);
  const [destination, setDestination] = useState(locations);
  const handleOriginChange = (event, value) => {
    setOrigin(value);
  };
  const handleDestinationChange = (event, value) => {
    setDestination(value);
  };
  //handle click 1 chiều set từ đi ssang đến 
  const destinationOptions = locations.filter((location) => location !== origin);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <div>
        {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div> */}
        <Autocomplete
          value={origin}
          onChange={handleOriginChange}
          // value={value}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          //   settoLocation(toLocation.filter((item) => item !== String(newValue)))
          // }}
          // inputValue={inputValue}
          // onInputChange={(event, newInputValue) => {
          //   setInputValue(newInputValue);
          //   console.log("vao day", newInputValue);
          // }}
          id="fromLocation"
          options={locations}
          sx={{ width: 300 }}
          renderInput={(params) => 
          <TextField {...params}   label=  "Nơi xuất phát" />}
        />
      </div>
      <div>
        {/* <div>{`value: ${toLocation !== null ? `'${toLocation}'` : 'null'}`}</div> */}
        {/* <div>{`inputValue: '${inputValue1}'`}</div> */}
        <Autocomplete
          value={destination}
          onChange={handleDestinationChange}
          id="toLocation"
          // options={toLocation}
          options={destinationOptions}
          sx={{ width: 300 }
          }
          renderInput={(params) => <TextField {...params} label="Nơi đến" />}
        />
      </div>
      <BannerDateTime />
    </Stack>
  );
}