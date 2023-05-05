import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export const CustomDatePicker = (props) => {
  const { label, className } = props;
  const today = dayjs().startOf("day");
  const isDateDisabled = (date) => {
    return date.isBefore(today, "day");
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        shouldDisableDate={isDateDisabled}
        className={className}
      />
    </LocalizationProvider>
  );
};
