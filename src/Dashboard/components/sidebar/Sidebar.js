import "./sidebar.css"

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
// import darklogo  from '../../../artifacts/dark-logo.png';
import darklogo from '../../../artifacts/logo-dark.svg';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import SignOutBtn from './../../../artifacts/Signout.svg'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Box from '@mui/material/Box';
import React from "react";
import SettingsMenuPopup from "./settings";
import Skeleton from '@mui/material/Skeleton';




const Sidebar = () => {
  const userStatus = localStorage.getItem('userStatus')
  const raw_pid = localStorage.getItem('raw_pid')
  const selected_pid = localStorage.getItem('pid')
  const nav = useNavigate()
  const token = localStorage.getItem('token')
  const [loading, setLoading] = useState(false)

  const logout = () => {
    localStorage.clear()
    nav('/')
  }

  const navigateToHome = () => {
    nav('/home')
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



  const cleanupOverlay = () => {
    const appContent = document.getElementById("sidebar-container");
    if (appContent) {
      appContent.style.filter = "";
      appContent.style.pointerEvents = "";
    }
    const overlay = document.getElementById("loading-overlay");
    if (overlay) overlay.remove();
  };

  useEffect(() => {
    if (localStorage.getItem('userStatus') != 'TE1'){
        const validateStripeAccount = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_HELIX_API}/stripe/validate-account`, {
              method: "POST",
              headers: { "x-access-token": token },
            });

            if (response.status === 200) {
              const data = await response.json();
              localStorage.setItem('fncacc', data.account_status)

            } else {
              console.error(`Unexpected status: ${response.status}`);
              cleanupOverlay();
            }
          } catch (error) {
            console.error("Error validating Stripe account:", error);
          }
        };

        validateStripeAccount();
    }

  }, []);


  return (
    <div id="sidebar-container">
      <div id="sidebar-logo">
        {loading && (
          <div className="skeleton-overlay"
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              background: "rgba(255, 255, 255, 0.95)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              pointerEvents: "all"

            }}
          >
            <Box sx={{ width: 600, padding: 2 }}>
              <p>Have your photo ID ready. We're soon there!</p>
              <Skeleton variant="rectangular" height={70} animation="wave" />
              <Skeleton variant="rectangular" height={70} animation="wave" />
              <Skeleton variant="rectangular" height={70} animation="wave" />
            </Box>
          </div>
        )}

        <img src={darklogo} alt="sidebar-logo" id="sb-logo"></img>
        {
          localStorage.getItem('userStatus') == "OW1" &&
          <p style={{ marginBottom: '0px' }}>Id: {localStorage.getItem('pid')}</p>
        }
      </div>

      <div className="navItems">

        <div className="issueReport">
          {/* <PendingActionsIcon className="navIcon" /> */}
          {
            userStatus == 'TE1' &&
            <div>


              <Box style={{marginTop:'20px'}}>
                <SimpleTreeView>
                  <TreeItem itemId="grid-Info1" label="Ticket Overview" onClick={navigateToHome} />
                  <TreeItem itemId="grid" label="Financials">
                    <TreeItem itemId="grid-Info" label="Rent Payment" onClick={navigateToRentPayment} />
                  </TreeItem>
                </SimpleTreeView>
              </Box>

            </div>


          }
          {/* {
            userStatus == 'OW1' &&
            <a href="#" id='menu-no-dd' onClick={navigateToHome} style={{ fontSize: '1rem', fontWeight: '400', color: '#575c72' }}>
              Reported Issues
            </a>
          } */}
        </div>

        <div className="inviteTenant">

          {
            userStatus == 'OW1' &&
            <>
              {/* <ForwardToInboxIcon className="navIcon" /> */}
              {/* <a href="#">
          Work Orders
          </a> */}
              <Box>
                <SimpleTreeView>
                  <TreeItem itemId="grid-Info1" label="Ticket Overview" onClick={navigateToHome} />
                  <TreeItem itemId="grid" label="Contacts">
                    <TreeItem itemId="grid-Info3" label="Tenants Info" onClick={navigateToContractors} />
                    {/* <TreeItem itemId="grid-contractors-info" label="Contractors Info"/> */}
                  </TreeItem>
                    <TreeItem itemId="grid5" label="Transactions">
                    <TreeItem itemId="grid-Info4" label="Expenses" onClick={navigateToExpenses} />
                    {
                      localStorage.getItem('fncacc') ?
                        ""
                        :
                        <TreeItem itemId="grid-Info2" label="Balance" onClick={navigateToPayouts} />
                    }

                  </TreeItem>
                </SimpleTreeView>

                {/* <SimpleTreeView>
                  <TreeItem itemId="grid" label="Transactions">
                    <TreeItem itemId="grid-Info" label="Expenses" onClick={navigateToExpenses} />
                    {
                      localStorage.getItem('fncacc') ?
                        ""
                        :
                        <TreeItem itemId="grid-Info2" label="Balance" onClick={navigateToPayouts} />
                    }

                  </TreeItem>
                </SimpleTreeView> */}

                {/* <SimpleTreeView>
                  <TreeItem itemId="grid" label="Billing">
                    <TreeItem itemId="grid-pro" label="Invoices" />
                  </TreeItem>
                </SimpleTreeView> */}
              </Box>
            </>

          }
        </div>


      </div>

      <div id="profile-container">
        {/* {
          localStorage.getItem('fncacc') !== '633'?
          <button class="img-btn signout-btn" onClick={makeStripeAccount}>Register to Collect Payments</button>
          :
          ''
        } */}



        <SettingsMenuPopup signOut={logout} regPayment={makeStripeAccount} />
        {/* 
              <button class="img-btn signout-btn" style={{backgroundColor:'rgb(231, 109, 91)'}} onClick={logout}>Sign Out</button> */}
        {/* <img onClick={logout} class="img-btn signout-btn" src={SignOutBtn} alt="SignOut Icon" /> */}
      </div>

    </div>
  );
}

export default Sidebar;