/**
 * Created by shaunwest on 4/4/15.
 */
var express = require('express'),
  jsdom = require('jsdom'),
  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
  routes = require('./public/routes');

var app = express();

app.use(express.static(__dirname + '/public'));

function initLayout(path, cb) {
  jsdom.env(path, [], function(errors, win) {
    global.window = win;
    global.document = win.document;
    global.server = app;
    global.XMLHttpRequest = XMLHttpRequest;
    cb();
  });
}

initLayout(__dirname + '/index.html', function() {
  var bundle = require('./public/js/bundle');
});

var server = app.listen(3000, function () {
  console.log('Example app running at http://localhost:3000');
});