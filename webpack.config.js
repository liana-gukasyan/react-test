var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: {
    'bundle': [
      './src/index.jsx',
      './index.html',
      './styles/index.scss'
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /[.]jsx?$/,
        loader: 'babel'
      },
      {
        test: /[.](html?|css)$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /[.]s[ca]ss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  devtool: 'eval-source-map'
};

module.exports = config;