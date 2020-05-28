/* global window */

import { configure, addParameters } from "@storybook/web-components";
import { defineCustomElements } from "../../stencil-components/loader/index";

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
    // _SUPER_ basic sorting. The Welcome story comes first :)
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
