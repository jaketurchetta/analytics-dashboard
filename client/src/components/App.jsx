import React from 'react'
import styled from 'styled-components'
import SessionsLineChart from './SessionsChart/SessionsLineChart.jsx'
import Metrics from './Metrics/Metrics.jsx'
import TopContentChart from './TopContent/TopContentChart.jsx'
import { sessionsMap } from './TopContent/helper'

const PieCharts = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 50px;

`

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fromDate: '2020-09-16',
      toDate: '2020-09-16',
      unit: 'hour',
      sessionPageViews: null,
      sessionsMap: sessionsMap,
      topContent: null,
      bodyWidth: document.body.clientWidth,
      yMax: 400
    }
    window.addEventListener("resize", this.resize().bind(this))
    this.getSessionPageViews = this.getSessionPageViews.bind(this)

  }

  componentDidMount() {
    this.getTopContent()
    this.getSessionPageViews()
  }

  // Session Page Views Chart
  getSessionPageViews() {
    MP.api.events("Session Page Views", {
      type: 'general',
      unit: this.state.unit,
      from_date: this.state.fromDate,
      to_date: this.state.toDate
    }).done(results => {
      let data = []
      Object.keys(results.values()['Session Page Views']).map(key => {
        const datetime = new Date(key.substring(0,4), key.substring(5,7) - 1, key.substring(8,10), key.substring(11,13), key.substring(14,16))
        data.push({
          datetime: datetime,
          date: key.substring(0, 10),
          time: datetime.getTime(),
          views: results.values()['Session Page Views'][key]
        })
      })
      this.setState({
        sessionPageViews: data,
        yMax: Math.max(...Object.values(results.values()['Session Page Views'])) * 1.1
       }, console.log(this.state))
    })
  }

  // Top Content Chart
  getTopContent() {
    MP.api.jql(
      function main() {
        return Events({
          from_date: '2020-08-01',
          to_date:   '2020-10-01'
        })
        .filter(event =>  event.name == "Session Page Views")
        .groupBy(["properties.$current_url"], mixpanel.reducer.count());
    }).done(results => {
      Object.keys(sessionsMap).forEach(id => {
        results.forEach(obj => {
          if (obj.key[0] && obj.key[0].indexOf(id) > -1) {
            sessionsMap[id].views += obj.value
          }
        })
      })
      let topContent = []
      for (const key in sessionsMap) {
        topContent.push(sessionsMap[key])
      }
      console.log(topContent)
      this.setState({
        sessionsMap: sessionsMap,
        topContent: topContent
      })
    })
  }

  resize() {
    let t
    return event => {
      if (t !== false) {
        clearTimeout(t)
      }
      t = setTimeout(() => {
        const state = Object.assign(this.state, {
          bodyWidth: document.body.clientWidth
        })
        this.setState(state)
      }, 100)
    }
  }

  render() {
    return (
      <>
        {this.state.sessionPageViews ? (<SessionsLineChart
                                          className="SessionLineChartComponet"
                                          sessionPageViews={this.state.sessionPageViews}
                                          width={this.state.bodyWidth}
                                          height={430}
                                          xFn={d => d.time}
                                          yFn={d => d.views}
                                          yDomain={[0, this.state.yMax]}
                                          margin={{ top: 20, left: 40, bottom: 20, right: 20 }}
                                        />)
                                    : (<p>Loading sessions chart.</p>)}
        <Metrics />
        <PieCharts>
          {this.state.topContent ? (<TopContentChart
                                      data={this.state.topContent}
                                      width={400}
                                      height={400}
                                      innerRadius={120}
                                      outerRadius={200}
                                    />)
                                : (<p>Loading top content</p>)}
        </PieCharts>


      </>
    )
  }

}

