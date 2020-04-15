import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// test-component is the name of our made up Web Component that we have
// published to npm:
import {
  applyPolyfills,
  defineCustomElements,
} from "../../stencil-components/loader";

ReactDOM.render(<App />, document.getElementById("root"));

applyPolyfills().then(() => {
  defineCustomElements();
});
