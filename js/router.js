/**
 * Created by Shaun on 4/12/2015.
 */

import page from 'page';
import kjax from './kjax.js';

function loadModule(moduleName) {
  if(!moduleName) {
    return null;
  }

  // TODO: see about using es6 System.import syntax instead of require()
  return require('./' + moduleName + '.js');
}

if(typeof server === 'undefined') {
  // We're in the browser. Use Page routing.
  kjax.requestGet('/routes.json').then(function(response) {
    var routes = response.data;

    routes.forEach(function(route) {
      var m = loadModule(route.module);
      page(route.path, function() {
        kjax.requestGet(route.templateUrl).then(function(response) {
          if(m) {
            m(response.data, route);
          }
        });
      });
    });
  });
  page();
}
else {
  // We're on the server. Use Express routing .
  kjax.setBaseUrl('http://localhost:' + port);
  kjax.requestGet('/routes.json').then(function(response) {
    var routes = response.data;
    routes.forEach(function(route) {
      var m = loadModule(route.module);
      server.get(route.path, function (req, res) {
        kjax.requestGet(route.templateUrl).then(function (response) {
          if(m) {
            m(response.data, route);

            // Wait for all ajax calls to complete before rendering the page
            Promise.all(kjax.getPromises()).then(function () {
              res.send(window.document.documentElement.outerHTML);
              kjax.purge();
            });
          }
        });
      });
    });
  });
}
