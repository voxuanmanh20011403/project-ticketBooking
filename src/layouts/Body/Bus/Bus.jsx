import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function Bus() {
    return (
        <div className="bus" id="bus">
            <p className='title'>Bến Xe Khách </p>
            <ImageList sx={{ width: 1000, height: 250, margin: 'auto', marginBottom:'30px',  display: 'flex', justifyContent: 'center',gap: '50px' }}>
                <ImageListItem key="Subheader" cols={4}>
                </ImageListItem>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=4 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={item.author}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.title}`}
                                >
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>

    );
}

const itemData = [
    {
        img: 'https://storage.googleapis.com/fe-production/images/bx-gia-lam.jpg',
        title: 'Bến Xe Gia Lâm',
        rows: 2,
        featured: true,
    },
    {
        img: 'https://storage.googleapis.com/fe-production/images/bx-mien-dong.jpg',
        title: 'Bến Xe Miền Đông',
    },
    {
        img: 'https://storage.googleapis.com/fe-production/images/bx-nuoc-ngam.jpg',
        title: 'Bến Xe Nước Ngầm',
    },
    {
        img: 'https://storage.googleapis.com/fe-production/images/bx-my-dinh.jpg',
        title: 'Bến Xe Mỹ Đình',
        cols: 2,
    },
];