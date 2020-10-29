import React, { useContext } from 'react'

const TooltipContext = React.createContext({
  show: false,
  x: 0,
  y: 0,
  orientLeft: false,
  country: '',
  views: '',
  percent: ''
})

const Tooltip = ({ height, width, children }) => {
  const { x, y, show, orientLeft } = useContext(TooltipContext)
  return (
    <g
      transform={`translate(${orientLeft ? x - width : x}, ${y})`}
      style={{ visibility: show ? 'visible' : 'hidden' }}
    >
      <foreignObject height={height} width={width}>
        {children}
      </foreignObject>
    </g>
  )
}

export default Tooltip
export { TooltipContext }
