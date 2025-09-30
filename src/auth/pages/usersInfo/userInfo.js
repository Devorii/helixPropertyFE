
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthLandlord from "../../components/authLandlord/auth";
import "./userInfo.css"
import Logo  from "../../../artifacts/logo-light.svg"



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
        <img className="logo" src={Logo} alt="logo"></img>
      </div>
    <div id="loginCard">
      <div id="formWrapper">
      <div className='form-bgs show-form'>
      <AuthLandlord />
      </div>
      </div>
    </div>
    <p className="footer-txt">2024 © Helix Property Management. All rights reserved. </p>
    </div>

  )
}

export default UserInformation;