import React, { useState, useEffect, useRef, useContext } from 'react'
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
}
`

const Card = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
  padding-top: 10px;
  border-radius: 30px;
  background: #ffffff;
  box-shadow:  35px 35px 70px #c9c9c9,
              -35px -35px 70px #ffffff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0px;
`

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid #DCDCDC;
  margin-bottom: 40px;
`

const Title = styled.h3`
  font-size: 24px;
`

const TooltipP = styled.p`
  border-radius: 5px;
  padding: 10px;
  background: #ffffff;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const DonutDiv = styled.div`
  width: 100%;
  height: 100%;
  z-index: -1;
`

const TopContentDonutChart = ({ sessions, width, height, x, y, radius }) => {
  const pie = d3
    .pie()
    .value(d => d.sum)
    .sort(null)

  const outerRadius = radius + 150
  const colors = d3.scaleOrdinal(d3.schemeCategory10)

  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: '',
    orientLeft: false
  })

  return (
    <Card>
      <Top>
        <Title>Top Content</Title>
      </Top>
      <TooltipContext.Provider value={{ ...tooltip, setTooltip }}>
            <svg width={width} height={height}>
              <g transform={`translate(${outerRadius}, ${outerRadius})`}>
                {pie(sessions).map(d => (
                  <Arc
                    d={d}
                    color={colors(d.index)}
                    r={radius}
                    key={d.index}
                    offsetX={x}
                    offsetY={y}
                  />
                ))}
              </g>
              <Tooltip width={300} height={100}>
                <TooltipP>{tooltip.content}</TooltipP>
              </Tooltip>
            </svg>
      </TooltipContext.Provider>
    </Card>
  )
}

export default TopContentDonutChart
