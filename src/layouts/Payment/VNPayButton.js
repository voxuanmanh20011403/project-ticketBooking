import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
} from '@mui/material';

import './style.css';

var unidecode = require('unidecode');

const VNPayButton = ({ amount, description, returnUrl, vnp_TmnCode, vnp_HashSecret, vnp_Url }) => {

  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);

  let formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;
  const txnRef = Math.floor(Math.random() * 1000) + 1;
  // console.log("txnRef" + txnRef);

  const generateVNPayUrl = () => {
    const vnp_Amount = parseInt(amount) * 100; // VNPAY yêu cầu số tiền được nhân với 100
    const vnp_Command = 'pay';
    // const vnp_CreateDate = new Date().toISOString().replace(/T.*/, ''); 
    const vnp_CreateDate = formattedDate;
    const vnp_CurrCode = 'VND'; // Loại tiền tệ
    const vnp_IpAddr = '192.168.1.1'; // Địa chỉ IP của client
    const vnp_Locale = 'vn'; // Ngôn ngữ hiển thị
    const vnp_OrderInfo = unidecode(description); // Thông tin đơn hàng
    const vnp_OrderType = 'other';
    // const vnp_TxnRef = new Date().getTime(); // Mã đơn hàng
    const vnp_TxnRef = `${txnRef}`; // Mã đơn hàng
    const vnp_Version = '2.1.0'; // Phiên bản VNPay sử dụng

    const vnp_Params = new URLSearchParams({
      vnp_Amount,
      vnp_Command,
      vnp_CreateDate,
      vnp_CurrCode,
      vnp_IpAddr,
      vnp_Locale,
      vnp_OrderInfo,
      vnp_OrderType,
      vnp_ReturnUrl: returnUrl,
      vnp_TmnCode,
      vnp_TxnRef,
      vnp_Version,
    });
    
    vnp_Params.sort();

    const secureHash = require('crypto')
      .createHmac('sha512', vnp_HashSecret)
      .update(vnp_Params.toString())
      .digest('hex');
    console.log("secureHash: " + secureHash)

    console.log("URL: " + `${vnp_Url}?${vnp_Params.toString()}&vnp_SecureHashType=sha512&vnp_SecureHash=${secureHash}`);
    // return `${vnp_Url}?${vnp_Params.toString()}&vnp_SecureHashType=SHA256&vnp_SecureHash=${secureHash}`;
    return `${vnp_Url}?${vnp_Params.toString()}&vnp_SecureHash=${secureHash}`;
  };

  const handleVNPayButtonClick = () => {
    const vnpPayUrl = generateVNPayUrl();
    window.location.href = vnpPayUrl;
  };

  return (
    // <Container maxWidth="xl">
    //   <Typography variant="h3" component="h2" align="center" className="title">
    //     Thanh toán
    //   </Typography>
    //   <Grid container spacing={4}>
    //     <Grid item xs="8" >
    //       <FormControl onSubmit={handleSubmit(onSubmit)}>
    //         <Typography variant="body2" component="h2" align="left">
    //           *Lưu ý: Quý khách vui lòng kiểm tra và cập nhật đầy đủ thông tin(nếu còn trống)
    //         </Typography>
    //         <TextField
    //           label="Họ đệm"
    //           fullWidth
    //           margin="normal"
    //           {...register('firstName', { required: true })}
    //         />
    //         <TextField
    //           label="Tên"
    //           fullWidth
    //           margin="normal"
    //           {...register('lastName', { required: true })}
    //         />
    //         <TextField
    //           label="Số điện thoại"
    //           fullWidth
    //           margin="normal"
    //           {...register('phoneNumber', { required: true })}
    //         />
    //         <TextField
    //           label="Thông tin thanh toán"
    //           fullWidth
    //           margin="normal"
    //           InputProps={{ startAdornment: <LocationOnIcon /> }}
    //           {...register('tripInfo', { required: true })}
    //         />
    //       </FormControl>
    //     </Grid>
    //     <Grid item xs="4" >
    //       <div className='checkout__card'>
    //         <h4 >Nhà xe <span>Phương Trang</span></h4>
    //         <h4>Chuyến xe <span> Hà Nội - Đà Nẵng</span></h4>
    //         <h4>
    //           Thời gian khởi hành<span>12:30</span>
    //         </h4>
    //         <h4>Nơi xuất phát<span> Bến xe Hà Nội</span></h4>
    //         <h4>Nơi đến<span>Bến xe Đà Nẵng</span></h4>
    //         <h4>Số ghế đã đặt<span>A1, A2</span></h4>
    //         <h4>Giá vé<span>1.000.000 đ</span></h4>
    //         <h4>Tổng số lượng ghế<span>6</span></h4>
    //         <hr />
    //         <h3>TỔNG CỘNG <span>{ }31 000 VNĐ</span></h3>
    //       </div>

    //     </Grid>
    //   </Grid>
    // </Container>
      <Button variant="contained" color="success" className='btn_checkout' onClick={handleVNPayButtonClick}>
        Thanh toán
      </Button>
  );
};

export default VNPayButton;
