import React from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import './ContactCall.css'

const ContactCall = () => {

  return (
    <div className='contact_call'>
      <a href=""><i style={{ fontSize: '40px' }}><PhoneIcon className='phone_icon' /></i>
        </a>
    </div>
  );
};

export default ContactCall;


// ContactCall