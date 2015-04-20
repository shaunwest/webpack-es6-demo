/**
 * Created by Shaun on 4/16/2015.
 */

import $ from 'jquery';

var allDataElements;

function hasDataAttribute(element) {
  var attributes = element.attributes;
  for(var i = 0, numAttributes = attributes.length; i < numAttributes; i++) {
    if(attributes[i].name.substr(0, 4) === 'data') {
      return element;
    }
  }
}

export function findDataElements (parentElement) {
  var allElements, element, dataElements = [];

  if(!parentElement) {
    var html = document.getElementsByTagName('html');
    if(!html[0]) {
      return dataElements;
    }
    parentElement = html[0];
  }

  allElements = parentElement.querySelectorAll('*');
  for(var i = 0, numElements = allElements.length; i < numElements; i++) {
    element = allElements[i];
    if(hasDataAttribute(element)) {
      dataElements.push(element);
    }
  }
  return dataElements;
}

export function Fragment (name) {
  if(!allDataElements) {
    cacheDataElements();
  }
  var elements = allDataElements.map(function(element) {
    if(element.hasAttribute('data-' + name)) {
      return element;
    }
  });
  return $(elements);
}

export function cacheDataElements() {
  allDataElements = findDataElements();
}

