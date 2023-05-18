import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import './Cart.css'

import cart1 from "./../../../assets/img/Cart1.png"
import cart2 from "./../../../assets/img/Cart2.png"
import cart3 from "./../../../assets/img/Cart3.png"
import cart4 from "./../../../assets/img/Cart4.png"
import cart5 from "./../../../assets/img/Cart5.png"
import cart6 from "./../../../assets/img/Cart16.png"
import cart7 from "./../../../assets/img/Cart7.png"
import cart8 from "./../../../assets/img/Cart8.png"
import cart9 from "./../../../assets/img/Cart9.png"
import cart10 from "./../../../assets/img/Cart10.png"

import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
// const cartRef = useRef(null);

function Cart() {
  return (
    <div className="container" id="cart">
      <p className='title'>Tuyến phổ biến </p>
      <div className="iteam" >
        <div className="row">
          <div className="iteam-container">
            <div className='mark'>
              <img src={cart6} alt="" />
              <div className='text'>
                <h3>SÀI GÒN ⇒ ĐÀ NẴNG</h3>
              </div>
              <div className='detail'>
                <LocationOnIcon />980km
                <AccessTimeIcon />20h
                <ConfirmationNumberIcon />395.000đ
              </div>
            </div>
          </div>
          <div className="iteam-container">
            <div className='mark'>
              <img src={cart1} alt="" />
              <div className='text1'>
                <h3>SÀI GÒN ⇒ HUẾ</h3>
              </div>
              <div className='detail'>
                <LocationOnIcon />1050km
                <AccessTimeIcon />22h
                <ConfirmationNumberIcon />400.000đ
              </div>
            </div>
          </div>
          <div className="iteam-container">
            <div className='mark'>
              <img src={cart7} alt="" />
              <div className='text'>
                <h3>ĐÀ NẴNG ⇒ HÀ NỘI</h3>
              </div>
              <div className='detail'>
                <LocationOnIcon />745km
                <AccessTimeIcon />18h
                <ConfirmationNumberIcon />360.000đ
              </div>
            </div>
          </div>
          <div className="iteam-container">
            <div className='mark'>
              <img src={cart5} alt="" />
              <div className='text1'>
                <h3>HUẾ ⇒ HÀ NỘI</h3>
              </div>
              <div className='detail'>
                <LocationOnIcon />654km
                <AccessTimeIcon />12h
                <ConfirmationNumberIcon />320.000đ
              </div>
            </div>
            </div>
        </div>
        <div className="row_r">
          <div className="iteam-container">
            <div className='mark'>
              <img src={cart3} alt="" />
              <div className='text'>
                <h3>SÀI GÒN ⇒ NHA TRANG</h3>
              </div>
              <div className='detail'>
                <LocationOnIcon />980km
                <AccessTimeIcon />20h
                <ConfirmationNumberIcon />395.000đ
              </div>
            </div>
          </div>
          <div className="iteam-container">
            <div className='mark'>
              <img src={cart2} alt="" />
              <div className='text1'>
                <h3>CẦN THƠ ⇒ SÀI GÒN</h3>
              </div>
              <div className='detail'>
                <LocationOnIcon />1050km
                <AccessTimeIcon />22h
                <ConfirmationNumberIcon />400.000đ
              </div>
            </div>
          </div>
          <div className="iteam-container">
            <div className='mark'>
              <img src={cart8} alt="" />
              <div className='text'>
                <h3>SÀI GÒN ⇒ CÀ MAU</h3>
              </div>
              <div className='detail'>
                <LocationOnIcon />745km
                <AccessTimeIcon />18h
                <ConfirmationNumberIcon />360.000đ
              </div>
            </div>
          </div>
          <div className="iteam-container">
            <div className='mark'>
              <img src={cart10} alt="" />
              <div className='text1'>
                <h3>SÀI GÒN ⇒ QUẢNG BÌNH</h3>
              </div>
              <div className='detail'>
                <LocationOnIcon />654km
                <AccessTimeIcon />12h
                <ConfirmationNumberIcon />320.000đ
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Cart