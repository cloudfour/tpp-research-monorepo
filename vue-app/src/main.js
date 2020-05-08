// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { applyPolyfills, defineCustomElements } from '../../stencil-components/loader/index.cjs';

// Apply custom props to theme components
import '../../stencil-components/src/assets/css/custom-props.css';

// Apply base styles to document to match our components
import '../../stencil-components/src/assets/css/document-styles.css';

// Uncomment to override our base custom props and apply an (ugly) theme
// import "../../stencil-components/src/assets/css/theme-example.css";

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
