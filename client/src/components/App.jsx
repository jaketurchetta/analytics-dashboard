import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import regeneratorRuntime from 'regenerator-runtime'
import sessionMapping from '../../../database/sessionMapping.json'
import SessionsLineChart from './SessionsLineChart.jsx'
import Metrics from './Metrics.jsx'
import TopContentChart from './TopContentChart.jsx'

const PieCharts = styled.div`
  display: flex
  align-items: center
  justify-content: space-evenly
  margin-bottom: 50px
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
  sessionMapping.forEach(map => {
    map.views = mergeObjects(map.views)
  })
  sessionMapping.forEach(item => {
    item.sum = Object.values(item.views).reduce((a, b) => a + b)
  })
  return sessionMapping
}

const App = () => {

  const [data, setData] = useState({
    views: null,
    people: null,
    sessions: null,
    countries: null,
    registrations: null,
    logins: {
      total: null,
      unique: null
    }
  })
  const [fromDate, setFromDate] = useState('2020-08-01')
  const [toDate, setToDate] = useState('2020-10-01')
  const [unit, setUnit] = useState('day')
  const [type, setType] = useState('general')

  const size = useWindowSize()

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
        views: views.json,
        sessions: enhanceSessions(sessions.json),
        countries: countries.json,
        people: people.json,
        registrations: registrations.json,
        logins: {
          total: logins.json,
          unique: uniqueLogins.json
        }
      })

    }

    queryMixpanel()

  }, [])

  console.log(data)

  return (
    <>
      {/* {this.state.sessionPageViews ? (<SessionsLineChart
              className="SessionLineChartComponet"
              sessionPageViews={this.state.sessionPageViews}
              width={this.state.bodyWidth}
              height={430}
              xFn={d => d.time}
              yFn={d => d.views}
              yDomain={[0, this.state.yMax]}
              margin={{ top: 20, left: 40, bottom: 20, right: 20 }}
            />)
        : (<p>Loading sessions chart...</p>)} */}

      {data.views && data.people ? (<Metrics views={data.views} people={data.people}/>)
                                : (<p>Loading key metrics...</p>)}

      <PieCharts>
        {data.sessions ? (<TopContentChart
          sessions={data.sessions}
          width={400}
          height={400}
          innerRadius={120}
          outerRadius={200}
        />)
        : (<p>Loading top content...</p>)}
      </PieCharts>
    </>
  )
}

const useWindowSize = () => {

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}


export default App