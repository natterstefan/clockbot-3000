const path = require('path')
const mqtt = require('mqtt')
const axios = require('axios')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const drawAnimatedText = require('./draw-animated-text')
const drawAnalogClock = require('./draw-analog-clock')

require('dotenv').config({ path: path.resolve(__dirname, '../../node/.env') })

const app = express()

// parse application/json
app.use(bodyParser.json())

// enable all cors requests for the frontend app
app.use(cors())

const client = mqtt.connect(`mqtt://${process.env.HOST}`)

// Declare a route
app.post('/app', (request, res) => {
  switch (request.body.topic) {
    case 'power':
      client.publish(
        process.env.TOPIC,
        JSON.stringify({ power: request.body.data }),
      )
      break

    case 'app':
      client.publish(
        process.env.TOPIC_APP,
        JSON.stringify({
          name: process.env.TOPIC_APP,
          force: true,
          icon: 670, // rocket icon
          text: request.body.data,
          color: [255, 0, 0],
          count: 5,
        }),
      )
      break

    case 'draw':
      client.publish(process.env.TOPIC_DRAW, JSON.stringify(request.body.data))
      break

    case 'animate':
      client.publish(
        process.env.TOPIC_DRAW,
        JSON.stringify({ draw: drawAnimatedText(request.body.data) }),
      )
      break

    case 'analog-clock':
      client.publish(
        process.env.TOPIC_DRAW,
        JSON.stringify({ draw: drawAnalogClock() }),
      )
      break

    default:
      res.status(404).send({ status: 'Topic not found' })
      break
  }

  res.send({
    status: 'OK',
  })
})

app.post(
  '/jokes',
  async (req, res, next) => {
    const result = await axios.get(
      'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
      {
        headers: {
          'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPID_API_TOKEN,
          accept: 'application/json',
        },
      },
    )

    req.joke = result.data.value
    next()
  },
  (req, res) => {
    client.publish(process.env.TOPIC_APP, JSON.stringify({ text: req.joke }))
    res.send({
      status: 'OK',
    })
  },
)

// Run the server!
app.listen(8001, err => {
  if (err) {
    throw err
  }
  // eslint-disable-next-line
  console.log(`API server listening. MQTT Broker: ${process.env.HOST}`)
})
