import React from 'react';
import logo from './logo.svg';
import mqtt from 'mqtt/dist/mqtt.min.js'
import './App.css';

// docs: https://www.npmjs.com/package/mqtt#browser
const client = mqtt.connect('ws://' + process.env.REACT_APP_HOST)

function App() {
  client.subscribe(process.env.REACT_APP_TOPIC)

  const onClick = () => {
    client.publish(process.env.REACT_APP_TOPIC, 'Hello from the Browser.');
  }

  client.on("message", function (topic, payload) {
    alert([topic, payload].join(": "))
    // would stop listening
    // client.end()
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onClick}>Click me to Publish</button>
      </header>
    </div>
  );
}

export default App;
