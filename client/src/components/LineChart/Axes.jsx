import React  from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

function D3blackbox(d3render) {
  return class Blackbox extends React.Component {
    constructor(props) {
      super(props)
    }
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

})

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
})

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
