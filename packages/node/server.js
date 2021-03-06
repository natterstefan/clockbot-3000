/* eslint-disable no-console */
// Only for demonstration. Will be replaced by AWTRIX server

const client = require('./client')
const config = require('./config')

client.subscribe([config.TOPIC, config.TOPIC_DRAW, config.TOPIC_APP], err => {
  if (err) throw err
})

client.on('message', (topic, message) => {
  // message is Buffer
  console.log(Date.now(), topic, message.toString())
})

console.log('server is running 🚀')
