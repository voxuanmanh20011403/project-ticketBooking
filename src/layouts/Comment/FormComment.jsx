import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { db } from "data/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const FormComment = ({ fullName, idGarage, setCheck }) => {
  // console.log(fullName + " và " + idGarage);
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);

  const [comment, setComment] = useState("");

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
  const calculateAverageStart = (comments) => {
    if (comments.length === 0) {
      return 0;
    }
    const totalStart = comments.reduce(
      (sum, comment) => sum + comment.Start,
      0
    );
    return totalStart / comments.length;
  };
  const addComment = async () => {
    const ID_Garage = idGarage;
    const commentData = {
      FullName: fullName,
      Comment: comment,
      Start: value,
      DateTime: new Date(),
    };

    const commentRef = collection(db, "Comment");
    const queryRef = query(commentRef, where("ID_Garage", "==", ID_Garage));
    try {
      const querySnapshot = await getDocs(queryRef);

      if (querySnapshot.empty) {
        const newCommentDocRef = await addDoc(commentRef, {
          ID_Garage: ID_Garage,
          User: [commentData],
          CountComment: 1,
          AvgStart: commentData.Start,
        });

        console.log(
          "New comment document created with ID: ",
          newCommentDocRef.id
        );
      } else {
        querySnapshot.forEach((docSnapshot) => {
          const commentDocRef = doc(commentRef, docSnapshot.id);
          const commentDocData = docSnapshot.data();
          const userComments = commentDocData.User || [];

          userComments.push(commentData);

          updateDoc(commentDocRef, {
            ID_Garage: ID_Garage,
            User: userComments,
            CountComment: userComments.length,
            AvgStart: calculateAverageStart(userComments),
          });

          console.log("Comment added to document with ID: ", docSnapshot.id);
        });
      }

      toast.success("Cảm ơn bạn đã đánh giá!", {
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!" + error.message, {
        autoClose: 1000,
      });
      console.log(error);
    }

    // try {
    //   const querySnapshot = await getDocs(queryRef);
    //   querySnapshot.forEach((docSnapshot) => {
    //     const commentDocRef = doc(commentRef, docSnapshot.id);
    //     updateDoc(commentDocRef, {
    //       User: arrayUnion(commentData),
    //     });
    //     console.log("Comment added to document with ID: ", docSnapshot.id);
    //     toast.success("Cảm ơn bạn đã đánh giá!", {
    //       autoClose: 1000,
    //     });
    //   });
    // } catch (error) {
    //   toast.error("Đã có lỗi xảy ra!" + error.message, {
    //     autoClose: 1000,
    //   });
    // }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Số sao:', value);
    // console.log('Nhận xét:', comment);
    addComment();
    setCheck(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      // style={{ height: "100vh" }}
    >
      <Button onClick={handleOpen}>
        Đánh giá
      </Button>

      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Trải nghiệm của bạn như thế nào?</DialogTitle>
        <DialogContent>
          <Box>
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
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
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
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                  style={{
                    width: "100px",
                    cursor: "pointer",
                    color: "#555",
                    background: "none",
                    border: "1px solid black",
                    marginRight: "10px",
                  }}
                  onClick={handleClose}
                >
                  Trở lại
                </Button>
                <Button
                  type="submit"
                  style={{
                    width: "150px",
                    color: "#fff",
                    background: "#ee4d2d",
                    cursor: "pointer",
                  }}
                >
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
