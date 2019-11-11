import React from 'react';
import MapFactory from "./Components/MapFactory";

function App() {
  return (
    <div className="App">
      { new MapFactory().build() }
    </div>
  );
}

export default App;
