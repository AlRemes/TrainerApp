import React, { useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit'

function EditCustomer( {params, updateCustomer} ){

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname:'',
        email:'',
        phone:'',
        streetaddress:'',
        postcode:'',
        city:''
    });

    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
      console.log(params)
    setCustomer({
        firstname: params.data.firstname,
        lastname:params.data.lastname,
        email:params.data.email,
        phone:params.data.email,
        streetaddress:params.data.streetaddress,
        postcode:params.data.postcode,
        city:params.data.city
      })
      console.log(params);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updateCustomer(customer, params.value);
    setOpen(false);
  }

  const inputChange = (event) => {
    setCustomer({...customer, [event.target.name]:event.target.value})
  }

  return (
      <div>
          <IconButton variant="outlined" onClick={handleClickOpen} >
        <EditIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={inputChange}
            fullWidth
            label="First name"
            variant="standard"

          />
          <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={inputChange}
            fullWidth
            label="Last name"
            variant="standard"

          />
          <TextField
            margin="dense"
            name="email"
            value={customer.email}
            onChange={inputChange}
            fullWidth
            label="Email"
            variant="standard"

          />
          <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={inputChange}
            label="Phone number"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChange}
            fullWidth
            label="Street address"
            variant="standard"
          />
          <TextField
            margin="dense"
            name="postcode"
            type='number'
            value={customer.postcode}
            onChange={inputChange}
            fullWidth
            label="Postcode"
            variant="standard"
          />
          <TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={inputChange}
            fullWidth
            label="City"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      </div>
  )


}

export default EditCustomer;