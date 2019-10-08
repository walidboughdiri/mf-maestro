const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "app"),
  devServer: {
    contentBase: path.join(__dirname, "public"),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    port: 3002,
    publicPath: "/dist/",
    hotOnly: true,
  },
  entry: "./app.js",
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
