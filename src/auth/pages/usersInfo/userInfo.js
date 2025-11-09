
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthLandlord from "../../components/authLandlord/auth";
import "./userInfo.css"
import Logo  from "../../../artifacts/logo.svg"



const UserInformation = () => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState("")
  const userStatusCodes = ["OW1", "TE1"]


  useEffect(() => {
    if (!userStatusCodes.includes(localStorage.getItem('userStatus'))) {
      navigate("/")
    }
    else{
      setUserType(localStorage.getItem('userStatus'))
    }
  
  
  }, []);
  // document.querySelector('.form-bgs')?.classList.add('show-form');
  return (
    <div className="gcw stack">
      <div className="logo-wrapper">
        <img style={{width:'50px'}}className="logo" src={Logo} alt="logo"></img>
      </div>
    <div id="loginCard">
      <div id="formWrapper">
      <div className='form-bgs show-form'>
      <AuthLandlord />
      </div>
      </div>
    </div>
    {/* <p className="footer-txt">2025 © PeachStreet.io All rights reserved. </p> */}
    </div>

  )
}

export default UserInformation;