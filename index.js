/**
 * Created by shaunwest on 4/4/15.
 */
var express = require('express');
var jsdom = require('jsdom');

var app = express();

app.use(express.static(__dirname + '/public'));

function initLayout(path, cb) {
    jsdom.env(path, [], function(errors, win) {
        global.window = win;
        global.document = win.document;
        cb();
    });
}

initLayout(__dirname + '/public/index.html', function() {
    var bundle = require('./public/js/bundle');

    app.get('/', function (req, res) {
        //res.send('Hello World!');
        //res.render('index');
        res.send(global.window.document.documentElement.outerHTML);
    });
});

var server = app.listen(3000, function () {
    console.log('Example app running at http://localhost:3000');
});