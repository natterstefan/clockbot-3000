import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import mqtt from 'mqtt/dist/mqtt.min.js'
import './App.css';

// docs: https://www.npmjs.com/package/mqtt#browser
const client = mqtt.connect('ws://' + process.env.REACT_APP_HOST)

/**
 * Docs blueforcer:
 * - https://docs.blueforcer.de/#/v2/api?id=mqtt-topic
 * - https://docs.blueforcer.de/#/v2/api?id=drawing
 */
function App() {
  const [ power, setPower ] = useState(true)

  useEffect(() => {
    if (!client.connected) {
      client.subscribe([process.env.REACT_APP_TOPIC, process.env.REACT_APP_TOPIC_DRAW])

      client.on("message", function (topic, payload) {
        console.log([topic, payload].join(": "))
      })
    }

    return () => {
      // client.unsubscribe([process.env.REACT_APP_TOPIC, process.env.REACT_APP_TOPIC_DRAW])
      client.end()
    }
  }, [])

  const onClick = () => {
    setPower(!power)
    client.publish(process.env.REACT_APP_TOPIC, JSON.stringify({ power: !power }))
  }

  const onDraw = () => {
    client.publish(process.env.REACT_APP_TOPIC_DRAW, JSON.stringify({
      "repeat": 2,
      "draw": [
        {
          "type": "fill",
          "color": [100, 100, 100]
        },
        {
          "type": "text",
          "string": "#ummahüsla",
          "position": [0, 0],
          "color": [255, 0, 0]
        },
        {
          "type": "show"
        },
        {
          "type": "wait",
          "ms": 3000
        },
        {
          "type": "clear"
        },
        {
          "type": "exit"
        }
      ]
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onClick}>Turn {power ? 'Off' : 'On'}</button>
        <button onClick={onDraw}>Draw</button>
      </header>
    </div>
  );
}

export default App;
