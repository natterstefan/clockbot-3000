# Clockbot 3000

[![ummahüsla 2019 badge](https://img.shields.io/badge/umah%C3%BCsla%202018-hackathon-brightgreen.svg)](https://uh18.diin.io/)
[![GitHub license](https://img.shields.io/github/license/natterstefan/clockbot-3000.svg)](https://github.com/natterstefan/clockbot-3000/blob/master/LICENCE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/natterstefan/clockbot-3000.svg?style=social)](https://twitter.com/intent/tweet?text=https://github.com/natterstefan/clockbot-3000%20%23ummahüsla)

Stay tuned :alarm_clock:.

## Setup

Install main dependencies

```bash
yarn
```

Setup the react app with:

```bash
cd src/app
yarn
```

Setup the node app with:

```bash
cd src/node
yarn
```

## How to get started

Start the MQTT Broker:

```bash
cd docker
docker-compose up -d
```

Now, start the node app and react server:

```bash
# receives and logs the messages in the terminal
cd src/node && node server

# starts the browser app and can send a message to the mqtt broker
cd src/app && yarn start

# sends a message (in this case "hello") from the terminal to the mqtt broker
cd src/node && node index hello
```
