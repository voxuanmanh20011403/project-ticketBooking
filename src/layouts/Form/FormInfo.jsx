import React,{ useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import Box from '@mui/material/Box';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
import firebase from 'firebase/compat/app'

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    margin: theme.spacing(2),
    width: '500px',
  },
  button: {
    margin: theme.spacing(2),
  },
}));



const FormInfo = () => {
  const [accounts, setAccounts] = useState([]);
  // const classes = useStyles();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const db = firebase.firestore();
  //     const data = await db.collection('Account').get();
  //     setAccounts(data.docs.map(doc => ({ ...doc.data(), id: doc.Email })));
  //   }
  //   console.log(accounts);
  //   fetchData();
  // }, []);


  return (

<div className={classes.formWrapper}>
<Box
  sx={{
    flexGrow: 1,
    bgcolor: 'background.paper',
    display: 'flex',
    minHeight: 224,
  }}
>
  <form className={classes.form}>
    <TextField className={classes.textField} label="Họ và tên" variant="outlined" value={accounts[0]?.Name} />
    <TextField className={classes.textField} label="Số điện thoại" variant="outlined" value={accounts[0]?.NumberPhone} />
    <TextField className={classes.textField} label="Mật Khẩu" variant="outlined" value={accounts[0]?.Password} />
    <FormControl className={classes.textField}>
      <FormLabel>Giới tính</FormLabel>
      <RadioGroup>
        <FormControlLabel value="female" control={<Radio />} label="Nam" />
        <FormControlLabel value="male" control={<Radio />} label="Nữ" />
      </RadioGroup>
    </FormControl>
    <Button className={classes.button} variant="contained" color="primary">
      Lưu
    </Button>
  </form>
</Box>
</div>
  );
};

export default FormInfo;
