const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const axios = require('axios')
const base64 = require('base-64')
const { API_SECRET } = require('../config')

// Controller
const Controller = require('./controller')

// Start Express
const app = express()

// Declare port
const PORT = 3000

// Middleware
app.use( morgan('dev') )
  .use( cors() )
  .use( bodyParser.json() )
  .use( bodyParser.urlencoded({ extended: true }) )
  .use( express.static(__dirname + '/../client/dist') )

// Routes

// Line chart
app.post('/views/sessions/:instance/:start/:end', Controller.dailySessionViews)
app.post('/views/events/:instance/:start/:end', Controller.dailyEventViews)

// Metrics
app.post('/views/sessions/total/:instance/:start/:end', Controller.totalSessionViews)
app.post('/views/events/total/:instance/:start/:end', Controller.totalEventViews)
app.post('/users/unique/:instance/:start/:end', Controller.uniqueUsers)
app.post('/logins/unique/:instance/:start/:end', Controller.uniqueLogins)
app.post('/logins/total/:instance/:start/:end', Controller.totalLogins)
app.post('/registrations/unique/:instance/:start/:end', Controller.uniqueRegistrations)

// Pie charts
app.post('/topcontent/:instance/:start/:end', Controller.topContent)
app.post('/geographies/countries/:instance/:start/:end', Controller.geoCountries)

// Listen
app.listen(PORT, console.log('Listening on PORT: ', PORT))
