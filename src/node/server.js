// Only for demonstration. Will be replaced by AWTRIX server

const client = require('./client');
const config = require('./config');

client.subscribe(config.TOPIC, err => {
  if (err) throw err;
});

client.on('message', (topic, message) => {
  // message is Buffer
  console.log(Date.now(), message.toString());
});

console.log('server is running 🚀')
