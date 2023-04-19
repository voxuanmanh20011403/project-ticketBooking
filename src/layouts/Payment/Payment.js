import React, { useState, useEffect } from 'react'
import { VNPay } from 'vn-payments';
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
import { useForm } from 'react-hook-form';
import './style.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';

// redux
import { tripActions, asyncAddBooking } from "redux/slices/tripsSilce";
import { useDispatch, useSelector } from "react-redux";

const Payment = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [email, setEmal] = useState('');

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
  const description =  `Thanh toán vé xe ${dataBooking[0].NameTrip}`; // Thông tin đơn hàng
  const returnUrl = 'http://localhost:3000/return/'; // Đường dẫn trả về sau khi thanh toán
  const vnp_TmnCode = '0C8OWYLT'; // Mã website của bạn được cấp bởi VNPay
  const vnp_HashSecret = 'ZWPIGMIDMRBEDUXSWHBVSSBKEBYSDWWD'; // Mã bí mật để tạo chữ ký điện tử, được cấp bởi VNPay
  const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await dispatch(asyncAddBooking([...dataBooking, data]));

      // console.log("dataBooking lại: " + JSON.stringify(localData));

      localStorage.setItem("getLocalUserDB", JSON.stringify({data, dataBooking})); 
      const getLocalUserDB = localStorage.getItem('getLocalUserDB');
      console.log("getLocalUserDB: " + (getLocalUserDB));

    } catch (error) {
      console.error(error);
    }

  };

  return (
    <>
      <Header />
      <>
        <Container maxWidth="xl">
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
                  label="Họ đệm"
                  fullWidth
                  margin="normal"
                  {...register('firstName', { required: true })}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <TextField
                  label="Tên"
                  fullWidth
                  margin="normal"
                  {...register('lastName', { required: true })}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <TextField
                  label="Số điện thoại"
                  fullWidth
                  margin="normal"
                  {...register('phoneNumber', { required: true })}
                  onChange={(e) => {
                    setNumberPhone(e.target.value);
                  }}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  InputProps={{ startAdornment: <LocationOnIcon /> }}
                  {...register('email', { required: true })}
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
                <h4 >Nhà xe <span>{dataBooking[0].NameGarage}</span></h4>
                <h4>Chuyến xe <span> {dataBooking[0].NameTrip}</span></h4>
                <h4>
                  Thời gian khởi hành<span>{dayS + "/" + monthS + "/ " + yearS + "-" + hoursS + ":" + minutesS}</span>
                </h4>
                <h4>Nơi xuất phát<span> {dataBooking[0].PakingStart}</span></h4>
                <h4>Nơi đến<span>{dataBooking[0].PakingEnd}</span></h4>
                <h4>Số ghế đã đặt<span>{dataBooking[0].listSeated}</span></h4>
                <h4>Giá vé<span>{dataBooking[0].price}</span></h4>
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
        </Container>
      </>
      <Footer />
    </>
  )
}

export default Payment