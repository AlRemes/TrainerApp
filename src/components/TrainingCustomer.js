import React, { useState, useEffect } from 'react'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function TrainingCustomer(props) {

    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        fetch(props.params.data.links[2].href)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
          })
        .then(data => setCustomer(data))
        .catch(err => console.log(err))
    }, []);


    return (
        <>
        {customer.firstname} {customer.lastname}
        </>
    )
}

export default TrainingCustomer;