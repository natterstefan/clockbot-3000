import React from 'react';
import logo from './logo.svg';
// import mqtt from 'mqtt'
import './App.css';

// const client = mqtt.connect('ws://' + process.env.REACT_APP_HOST)

function App() {
  const onClick = () => {
    // client.on('connect', () => {
    //   client.publish(process.env.REACT_APP_TOPIC, 'hello from CRA');
    //   client.end();
    // });
  }

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
