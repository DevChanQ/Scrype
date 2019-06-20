const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    scrype: path.resolve('index.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    library: "scrype",
    libraryTarget: "umd"
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
            compact: true
        }
      },
    ]
  },
  mode: 'production'
};
