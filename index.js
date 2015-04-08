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

initLayout(__dirname + '/index.html', function() {
    var bundle = require('./public/bundle');

    app.get('/', function (req, res) {
        //res.send('Hello World!');
        //res.render('index');
        res.send(global.window.document.documentElement.outerHTML);
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});