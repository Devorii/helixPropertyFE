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
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';



const TopNav = () => {
    const themeColor=process.env.REACT_APP_THEME_COLOR
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
    const homeNav = () => { 
        nav('/')
    }
  const navigateToContractors = () => {
    nav('/contractors-information')
  }
  const navigateToExpenses = () => {
    nav('/transaction-expenses')
  }

    return (
        <div className="mobile-nav">
            <Box sx={{ flexGrow: 1, width: "100%" }} className='mobile-box'>
                <AppBar position="static" style={{ backgroundColor: "black" }}>
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
                                    <MenuItem onClick={homeNav}>Home</MenuItem>
                                    <MenuItem onClick={logout}>Sign out</MenuItem>
                                                  <Box>
                                                    <SimpleTreeView>
                                                      <TreeItem itemId="grid" label="Contacts">
                                                        <TreeItem itemId="grid-Info" label="Tenants Info" onClick={navigateToContractors} />
                                                        {/* <TreeItem itemId="grid-contractors-info" label="Contractors Info"/> */}
                                                      </TreeItem>
                                                    </SimpleTreeView>
                                    
                                                    <SimpleTreeView>
                                                      <TreeItem itemId="grid" label="Transactions">
                                                        <TreeItem itemId="grid-Info" label="Expenses" onClick={navigateToExpenses} />
                                                      </TreeItem>
                                                    </SimpleTreeView>
                                    
                                                    {/* <SimpleTreeView>
                                                      <TreeItem itemId="grid" label="Billing">
                                                        <TreeItem itemId="grid-pro" label="Invoices" />
                                                      </TreeItem>
                                                    </SimpleTreeView> */}
                                                  </Box>
                                    <MenuItem>Property Id: {localStorage.getItem('pid')}</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>

            {/* Desktop below */}
            <div id="topNav">
                {/* More navigation can go here in the future */}
                <div id="initViewer" style={{ backgroundColor: themeColor }}>
                    {userInitials ? userInitials : "~"}
                </div>
            </div>
        </div>

    )
}

export default TopNav;