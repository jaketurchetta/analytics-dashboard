import React, { useState, useEffect, useRef, useContext } from 'react'
import * as d3 from 'd3'
import TopContentDonutChart from './TopContentDonutChart.jsx'


const TopContentDonutChartComponent = ({ data }) => {

  console.log(data)

  return <TopContentDonutChart data={data} />

}

export default TopContentDonutChartComponent