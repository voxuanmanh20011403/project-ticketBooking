// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Grid,
//   Paper,
//   Typography,
// } from "@material-ui/core";
// // import { db, docRef } from "../../data/firebase";
// import "./FormInfo.css"
// import Fab from '@mui/material/Fab';
// import SaveIcon from '@mui/icons-material/Save';
// import { makeStyles } from '@mui/styles';

// import { collection, doc, updateDoc } from "firebase/firestore";
// import Stack from '@mui/material/Stack';


// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   paper: {
//     padding: "20px",
//   },
//   saveButton: {
//     width: '400px', // Điều chỉnh chiều dài của nút
//     margin: '0 auto', // Hiển thị giữa theo chiều ngang
//   },
// };

// const useStyles = makeStyles((theme) => ({
  
// }));


// const FormInfo = () => {

//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const classes = useStyles();



//   useEffect(() => {
//     const dataAccount = JSON.parse(localStorage.getItem("account"));
//     console.log(dataAccount)
//     setEmail(dataAccount.Email);
//     setName(dataAccount.Name);
//     setPhone(dataAccount.NumberPhone);
//     setPassword(dataAccount.Password)
//   }, [])
//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//     setShowPasswordText(showPassword ? "Hiển Thị" : "Ẩn");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Name", name);
//     console.log("Email:", email);
//     console.log("Phone:", phone);
//     console.log("Password:", password);
//     // const dataAccount = JSON.parse(localStorage.getItem("account"));
//     // const updatedData = {
//     //   ...dataAccount,
//     //   Name: name,
//     //   NumberPhone: phone,
//     //   Password: password,
//     // };
//     // localStorage.setItem("account", JSON.stringify(updatedData));
//   };
//   return (
//     <Grid
//       container
//       justifyContent="center"
//       alignItems="center"
//       style={styles.container}>
//       <Grid item xs={12} sm={12} md={6} lg={4}>
//         <Paper elevation={4} >
//           <Typography variant="h5" component="h1" align="center" gutterBottom>
//             Thông Tin Tài Khoản
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={4}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   label="Email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   label="Họ và Tên"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   label="Số Điện Thoại"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Fab
//                   variant="extended"
//                   color="primary"
//                   onClick={handleSubmit}
//                   className={classes.saveButton}
//                 >
//                   <SaveIcon sx={{ marginRight: 1 }} />
//                   Lưu
//                 </Fab>
//               </Grid>
//             </Grid>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default FormInfo;


import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
// import { db, docRef } from "../../data/firebase";
import {Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SaveIcon from "@mui/icons-material/Save";



const useStyles = makeStyles((theme) => ({
  container: {
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
  },
  saveButton: {
    width: "200px",
    margin: "0 auto",
    marginTop: theme.spacing(2),
  },
}));

import { collection, doc, updateDoc } from "firebase/firestore";
const FormInfo = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
 

  useEffect(() => {
    const dataAccount = JSON.parse(localStorage.getItem("account"));
    console.log(dataAccount);
    setEmail(dataAccount.Email);
    setName(dataAccount.Name);
    setPhone(dataAccount.NumberPhone);
    setPassword(dataAccount.Password)
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        // ...
        alert("Updated");
      })
      .catch((error) => {
        // An error occurred
        // ...
        alert("No update");
      });
    const statisticsRef = doc(collection(db, "Account"), `${id}`);

    updateDoc(statisticsRef, {
      Name: name,
      NumberPhone: phone,
    })
      .then(() => {
        console.log(
          `Updated success`
        );
      })
      .catch((error) => {
        console.error(`Error updating`);
      });

    const existingAccountJSON = localStorage.getItem("account");
    const existingAccount = JSON.parse(existingAccountJSON);
    existingAccount.Name = name;
    existingAccount.NumberPhone = phone;
    const updatedAccountJSON = JSON.stringify(existingAccount);
    localStorage.setItem("account", updatedAccountJSON);
    // sendEmailVerification(auth.currentUser)
    // .then(() => {
    //   alert("dang xác minh")
    // });
   
  };

  return (
    <Grid
    container
    justifyContent="center"
    alignItems="center"
    className={classes.container}
  >
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Paper elevation={4} className={classes.paper}>
        <Typography variant="h5" component="h1" gutterBottom>
          Thông Tin Tài Khoản
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Họ và Tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Số Điện Thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Fab
                variant="extended"
                color="primary"
                onClick={handleSubmit}
                className={classes.saveButton}
              >
                <SaveIcon sx={{ marginRight: 1 }} />
                Lưu
              </Fab>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  </Grid>
);
};
export default FormInfo;


