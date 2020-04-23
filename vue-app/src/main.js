// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { applyPolyfills, defineCustomElements } from '../../stencil-components/loader/index.cjs';
import '../../stencil-components/src/css/base.css';

// Let Vue know that anything starting with `c4` is a custom element, not a Vue
// component
Vue.config.ignoredElements = [/c4-\w*/];

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
