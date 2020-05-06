'use strict'

const express = require('express')
const app = express()

app.use('/public', express.static('public'))

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(8080, function() {
  console.log('Listening on port 8080! Insert localhost:8080 in Storyblok')
})
