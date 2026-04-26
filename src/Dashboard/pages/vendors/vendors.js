
import Card from "../../components/card/card";
import StickyHeadTable from "../../components/issues/issues";
import Sidebar from "../../components/sidebar/Sidebar";
import TopNav from "../../components/topNav/topNav";
import mainfloor from '../../../artifacts/mainFloor.svg'
import { useIssueInformation } from "../../context/issueContext";
import { useReportInformation } from "../../context/reviewReportContext";
import ReviewReports from "../../components/reviewReports/reviewReports";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import "./vendors.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UnstyledSelectBasic from '../../../Dashboard/components/select/editSelectionElement';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import EmbeddedDashboard from "../../components/stripe/viewDash";
import VendorMap from "../../components/maps/vendorMaps";

const Vendors = () => {
    const themeColor = process.env.REACT_APP_THEME_COLOR
    const navigate = useNavigate()
    const [show, setShow] = useState(null)

    const change = (start, e) => {


        if (![null, 1].includes(start)) {
            const selectValue = e.target.innerHTML;
            const cellData = JSON.parse(localStorage.getItem('cellData'))
            // Need to set conditions for if values are missing
            // from the body.


            const createTicket = async () => {
                const body_info = {
                    title: cellData['issue'],
                    author: localStorage.getItem('fullname'),
                    ticket_num: cellData['id'],
                    property_id: localStorage.getItem('pid'),
                    status: selectValue
                }

                const token = localStorage.getItem('token')
                try {
                    const response = await fetch(`${process.env.REACT_APP_HELIX_API}/management/update-ticket`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-access-token': token,
                        },
                        body: JSON.stringify(body_info)
                    });

                    // Check if the response status is 200 OK
                    if (response.status === 200) {
                        setShow(true)

                        setTimeout(() => {
                            setShow(null)
                        }, 1500)

                    }
                    // Handle other non-200 responses (optional)
                    else {
                        console.error(`Unexpected status: ${response.status}`);
                    }
                } catch (error) {
                    console.error('Error during the request:', error.message);
                }
            };

            // Call the async function
            createTicket();


        }
    }

    const validateVendors = async (token) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HELIX_API}/admin/validate-Vendors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Response Data:", data);
            } else if (response.status === 403) {
                // Redirect if 403 Forbidden response
                navigate('/');
            } else {
                console.error(`Unexpected status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error during the request:', error.message);
        }
    };

    // useEffect(() => {
    //     // Getting the token from localStorage
    //     const token = localStorage.getItem('token');

    //     if (!token) {
    //         // If there's no token, navigate to the login page
    //         navigate('/');
    //     } else {
    //         // Validate the token with the backend
    //         validateVendors(token);
    //     }
    // }, [navigate]);


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
                    <div className="vendor-mobile-dv" style={{ color: themeColor }}>Vendors - Dashboard</div>

    
                    {/* This is used to hide the header information when the user is viewing a report. */}

                    {userStatus != 'TE1' ?
                        <>
                            <h1 className="vendor-mobile-dv text-[#2A493F]" style={{ marginBottom: '0px'}}>Vendors Portal</h1>
                            <VendorMap />
                       

                        </>
                        :
                        ""
                    }


                </div>

                {/* end of navigation bar */}
                
            </div>
        </div>
    )
}

export default Vendors;