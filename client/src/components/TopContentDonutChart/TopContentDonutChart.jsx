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
  margin: 0px 40px;
`

const Title = styled.h3`
  font-size: 24px;
`

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

const TopContentDonutChart = ({ sessions, views, width, height, x, y, radius }) => {
  const pie = d3
    .pie()
    .value(d => d.sum)
    .sort(null)

  const totalViews = Object.values(views['Session Page Views']).reduce((a, b) => a + b)
  const Xbound = radius + 25
  const Ybound = radius + 25
  const colors = d3.scaleOrdinal(d3.schemeCategory10)

  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    contentTitle: '',
    contentViews: '',
    contentPercent: '',
    orientLeft: false
  })

  return (
    <Card>
      <Top>
        <Title>Top Content</Title>
      </Top>
      <TooltipContext.Provider value={{ ...tooltip, setTooltip }}>
        <svg width={width} height={height}>
          <g transform={`translate(${Xbound}, ${Ybound})`}>
            {pie(sessions).map(d => (
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
              <Session>{tooltip.contentTitle}</Session>
              <Stat>{`Views: ${tooltip.contentViews}`}</Stat>
              <Stat>{`Share: ${tooltip.contentPercent}%`}</Stat>
            </TooltipDiv>
          </Tooltip>
        </svg>
      </TooltipContext.Provider>
    </Card>
  )
}

export default TopContentDonutChart
