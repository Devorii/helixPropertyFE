import Sidebar from "../../../components/sidebar/Sidebar";
import TopNav from "../../../components/topNav/topNav";
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import PayoutReportCard from "./components/card";
import PayoutReportCardMobile from "./components/mobile-card";
import './payout.css'
import { useState } from "react";
import {ConnectPayments} from "@stripe/react-connect-js";
// '/payout-view'
import { ConnectComponentsProvider } from '@stripe/react-connect-js';
import { useStripeContext } from "../../../providers/stripeProvider";

const PayoutViewer = () => {
    const themeColor = process.env.REACT_APP_THEME_COLOR
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
      const { getConnectInstance } = useStripeContext();
  const [instance, setInstance] = useState(null);

    const payoutHolder = { 
        width: '100%',
        display: 'flex'
    }

  useEffect(() => {
    getConnectInstance().then(setInstance);
  }, [getConnectInstance]);


    if (!instance) return <p>Loading Stripe...</p>;

    return (
         <ConnectComponentsProvider connectInstance={instance}>
            <Sidebar />
            <TopNav />


            <div className="dash-viewer">

                <div className='align-content-w-img'>
                    <div className='review-container' >
                        <div style={{ color: themeColor }}>Transactions - Payouts</div>
                        <h1>Payout Report</h1>
                        <div className="rprt balance-dsktop" style={{ width: "100%", marginBottom: '50px' }}>
                               <div style={payoutHolder}>

                                <PayoutReportCard title="Total Balance" amount={"0"} ml="0"/>
                                <PayoutReportCard title="Next Payout" amount={"0"} ml="20px"/>
                                <PayoutReportCard title="Pending" amount={"0"} ml="20px"/>

                               </div>
                        </div>
                        <div className="rprt balance-mobile" style={{ width: "100% !important" }}>
                            <div style={{width:'100%', textAlign:'left'}}>
                                <p style={{marginBottom:"0px"}}>Total Balance</p>
                                <h2 style={{marginTop:"3px", fontSize: "xxx-large", marginBottom:"13px"}}>$0</h2>

                                <div style={{
                                    width:'100%', 
                                    height:"auto", 
                                    backgroundColor:"rgb(239 239 239 / 32%)",
                                    borderRadius:"10px",
                                    border:'1px solid #e2dedeff',
                                    display:'flex'}}>

                                        <div style={{width:'50%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                            <p style={{
                                                marginBottom:"0px", 
                                                fontSize:'smaller',
                                                color: 'rgb(218, 132, 132)'
                                                
                                                }}>Next Payout</p>
                                            <h3 style={{marginTop:"3px"}}>$400,000</h3>
                                        </div>
                                        <div style={{width:'50%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                            <p style={{
                                                marginBottom:"0px", 
                                                fontSize:'smaller',
                                                color: 'rgb(218, 132, 132)'
                                                }}>Pending</p>
                                            <h3 style={{marginTop:"3px"}}>$400,000</h3>
                                        </div>

                                </div>

                                <hr style={{marginTop:'25px', marginBottom:'25px'}}/>

                            </div>
                                {/* <PayoutReportCardMobile title="Total Balance" amount={"0"} ml="0"/> */}
                        </div>
                        <ConnectPayments />
                    </div>
                </div>
            </div>
       </ConnectComponentsProvider>
    )
}

export default PayoutViewer;