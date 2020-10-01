const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

// Start Express
const app = express()

// Declare port
const PORT = 3000

// Middleware
app.use( morgan('dev') )
app.use( cors() )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( express.static(__dirname + '/../client/dist') )

// Listen
app.listen(PORT, console.log('Listening on PORT: ', PORT))
