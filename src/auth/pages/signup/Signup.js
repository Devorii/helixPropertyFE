import Button from '@mui/material/Button';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router';
import { useFormInformation } from '../../context/authContext';
import Logo from "../../../artifacts/logo.png"
import "./signup.css"


const SignUp = () => {
    const navigate = useNavigate()
    const { dispatch } = useFormInformation()

    const headerStyle = {
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    }

    const spaceFromHeader = {
        marginTop: "5rem",
        marginBottom: "2rem"
    }
    const iconSpacing = {
        marginRight: "0.6rem"
    }
    const btnWrapper = { 
        width: "65%", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-around",
        marginBottom: "8rem" 
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
                <p style={spaceFromHeader}>Welcome! Let's get you started.
                </p>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={btnWrapper}>
                        <Button    
                            className='signup-btn'                             
                            value='OW1'
                            color="primary"
                            size="large"
                            variant="filled"
                            onClick={landlordSelection}>
                            <MapsHomeWorkIcon style={iconSpacing} />
                            Landlord
                        </Button>
                        <Button
                            className='signup-btn'
                            value='TE1'
                            color="primary"
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