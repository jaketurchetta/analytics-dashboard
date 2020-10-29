import React, { useState, useEffect, useRef, useContext } from 'react'
import * as d3 from 'd3'
import axios from 'axios'
import styled from 'styled-components'
import { css } from "@emotion/core"
import PulseLoader from "react-spinners/PulseLoader"
import TopContentDonutChart from './TopContentDonutChart.jsx'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const Card = styled.div`
  padding-top: 10px;
  border-radius: 30px;
  background: #ffffff;
  box-shadow:  35px 35px 70px #c9c9c9,
              -35px -35px 70px #ffffff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0px;
`

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid #DCDCDC;
  margin-bottom: 40px;
  margin: 0px 40px;
`

const Title = styled.h3`
  font-size: 24px;
`

const TopContentDonutChartComponent = ({ dates }) => {

  const [data, setData] = useState({
    sessions: []
  })

  useEffect(() => {
    const queryMixpanel = async () => {

      const topcontent = await axios.post(`/topcontent/${dates.start}/${dates.end}`)
        .then(response => response.data)
        .catch(err => console.log(err))

      setData({
        sessions: topcontent
      })

    }

    queryMixpanel()

  }, [dates])

  return (
    <Card>
      <Top>
        <Title>Top Content</Title>
      </Top>
      {data.sessions.length ? (
        <TopContentDonutChart data={data} />
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

export default TopContentDonutChartComponent