import React, { useEffect } from 'react'
import BannerSearch from './BannerSearch'
import BannerDateTime from './BannerDateTime'
// import DateTime from '/Datetime'
import './Banner.css'
import imgBanner from '../../../assets/img/Banner.jpg'

const Banner = () => {
  return (
    <div className='banner'>
        <div className="banner__img"  >
            <div className="banner_form">
                <div className="wrap__form">
                <h2>VeXeRe - Cam kết hoàn 150% nếu nhà xe không giữ vé</h2>
                    <div className="form__title">
                        {/* <img src={imgBanner} alt="" /> */}
                        <BannerSearch/> 
                        {/* <BannerSearch/>  */}
                     {/* <BannerDateTime/> */}
                    </div>
                    

                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner