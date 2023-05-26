import React, { useState, useEffect } from 'react'
import VNPayButton from './VNPayButton';
import Header from 'layouts/Header/Header';
import Footer from 'layouts/Footer/Footer';
import Stack from "@mui/material/Stack";
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
import Backdrop from '@mui/material/Backdrop';
// hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './style.css'
import {
  Timestamp,
} from "firebase/firestore";

// redux
import { tripActions, asyncAddBooking } from "redux/slices/tripsSilce";
import { useDispatch, useSelector } from "react-redux";

const Payment = () => {
  const [lastName, setLastName] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [email, setEmal] = useState('');
  const [loading, setLoading] = useState(true);
  // get stateBooking from reudx
  const dataBooking = useSelector(state => state.trip.stateBooking);

  const timeStart = dataBooking[0]?.StartTime;

  const dateS = new Date(timeStart?.seconds * 1000);
  const timestamp = Timestamp.fromDate(dateS);
  console.log(timestamp);

  const dayS = dateS.getDate();
  const monthS = dateS.getMonth() + 1;
  const yearS = dateS.getFullYear();
  const hoursS = dateS.getHours();
  const minutesS = dateS.getMinutes();
  //  console.log("dataBooking: " + JSON.stringify(dataBooking[0].NameGarage));

  const total = parseInt(dataBooking[0]?.price) * dataBooking[0]?.totalSeat;

  const amount = total; // Số tiền cần thanh toán
  const description = `Thanh toán vé xe ${dataBooking[0]?.NameTrip}`; // Thông tin đơn hàng
  const returnUrl = 'http://localhost:3000/return/'; // Đường dẫn trả về sau khi thanh toán
  const vnp_TmnCode = '0C8OWYLT'; // Mã website của bạn được cấp bởi VNPay
  const vnp_HashSecret = 'ZWPIGMIDMRBEDUXSWHBVSSBKEBYSDWWD'; // Mã bí mật để tạo chữ ký điện tử, được cấp bởi VNPay
  const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

  const dispatch = useDispatch();
  useEffect(() => {
    const getLocalAccount = JSON.parse(localStorage.getItem('account'));
    setLastName(getLocalAccount.Name);
    setNumberPhone(getLocalAccount.NumberPhone);
    setEmal(getLocalAccount.Email);
  }, [])


  const { register, handleSubmit }
    = useForm();


  const onSubmit = async (data) => {
    // console.log(data);
    try {
      await dispatch(asyncAddBooking([...dataBooking, data]));

      localStorage.setItem("getLocalUserDB", JSON.stringify({ data, dataBooking }));
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!" + error);
    }
  };

 
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  // foramt price
  const price = dataBooking[0]?.price;
  const formattedPrice = price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  return (
    <>
      <Header />
      <Container maxWidth="xl" >
        {
          loading ? (
            <Container maxWidth="xl" className="container__payment" >
              <Stack
                direction="column"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
              >
                <CircularProgress className="progress" />
              </Stack>
            </Container>
          ) :
            <>
              <Typography variant="h3" component="h2" align="center" className="title">
                Thanh toán thông tin
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs="8" >
                  <FormControl onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="body2" component="h2" align="left">
                      *Lưu ý: Quý khách vui lòng kiểm tra và cập nhật đầy đủ thông tin(nếu còn trống)
                    </Typography>
                    <TextField
                      label="Họ tên"
                      required
                      id="lastname"
                      name="lastname"
                      fullWidth
                      margin="normal"
                      value={lastName}
                      {...register('lastName')}
                      InputProps={{ startAdornment: <BorderColorIcon fontSize="medium" /> }}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                    <TextField
                      required
                      id="phone"
                      name="phone"
                      type="tel"
                      label="Số điện thoại"
                      value={numberPhone}
                      fullWidth
                      margin="normal"
                      inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
                      {...register('phoneNumber')}
                      InputProps={{ startAdornment: <ContactPhoneIcon fontSize="medium" /> }}
                      onChange={(e) => {
                        setNumberPhone(e.target.value);
                      }}
                    />
                    <TextField
                      required
                      id="email"
                      value={email}
                      name="email"
                      label="Email"
                      fullWidth
                      margin="normal"
                      InputProps={{ startAdornment: <LocalPostOfficeIcon fontSize="medium" /> }}
                      {...register('email')}
                      onChange={(e) => {
                        setEmal(e.target.value);
                      }}
                    />
                    <Button variant="contained" color="success" onClick={handleSubmit(onSubmit)}>
                      Lưu
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs="4" >
                  <div className='checkout__card'>
                    <h4 >Nhà xe <span>{dataBooking[0]?.NameGarage}</span></h4>
                    <h4>Chuyến xe <span> {dataBooking[0]?.NameTrip}</span></h4>
                    <h4>
                      Thời gian khởi hành<span>{dayS + "/" + monthS + "/ " + yearS + " - " + hoursS + ":" + minutesS}</span>
                    </h4>
                    <h4>Nơi xuất phát<span> {dataBooking[0]?.PakingStart}</span></h4>
                    <h4>Nơi đến<span>{dataBooking[0]?.PakingEnd}</span></h4>
                    <h4>Số ghế đã đặt<span>{dataBooking[0]?.listSeated.join(", ")}</span></h4>
                    <h4>Giá vé<span>{formattedPrice}</span></h4>
                    <h4>Tổng số lượng ghế<span>{dataBooking[0]?.totalSeat}</span></h4>
                    <hr />
                    <h3>TỔNG CỘNG <span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></h3>
                  </div>
                  <div>
                    <VNPayButton
                      amount={amount}
                      description={description}
                      returnUrl={returnUrl}
                      vnp_TmnCode={vnp_TmnCode}
                      vnp_HashSecret={vnp_HashSecret}
                      vnp_Url={vnp_Url}
                      lastName={lastName}
                      numberPhone={numberPhone}
                      email={email}
                    />
                  </div>
                </Grid>
              </Grid>
            </>
        }
      </Container>
      <Footer />
    </>
  )
}

export default Payment