
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdjustIcon from '@mui/icons-material/Adjust';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Box, Stack, Typography } from "@mui/material";
import BannerDateTime from "./BannerDateTime";
import { collection, query, getDocs, getFirestore } from "firebase/firestore";
import { db } from "data/firebase";

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

  return (
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
      <SwapHorizIcon/>
      <div>
        <Autocomplete
          value={destination}
          onChange={handleDestinationChange}
          id="toLocation"
          options={destinationOptions}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Nơi đến" />}
        />
      </div>
      <BannerDateTime
        origin={origin}
        destination={destination}
        stateOrigin={stateOrigin}
        stateDestination={stateDestination}
      />
    </Stack>
  );
}
