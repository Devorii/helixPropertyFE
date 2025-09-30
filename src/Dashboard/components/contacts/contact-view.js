import React from 'react';
import './contact-view.css'



const ContractorView = () => { 
    return(
        <>
        <div className="contract-view-container">
        <div className='contact-header'>
            <div className='info-container'>
                <div id='contact-avatar'> XZ</div>
                <div>
                    <div className='header-info'><h3>The Home Depot</h3></div>
                    <div className='header-info gm'>General Manager</div>
                </div>
            </div>
        </div>
       

       <form className='Contact-input-form'>
        <div className='input-container'>

        <div className='input-wrapper'>
        <input className='input-bus' id='business-name' placeholder='Business name'></input>
        <input className='input-bus' id='business-hst' placeholder='Hst: R1709309'></input>
        </div>

        <div className='input-wrapper'>
        <input className='input-bus' id='poc' placeholder='Person of Contact'></input>
        <input className='input-bus' id='business-hst' placeholder='role'></input>
        </div>

        <div className='input-wrapper-long'>
        <label>Address</label>
        <input className='input-bus-long' id='address' placeholder='123 Street, province, zip code'></input>
        </div>

        <div className='input-wrapper'>

        <div className='adjust-column'>
        <label style={{marginTop: '0px'}}>Phone</label>
        <input className='input-stretch' id='phone' placeholder='647-000-0000'></input>
        </div>

        <div className='adjust-column'>
        <label style={{marginTop: '0px'}}>Email</label>
        <input className='input-stretch' id='business-hst' placeholder='example@email.com'></input>
        </div>

        </div>
        <div className='submit-contact-btn'>
        <button className='contact-btn'>Submit Contact</button>
        </div>

        </div>
       </form>




        </div>
  
        </>
    )
}

export default ContractorView;