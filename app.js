const contactRouter = require('./routes/contactRouter')
const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
const connectionString = process.env.MONGO_CONNECTION_STRING

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use('/api/contacts', contactRouter)

mongoose.connect(connectionString, {useNewUrlParse: true})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(`Connected to ${chalk.green('mongoDB')}`)

  app.listen(port, () => {
    console.log(`API Server Listening on port ${chalk.green(port)}`)
  })
})

