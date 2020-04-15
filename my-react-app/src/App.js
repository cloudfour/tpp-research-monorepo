import React from "react";
import "./App.css";
import { C4Button } from "c4-react-components";

function App() {
  return (
    <div className="App">
      <h1>A React App Consuming Stencil Components</h1>

      <p>
        This button is a web component I created using stencil-js and exported
        for use in a React app.
      </p>
      <C4Button>Hello world!</C4Button>
    </div>
  );
}

export default App;
