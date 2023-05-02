import React from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { orange } from '@mui/material/colors';
import "./quality.css"
import icon1 from "../../../assets/img/sumary1.png"
import icon2 from "../../../assets/img/sumary2.jpg"
import icon3 from "../../../assets/img/sumary5.jpg"

const quality = () => {
  return (
  
    <div className='quality_container'>
        <div className='title_container'>
            <div className='title'>
                <span>
                      ———   Chất lượng là Danh dự   ———
                </span>
            </div>
        </div>
        <div className='sumary'>
                <div className='sumary_item'>
                    <div className='icon_sumary'>  
                    <img src={icon1} alt="" />
                    </div>
                <div className='sumary_text'>
                    <p className='sumary_title'>20M</p>
                    <p className='sumary_subtitle'>Hơn 20 triệu lượt khách</p>
                    <p className='sumary_desc'> Phục vụ hơn 20 triệu lượt khách/bình quân 1 năm trên toàn quốc</p>
                </div>
                </div>
                <div className='sumary_item'>
                <div className='icon_sumary'>  
                    <img src={icon2} alt="" />
                    {/* <GroupsIcon sx={{ color: orange[500] }} fontSize="inherit" /> */}
                    </div>
                {/* <LocalGasStationIcon/> */}
                <div className='sumary_text'>
                    <p className='sumary_title'>250</p>
                    <p className='sumary_subtitle'>Hơn 250 phòng vé, phòng hàng</p>
                    <p className='sumary_desc'>Có hơn 250 phòng vé, trạm trung chuyển, bến xe... trên toàn hệ thống</p>
                </div>
                </div>
                <div className='sumary_item'>
                <div className='icon_sumary'>  
                    <img src={icon3} alt="" />
                    {/* <GroupsIcon sx={{ color: orange[500] }} fontSize="inherit" /> */}
                    </div>
                <div className='sumary_text'>
                    <p className='sumary_title'>1,600</p>
                    <p className='sumary_subtitle'>Hơn 1,600 chuyến mỗi ngày</p>
                    <p className='sumary_desc'>Phục vụ hơn 1600 chuyến xe đường dài và liên tỉnh mỗi ngày</p>
                </div>
                </div>
            </div>
    </div>
  )
}

export default quality