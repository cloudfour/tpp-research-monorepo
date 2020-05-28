import React from "react";
import "../../../stencil-components/src/assets/css/custom-props.css";
import "../../../stencil-components/src/assets/css/document-styles.css";
import "../../../stencil-components/src/assets/css/utilities.css";
import SourceSansRegular from "../../../stencil-components/src/assets/fonts/source-sans-pro-latin-extended/variable-regular.woff2";
import SourceSansItalic from "../../../stencil-components/src/assets/fonts/source-sans-pro-latin-extended/variable-italic.woff2";

const fontCSS = `
<style>
  @font-face {
    font-family: "Source Sans Pro Variable";
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url(${SourceSansRegular})
        format("woff2-variations"),
      url(${SourceSansRegular})
        format("woff2");
  }

  @font-face {
    font-family: "Source Sans Pro Variable";
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url(${SourceSansItalic})
        format("woff2-variations"),
      url(${SourceSansItalic})
        format("woff2");
  }
</style>
`;

export default function Wrapper({ children }) {
  document.head.insertAdjacentHTML("beforeend", fontCSS);

  return children;
}
