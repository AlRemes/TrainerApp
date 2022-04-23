import React, { useState, useEffect } from 'react'

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import AddCustomer from './crud/AddCustomer.js'
import EditCustomer from './crud/EditCustomer.js';
import  Snackbar  from '@mui/material/Snackbar';

import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import { Box } from '@mui/material';


import { CSVLink } from "react-csv";
import Link from '@mui/material/Link';

import DeleteCustomer from './crud/DeleteCustomer.js';

function Customers() {
    let urlEnd = '/customers'
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');


    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + urlEnd)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
          })
        .then(data => setCustomers(data.content))
        .catch(err => console.log(err))
    }, []);

    const fetchCustomer = () =>{
        fetch(process.env.REACT_APP_API_URL + urlEnd)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
          })
        .then(data => setCustomers(data.content))
        .catch(err => console.log(err))
    }

    const addCustomer = (newCustomer) => {
        fetch(process.env.REACT_APP_API_URL + urlEnd, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCustomer),
        })
          .then((response) => {
            if (response.ok) {
              fetchCustomer();
            } else {
              alert("Something went wrong");
            }
          })
          .catch((err) => console.log(err));
      };

      const updateCustomer = (updatedCustomer, link) => {

        fetch(link[0].href, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if (response.ok){
                setMessage('Customer updated')
                setOpen(true);
                fetchCustomer();
            } else{
                alert('Something went wrong in edit')
            }
        })
        .catch(err => console.error(err))
    }

    //Making dowloaded data nicer looking
    function customerscsv() {
        let filtercustomer = [];
        let filteredcustomers = [];
        customers.map((item) => {
            filtercustomer = {
                firstname: item.firstname,
        lastname:item.lastname,
        email:item.email,
        phone:item.phone,
        streetaddress:item.streetaddress,
        postcode:item.postcode,
        city:item.city,
        links:item.links[0].rel + ':' + item.links[0].href + 
                ',' + item.links[1].rel + ':' + item.links[1].href + 
                ',' + item.links[2].rel + ':' + item.links[2].href
            }
            filteredcustomers.push(filtercustomer)
        })
        return filteredcustomers
    }

    const [columns] = useState([
        {headerName:'First name', field: 'firstname', sortable: true, filter:true},
        {headerName:'Last name',field: 'lastname', sortable: true, filter:true},
        {headerName:'Street address',field: 'streetaddress', sortable: true, filter:true, width:150},
        {headerName:'Post Code',field: 'postcode', sortable: true, filter:true, width:150},
        {headerName:'City',field: 'city', sortable: true, filter:true},
        {headerName:'Email',field: 'email', sortable: true, filter:true},
        {headerName:'Phone',field: 'phone', sortable: true, filter:true},
        {
            headerName:'',
            width:100,
            field:'links',
            cellRenderer: params =>
            <EditCustomer params={params} updateCustomer={updateCustomer}/>
        },
        {
            field: "links",
            headerName: "",
            width: 100,
            cellRenderer: (params) => <DeleteCustomer params={params} fetchCustomer={fetchCustomer} setOpen={setOpen} setMessage={setMessage}/>,
          },
    ]);

    return (
        <div className="ag-theme-material" style={{height: 600, width: '100%', flex:1}}>
            <Box style={{display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",}}>
            <AddCustomer addCustomer={addCustomer} />
            
            <Link as='li' underline='hover' variant='button' style={{marginTop:'1%', width:'15%', height:'20%', fontSize:'120%', borderColor:'lightblue', borderWidth:1, borderBottom:1, borderStyle:'solid', borderRadius:3, alignContent:'center', alignItems:'center', listStyleType:'none'}}>
            <CSVLink filename='CustomerData' data={customerscsv()}>Download <br/> Customer Data</CSVLink>
               </Link>  
               </Box>
                <AgGridReact 
                    columnDefs={columns}
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellFocus={true}
                />
                <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={message}
      />
            </div>
            
    )
}

export default Customers;