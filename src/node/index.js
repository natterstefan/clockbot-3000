const client = require('./client');
const config = require('./config');
const os = require('os');

const message = process.argv.slice(2).join(' ') || 'Hello world';

client.on('connect', () => {
  client.publish(config.TOPIC, os.hostname() + ': ' + message);
  client.end();
});
