import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import StarRateIcon from "@mui/icons-material/StarRate";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Rating from "@mui/material/Rating";

const Comment = ({ comments }) => {

  const dateTime = comments[0].User[0].DateTime;
  const dateS = new Date(dateTime.seconds * 1000);
  const dayS = dateS.getDate();
  const monthS = dateS.getMonth() + 1;
  const yearS = dateS.getFullYear();
  const hoursS = dateS.getHours();
  const minutesS = dateS.getMinutes();

  return (
    <div>
      {comments.map((comment, index) => (
        <Card key={index} className="">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <span className="star">
                    {comment.AvgStart} <StarIcon sx={{ fontSize: 15 }} />- (
                    {comment.CountComment} đánh giá)
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {comment.User.map((user, userIndex) => (
                <Stack
                className="list__comment"
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={2}
                  key={userIndex}
                >
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <AccountCircleIcon fontSize="large"/>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        <Typography variant="h6"> {user.FullName}</Typography>
                        <Rating
                          name="half-rating-read"
                          defaultValue={user.Start === 1 ? 1 : user.Start === 2 ? 2 : user.Start === 3 ? 3 : user.Start === 4 ? 4 : 5}
                          readOnly
                        />
                      </Typography>
                  </Stack>
                  <Typography variant="body1">{user.Comment}</Typography>
            <Typography variant="h6">Đăng ngày {dayS}/{monthS}/{yearS}</Typography>
                </Stack>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Comment;
