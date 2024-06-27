import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { json } from "react-router-dom";
import './reviewReports.css'


const ReviewReports = () => {
    const nav = useNavigate()
    const [cellData, setCellData] = useState(null)
    const back = () => nav(0)


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

    return (
        <>
            {
                cellData ?
                    <>
                        <div id="meta-header-wrapper">
                            <div id="id-container">
                                <h4>Id</h4>
                                <p className="ntm">{cellData.id}</p>
                            </div>
                            <div id="title-container">
                                <h4>Category</h4>
                                <p className="ntm">{cellData.category}</p>
                            </div>

                        </div>
                        <div id="reportContainer">
                            <h4 style={{marginBottom: '0px'}}>Desciption</h4>
                            <p className="ntm">Issue: {cellData.issue}</p>
                            <p>
                            We're having ussies with the wall. It's seems like the bathroom
                            upstairs is leaking water down the columns causing our roof and 
                            wall to crack.
                            </p>
                        <hr style={{marginTop: '50px'}} />

                        </div>
                        <div id="timestampCategory"></div>
                        <p style={{fontSize:'0.8rem'}}>Created on: {cellData.date}</p>
      
                        <div id="controls-wrapper">
                            <button onClick={back} class="back-to-reports" >Back</button>
                            <button onClick={back} class="back-to-reports closeBtn" >Close Ticket</button>
                        </div>
                    </>

                    :
                    ''
            }
        </>
    )
}

export default ReviewReports;