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

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  initLayout(__dirname + '/index.html', function() {
    var bundle = require('./public/js/bundle');
  });

  console.log('Example app listening at http://%s:%s', host, port);
});