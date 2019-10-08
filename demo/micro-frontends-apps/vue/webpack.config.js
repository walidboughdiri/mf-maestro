"use strict";
const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  context: __dirname + "/src",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    hot: true,
    port: 3003,
    publicPath: "/dist/",
    watchOptions: {
      poll: true,
    },
  },
  entry: "./app.js",
  mode: "none",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new VueLoaderPlugin()],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: [".js", ".vue"],
  },
};
