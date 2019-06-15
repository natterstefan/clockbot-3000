# Clockbot 3000

[![ummahüsla 2019 badge](https://img.shields.io/badge/ummah%C3%BCsla%202019-hackathon-brightgreen.svg)](https://uh19.diin.io/)
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)
[![GitHub license](https://img.shields.io/github/license/natterstefan/clockbot-3000.svg)](https://github.com/natterstefan/clockbot-3000/blob/master/LICENCE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/natterstefan/clockbot-3000.svg?style=social)](https://twitter.com/intent/tweet?text=https://github.com/natterstefan/clockbot-3000%20%23ummahüsla)

Stay tuned :alarm_clock:.

## Setup

Install main dependencies

```bash
yarn
```

[Lerna](https://github.com/lerna/lerna) will install all dependencies in the
packages (eg. [react app](./packages/app)) for you.

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

Now, start the node app and react server with `yarn start`. Lerna will then
start all packages with a `start` script. If you want to start them manually,
execute the following commands.

```bash
# receives and logs the messages in the terminal
cd src/node && node server

# starts the browser app and can send a message to the mqtt broker
cd src/app && yarn start
```

You can test if the mqtt broker and server works, by executing:

```bash
# sends a message (in this case "hello") from the terminal to the mqtt broker
cd src/node && node index hello
```

## How to install dependencies

Add a common dependency to all packages:

```bash
npx lerna add the-dep-name
```

Add a dependency to only one package:

```bash
npx lerna add the-dep-name --scope <package-name>
```

The package-name is the name of a package in it's package.json. For instance:
`mqtt-client` in [packages/node/package.json](./packages/node/package.json).

Add a common devDependency to the root:

```bash
yarn add husky --dev -W
```

## How to remove dependencies

```bash
lerna exec -- yarn remove dep-name
```

## Twitter

Official Clockbot3000 Twitter account: [https://twitter.com/clockbot3000](https://twitter.com/clockbot3000)

## Licence

[MIT](LICENCE)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="http://twitter.com/natterstefan"><img src="https://avatars2.githubusercontent.com/u/1043668?v=4" width="100px;" alt="Stefan Natter"/><br /><sub><b>Stefan Natter</b></sub></a><br /><a href="https://github.com/natterstefan/clockbot-3000/commits?author=natterstefan" title="Code">💻</a> <a href="https://github.com/natterstefan/clockbot-3000/commits?author=natterstefan" title="Documentation">📖</a> <a href="#ideas-natterstefan" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://amann.me"><img src="https://avatars1.githubusercontent.com/u/4038316?v=4" width="100px;" alt="Jan Amann"/><br /><sub><b>Jan Amann</b></sub></a><br /><a href="https://github.com/natterstefan/clockbot-3000/commits?author=amannn" title="Code">💻</a> <a href="https://github.com/natterstefan/clockbot-3000/commits?author=amannn" title="Documentation">📖</a> <a href="#ideas-amannn" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/philipheimboeck"><img src="https://avatars0.githubusercontent.com/u/6714855?v=4" width="100px;" alt="Philip Heimböck"/><br /><sub><b>Philip Heimböck</b></sub></a><br /><a href="https://github.com/natterstefan/clockbot-3000/commits?author=philipheimboeck" title="Code">💻</a> <a href="#ideas-philipheimboeck" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/natterstefan/clockbot-3000/commits?author=philipheimboeck" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/felipep"><img src="https://avatars2.githubusercontent.com/u/358557?v=4" width="100px;" alt="felipep"/><br /><sub><b>felipep</b></sub></a><br /><a href="#talk-felipep" title="Talks">📢</a> <a href="#ideas-felipep" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/barnabasJ"><img src="https://avatars0.githubusercontent.com/u/11669837?v=4" width="100px;" alt="Barnabas Jovanovics"/><br /><sub><b>Barnabas Jovanovics</b></sub></a><br /><a href="#ideas-barnabasJ" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/dornbirndevelops"><img src="https://avatars0.githubusercontent.com/u/25949821?v=4" width="100px;" alt="Alex"/><br /><sub><b>Alex</b></sub></a><br /><a href="#ideas-dornbirndevelops" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/natterstefan/clockbot-3000/commits?author=dornbirndevelops" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

### How to add Contributors

Either with the installed [allcontributors bot](https://allcontributors.org/docs/en/bot/usage)
or with the [allcontributors cli](https://allcontributors.org/docs/en/cli/installation).
The cli is already installed and can be [used like this](https://allcontributors.org/docs/en/bot/usage):

```bash
yarn all-contributors add <username> <emoji-keys>
```

Emoji Key ✨ (and Contribution Types) are available [here](https://allcontributors.org/docs/en/emoji-key).
