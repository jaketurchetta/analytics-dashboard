import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { css } from "@emotion/core"
import PulseLoader from "react-spinners/PulseLoader"
import LineChart from './LineChart.jsx'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Card = styled.div`
  border-radius: 30px;
  background: #ffffff;
  box-shadow:  35px 35px 70px #c9c9c9,
              -35px -35px 70px #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
  padding-top: 10px;
  margin: 50px 0px;
`

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid #DCDCDC;
`

const Title = styled.h3`
  font-size: 24px;
`


const LineChartComponent = ({ dates }) => {

  const [data, setData] = useState({
    sessions: [],
    events: []
  })

  useEffect(() => {

    const queryMixpanel = async () => {

      const dailySessionViews = await axios.post(`/views/sessions/${dates.start}/${dates.end}`)
        .then(response => response.data)
        .catch(err => console.log(err))

      const dailyEventViews = await axios.post(`/views/events/${dates.start}/${dates.end}`)
        .then(response => response.data)
        .catch(err => console.log(err))

      setData({
        sessions: dailySessionViews,
        events: dailyEventViews
      })

    }

    queryMixpanel()

  }, [dates])

  return (
    <Card>
      <Top>
        <Title>Views over time</Title>
      </Top>
      {data.sessions.length && data.events.length ? (
        <LineChart
          data={data}
          positionX={d => d.time}
          positionY={d => d.views}
          xFn={d => d.time}
          yDomain={[0, data.yMax]}
        />
      ) : (
        <div className="sweet-loading">
          <PulseLoader
            css={override}
            size={30}
            color={"#36D7B7"}
            loading={true}
            margin={20}
          />
        </div>
      )}
    </Card>
  )

}

export default LineChartComponent
