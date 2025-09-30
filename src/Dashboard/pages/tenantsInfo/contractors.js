import './contractors.css'
import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import TopNav from "../../components/topNav/topNav";
import ContractorView from '../../components/contacts/contact-view';
import ListViewEdit from '../../components/contacts/contact';


const ContractorsInformation = () => {
    const themeColor=process.env.REACT_APP_THEME_COLOR
    return (
        <>
            <Sidebar />
            <TopNav />

            <div className="dash-viewer">

                <div className='align-content-w-img'>
                <div className='review-container' >
                <div style={{ color: themeColor }}>Contacts - Residents</div>
                <h1>Residents Info</h1>
                    <ListViewEdit/>
                </div>
                {/* <div className='review-container-2'>
                    <ContractorView />
                </div> */}
                </div>

            </div>
        </>
    )
}

export default ContractorsInformation;