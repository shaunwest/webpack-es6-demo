import Point from './Point.js';
import home from './home.js';
import $ from 'jquery';
import page from 'page';

$('div').text('Good point!!!: ' + new Point(1, 23));

if(typeof server === 'undefined') {
  page('/', function() {
    home();
  });
  page();
}
else {
  server.get('/', function (req, res) {
    home();
    res.send(window.document.documentElement.outerHTML);
  });
}

