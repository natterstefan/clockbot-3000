# Clockbot 3000

[![ummahüsla 2019 badge](https://img.shields.io/badge/ummah%C3%BCsla%202019-hackathon-brightgreen.svg)](https://uh19.diin.io/)
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

## AWTRIX 2.0

For this project we are installing and setting up an AWTRIX 2.0 (AWesome maTRIX)
DIY intelligent clock. The documentation and partslist is available here: [https://docs.blueforcer.de/#/v2/README](https://docs.blueforcer.de/#/v2/README)

## How to get started

Start the MQTT Broker:

```bash
cd docker
docker-compose up -d
```

Before you start create `.env` files from the `.env.example` ones, and change
the IPs in the `.env` files:

- [.env.example for app](src/app/.env.example)
- [.env.example for node](src/node/.env.example)

Now, start the node app and react server:

```bash
# receives and logs the messages in the terminal
cd src/node && node server

# starts the browser app and can send a message to the mqtt broker
cd src/app && yarn start

# sends a message (in this case "hello") from the terminal to the mqtt broker
cd src/node && node index hello
```

## Twitter

Official Clockbot3000 Twitter account: [https://twitter.com/clockbot3000](https://twitter.com/clockbot3000)

## Licence

[MIT](LICENCE)
