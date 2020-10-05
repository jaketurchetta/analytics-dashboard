import React from 'react'
import SessionsLineChart from './SessionsLineChart.jsx'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fromDate: '2020-09-16',
      toDate: '2020-09-16',
      unit: 'hour',
      sessionPageViews: null,
      bodyWidth: document.body.clientWidth,
      yMax: 400
    }
    window.addEventListener("resize", this.resize().bind(this))
    this.getSessionPageViews = this.getSessionPageViews.bind(this)
  }

  componentDidMount() {
    this.getSessionPageViews()
  }

  getSessionPageViews() {
    MP.api.events("Session Page Views", {
      type: 'general',
      unit: this.state.unit,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    }).done(results => {
      let data = []
      Object.keys(results.values()['Session Page Views']).map(key => {
        data.push({
          date: key.substring(0, 10),
          time: key.substring(11),
          views: results.values()['Session Page Views'][key]
        })
      })
      console.log(Math.max(...Object.values(results.values()['Session Page Views'])) * 1.1)
      this.setState({
        sessionPageViews: data,
        yMax: Math.max(...Object.values(results.values()['Session Page Views'])) * 1.1
       }, console.log(this.state))
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
      <div>
        <p> This is the react part of the application. </p>
        {this.state.sessionPageViews ? (
          <SessionsLineChart
            className="SessionLineChartComponet"
            sessionPageViews={this.state.sessionPageViews}
            width={this.state.bodyWidth}
            height={430}
            xFn={d => d.time}
            yFn={d => d.views}
            yDomain={[0, this.state.yMax]}
            margin={{ top: 20, left: 40, bottom: 20, right: 20 }}
          />
        ) : (
          <p>Data not found.</p>
        )}
      </div>
    )
  }

}

