'use strict';

/**
 * Created by shaunwest on 4/8/15.
 */

var nodemon = require('nodemon'),
  config = require('../config'),
  colors = require('colors');

var started = false;
var log = function(str) {
  console.log('Nodemon:'.yellow.bold + ' ' + str);
};

module.exports = function() {
  if(started) {
    return;
  }
  nodemon({
    "restartable": "rs",
    "ignore": [
      ".git",
      "node_modules/**/*"
    ],
    "verbose": true,
    /*"events": {
      "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
    },*/
    "env": {
      "NODE_ENV": "development"
    },
    "ext": "js json",
    watch: ['index.js', config.jsBundle]
  });

  nodemon.on('start', function () {
    log('app has started');
    started = true;
  }).on('quit', function () {
    log('app has quit');
  }).on('restart', function (files) {
    log('app restarted');
  });
};