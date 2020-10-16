import React  from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

const XLabel = styled.text`
  font-size: 15px;
  color: black;
  x: 760;
  y: 0;
`

const YLabel = styled.text`
  font-size: 15px;
  color: black;
  x: -25;
  y: 0;
`

function D3blackbox(d3render, label = '') {
  return class Blackbox extends React.Component {
    constructor(props) {
      super(props)
    }
    componentDidMount() {
      d3render.call(this)
      console.log('CDM')
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

export const XAxis = D3blackbox(function() {
  const axis = d3
    .axisBottom()
    .tickFormat(d => d3.timeFormat("%b %e")(d))
    .scale(this.props.xScale)

  d3
    .select(this.refs.anchor)
    .classed("xAxis", true)
    .transition()
    .call(axis)

}, 'Date')

export const YAxis = D3blackbox(function() {
  const axis = d3
    .axisLeft()
    .tickFormat(d => d.toLocaleString())
    .scale(this.props.yScale)

  d3
    .select(this.refs.anchor)
    .classed("yAxis", true)
    .transition()
    .call(axis)
}, 'Session Page Views')

export const YGrid = D3blackbox(function() {
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

export const Line = D3blackbox(function() {

  const path = d3
    .line()
    .x(d => d.x)
    .y(d => d.y)

  const parent = d3.select(this.refs.anchor)

  const current = parent.selectAll("valueLine").data(this.props.plotData)

  current.interrupt()

  const enter = current
    .enter()
    .append("path")
    .classed("valueLine", true)

  const valueLine = current.merge(enter)

  current
    .transition()
    .attr("transform", `translate(0, 0)`)
    .on("end", () => {
      valueLine.attr("d", path)
      current.attr("transform", null)
    })

})
