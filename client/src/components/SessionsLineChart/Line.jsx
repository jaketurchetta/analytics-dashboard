
import React, { useEffect } from 'react'
import { scaleLinear, max, line, select } from 'd3'

const amimateLine = (xScale, yScale, currentLine, lineColor, data) => {

  const lineDefinition = line()
    .x((d, i) => xScale(d.time))
    .y(d => yScale(d.views))

  const newLinePath = lineDefinition(data)

  currentLine.transition()
    .duration(650)
    .attr("d", newLinePath)
    .attr("stroke", lineColor)
    .attr("stroke-width", 3)
}

const animateDots = (xScale, yScale, dotsContainer, dotsColor, data) => {

  const dotsCoords = data.map( (item, index) => {
    return {x: (xScale(item.time)), y: (yScale(item.views))}
  } )

  const dots = dotsContainer.selectAll('circle')

  const getdotColor = index => {
    const measures = data.map(item => item.views)
    const minValue = Math.min.apply( null, measures)
    const maxValue = Math.max.apply( null, measures)
    let fillColor = "white"
    if(measures[index] === maxValue) { fillColor = "green" }
    return fillColor
  }

  dots.each(function (d, i) {
    select(this)
      .transition()
      .duration(650)
      .attr("cx", dotsCoords[i].x)
      .attr("cy", dotsCoords[i].y)
      .attr("fill", getdotColor(i))
      .attr("stroke", dotsColor)
      .attr("stroke-width", 10)
  })
}

export const Dots = props => {

  const {xScale, yScale, dotsColor, data, plotWidth, plotHeight, margin } = props

  const dotsRef = React.createRef()

  useEffect(() => {
      const dotsContainer = select(dotsRef.current)
      animateDots(xScale, yScale, dotsContainer, dotsColor, data)
  })

  const dots = data.map((item, index) => <circle key={index} r={0.3}><title>{`${item.date}: ${Math.floor(item.views)}`}</title></circle>)

  return (
      <g ref={dotsRef} width={plotWidth} height={plotHeight}>
          {dots}
      </g>
  )
}

export const Line = props => {

  const { xScale, yScale, lineColor, data, plotWidth, plotHeight, margin } = props
  const lineRef = React.createRef()

  useEffect(() => {
      const currentLine = select(lineRef.current)
      amimateLine(xScale, yScale, currentLine, lineColor, data)
  })

  return (
    <g width={plotWidth} height={plotHeight}>
      <path ref={lineRef} strokeWidth="0.3" fill="none"/>
    </g>
  )
}
