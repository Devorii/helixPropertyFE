import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';


export default function ChatCard({ rowData }) {

    // const handleExpandClick = () => {
    //   setExpanded(!expanded);
    // };
    function toTitleCase(text) {
        return text
            .toLowerCase()
            .split(" ")
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    }

    function getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    }

    const direction = rowData.role == 'Admin' ? 'row-reverse' : 'row'
    const iconSpacing = rowData.role == 'Admin' ? '' : 'row'

    const adminOutterItemsPos = {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginRight: '15px'

    }

    const outterItemsPos = {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '15px'

    }

    const adminAvatarStyle = {
        bgcolor: red[500],
        marginLeft: '10px',
        width: '22px',
        height: '22px',
        fontSize: 'x-small'
    }
    const AvatarStyle = {
        bgcolor: red[500],
        marginRight: '10px',
        width: '22px',
        height: '22px',
        fontSize: 'x-small'
    }

    const chatColorization = {
        width: "86%",
        marginBottom: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        backgroundColor: "rgb(218, 132, 132)",
        color: 'white !important',
        "& .MuiTypography-root": {
            color: "white", // force all Typography inside to white
        },
        "& .MuiCardHeader-subheader": {
            color: "white", // specifically target subheader text
        },
    }

    const adminChatColorization = {
        width: "86%",
        marginBottom: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)"
    }

    const adminDateAlignment = {
        fontSize:'10px', 
        margin: "-8px 47px 40px 0",
        textAlign: 'end'
    }
    const dateAlignment = {
        fontSize:'10px', 
        margin: "-8px 0px 40px 47",
        textAlign: 'start'
    }

    const adminName = {
    textAlign: 'end',
    marginTop: "5px",
    fontSize: "small",
    marginRight: "15px",
    marginBottom: "0px"
    }

    const name = {
    marginTop: "5px",
    fontSize: "small",
    marginLeft: "15px",
    marginBottom: "0px"
    }

    // rgb(218, 132, 132)
    return (
        <div>
            <div style={rowData.role == 'Admin' ? adminOutterItemsPos : outterItemsPos}>

                <Avatar sx={rowData.role == 'Admin' ? adminAvatarStyle : AvatarStyle} aria-label="recipe">
                    {rowData.initials}
                </Avatar>

                <Card sx={rowData.role == 'Admin' ? adminChatColorization : chatColorization}
                //  onClick={() => click(dataRow)} 
                >
                    <p style={rowData.role == 'Admin' ? adminName : name}>{rowData.fullname}</p>
                    <CardHeader 
                        // avatar={
                        //     <Avatar sx={{ bgcolor: red[500], fontSize: 'small' }} aria-label="recipe">
                        //         {rowData.initials}
                        //     </Avatar>
                        // }
                        action={
                            <Typography variant="body2"
                            //  sx={{
                            //     color:
                            //         rowData.status > 1000
                            //             ? "Red"
                            //             : "text.secondary"
                            // }}
                            >
                                {/* {rowData.total} */}
                            </Typography>
                        }
                        // title={toTitleCase(rowData.fullname)}
                        subheader={rowData.note}
                    />
                    {/* <hr style={{width: "90%"}}/> */}
                </Card>

            </div>
            <p style={rowData.role == 'Admin' ? adminDateAlignment : dateAlignment }>
                {
                    (new Date(rowData.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }))
                }

            </p>

        </div>


    );
}
