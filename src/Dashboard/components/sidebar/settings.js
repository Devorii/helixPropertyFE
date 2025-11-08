import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SettingsIcon from '@mui/icons-material/Settings';

const SettingsMenuPopup = ({ signOut, regPayment}) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            sx={{
              background: 'none',
              boxShadow: 'none',
              color: 'black',
              fontSize: 'small',
              ':hover': {
                color: 'rgb(231, 109, 91)',
                background: 'none', // Keeps background from changing
                boxShadow: 'none',  // Removes the hover shadow
              },
            }}
            variant="contained"
            {...bindTrigger(popupState)}
          >
            <SettingsIcon sx={{ marginRight: '10px', width: '18px', height: '18px' }} />
            Settings
          </Button>
          <Menu
            {...bindMenu(popupState)}
            anchorOrigin={{
              vertical: 'top',   // Anchor to the top of the button
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom', // Menu expands upward
              horizontal: 'center',
            }}
            getContentAnchorEl={null} // Prevents default anchoring
          >
            {
                localStorage.getItem('fncacc') != 564 
                ? 
                ""
                :
                <MenuItem onClick={regPayment}>Register payment account</MenuItem>
            }
            <MenuItem onClick={signOut}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default SettingsMenuPopup;
