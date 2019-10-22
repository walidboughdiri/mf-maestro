const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "src"),
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
  },
  entry: "./index.js",
  mode: "development",
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components|build)/,
        include: [path.resolve(__dirname, "src")],
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/env"] },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    modules: [path.join(__dirname, "node_modules")],
    symlinks: false,
  },
};
