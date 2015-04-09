/**
 * Created by shaunwest on 4/8/15.
 */

var webpackTask = require('./webpack'),
  nodemonTask = require('./nodemon'),
  livereloadTask = require('./livereload');

livereloadTask();
webpackTask(nodemonTask);
