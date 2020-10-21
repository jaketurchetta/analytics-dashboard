
import React, { useEffect } from 'react'
import { scaleLinear, scaleTime, max, line, select, extent } from 'd3'
import styled from 'styled-components'
import { Line, Dots } from './Line.jsx'
import { YGrid, XAxis, YAxis } from './Axes.jsx'

const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .axisLayer .xAxis .domain,
  .axisLayer .xAxis .tick > line {
    display: none;
  }
  .axisLayer .yAxis .domain,
  .axisLayer .yAxis .tick > line {
    display: none;
  }
  .axisLayer .yGrid .domain {
    display: none;
  }
  .axisLayer .yGrid .tick > line {
    stroke-dasharray: 3;
    color: #DCDCDC;
  }
`

const Card = styled.div`
  border-radius: 30px;
  background: #ffffff;
  box-shadow:  35px 35px 70px #c9c9c9,
              -35px -35px 70px #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
  padding-top: 10px;
  margin: 50px 0px;
`

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid #DCDCDC;
`

const Title = styled.h3`
  font-size: 24px;
`

const SessionsLineChart = props =>  {

    const { data, lineColor, positionX, positionY, xFn, yDomain } = props
    const margin  = {top: 20, right: 20, bottom: 20, left: 40}
    const width = 800
    const height = 430
    const plotWidth = width - (margin.left + margin.right)
    const plotHeight = height - (margin.top + margin.bottom)

    const xDomain = extent(data, d => d.time)

    const xScale = scaleTime()
      .domain(xDomain)
      .range([0, plotWidth])

    const yScale = scaleLinear()
      .nice()
      .domain([0, max(data, d => d.views * 1.1)])
      .range([plotHeight, 0])

    const metaData = {
        xScale: xScale,
        yScale: yScale,
        plotWidth: plotWidth,
        plotHeight: plotHeight,
        xSlide: -xScale(props.xFn(props.data[0]))
      }

    return (
      <Card>
        <Top>
          <Title>Session views over time</Title>
        </Top>
        <Styles>
          <svg width={width} height={height} >
            <g
              className='axisLayer'
              width={plotWidth}
              height={plotHeight}
              transform={`translate(${margin.left}, ${margin.top})`}
            >
              <YGrid {...metaData} />
              <XAxis {...metaData} transform={`translate(0,${plotHeight})`} />
              <YAxis {...metaData} />
            </g>
            <g
              width={plotWidth}
              height={plotHeight}
              transform={`translate(${margin.left}, ${margin.top})`}
            >
              <Line xScale={xScale} yScale={yScale} lineColor={lineColor} data={data} plotWidth={plotWidth} plotHeight={plotHeight} margin={margin} />
              <Dots  xScale={xScale} yScale={yScale} dotsColor={lineColor} data={data} plotWidth={plotWidth} plotHeight={plotHeight} margin={margin} />
            </g>
          </svg>
        </Styles>
      </Card>
      )

}

export default SessionsLineChart
