import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import ChatCard from '../card/chat_card/chat';
import './comments.css'



export default function AlignItemsList({comments}) {

const messageStyle = {
  width: '100%',
  backgroundColor: 'rgb(253 239 239 / 39%)',
  // backgroundColor: '#fdefef7d',
  // marginTop: '20px'
  paddingTop: "20px"
  }



  const themeColor=process.env.REACT_APP_THEME_COLOR
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
    <div className='list-comments'>
    {
        comments.map((items) => {
            return(
                <List  sx={{ width: '100%',  bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                      <div id='initials_icon'>{items.initials}</div> {/* initals */}
                  </ListItemAvatar>
                  <ListItemText
                    style={{color: themeColor}}
                    primary={items.fullname} /* Name */
                    secondary={
                      <React.Fragment>
                        <Typography className='initials'
                          component="span"
                          variant="body2"
                          sx={{ color: 'text.primary', display: 'inline' }}
                        >
                          Role: {items.role}{/* Role */}
                        </Typography>
                        <br/>
                     
                        {items.note}
                          <br/>
                          <br/>
                        <Typography className='date'
                          component="span"
                          variant="body3"
                          sx={{ color: 'text.primary', display: 'inline' }}
                        >
                          Created on: {items.date} {/* Date */}
                        </Typography>
                      </React.Fragment>
                    }
          
                    
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            )
        })
    
    }

    
    </div>

    <div className='mobileComments' style={messageStyle}>
      {
            comments.map((items) => {
                return   <ChatCard rowData={items}/>
            })
      }
  
    </div>

    </div>


  );
}
