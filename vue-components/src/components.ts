/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import Vue, { PropOptions } from 'vue';
import { createCommonRender, createCommonMethod } from './vue-component-lib/utils';

import type { Components } from '../../stencil-components';




const customElementTags: string[] = [
 'c4-button',
 'c4-color-swatches',
 'c4-columns',
 'c4-container',
 'c4-details-lockup',
 'c4-heading',
 'c4-product-illustration',
 'c4-radio-buttons',
 'c4-star-rating',
 'c4-stepper',
 'c4-text',
];
Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];


export const C4Button = /*@__PURE__*/ Vue.extend({

  props: {
    disabled: {} as PropOptions<Components.C4Button['disabled']>,
    type: {} as PropOptions<Components.C4Button['type']>,
    tag: {} as PropOptions<Components.C4Button['tag']>,
    href: {} as PropOptions<Components.C4Button['href']>,
    buttonClass: {} as PropOptions<Components.C4Button['buttonClass']>,
  },


  render: createCommonRender('c4-button', []),
});


export const C4ColorSwatches = /*@__PURE__*/ Vue.extend({

  props: {
    colorsString: {} as PropOptions<Components.C4ColorSwatches['colorsString']>,
    colorsData: {} as PropOptions<Components.C4ColorSwatches['colorsData']>,
    callback: {} as PropOptions<Components.C4ColorSwatches['callback']>,
    radioName: {} as PropOptions<Components.C4ColorSwatches['radioName']>,
  },


  render: createCommonRender('c4-color-swatches', ['colorChanged']),
});


export const C4Columns = /*@__PURE__*/ Vue.extend({

  props: {
    hasGutter: {} as PropOptions<Components.C4Columns['hasGutter']>,
  },


  render: createCommonRender('c4-columns', []),
});


export const C4Container = /*@__PURE__*/ Vue.extend({

  props: {
    tag: {} as PropOptions<Components.C4Container['tag']>,
    isProse: {} as PropOptions<Components.C4Container['isProse']>,
    isDark: {} as PropOptions<Components.C4Container['isDark']>,
    isTall: {} as PropOptions<Components.C4Container['isTall']>,
    isStaggered: {} as PropOptions<Components.C4Container['isStaggered']>,
  },


  render: createCommonRender('c4-container', []),
});


export const C4DetailsLockup = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('c4-details-lockup', []),
});


export const C4Heading = /*@__PURE__*/ Vue.extend({

  props: {
    tag: {} as PropOptions<Components.C4Heading['tag']>,
  },


  render: createCommonRender('c4-heading', []),
});


export const C4ProductIllustration = /*@__PURE__*/ Vue.extend({

  props: {
    color: {} as PropOptions<Components.C4ProductIllustration['color']>,
    altText: {} as PropOptions<Components.C4ProductIllustration['altText']>,
    imgPath: {} as PropOptions<Components.C4ProductIllustration['imgPath']>,
    aspectRatio: {} as PropOptions<Components.C4ProductIllustration['aspectRatio']>,
  },


  render: createCommonRender('c4-product-illustration', []),
});


export const C4RadioButtons = /*@__PURE__*/ Vue.extend({

  props: {
    optionsString: {} as PropOptions<Components.C4RadioButtons['optionsString']>,
    optionsData: {} as PropOptions<Components.C4RadioButtons['optionsData']>,
    callback: {} as PropOptions<Components.C4RadioButtons['callback']>,
    radioName: {} as PropOptions<Components.C4RadioButtons['radioName']>,
  },


  render: createCommonRender('c4-radio-buttons', ['colorChanged']),
});


export const C4StarRating = /*@__PURE__*/ Vue.extend({

  props: {
    rating: {} as PropOptions<Components.C4StarRating['rating']>,
    guid: {} as PropOptions<Components.C4StarRating['guid']>,
    reviewsCount: {} as PropOptions<Components.C4StarRating['reviewsCount']>,
    reviewsLink: {} as PropOptions<Components.C4StarRating['reviewsLink']>,
  },


  methods: {
    getRating: createCommonMethod('getRating') as Components.C4StarRating['getRating'],
  },
  render: createCommonRender('c4-star-rating', []),
});


export const C4Stepper = /*@__PURE__*/ Vue.extend({

  props: {
    min: {} as PropOptions<Components.C4Stepper['min']>,
    max: {} as PropOptions<Components.C4Stepper['max']>,
    startValue: {} as PropOptions<Components.C4Stepper['startValue']>,
  },


  render: createCommonRender('c4-stepper', []),
});


export const C4Text = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('c4-text', []),
});

