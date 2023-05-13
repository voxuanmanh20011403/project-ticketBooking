import React, { useEffect } from 'react'
import BannerSearch from './BannerSearch'
import BannerDateTime from './BannerDateTime'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import './Banner.css'
import imgBanner from '../../../assets/img/Banner.jpg'
import Cart from '../Cart/Cart';
import Intro from '../Intro/Intro';
import Quality from '../Quality/Quality';
import Bg from '../Cart/Bg';
import { styled } from '@mui/system';
import { buttonClasses } from '@mui/base/Button';
import Tabs from '@mui/base/Tabs';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import Tab, { tabClasses } from '@mui/base/Tab';
import Bus from '../Bus/Bus';

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
const white = {
  50: '#fff',
  100: '#fff',
  200: '#fff',
  300: '#fff',
  400: '#fff',
  500: '#fff',
  600: '#fff',
  700: '#fff',
  800: '#fff',
  900: '#fff',
};

const StyledTab = styled(Tab)`
  font-family: IBM Plex Sans, sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
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

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)(
  ({ theme }) => `
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? white[900] :  white[50]};
  border: 1px solid ${theme.palette.mode === 'dark' ? white[700] : white[200]};
  border-radius: 12px;
  `,
);

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);
const Banner = () => {
  return (
    <div className='banner'>
      <div className="banner__img"  >
        <div className="banner_form">
          <h2>SwiftRide - Cam kết hoàn 150% nếu nhà xe không giữ vé</h2>
          <div className="wrap__form">

            <Tabs >
              <StyledTabsList>
                <StyledTab ><DirectionsBusIcon></DirectionsBusIcon>Xe Khách</StyledTab>
              </StyledTabsList>
              <StyledTabPanel ><BannerSearch /></StyledTabPanel>
            </Tabs>
          </div>

          <div className="form__title">
            {/* <TabsList>
                <Tab value={1}>
                  
                </Tab>
              </TabsList> */}
          </div>
        </div>
      </div>
      <Intro />
      <Cart />
      <Quality />
      <Bg />
      <Bus/>
    </div>

  )
}

export default Banner


