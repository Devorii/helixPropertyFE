import "./sidebar.css"
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import darklogo  from '../../../artifacts/dark-logo.png';
const Sidebar = () => {
  
  return (
    <div id="sidebar-container">
      <div id="sidebar-logo">
        <img src={darklogo} alt="sidebar-logo" id="sb-logo"></img>
      </div>

      <div className="navItems">
        <PendingActionsIcon />
        <a href="#">
        Report an Issue
        </a>
      </div>



      <div id="profile-container">

        <button id="logout-btn">
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;