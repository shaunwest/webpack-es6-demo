/**
 * Created by shaunwest on 4/8/15.
 */

var livereload = require('livereload');

module.exports = function() {
  var server = livereload.createServer();
  server.watch(__dirname + '/../public');
};
