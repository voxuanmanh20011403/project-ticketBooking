import React, { useState, useEffect } from 'react'
import VNPayButton from './VNPayButton';
import Header from 'layouts/Header/Header';
import Footer from 'layouts/Footer/Footer';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
} from '@mui/material';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
// hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';

import './style.css'

// redux
import { tripActions, asyncAddBooking } from "redux/slices/tripsSilce";
import { useDispatch, useSelector } from "react-redux";

const Payment = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [email, setEmal] = useState('');
  const [loading, setLoading] = useState(true);

  // get stateBooking from reudx
  const dataBooking = useSelector(state => state.trip.stateBooking);

  const timeStart = dataBooking[0].StartTime;
  const dateS = new Date(timeStart.seconds * 1000);
  const dayS = dateS.getDate();
  const monthS = dateS.getMonth() + 1;
  const yearS = dateS.getFullYear();
  const hoursS = dateS.getHours();
  const minutesS = dateS.getMinutes();
  //  console.log("dataBooking: " + JSON.stringify(dataBooking[0].NameGarage));

  const total = parseInt(dataBooking[0].price) * dataBooking[0].totalSeat;

  const amount = total; // Số tiền cần thanh toán
  const description = `Thanh toán vé xe ${dataBooking[0].NameTrip}`; // Thông tin đơn hàng
  const returnUrl = 'http://localhost:3000/return/'; // Đường dẫn trả về sau khi thanh toán
  const vnp_TmnCode = '0C8OWYLT'; // Mã website của bạn được cấp bởi VNPay
  const vnp_HashSecret = 'ZWPIGMIDMRBEDUXSWHBVSSBKEBYSDWWD'; // Mã bí mật để tạo chữ ký điện tử, được cấp bởi VNPay
  const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

  const dispatch = useDispatch();
  // YUP: VALIDATION
  const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Bạn chưa nhập email hoặc số điện thoại.')
      .required('Email is required'),
    lastname: Yup.string()
      .required('Bạn chưa nhập Name.')
      .required('Lastname is required'),
    firstname: Yup.string()
      .required('Bạn chưa nhập Name.')
      .required('Firstname is required'),
    numberphone: Yup.string()
      .required('Bạn chưa nhập Số điện thoại.')
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('NumberPhone is required'),
  });
  const { register, handleSubmit, formState: { errors }, }
    = useForm(
      {
        resolver: yupResolver(validationSchema),
      }
    );


  const onSubmit = async (data) => {
    console.log(data);
    try {
      await dispatch(asyncAddBooking([...dataBooking, data]));

      // console.log("dataBooking lại: " + JSON.stringify(localData));

      localStorage.setItem("getLocalUserDB", JSON.stringify({ data, dataBooking }));
      const getLocalUserDB = localStorage.getItem('getLocalUserDB');
      console.log("getLocalUserDB: " + (getLocalUserDB));

    } catch (error) {
      console.error(error);
    }

  };
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  // foramt price
  const price = dataBooking[0].price;
  const formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  return (
    <>
      <Header />
      <>
        <Container maxWidth="xl"  >
          {
            loading ? (
              <Container maxWidth="xl" className="container__payment" >
                <CircularProgress className="progress" />
              </Container>
            ) :
              <>
                <Typography variant="h3" component="h2" align="center" className="title">
                  Thanh toán
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs="8" >
                    <FormControl onSubmit={handleSubmit(onSubmit)}>
                      <Typography variant="body2" component="h2" align="left">
                        *Lưu ý: Quý khách vui lòng kiểm tra và cập nhật đầy đủ thông tin(nếu còn trống)
                      </Typography>
                      <TextField
                        id="firstname"
                        name="firstname"
                        label="Họ đệm"
                        fullWidth
                        margin="normal"
                        {...register('firstName', { required: true })}
                        error={errors.firstName ? true : false}
                        InputProps={{ startAdornment: <TextFieldsIcon fontSize="medium" /> }}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                      <Typography variant="inherit" color="red">
                        {errors.firstname?.message}
                      </Typography>
                      <TextField
                        label="Tên"
                        id="lastname"
                        name="lastname"
                        fullWidth
                        margin="normal"
                        {...register('lastName', { required: true })}
                        error={errors.lastname ? true : false}
                        InputProps={{ startAdornment: <BorderColorIcon fontSize="medium" /> }}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                      <Typography variant="inherit" color="red">
                        {errors.lastname?.message}
                      </Typography>
                      <TextField
                        id="phone"
                        name="phone"
                        type="tel"
                        label="Số điện thoại"
                        fullWidth
                        margin="normal"
                        inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
                        {...register('phoneNumber', { required: true })}
                        InputProps={{ startAdornment: <ContactPhoneIcon fontSize="medium" /> }}
                        error={errors.numberphone ? true : false}
                        onChange={(e) => {
                          setNumberPhone(e.target.value);
                        }}
                      />
                      <Typography variant="inherit" color="red">
                        {errors.numberphone?.message}
                      </Typography>
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        margin="normal"
                        InputProps={{ startAdornment: <LocalPostOfficeIcon fontSize="medium" /> }}
                        {...register('email', { required: true })}
                        error={errors.email ? true : false}
                        onChange={(e) => {
                          setEmal(e.target.value);
                        }}
                      />
                      <Typography variant="inherit" color="red">
                        {errors.email?.message}
                      </Typography>
                      <Button variant="contained" color="success" onClick={handleSubmit(onSubmit)}>
                        Lưu
                      </Button>
                    </FormControl>
                  </Grid>
                  <Grid item xs="4" >
                    <div className='checkout__card'>
                      <h4 >Nhà xe <span>{dataBooking[0].NameGarage}</span></h4>
                      <h4>Chuyến xe <span> {dataBooking[0].NameTrip}</span></h4>
                      <h4>
                        Thời gian khởi hành<span>{dayS + "/" + monthS + "/ " + yearS + " - " + hoursS + ":" + minutesS}</span>
                      </h4>
                      <h4>Nơi xuất phát<span> {dataBooking[0].PakingStart}</span></h4>
                      <h4>Nơi đến<span>{dataBooking[0].PakingEnd}</span></h4>
                      <h4>Số ghế đã đặt<span>{dataBooking[0].listSeated.join(", ")}</span></h4>
                      <h4>Giá vé<span>{formattedPrice}</span></h4>
                      <h4>Tổng số lượng ghế<span>{dataBooking[0].totalSeat}</span></h4>
                      <hr />
                      <h3>TỔNG CỘNG <span>{total}</span></h3>
                    </div>
                    <div>
                      <VNPayButton
                        amount={amount}
                        description={description}
                        returnUrl={returnUrl}
                        vnp_TmnCode={vnp_TmnCode}
                        vnp_HashSecret={vnp_HashSecret}
                        vnp_Url={vnp_Url}
                      />
                    </div>
                  </Grid>
                </Grid>
              </>
          }
        </Container>
      </>
      <Footer />
    </>
  )
}

export default Payment