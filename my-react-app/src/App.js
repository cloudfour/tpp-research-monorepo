import React from "react";
import "./App.css";
import { C4Button, C4Heading } from "../../react-components";

function App() {
  return (
    <div className="App">
      <C4Heading>A React App Consuming Stencil Components</C4Heading>

      <p>
        This button is a web component I created using stencil-js and exported
        for use in a React app.
      </p>

      <C4Button>Hello world!</C4Button>
    </div>
  );
}

export default App;
