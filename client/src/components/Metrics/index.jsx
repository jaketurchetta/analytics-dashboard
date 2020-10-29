import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Metrics from './Metrics.jsx'

const MetricsComponent = ({ dates }) => {

  const [data, setData] = useState({
    views: {
      event: null,
      session: null
    },
    users: null,
    logins: {
      unique: null,
      total: null
    },
    registrations: null
  })

  useEffect(() => {
    const queryMixpanel = async () => {

      const sessionViews = await axios.post(`/views/sessions/total/${dates.start}/${dates.end}`)
        .then(response => response.data[0].value)
        .catch(err => console.log(err))

      const eventViews = await axios.post(`/views/events/total/${dates.start}/${dates.end}`)
        .then(response => response.data[0].value)
        .catch(err => console.log(err))

      const uniqueUsers = await axios.post(`/users/unique/${dates.start}/${dates.end}`)
        .then(response => response.data.length)
        .catch(err => console.log(err))

      const uniqueLogins = await axios.post(`/logins/unique/${dates.start}/${dates.end}`)
        .then(response => response.data.length)
        .catch(err => console.log(err))

      const totalLogins = await axios.post(`/logins/total/${dates.start}/${dates.end}`)
        .then(response => response.data[0].value)
        .catch(err => console.log(err))

      const uniqueRegistrations = await axios.post(`/registrations/unique/${dates.start}/${dates.end}`)
        .then(response => response.data[0].value)
        .catch(err => console.log(err))

      setData({
        views: {
          event: eventViews,
          session: sessionViews
        },
        users: uniqueUsers,
        logins: {
          unique: uniqueLogins,
          total: totalLogins
        },
        registrations: uniqueRegistrations
      })
    }

    queryMixpanel()

  }, [dates])

  return (
    <Metrics data={data} />
  )

}

export default MetricsComponent
