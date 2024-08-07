import Card from "../../components/card/card";
import StickyHeadTable from "../../components/issues/issues";
import Sidebar from "../../components/sidebar/Sidebar";
import TopNav from "../../components/topNav/topNav";
import backyard from '../../../artifacts/backyard.jpg'
import basement from '../../../artifacts/basement.jpg'
import mainfloor from '../../../artifacts/mainFloor.svg'
import { useIssueInformation } from "../../context/issueContext";
import { useReportInformation } from "../../context/reviewReportContext";
import ReviewReports from "../../components/reviewReports/reviewReports";
import "./home.css"
import { useEffect, useState } from "react";


const Home = () => {
    const cellData = JSON.parse(localStorage.getItem('cellData'))
    const userStatus = localStorage.getItem('userStatus')

    const [color, setColor] = useState('black')
    const { test, isForm, formName, dispatch } = useIssueInformation()
    const { isReport } = useReportInformation()
    const reportStatus = cellData ? cellData.status : ''
    const colorMap = {
        'Pending...': 'blue',
        'Open': 'green',
        'Reviewing...': 'orange',
        'Closed': 'red'
    }



    const viewReports = () => {
        dispatch({ type: 'viewReports' })
        window.location.reload()
    }



    return (
        <div id="dashboard-container">
            {/* Need to make the sidebar dynamic for landlord or tenant as well. */}
            <Sidebar />
            <div id="content-wrapper">
                {/* Navigation bar can go here */}
                <TopNav />
                <div id="dash-viewer">
                    Home - Dashboard

                    {/* 
                    We need a way to identify if the user is lanlord or tenant.
                    So that we can change the Application's behaviour to suite.
                    For now getting it from local storage should be fine.
                    
                    */}




                    {/* This is used to hide the header information when the user is viewing a report. */}

                    {userStatus != 'TE1' ?
                        <>
                            {isReport ?
                                ''
                                :
                                <>


                                    <h1 style={{ marginBottom: '0px' }}>Issues Reported</h1>
                                    {/* <p id="viewReports" style={{ color: 'rgb(0 113 183)' }}></p> */}

                                    {/* <div id="cardsHolder">
                                        <Card name='Main Unit' bg={mainfloor} />
                                        <Card name='Outdoor' bg={backyard} />
                                        <Card name='Basement' bg={basement} />
                                        
                                    </div> */}
                                </>

                            }
                        </>
                        :

                        <>
                            {isReport ?
                                ''
                                :
                                <>


                                    <h1 style={{ marginBottom: '0px' }}>Issue Reports</h1>
                                    <p id="viewReports" style={{ color: 'rgb(0 113 183)' }}>Create a ticket by selecting a category below.</p>

                                    <div id="cardsHolder">
                                        <Card name='Main Unit' bg={mainfloor} />
                                        <Card name='Outdoor' bg={backyard} />
                                        <Card name='Basement' bg={basement} />
                                        {/* <Card name='Bathroom'/> */}
                                    </div>
                                </>

                            }
                        </>


                    }








                    {
                        isForm
                            ?
                            <>
                                <p id="formTitle">{`Report a ${formName} Issue`}</p>
                                {test}
                                <p id="BacktoReports" onClick={viewReports}>Back to Reports</p>
                            </>
                            :
                            isReport ?
                                <>
                                    <p id="reviewReports">Status report</p>
                                    <p style={{ color: colorMap[reportStatus] }}>{reportStatus}</p>
                                    <ReviewReports />
                                </>
                                :
                                // if it is not a form then we want to check if report instead else just return list of reports.
                                <>
                                    <p id="viewReports">Active Tickets</p>
                                    <StickyHeadTable />
                                </>


                    }




                </div>

                {/* end of navigation bar */}
            </div>
        </div>
    )
}

export default Home;