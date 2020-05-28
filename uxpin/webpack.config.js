const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: ["*", ".js", ".jsx"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.jsx/,
        exclude: /node_modules/,
      },      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
