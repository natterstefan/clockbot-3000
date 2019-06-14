import React, { useEffect, useState } from 'react';
// image source: https://www.pexels.com/photo/man-wearing-black-and-blue-mask-costume-1473215/
import logo from './clockbot3000.jpg';
import mqtt from 'mqtt/dist/mqtt.min.js'
import drawAnimatedText from './drawAnimatedText'
import './App.css';

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
        console.log([topic, payload].join(": "))
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
    client.publish(process.env.REACT_APP_TOPIC, JSON.stringify({ power: !power }))
  }

  const onApp = () => {
    // NOTE: change the ScrollSpeed in the webinterface (https://docs.blueforcer.de/#/v2/web)
    // to 100 for better results
    client.publish(process.env.REACT_APP_TOPIC_APP, JSON.stringify({
      name: process.env.REACT_APP_NAME,
      force: true,
      icon: 6,
      text,
      color: [255, 0, 0],
      count: 5
    }))
  }

  const onAnimateText = () => {
    client.publish(
      process.env.REACT_APP_TOPIC_DRAW,
      JSON.stringify({draw: drawAnimatedText(text)})
    );
  };

  const onDraw = () => {
    client.publish(process.env.REACT_APP_TOPIC_DRAW, JSON.stringify({
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
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="buttons">
          <button onClick={onClick}>Turn {power ? 'Off' : 'On'}</button>
          <button onClick={onDraw}>Show #rockit</button>
          <button onClick={onAnimateText}>Animate text</button>
        </div>
        <h2>Enter Text and send to Clock</h2>
        <input type="text" value={text} onChange={onChange} />
        <button onClick={onApp}>Send Text</button>
        <div className="footer">created with ♥ by Team Awesome3000</div>
      </header>
    </div>
  );
}

export default App;
