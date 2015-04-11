/**
 * Created by shaunwest on 4/8/15.
 */

var webpack = require('webpack'),
  colors = require('colors'),
  config = require('../config'),
  path = require('path');

module.exports = function (cb, watch) {
  watch = watch || false;
  webpack({
    entry: {
      app: config.jsEntry
    },
    output: {
      path: config.jsOutput,
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        { test: config.jsSource, loader: 'babel-loader' }
      ]
    },
    devtool: 'source-map',
    watch: watch
  },
  function(err, stats) {
    console.log('Webpack:'.yellow.bold + ' app was compiled');
    if (cb) cb(err, stats);
  });
};