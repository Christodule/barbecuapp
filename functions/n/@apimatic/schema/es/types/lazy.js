import { __spreadArray, __read } from 'tslib';
import { once } from '../utils.js';
/**
 * Create a schema that lazily delegates to the given schema.
 */

function lazy(schemaFn) {
  var getSchema = once(schemaFn); // Memoize schema

  return {
    type: function () {
      return "Lazy<" + getSchema().type() + ">";
    },
    map: function () {
      var _a;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return (_a = getSchema()).map.apply(_a, __spreadArray([], __read(args)));
    },
    unmap: function () {
      var _a;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return (_a = getSchema()).unmap.apply(_a, __spreadArray([], __read(args)));
    },
    validateBeforeMap: function () {
      var _a;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return (_a = getSchema()).validateBeforeMap.apply(_a, __spreadArray([], __read(args)));
    },
    validateBeforeUnmap: function () {
      var _a;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return (_a = getSchema()).validateBeforeUnmap.apply(_a, __spreadArray([], __read(args)));
    },
    mapXml: function () {
      var _a;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return (_a = getSchema()).mapXml.apply(_a, __spreadArray([], __read(args)));
    },
    unmapXml: function () {
      var _a;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return (_a = getSchema()).unmapXml.apply(_a, __spreadArray([], __read(args)));
    },
    validateBeforeMapXml: function () {
      var _a;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return (_a = getSchema()).validateBeforeMapXml.apply(_a, __spreadArray([], __read(args)));
    }
  };
}

export { lazy };