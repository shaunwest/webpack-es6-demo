/**
 * Created by shaunwest on 4/8/15.
 */

var webpack = require('webpack'),
  path = require('path');

module.exports = function(cb) {
  webpack({
    entry: {
      app: __dirname + '/../es6/main.js'
    },
    output: {
      path: __dirname + '/../public',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        { test: path.join(__dirname, '/../es6'), loader: 'babel-loader' }
      ]
    },
    watch: true
  }, function(err, stats) {
    console.log('Webpack: compile');
    cb(err, stats);
  });
};