import { Grid, Paper } from "@mui/material";

import { seatEmptyUI, seatChooseUI, seatNullUI } from "./UISeat";
import { styled } from "@mui/material/styles";

const seats = [
  { id: "1", name: "A1", status: "empty", ui: seatEmptyUI() },
  { id: "2", name: "A2", status: "book", ui: seatEmptyUI() },
  { id: "3", name: "B1", status: "empty", ui: seatNullUI() },
  { id: "4", name: "2B", status: "empty", ui: seatEmptyUI() },
  // ...
];
export default function Test() {
  return (
    <Paper>
      <Grid container spacing={1}>
        {/* Column 1 */}
        <Grid item xs={2}>
          {seats.slice(0, 6).map((seat) => (
            <ul key={seat.id}>
              <li>{seat.name}</li>
              <li>{seat.ui}</li>
            </ul>
          ))}
        </Grid>
        {/* Column 2 */}
        <Grid item xs={1}>
          {/* <Seat key={seats[6].id} seat={seats[6]} /> */}
        </Grid>
        {/* Column 3 */}
        <Grid item xs={2}>
          {seats.slice(7, 13).map((seat) => (
            <ul key={seat.id}>
              <li>{seat.name}</li>
              <li>{seat.ui}</li>
            </ul>
          ))}
        </Grid>
        {/* Column 4 */}
        <Grid item xs={1}>
          {/* <Seat key={seats[13].id} seat={seats[13]} /> */}
        </Grid>
        {/* Column 5 */}
        <Grid item xs={2}>
          {seats.slice(14, 20).map((seat) => (
            <ul key={seat.id}>
              <li>{seat.name}</li>
              <li>{seat.ui}</li>
            </ul>
          ))}
        </Grid>
        {/* Column 6 */}
        <Grid item xs={2}>
          {seats.slice(20, 26).map((seat) => (
            <ul key={seat.id}>
              <li>{seat.name}</li>
              <li>{seat.ui}</li>
            </ul>
          ))}
        </Grid>
        {/* <Grid item xs={1}>
          <Seat key={seats[26].id} seat={seats[26]} />
        </Grid>
        <Grid item xs={2}>
          {seats.slice(27, 33).map((seat) => (
            <Seat key={seat.id} seat={seat} />
          ))}
        </Grid>
        <Grid item xs={1}>
          <Seat key={seats[33].id} seat={seats[33]} />
        </Grid>
        <Grid item xs={2}>
          {seats.slice(34, 40).map((seat) => (
            <Seat key={seat.id} seat={seat} />
          ))}
        </Grid>
        <Grid item xs={2}>
          {seats.slice(40, 45).map((seat) => (
            <Seat key={seat.id} seat={seat} />
          ))} 
        </Grid> */}
      </Grid>
    </Paper>
  );
}
