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

mongoose.connect('mongodb://contactsdbuser:OGdG9gmSNXNcBP8U@cluster0-shard-00-00-jfcg6.mongodb.net:27017/contacts?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {useNewUrlParse: true})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to mongoDB')

  app.listen(port, () => {
    console.log(`API Server Listening on port ${chalk.green(port)}`)
  })
})

