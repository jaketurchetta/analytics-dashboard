const model = require('../database/model.js')

module.exports = {
  // Line chart
  dailySessionViews: (req, res) => {
    model.dailySessionViews(req.params.start, req.params.end, res)
  },
  dailyEventViews: (req, res) => {
    model.dailyEventViews(req.params.start, req.params.end, res)
  },
  // Metrics
  totalSessionViews: (req, res) => {
    model.totalSessionViews(req.params.start, req.params.end, res)
  },
  totalEventViews: (req, res) => {
    model.totalEventViews(req.params.start, req.params.end, res)
  },
  uniqueUsers: (req, res) => {
    model.uniqueUsers(req.params.start, req.params.end, res)
  },
  uniqueLogins: (req, res) => {
    model.uniqueLogins(req.params.start, req.params.end, res)
  },
  totalLogins: (req, res) => {
    model.totalLogins(req.params.start, req.params.end, res)
  },
  uniqueRegistrations: (req, res) => {
    model.uniqueRegistrations(req.params.start, req.params.end, res)
  },
  // Pie charts
  topContent: (req, res) => {
    model.topContent(req.params.start, req.params.end, res)
  },
  geoCountries: (req, res) => {
    model.geoCountries(req.params.start, req.params.end, res)
  },
  // Table
}
