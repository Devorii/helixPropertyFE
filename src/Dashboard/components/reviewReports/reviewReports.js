import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { json } from "react-router-dom";
import './reviewReports.css'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import backSVG from './../../../artifacts/officialBackSVG.svg'
import reOpen from './../../../artifacts/officialReOpen.svg'


const ReviewReports = (props) => {
    const nav = useNavigate()
    const back = () => nav(0)
    const [cellData, setCellData] = useState(null)
    const [alertBanner, setAlertBanner] = useState(null);
    const accountType=localStorage.getItem('userStatus')

    useEffect(() => {
        if (alertBanner !== null) {
            // Optionally handle any side effects if needed when alertBanner changes
        }
    }, [alertBanner]);


    // const expectedCellData={
    //     id:'', title:'', date:'', category:'', status:'', 
    // }

    useEffect(() => {

        if (!localStorage.getItem('cellData')) {

        }
        else {
            setCellData(JSON.parse(localStorage.getItem('cellData')))
        }
    }, [])


    const closeTicket = () => {
        const close = async () => {
            // support/close-ticket
            const token = localStorage.getItem('token')
            const property_id = localStorage.getItem('pid')
            const title = cellData['issue']
            const author = cellData['created_by']
            const ticket_num = cellData['id']



            try {
                const response = await fetch(`${process.env.REACT_APP_HELIX_API}/support/close-ticket`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                    },
                    body: JSON.stringify({
                        "title": title,
                        "author": author,
                        "ticket_num": ticket_num,
                        "property_id": property_id
                    })
                });

                // Check if the response status is 200 OK
                if (response.status === 200) {
                    setAlertBanner(true)
                }
                // Handle other non-200 responses (optional)
                else {
                    console.error(`Unexpected status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error during the request:', error.message);
            }
        }
        close()
        setTimeout(() => {
            setAlertBanner(false)
            nav(0)
          }, 1500);
    }


    return (
        <>
        
            {
                cellData ?
                    <>
                        <div>
                        <p className="ntm1 labelname" style={{color:'#575c72'}}><strong className="labelname"></strong>{cellData.issue}</p>
                        </div>
                        {
                            alertBanner && // Only show the alert if alertBanner is true
                            <Stack style={{ 'marginTop': '15px' }} sx={{ width: '49%' }} spacing={9}>
                                <Alert
                                    iconMapping={{
                                        success: <CheckCircleOutlineIcon fontSize="inherit" />,
                                    }}
                                >
                                    Ticket has been closed.
                                </Alert>
                            </Stack>
                        }

                        <div id="meta-header-wrapper">
                            <div id="id-container">
                                <h4 className="labelname nmrgn">Ticket ID</h4>
                                <p className="mrgn7 meta-data">{cellData.id}</p>
                            </div>
                            <div id="title-container">
                                <h4 className="labelname nmrgn">Category</h4>
                                <p className="mrgn7 meta-data">{cellData.category}</p>
                            </div>

                        </div>
                        <h4 style={{ marginBottom: '10px', marginTop: '10px' }} className="labelname">Detail Complaint</h4>
                        <div id="reportContainer">
                           
                            {/* <p className="ntm">Issue: {cellData.issue}</p> */}
                            <p className="descriptionElement mrgn7">
                               {cellData.description}
                            </p>
                            {/* <hr style={{ marginTop: '50px' }} /> */}

                        </div>
                        <div id="timestampCategory"></div>
                        <p style={{ fontSize: '0.8rem', color: '#575c72' }}>Created on: {cellData.date}</p>

                        <div id="controls-wrapper">
          
                                <img onClick={back} class="img-btn back" src={backSVG} alt="Back Icon" />
                              
                            {
                                accountType !== "OW1" && props.status === "Closed" &&
                                ""
                            }
                            {
                                accountType === "OW1" && props.status === "Closed" &&
                                <img onClick={()=>""} class="img-btn" src={reOpen} alt="ReOpen Icon" />
                                // <button onClick={closeTicket} class="back-to-reports closeBtn" >Reopen Ticket</button>
                            }
                            {
                                accountType !== "OW1" && props.status !== "Closed" &&
                                <button onClick={closeTicket} class="back-to-reports closeBtn" >Close Ticket</button>
                            }
                                

                        </div>
                    </>

                    :
                    ''
            }
        </>
    )
}

export default ReviewReports;