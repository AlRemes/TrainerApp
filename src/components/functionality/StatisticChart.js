import React, { useState, useEffect } from "react";


import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
 

function StatisticChart(props){
console.log(props)
return (
    <BarChart width={1000} height={500} data={props.props}>
    <Bar dataKey="time" fill="blue" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="label" />
    <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }}/>
  </BarChart>
      
    // <div className="App">
    //     <VictoryBar/>
    //   <Bar options={chartOptions} data={chartData} />
    // </div>
  );
}
  export default StatisticChart;
