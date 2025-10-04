import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';


export default function ReviewCard({ dataRow, rowData, click }) {

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


  return (
    <Card sx={{
      width: "100%",
      marginBottom: "16px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)"
 // call the handler
    }}
         onClick={() => click(dataRow)} 
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], fontSize: 'small' }} aria-label="recipe">
            {getInitials(rowData.name)}
          </Avatar>
        }
        action={
          <Typography variant="body2" sx={{
            color:
              rowData.status === "Open"
                ? "green"
                : rowData.status === "Closed"
                  ? "red"
                  : rowData.status === "Processing"
                    ? "orange"
                    : "text.secondary",
          }}>
            {rowData.status}
          </Typography>
        }
        title={toTitleCase(rowData.name)}
        subheader={rowData.issue}
      />
      {/* <hr style={{width: "90%"}}/> */}
    </Card>
  );
}
