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
import Collapse from '@mui/material/Collapse';


const TopNav = () => {
    const themeColor = process.env.REACT_APP_THEME_COLOR
    const nav = useNavigate()
    const userInitials = localStorage.getItem('userInit')
    const pid = localStorage.getItem('pid')
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const permissions = localStorage.getItem('userStatus')
    const current_location = localStorage.getItem('c_loc') || "Select a Property"
    useEffect(() => {
    }, [userInitials, pid])

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
    const navigateToPayouts = () => {
        nav('/payout-view')
    }
    const navigateToRentPayment = () => {
        nav('/rent-view')
    }
    const changeLocation = (data, loc) => {
        localStorage.setItem('pid', data)
        localStorage.setItem('c_loc', loc)
        window.location.reload()
    }

    const property_options = JSON.parse(localStorage.getItem('a_loc')) || []


    return (
        <div className="mobile-nav">
            <Box sx={{ flexGrow: 1, width: "100%" }} className='mobile-box'>
                {/* <AppBar position="static" style={{ backgroundColor: "black" }}></AppBar> */}
                <AppBar position="static" style={{ backgroundColor: "#da8484" }}>
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
                                    <MenuItem>Property Id: {localStorage.getItem('pid')}</MenuItem>


                                    {
                                        permissions == 'OW1' ?
                                            <Box>
                                                <SimpleTreeView>
                                                    <TreeItem itemId="grid-Info72" label="Home" onClick={homeNav} />
                                                    <TreeItem itemId="grid1" label="Contacts">
                                                        <TreeItem itemId="grid-Info2" label="Tenants Info" onClick={navigateToContractors} />
                                                        {/* <TreeItem itemId="grid-contractors-info" label="Contractors Info"/> */}
                                                    </TreeItem>
                                                    <TreeItem itemId="grid" label="Transactions">
                                                        <TreeItem itemId="grid-Inf4o" label="Expenses" onClick={navigateToExpenses} />
                                                        <TreeItem itemId="grid-Info3" label="Balance" onClick={navigateToPayouts} />
                                                    </TreeItem>
                                                    <TreeItem itemId="grid3" label={current_location}>
                                                        {
                                                            property_options.map((loc, index) => (
                                                                loc[1] !== pid &&
                                                                <TreeItem
                                                                    key={index}
                                                                    value={loc[1]}
                                                                    label={loc[0]}
                                                                    onClick={() => { changeLocation(loc[1], loc[0]) }}
                                                                />
                                                            ))

                                                        }
                                                    </TreeItem>
                                                    <TreeItem itemId="grid-Info29" label="Sign out" onClick={logout} />
                                                </SimpleTreeView>


                                            </Box>
                                            :
                                            <Box style={{ marginTop: '20px' }}>
                                                <SimpleTreeView>
                                                    <TreeItem itemId="grid-Info72" label="Home" onClick={homeNav} />
                                                    <TreeItem itemId="grid" label="Financials">
                                                        <TreeItem itemId="grid-Info" label="Rent Payment" onClick={navigateToRentPayment} />
                                                    </TreeItem>
                                                           <TreeItem itemId="grid-Info29" label="Sign out" onClick={logout} />
                                                </SimpleTreeView>
                                            </Box>
                                    }



                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>

            {/* Desktop below */}
            <div id="topNav">
                {/* More navigation can go here in the future */}
                <Box
                    className='property-selector'
                    sx={{
                        "& .MuiCollapse-root": {
                            height: "0px !important",
                        }
                    }}
                >

                    {
                        permissions === 'OW1' &&
                        (
                            <SimpleTreeView>
                                <TreeItem itemId="grid" label={current_location}>
                                    {
                                        property_options.map((loc, index) => (
                                            loc[1] !== pid &&
                                            <TreeItem
                                                key={index}
                                                value={loc[1]}
                                                label={loc[0]}
                                                onClick={() => { changeLocation(loc[1], loc[0]) }}
                                            />
                                        ))
                                    }
                                </TreeItem>
                            </SimpleTreeView>
                        )
                    }

                </Box>
                <div id="initViewer" style={{ backgroundColor: themeColor }}>
                    {userInitials ? userInitials : "~"}
                </div>
            </div>
        </div>

    )
}

export default TopNav;