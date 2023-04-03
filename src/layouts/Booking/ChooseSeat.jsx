import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { seatEmptyUI, seatChooseUI, seatNullUI } from "./UISeat";
import ListSeat from "./ListSeat";


const card = (
  <React.Fragment>
    <CssBaseline />
    <Container fixed>
      <Grid spacing={2} container>
        {/* Gird chú thích */}
        <Grid item xs={6} container>
          <Grid item xs direction="column" spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="subtitle1">
                Chú thích
              </Typography>
              {/* Ghế trống */}
              <Typography
                variant="body2"
                gutterBottom
                className="seat seat__note"
              >
                {seatEmptyUI()}
                <span className="note__name">Còn trống</span>
              </Typography>
              {/* Ghế được chọn */}
              <Typography variant="body2" className=" seat seat__note_choose">
                {seatChooseUI()}
                <span className="note__name">Đang chọn</span>
              </Typography>
              {/* Ghế k bán */}
              <Typography variant="body2" className=" seat seat__note_null">
                {seatNullUI()}

                <span className="note__name">Ghế đã đặt</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Gird sơ đồ ghế */}
        <Grid item xs={6} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                <ListSeat />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
    </Container>
  </React.Fragment>
);

const ChooseSeat = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ minWidth: "xl" }}>
        <Card variant="">{card}</Card>
      </Box>
    </Container>
  );
};

export default ChooseSeat;
