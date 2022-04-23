import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


function AddCustomer( {addCustomer} ){

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname:'',
        email:'',
        phone:'',
        streetaddress:'',
        postcode:'',
        city:''
    });
      
    const [customers, setCustomers] = useState([
    ]);

    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSave = () => {
      if (customer.email.includes('@') && customer.email.includes('.') && customer.firstname && customer.lastname
      && customer.city && customer.phone && customer.postcode && customer.streetaddress){
      addCustomer(customer);
      setCustomer({
        firstname: '',
        lastname:'',
        email:'',
        phone:'',
        streetaddress:'',
        postcode:'',
        city:''
      });
      setOpen(false);
     } else {
         alert('All values are not valid')
     }
  }


  useEffect (() => {
    const url = '/customers'
  fetch(process.env.REACT_APP_API_URL + url)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then(data => setCustomers(data.content))
    .catch((err) => console.log(err));

}, []);

  const inputChange = (event) => {
    setCustomer({...customer, [event.target.name]:event.target.value})
  }


  return (
      <div>
          <Button variant="outlined" onClick={handleClickOpen} style={{marginTop:10}}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
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

export default AddCustomer;