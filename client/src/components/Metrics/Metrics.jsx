import React from 'react'
import styled from 'styled-components'
import { css } from "@emotion/core"
import PulseLoader from "react-spinners/PulseLoader"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

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

const EventSession = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const Split = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Metrics = ({ data }) => {

  const totalViews = data.views.session + data.views.event
  const viewsPerUser = Math.round(10 * (totalViews / data.users)) / 10

  return (
    <MetricsContainer>

        <MetricDiv>
          <Title>Total Page Views</Title>
          {totalViews ? (
            <div>
              <Stat>{totalViews.toLocaleString()}</Stat>
              <EventSession>
                <Split>
                  <Subtitle>Event</Subtitle>
                  <Stat>{data.views.event.toLocaleString()}</Stat>
                </Split>
                <Split>
                  <Subtitle>Session</Subtitle>
                  <Stat>{data.views.session.toLocaleString()}</Stat>
                </Split>
              </EventSession>
            </div>
            ) : (
              <div className="sweet-loading">
                <PulseLoader
                  css={override}
                  size={20}
                  color={"#36D7B7"}
                  loading={true}
                  margin={20}
                />
              </div>
            )}
        </MetricDiv>

        <MetricDiv>
          <Title>Total Unique Users</Title>
          {data.users ? (
            <Stat>{data.users.toLocaleString()}</Stat>
            ) : (
              <div className="sweet-loading">
                <PulseLoader
                  css={override}
                  size={20}
                  color={"#36D7B7"}
                  loading={true}
                  margin={20}
                />
              </div>
            )}
        </MetricDiv>

        <MetricDiv>
          <Title>Views / User</Title>
          {viewsPerUser ? (
          <Stat>{viewsPerUser.toLocaleString()}</Stat>
          ) : (
            <div className="sweet-loading">
              <PulseLoader
                css={override}
                size={20}
                color={"#36D7B7"}
                loading={true}
                margin={20}
              />
            </div>
          )}
        </MetricDiv>

        <MetricDiv>
          <Title>Logins</Title>
          <TotalUnique>
            <Subtitle>Total</Subtitle>
            {data.logins.total ? (
            <Stat>{data.logins.total.toLocaleString()}</Stat>
            ) : (
              <div className="sweet-loading">
                <PulseLoader
                  css={override}
                  size={15}
                  color={"#36D7B7"}
                  loading={true}
                  margin={20}
                />
              </div>
            )}
            <Subtitle>Unique</Subtitle>
            {data.logins.unique ? (
              <Stat>{data.logins.unique.toLocaleString()}</Stat>
              ) : (
                <div className="sweet-loading">
                  <PulseLoader
                    css={override}
                    size={15}
                    color={"#36D7B7"}
                    loading={true}
                    margin={20}
                  />
                </div>
              )}
          </TotalUnique>
        </MetricDiv>

        <MetricDiv>
          <Title>Registrations</Title>
          {data.registrations ? (
            <Stat>{data.registrations.toLocaleString()}</Stat>
            ) : (
              <div className="sweet-loading">
                <PulseLoader
                  css={override}
                  size={15}
                  color={"#36D7B7"}
                  loading={true}
                  margin={20}
                />
              </div>
            )}
        </MetricDiv>

    </MetricsContainer>
  )
}

export default Metrics
