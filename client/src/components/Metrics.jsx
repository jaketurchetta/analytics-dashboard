import React from 'react'
import styled from 'styled-components'

const MetricsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 50px 0px;
  font-size: 20px;
  font-weight: bold;
`

const MetricDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  background: #ffffff;
  box-shadow:  35px 35px 70px #c9c9c9,
              -35px -35px 70px #ffffff;
  padding: 20px;
  width: 200px;
  height: 250px;
`

const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #DCDCDC;
  padding-bottom: 15px;
`

const TotalUnique = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Subtitle = styled.div`
  font-style: italic;
  font-weight: normal;
  padding-top: 10px;
  font-size: 20px;
`

const Stat = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  font-size: 35px;
`

const Metrics = ({ views, people, totalLogins, uniqueLogins, registrations }) => {

  const totalViews = Object.values(views['Event Page Views']).reduce((a, b) => a + b) + Object.values(views['Session Page Views']).reduce((a, b) => a + b)
  const uniqueUsers = people.total
  const viewsPerUser = Math.round(10 * (totalViews / uniqueUsers)) / 10
  const sumTotalLogins = totalLogins.reduce((a, b) => a + b).toLocaleString()
  const sumUniqueLogins = uniqueLogins.reduce((a, b) => a + b).toLocaleString()
  const sumRegistrations = registrations.reduce((a, b) => a + b).toLocaleString()

  return (
    <MetricsContainer>
      {totalViews ? (
        <MetricDiv>
          <Title>Total Page Views</Title>
          <Stat>{totalViews.toLocaleString()}</Stat>
        </MetricDiv>
      )
                                : (null)}
      {uniqueUsers ? (
        <MetricDiv>
          <Title>Total Unique Users</Title>
          <Stat>{uniqueUsers.toLocaleString()}</Stat>
        </MetricDiv>
      )
                                : (null)}
      {viewsPerUser ? (
        <MetricDiv>
          <Title>Views / User</Title>
          <Stat>{viewsPerUser.toLocaleString()}</Stat>
        </MetricDiv>
      )
                                : (null)}
      {sumTotalLogins && sumUniqueLogins ? (
        <MetricDiv>
          <Title>Logins</Title>
          <TotalUnique>
            <Subtitle>Total</Subtitle>
            <Stat>{sumTotalLogins}</Stat>
            <Subtitle>Unique</Subtitle>
            <Stat>{sumUniqueLogins}</Stat>
          </TotalUnique>
        </MetricDiv>
      )
                                : (null)}
      {sumRegistrations ? (
        <MetricDiv>
          <Title>Registrations</Title>
          <Stat>{sumRegistrations}</Stat>
        </MetricDiv>
      )
                                : (null)}
    </MetricsContainer>
  )
}

export default Metrics
