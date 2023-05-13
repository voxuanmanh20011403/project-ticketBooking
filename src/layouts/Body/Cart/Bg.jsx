import React from 'react'
import bg1 from '../../../assets/img/background1.png'
import bg2 from '../../../assets/img/background2.png'
import bg3 from '../../../assets/img/bg3.png'

import './Cart.css'

const Bg = () => {
  return (
    <div className='Cart_background'>
        <img src={bg3} alt="" className='bg3'/>
        <img src={bg1} alt=""  className='bg1'/>
        <img src={bg2} alt=""  className='bg2'/>
    </div>
  )
}

export default Bg