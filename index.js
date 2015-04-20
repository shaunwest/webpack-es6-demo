/**
 * Created by shaunwest on 4/4/15.
 */

var express = require('express'),
  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var jsdom, routes;

var app = express();
app.use(express.static(__dirname + '/public'));

var environment = process.env.NODE_ENV;

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  if(environment === 'development2') {
    routes = require('./public/routes.json');
    routes.forEach(function(route) {
      app.get(route.path, function (req, res) {
        res.sendFile(__dirname + '/index.html');
      });
    });
  } else {
    jsdom = require('jsdom');
    jsdom.env(__dirname + '/index.html', [], function(errors, win) {
      global.window = win;
      global.document = win.document;
      global.server = app;
      global.XMLHttpRequest = XMLHttpRequest;
      global.host = host;
      global.port = port;

      var vendor = require('./public/js/vendor.bundle');
      global.webpackJsonp = window.webpackJsonp;
      var bundle = require('./public/js/bundle');
    });
  }

  console.log('Example app listening at http://%s:%s', host, port);
});