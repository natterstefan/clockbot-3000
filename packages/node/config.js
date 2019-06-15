require('dotenv').config()

module.exports = {
  HOST: process.env.HOST,
  TOPIC: process.env.TOPIC,
  TOPIC_DRAW: process.env.TOPIC_DRAW,
  TOPIC_APP: process.env.TOPIC_APP,
}
