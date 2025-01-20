import "./sidebar.css"
import { useNavigate } from "react-router-dom";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import darklogo  from '../../../artifacts/dark-logo.png';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

const Sidebar = () => {
  const userStatus=localStorage.getItem('userStatus')
  const nav=useNavigate()
  const logout = () =>{
    localStorage.clear()
    nav('/')

  }
  
  return (
    <div id="sidebar-container">
      <div id="sidebar-logo">
        <img src={darklogo} alt="sidebar-logo" id="sb-logo"></img>
      </div>

      <div className="navItems">
        
        <div className="issueReport">
        <PendingActionsIcon className="navIcon"/>
        {
          userStatus=='TE1' &&
          <a href="#">
          Report an Issue
          </a>
        }
        {
          userStatus=='OW1' &&
          <a href="#">
          Reported Issues
          </a>
        }
        </div>

        <div className="inviteTenant">

        {
          userStatus=='OW1' &&
          <>
          <ForwardToInboxIcon className="navIcon"/>
          <a href="#">
          Invite Tenant
          </a>
          </>

        }
        </div>


      </div>



      <div id="profile-container">

        <button id="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;