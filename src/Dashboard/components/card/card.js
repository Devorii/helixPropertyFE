
import './card.css'
import { useIssueInformation } from '../../context/issueContext'



const Card = (props) =>{
const {dispatch} = useIssueInformation()
    const viewHandler = () =>{
        dispatch({type: `${props.name}`})
    }


    const style = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    return(
        <div id='selectionCards' style={style} onClick={viewHandler}>
        {props.name}
        </div>
    )
}

export default Card;