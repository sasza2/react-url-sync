const path = require('path');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: {
    react: {
      commonjs2: "react"
    },
    "react-router": {
      commonjs2: "react-router"
    },
    "react-router-dom": {
      commonjs2: "react-router-dom"
    }
  }
};