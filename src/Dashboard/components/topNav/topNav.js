import "./topNav.css"
import { useEffect } from "react"

// Mobile imports
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";


const TopNav = () => {
    const nav = useNavigate()
    const userInitials = localStorage.getItem('userInit')
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
    }, [userInitials])

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        localStorage.clear()
        nav('/')
    }


    return (
        <div className="mobile-nav">
            <Box sx={{ flexGrow: 1, width: "100%" }} className='mobile-box'>
                <AppBar position="static" style={{ backgroundColor: 'black' }}>
                    <Toolbar>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            color="inherit"
                        >
                            <div id="initViewer">
                                {userInitials ? userInitials : "~"}
                            </div>
                        </IconButton>



                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                        </Typography>


                        {auth && (
                            <div>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    aria-controls="menu-appbar"
                                    color="inherit"
                                    aria-label="menu"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    sx={{ mr: 2 }}

                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={logout}>Sign out</MenuItem>

                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>

            {/* Desktop below */}
            <div id="topNav">
                {/* More navigation can go here in the future */}
                <div id="initViewer">
                    {userInitials ? userInitials : "~"}
                </div>
            </div>
        </div>

    )
}

export default TopNav;