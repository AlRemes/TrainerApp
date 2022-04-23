import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';



function AddTraining( {addTraining} ){

    const [training, setTraining] = useState({
        date: '',
        duration:'',
        activity:'',
        customer:''
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
    if (training.activity && training.date && training.duration && training.customer){
      addTraining(training);
      setTraining({
        date: '',
        duration:'',
        activity:'',
        customer:''
      })
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
    setTraining({...training, [event.target.name]:event.target.value})
  }


  return (
      <div>
          <Button variant="outlined" onClick={handleClickOpen} style={{marginTop:10}}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Customer</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            value={training.customer}
            onChange={inputChange}
            name='customer'
            >
            {
            customers.map((item, i) => (<MenuItem key={i.toString()} value={item.links[0].href}>
                {item.firstname + ' ' + item.lastname}
                </MenuItem>
            ))}
            </Select>
        </FormControl>

          <TextField
            margin="dense"
            name="date"
            type='datetime-local'
            value={training.date}
            onChange={inputChange}
            fullWidth
            variant="standard"

          />
          <TextField
            margin="dense"
            name="duration"
            type='number'
            value={training.duration}
            onChange={inputChange}
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChange}
            label="Activity"
            fullWidth
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

export default AddTraining;