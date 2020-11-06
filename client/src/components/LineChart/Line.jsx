
import React, { useEffect, useState, useContext } from 'react'
import { scaleLinear, max, line, select } from 'd3'
import Tooltip, { TooltipContext } from './Tooltip.jsx'
import styled from 'styled-components'



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

const animateLegend = (lineColor, key, legendContainer) => {



}

export const Dots = props => {

  const { xScale, yScale, dotsColor, data, plotWidth, plotHeight, margin } = props
  const [selected, setSelected] = useState(false)
  const tooltipContext = useContext(TooltipContext)

  console.log(data)

  const mouseOver = () => {
    console.log("Beep: ")
    setSelected(true)
    tooltipContext.setTooltip({
      show: true,
      x: 0,
      y: 0,
      views: this.views.toLocaleString(),
      date: this.time.toLocaleString()
    })
  }

  const mouseOut = () => {
    setSelected(null)
    tooltipContext.setTooltip({ show: false })
  }

  const dotsRef = React.createRef()

  useEffect(() => {
      const dotsContainer = select(dotsRef.current)
      animateDots(xScale, yScale, dotsContainer, dotsColor, data)
  })

  const dots = data.map((item, index) => {
    console.log(item)
    return <circle key={index} r={0.3} onMouseOver={item => {
      console.log(this)
      mouseOver()
    }} onMouseOut={() => mouseOut()} />
  })

  return (
      <g ref={dotsRef} width={plotWidth} height={plotHeight} >
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

export const Legend = props => {

  const { data } = props
  const legendRef = React.createRef()

  useEffect(() => {
    const legendContainer = select(lineRef.current)
    animateLegend(lineColor, key, legendContainer)
  })

  const keys = data.map((item, index) => <div>
      <circle key={index} r={0.3} />
      <p> {item.line}</p>
    </div>)

  return(
    <g width={200} height={100}>

    </g>
  )

}