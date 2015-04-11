

var BASE = __dirname.substr(0, __dirname.lastIndexOf('/'));
var BUILD = BASE + '/public';
var JS_SOURCE = BASE + '/js';
var JS_OUT = BUILD + '/js';

module.exports = {
  build: BUILD,
  jsSource: JS_SOURCE,
  jsEntry: JS_SOURCE + '/main.js',
  jsOutput: JS_OUT,
  appMain: 'index.js',
  jsBundle: JS_OUT + '/bundle.js'
};