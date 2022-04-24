import React from "react";


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
  );
}
  export default StatisticChart;
