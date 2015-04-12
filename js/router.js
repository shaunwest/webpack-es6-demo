/**
 * Created by Shaun on 4/12/2015.
 */

module.exports = function(app) {
  if(app) {
    app.get('/', function (req, res) {
      res.send(global.window.document.documentElement.outerHTML);
    });
  }
  else {
    var page = require('page');
    page('/', function() {
      home();
    });
    page();
  }
};
