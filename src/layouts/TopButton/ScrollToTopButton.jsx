import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "./ScrollToTopButton.css"; // Import file CSS để tùy chỉnh kiểu dáng

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    document.getElementById("scroll-top-button").classList.add("jump-animation");
    setTimeout(() => {
      document.getElementById("scroll-top-button").classList.remove("jump-animation");
    }, 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
    id="scroll-top-button"
      className={isVisible ? "show-button" : "hide-button"}
      onClick={handleScrollToTop}
    >
      <KeyboardArrowUpIcon/>
    </button>
  );
};

export default ScrollToTopButton;