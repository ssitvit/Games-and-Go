"use strict";

var _require = require("babel-preset-es2015");

var buildPreset = _require.buildPreset;


module.exports = function preset(context) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return {
    presets: [opts.es2015 !== false && [buildPreset, opts.es2015], opts.es2016 !== false && require("babel-preset-es2016"), opts.es2017 !== false && require("babel-preset-es2017")].filter(Boolean)
  };
};