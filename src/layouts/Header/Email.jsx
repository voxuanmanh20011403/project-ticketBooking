import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import EmailIcon from '@mui/icons-material/Email';
export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}style={{ color: 'white' }}>
            <EmailIcon style={{ marginRight: '0.3rem' }}/>
            Email
          </Button>
        </React.Fragment>
      )}
    </PopupState>
  );
}