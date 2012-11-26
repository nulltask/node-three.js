/**
 * Module dependencies.
 */

var fs = require('fs')
  , jsdom = require('jsdom')
  , document = jsdom.jsdom('<!doctype html><html><head></head><body></body></html>')
  , window = document.createWindow()
  , src = fs.readFileSync(__dirname+'/../deps/three.js/build/Three.js')
  , self = global;

/**
 * Evaluate Three.js source code.
 */

eval('(function(window, document) {'
  + src.toString('utf-8').replace('var THREE', 'var THREE = window.THREE')
  + '})(window, document);'
);

/**
 * Expose `THREE`
 */

module.exports = window.THREE;
