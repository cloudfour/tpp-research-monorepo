var copydir = require("copy-dir");

// Copy components and CSS to Express app
copydir("stencil-components/dist", "express-app/public/stencil", {});
copydir(
  "stencil-components/src/assets/css",
  "express-app/public/stencil/css",
  {}
);

// Copy components and CSS to Storyblok CMS app
copydir("stencil-components/dist", "cms-storyblok/public/stencil", {});
copydir(
  "stencil-components/src/assets/css",
  "cms-storyblok/public/stencil/css",
  {}
);

// Copy CSS to Angular app
copydir("stencil-components/src/assets/css", "angular-app/src/assets/css", {});

// Other apps import the required files via relative paths so don't need copies.
