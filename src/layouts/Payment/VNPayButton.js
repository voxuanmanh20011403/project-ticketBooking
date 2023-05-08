import React, { useState } from 'react';
import {
  Button,
} from '@mui/material';

import './style.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tripActions, asyncAddBooking } from "redux/slices/tripsSilce";
import { useDispatch, useSelector } from "react-redux";

var unidecode = require('unidecode');

const VNPayButton = ({ amount, description, returnUrl, vnp_TmnCode, vnp_HashSecret, vnp_Url ,lastName,numberPhone,email}) => {
  const data= {lastName,numberPhone,email};

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
  const dispatch = useDispatch();
  const dataBooking = useSelector(state => state.trip.stateBooking);

  const handleVNPayButtonClick = async () => {
    console.log("dataUser: " + data);
    try {
      await dispatch(asyncAddBooking([...dataBooking, data]));

      localStorage.setItem("getLocalUserDB", JSON.stringify({ data, dataBooking }));
      const vnpPayUrl = generateVNPayUrl();
      window.location.href = vnpPayUrl;
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!" +error);
    }
  };

  return (
      <Button variant="contained" color="success" className='btn_checkout' onClick={handleVNPayButtonClick}>
        Thanh toán
      </Button>
  );
};

export default VNPayButton;
