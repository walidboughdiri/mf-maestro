const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3010,
  },
};
