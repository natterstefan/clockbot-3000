const path = require('path')
const mqtt = require('mqtt')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config({ path: path.resolve(__dirname, '../../node/.env') })

const app = express()

// parse application/json
app.use(bodyParser.json())

// enable all cors requests for the frontend app
app.use(cors())

const client = mqtt.connect(`mqtt://${process.env.HOST}`)

// Declare a route
app.post('/app', (request, res) => {
  client.publish(
    process.env.TOPIC_APP,
    JSON.stringify({
      name: process.env.TOPIC_APP,
      force: true,
      icon: 670, // rocket icon
      text: request.body.text,
      color: [255, 0, 0],
      count: 5,
    }),
  )

  res.send({
    status: 'OK',
    connected: client.connected,
  })
})

// Run the server!
app.listen(7000, err => {
  if (err) {
    throw err
  }
  // eslint-disable-next-line
  console.log(`API server listening. MQTT Broker: ${process.env.HOST}`)
})
