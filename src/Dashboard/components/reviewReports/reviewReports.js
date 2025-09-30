import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './reviewReports.css'
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import backSVG from './../../../artifacts/officialBackSVG.svg'
import reOpen from './../../../artifacts/officialReOpen.svg'
import closeTicketSVG from './../../../artifacts/closed.svg'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import defaultImg from './../../../artifacts/default-img.jpg'
import AlignItemsList from '../comments/comments_list'
import SwipersComp from '../swiper/swiper'
import SwipeVerticalIcon from '@mui/icons-material/SwipeVertical';


const ReviewReports = (props) => {
    const secondaryThemeColor=process.env.REACT_APP_SECONDARY_THEME_COLOR
    const dateObj=new Date()
    const currentDate=`${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}`
    const nav = useNavigate()
    const back = () => nav(0)
    const [cellData, setCellData] = useState(null)
    const [alertBanner, setAlertBanner] = useState(null);
    const [ticketMsg, setTicketMsg] = useState('')
    const [viewImg, setViewImg] = useState([defaultImg])
    const [comments, setComments] = useState([{
        initials: 'NC',
        fullname: 'No Comment',
        role: 'Admin',
        note: 'No comment was created. Be the first to comment on this ticket.',
        date: currentDate

    }])
    const [textareaComment, settextareaComment] = useState("");
    const username = localStorage.getItem('fullname')
    const accountType = localStorage.getItem('userStatus')
    const token = localStorage.getItem('token')
    const property_id = localStorage.getItem('pid')

    const commentsMetaData = {
        fullname: '',
        initials: '',
        property_id: '',
        ticket_id: '',
        created_date: currentDate,
        role: '',
        notes: ''
    }

    const validateCommentArea = () => {
        if (comments.length === 1 && comments[0].fullname === 'No Comment') {
            return true
        }
        else {
            return false
        }
    }


    const submitComment = (e) => {
        e.preventDefault()
        const ticketData = JSON.parse(localStorage.getItem('cellData'))
        const date = new Date()
        const rawRole = localStorage.getItem('userStatus')
        const fullName = localStorage.getItem('fullname')
        const usrInitials = localStorage.getItem('userInit')
        const propertyID = localStorage.getItem('pid')
        const role = rawRole !== 'OW1' ? 'Tenant' : 'Admin'
        const usrComment = e.target.userInput.value

        commentsMetaData.fullname = fullName
        commentsMetaData.initials = usrInitials
        commentsMetaData.property_id = propertyID
        commentsMetaData.ticket_id = ticketData['id']
        commentsMetaData.created_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        commentsMetaData.role = role
        commentsMetaData.notes = usrComment

        const commentListing = {
            initials: usrInitials,
            fullname: fullName,
            role: role,
            note: usrComment,
            date: currentDate
        }



        if (validateCommentArea() !== true) {
            setComments([...comments, commentListing])
        }
        else {
            setComments([commentListing])
        }

        const create_comment = async()=>{
            try {
                const response = await fetch(`${process.env.REACT_APP_HELIX_API}/comment/create-comment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                    },
                    body: JSON.stringify(commentsMetaData)
                });

                // Check if the response status is 200 OK
                if (response.status === 200) {
                    console.log(response)
                }
                // Handle other non-200 responses (optional)
                else {
                    console.error(`Unexpected status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error during the request:', error.message);
            }
        }
        create_comment()

        settextareaComment("")
        // console.log(commentsMetaData)
    }



    useEffect(() => {
        if (alertBanner !== null) {
        }
        const ticket_id_raw=JSON.parse(localStorage.getItem('cellData'))

        const get_comments = async() => {
            try {
                const response = await fetch(`${process.env.REACT_APP_HELIX_API}/comment/retrieve-comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                    },
                    body: JSON.stringify({
                        property_id: localStorage.getItem('pid'),
                        ticket_id: ticket_id_raw['id']
                    })
                });

                // Check if the response status is 200 OK
                if (response.status === 200) {
                    const data = await response.json();
                    if(data.length > 0){
                        setComments(data)
                    }
                    
                }
                // Handle other non-200 responses (optional)
                else {
                    console.error(`Unexpected status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error during the request:', error.message);
            }
        }
        get_comments()
    }, [alertBanner]);


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
                        "author": username,
                        "ticket_num": ticket_num,
                        "property_id": property_id
                    })
                });

                // Check if the response status is 200 OK
                if (response.status === 200) {
                    setTicketMsg('Ticket has been closed.')
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
            setTicketMsg('')
            setAlertBanner(false)
            nav(0)
        }, 1500);
    }


    const reopenTicket = () => {
        const reopen = async () => {
            const title = cellData['issue']
            const author = cellData['created_by']
            const ticket_num = cellData['id']

            try {
                const response = await fetch(`${process.env.REACT_APP_HELIX_API}/closed_ticket/re-open-ticket`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                    },
                    body: JSON.stringify({
                        "title": title,
                        "author": username,
                        "ticket_num": ticket_num,
                        "property_id": property_id
                    })
                });

                // Check if the response status is 200 OK
                if (response.status === 200) {
                    setTicketMsg('Ticket was re-opened.')
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
        reopen()
    }





    return (
        <>

            {
                cellData ?
                    <>
                        <div>
                            <p className="ntm1 labelname mobile-ntm1" style={{ color: '#575c72' }}><strong className="labelname"></strong>{cellData.issue}</p>
                            <SwipersComp images={cellData['images']} />
                        </div>
                        <div className="align-content-w-img">
                            <div className="review-container-1">
                                <div>
                                    <p className="ntm1 labelname ntm1-desktop" style={{ color: '#575c72', width: '80%' }}><strong className="labelname"></strong>{cellData.issue}</p>
                                </div>
                                {
                                    alertBanner && // Only show the alert if alertBanner is true
                                    <Stack style={{ 'marginTop': '15px' }} sx={{ width: '49%' }} spacing={9}>
                                        <Alert
                                            iconMapping={{
                                                success: <CheckCircleOutlineIcon fontSize="inherit" />,
                                            }}
                                        >
                                            {ticketMsg}
                                        </Alert>
                                    </Stack>
                                }
                                {/* {
                                    cellData['images'].length > 0 &&
                                    <div>
                                        <ImageList sx={{ width: 500, height: 170 }} cols={3} rowHeight={164}>
                                            {cellData['images'].map((item) => (
                                                <ImageListItem key={item}>
                                                    ``          <img
                                                        className="report-img"
                                                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                                        alt={'test images'}
                                                        onClick={() => setViewImg(item)}
                                                        loading="lazy"
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                    </div>
                                } */}

                                <div id="meta-header-wrapper">
                                    <div id="id-container">
                                        <h4 className="labelname nmrgn">Ticket ID</h4>
                                        <p style={{backgroundColor: secondaryThemeColor}} className="mrgn7 meta-data">{cellData.id}</p>
                                    </div>
                                    <div id="title-container">
                                        <h4 className="labelname nmrgn">Category</h4>
                                        <p style={{backgroundColor: secondaryThemeColor}} className="mrgn7 meta-data category">{cellData.category}</p>
                                    </div>

                                </div>
                                <h4 style={{ marginBottom: '10px', marginTop: '10px' }} className="labelname mt-ra">Detail Complaint</h4>
                                <div id="reportContainer" style={{backgroundColor: secondaryThemeColor}}>
                                    <p className="descriptionElement mrgn7">
                                        {cellData.description}
                                    </p>
                                </div>
                                <div id="timestampCategory"></div>
                                <p style={{ fontSize: '0.8rem', color: '#575c72' }}>Created on: {cellData.date}</p>
                            </div>

                            {
                                cellData['images'].length > 0 &&
                                <div className="review-container-2">
                                    <img className='review-img' src={viewImg} alt="img-view" />


                                    <div>
                                        {
                                            cellData['images'].length > 0 &&
                                            <div>
                                                <ImageList sx={{ width: 300, height: 70 }} cols={4} rowHeight={60}>
                                                    {cellData['images'].map((item) => (
                                                        <ImageListItem key={item}>
                                                            ``          <img
                                                                className="report-img"
                                                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                                                alt={'test images'}
                                                                onClick={() => setViewImg(item)}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList>
                                            </div>
                                        }
                                    </div>
                                </div>

                            }
                        </div>

                        {/* Add comments section */}

                        <hr />
                        <p style={{color:'black'}}>Review notes</p>

                        <div className="notes-section">

                            <div className="comments-holder">
                                {
                                    comments.length > 2 &&
                                    <SwipeVerticalIcon className='swipeVerticleIcon' />
                                }
                                <AlignItemsList comments={comments} />
                            </div>



                            <form className='notes-form' onSubmit={(e) => submitComment(e)} method="POST">
                                <label for="userInput">Leave a comment</label>
                                <textarea 
                                id="userInput" 
                                name="userInput" 
                                rows="4" 
                                value={textareaComment} 
                                onChange={(e) => settextareaComment(e.target.value)}
                                cols="50">
                                </textarea>

                                <br />
                                <button className='comment-btn' type="submit">Submit Comment</button>
                            </form>


                        </div>

                        <div id="controls-wrapper">
                            <img onClick={back} class="img-btn back" src={backSVG} alt="Back Icon" />

                            {
                                accountType !== "OW1" && props.status === "Closed" &&
                                ""
                            }
                            {
                                accountType === "OW1" && props.status === "Closed" &&
                                <img onClick={reopenTicket} class="img-btn" src={reOpen} alt="ReOpen Icon" />
                                // <button onClick={closeTicket} class="back-to-reports closeBtn" >Reopen Ticket</button>
                            }
                            {
                                accountType !== "OW1" && props.status !== "Closed" &&
                                <img onClick={closeTicket} class="img-btn" src={closeTicketSVG} alt="Close Icon" />
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