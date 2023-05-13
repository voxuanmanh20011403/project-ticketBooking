import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import StarRateIcon from "@mui/icons-material/StarRate";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const Comment = ({ comments }) => {
console.log("comment: " + JSON.stringify(comments));
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
                <div
                  key={userIndex}
                  style={{
                    display: "flex",
                    marginTop: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <Avatar
                    alt={user.FullName}
                    src="https://via.placeholder.com/150"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <div style={{ marginLeft: "16px" }}>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bold" }}
                    >
                      {user.FullName}
                    </Typography>
                    <Typography
                      variant="caption"
                      style={{ color: "#999", fontSize: "0.9rem" }}
                    >
                      {new Date(
                       user.DateTime.seconds * 1000
                      ).toLocaleDateString()}
                    </Typography>
                    <Box style={{ marginTop: "8px", marginBottom: "8px" }}>
                      <Rating
                        name="half-rating-read"
                        defaultValue={
                          user.Start === 1
                            ? 1
                            : user.Start === 2
                            ? 2
                            : user.Start === 3
                            ? 3
                            : user.Start === 4
                            ? 4
                            : 5
                        }
                        readOnly
                      />
                    </Box>
                    <Typography variant="body1" style={{ marginBottom: "8px" }}>
                      {user.Comment}
                    </Typography>
                    <Divider />
                  </div>
                </div>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Comment;
