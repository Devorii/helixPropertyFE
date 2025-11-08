import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import NestedModal from './modal/residents';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './contact.css'



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  boxShadow: 'none',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));



export default function ListViewEdit() {
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState({})
  // const [contact, setContacts]=useState([null])
  const [contact, setContacts] = useState([])

const themeColor=process.env.REACT_APP_THEME_COLOR
  const collectTenantsInfo = async (token) => {

    const prop_id = localStorage.getItem('pid')
    try {
      const response = await fetch(`${process.env.REACT_APP_HELIX_API}/tenant/view-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          property_id: prop_id
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);
        setContacts(data)
      } else if (response.status === 403) {
        // Redirect if 403 Forbidden response

      } else {
        console.error(`Unexpected status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during the request:', error.message);
    }
  };


  const contactHeader = (
    <Grid className='mb-container' container spacing={4}>
      <Grid size={3}>
        <Item ><strong>Name</strong></Item>
      </Grid>
      <Grid className='rm-mobile' size={3}>
        <Item  ><strong>contact #</strong></Item>
      </Grid>
      <Grid className='rm-mobile' size={3}>
        <Item ><strong>email</strong></Item>
      </Grid>
      <Grid size={3}>
        <Item><AddBoxIcon style={{color: themeColor}} /></Item>
      </Grid>
    </Grid>
  )

  const contactInfo = (data) => {
    if (data[0] != null) {
      const new_data = data.map((item) => (
        <Grid className='mb-container mb-bg' container spacing={4}
          onClick={() => {
            setOpen(true)
            setModalData({
              uid:item.uid,
              initials: item.intials,
              name: item.fullname,
              contact: item.phone,
              email: item.email, 
              company: item.company, 
              occupation: item.occupation,
              dob: item.dob, 
              age: item.age,
              rental_price: item.rental_price
            })
          }}>

          <Grid className='mb-name' size={3}>
            <Item className='gridItem rm-bg'>{item.fullname}</Item>
          </Grid>
          <Grid className='rm-mobile gridItem' size={3}>
            <Item className='gridItem rm-bg'>{item.phone}</Item>
          </Grid>
          <Grid className='rm-mobile gridItem' size={3}>
            <Item className='gridItem rm-bg'>{item.email}</Item>
          </Grid>
          <Grid size={3}>
            <Item><MoreHorizIcon id='moreIcon' style={{color: themeColor}}/></Item>
          </Grid>
        </Grid>

      ))
      return new_data
    }
    else {
      return <p style={{ color: 'gray' }}>No contacts created</p>
    }

  }


  useEffect(() => {
    const token = localStorage.getItem('token')
    collectTenantsInfo(token)
  }, [])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {contactHeader}
        {contactInfo(contact)}
      </Box>
      <NestedModal open={open} setOpen={setOpen} data={modalData} />
    </>


  );
}