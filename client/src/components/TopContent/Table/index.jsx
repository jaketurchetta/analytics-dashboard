import React, { useState, useEffect, useMemo } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import SessionsTable from './SessionsTable.jsx'

const SessionsTableComponent = ({ data }) => {

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
      ]
    ), [data]
  )

  return <SessionsTable columns={columns} data={data} />

}

export default SessionsTableComponent