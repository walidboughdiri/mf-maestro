module.exports = {
  context: __dirname + "/app",
  entry: "./app.js",
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  output: {
    filename: "app.js",
    path: __dirname + "/../../public/assets/apps-react-16-8-hooks",
  },
}
