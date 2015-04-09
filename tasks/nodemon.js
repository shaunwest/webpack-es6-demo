/**
 * Created by shaunwest on 4/8/15.
 */

var nodemon = require('nodemon');

'use strict';

var started = false;

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
    "events": {
      "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
    },
    "env": {
      "NODE_ENV": "development"
    },
    "ext": "js json",
    watch: ['index.js', 'public/bundle.js']
  });

  nodemon.on('start', function () {
    console.log('Nodemon: app has started');
    started = true;
  }).on('quit', function () {
    console.log('Nodemon: app has quit');
  }).on('restart', function (files) {
    console.log('Nodemon: app restarted due to: ', files);
  });
};