/**
 * Created by Shaun on 4/12/2015.
 */

import page from 'page';
import home from './home.js';
import kjax from './kjax.js';

if(typeof server === 'undefined') {
  page('/', function() {
    home();
  });
  page();
}
else {
  server.get('/', function (req, res) {
    home();
    Promise.all(kjax.getPromises()).then(function() {
      res.send(window.document.documentElement.outerHTML);
      kjax.purge();
    });
  });
}

