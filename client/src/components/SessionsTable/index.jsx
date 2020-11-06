import React, { useState, useEffect, useMemo } from 'react'
import * as d3 from 'd3'
import axios from 'axios'
import styled from 'styled-components'
import { css } from "@emotion/core"
import PulseLoader from "react-spinners/PulseLoader"
import SessionsTable from './SessionsTable.jsx'

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

const Title = styled.h3`
  font-size: 24px;
`

const SessionsTableComponent = ({ dates, instance }) => {

  const [data, setData] = useState({
    sessions: []
  })

  useEffect(() => {
    const queryMixpanel = async () => {

      const topcontent = await axios.post(`/topcontent/${instance}/${dates.start}/${dates.end}`)
        .then(response => response.data)
        .catch(err => console.log(err))

      setData({
        sessions: topcontent
      })

    }

    queryMixpanel()

  }, [dates, instance])

  const columns = useMemo(() => (
    [
        {
          Header: 'Session',
          accessor: 'title',
        },
        {
          Header: 'Total Views',
          accessor: d => d.views.toLocaleString(),
          sortType: (a, b, id, desc) => {
            if (parseInt(a[id], 10) > parseInt(b[id], 10)) return -1
            if (parseInt(b[id], 10) > parseInt(a[id], 10)) return 1
            return 0
          },
        },
        {
          Header: 'Unique Users',
          accessor: 'users'
        },
        // {
        //   Header: 'Average Duration', // Should this be median?
        //   accessor: 'duration'
        // }
      ]
    ), [data.sessions, dates]
  )

  return (
    <Card>
      <Top>
        <Title>Top Sessions</Title>
      </Top>
      {data.sessions.length ? (
        <SessionsTable columns={columns} data={data.sessions} />
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
  )
}

export default SessionsTableComponent