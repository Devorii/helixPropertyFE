import Button from '@mui/material/Button';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router';
import { useFormInformation } from '../../context/authContext';
import Logo from "../../../artifacts/logo.svg"
import "./signup.css"
import React from 'react';


const SignUp = () => {
    const navigate = useNavigate()
    const { dispatch } = useFormInformation()

    const spaceFromHeader = {
        marginTop: "1rem",
        marginBottom: "2rem",
        color: '#847171'
    }
    const iconSpacing = {
        marginRight: "0.6rem"
    }




    const landlordSelection = (e) => {
        dispatch({type:"Landlord"})
        localStorage.setItem("userStatus", e.target.value)
        navigate("/personal-information")
    }
    const tenantSelection = (e) => {
        dispatch({type:"Tenant"})
        localStorage.setItem("userStatus", e.target.value)
        navigate("/personal-information")
    }



    return (
        <div className='gcw'>
            <div id='info-container'>
                <div id='logo-wrapper'>
                <img className="logo" src={Logo} alt="logo"></img>    
                </div>
                <p style={spaceFromHeader}> Choose your account type.
                </p>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div className='accountType-arrange'>
                        <Button    
                            className='signup-btn'                             
                            value='OW1'
                            size="large"
                            variant="filled"
                            onClick={landlordSelection}>
                            <MapsHomeWorkIcon style={iconSpacing} />
                            Mgmt
                        </Button>
                        <div className='orDiv'>
                            <div className='vl'/>
                            <p className='or'>or</p>
                            <div className='vl'/>

                        </div>
                        <Button
                            className='signup-btn'
                            value='TE1'
                            size="large"
                            variant="filled"
                            onClick={tenantSelection}>
                            <PeopleAltIcon style={iconSpacing} />
                            Tenant
                        </Button>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default SignUp;