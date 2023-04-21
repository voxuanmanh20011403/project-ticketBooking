import React, { useCallback, useRef, useState } from "react";
import Glider from "react-glider";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "glider-js/glider.min.css";

import "./style.css";

const Carousel = () => {
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
          slidesToShow={2}
          scrollLock
          hasArrows
          arrows={{
            prev: leftArrowEl.current,
            next: rightArrowEl.current,
          }}
        >
          <div className="slide">
            <img src="https://static.vexere.com/c/i/12766/xe-hai-au-VeXeRe-dWNz2xW-1000x600.jpeg" />
          </div>
          <div className="slide">
            <img src="https://static.vexere.com/production/images/1559637550202.jpeg" />
          </div>
          <div className="slide">
            <img src="https://static.vexere.com/production/images/1660614512334.jpeg" />
          </div>
          <div className="slide">
            <img src="https://static.vexere.com/production/images/1664766327226.jpeg" />
          </div>
          <div className="slide">
            <img src="https://static.vexere.com/production/images/1664766327226.jpeg" />
          </div>
          <div className="slide">
            <img src="https://static.vexere.com/production/images/1664766327226.jpeg" />
          </div>
          <div className="slide">
            <img src="https://static.vexere.com/production/images/1664766327226.jpeg" />
          </div>
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

export default Carousel;
