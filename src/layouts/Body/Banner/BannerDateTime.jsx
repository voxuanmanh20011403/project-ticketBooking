import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export default function BannerDateTime() {
    const today = dayjs().startOf('day');
    const isDateDisabled = (date) => {
        return date.isBefore(today, 'day');
      }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Ngày đi"
        shouldDisableDate={isDateDisabled}>
      </DatePicker>
      <Stack direction="row" 
      // spacing={2}
      >
      <Button variant="contained" disableElevation >
          <h3 className='btn'>Tìm Chuyến</h3>
      </Button>                           
       </Stack>
    </LocalizationProvider>
   
  );
}