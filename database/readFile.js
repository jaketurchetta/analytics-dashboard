const csv = require('csvtojson')
const fs = require('fs')

// Update file path, file name as needed
const filePath = 'database/session_mapping.csv'

csv()
  .fromFile(filePath)
  .then(json => {
    json.forEach(obj => {
      obj.views = 0
      obj.users = 0
    })
    const stringifiedJSON = JSON.stringify(json)
    fs.writeFile('database/sessionMapping.json', stringifiedJSON, err => {
      if (err) {
        console.log(err)
      }
      console.log('The json map was created!')
    })
  })
