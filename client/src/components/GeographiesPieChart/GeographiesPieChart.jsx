import React, { useState } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import Tooltip, { TooltipContext } from './Tooltip.jsx'
import Arc from './Arc.jsx'

const Styles = styled.div`
.tooltip-donut {
  position: absolute;
  text-align: center;
  padding: .5rem;
  background: #FFFFFF;
  color: #313639;
  border: 1px solid #313639;
  border-radius: 8px;
  pointer-events: none;
  font-size: 1.3rem;
}`

const TooltipDiv = styled.div`
  height: 100%;
  font-size 20px;
  border-radius: 5px;
  padding: 10px;
  background-color:rgba(255, 255, 255, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Session = styled.div`
  font-style: italic;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`

const Stat = styled.div`
`

const GeographiesPieChart = ({ data }) => {

  const pie = d3
    .pie()
    .value(d => d.views)
    .sort(d3.descending)

  const totalViews = data.reduce((a, b) => a + b.views, 0)
  const width = 550
  const height = 550
  const radius = 250
  const x = 175
  const y = 120
  const Xbound = radius + 25
  const Ybound = radius + 25
  const colors = d3.scaleOrdinal(d3.schemeCategory10)

  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    country: '',
    views: '',
    percent: '',
    orientLeft: false
  })

  return (
      <TooltipContext.Provider value={{ ...tooltip, setTooltip }}>
        <svg width={width} height={height}>
          <g transform={`translate(${Xbound}, ${Ybound})`}>
            {pie(data).map(d => (
              <Arc
                d={d}
                color={colors(d.index)}
                r={radius}
                key={d.index}
                x={x}
                y={y}
                totalViews={totalViews}
              />
            ))}
          </g>
          <Tooltip width={200} height={300}>
            <TooltipDiv>
              <Session>{tooltip.country}</Session>
              <Stat>{`Views: ${tooltip.views}`}</Stat>
              <Stat>{`Share: ${tooltip.percent}%`}</Stat>
            </TooltipDiv>
          </Tooltip>
        </svg>
      </TooltipContext.Provider>
  )
}

export default GeographiesPieChart
