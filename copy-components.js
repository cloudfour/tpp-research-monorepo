var copydir = require("copy-dir");

copydir("stencil-components/dist", "express/public/stencil", {});
copydir("stencil-components/src/css", "express/public/stencil/css", {});
