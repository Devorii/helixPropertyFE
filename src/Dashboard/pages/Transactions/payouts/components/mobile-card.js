import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        mb: 2,
      }}
  >
    •
  </Box>
);

export default function PayoutReportCardMobile({title, amount}) {
  return (
    <Card sx={{ minWidth: "100%"}}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          ${amount}
        </Typography>
      </CardContent>
    </Card>
  );
}