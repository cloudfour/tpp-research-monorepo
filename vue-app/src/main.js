// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

// We shouldn't need to load the custom elements by hand, it should be
// handled by vue-components. However, there's a bug in Stencil's Vue
// output target, which requires this workaround:
// @see https://github.com/ionic-team/stencil-ds-output-targets/issues/77
import {
  applyPolyfills,
  defineCustomElements,
} from '../../stencil-components/loader/index.cjs';

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
