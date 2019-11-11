import React from 'react';
import SignalR from './Components/SignalR';
import MapFactory from "./Components/MapFactory";

function App() {
  return (
    <div className="App">
      <SignalR />
      { new MapFactory().build() }
    </div>
  );
}

export default App;
