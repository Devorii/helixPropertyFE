import "./sidebar.css"

import { useNavigate } from "react-router-dom";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
// import darklogo  from '../../../artifacts/dark-logo.png';
import darklogo from '../../../artifacts/logo-dark.svg';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import SignOutBtn from './../../../artifacts/Signout.svg'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Box from '@mui/material/Box';
import React from "react";


const Sidebar = () => {
  const userStatus = localStorage.getItem('userStatus')
  const nav = useNavigate()
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

  return (
    <div id="sidebar-container">
      <div id="sidebar-logo">
        <img src={darklogo} alt="sidebar-logo" id="sb-logo"></img>
        {
          localStorage.getItem('userStatus') == "OW1" &&
          <p>{`ID: ${localStorage.getItem('pid')}`}</p>
        }

      </div>

      <div className="navItems">

        <div className="issueReport">
          {/* <PendingActionsIcon className="navIcon" /> */}
          {
            userStatus == 'TE1' &&
            <a href="#" onClick={navigateToHome}>
              Report an Issue
            </a>
          }
          {
            userStatus == 'OW1' &&
            <a href="#" id='menu-no-dd' onClick={navigateToHome} style={{ fontSize: '1rem', fontWeight: '400', color: '#575c72' }}>
              Reported Issues
            </a>
          }
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
            </>

          }
        </div>


      </div>

      <div id="profile-container">
        <img onClick={logout} class="img-btn signout-btn" src={SignOutBtn} alt="SignOut Icon" />
      </div>

    </div>
  );
}

export default Sidebar;