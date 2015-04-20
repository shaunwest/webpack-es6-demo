/**
 * Created by shaunwest on 4/8/15.
 */

var webpack = require('./lib/webpack'),
  nodemon = require('./lib/nodemon'),
  livereload = require('./lib/livereload');

//livereload();
webpack(nodemon, true);
