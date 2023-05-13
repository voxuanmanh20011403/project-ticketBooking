import React , {useState} from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Dialog, DialogContent, DialogTitle,
} from "@mui/material";
import { db } from "data/firebase";
import { addDoc, collection, where, getDocs, query, getDoc, updateDoc, doc } from "firebase/firestore";

const labels = {
  1: "Tệ",
  2: "Không hài lòng",
  3: "Bình thường",
  4: "Hài lòng",
  5: "Tuyệt vời",
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const FormComment = () => {
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);

  const [comment, setComment] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Số sao:', value);
    // console.log('Nhận xét:', comment);
    const ID_Garage ="phtrang";
   
  };


  return (
     <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Đánh giá
      </Button>

      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Đánh giá</DialogTitle>
        <DialogContent>
           <Box>
        <Typography variant="h5" gutterBottom>
          Nhận xét sản phẩm
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography>Đánh giá:</Typography>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    width: 400,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={value}
                    // precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <TextField
              label="Nhận xét của bạn"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={comment}
              onChange={handleCommentChange}
            />
          </Box>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Gửi nhận xét
            </Button>
          </Box>
        </form>
      </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default FormComment;
