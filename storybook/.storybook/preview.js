/* global window */

import { configure, addParameters } from '@storybook/web-components';
import { defineCustomElements } from '../../stencil-components/loader/index';
import '../../stencil-components/src/css/base.css';

defineCustomElements();

addParameters({
  a11y: {
    config: {},
    options: {
      checks: { 'color-contrast': { options: { noScroll: true } } },
      restoreScroll: true,
    },
  },
  docs: {
    iframeHeight: '200px',
  },
});

// force full reload to not re-register web components
const req = require.context('../stories', true, /\.stories\.(js|mdx)$/);

configure(req, module);

if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref);
    window.location.reload();
  });
}