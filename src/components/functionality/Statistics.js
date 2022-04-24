import React, { useState, useEffect } from "react";

import StatisticChart from "./StatisticChart.js";

 
import groupBy from "lodash.groupby";
import sumBy from "lodash.sumby"



function Statistics() {
  const [chartData, setChartData] = useState({});

  const [chartOptions, setChartOptions] = useState({});
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false)

  const urlEnd = "/trainings";
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + urlEnd)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => setTrainings(data.content))
      .then(setVars())
      .then(setOpen(true))
      .catch((err) => console.log(err));
  }, []);

  function setVars () {
    let data = [];
    let filteredData = [];
    data = trainings;
    //Saving the labels
    let labels = groupBy(data, 'activity')
    // (Object.keys(labels)) Gives labels

    // Getting the amounts
    let sums = [];
    Object.values(labels).map(item=>
        sums.push(sumBy(item, 'duration'))
    )
    Object.keys(labels).map((item, i) =>
        filteredData.push({label:item, time:sums[i]})
    )
    console.dir(filteredData);
    
    setChartData(filteredData)
  };

  

  if (!open){
          return(
              <div>
                  <h2>Loading statistics</h2>
              </div>
          )
      }
  return (
    <StatisticChart props={chartData}/>
  );
}

export default Statistics;
