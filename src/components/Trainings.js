import React, { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";

import { format, parseISO } from "date-fns";
import  Snackbar  from '@mui/material/Snackbar';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import TrainingCustomer from "./TrainingCustomer";
import AddTraining from "./crud/AddTraining";
import DeleteTraining from "./crud/DeleteTraining";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);

  const urlEnd = "/trainings";
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + urlEnd)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => setTrainings(data.content))
      .catch((err) => console.log(err));
  }, []);

  const fetchTraining = () => {
    fetch(process.env.REACT_APP_API_URL + urlEnd)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => setTrainings(data.content))
      .catch((err) => console.log(err));
  };

  const addTraining = (newTraining) => {
    fetch(process.env.REACT_APP_API_URL + urlEnd, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTraining),
    })
      .then((response) => {
        if (response.ok) {
          fetchTraining();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  const [columns] = useState([
    {
      field: "date",
      sortable: true,
      filter: "agDateColumnFilter",
      filterParams: filterParams,
      cellRenderer: (params) =>
        format(parseISO(params.data.date), "dd/MM/yyyy"),
    },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true, width: 150 },
    {
      sortable: true,
      filter: true,
      headerName: "Customer",
      width: 150,
      field: "links.customer.href",
      cellRenderer: (params) => <TrainingCustomer params={params} />,
    },
    {
      field: "links",
      headerName: "",
      width: 100,
      cellRenderer: (params) => <DeleteTraining params={params} fetchTraining={fetchTraining} setOpen={setOpen} />,
    },
  ]);

  var filterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      var dateAsString = cellValue;
      console.log("dateAsString");
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split("/");
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
    browserDatePicker: true,
    minValidYear: 1900,
    maxValidYear: 2101,
  };

  return (
    <>
      <AddTraining addTraining={addTraining} />
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "100%", textAlign: "center" }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={trainings}
          pagination={true}
          paginationPageSize={10}
          suppressCellFocus={true}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Training deleted"
      />
    </>
  );
}

export default Trainings;
