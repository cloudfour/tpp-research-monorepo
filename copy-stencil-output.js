var copydir = require("copy-dir");

// Copy components, fonts, and CSS to Express app
copydir("stencil-components/dist", "express-app/public/stencil", {});
copydir(
  "stencil-components/src/assets",
  "express-app/public/stencil/assets",
  {}
);

// Copy components, fonts, and CSS to Storyblok CMS app
copydir("stencil-components/dist", "cms-storyblok/public/stencil", {});
copydir(
  "stencil-components/src/assets",
  "cms-storyblok/public/stencil/assets",
  {}
);

// Copy CSS and fonts to Angular app
copydir("stencil-components/src/assets", "angular-app/src/assets/stencil", {});

// Copy CSS and fonts to React app
copydir("stencil-components/src/assets", "react-app/public/assets/stencil", {});

// Other apps import the required files via relative paths so don't need copies.
