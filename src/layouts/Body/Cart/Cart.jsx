// import React from 'react'
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import ListSubheader from '@mui/material/ListSubheader';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
// import SliderCustom from 'layouts/slide/SliderCustom';
// import Carousel from 'layouts/Booking/Carousel';
// const img = [
//   'https://storage.googleapis.com/vex-config/cms-tool/destination/images/20/img_card.png',
//   'https://storage.googleapis.com/vex-config/cms-tool/destination/images/24/img_hero.png',
//   'https://storage.googleapis.com/vex-config/cms-tool/destination/images/3/img_hero.png',
//   'https://storage.googleapis.com/vex-config/cms-tool/destination/images/22/img_hero.png',
//   'https://storage.googleapis.com/vex-config/cms-tool/destination/images/25/img_hero.png',
// ]
// export default function Cart() {
//   return (
//     <Carousel></Carousel>
//   );
// }


import React, { useCallback, useRef, useState } from "react";
import Glider from "react-glider";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "glider-js/glider.min.css";

 import "./Cart.css";

const Cart = () => {
  const leftArrowEl = useRef(null);
  const rightArrowEl = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const leftArrowCallbackRef = useCallback((element) => {
    leftArrowEl.current = element;
    setIsReady(Boolean(leftArrowEl.current && rightArrowEl.current));
  }, []);

  const rightArrowCallbackRef = useCallback((element) => {
    rightArrowEl.current = element;
    setIsReady(Boolean(leftArrowEl.current && rightArrowEl.current));
  }, []);
  return (
    <div className="container">
      {isReady && (
        <Glider
          className="glider-container"
          draggable
          hasDots
          slidesToShow={4}
          scrollLock
          hasArrows
          arrows={{
            prev: leftArrowEl.current,
            next: rightArrowEl.current,
          }}
        >
          <div className="slide">
            <img src="https://storage.googleapis.com/vex-config/cms-tool/destination/images/20/img_card.png" />
          </div>
          <div className="slide">
            <img src="https://storage.googleapis.com/vex-config/cms-tool/destination/images/24/img_hero.png" />
          </div>
          <div className="slide">
            <img src="https://storage.googleapis.com/vex-config/cms-tool/destination/images/3/img_hero.png" />
          </div>
          <div className="slide">
            <img src="https://storage.googleapis.com/vex-config/cms-tool/destination/images/22/img_hero.png" />
          </div>
          <div className="slide">
            <img src="https://storage.googleapis.com/vex-config/cms-tool/destination/images/25/img_hero.png" />
          </div>
          {/* <div className="slide">
            <img src="https://static.vexere.com/production/images/1664766327226.jpeg" />
          </div>
          <div className="slide">
            <img src="https://static.vexere.com/production/images/1664766327226.jpeg" />
          </div> */}
        </Glider>
      )}
      <div className="btn__arrow">
        <button
          ref={leftArrowCallbackRef}
          type="button"
          aria-label="Previous"
          className="custom-arrow"
        >
          <KeyboardArrowLeftIcon />
        </button>
        <button
          ref={rightArrowCallbackRef}
          type="button"
          aria-label="Next"
          className="custom-arrow"
        >
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Cart;


