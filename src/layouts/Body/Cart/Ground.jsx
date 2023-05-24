import React from 'react'
import bg1 from '../../../assets/img/background1.png'
import bg2 from '../../../assets/img/background2.png'

import './Cart.css'

const Bg = () => {
  return (
    <div className='Cart_background'>
        <img src={bg1} alt=""  className='bg1'/>
        <img src={bg2} alt=""  className='bg2'/>
    </div>
  )
}

export default Bg