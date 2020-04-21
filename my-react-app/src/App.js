import React from "react";
import "./App.css";
import { C4Button, C4Heading, C4Container } from "../../react-components";

import { SwatchWrapper } from "./components/swatch-wrapper";

function App() {
  return (
    <div className="App">
      <C4Container contentClass="prose">
        <C4Heading>A React App Consuming Stencil Components</C4Heading>

        <p>
          This button is a web component I created using stencil-js and exported
          for use in a React app.
        </p>

        <C4Button>Hello world!</C4Button>
      </C4Container>
      <C4Container contentClass="prose" containerClass="dark">
        <C4Heading tag="h2">A Themed Container</C4Heading>

        <p>
          This container is using the <code>dark</code> theme modifier.
        </p>

        <C4Button>Hello world!</C4Button>
      </C4Container>

      <SwatchWrapper
        colorsData={[
          { hex: "#215cca", name: "Cloud Blue", id: "123" },
          { hex: "#158466", name: "PNW Green", id: "124" },
          { hex: "#d9118f", name: "PWA Pink", id: "125" },
          { hex: "#f27041", name: "Orange", id: "126" },
          { hex: "#485968", name: "Grey", id: "127" },
        ]}
      ></SwatchWrapper>
    </div>
  );
}

export default App;
