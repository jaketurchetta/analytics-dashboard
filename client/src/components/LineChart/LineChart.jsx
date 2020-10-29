
import React from 'react'
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

const LineChart = props => {

  const { data, positionX, positionY, xFn, yDomain } = props
  const margin = { top: 20, right: 20, bottom: 20, left: 40 }
  const width = 800
  const height = 430
  const plotWidth = width - (margin.left + margin.right)
  const plotHeight = height - (margin.top + margin.bottom)

  const xDomain = extent(data.sessions, d => d.time)

  const xScale = scaleTime()
    .domain(xDomain)
    .range([0, plotWidth])

  const yScale = scaleLinear()
    .nice()
    .domain([0, Math.max(max(data.sessions, d => d.views * 1.1), max(data.events, d => d.views * 1.1))])
    .range([plotHeight, 0])

  const metaData = {
    xScale: xScale,
    yScale: yScale,
    plotWidth: plotWidth,
    plotHeight: plotHeight,
    xSlide: -xScale(props.xFn(props.data.events[0]))
  }

  return (
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
            <Line xScale={xScale} yScale={yScale} lineColor={'#8A2BE2'} data={data.sessions} plotWidth={plotWidth} plotHeight={plotHeight} margin={margin} />
            <Dots xScale={xScale} yScale={yScale} dotsColor={'#8A2BE2'} data={data.sessions} plotWidth={plotWidth} plotHeight={plotHeight} margin={margin} />
            <Line xScale={xScale} yScale={yScale} lineColor={'#90EE90'} data={data.events} plotWidth={plotWidth} plotHeight={plotHeight} margin={margin} />
            <Dots xScale={xScale} yScale={yScale} dotsColor={'#90EE90'} data={data.events} plotWidth={plotWidth} plotHeight={plotHeight} margin={margin} />
          </g>
        </svg>
      </Styles>
  )

}

export default LineChart
