var copydir = require("copy-dir");

copydir("stencil-components/dist", "express-app/public/stencil", {});
copydir("stencil-components/src/css", "express-app/public/stencil/css", {});
copydir("stencil-components/src/css", "angular-app/src/assets/css", {});
