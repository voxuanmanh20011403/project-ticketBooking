import React from 'react'
import styles from './Footer.css';


const BannerFooter = () => {
    return (
        <div>
            <div className='banner__down_app' >
                <div className='btn__down' >
                <parent>
                    <h2>Chứng nhận</h2>
                        <div className='btn_card'></div>
                        <div className='btn_card1'></div>
                        <div className='btn_card2'></div>
                    </parent>
                    <br/>
                    <parent>
                    <h2>Tải ứng dụng</h2>
                        <div className='btn__down-gg-play' ></div>
                        <div className='btn__down-app-store' ></div>
                    </parent>
                </div>
            </div>
        </div>
    )
}

export default BannerFooter