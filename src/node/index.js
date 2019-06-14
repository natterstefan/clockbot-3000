const client = require('./client');
const config = require('./config');
const os = require('os');

client.on('connect', () => {
  const message = 'Hello mqtt'
  client.publish(config.TOPIC, os.hostname() + ': ' + message);
  client.end();
});
