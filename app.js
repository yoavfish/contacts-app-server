const {contactRouter} = require('./routes/contactRouter')
const express = require('express')
const path = require('path')
const chalk = require('chalk')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('tiny'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log('we have a get request')
})

app.use('/api/contacts', contactRouter)

mongoose.connect('mongodb://localhost:27017/contacts', {useNewUrlParse: true})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to mongoDB')

  app.listen(port, () => {
    console.log(`API Server Listening on port ${chalk.green(port)}`)
  })
})

