
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
import "./home.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UnstyledSelectBasic from '../../../Dashboard/components/select/editSelectionElement';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';

const Home = () => {
    const themeColor=process.env.REACT_APP_THEME_COLOR
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

    const validateHome = async (token) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HELIX_API}/admin/validate-home`, {
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

    useEffect(() => {
        // Getting the token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            // If there's no token, navigate to the login page
            navigate('/');
        } else {
            // Validate the token with the backend
            validateHome(token);
        }
    }, [navigate]);


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
                    <div style={{color: themeColor}}>Home - Dashboard</div>


                    {/* This is used to hide the header information when the user is viewing a report. */}

                    {userStatus != 'TE1' ?
                        <>
                            {isReport ?
                                ''
                                :
                                <>
                                    <h1 style={{ marginBottom: '0px', color: 'black' }}>Issues Reported</h1>

                                </>

                            }
                        </>
                        :

                        <>
                            {isReport ?
                                ''
                                :
                                <>


                                    <h1 style={{ marginBottom: '0px', color: 'black' }}>Issue Reports</h1>
                                    <p id="viewReports" style={{ color: 'rgb(0, 106, 255)' }}>Create a ticket by selecting a category below.</p>

                                    <div id="cardsHolder">
                                        <Card name='Main Unit' />
                                        <Card name='Outdoor' />
                                        <Card name='Basement' />
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
                                <p id="BacktoReports" onClick={viewReports}><KeyboardBackspaceIcon />Back to Reports</p>
                            </>
                            :
                            isReport ?
                                <>
                                    {
                                        reportStatus === 'Closed' &&
                                        <p id="reviewReports">Status</p>
                                    }
      
                                    <div className="changeStatus">
                                        {/* <ChangeCircleIcon/> */}
                                        {
                                            userStatus == 'OW1' && reportStatus != 'Closed' &&
                                            <div>
                                                <p style={{marginBottom: '4px'}}>Status</p>
                                                {
                                                    show &&
                                                    <Stack style={{ 'marginTop': '15px' }} sx={{ width: '236px', marginBottom: '10px' }} spacing={9}>
                                                        <Alert
                                                            iconMapping={{
                                                                success: <CheckCircleOutlineIcon fontSize="inherit" />,
                                                            }}
                                                        >
                                                            Status succefully updated.
                                                        </Alert>
                                                    </Stack>
                                                }
                                                <UnstyledSelectBasic default={reportStatus} updateSelect={(e) => change(2, e)} />
                                            </div>

                                        }
                                        {
                                            userStatus == 'OW1' && reportStatus === 'Closed' &&
                                            <p style={{ color: colorMap[reportStatus], margin: '0px'}}>{reportStatus}</p>
                                        }
                                        {
                                            userStatus == 'TE1' && reportStatus === 'Closed' &&
                                            <p style={{ color: colorMap[reportStatus], margin: '0px' }}>{reportStatus}</p>
                                        }
                                        {
                                            userStatus == 'TE1' && reportStatus !== 'Closed' &&
                                            <p style={{margin: '0px'}}>{reportStatus}</p>
                                        }

                                    </div>

                                    <ReviewReports status={reportStatus}/>
                                </>
                                :
                                // if it is not a form then we want to check if report instead else just return list of reports.
                                <>
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