import React, { useEffect } from 'react'
import BannerSearch from './BannerSearch'
import BannerDateTime from './BannerDateTime'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
// import DateTime from '/Datetime'
import './Banner.css'
import imgBanner from '../../../assets/img/Banner.jpg'
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import Cart from '../Cart/Cart';
import Intro from '../Intro/Intro';
import Quality from '../Quality/Quality';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ReactDOM from 'react-dom/client'
import Bg from '../Cart/Bg';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100;
  padding: 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 50;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  min-width: 1000px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  //  box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  //  `,
);

const Banner = () => {
  return (
    <div className='banner'>
      <div className="banner__img"  >
        <div className="banner_form">
          <h2>SwiftRide - Cam kết hoàn 150% nếu nhà xe không giữ vé</h2>
          <div className="wrap__form">
            <TabsUnstyled defaultValue={2}>
              <TabsList>
                <Tab value={1}>
                  <DirectionsBusIcon></DirectionsBusIcon>Xe Khách
                </Tab>
              </TabsList>
            </TabsUnstyled>
          </div>
          
          <div className="form__title">
            <TabsUnstyled defaultValue={1}>
              <TabsList>
                <Tab value={1}>
                  <BannerSearch />
                </Tab>
              </TabsList>
            </TabsUnstyled>
          </div>
        </div>
      </div>
      <Intro/>
      <Cart/> 
      <Quality/>
      <Bg/>
  </div>
    
  )
}

export default Banner