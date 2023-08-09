'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _path = require('path');

var _istanbulLibInstrument = require('istanbul-lib-instrument');

var testExclude = require('test-exclude');
var findUp = require('find-up');

function getRealpath(n) {
  try {
    return (0, _fs.realpathSync)(n) || n;
  } catch (e) {
    return n;
  }
}

var exclude = void 0;
function shouldSkip(file, opts) {
  if (!exclude) {
    exclude = testExclude(Object.keys(opts).length > 0 ? opts : {
      cwd: process.env.NYC_CWD || getRealpath(process.cwd()),
      configKey: 'nyc',
      configPath: (0, _path.dirname)(findUp.sync('package.json'))
    });
  }

  return !exclude.shouldInstrument(file);
}

function makeVisitor(_ref) {
  var t = _ref.types;

  return {
    visitor: {
      Program: {
        enter: function enter(path) {
          this.__dv__ = null;
          var realPath = getRealpath(this.file.opts.filename);
          if (shouldSkip(realPath, this.opts)) {
            return;
          }
          this.__dv__ = (0, _istanbulLibInstrument.programVisitor)(t, realPath);
          this.__dv__.enter(path);
        },
        exit: function exit(path) {
          if (!this.__dv__) {
            return;
          }
          this.__dv__.exit(path);
        }
      }
    }
  };
}

exports.default = makeVisitor;