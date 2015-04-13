/**
 * Created by Shaun on 5/3/14.
 */
var http = require('http');
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();
var promises = [];

function isFunction(obj) {
  return Object.prototype.toString.call(obj) == '[object Function]';
}

function parseResponse (contentType, responseText) {
  if(contentType.substr(0, 16) == 'application/json') {
    return JSON.parse(responseText);
  }
  return responseText;
}

function nodeGet(url, contentTypeOrOnProgress, onProgress) {
  function getHandler (resolve, reject) {
    var req = http.request(url, function(res) {
      var data = '';
      console.log(url);
      if(isFunction(contentTypeOrOnProgress)) {
        onProgress = contentTypeOrOnProgress;
        contentTypeOrOnProgress = null;
      }

      //res.setEncoding('utf8');

      res.on('data', function (chunk) {
        data += chunk;
        if(onProgress) {
          onProgress(chunk.length, data.length);
        }
      });

      res.on('end', function() {
        var contentType = contentTypeOrOnProgress || res.getHeader('content-type') || '';

        (res.statusCode >= 300) ?
          reject({statusText: '', status: res.statusCode}) :
          resolve({data: parseResponse(contentType, data), status: res.statusCode});
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
      console.log('URL: ' + url);
      reject('Network error.');
    });

    req.end();
  }

  return new Promise(getHandler);
}

function browserGet(url, contentTypeOrOnProgress, onProgress) {
  function getHandler(resolve, reject) {
    console.log('promise!!!!!!!!!!!!!');
    var req = new XMLHttpRequest();

    if (isFunction(contentTypeOrOnProgress)) {
      onProgress = contentTypeOrOnProgress;
      contentTypeOrOnProgress = undefined;
    }

    if (onProgress) {
      req.addEventListener('progress', function (event) {
        onProgress(event.loaded, event.total);
      }, false);
    }

    req.onerror = function (event) {
      reject('Network error.');
    };

    req.onload = function () {
      var contentType = contentTypeOrOnProgress || this.getResponseHeader('content-type') || '';
      (this.status >= 300) ?
        reject({statusText: this.statusText, status: this.status}) :
        resolve({data: parseResponse(contentType, this.responseText), status: this.status});
    };

    req.open('get', url, true);
    req.send();
  }
  var promise = new Promise(getHandler);
  promises.push(promise);

  return promise;
}

function get(url, contentTypeOrOnProgress, onProgress) {
  /*if (typeof http === 'object') {
    console.log('using http');
    //return nodeGet.apply(this, arguments);
    return nodeGet('http://localhost:3000/' + url);
  }*/
  console.log('using ajax');
  emitter.emit('Get', 'fooo');
  return browserGet(url, contentTypeOrOnProgress, onProgress);
}

module.exports = {
  get: get,
  promises: promises,
  emitter: emitter
};

