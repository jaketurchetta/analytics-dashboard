import React from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

const Styles = styled.div`
  .axisLaeyr .xAxis .domain,
  .axisLaeyr .xAxis .tick > line {
    display: none;
  }
  .axisLaeyr .yAxis .domain,
  .axisLaeyr .yAxis .tick > line {
    display: none;
  }
  .axisLaeyr .yGrid .domain {
    display: none;
  }
  .axisLaeyr .yGrid .tick > line {
    stroke-dasharray: 3;
  }
  .plotLayer .valueLine {
    fill: none;
    stroke-width: 1.5;
    stroke: #00f;
  }
`

 function D3blackbox(d3render) {
  return class Blackbox extends React.Component {
    componentDidMount() {
      d3render.call(this)
    }
    componentDidUpdate() {
      d3render.call(this)
    }
    render() {
      const transform = this.props.transform || ""
      return <g transform={transform} ref="anchor" />
    }
  }
}

const XAxis = D3blackbox(function() {
  const axis = d3
    .axisBottom()
    .tickFormat(d => d3.timeFormat("%b %e")(d))
    .scale(this.props.xScale)

  d3
    .select(this.refs.anchor)
    .classed("xAxis", true)
    .transition()
    .call(axis)
})

const YAxis = D3blackbox(function() {
  const axis = d3
    .axisLeft()
    .tickFormat(d => d)
    .scale(this.props.yScale)

  d3
    .select(this.refs.anchor)
    .classed("yAxis", true)
    .transition()
    .call(axis)
})

const YGrid = D3blackbox(function() {
  const axis = d3
    .axisRight()
    .tickFormat(d => null)
    .scale(this.props.yScale)
    .tickSizeOuter(0)
    .tickSizeInner(this.props.plotWidth)

  d3
    .select(this.refs.anchor)
    .classed("yGrid", true)
    .call(axis)
})

const Line = D3blackbox(function() {
  const path = d3
    .line()
    .x(d => d.x)
    .y(d => d.y)

  const parent = d3.select(this.refs.anchor)

  const current = parent.selectAll(".valueLine").data([this.props.plotData])

  current.interrupt()

  const enter = current
    .enter()
    .append("path")
    .classed("valueLine", true)

  const valueLine = current.merge(enter)

  current
    .transition()
    .attr("transform", `translate(${this.props.xSlide}, 0)`)
    .on("end", () => {
      valueLine.attr("d", path)
      current.attr("transform", null)
    })

})

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
  )
}

export default SessionsLineChart
