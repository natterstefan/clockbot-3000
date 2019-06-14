const mqtt = require('mqtt');
const config = require('./config');

const client = mqtt.connect('mqtt://' + config.HOST);

module.exports = client;
