import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import regeneratorRuntime from 'regenerator-runtime'
import sessionMapping from '../../../database/sessionMapping.json'
import SessionsLineChart from './SessionsLineChart/SessionsLineChart.jsx'
import Metrics from './Metrics.jsx'
import TopContentDonutChart from './TopContentDonutChart/TopContentDonutChart.jsx'
import GeographiesPieChart from './GeographiesPieChart/GeographiesPieChart.jsx'
import SessionsTable from './SessionsTable.jsx'


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

const SubTitle = styled.h1`
  font-size: 30px;
  font-weight: none;
  margin-top: 0px;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 50px;
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

const mergeObjects = data => {
  const result = {}
  data.forEach(basket => {
    let sum
    for (let [key, value] of Object.entries(basket)) {
      if (result[key]) {
        result[key] += value
      } else {
        result[key] = value
      }
    }
  })
  return result
}

const enhanceSessions = json => {
  Object.keys(json).forEach(key => {
    sessionMapping.forEach(map => {
      if (key.indexOf(map.id) > -1) {
        map.views.push(json[key])
      }
    })
  })
  sessionMapping.forEach(map => map.views = mergeObjects(map.views))
  sessionMapping.forEach(item => item.sum = Object.values(item.views).reduce((a, b) => a + b))
  sessionMapping.sort((a, b) => b.sum - a.sum)
  return sessionMapping
}

const enhanceViews = json => {
  json.formatted = []
  Object.keys(json['Session Page Views']).map(key => {
    const datetime = new Date(key.substring(0,4), key.substring(5,7) - 1, key.substring(8,10), key.substring(11,13), key.substring(14,16))
    json.formatted.push({
      datetime: datetime,
      date: key.substring(0, 10),
      time: datetime.getTime(),
      views: json['Session Page Views'][key]
    })
  })
  json.formatted.sort((a, b) => a.time - b.time)
  const yMax = Math.max(...Object.values(json['Session Page Views'])) * 1.1
  return { json: json, yMax: yMax }
}

const App = () => {

  const [data, setData] = useState({
    views: null,
    people: null,
    sessions: null,
    geographies: null,
    registrations: null,
    logins: {
      total: null,
      unique: null
    },
    yMax: 400
  })
  const [fromDate, setFromDate] = useState('2020-09-01')
  const [toDate, setToDate] = useState('2020-09-30')
  const [unit, setUnit] = useState('day')
  const [type, setType] = useState('general')

  useEffect(() => {
    const queryMixpanel = async () => {

      // Views data (Session, Event)
      const views = await MP.api.events("Session Page Views", "Event Page Views", {
        type: type,
        unit: unit,
        from_date: fromDate,
        to_date: toDate
      })

      // Top content
      const sessions = await MP.api.segment("Session Page Views", "$current_url", {
        from_date: fromDate,
        to_date: toDate
      })

      // Total unique users (all time)
      const people = await MP.api.people({
        type: "unique"
      })

      // Unique registrations
      const registrations = await MP.api.events("Completed Sign Up", {
        from_date: fromDate,
        to_date: toDate,
        type: "unique"
      })

      // Total logins
      const logins = await MP.api.events("Completed Sign In", {
        from_date: fromDate,
        to_date: toDate,
        unit: unit,
        type: type
      })

      // Unique logins
      const uniqueLogins = await MP.api.events("Completed Sign In", {
        from_date: fromDate,
        to_date: toDate,
        unit: unit,
        type: "unique"
      })

      // Geo session starts
      const countries = await MP.api.segment("Session Page Views", "mp_country_code", {
        from_date: fromDate,
        to_date: toDate,
        type: type
      })

      setData({
        views: enhanceViews(views.json).json,
        sessions: enhanceSessions(sessions.json),
        geographies: countries.json,
        people: people.json,
        registrations: registrations.json,
        logins: {
          total: logins.json,
          unique: uniqueLogins.json
        },
        yMax: enhanceViews(views.json).yMax
      })

    }

    queryMixpanel()

  }, [])

  const columns = useMemo(() => (
      [
          {
            Header: 'Session',
            accessor: 'title',
          },
          {
            Header: 'Total Views',
            accessor: d => d.sum.toLocaleString(),
            sortType: (a, b, id, desc) => {
              if (parseInt(a[id], 10) > parseInt(b[id], 10)) return -1
              if (parseInt(b[id], 10) > parseInt(a[id], 10)) return 1
              return 0
            },
          },
          // {
          //   Header: 'Unique Users',
          //   accessor: 'users'
          // },
          // {
          //   Header: 'Average Duration', // Should this be median?
          //   accessor: 'duration'
          // }
        ]
    ), []
  )

  return (
    <Container>
      <Title>The CUBE Event Dashboard</Title>
      <SubTitle>Mirantis Launchpad 2020</SubTitle>
      {data.views ? (<SessionsLineChart
          data={data.views.formatted}
          xFn={d => d.time}
          yFn={d => d.views}
          yDomain={[0, data.yMax]}
          width={800}
          height={430}
          margin={{ top: 20, left: 40, bottom: 20, right: 20 }}
        />)
        : (<p>Loading sessions chart...</p>)}

      {data.views && data.people && data.logins.total && data.logins.unique && data.registrations ? (<Metrics
        views={data.views}
        people={data.people}
        totalLogins={Object.values(data.logins.total["Completed Sign In"])}
        uniqueLogins={Object.values(data.logins.unique["Completed Sign In"])}
        registrations={Object.values(data.registrations["Completed Sign Up"])}
      />)
      : (<p>Loading key metrics...</p>)}

      <PieCharts>
        {data.sessions && data.views ? (<TopContentDonutChart
            sessions={data.sessions}
            views={data.views}
            width={550}
            height={550}
            radius={250}
            x={175}
            y={120}
          />)
        : (<p>Loading top content...</p>)}
        {data.geographies ? (<GeographiesPieChart
          geographies={data.geographies}
          views={data.views}
          width={550}
          height={550}
          radius={250}
          x={175}
          y={120}
        />)
        : (<p>Loading countries...</p>)}
      </PieCharts>

      {data.sessions ? (<SessionsTable columns={columns} data={data.sessions} />)
      : (<p>Loading sessions table...</p>)}

    </Container>
  )
}


export default App
