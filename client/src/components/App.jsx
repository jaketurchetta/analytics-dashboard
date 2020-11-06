import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import regeneratorRuntime from 'regenerator-runtime'
import { DateTime } from 'luxon'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import LineChartComponent from './LineChart/index.jsx'
import MetricsComponent from './Metrics/index.jsx'
import TopContentDonutChartComponent from './TopContentDonutChart/index.jsx'
import GeographiesPieChartComponent from './GeographiesPieChart/index.jsx'
import SessionsTableComponent from './SessionsTable/index.jsx'

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
  margin-top: 10px;
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

  const handleSubmit = event => {
    event.preventDefault()
    setDates({
      start: fromDate,
      end: toDate
    })
  }

  return (
    <Container>
      <Title>The CUBE Event Dashboard</Title>
      <SubTitle>Snowflake Summit 2020</SubTitle>
      <DateHeader>Instance: </DateHeader>
      <Dropdown options={options} onChange={option => setInstance(option.value)} value={options[0]} placeholder="Select an instance" />
      <DateDiv>
        <DateForm onSubmit={handleSubmit}>
          <Dates>
            <DateLabel>Start date:</DateLabel>
            <DatePicker id="startDate" selected={new Date(fromDate)} onChange={date => setFromDate(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)} />
            <DateLabel>End date:</DateLabel>
            <DatePicker id="endDate" selected={new Date(toDate)} onChange={date => setToDate(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)} />
          </Dates>
          <RefreshButton type="submit">Refresh Data</RefreshButton>
        </DateForm>
      </DateDiv>
      <LineChartComponent dates={dates} instance={instance.value} />
      {/* <MetricsComponent dates={dates} instance={instance.value} />
      <PieCharts>
        <TopContentDonutChartComponent dates={dates} instance={instance.value} />
        <GeographiesPieChartComponent dates={dates} instance={instance.value} />
      </PieCharts>
      <SessionsTableComponent dates={dates} instance={instance.value} /> */}
    </Container>
  )
}

export default App
