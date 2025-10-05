import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';

function PaperComponent(props) {
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

const DeleteDialog = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = localStorage.getItem('token')
  const raw_payload = JSON.parse(localStorage.getItem('fncid_set'))
  const payload = raw_payload['unique_id']

  const deleteReport = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HELIX_API}/expense/delete-expense`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({"report_id":payload})
      });

      if (response.status === 200) {
       navigate('/transaction-expenses')
      } 

      else {
        console.error(`Unexpected status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error during the request:', error.message);
    }

  }

  return (
    <React.Fragment>
      <Button
      className='img-btn'
        variant="contained"
        onClick={handleClickOpen}
        sx={{
  
          backgroundColor: 'rgb(180 82 82)',
          color: 'white',
        }}
      >
        Delete Report
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Are you sure?
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button 
          onClick={deleteReport}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};


export default DeleteDialog;
