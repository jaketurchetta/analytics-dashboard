const { URLSearchParams } = require('url')
const fetch = require('node-fetch')
const base64 = require('base-64')
const { API_SECRET } = require('../config')
const sessionMapping = require('../database/sessionMapping.json')
const lookup = require('country-code-lookup')

// JQL queries to Mixpanel database

let url = 'https://mixpanel.com/api/2.0/jql'

module.exports = {

  // Line chart
  dailySessionViews: (instance, start, end, res) => {
    const encodedParams = new URLSearchParams()
    encodedParams.set('script', `function main() { return Events({ from_date: '${start}',  to_date: '${end}' }).filter(event => event.name === "Session Page Views" && event.properties["event name"] === '${instance}').groupBy([mixpanel.numeric_bucket('time', mixpanel.daily_time_buckets)], mixpanel.reducer.count()) }`)
    encodedParams.set('params', '{ "scriptParam": "paramValue" }')
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(API_SECRET + ':')
      },
      body: encodedParams.toString()
    }
    fetch(url, options)
      .then(result => result.json())
      .then(json => {
        let data = lineChartArrays(json)
        res.send(data)
      })
      .catch(err => console.error('error:' + err))
  },

  dailyEventViews: (instance, start, end, res) => {
    const encodedParams = new URLSearchParams()
    encodedParams.set('script', `function main() { return Events({ from_date: '${start}',  to_date: '${end}' }).filter(event => event.name === "Event Page Views" && event.properties["event name"] === '${instance}').groupBy([mixpanel.numeric_bucket('time', mixpanel.daily_time_buckets)], mixpanel.reducer.count()) }`)
    encodedParams.set('params', '{ "scriptParam": "paramValue" }')
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(API_SECRET + ':')
      },
      body: encodedParams.toString()
    }
    fetch(url, options)
      .then(result => result.json())
      .then(json => {
        let data = lineChartArrays(json)
        res.send(data)
      })
      .catch(err => console.error('error:' + err))
  },

  // Metrics
  totalSessionViews: (instance, start, end, res) => {
    const encodedParams = new URLSearchParams()
    encodedParams.set('script', `function main() { return Events({ from_date: '${start}',  to_date: '${end}' }).filter(event => event.name === "Session Page Views" && event.properties["event name"] === '${instance}').groupBy(["name"], mixpanel.reducer.count()) }`)
    encodedParams.set('params', '{ "scriptParam": "paramValue" }')
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(API_SECRET + ':')
      },
      body: encodedParams.toString()
    }
    fetch(url, options)
      .then(result => result.json())
      .then(json => res.send(json))
      .catch(err => console.error('error:' + err))
  },

  totalEventViews: (instance, start, end, res) => {
    const encodedParams = new URLSearchParams()
    encodedParams.set('script', `function main() { return Events({ from_date: '${start}',  to_date: '${end}' }).filter(event => event.name === "Event Page Views" && event.properties["event name"] === '${instance}').groupBy(["name"], mixpanel.reducer.count()) }`)
    encodedParams.set('params', '{ "scriptParam": "paramValue" }')
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(API_SECRET + ':')
      },
      body: encodedParams.toString()
    }
    fetch(url, options)
      .then(result => result.json())
      .then(json => res.send(json))
      .catch(err => console.error('error:' + err))
  },

  uniqueUsers: (instance, start, end, res) => {
    const encodedParams = new URLSearchParams()
    encodedParams.set('script', `function main() { return Events({ from_date: '${start}',  to_date: '${end}' }).filter(event => (event.name === "Event Page Views" || event.name === "Session Page Views") && event.properties["event name"] === '${instance}').groupByUser(["properties.$email"], mixpanel.reducer.count()) }`)
    encodedParams.set('params', '{ "scriptParam": "paramValue" }')
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(API_SECRET + ':')
      },
      body: encodedParams.toString()
    }
    fetch(url, options)
      .then(result => result.json())
      .then(json => res.send(json))
      .catch(err => console.error('error:' + err))
  },

  uniqueLogins: (instance, start, end, res) => {
    const encodedParams = new URLSearchParams()
    encodedParams.set('script', `function main() { return Events({ from_date: '${start}',  to_date: '${end}' }).filter(event => event.name === "Completed Sign In" && event.properties["Event"] === '${instance}').groupByUser(["properties.email"], mixpanel.reducer.null()).groupBy([mixpanel.slice("key", 0)], mixpanel.reducer.count()) }`)
    encodedParams.set('params', '{ "scriptParam": "paramValue" }')
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(API_SECRET + ':')
      },
      body: encodedParams.toString()
    }
    fetch(url, options)
      .then(result => result.json())
      .then(json => res.send(json))
      .catch(err => console.error('error:' + err))
  },

  totalLogins: (instance, start, end, res) => {
    const encodedParams = new URLSearchParams()
    encodedParams.set('script', `function main() { return Events({ from_date: '${start}',  to_date: '${end}' }).filter(event => event.name === "Completed Sign In" && event.properties["Event"] === '${instance}').groupBy(["name"], mixpanel.reducer.count()) }`)
    encodedParams.set('params', '{ "scriptParam": "paramValue" }')
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(API_SECRET + ':')
      },
      body: encodedParams.toString()
    }
    fetch(url, options)
      .then(result => result.json())
      .then(json => res.send(json))
      .catch(err => console.error('error:' + err))
  },

  uniqueRegistrations: (instance, start, end, res) => {
    const encodedParams = new URLSearchParams()
    encodedParams.set('script', `function main() { return Events({ from_date: '${start}',  to_date: '${end}' }).filter(event => event.name === "Completed Sign Up" && event.properties["Event"] === '${instance}').groupByUser(["properties.Email"], mixpanel.reducer.null()).groupBy([mixpanel.slice("key", 1)], mixpanel.reducer.count()) }`)
    encodedParams.set('params', '{ "scriptParam": "paramValue" }')
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(API_SECRET + ':')
      },
      body: encodedParams.toString()
    }
    fetch(url, options)
      .then(result => result.json())
      .then(json => {
        console.log(json)
        res.send(json)
      })
      .catch(err => console.error('error:' + err))
  },

  // Pie charts
  topContent: (instance, start, end, res) => {
    const encodedParams = new URLSearchParams()
    encodedParams.set('script', `function main() { return Events({ from_date: '${start}',  to_date: '${end}' }).filter(event => event.name === "Session Page Views" && event.properties["event name"] === '${instance}').groupBy(["properties.$current_url"], mixpanel.reducer.count()) }`)
    encodedParams.set('params', '{ "scriptParam": "paramValue" }')
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(API_SECRET + ':')
      },
      body: encodedParams.toString()
    }
    fetch(url, options)
      .then(result => result.json())
      .then(json => {
        let data = sumSessions(json)
        res.send(data)
      })
      .catch(err => console.error('error:' + err))
  },

  geoCountries: (instance, start, end, res) => {
    const encodedParams = new URLSearchParams()
    encodedParams.set('script', `function main() { return Events({ from_date: '${start}',  to_date: '${end}' }).filter(event => (event.name === "Session Page Views" || event.name === "Event Page Views") && event.properties["event name"] === '${instance}').groupBy(["properties.mp_country_code"], mixpanel.reducer.count()).sortDesc('value') }`)
    encodedParams.set('params', '{ "scriptParam": "paramValue" }')
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(API_SECRET + ':')
      },
      body: encodedParams.toString()
    }
    fetch(url, options)
      .then(result => result.json())
      .then(json => {
        let data = formatCountries(json)
        res.send(data)
      })
      .catch(err => console.error('error:' + err))
  },

  // Table

}

