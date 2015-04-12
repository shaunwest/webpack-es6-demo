/**
 * Created by shaunwest on 4/4/15.
 */
var express = require('express'),
  jsdom = require('jsdom'),
  routes = require('./public/routes');

var app = express();

app.use(express.static(__dirname + '/public'));

function initLayout(path, cb) {
  jsdom.env(path, [], function(errors, win) {
    global.window = win;
    global.document = win.document;
    global.server = app;
    cb();
  });
}

initLayout(__dirname + '/index.html', function() {
  var bundle = require('./public/js/bundle');
  console.log(bundle);
  /*routes.forEach(function(route) {
    app.get('/', function (req, res) {
      res.send(global.window.document.documentElement.outerHTML);
    });
  });*/
});

var server = app.listen(3000, function () {
  console.log('Example app running at http://localhost:3000');
});