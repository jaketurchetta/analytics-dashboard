import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import regeneratorRuntime from 'regenerator-runtime'
import { DateTime } from 'luxon'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { css } from "@emotion/core"
import PulseLoader from "react-spinners/PulseLoader"
import LineChartComponent from './LineChart/index.jsx'
import MetricsComponent from './Metrics/index.jsx'
import TopContentDonutChartComponent from './TopContent/DonutChart/index.jsx'
import GeographiesPieChartComponent from './GeographiesPieChart/index.jsx'
import SessionsTableComponent from './TopContent/Table/index.jsx'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 35px;
  margin-bottom: 10px;
  padding-left: 50px;
  padding-right: 50px;
  margin-top: 10px;
`

const SubTitle = styled.h2`
  font-size: 30px;
  font-weight: none;
  margin-top: 0px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid #DCDCDC;
`

const DateDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`

const DateForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DateHeader = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 0px;
`

const Dates = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`

const DateLabel = styled.div`
  margin-right: 5px;
  margin-left: 10px;
`

const RefreshButton = styled.button`
  padding: 15px;
  margin-top: 15px;
  border-radius: 5px;
  border: none;
  background: #87CEFA;
  font-size: 20px;
  font-style: italic;
`

const PieCharts = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 50px;
  margin-bottom: 50px;
`

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

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

const CardTitle = styled.h3`
  font-size: 24px;
`

const App = () => {

  const options = [
    { value: 'summit-2020', label: 'Summit 2020' },
    { value: 'summit-2020-ja', label: 'Summit 2020: Japan' },
    { value: 'summit-2020-apac', label: 'Summit 2020: APAC' },
    { value: 'summit-2020-emea', label: 'Summit 2020: EMEA' },
  ]

  const [dates, setDates] = useState({
    start: '2020-09-29',
    end: '2020-10-31'
  })
  const [fromDate, setFromDate] = useState('2020-09-29 12:00:00')
  const [toDate, setToDate] = useState('2020-10-31 12:00:00')
  const [unit, setUnit] = useState('day')
  const [type, setType] = useState('general')
  const [instance, setInstance] = useState(options[0])

  // Top content data fetch
  const [data, setData] = useState({
    sessions: []
  })

  useEffect(() => {
    const queryMixpanel = async () => {

      const topcontent = await axios.post(`/topcontent/${instance.value}/${dates.start}/${dates.end}`)
        .then(response => response.data.filter(session => session.views > 0))
        .catch(err => console.log(err))

      setData({
        sessions: topcontent
      })

    }

    queryMixpanel()

  }, [dates, instance])

  const handleSubmit = event => {
    event.preventDefault()
    fromSplit = fromDate.split(' ')
    toSplit = toDate.split(' ')
    setDates({
      start: fromSplit[0],
      end: toSplit[0]
    })
  }

  return (
    <Container>
      <Title>The CUBE Event Dashboard</Title>
      <SubTitle>Snowflake Summit 2020</SubTitle>
      <DateHeader>Instance: </DateHeader>
      <Dropdown options={options} onChange={option => setInstance(option)} value={instance} placeholder="Select an instance" />
      <DateDiv>
        <DateForm onSubmit={handleSubmit}>
          <Dates>
            <DateLabel>Start date:</DateLabel>
            <DatePicker id="startDate" selected={new Date(fromDate)} onChange={date => setFromDate(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 12:00:00`)} />
            <DateLabel>End date:</DateLabel>
            <DatePicker id="endDate" selected={new Date(toDate)} onChange={date => setToDate(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 12:00:00`)} />
          </Dates>
          <RefreshButton type="submit">Refresh Data</RefreshButton>
        </DateForm>
      </DateDiv>
      <LineChartComponent dates={dates} instance={instance.value} />
      <MetricsComponent dates={dates} instance={instance.value} />
      <PieCharts>
        <Card>
          <Top>
            <CardTitle>Top Content</CardTitle>
          </Top>
          {data.sessions.length ? (
            <TopContentDonutChartComponent data={data.sessions} />
          ) : (
            <div className="sweet-loading">
              <PulseLoader
                css={override}
                size={30}
                color={"#36D7B7"}
                loading={true}
                marginTop={30}
              />
            </div>
          )}
        </Card>
        <GeographiesPieChartComponent dates={dates} instance={instance.value} />
      </PieCharts>
      <Card>
        <Top>
          <CardTitle>Top Sessions</CardTitle>
        </Top>
        {data.sessions.length ? (
          <SessionsTableComponent data={data.sessions} />
        ) : (
          <div className="sweet-loading">
            <PulseLoader
              css={override}
              size={30}
              color={"#36D7B7"}
              loading={true}
              marginTop={30}
            />
          </div>
        )}
      </Card>
    </Container>
  )
}

export default App
