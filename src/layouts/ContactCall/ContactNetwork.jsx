import React from 'react'
import './ContactNetwork.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import YouTubeIcon from '@mui/icons-material/YouTube';
const ContactNetwork = () => {
  return (
    <div className='network' >
        <a href="https://www.facebook.com/profile.php?id=100092580654436" target="_blank" className='fb_icon'><i><FacebookIcon/></i>Facebook</a>
        <a href="https://www.youtube.com/channel/UC8bcBD_vUpMIGEMo_u0GwJA" target="_blank" className='yt_icon'><i><YouTubeIcon/></i>Youtube</a>
        <a href="https://www.instagram.com/ziroa_qd/" target="_blank" className='is_icon'><i><InstagramIcon/></i>Instaram</a>
        <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" className='gg_icon'><i><GoogleIcon/></i>Google</a>
    </div>
  )
}

export default ContactNetwork