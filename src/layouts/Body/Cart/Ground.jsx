import React from 'react'
import bg1 from '../../../assets/img/background1.png'
import bg2 from '../../../assets/img/background2.png'
import bg3 from '../../../assets/img/bg4.png'

import './Cart.css'

const Ground = () => {
  return (
    <div className='Cart_background'>
        <img src={bg1} alt=""  className='bg1'/>
        <img src={bg2} alt=""  className='bg2'/>
        <img src={bg3} alt=""  className='bg4'/>
    </div>
  )
}

export default Ground