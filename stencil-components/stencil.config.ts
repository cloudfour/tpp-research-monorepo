import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
// TODO: Figure out ValueAccessorConfig
// @see https://github.com/ionic-team/stencil-ds-plugins/issues/6
import { angularOutputTarget } from '@stencil/angular-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'stencil-components',
  taskQueue: 'async',
  devServer: {
    reloadStrategy: 'pageReload',
  },
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '../../stencil-components/',
      proxiesFile: '../react-components/src/components.ts',
    }),
    angularOutputTarget({
      componentCorePackage: '../../stencil-components',
      directivesProxyFile: '../angular-components/src/components.ts',
    }),
    vueOutputTarget({
      componentCorePackage: '../../stencil-components',
      proxiesFile: '../vue-components/src/components.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{ src: 'assets', dest: '../assets' }],
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [
        { src: 'assets' },
        {
          src: 'assets',
          dest: '../../angular-app/src/assets/stencil',
        },
        {
          src: 'assets',
          dest: '../../cms-storyblok/public/stencil/assets',
        },
        {
          src: 'assets',
          dest: '../../ember-app/public/assets/stencil',
        },
        {
          src: 'assets',
          dest: '../../express-app/public/stencil/assets',
        },
        {
          src: 'assets',
          dest: '../../vanilla-html/public/stencil/assets',
        },
        {
          src: 'assets',
          dest: '../../react-app/public/assets/stencil',
        },
        {
          src: 'assets',
          dest: '../../storybook/public/assets/stencil',
        },
        {
          src: 'assets',
          dest: '../../vue-app/static/assets/stencil',
        },
      ],
    },
  ],
};
