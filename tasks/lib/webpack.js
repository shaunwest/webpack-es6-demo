/**
 * Created by shaunwest on 4/8/15.
 */

var webpack = require('webpack'),
  CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
  colors = require('colors'),
  config = require('../config');

module.exports = function (cb, watch) {
  watch = watch || false;
  webpack({
    entry: {
      app: config.jsEntry,
      vendor: ['jquery']
    },
    output: {
      path: config.jsOutput,
      filename: 'bundle.js'
    },
    plugins: [
      new CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ],
    module: {
      loaders: [
        { test: config.jsSource, loader: 'babel-loader' }
      ]
    },
    devtool: 'source-map',
    watch: watch,
    cache: true,
    profile: false
  },
  function(err, stats) {
    console.log('Webpack:'.yellow.bold + ' app was compiled');
    if (cb) cb(err, stats);
  });
};