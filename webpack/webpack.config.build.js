const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const pkg = require('../package.json');

var banner = `
  ${pkg.name} - ${pkg.description}
  Author: ${pkg.author}
  Version: v${pkg.version}
  License(s): ${pkg.license}
`;

module.exports = merge(webpackConfig, {
  mode: 'production',
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
});
