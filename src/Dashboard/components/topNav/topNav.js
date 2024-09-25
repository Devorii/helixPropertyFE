import "./topNav.css"
import {useEffect} from "react"



const TopNav = () =>{
    const userInitials = localStorage.getItem('userInit')
    useEffect(()=>{
    },[userInitials])
    
    return(
        <div id="topNav">
            {/* More navigation can go here in the future */}
        <div id="initViewer">
          {userInitials?userInitials:"~"}
        </div>
        </div>
    )
}

export default TopNav;