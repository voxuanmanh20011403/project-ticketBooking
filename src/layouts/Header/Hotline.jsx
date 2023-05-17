import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import CallIcon from '@mui/icons-material/Call';

export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}style={{ color: 'white' }}>
            <CallIcon style={{ marginRight: '0.3rem' }}/>
            Hotline
          </Button>
        </React.Fragment>
      )}
    </PopupState>
  );
}