const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    startMediator: "./src/startMediator",
    MicroAppComponent: "./src/MicroAppComponent",
    MediatorContext: "./src/MediatorContext"
  },
  externals: [ nodeExternals() ],
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components|build)/,
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  output: {
    filename: "[name].js",
    library: ["MfMaestro", "[name]"],
    libraryTarget: "umd",
    path: path.resolve(__dirname, "lib")
  }
};
