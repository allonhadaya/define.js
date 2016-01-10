(function(window) {
  'use strict';

  window.define = define;

  // define window for convenience
  var modules = {window: window};

  function define(factory) {

    // strip comments
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var factoryStr = factory.toString().replace(STRIP_COMMENTS, '');

    // use factory function's name as the module name
    var moduleName = (/^function\s+([\w\$]+)\s*\(/.exec(factoryStr) || {})[1];

    // use factory function's parameters as dependency names
    var PARAMETER_NAMES = /([^\s,]+)/g;
    var deps = factoryStr.slice(factoryStr.indexOf('(') + 1, factoryStr.indexOf(')')).match(PARAMETER_NAMES);
    if (deps === null) {
      deps = [];
    }

    // map dependency names to dependency modules
    for (var i = 0; i < deps.length; i++) {
      if (deps[i] in modules) {
        deps[i] = modules[deps[i]];
      } else {
        throw new Error('Check module definition order: ' + deps[i] + ' must be defined before ' + (moduleName || 'anonymous module') + '.');
      }
    }

    // apply dependencies to factory to produce the module
    var module = factory.apply(window, deps);

    // store the module if it was given a name
    if (moduleName) {
      modules[moduleName] = module;
    }
  }

}(this));
