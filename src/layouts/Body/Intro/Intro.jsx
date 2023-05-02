import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { isDateAfterType } from 'react-day-picker';
import './intro.css';
import SliderCustom from '../slider/SliderCustom';
import qc1 from "../../../assets/img/qc1.png"
import qc2 from "../../../assets/img/qc2.png"
import qc3 from "../../../assets/img/qc3.png"
import qc4 from "../../../assets/img/qc4.png"
import qc5 from "../../../assets/img/qc5.jpg"
import qc6 from "../../../assets/img/qc6.jpg"


export default function Intro()   {
  return (
    <div className="container_intro">
      <div className="cart">
          <SliderCustom>
            <div className="slide">
          <img src={qc1} alt="" />
          </div>
          <div className="slide">
          <img src={qc2} alt="" />
          </div>
          <div className="slide">
          <img src={qc3} alt="" />
          </div>
          <div className="slide">
          <img src={qc4} alt="" />
          </div>
          <div className="slide">
          <img src={qc5} alt="" />
          </div>
          <div className="slide">
          <img src={qc6} alt="" />
          </div>
          </SliderCustom>
        </div>
    </div>
        
    // <Direction></Direction>
  )}


