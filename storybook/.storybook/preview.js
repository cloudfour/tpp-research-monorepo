/* global window */

import { configure, addParameters } from "@storybook/web-components";
import { defineCustomElements } from "../../stencil-components/loader/index";

// Apply custom props to theme components
import "../../stencil-components/src/assets/css/custom-props.css";

// Apply base styles to document to match our components
import "../../stencil-components/src/assets/css/document-styles.css";

// Uncomment to override our base custom props and apply an (ugly) theme
// import "../../stencil-components/src/assets/css/theme-example.css";

defineCustomElements();

const getStoryCategory = (story) => story[1].kind.split("/")[0];

addParameters({
  a11y: {
    config: {},
    options: {
      checks: { "color-contrast": { options: { noScroll: true } } },
      restoreScroll: true,
    },
  },
  docs: {
    iframeHeight: "200px",
  },
  options: {
    storySort: (a, b) => {
      const aIsWelcome = getStoryCategory(a) === "Welcome";
      const bIsWelcome = getStoryCategory(b) === "Welcome";
      return bIsWelcome - aIsWelcome;
    },
  },
});

// force full reload to not re-register web components
const req = require.context("../stories", true, /\.stories\.(js|mdx)$/);

configure(req, module);

if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref);
    window.location.reload();
  });
}
