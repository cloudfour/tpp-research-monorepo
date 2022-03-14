/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import Vue, { PropOptions } from 'vue';
import { createCommonRender, createCommonMethod } from './vue-component-lib/utils';

import type { Components } from '../../stencil-components';




const customElementTags: string[] = [
 'cfour-button',
 'cfour-color-swatches',
 'cfour-columns',
 'cfour-container',
 'cfour-details-lockup',
 'cfour-heading',
 'cfour-product-illustration',
 'cfour-radio-buttons',
 'cfour-star-rating',
 'cfour-stepper',
 'cfour-text',
];
Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];


export const CfourButton = /*@__PURE__*/ Vue.extend({

  props: {
    disabled: {} as PropOptions<Components.CfourButton['disabled']>,
    type: {} as PropOptions<Components.CfourButton['type']>,
    tag: {} as PropOptions<Components.CfourButton['tag']>,
    href: {} as PropOptions<Components.CfourButton['href']>,
    buttonClass: {} as PropOptions<Components.CfourButton['buttonClass']>,
  },


  render: createCommonRender('cfour-button', []),
});


export const CfourColorSwatches = /*@__PURE__*/ Vue.extend({

  props: {
    colorsString: {} as PropOptions<Components.CfourColorSwatches['colorsString']>,
    colorsData: {} as PropOptions<Components.CfourColorSwatches['colorsData']>,
    callback: {} as PropOptions<Components.CfourColorSwatches['callback']>,
    radioName: {} as PropOptions<Components.CfourColorSwatches['radioName']>,
  },


  render: createCommonRender('cfour-color-swatches', ['colorChanged']),
});


export const CfourColumns = /*@__PURE__*/ Vue.extend({

  props: {
    hasGutter: {} as PropOptions<Components.CfourColumns['hasGutter']>,
  },


  render: createCommonRender('cfour-columns', []),
});


export const CfourContainer = /*@__PURE__*/ Vue.extend({

  props: {
    tag: {} as PropOptions<Components.CfourContainer['tag']>,
    isProse: {} as PropOptions<Components.CfourContainer['isProse']>,
    isDark: {} as PropOptions<Components.CfourContainer['isDark']>,
    isTall: {} as PropOptions<Components.CfourContainer['isTall']>,
    isStaggered: {} as PropOptions<Components.CfourContainer['isStaggered']>,
  },


  render: createCommonRender('cfour-container', []),
});


export const CfourDetailsLockup = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('cfour-details-lockup', []),
});


export const CfourHeading = /*@__PURE__*/ Vue.extend({

  props: {
    tag: {} as PropOptions<Components.CfourHeading['tag']>,
  },


  render: createCommonRender('cfour-heading', []),
});


export const CfourProductIllustration = /*@__PURE__*/ Vue.extend({

  props: {
    color: {} as PropOptions<Components.CfourProductIllustration['color']>,
    altText: {} as PropOptions<Components.CfourProductIllustration['altText']>,
    imgPath: {} as PropOptions<Components.CfourProductIllustration['imgPath']>,
    aspectRatio: {} as PropOptions<Components.CfourProductIllustration['aspectRatio']>,
  },


  render: createCommonRender('cfour-product-illustration', []),
});


export const CfourRadioButtons = /*@__PURE__*/ Vue.extend({

  props: {
    optionsString: {} as PropOptions<Components.CfourRadioButtons['optionsString']>,
    optionsData: {} as PropOptions<Components.CfourRadioButtons['optionsData']>,
    callback: {} as PropOptions<Components.CfourRadioButtons['callback']>,
    radioName: {} as PropOptions<Components.CfourRadioButtons['radioName']>,
  },


  render: createCommonRender('cfour-radio-buttons', ['colorChanged']),
});


export const CfourStarRating = /*@__PURE__*/ Vue.extend({

  props: {
    rating: {} as PropOptions<Components.CfourStarRating['rating']>,
    guid: {} as PropOptions<Components.CfourStarRating['guid']>,
    reviewsCount: {} as PropOptions<Components.CfourStarRating['reviewsCount']>,
    reviewsLink: {} as PropOptions<Components.CfourStarRating['reviewsLink']>,
  },


  methods: {
    getRating: createCommonMethod('getRating') as Components.CfourStarRating['getRating'],
  },
  render: createCommonRender('cfour-star-rating', []),
});


export const CfourStepper = /*@__PURE__*/ Vue.extend({

  props: {
    min: {} as PropOptions<Components.CfourStepper['min']>,
    max: {} as PropOptions<Components.CfourStepper['max']>,
    startValue: {} as PropOptions<Components.CfourStepper['startValue']>,
  },


  render: createCommonRender('cfour-stepper', []),
});


export const CfourText = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('cfour-text', []),
});

