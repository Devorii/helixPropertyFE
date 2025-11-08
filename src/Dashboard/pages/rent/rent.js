import Sidebar from "../../components/sidebar/Sidebar";
import TopNav from "../../components/topNav/topNav";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import PayoutReportCard from "../Transactions/payouts/components/card";
import { ConnectPayments } from "@stripe/react-connect-js";
import { EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { useStripeContext } from "../../providers/stripeProvider";
import interact from "../../../artifacts/interac.png"
import masterCard from "../../../artifacts/mastercard.png"
import paymentIcon3d from '../../../artifacts/3dPayment.png'
import InteractCopyUserInfo from "../../components/etranser/interacCopy";
import BankGrid from "../../components/etranser/banks/banks";
import './rent.css'

const RentViewer = () => {
    const themeColor = process.env.REACT_APP_THEME_COLOR
    const token = localStorage.getItem('token')
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHED_KEY);
    const { getCheckoutSession, checkoutClientSecret, paymentEmail } = useStripeContext();
    const [clientSecret, setClientSecret] = useState(checkoutClientSecret);
    const [paymentView, setPaymentView] = useState(null)
    const property_id = localStorage.getItem('pid');


    const visaimageStyle = {
        width: '100px',
        height: 'auto'
    }
    const imageStyle = {
        marginBottom: '10px',
        width: '71px',
        height: 'auto'
    }

    const selectionContainer = {
        width: '200px',
        height: '200px',
        display: 'flex',
        backgroundColor: '#FAFAFA',
        borderRadius: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '15px',
        fontSize: 'small',
        flexDirection: 'column'
    }

    useEffect(() => {
        if (!clientSecret && property_id) {
            getCheckoutSession(property_id).then(setClientSecret);
        }
    }, [property_id, clientSecret, getCheckoutSession]);





    if (!clientSecret) return <p>Loading checkout...</p>;
    return (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
            <Sidebar />
            <TopNav />


            <div className="dash-viewer">

                <div className='align-content-w-img'>
                    <div className='review-container' >
                        <div style={{ color: themeColor }}>Transactions - Rental Payments</div>
                        <h1>Make a Payment</h1>

                        <div className="info-wrapper">
                            <div className='select-info-wrapper'>

                                <img className="threeD-element" src={paymentIcon3d} alt='3d payment icon' />
                                <div>
                                    <p  className='improvement-text'>
                                        PeachStreet.io is working on more payment strategies to elevate your experience.
                                    </p>
                                    <h4 className='payment-selection-text'>Select Payment Option</h4>
                                    <div className="rprt" style={{ width: "100%", marginBottom: '50px' }}>
                                        <div className='payment-methods-container'>
                                            <div className='selection-container' onClick={() => setPaymentView('visa')}>
                                                <img style={visaimageStyle} src={masterCard} alt='Master card icon' />
                                                Pay via Credit Card
                                            </div>

                                            <div className='selection-container' onClick={() => setPaymentView('interact')}>
                                                <img style={imageStyle} src={interact} alt='Interact icon' />
                                                Pay via E-Transfer
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className='payment-options-container'>
                                {
                                    paymentView == 'visa' &&
                                    <EmbeddedCheckout className="stripe-promise"/>
                                }
                                {
                                    paymentView == 'interact' &&
                                    <div className="align-interact-payments">
                                        {/* <p>Step 1. Copy renter's url below.</p> */}
                                        <div className='interac-dk-selection' >
                                            <InteractCopyUserInfo label="Email" value={paymentEmail} />
                                            <p>Then select your vendor below.</p>
                                            <BankGrid />
                                        </div>

                                    </div>

                                }
                                {
                                    paymentView == null &&
                                    <p>No payment option selected.</p>
                                }

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </EmbeddedCheckoutProvider>
    )
}

export default RentViewer;