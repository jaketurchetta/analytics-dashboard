import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

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
  margin-bottom: 40px;
`

const Title = styled.h3`
  font-size: 24px;
`

const TopContentChart = ({ sessions, width, height, innerRadius, outerRadius }) => {

  const ref = useRef(null)
  const createPie = d3
    .pie()
    .value(d => d.sum)
    .sort(null)
  const createArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
  const colors = d3.scaleOrdinal(d3.schemeCategory10)
  const format = d3.format('d')

  useEffect(() => {
      const data = createPie(sessions)
      const group = d3.select(ref.current)
      const groupWithData = group.selectAll('g.arc').data(data)

      groupWithData.exit().remove()

      const groupWithUpdate = groupWithData
        .enter()
        .append('g')
        .attr('class', 'arc')

      const div = d3
        .select(ref.current)
        .append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0)

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
        .style('font-size', 20)
        .text(d => format(d.value))
    },
    [sessions]
  )

  return (
    <Card>
      <Top>
        <Title>Top Content</Title>
      </Top>
      <Styles>
        <svg width={width} height={height}>
          <g
            ref={ref}
            transform={`translate(${outerRadius} ${outerRadius})`}
          />
        </svg>
      </Styles>
    </Card>
  )
}

export default TopContentChart
