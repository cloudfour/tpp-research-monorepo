// This loads up our global CSS file. It doesn't actually need to be used in your designs.
// You could load theme files to overwrite this.
import "../../stencil-components/src/assets/css/custom-props.css";
import "../../stencil-components/src/assets/css/document-styles.css";
import "../../stencil-components/src/assets/css/utilities.css";

// Uncomment this to apply an (ugly) theme to components
// import "../../stencil-components/src/assets/css/theme-example.css";

import { url } from "framer/resource";
const regularUrl = url("code/fonts/variable-regular.woff2");
const italicUrl = url("code/fonts/variable-italic.woff2");

async function importStylesheets() {
  let css = document.createElement("style");
  css.id = "fonts";
  css.innerHTML = `
    @font-face {
      font-family: "Source Sans Pro Variable";
      font-style: regular;
      src: url("${regularUrl}") format("woff2");
    }

    @font-face {
      font-family: "Source Sans Pro Variable";
      font-style: italic;
      src: url("${italicUrl}") format("woff2");
    }
  `;
  document.head.appendChild(css);
}

if (!document.getElementById("fonts")) {
  importStylesheets();
  console.log("Font stylesheets loaded");
} else {
  console.log("Font stylesheets already loaded");
}
