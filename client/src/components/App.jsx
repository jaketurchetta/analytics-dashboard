import React from 'react'
import axios from 'axios'
import { API_SECRET } from '../../../config'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      from_date: '2020-08-01',
      to_date: '2020-10-01',
      event: 'Session Page Views'
    }
    this.getData = this.getData.bind(this)

  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    MP.api.events("Session Page Views", { type: 'general', unit: 'hour', units: 2 }).done(results => console.log("Here", results.values()))
  }

  render() {
    return (
      <div>
        <p> This is the react part of the application. </p>
      </div>
    )
  }

}

