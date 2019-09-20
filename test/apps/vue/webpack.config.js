"use strict";
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  mode: "development",
  entry: ["./src/app.js"],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  output: {
    filename: "app.js",
    path: __dirname + "/../../public/assets/apps-vue",
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve("src"),
    },
  },
};
