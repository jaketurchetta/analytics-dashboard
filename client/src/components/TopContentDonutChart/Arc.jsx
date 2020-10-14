import React, { useState, useContext } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import { TooltipContext } from './Tooltip.jsx'

const Path = styled.path`
  width: 100%
  height: 100%;
`

const Arc = ({ d, r, color, offsetX, offsetY }) => {
  const [selected, setSelected] = useState(false)
  const tooltipContext = useContext(TooltipContext)

  const arc = d3
    .arc()
    .outerRadius(selected ? r + 10 : r)
    .innerRadius(selected ? r - 105 : r - 100)
    .padAngle(0.01)

  const mouseOver = () => {
    const [x, y] = arc.centroid(d)
    setSelected(true)
    tooltipContext.setTooltip({
      show: d.index !== null,
      x: x + offsetX + 30,
      y: y + offsetY + 30,
      content: d.data.title + '\n' + d.data.sum.toLocaleString() + ' views',
      orientLeft: offsetX < 0,
    })
  }

  const mouseOut = () => {
    setSelected(null)
    tooltipContext.setTooltip({ show: false })
  }

  return (
    <path
      d={arc(d)}
      fill={color}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      style={{ cursor: 'pointer' }}
    />
  )
}

export default Arc
