import React, { useEffect, useState } from 'react';
// image source: https://www.pexels.com/photo/man-wearing-black-and-blue-mask-costume-1473215/
import logo from './clockbot3000.jpg';
import mqtt from 'mqtt/dist/mqtt.min.js'
import './App.css';
import axios from 'axios'

// docs: https://www.npmjs.com/package/mqtt#browser
const client = mqtt.connect('ws://' + process.env.REACT_APP_HOST)

/**
 * Docs blueforcer:
 * - https://docs.blueforcer.de/#/v2/api?id=mqtt-topic
 * - https://docs.blueforcer.de/#/v2/api?id=display-informations-in-appstyle
 * - https://docs.blueforcer.de/#/v2/api?id=drawing
 */
function App() {
  const [ power, setPower ] = useState(true)
  const [ text, setText ] = useState('#ummahüsla')

  useEffect(() => {
    if (!client.connected) {
      client.subscribe([
        process.env.REACT_APP_TOPIC,
        process.env.REACT_APP_TOPIC_DRAW,
        process.env.REACT_APP_TOPIC_APP
      ])

      client.on("message", function (topic, payload) {
        console.log([topic, JSON.stringify( JSON.parse(payload), null, 2)].join(": "))
      })
    }

    return () => {
      // client.unsubscribe([process.env.REACT_APP_TOPIC, process.env.REACT_APP_TOPIC_DRAW, REACT_APP_TOPIC_APP])
      client.end()
    }
  }, [])

  const onChange = (e) => {
    setText(e.target.value)
  }

  const onClick = () => {
    setPower(!power)
    axios.post(`${process.env.REACT_APP_API}/app`, { topic: 'power', data: !power });
  }

  const onJoke = () => {
    axios.post(`${process.env.REACT_APP_API}/jokes`);
  }

  const onSend = () => {
    // NOTE: change the ScrollSpeed in the webinterface (https://docs.blueforcer.de/#/v2/web)
    // to 100 for better results
    axios.post(`${process.env.REACT_APP_API}/app`, { topic: 'app', data: text });
  }

  const onAnimateText = () => {
    axios.post(`${process.env.REACT_APP_API}/app`, { topic: 'animate', data: text });
  };

  const onShowAnalogClock = () => {
    axios.post(`${process.env.REACT_APP_API}/app`, { topic: 'analog-clock' });
  };

  const onDraw = () => {
    axios.post(`${process.env.REACT_APP_API}/app`, {
      topic: 'draw',
      data: {
        "repeat": 2,
        "draw": [
          // {
          //   "type": "fill",
          //   "color": [100, 100, 100]
          // },
          {
            "type": "text",
            "string": "#rockit :)",
            "position": [0, 0],
            "color": [255, 0, 0],
          },
          {
            "type": "show"
          },
          {
            "type": "wait",
            "ms": 5000
          },
          {
            "type": "clear"
          },
          {
            "type": "exit"
          }
        ]
      }});
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="buttons">
          <button onClick={onClick}>Turn {power ? 'Off' : 'On'}</button>
          <button onClick={onDraw}>Show #rockit</button>
          <button onClick={onShowAnalogClock}>Show analog clock</button>
          <button onClick={onJoke}>Tell me a joke</button>
        </div>
        <h2>Enter Text and Send to Clock</h2>
        <input type="text" value={text} onChange={onChange} />
        <div className="buttons">
          <button onClick={onSend}>Send Text</button>
          <button onClick={onAnimateText}>Animate text</button>
        </div>
        <div className="footer">
          created with ♥ by <a href="http://bit.ly/2X8YIsc" rel="noopener noreferrer" target="_blank">Team Awesome3000</a>
        </div>
      </header>
    </div>
  );
}

export default App;
