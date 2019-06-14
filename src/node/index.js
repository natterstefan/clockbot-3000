const client = require('./client');
const config = require('./config');

client.on('connect', () => {
  client.publish(config.TOPIC, 'Hello mqtt');
});
