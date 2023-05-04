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
import Test from "./Test";
import Stack from "@mui/material/Stack";

const ChooseSeat = ({ items }) => {
  const card = (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Grid spacing={2} container>
          {/* Gird chú thích */}
          <Grid item xs={3} container>
            <Grid item xs={12} className="gird__note">
              <Typography gutterBottom variant="subtitle1">Chú thích</Typography>
              
              <Stack
                className="stack__note"
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={3}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  {seatEmptyUI()}
                  <Typography
                    variant="body2"
                    gutterBottom
                    className="seat seat__note"
                  >
                    Còn trống
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  {seatChooseUI()}
                  <Typography
                    variant="body2"
                    className=" seat seat__note_choose"
                  >
                    Đang chọn
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  {seatNullUI()}
                  <Typography
                    variant="body2"
                    className=" seat seat__note_choose"
                  >
                    Ghế đã đặt
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          {/* Gird sơ đồ ghế */}
          <Grid item xs={9} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Stack
                  direction="row"
                  justifyContent="space-around"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Tầng dưới
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Tầng trên
                  </Typography>
                </Stack>
                <ListSeat items={items} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
      </Container>
    </React.Fragment>
  );
  return (
    <Container maxWidth="xl">
      <Box sx={{ minWidth: "xl" }}>
        <Card variant="">{card}</Card>
      </Box>
    </Container>
  );
};

export default ChooseSeat;
