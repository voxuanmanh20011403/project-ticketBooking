import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { blue } from '@mui/material/colors';

const PhoneButton = styled(Box)(({ theme, isExpanded }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  left: theme.spacing(3),
  zIndex: 9999,
  opacity: 0.8,
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  padding: theme.spacing(1),
  transition: 'transform 0.3s, width 0.3s, height 0.3s',
  backgroundColor: isExpanded ? blue[500] : blue[700],
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const PhoneIconButton = styled(IconButton)({
  width: '100%',
  height: '20%',
});

const PhoneIconWrapper = styled(PhoneIcon)(({ isVibrating }) => ({
    fontSize: '1.5rem',
  width: '40',
  height: '40',
  animation: isVibrating ? 'vibration 0.3s infinite' : 'none',
  color: blue[50],
}));

const ContactCall = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [isVibrating, setVibrating] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const buttonTopOffset = buttonRef.current.getBoundingClientRect().top;

      if (scrollPosition > buttonTopOffset - windowHeight / 2) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isExpanded) {
      const vibrationInterval = setInterval(() => {
        setVibrating((prevVibrating) => !prevVibrating);
      }, 300);

      return () => {
        clearInterval(vibrationInterval);
      };
    }
  }, [isExpanded]);

  return (
    <PhoneButton ref={buttonRef} isExpanded={isExpanded}>
      <PhoneIconButton>
        <PhoneIconWrapper isVibrating={isVibrating} />
      </PhoneIconButton>
    </PhoneButton>
  );
};

export default ContactCall;


// ContactCall