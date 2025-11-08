import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MailIcon from '@mui/icons-material/Mail';
import BusinessIcon from '@mui/icons-material/Business';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import PaidIcon from '@mui/icons-material/Paid';
import './resident.css'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const deleteTenantsInfo = async (token, uid) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HELIX_API}/tenant/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                uid: uid
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Response Data:", data);
        } else if (response.status === 403) {
            // Redirect if 403 Forbidden response

        } else {
            console.error(`Unexpected status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error during the request:', error.message);
    }
};

function ChildModal({ uid, name, childModal, setChildModal }) {

    const deleteHandler = () => {
        // Convert the id to base64
        const uid_convert = btoa(uid.toString())
        const token = localStorage.getItem('token')
        deleteTenantsInfo(token, uid_convert)
        setChildModal(false);
        window.location.reload()
    };

    const cancelClose = () => {
        setChildModal(false)
    }

    return (
        <React.Fragment>

            <Modal
                open={childModal}
                onClose={cancelClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h4 id="child-modal-title" style={{ color: 'red' }}>Want to delete {name}?</h4>
                    <p id="child-modal-description">
                        Deleting your contact is a perminant action.
                    </p>
                    <Button className='delete-confirmation-btn' onClick={deleteHandler}>Delete Contact</Button>
                    <Button onClick={cancelClose}>Cancel</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function NestedModal({ open, setOpen, data }) {
    const themeColor = process.env.REACT_APP_THEME_COLOR
    const [childModal, setChildModal] = React.useState(false)
    const [rent, setRent] = useState(null)
    const [updateRentView, setUpdateRentView] = useState(false)
    const tenant_uid = data.uid
    const propID = localStorage.getItem('pid')
    const token = localStorage.getItem('token')
    const time = new Date().toISOString();

    const handleClose = () => {
        setOpen(false);
    };

    const saveRentInfo = () => {
        const payload = {
            'prop_id': propID,
            'tenant_id': tenant_uid,
            'amount': rent,
            'created_on': time
        }


        if (rent == 0 || rent == null) {
            setUpdateRentView(!updateRentView)
        }
        else {
            const updateRentInfo = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_HELIX_API}/rent/update`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-access-token': token,
                        },
                        body: JSON.stringify(payload)
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUpdateRentView(!updateRentView)
                        console.log("Response Data:", data.message);
                    }
                    else {
                        console.error(`Unexpected status: ${response.status}`);
                    }
                } catch (error) {
                    console.error('Error during the request:', error.message);
                }
            };
            updateRentInfo()
        }
    }

    const selectUpdateRent = () => {
        setUpdateRentView(!updateRentView)
    }

    const updateRent = (e) => {
        e.preventDefault()
        setRent(e.target.value)
    }


    return (
        <div id='modal-wrapper'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                id="contact-card"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <div className='header-container hdr-con'>
                        <div className='name-container pairIconInfo'>
                            <div id='name-icon'>
                                <h3>{data.initials}</h3>
                            </div>
                            <div>
                                <h3 style={{ marginBottom: '0px' }} id="parent-modal-title">{data.name}</h3>
                                <p id='header-occupation' style={{ marginTop: '0px' }}>{data.occupation ? data.occupation : ""}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='pairIconInfo'>
                            <PaidIcon style={{ color: themeColor }} className='icon-size' />
                            {
                                updateRentView &&
                                <p
                                    style={{ color: themeColor, marginRight: '20px' }}
                                    onClick={saveRentInfo}
                                    className='icon-title delete'>Save Rent</p>

                            }
                            {
                                !updateRentView &&
                                <p
                                    style={{ color: themeColor, marginRight: '20px' }}
                                    onClick={selectUpdateRent}
                                    className='icon-title delete'>Update Rent</p>
                            }

                            <span className='pairIconInfo' onClick={() => setChildModal(true)}>
                                <DeleteIcon style={{ color: themeColor }} className='icon-size delete-icon' />
                                <p style={{ color: themeColor }} className='icon-title delete'>Remove Tenant</p>
                            </span>

                        </div>


                    </div>


                    {/* <hr /> */}

                    <div className='contact-body-container'>
                        <div className='pairIconInfo'>
                            <div className='pairIconInfo title-container'>
                                <ContactPhoneIcon style={{ color: themeColor }} className='icon-size' />
                                <p className='icon-title'>Due Rent:</p>
                            </div>
                            <div className='item-value-container'>
                                {
                                    updateRentView &&
                                    <input style={{ width: '138px' }} type='number' onChange={(e) => updateRent(e)} />
                                }
                                {
                                    !updateRentView &&
                                    <p className='item-value parent-modal-description'>
                                        ${rent || Number(data.rental_price).toLocaleString()}
                                    </p>
                                }


                            </div>
                        </div>

                        <div className='pairIconInfo'>
                            <div className='pairIconInfo title-container'>
                                <ContactPhoneIcon style={{ color: themeColor }} className='icon-size' />
                                <p className='icon-title'>Phone:</p>
                            </div>
                            <div className='item-value-container'>
                                <p className='item-value parent-modal-description'>
                                    {data.contact}
                                </p>
                            </div>
                        </div>


                        <div className='pairIconInfo'>
                            <div className='pairIconInfo title-container'>
                                <MailIcon style={{ color: themeColor }} className='icon-size' />
                                <p className='icon-title'>Email:</p>
                            </div>
                            <div className='item-value-container'>
                                <p className='item-value parent-modal-description'>
                                    {data.email}
                                </p>
                            </div>
                        </div>


                        <div className='pairIconInfo'>
                            <div className='pairIconInfo title-container'>
                                <DateRangeIcon style={{ color: themeColor }} className='icon-size' />
                                <p className='icon-title'>D.O.B:</p>
                            </div>
                            <div className='item-value-container'>
                                <p className='item-value parent-modal-description'>
                                    {data.dob ? `${data.dob} (${data.age}yrs Old)` : "1990-11-29 (29yrs old)"}
                                </p>
                            </div>
                        </div>

                    </div>



                    <div className='contact-body-container'>
                        <div className='pairIconInfo'>
                            <div className='pairIconInfo title-container'>
                                <WorkOutlineIcon style={{ color: themeColor }} className='icon-size' />
                                <p className='icon-title'>Occupation:</p>
                            </div>
                            <div className='item-value-container'>
                                <p className='item-value parent-modal-description'>
                                    {data.occupation ? data.occupation : ""}
                                </p>
                            </div>
                        </div>

                        <div className='pairIconInfo'>
                            <div className='pairIconInfo title-container'>
                                <BusinessIcon style={{ color: themeColor }} className='icon-size' />
                                <p className='icon-title'>Company:</p>
                            </div>
                            <div className='item-value-container'>
                                <p className='item-value parent-modal-description'>
                                    {data.company ? data.company : ""}
                                </p>
                            </div>
                        </div>

                    </div>


                    <ChildModal uid={data.uid} name={data.name} childModal={childModal} setChildModal={setChildModal} />
                </Box>
            </Modal>
        </div>
    );
}
