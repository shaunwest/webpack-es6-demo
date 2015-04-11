/**
 * Created by shaunwest on 4/8/15.
 */

var livereload = require('livereload'),
  config = require('../config'),
  colors = require('colors');

module.exports = function() {
  var server = livereload.createServer({debug: 'info'});

  // override the debug method and prepend "LiveReload"
  // to make shell output easier to read
  var debug = server.debug.bind(server);
  server.debug = function(str) {
    debug('LiveReload:'.yellow.bold + ' ' + str);
  };

  server.watch(config.build);
};