// Helpers

const lineChartArrays = json => {
  json.forEach(obj => {
    for (let key in obj) {
      if (key === 'key') {
        Object.defineProperty(obj, 'time', Object.getOwnPropertyDescriptor(obj, 'key'))
        obj.time = obj.time[0]
        delete obj['key']
      }
      if (key === 'value') {
        Object.defineProperty(obj, 'views', Object.getOwnPropertyDescriptor(obj, 'value'))
        delete obj['value']
      }
    }
  })
  return json
}

const sumSessions = json => {
  json.forEach(obj => {
    sessionMapping.forEach(map => {
      if (obj.key[0] && obj.key[0].indexOf(map.id) > -1) {
        map.views += obj.value
      }
    })
  })
  sessionMapping.sort((a, b) => b.views - a.views)
  return sessionMapping
}

const formatCountries = json => {
  json.forEach(obj => {
    for (let key in obj) {
      if (key === 'key') {
        Object.defineProperty(obj, 'code', Object.getOwnPropertyDescriptor(obj, 'key'))
        obj.code = obj.code[0]
        delete obj['key']
      }
      if (key === 'value') {
        Object.defineProperty(obj, 'views', Object.getOwnPropertyDescriptor(obj, 'value'))
        delete obj['value']
      }
    }
    if (obj.code !== undefined && obj.code !== null) {
      obj.country = lookup.byIso(obj.code).country
      obj.region = lookup.byIso(obj.code).region
    } else {
      obj.country = 'N/A'
      obj.region = 'N/A'
    }
  })
  return json
}
