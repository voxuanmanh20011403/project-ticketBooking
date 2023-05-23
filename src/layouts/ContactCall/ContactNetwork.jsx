import React from 'react'
import './ContactNetwork.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import YouTubeIcon from '@mui/icons-material/YouTube';
const ContactNetwork = () => {
  return (
    <div className='network' >
        <a href="" className='fb_icon'><i><FacebookIcon/></i> Facebook</a>
        <a href="" className='yt_icon'><i><YouTubeIcon/></i> Youtube</a>
        <a href="" className='is_icon'><i><InstagramIcon/></i> Instaram</a>
        <a href="" className='gg_icon'><i><GoogleIcon/></i>Google</a>
    </div>
  )
}

export default ContactNetwork