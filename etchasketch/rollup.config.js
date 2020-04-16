const globby = require("globby");
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import globals from "rollup-plugin-node-globals";
import builtins from "rollup-plugin-node-builtins";

const configs = globby.sync("src/**/*.js").map((inputFile) => ({
  input: inputFile,
  output: {
    file: inputFile.replace("src", "public"),
    format: "iife",
  },
  external: ["fs"], // tells Rollup 'I know what I'm doing here'
  plugins: [
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs({
      include: ["node_modules/**/*"],
    }),
    globals(),
    builtins(),
  ],
}));
module.exports = configs;
