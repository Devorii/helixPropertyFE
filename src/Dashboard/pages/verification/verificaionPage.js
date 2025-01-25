import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import nutmeg from './../../../artifacts/nutmeg.gif'
import './verification.css'

const Verification = () => {
    // Calling useParams() correctly with parentheses
    const navigate = useNavigate()
    const { code, account, token } = useParams();
    const [verificationMessage, setVerificationMessage] = useState("Congratulaions, Your accoun has been verified")
    const [isTrue, setIsTrue] = useState(false)

    const verify_account = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HELIX_API}/verify-account/${code}/${account}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setTimeout(() => {
                    setVerificationMessage('Congratulaions, Your accoun has been verified')
                }, 3000)
                setVerificationMessage(null)
                navigate('/')


            } else if (response.status === 403) {
                // Redirect if 403 Forbidden response
                setVerificationMessage('Account not verify. Please contact Helix Property Management')
                setTimeout(() => {
                    navigate('/')
                }, 3000)

            } else {
                setVerificationMessage('Account not verify. Please contact Helix Property Management')
                setTimeout(() => {
                    navigate('/')
                }, 3000)

            }
        } catch (error) {
            setVerificationMessage('Account not verify. Please contact Helix Property Management')
            setTimeout(() => {
                navigate('/')
            }, 3000)

        }
    }

    useEffect(() => {
        verify_account();
    }, [code, account, token]);

    return (
        <div className="account-verification">
            {
                !isTrue &&
                <p className="va">Verifying account...</p>

            }
            {
                isTrue &&
                <div className="v-alignItems">
                    <p>{verificationMessage}</p>
                    <img className='verImg' src={nutmeg} alt="verificaion-logo"></img>
                </div>
            }

            {/* Displaying the captured URL params */}
        </div>
    );
};

export default Verification;