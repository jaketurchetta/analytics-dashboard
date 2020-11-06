const model = require('../database/model.js')

module.exports = {
  // Line chart
  dailySessionViews: (req, res) => {
    model.dailySessionViews(req.params.instance, req.params.start, req.params.end, res)
  },
  dailyEventViews: (req, res) => {
    model.dailyEventViews(req.params.instance, req.params.start, req.params.end, res)
  },
  // Metrics
  totalSessionViews: (req, res) => {
    model.totalSessionViews(req.params.instance, req.params.start, req.params.end, res)
  },
  totalEventViews: (req, res) => {
    model.totalEventViews(req.params.instance, req.params.start, req.params.end, res)
  },
  uniqueUsers: (req, res) => {
    model.uniqueUsers(req.params.instance, req.params.start, req.params.end, res)
  },
  uniqueLogins: (req, res) => {
    model.uniqueLogins(req.params.instance, req.params.start, req.params.end, res)
  },
  totalLogins: (req, res) => {
    model.totalLogins(req.params.instance, req.params.start, req.params.end, res)
  },
  uniqueRegistrations: (req, res) => {
    model.uniqueRegistrations(req.params.instance, req.params.start, req.params.end, res)
  },
  // Pie charts
  topContent: (req, res) => {
    model.topContent(req.params.instance, req.params.start, req.params.end, res)
  },
  geoCountries: (req, res) => {
    model.geoCountries(req.params.instance, req.params.start, req.params.end, res)
  },
  // Table
}
