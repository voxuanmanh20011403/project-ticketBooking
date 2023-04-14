import React, { useState } from 'react'
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


var Transform = require('stream').Transform

const Payment = () => {
  const [total, setTotal] = useState(0);

  const amount = '10000'; // Số tiền cần thanh toán
  const description = 'đây là tiếng việt có dấu'; // Thông tin đơn hàng
  const returnUrl = 'http://localhost:3000/return/'; // Đường dẫn trả về sau khi thanh toán
  const vnp_TmnCode = '0C8OWYLT'; // Mã website của bạn được cấp bởi VNPay
  const vnp_HashSecret = 'ZWPIGMIDMRBEDUXSWHBVSSBKEBYSDWWD'; // Mã bí mật để tạo chữ ký điện tử, được cấp bởi VNPay
  const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  // console.log("Transform: " + Transform );
  
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
                />
                <TextField
                  label="Tên"
                  fullWidth
                  margin="normal"
                  {...register('lastName', { required: true })}
                />
                <TextField
                  label="Số điện thoại"
                  fullWidth
                  margin="normal"
                  {...register('phoneNumber', { required: true })}
                />
                <TextField
                  label="Thông tin thanh toán"
                  fullWidth
                  margin="normal"
                  InputProps={{ startAdornment: <LocationOnIcon /> }}
                  {...register('tripInfo', { required: true })}
                />
              </FormControl>
            </Grid>
            <Grid item xs="4" >
              <div className='checkout__card'>
                <h4 >Nhà xe <span>Phương Trang</span></h4>
                <h4>Chuyến xe <span> Hà Nội - Đà Nẵng</span></h4>
                <h4>
                  Thời gian khởi hành<span>12:30</span>
                </h4>
                <h4>Nơi xuất phát<span> Bến xe Hà Nội</span></h4>
                <h4>Nơi đến<span>Bến xe Đà Nẵng</span></h4>
                <h4>Số ghế đã đặt<span>A1, A2</span></h4>
                <h4>Giá vé<span>1.000.000 đ</span></h4>
                <h4>Tổng số lượng ghế<span>6</span></h4>
                <hr />
                <h3>TỔNG CỘNG <span>{ }31 000 VNĐ</span></h3>
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