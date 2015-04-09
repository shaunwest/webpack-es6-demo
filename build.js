/**
 * Created by shaunwest on 4/8/15.
 */

var webpackTask = require('./tasks/webpack'),
  nodemonTask = require('./tasks/nodemon'),
  livereloadTask = require('./tasks/livereload');

livereloadTask();
webpackTask(nodemonTask);
