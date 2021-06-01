var copydir = require('copy-dir');

// Copy components to Express app
copydir('stencil-components/dist', 'express-app/public/stencil', {});
copydir('stencil-components/dist', 'vanilla-html/public/stencil', {});

// Copy components to Storyblok CMS app
copydir('stencil-components/dist', 'cms-storyblok/public/stencil', {});

// Other apps import the required files via relative paths so don't need copies.
