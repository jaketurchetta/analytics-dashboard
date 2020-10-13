import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const CountriesPieChart = ({ countries, width, height, innerRadius, outerRadius }) => {

  const ref = useRef(null)
  const createPie = d3
    .pie()
    .value(d => {
      Object.keys(d).forEach(country => {
        d[key].sum = Object.values(d[country]).reduce((a, b) => a + b)
      })
      return d.sum
    })
    .sort(null)
  const createArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
  const colors = d3.scaleOrdinal(d3.schemeCategory10)
  const format = d3.format('d')

  useEffect(() => {
      const data = createPie(countries)
      const group = d3.select(ref.current)
      const groupWithData = group.selectAll('g.arc').data(data)

      groupWithData.exit().remove()

      const groupWithUpdate = groupWithData
        .enter()
        .append('g')
        .attr('class', 'arc')

      const path = groupWithUpdate
        .append('path')
        .merge(groupWithData.select('path.arc'))

      path
        .attr('class', 'arc')
        .attr('d', createArc)
        .attr('fill', (d, i) => colors(i))

      const text = groupWithUpdate
        .append('text')
        .merge(groupWithData.select('text'))

      text
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('transform', d => `translate(${createArc.centroid(d)})`)
        .style('fill', 'white')
        .style('font-size', 10)
        .text(d => format(d.value))
    },
    [countries]
  )

  return (
    <svg width={width} height={height}>
      <g
        ref={ref}
        transform={`translate(${outerRadius} ${outerRadius})`}
      />
    </svg>
  )
}

export default CountriesPieChart
