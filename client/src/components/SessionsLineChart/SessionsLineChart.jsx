import React, { useState, useEffect, useMemo }  from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import { XAxis, YAxis, YGrid, Line } from './LineAxis.jsx'

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
  .plotLayer .valueLine {
    fill: none;
    stroke-width: 3;
    stroke: #8A2BE2;
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
  margin-top: 50px;
  margin-bottom: 50px;
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

const SessionsLineChart = props => {

  const updateScale = props => {
    const data = props.data
    const xScale = d3.scaleTime()
    const yScale = d3.scaleLinear().nice()

    const xDomain = d3.extent(data, d => d.time)
    const yDomain = props.yDomain || [0, d3.max(data, d => props.yFn(d.views))]

    xScale
      .domain(xDomain)
      .range([0, props.width - (props.margin.left + props.margin.right)])

    yScale
      .domain(yDomain)
      .range([props.height - (props.margin.top + props.margin.bottom), 0])

    return { xScale, yScale }
  }

  const updatePlotSize = props => {
    const plotWidth =
      props.width - (props.margin.left + props.margin.right)
    const plotHeight =
      props.height - (props.margin.top + props.margin.bottom)
    return { plotWidth, plotHeight }
  }

  const { xScale, yScale } = updateScale(props)

  const { plotWidth, plotHeight } = updatePlotSize(props)

  const metaData = {
    xScale: xScale,
    yScale: yScale,
    plotWidth: plotWidth,
    plotHeight: plotHeight,
    xSlide: -xScale(props.xFn(props.data[0]))
  }
  const plotData = {
    plotData: props.data.map((d, i) => {
      return {
        id: i,
        data: d.views,
        x: xScale(props.xFn(d)),
        y: yScale(props.yFn(d))
      }
    })
  }

  return (
    <Styles>
      <Card>
        <Top>
          <Title>Session views over time</Title>
        </Top>
        <Styles>
        <svg width={props.width} height={props.height}>
          <g
            className='axisLayer'
            width={plotWidth}
            height={plotHeight}
            transform={`translate(${props.margin.left}, ${props.margin.top})`}
          >
            <YGrid {...metaData} />
            <XAxis {...metaData} transform={`translate(0,${plotHeight})`} />
            <YAxis {...metaData} />
          </g>
          <g
            className='plotLayer'
            width={plotWidth}
            height={plotHeight}
            transform={`translate(${props.margin.left}, ${props.margin.top})`}
          >
            <Line {...metaData} {...plotData} />
          </g>
        </svg>
        </Styles>
      </Card>
    </Styles>
  )
}

export default SessionsLineChart
