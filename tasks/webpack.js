/**
 * Created by shaunwest on 4/8/15.
 */

var webpack = require('webpack'),
  colors = require('colors'),
  path = require('path');

module.exports = function(cb) {
  webpack({
    entry: {
      app: __dirname + '/../js/main.js'
    },
    output: {
      path: __dirname + '/../public/js',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        { test: path.join(__dirname, '/../js'), loader: 'babel-loader' }
      ]
    },
    devtool: 'source-map',
    watch: true
  }, function(err, stats) {
    console.log('Webpack:'.yellow.bold + ' app was compiled');
    cb(err, stats);
  });
};