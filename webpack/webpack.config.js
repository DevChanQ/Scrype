const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    scrype: path.resolve('index.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[chunkhash].js'
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
  mode: 'production',
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    })],
  },
};
