import React, { useState } from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import './ContactCall.css'

const ContactCall = () => {


  return (
    <div className='contact_call'>
      <a href="" >
        <i style={{ fontSize: '40px' }}>
          <PhoneIcon className='phone_icon' />
        </i>
      </a>
    
        <div className="hotline-container">
          <div className="hotline">
            <p style={{ color: 'red',fontWeight: 'bold', fontSize: '20px' }}>Hotline:</p>
            <p>Quang Dũng: 0772413737</p> 
            <p>Xuân Mạnh: 0372737370 </p>
            
          </div>
        </div>

    </div>
  );
};

export default ContactCall;


// ContactCall