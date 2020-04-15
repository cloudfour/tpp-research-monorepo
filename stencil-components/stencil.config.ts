import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "stencil-components",
  taskQueue: "async",
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: "c4-stencil-components",
      proxiesFile: "../react-components/src/components.ts",
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
      serviceWorker: null, // disable service workers
    },
  ],
};
