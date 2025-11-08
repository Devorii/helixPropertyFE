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
import SettingsMenuPopup from "./../sidebar/settings"

const TopNav = () => {
    const themeColor = process.env.REACT_APP_THEME_COLOR
    const nav = useNavigate()
    const token = localStorage.getItem('token')
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

    const cleanupOverlay = () => {
        const appContent = document.getElementById("sidebar-container");
        if (appContent) {
            appContent.style.filter = "";
            appContent.style.pointerEvents = "";
        }
        const overlay = document.getElementById("loading-overlay");
        if (overlay) overlay.remove();
    };
    const makeStripeAccount = () => {
        const createAccount = async () => {
            // 1️⃣ Add a wrapper to blur everything behind the overlay
            const appContent = document.getElementById("sidebar-container"); // your main app container
            if (appContent) {
                appContent.style.filter = "blur(3px) brightness(0.8)";
                appContent.style.pointerEvents = "none"; // block interactions
            }

            // 2️⃣ Add overlay
            const overlay = document.createElement("div");
            overlay.id = "loading-overlay";
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100vw";
            overlay.style.height = "100vh";
            overlay.style.background = "rgba(255, 255, 255, 0.95)";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.zIndex = "9999";
            overlay.style.flexDirection = "column";
            overlay.style.textAlign = "center";
            overlay.style.fontSize = "1.2rem";
            overlay.innerHTML = `
      <p>Have your photo ID ready. We're almost there!</p>
      <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px;">
        <div style="height: 60px; width: 300px; background: #eee; animation: pulse 1.5s infinite;"></div>
        <div style="height: 60px; width: 300px; background: #eee; animation: pulse 1.5s infinite;"></div>
        <div style="height: 60px; width: 300px; background: #eee; animation: pulse 1.5s infinite;"></div>
      </div>
    `;
            document.body.appendChild(overlay);

            // 3️⃣ Keyframes for pulse
            const styleTag = document.createElement("style");
            styleTag.innerHTML = `
      @keyframes pulse {
        0% { background-color: #eee; }
        50% { background-color: #ddd; }
        100% { background-color: #eee; }
      }
    `;
            document.head.appendChild(styleTag);

            try {
                const response = await fetch(`${process.env.REACT_APP_HELIX_API}/stripe/create-account`, {
                    method: "POST",
                    headers: { "x-access-token": token },
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setTimeout(() => { window.location.href = data.onboarding_url; }, 15);
                } else {
                    console.error(`Unexpected status: ${response.status}`);
                    cleanupOverlay();
                }
            } catch (error) {
                console.error(error);
                cleanupOverlay();
            }
        };

        createAccount();
    };
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
                                                        {
                                                            localStorage.getItem('fncacc') ?
                                                                ""
                                                                :
                                                                <TreeItem itemId="grid-Info321" label="Balance" onClick={navigateToPayouts} />
                                                        }
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
                                                    {/* <TreeItem itemId="grid-Info29" label="Sign out" onClick={logout} /> */}
                                                    <SettingsMenuPopup signOut={logout} regPayment={makeStripeAccount} />
                                                </SimpleTreeView>


                                            </Box>
                                            :
                                            <Box style={{ marginTop: '20px' }}>
                                                <SimpleTreeView>
                                                    <TreeItem itemId="grid-Info72" label="Home" onClick={homeNav} />
                                                    <TreeItem itemId="grid" label="Financials">
                                                        <TreeItem itemId="grid-Info" label="Rent Payment" onClick={navigateToRentPayment} />
                                                    </TreeItem>
                                                    {/* <TreeItem itemId="grid-Info29" label="Sign out" onClick={logout} /> */}
                                                    <SettingsMenuPopup signOut={logout} regPayment={makeStripeAccount} />
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