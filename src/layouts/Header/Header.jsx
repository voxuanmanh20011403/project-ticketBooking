import React from 'react'
import { Container } from '@mui/system'
import Auth from './Auth';
import ContactNav from './Contact';
import styles from './Header.css';
const Header = () => {
  return (
    <div className='navBar'>
      <Container className='container' width='881' height='120' >
        <ContactNav />
        {/* <Auth /> */}
      </Container>
      <div className='navBar__img-right'></div>
    </div>
  )
}

export default Header