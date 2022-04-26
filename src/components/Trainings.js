import React, { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";

import { format, parseISO } from "date-fns";
import Snackbar from "@mui/material/Snackbar";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import TrainingCustomer from "./TrainingCustomer";
import AddTraining from "./crud/AddTraining";
import DeleteTraining from "./crud/DeleteTraining";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_TRAININGS)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => setTrainings(data))
      .catch((err) => console.log(err));
  }, []);

  const fetchTraining = () => {
    fetch(process.env.REACT_APP_API_TRAININGS)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => setTrainings(data))
      .catch((err) => console.log(err));
  };

  var filterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      let formattedMidnight = format(filterLocalDateAtMidnight, "dd/MM/yyyy");
      let formattedValue = format(parseISO(cellValue), "dd/MM/yyyy");

      let splitMidnight = formattedMidnight.split("/");
      let splitValue = formattedValue.split("/");

      console.log(splitMidnight);
      console.log(splitValue);

      if (cellValue === null) return -1;

      if (splitMidnight[2] === splitValue[2]) {
        if (splitMidnight[1] === splitValue[1]) {
          if (splitMidnight[0] === splitValue[0]) {
            return 0;
          } else if (splitMidnight[0] > splitValue[0]) {
            return -1;
          } else {
            return 1;
          }
        } else if (splitMidnight[1] > splitValue[1]) {
          return -1;
        } else {
          return 1;
        }
      } else if (splitMidnight[2] > splitValue[2]) {
        return -1;
      } else {
        return 1;
      }
    },
    browserDatePicker: true,
    minValidYear: 1900,
    maxValidYear: 2101,
  };

  const postUrl = "/trainings";

  const addTraining = (newTraining) => {
    fetch(process.env.REACT_APP_API_URL + postUrl, {
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
      valueGetter: (params) =>
        params.data.customer.firstname + " " + params.data.customer.lastname,
    },
    {
      field: "customer.id",
      headerName: "",
      width: 100,
      cellRenderer: (params) => (
        <DeleteTraining
          params={params}
          fetchTraining={fetchTraining}
          setOpen={setOpen}
          setMessage={setMessage}
        />
      ),
    },
  ]);

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
        message={message}
      />
    </>
  );
}

export default Trainings;
