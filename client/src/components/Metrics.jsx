import React from 'react'
import styled from 'styled-components'

const MetricsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 50px;
  margin-bottom: 50px;
`

const MetricDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Metrics = ({ views, people }) => {

  const totalViews = Object.values(views['Event Page Views']).reduce((a, b) => a + b) + Object.values(views['Session Page Views']).reduce((a, b) => a + b)
  const uniqueUsers = people.total
  const viewsPerUser = totalViews / uniqueUsers

  return (
    <MetricsContainer>
      {totalViews ? (
        <MetricDiv>
          <span>Total Page Views</span>
          <span>{totalViews}</span>
        </MetricDiv>
      )
                                : (null)}
      {uniqueUsers ? (
        <MetricDiv>
          <span>Total Unique Users</span>
          <span>{uniqueUsers}</span>
        </MetricDiv>
      )
                                : (null)}
      {viewsPerUser ? (
        <MetricDiv>
          <span>Views / User</span>
          <span>{viewsPerUser}</span>
        </MetricDiv>
      )
                                : (null)}
    </MetricsContainer>
  )
}

export default Metrics
