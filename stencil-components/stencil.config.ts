import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
// TODO: Figure out ValueAccessorConfig
// @see https://github.com/ionic-team/stencil-ds-plugins/issues/6
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: "stencil-components",
  taskQueue: "async",
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: "../../stencil-components/",
      proxiesFile: "../react-components/src/components.ts",
    }),
    angularOutputTarget({
      componentCorePackage: '../../stencil-components/',
      directivesProxyFile: '../angular-components/src/components.ts',
    }),
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      copy: [{ src: "css" }],
    },
  ],
};
