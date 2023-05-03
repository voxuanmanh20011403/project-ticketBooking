import React from 'react';
import { Container, Grid } from '@mui/material';
import styles from './Footer.css';
const BodyFooter = () => {
    const about = [
        {
            title: 'Tuyến Đường',
            iteam: [
                'Xe đi Đà Nẵng từ Sài Gòn',
                'Xe đi Huế từ Sài Gòn',
                'Xe đi Đà Nắng từ Hà Nội',
                'Xe đi Huế từ Hà Nội'
            ]
        },
        {
            title: 'Xe Limousine',
            iteam: [
                'Xe Limousine đi Đà Nẵng từ Huế',
                'Xe Limousine đi Huế từ Đà Nẵng',
                'Xe Limousine đi Đà Nẵng từ Sài Gòn',
                'Xe Limousine đi Huế từ Sài Gòn',
            ]
        },
        {
            title: 'Bến Xe',
            iteam: [
                'Bến Xe Trung Tâm Đà Nẵng',
                'Bến Xe Phía Nam Huế',
                'Bến Xe Phương Trang',
                'Bến Xe Mỹ Đình',
            ]
        },
        {
            title: 'Nhà Xe',
            iteam: [
                'Xe Phương Trang',
                'Xe Hoàng Long',
                'Xe Minh Đức',
                'Xe Hoàng Hải',
            ]
        },

    ]
    return (
        <div className='body__footer'>
            {/* //      <Container  className='footer_info'> */}
            <Container spacing={4} className='footer__info' >
                {about.map((about, index) => {
                    return (
                        <Grid md={12}>
                            <Grid key={index} item md={12}>
                                <h4 className='about__title' >{about.title}</h4>
                                <ul className='about__list' >
                                    {about.iteam.map((item, indexItem) => {
                                        return (
                                            <li className='about__item' key={indexItem} >{item}</li>
                                        )
                                    })}
                                </ul>
                            </Grid>
                        </Grid>
                    )
                })}
            </Container>

        </div>
    )
}
export default BodyFooter
