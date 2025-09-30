
import './card.css'

import { useIssueInformation } from '../../context/issueContext'
import React, { useState } from 'react'



const Card = (props) =>{
let name=props.name.toString()
const [activeEl, setActiveEl] = useState('selectionCards')
const {dispatch} = useIssueInformation()
    const viewHandler = () =>{
        setActiveEl('selectionCards active')
        dispatch({type: `${name}`})
    }


    const style = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    return(
        <div className={`${activeEl}`} style={style} onClick={viewHandler}>
        {name}
        </div>
    )
}

export default Card;