(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dat"] = factory();
	else
		root["dat"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _index = __webpack_require__(1);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _index2.default; /**
	                                    * dat-gui JavaScript Controller Library
	                                    * http://code.google.com/p/dat-gui
	                                    *
	                                    * Copyright 2011 Data Arts Team, Google Creative Lab
	                                    *
	                                    * Licensed under the Apache License, Version 2.0 (the "License");
	                                    * you may not use this file except in compliance with the License.
	                                    * You may obtain a copy of the License at
	                                    *
	                                    * http://www.apache.org/licenses/LICENSE-2.0
	                                    */

	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Color = __webpack_require__(2);
	
	var _Color2 = _interopRequireDefault(_Color);
	
	var _math = __webpack_require__(6);
	
	var _math2 = _interopRequireDefault(_math);
	
	var _interpret = __webpack_require__(3);
	
	var _interpret2 = _interopRequireDefault(_interpret);
	
	var _Controller = __webpack_require__(7);
	
	var _Controller2 = _interopRequireDefault(_Controller);
	
	var _BooleanController = __webpack_require__(8);
	
	var _BooleanController2 = _interopRequireDefault(_BooleanController);
	
	var _OptionController = __webpack_require__(10);
	
	var _OptionController2 = _interopRequireDefault(_OptionController);
	
	var _StringController = __webpack_require__(11);
	
	var _StringController2 = _interopRequireDefault(_StringController);
	
	var _NumberController = __webpack_require__(12);
	
	var _NumberController2 = _interopRequireDefault(_NumberController);
	
	var _NumberControllerBox = __webpack_require__(13);
	
	var _NumberControllerBox2 = _interopRequireDefault(_NumberControllerBox);
	
	var _NumberControllerSlider = __webpack_require__(14);
	
	var _NumberControllerSlider2 = _interopRequireDefault(_NumberControllerSlider);
	
	var _FunctionController = __webpack_require__(15);
	
	var _FunctionController2 = _interopRequireDefault(_FunctionController);
	
	var _ColorController = __webpack_require__(16);
	
	var _ColorController2 = _interopRequireDefault(_ColorController);
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _GUI = __webpack_require__(17);
	
	var _GUI2 = _interopRequireDefault(_GUI);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	exports.default = {
	  color: {
	    Color: _Color2.default,
	    math: _math2.default,
	    interpret: _interpret2.default
	  },
	
	  controllers: {
	    Controller: _Controller2.default,
	    BooleanController: _BooleanController2.default,
	    OptionController: _OptionController2.default,
	    StringController: _StringController2.default,
	    NumberController: _NumberController2.default,
	    NumberControllerBox: _NumberControllerBox2.default,
	    NumberControllerSlider: _NumberControllerSlider2.default,
	    FunctionController: _FunctionController2.default,
	    ColorController: _ColorController2.default
	  },
	
	  dom: {
	    dom: _dom2.default
	  },
	
	  gui: {
	    GUI: _GUI2.default
	  },
	
	  GUI: _GUI2.default
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _interpret = __webpack_require__(3);
	
	var _interpret2 = _interopRequireDefault(_interpret);
	
	var _math = __webpack_require__(6);
	
	var _math2 = _interopRequireDefault(_math);
	
	var _toString = __webpack_require__(4);
	
	var _toString2 = _interopRequireDefault(_toString);
	
	var _common = __webpack_require__(5);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * dat-gui JavaScript Controller Library
	                                                                                                                                                           * http://code.google.com/p/dat-gui
	                                                                                                                                                           *
	                                                                                                                                                           * Copyright 2011 Data Arts Team, Google Creative Lab
	                                                                                                                                                           *
	                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                           * you may not use this file except in compliance with the License.
	                                                                                                                                                           * You may obtain a copy of the License at
	                                                                                                                                                           *
	                                                                                                                                                           * http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                           */
	
	var Color = function () {
	  function Color() {
	    _classCallCheck(this, Color);
	
	    this.__state = _interpret2.default.apply(this, arguments);
	
	    if (this.__state === false) {
	      throw new Error('Failed to interpret color arguments');
	    }
	
	    this.__state.a = this.__state.a || 1;
	  }
	
	  Color.prototype.toString = function toString() {
	    return (0, _toString2.default)(this);
	  };
	
	  Color.prototype.toHexString = function toHexString() {
	    return (0, _toString2.default)(this, true);
	  };
	
	  Color.prototype.toOriginal = function toOriginal() {
	    return this.__state.conversion.write(this);
	  };
	
	  return Color;
	}();
	
	function defineRGBComponent(target, component, componentHexIndex) {
	  Object.defineProperty(target, component, {
	    get: function get() {
	      if (this.__state.space === 'RGB') {
	        return this.__state[component];
	      }
	
	      Color.recalculateRGB(this, component, componentHexIndex);
	
	      return this.__state[component];
	    },
	
	    set: function set(v) {
	      if (this.__state.space !== 'RGB') {
	        Color.recalculateRGB(this, component, componentHexIndex);
	        this.__state.space = 'RGB';
	      }
	
	      this.__state[component] = v;
	    }
	  });
	}
	
	function defineHSVComponent(target, component) {
	  Object.defineProperty(target, component, {
	    get: function get() {
	      if (this.__state.space === 'HSV') {
	        return this.__state[component];
	      }
	
	      Color.recalculateHSV(this);
	
	      return this.__state[component];
	    },
	
	    set: function set(v) {
	      if (this.__state.space !== 'HSV') {
	        Color.recalculateHSV(this);
	        this.__state.space = 'HSV';
	      }
	
	      this.__state[component] = v;
	    }
	  });
	}
	
	Color.recalculateRGB = function (color, component, componentHexIndex) {
	  if (color.__state.space === 'HEX') {
	    color.__state[component] = _math2.default.component_from_hex(color.__state.hex, componentHexIndex);
	  } else if (color.__state.space === 'HSV') {
	    _common2.default.extend(color.__state, _math2.default.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
	  } else {
	    throw new Error('Corrupted color state');
	  }
	};
	
	Color.recalculateHSV = function (color) {
	  var result = _math2.default.rgb_to_hsv(color.r, color.g, color.b);
	
	  _common2.default.extend(color.__state, {
	    s: result.s,
	    v: result.v
	  });
	
	  if (!_common2.default.isNaN(result.h)) {
	    color.__state.h = result.h;
	  } else if (_common2.default.isUndefined(color.__state.h)) {
	    color.__state.h = 0;
	  }
	};
	
	Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
	
	defineRGBComponent(Color.prototype, 'r', 2);
	defineRGBComponent(Color.prototype, 'g', 1);
	defineRGBComponent(Color.prototype, 'b', 0);
	
	defineHSVComponent(Color.prototype, 'h');
	defineHSVComponent(Color.prototype, 's');
	defineHSVComponent(Color.prototype, 'v');
	
	Object.defineProperty(Color.prototype, 'a', {
	  get: function get() {
	    return this.__state.a;
	  },
	
	  set: function set(v) {
	    this.__state.a = v;
	  }
	});
	
	Object.defineProperty(Color.prototype, 'hex', {
	  get: function get() {
	    if (!this.__state.space !== 'HEX') {
	      this.__state.hex = _math2.default.rgb_to_hex(this.r, this.g, this.b);
	    }
	
	    return this.__state.hex;
	  },
	
	  set: function set(v) {
	    this.__state.space = 'HEX';
	    this.__state.hex = v;
	  }
	});
	
	exports.default = Color;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _toString = __webpack_require__(4);
	
	var _toString2 = _interopRequireDefault(_toString);
	
	var _common = __webpack_require__(5);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	var INTERPRETATIONS = [
	// Strings
	{
	  litmus: _common2.default.isString,
	  conversions: {
	    THREE_CHAR_HEX: {
	      read: function read(original) {
	        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
	        if (test === null) {
	          return false;
	        }
	
	        return {
	          space: 'HEX',
	          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
	        };
	      },
	
	      write: _toString2.default
	    },
	
	    SIX_CHAR_HEX: {
	      read: function read(original) {
	        var test = original.match(/^#([A-F0-9]{6})$/i);
	        if (test === null) {
	          return false;
	        }
	
	        return {
	          space: 'HEX',
	          hex: parseInt('0x' + test[1].toString(), 0)
	        };
	      },
	
	      write: _toString2.default
	    },
	
	    CSS_RGB: {
	      read: function read(original) {
	        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	        if (test === null) {
	          return false;
	        }
	
	        return {
	          space: 'RGB',
	          r: parseFloat(test[1]),
	          g: parseFloat(test[2]),
	          b: parseFloat(test[3])
	        };
	      },
	
	      write: _toString2.default
	    },
	
	    CSS_RGBA: {
	      read: function read(original) {
	        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	        if (test === null) {
	          return false;
	        }
	
	        return {
	          space: 'RGB',
	          r: parseFloat(test[1]),
	          g: parseFloat(test[2]),
	          b: parseFloat(test[3]),
	          a: parseFloat(test[4])
	        };
	      },
	
	      write: _toString2.default
	    }
	  }
	},
	
	// Numbers
	{
	  litmus: _common2.default.isNumber,
	
	  conversions: {
	
	    HEX: {
	      read: function read(original) {
	        return {
	          space: 'HEX',
	          hex: original,
	          conversionName: 'HEX'
	        };
	      },
	
	      write: function write(color) {
	        return color.hex;
	      }
	    }
	
	  }
	
	},
	
	// Arrays
	{
	  litmus: _common2.default.isArray,
	  conversions: {
	    RGB_ARRAY: {
	      read: function read(original) {
	        if (original.length !== 3) {
	          return false;
	        }
	
	        return {
	          space: 'RGB',
	          r: original[0],
	          g: original[1],
	          b: original[2]
	        };
	      },
	
	      write: function write(color) {
	        return [color.r, color.g, color.b];
	      }
	    },
	
	    RGBA_ARRAY: {
	      read: function read(original) {
	        if (original.length !== 4) return false;
	        return {
	          space: 'RGB',
	          r: original[0],
	          g: original[1],
	          b: original[2],
	          a: original[3]
	        };
	      },
	
	      write: function write(color) {
	        return [color.r, color.g, color.b, color.a];
	      }
	    }
	  }
	},
	
	// Objects
	{
	  litmus: _common2.default.isObject,
	  conversions: {
	
	    RGBA_OBJ: {
	      read: function read(original) {
	        if (_common2.default.isNumber(original.r) && _common2.default.isNumber(original.g) && _common2.default.isNumber(original.b) && _common2.default.isNumber(original.a)) {
	          return {
	            space: 'RGB',
	            r: original.r,
	            g: original.g,
	            b: original.b,
	            a: original.a
	          };
	        }
	        return false;
	      },
	
	      write: function write(color) {
	        return {
	          r: color.r,
	          g: color.g,
	          b: color.b,
	          a: color.a
	        };
	      }
	    },
	
	    RGB_OBJ: {
	      read: function read(original) {
	        if (_common2.default.isNumber(original.r) && _common2.default.isNumber(original.g) && _common2.default.isNumber(original.b)) {
	          return {
	            space: 'RGB',
	            r: original.r,
	            g: original.g,
	            b: original.b
	          };
	        }
	        return false;
	      },
	
	      write: function write(color) {
	        return {
	          r: color.r,
	          g: color.g,
	          b: color.b
	        };
	      }
	    },
	
	    HSVA_OBJ: {
	      read: function read(original) {
	        if (_common2.default.isNumber(original.h) && _common2.default.isNumber(original.s) && _common2.default.isNumber(original.v) && _common2.default.isNumber(original.a)) {
	          return {
	            space: 'HSV',
	            h: original.h,
	            s: original.s,
	            v: original.v,
	            a: original.a
	          };
	        }
	        return false;
	      },
	
	      write: function write(color) {
	        return {
	          h: color.h,
	          s: color.s,
	          v: color.v,
	          a: color.a
	        };
	      }
	    },
	
	    HSV_OBJ: {
	      read: function read(original) {
	        if (_common2.default.isNumber(original.h) && _common2.default.isNumber(original.s) && _common2.default.isNumber(original.v)) {
	          return {
	            space: 'HSV',
	            h: original.h,
	            s: original.s,
	            v: original.v
	          };
	        }
	        return false;
	      },
	
	      write: function write(color) {
	        return {
	          h: color.h,
	          s: color.s,
	          v: color.v
	        };
	      }
	    }
	  }
	}];
	
	var result = void 0;
	var toReturn = void 0;
	
	var interpret = function interpret() {
	  toReturn = false;
	
	  var original = arguments.length > 1 ? _common2.default.toArray(arguments) : arguments[0];
	  _common2.default.each(INTERPRETATIONS, function (family) {
	    if (family.litmus(original)) {
	      _common2.default.each(family.conversions, function (conversion, conversionName) {
	        result = conversion.read(original);
	
	        if (toReturn === false && result !== false) {
	          toReturn = result;
	          result.conversionName = conversionName;
	          result.conversion = conversion;
	          return _common2.default.BREAK;
	        }
	      });
	
	      return _common2.default.BREAK;
	    }
	  });
	
	  return toReturn;
	};
	
	exports.default = interpret;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	exports.default = function (color, forceCSSHex) {
	  var colorFormat = color.__state.conversionName.toString();
	
	  var r = Math.round(color.r);
	  var g = Math.round(color.g);
	  var b = Math.round(color.b);
	  var a = color.a;
	  var h = Math.round(color.h);
	  var s = color.s.toFixed(1);
	  var v = color.v.toFixed(1);
	
	  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
	    var str = color.hex.toString(16);
	    while (str.length < 6) {
	      str = '0' + str;
	    }
	    return '#' + str;
	  } else if (colorFormat === 'CSS_RGB') {
	    return 'rgb(' + r + ',' + g + ',' + b + ')';
	  } else if (colorFormat === 'CSS_RGBA') {
	    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
	  } else if (colorFormat === 'HEX') {
	    return '0x' + color.hex.toString(16);
	  } else if (colorFormat === 'RGB_ARRAY') {
	    return '[' + r + ',' + g + ',' + b + ']';
	  } else if (colorFormat === 'RGBA_ARRAY') {
	    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
	  } else if (colorFormat === 'RGB_OBJ') {
	    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
	  } else if (colorFormat === 'RGBA_OBJ') {
	    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
	  } else if (colorFormat === 'HSV_OBJ') {
	    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
	  } else if (colorFormat === 'HSVA_OBJ') {
	    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
	  }
	
	  return 'unknown format';
	};
	
	module.exports = exports['default']; /**
	                                      * dat-gui JavaScript Controller Library
	                                      * http://code.google.com/p/dat-gui
	                                      *
	                                      * Copyright 2011 Data Arts Team, Google Creative Lab
	                                      *
	                                      * Licensed under the Apache License, Version 2.0 (the "License");
	                                      * you may not use this file except in compliance with the License.
	                                      * You may obtain a copy of the License at
	                                      *
	                                      * http://www.apache.org/licenses/LICENSE-2.0
	                                      */

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	var ARR_EACH = Array.prototype.forEach;
	var ARR_SLICE = Array.prototype.slice;
	
	/**
	 * Band-aid methods for things that should be a lot easier in JavaScript.
	 * Implementation and structure inspired by underscore.js
	 * http://documentcloud.github.com/underscore/
	 */
	
	var Common = {
	  BREAK: {},
	
	  extend: function extend(target) {
	    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
	      var keys = this.isObject(obj) ? Object.keys(obj) : [];
	      keys.forEach(function (key) {
	        if (!this.isUndefined(obj[key])) {
	          target[key] = obj[key];
	        }
	      }.bind(this));
	    }, this);
	
	    return target;
	  },
	
	  defaults: function defaults(target) {
	    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
	      var keys = this.isObject(obj) ? Object.keys(obj) : [];
	      keys.forEach(function (key) {
	        if (this.isUndefined(target[key])) {
	          target[key] = obj[key];
	        }
	      }.bind(this));
	    }, this);
	
	    return target;
	  },
	
	  compose: function compose() {
	    var toCall = ARR_SLICE.call(arguments);
	    return function () {
	      var args = ARR_SLICE.call(arguments);
	      for (var i = toCall.length - 1; i >= 0; i--) {
	        args = [toCall[i].apply(this, args)];
	      }
	      return args[0];
	    };
	  },
	
	  each: function each(obj, itr, scope) {
	    if (!obj) {
	      return;
	    }
	
	    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
	      obj.forEach(itr, scope);
	    } else if (obj.length === obj.length + 0) {
	      // Is number but not NaN
	      var key = void 0;
	      var l = void 0;
	      for (key = 0, l = obj.length; key < l; key++) {
	        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
	          return;
	        }
	      }
	    } else {
	      for (var _key in obj) {
	        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
	          return;
	        }
	      }
	    }
	  },
	
	  defer: function defer(fnc) {
	    setTimeout(fnc, 0);
	  },
	
	  // if the function is called repeatedly, wait until threshold passes until we execute the function
	  debounce: function debounce(func, threshold, callImmediately) {
	    var timeout = void 0;
	
	    return function () {
	      var obj = this;
	      var args = arguments;
	      function delayed() {
	        timeout = null;
	        if (!callImmediately) func.apply(obj, args);
	      }
	
	      var callNow = callImmediately || !timeout;
	
	      clearTimeout(timeout);
	      timeout = setTimeout(delayed, threshold);
	
	      if (callNow) {
	        func.apply(obj, args);
	      }
	    };
	  },
	
	  toArray: function toArray(obj) {
	    if (obj.toArray) return obj.toArray();
	    return ARR_SLICE.call(obj);
	  },
	
	  isUndefined: function isUndefined(obj) {
	    return obj === undefined;
	  },
	
	  isNull: function isNull(obj) {
	    return obj === null;
	  },
	
	  isNaN: function (_isNaN) {
	    function isNaN(_x) {
	      return _isNaN.apply(this, arguments);
	    }
	
	    isNaN.toString = function () {
	      return _isNaN.toString();
	    };
	
	    return isNaN;
	  }(function (obj) {
	    return isNaN(obj);
	  }),
	
	  isArray: Array.isArray || function (obj) {
	    return obj.constructor === Array;
	  },
	
	  isObject: function isObject(obj) {
	    return obj === Object(obj);
	  },
	
	  isNumber: function isNumber(obj) {
	    return obj === obj + 0;
	  },
	
	  isString: function isString(obj) {
	    return obj === obj + '';
	  },
	
	  isBoolean: function isBoolean(obj) {
	    return obj === false || obj === true;
	  },
	
	  isFunction: function isFunction(obj) {
	    return Object.prototype.toString.call(obj) === '[object Function]';
	  }
	
	};
	
	exports.default = Common;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	var tmpComponent = void 0;
	
	var ColorMath = {
	  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
	    var hi = Math.floor(h / 60) % 6;
	
	    var f = h / 60 - Math.floor(h / 60);
	    var p = v * (1.0 - s);
	    var q = v * (1.0 - f * s);
	    var t = v * (1.0 - (1.0 - f) * s);
	
	    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
	
	    return {
	      r: c[0] * 255,
	      g: c[1] * 255,
	      b: c[2] * 255
	    };
	  },
	
	  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
	    var min = Math.min(r, g, b);
	    var max = Math.max(r, g, b);
	    var delta = max - min;
	    var h = void 0;
	    var s = void 0;
	
	    if (max !== 0) {
	      s = delta / max;
	    } else {
	      return {
	        h: NaN,
	        s: 0,
	        v: 0
	      };
	    }
	
	    if (r === max) {
	      h = (g - b) / delta;
	    } else if (g === max) {
	      h = 2 + (b - r) / delta;
	    } else {
	      h = 4 + (r - g) / delta;
	    }
	    h /= 6;
	    if (h < 0) {
	      h += 1;
	    }
	
	    return {
	      h: h * 360,
	      s: s,
	      v: max / 255
	    };
	  },
	
	  rgb_to_hex: function rgb_to_hex(r, g, b) {
	    var hex = this.hex_with_component(0, 2, r);
	    hex = this.hex_with_component(hex, 1, g);
	    hex = this.hex_with_component(hex, 0, b);
	    return hex;
	  },
	
	  component_from_hex: function component_from_hex(hex, componentIndex) {
	    return hex >> componentIndex * 8 & 0xFF;
	  },
	
	  hex_with_component: function hex_with_component(hex, componentIndex, value) {
	    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
	  }
	};
	
	exports.default = ColorMath;
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	/**
	 * @class An "abstract" class that represents a given property of an object.
	 *
	 * @param {Object} object The object to be manipulated
	 * @param {string} property The name of the property to be manipulated
	 *
	 * @member dat.controllers
	 */
	var Controller = function () {
	  function Controller(object, property) {
	    _classCallCheck(this, Controller);
	
	    this.initialValue = object[property];
	
	    /**
	     * Those who extend this class will put their DOM elements in here.
	     * @type {DOMElement}
	     */
	    this.domElement = document.createElement('div');
	
	    /**
	     * The object to manipulate
	     * @type {Object}
	     */
	    this.object = object;
	
	    /**
	     * The name of the property to manipulate
	     * @type {String}
	     */
	    this.property = property;
	
	    /**
	     * The function to be called on change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onChange = undefined;
	
	    /**
	     * The function to be called on finishing change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onFinishChange = undefined;
	  }
	
	  /**
	   * Specify that a function fire every time someone changes the value with
	   * this Controller.
	   *
	   * @param {Function} fnc This function will be called whenever the value
	   * is modified via this Controller.
	   * @returns {Controller} this
	   */
	
	
	  Controller.prototype.onChange = function onChange(fnc) {
	    this.__onChange = fnc;
	    return this;
	  };
	
	  /**
	   * Specify that a function fire every time someone "finishes" changing
	   * the value wih this Controller. Useful for values that change
	   * incrementally like numbers or strings.
	   *
	   * @param {Function} fnc This function will be called whenever
	   * someone "finishes" changing the value via this Controller.
	   * @returns {Controller} this
	   */
	
	
	  Controller.prototype.onFinishChange = function onFinishChange(fnc) {
	    this.__onFinishChange = fnc;
	    return this;
	  };
	
	  /**
	   * Change the value of <code>object[property]</code>
	   *
	   * @param {Object} newValue The new value of <code>object[property]</code>
	   */
	
	
	  Controller.prototype.setValue = function setValue(newValue) {
	    this.object[this.property] = newValue;
	    if (this.__onChange) {
	      this.__onChange.call(this, newValue);
	    }
	
	    this.updateDisplay();
	    return this;
	  };
	
	  /**
	   * Gets the value of <code>object[property]</code>
	   *
	   * @returns {Object} The current value of <code>object[property]</code>
	   */
	
	
	  Controller.prototype.getValue = function getValue() {
	    return this.object[this.property];
	  };
	
	  /**
	   * Refreshes the visual display of a Controller in order to keep sync
	   * with the object's current value.
	   * @returns {Controller} this
	   */
	
	
	  Controller.prototype.updateDisplay = function updateDisplay() {
	    return this;
	  };
	
	  /**
	   * @returns {Boolean} true if the value has deviated from initialValue
	   */
	
	
	  Controller.prototype.isModified = function isModified() {
	    return this.initialValue !== this.getValue();
	  };
	
	  return Controller;
	}();
	
	exports.default = Controller;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Controller2 = __webpack_require__(7);
	
	var _Controller3 = _interopRequireDefault(_Controller2);
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * dat-gui JavaScript Controller Library
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://code.google.com/p/dat-gui
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2011 Data Arts Team, Google Creative Lab
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	/**
	 * @class Provides a checkbox input to alter the boolean property of an object.
	 * @extends dat.controllers.Controller
	 *
	 * @param {Object} object The object to be manipulated
	 * @param {string} property The name of the property to be manipulated
	 *
	 * @member dat.controllers
	 */
	var BooleanController = function (_Controller) {
	  _inherits(BooleanController, _Controller);
	
	  function BooleanController(object, property) {
	    _classCallCheck(this, BooleanController);
	
	    var _this2 = _possibleConstructorReturn(this, _Controller.call(this, object, property));
	
	    var _this = _this2;
	    _this2.__prev = _this2.getValue();
	
	    _this2.__checkbox = document.createElement('input');
	    _this2.__checkbox.setAttribute('type', 'checkbox');
	
	    function onChange() {
	      _this.setValue(!_this.__prev);
	    }
	
	    _dom2.default.bind(_this2.__checkbox, 'change', onChange, false);
	
	    _this2.domElement.appendChild(_this2.__checkbox);
	
	    // Match original value
	    _this2.updateDisplay();
	    return _this2;
	  }
	
	  BooleanController.prototype.setValue = function setValue(v) {
	    var toReturn = _Controller.prototype.setValue.call(this, v);
	    if (this.__onFinishChange) {
	      this.__onFinishChange.call(this, this.getValue());
	    }
	    this.__prev = this.getValue();
	    return toReturn;
	  };
	
	  BooleanController.prototype.updateDisplay = function updateDisplay() {
	    if (this.getValue() === true) {
	      this.__checkbox.setAttribute('checked', 'checked');
	      this.__checkbox.checked = true;
	      this.__prev = true;
	    } else {
	      this.__checkbox.checked = false;
	      this.__prev = false;
	    }
	
	    return _Controller.prototype.updateDisplay.call(this);
	  };
	
	  return BooleanController;
	}(_Controller3.default);
	
	exports.default = BooleanController;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _common = __webpack_require__(5);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EVENT_MAP = {
	  HTMLEvents: ['change'],
	  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
	  KeyboardEvents: ['keydown']
	}; /**
	    * dat-gui JavaScript Controller Library
	    * http://code.google.com/p/dat-gui
	    *
	    * Copyright 2011 Data Arts Team, Google Creative Lab
	    *
	    * Licensed under the Apache License, Version 2.0 (the "License");
	    * you may not use this file except in compliance with the License.
	    * You may obtain a copy of the License at
	    *
	    * http://www.apache.org/licenses/LICENSE-2.0
	    */
	
	var EVENT_MAP_INV = {};
	_common2.default.each(EVENT_MAP, function (v, k) {
	  _common2.default.each(v, function (e) {
	    EVENT_MAP_INV[e] = k;
	  });
	});
	
	var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
	
	function cssValueToPixels(val) {
	  if (val === '0' || _common2.default.isUndefined(val)) {
	    return 0;
	  }
	
	  var match = val.match(CSS_VALUE_PIXELS);
	
	  if (!_common2.default.isNull(match)) {
	    return parseFloat(match[1]);
	  }
	
	  // TODO ...ems? %?
	
	  return 0;
	}
	
	/**
	 * @namespace
	 * @member dat.dom
	 */
	var dom = {
	
	  /**
	   *
	   * @param elem
	   * @param selectable
	   */
	  makeSelectable: function makeSelectable(elem, selectable) {
	    if (elem === undefined || elem.style === undefined) return;
	
	    elem.onselectstart = selectable ? function () {
	      return false;
	    } : function () {};
	
	    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
	    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
	    elem.unselectable = selectable ? 'on' : 'off';
	  },
	
	  /**
	   *
	   * @param elem
	   * @param horizontal
	   * @param vert
	   */
	  makeFullscreen: function makeFullscreen(elem, hor, vert) {
	    var vertical = vert;
	    var horizontal = hor;
	
	    if (_common2.default.isUndefined(horizontal)) {
	      horizontal = true;
	    }
	
	    if (_common2.default.isUndefined(vertical)) {
	      vertical = true;
	    }
	
	    elem.style.position = 'absolute';
	
	    if (horizontal) {
	      elem.style.left = 0;
	      elem.style.right = 0;
	    }
	    if (vertical) {
	      elem.style.top = 0;
	      elem.style.bottom = 0;
	    }
	  },
	
	  /**
	   *
	   * @param elem
	   * @param eventType
	   * @param params
	   */
	  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
	    var params = pars || {};
	    var className = EVENT_MAP_INV[eventType];
	    if (!className) {
	      throw new Error('Event type ' + eventType + ' not supported.');
	    }
	    var evt = document.createEvent(className);
	    switch (className) {
	      case 'MouseEvents':
	        {
	          var clientX = params.x || params.clientX || 0;
	          var clientY = params.y || params.clientY || 0;
	          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0, // screen X
	          0, // screen Y
	          clientX, // client X
	          clientY, // client Y
	          false, false, false, false, 0, null);
	          break;
	        }
	      case 'KeyboardEvents':
	        {
	          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
	          _common2.default.defaults(params, {
	            cancelable: true,
	            ctrlKey: false,
	            altKey: false,
	            shiftKey: false,
	            metaKey: false,
	            keyCode: undefined,
	            charCode: undefined
	          });
	          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
	          break;
	        }
	      default:
	        {
	          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
	          break;
	        }
	    }
	    _common2.default.defaults(evt, aux);
	    elem.dispatchEvent(evt);
	  },
	
	  /**
	   *
	   * @param elem
	   * @param event
	   * @param func
	   * @param bool
	   */
	  bind: function bind(elem, event, func, newBool) {
	    var bool = newBool || false;
	    if (elem.addEventListener) {
	      elem.addEventListener(event, func, bool);
	    } else if (elem.attachEvent) {
	      elem.attachEvent('on' + event, func);
	    }
	    return dom;
	  },
	
	  /**
	   *
	   * @param elem
	   * @param event
	   * @param func
	   * @param bool
	   */
	  unbind: function unbind(elem, event, func, newBool) {
	    var bool = newBool || false;
	    if (elem.removeEventListener) {
	      elem.removeEventListener(event, func, bool);
	    } else if (elem.detachEvent) {
	      elem.detachEvent('on' + event, func);
	    }
	    return dom;
	  },
	
	  /**
	   *
	   * @param elem
	   * @param className
	   */
	  addClass: function addClass(elem, className) {
	    if (elem.className === undefined) {
	      elem.className = className;
	    } else if (elem.className !== className) {
	      var classes = elem.className.split(/ +/);
	      if (classes.indexOf(className) === -1) {
	        classes.push(className);
	        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
	      }
	    }
	    return dom;
	  },
	
	  /**
	   *
	   * @param elem
	   * @param className
	   */
	  removeClass: function removeClass(elem, className) {
	    if (className) {
	      if (elem.className === className) {
	        elem.removeAttribute('class');
	      } else {
	        var classes = elem.className.split(/ +/);
	        var index = classes.indexOf(className);
	        if (index !== -1) {
	          classes.splice(index, 1);
	          elem.className = classes.join(' ');
	        }
	      }
	    } else {
	      elem.className = undefined;
	    }
	    return dom;
	  },
	
	  hasClass: function hasClass(elem, className) {
	    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
	  },
	
	  /**
	   *
	   * @param elem
	   */
	  getWidth: function getWidth(elem) {
	    var style = getComputedStyle(elem);
	
	    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
	  },
	
	  /**
	   *
	   * @param elem
	   */
	  getHeight: function getHeight(elem) {
	    var style = getComputedStyle(elem);
	
	    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
	  },
	
	  /**
	   *
	   * @param el
	   */
	  getOffset: function getOffset(el) {
	    var elem = el;
	    var offset = { left: 0, top: 0 };
	    if (elem.offsetParent) {
	      do {
	        offset.left += elem.offsetLeft;
	        offset.top += elem.offsetTop;
	        elem = elem.offsetParent;
	      } while (elem);
	    }
	    return offset;
	  },
	
	  // http://stackoverflow.com/posts/2684561/revisions
	  /**
	   *
	   * @param elem
	   */
	  isActive: function isActive(elem) {
	    return elem === document.activeElement && (elem.type || elem.href);
	  }
	
	};
	
	exports.default = dom;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Controller2 = __webpack_require__(7);
	
	var _Controller3 = _interopRequireDefault(_Controller2);
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _common = __webpack_require__(5);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * dat-gui JavaScript Controller Library
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://code.google.com/p/dat-gui
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2011 Data Arts Team, Google Creative Lab
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	/**
	 * @class Provides a select input to alter the property of an object, using a
	 * list of accepted values.
	 *
	 * @extends dat.controllers.Controller
	 *
	 * @param {Object} object The object to be manipulated
	 * @param {string} property The name of the property to be manipulated
	 * @param {Object|string[]} options A map of labels to acceptable values, or
	 * a list of acceptable string values.
	 *
	 * @member dat.controllers
	 */
	var OptionController = function (_Controller) {
	  _inherits(OptionController, _Controller);
	
	  function OptionController(object, property, opts) {
	    _classCallCheck(this, OptionController);
	
	    var _this2 = _possibleConstructorReturn(this, _Controller.call(this, object, property));
	
	    var options = opts;
	
	    var _this = _this2;
	
	    /**
	     * The drop down menu
	     * @ignore
	     */
	    _this2.__select = document.createElement('select');
	
	    if (_common2.default.isArray(options)) {
	      var map = {};
	      _common2.default.each(options, function (element) {
	        map[element] = element;
	      });
	      options = map;
	    }
	
	    _common2.default.each(options, function (value, key) {
	      var opt = document.createElement('option');
	      opt.innerHTML = key;
	      opt.setAttribute('value', value);
	      _this.__select.appendChild(opt);
	    });
	
	    // Acknowledge original value
	    _this2.updateDisplay();
	
	    _dom2.default.bind(_this2.__select, 'change', function () {
	      var desiredValue = this.options[this.selectedIndex].value;
	      _this.setValue(desiredValue);
	    });
	
	    _this2.domElement.appendChild(_this2.__select);
	    return _this2;
	  }
	
	  OptionController.prototype.setValue = function setValue(v) {
	    var toReturn = _Controller.prototype.setValue.call(this, v);
	
	    if (this.__onFinishChange) {
	      this.__onFinishChange.call(this, this.getValue());
	    }
	    return toReturn;
	  };
	
	  OptionController.prototype.updateDisplay = function updateDisplay() {
	    if (_dom2.default.isActive(this.__select)) return this; // prevent number from updating if user is trying to manually update
	    this.__select.value = this.getValue();
	    return _Controller.prototype.updateDisplay.call(this);
	  };
	
	  return OptionController;
	}(_Controller3.default);
	
	exports.default = OptionController;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Controller2 = __webpack_require__(7);
	
	var _Controller3 = _interopRequireDefault(_Controller2);
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * dat-gui JavaScript Controller Library
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://code.google.com/p/dat-gui
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2011 Data Arts Team, Google Creative Lab
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	/**
	 * @class Provides a text input to alter the string property of an object.
	 *
	 * @extends dat.controllers.Controller
	 *
	 * @param {Object} object The object to be manipulated
	 * @param {string} property The name of the property to be manipulated
	 *
	 * @member dat.controllers
	 */
	var StringController = function (_Controller) {
	  _inherits(StringController, _Controller);
	
	  function StringController(object, property) {
	    _classCallCheck(this, StringController);
	
	    var _this2 = _possibleConstructorReturn(this, _Controller.call(this, object, property));
	
	    var _this = _this2;
	
	    function onChange() {
	      _this.setValue(_this.__input.value);
	    }
	
	    function onBlur() {
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    _this2.__input = document.createElement('input');
	    _this2.__input.setAttribute('type', 'text');
	
	    _dom2.default.bind(_this2.__input, 'keyup', onChange);
	    _dom2.default.bind(_this2.__input, 'change', onChange);
	    _dom2.default.bind(_this2.__input, 'blur', onBlur);
	    _dom2.default.bind(_this2.__input, 'keydown', function (e) {
	      if (e.keyCode === 13) {
	        this.blur();
	      }
	    });
	
	    _this2.updateDisplay();
	
	    _this2.domElement.appendChild(_this2.__input);
	    return _this2;
	  }
	
	  StringController.prototype.updateDisplay = function updateDisplay() {
	    // Stops the caret from moving on account of:
	    // keyup -> setValue -> updateDisplay
	    if (!_dom2.default.isActive(this.__input)) {
	      this.__input.value = this.getValue();
	    }
	    return _Controller.prototype.updateDisplay.call(this);
	  };
	
	  return StringController;
	}(_Controller3.default);
	
	exports.default = StringController;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Controller2 = __webpack_require__(7);
	
	var _Controller3 = _interopRequireDefault(_Controller2);
	
	var _common = __webpack_require__(5);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * dat-gui JavaScript Controller Library
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://code.google.com/p/dat-gui
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2011 Data Arts Team, Google Creative Lab
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	function numDecimals(x) {
	  var _x = x.toString();
	  if (_x.indexOf('.') > -1) {
	    return _x.length - _x.indexOf('.') - 1;
	  }
	
	  return 0;
	}
	
	/**
	 * @class Represents a given property of an object that is a number.
	 *
	 * @extends dat.controllers.Controller
	 *
	 * @param {Object} object The object to be manipulated
	 * @param {string} property The name of the property to be manipulated
	 * @param {Object} [params] Optional parameters
	 * @param {Number} [params.min] Minimum allowed value
	 * @param {Number} [params.max] Maximum allowed value
	 * @param {Number} [params.step] Increment by which to change value
	 *
	 * @member dat.controllers
	 */
	
	var NumberController = function (_Controller) {
	  _inherits(NumberController, _Controller);
	
	  function NumberController(object, property, params) {
	    _classCallCheck(this, NumberController);
	
	    var _this = _possibleConstructorReturn(this, _Controller.call(this, object, property));
	
	    var _params = params || {};
	
	    _this.__min = _params.min;
	    _this.__max = _params.max;
	    _this.__step = _params.step;
	
	    if (_common2.default.isUndefined(_this.__step)) {
	      if (_this.initialValue === 0) {
	        _this.__impliedStep = 1; // What are we, psychics?
	      } else {
	        // Hey Doug, check this out.
	        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
	      }
	    } else {
	      _this.__impliedStep = _this.__step;
	    }
	
	    _this.__precision = numDecimals(_this.__impliedStep);
	    return _this;
	  }
	
	  NumberController.prototype.setValue = function setValue(v) {
	    var _v = v;
	
	    if (this.__min !== undefined && _v < this.__min) {
	      _v = this.__min;
	    } else if (this.__max !== undefined && _v > this.__max) {
	      _v = this.__max;
	    }
	
	    if (this.__step !== undefined && _v % this.__step !== 0) {
	      _v = Math.round(_v / this.__step) * this.__step;
	    }
	
	    return _Controller.prototype.setValue.call(this, _v);
	  };
	
	  /**
	   * Specify a minimum value for <code>object[property]</code>.
	   *
	   * @param {Number} minValue The minimum value for
	   * <code>object[property]</code>
	   * @returns {dat.controllers.NumberController} this
	   */
	
	
	  NumberController.prototype.min = function min(v) {
	    this.__min = v;
	    return this;
	  };
	
	  /**
	   * Specify a maximum value for <code>object[property]</code>.
	   *
	   * @param {Number} maxValue The maximum value for
	   * <code>object[property]</code>
	   * @returns {dat.controllers.NumberController} this
	   */
	
	
	  NumberController.prototype.max = function max(v) {
	    this.__max = v;
	    return this;
	  };
	
	  /**
	   * Specify a step value that dat.controllers.NumberController
	   * increments by.
	   *
	   * @param {Number} stepValue The step value for
	   * dat.controllers.NumberController
	   * @default if minimum and maximum specified increment is 1% of the
	   * difference otherwise stepValue is 1
	   * @returns {dat.controllers.NumberController} this
	   */
	
	
	  NumberController.prototype.step = function step(v) {
	    this.__step = v;
	    this.__impliedStep = v;
	    this.__precision = numDecimals(v);
	    return this;
	  };
	
	  return NumberController;
	}(_Controller3.default);
	
	exports.default = NumberController;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _NumberController2 = __webpack_require__(12);
	
	var _NumberController3 = _interopRequireDefault(_NumberController2);
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _common = __webpack_require__(5);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * dat-gui JavaScript Controller Library
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://code.google.com/p/dat-gui
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2011 Data Arts Team, Google Creative Lab
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	function roundToDecimal(value, decimals) {
	  var tenTo = Math.pow(10, decimals);
	  return Math.round(value * tenTo) / tenTo;
	}
	
	/**
	 * @class Represents a given property of an object that is a number and
	 * provides an input element with which to manipulate it.
	 *
	 * @extends dat.controllers.Controller
	 * @extends dat.controllers.NumberController
	 *
	 * @param {Object} object The object to be manipulated
	 * @param {string} property The name of the property to be manipulated
	 * @param {Object} [params] Optional parameters
	 * @param {Number} [params.min] Minimum allowed value
	 * @param {Number} [params.max] Maximum allowed value
	 * @param {Number} [params.step] Increment by which to change value
	 *
	 * @member dat.controllers
	 */
	
	var NumberControllerBox = function (_NumberController) {
	  _inherits(NumberControllerBox, _NumberController);
	
	  function NumberControllerBox(object, property, params) {
	    _classCallCheck(this, NumberControllerBox);
	
	    var _this2 = _possibleConstructorReturn(this, _NumberController.call(this, object, property, params));
	
	    _this2.__truncationSuspended = false;
	
	    var _this = _this2;
	
	    /**
	     * {Number} Previous mouse y position
	     * @ignore
	     */
	    var prevY = void 0;
	
	    function onChange() {
	      var attempted = parseFloat(_this.__input.value);
	      if (!_common2.default.isNaN(attempted)) {
	        _this.setValue(attempted);
	      }
	    }
	
	    function onFinish() {
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    function onBlur() {
	      onFinish();
	    }
	
	    function onMouseDrag(e) {
	      var diff = prevY - e.clientY;
	      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
	
	      prevY = e.clientY;
	    }
	
	    function onMouseUp() {
	      _dom2.default.unbind(window, 'mousemove', onMouseDrag);
	      _dom2.default.unbind(window, 'mouseup', onMouseUp);
	      onFinish();
	    }
	
	    function onMouseDown(e) {
	      _dom2.default.bind(window, 'mousemove', onMouseDrag);
	      _dom2.default.bind(window, 'mouseup', onMouseUp);
	      prevY = e.clientY;
	    }
	
	    _this2.__input = document.createElement('input');
	    _this2.__input.setAttribute('type', 'text');
	
	    // Makes it so manually specified values are not truncated.
	
	    _dom2.default.bind(_this2.__input, 'change', onChange);
	    _dom2.default.bind(_this2.__input, 'blur', onBlur);
	    _dom2.default.bind(_this2.__input, 'mousedown', onMouseDown);
	    _dom2.default.bind(_this2.__input, 'keydown', function (e) {
	      // When pressing enter, you can be as precise as you want.
	      if (e.keyCode === 13) {
	        _this.__truncationSuspended = true;
	        this.blur();
	        _this.__truncationSuspended = false;
	        onFinish();
	      }
	    });
	
	    _this2.updateDisplay();
	
	    _this2.domElement.appendChild(_this2.__input);
	    return _this2;
	  }
	
	  NumberControllerBox.prototype.updateDisplay = function updateDisplay() {
	    this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
	    return _NumberController.prototype.updateDisplay.call(this);
	  };
	
	  return NumberControllerBox;
	}(_NumberController3.default);
	
	exports.default = NumberControllerBox;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _NumberController2 = __webpack_require__(12);
	
	var _NumberController3 = _interopRequireDefault(_NumberController2);
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * dat-gui JavaScript Controller Library
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://code.google.com/p/dat-gui
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2011 Data Arts Team, Google Creative Lab
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	function map(v, i1, i2, o1, o2) {
	  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
	}
	
	/**
	 * @class Represents a given property of an object that is a number, contains
	 * a minimum and maximum, and provides a slider element with which to
	 * manipulate it. It should be noted that the slider element is made up of
	 * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
	 * <code>&lt;slider&gt;</code> element.
	 *
	 * @extends dat.controllers.Controller
	 * @extends dat.controllers.NumberController
	 *
	 * @param {Object} object The object to be manipulated
	 * @param {string} property The name of the property to be manipulated
	 * @param {Number} minValue Minimum allowed value
	 * @param {Number} maxValue Maximum allowed value
	 * @param {Number} stepValue Increment by which to change value
	 *
	 * @member dat.controllers
	 */
	
	var NumberControllerSlider = function (_NumberController) {
	  _inherits(NumberControllerSlider, _NumberController);
	
	  function NumberControllerSlider(object, property, min, max, step) {
	    _classCallCheck(this, NumberControllerSlider);
	
	    var _this2 = _possibleConstructorReturn(this, _NumberController.call(this, object, property, { min: min, max: max, step: step }));
	
	    var _this = _this2;
	
	    _this2.__background = document.createElement('div');
	    _this2.__foreground = document.createElement('div');
	
	    _dom2.default.bind(_this2.__background, 'mousedown', onMouseDown);
	
	    _dom2.default.addClass(_this2.__background, 'slider');
	    _dom2.default.addClass(_this2.__foreground, 'slider-fg');
	
	    function onMouseDown(e) {
	      document.activeElement.blur();
	
	      _dom2.default.bind(window, 'mousemove', onMouseDrag);
	      _dom2.default.bind(window, 'mouseup', onMouseUp);
	
	      onMouseDrag(e);
	    }
	
	    function onMouseDrag(e) {
	      e.preventDefault();
	
	      var bgRect = _this.__background.getBoundingClientRect();
	
	      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
	
	      return false;
	    }
	
	    function onMouseUp() {
	      _dom2.default.unbind(window, 'mousemove', onMouseDrag);
	      _dom2.default.unbind(window, 'mouseup', onMouseUp);
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    _this2.updateDisplay();
	
	    _this2.__background.appendChild(_this2.__foreground);
	    _this2.domElement.appendChild(_this2.__background);
	    return _this2;
	  }
	
	  NumberControllerSlider.prototype.updateDisplay = function updateDisplay() {
	    var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
	    this.__foreground.style.width = pct * 100 + '%';
	    return _NumberController.prototype.updateDisplay.call(this);
	  };
	
	  return NumberControllerSlider;
	}(_NumberController3.default);
	
	exports.default = NumberControllerSlider;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Controller2 = __webpack_require__(7);
	
	var _Controller3 = _interopRequireDefault(_Controller2);
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * dat-gui JavaScript Controller Library
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://code.google.com/p/dat-gui
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2011 Data Arts Team, Google Creative Lab
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	/**
	 * @class Provides a GUI interface to fire a specified method, a property of an object.
	 *
	 * @extends dat.controllers.Controller
	 *
	 * @param {Object} object The object to be manipulated
	 * @param {string} property The name of the property to be manipulated
	 *
	 * @member dat.controllers
	 */
	var FunctionController = function (_Controller) {
	  _inherits(FunctionController, _Controller);
	
	  function FunctionController(object, property, text) {
	    _classCallCheck(this, FunctionController);
	
	    var _this2 = _possibleConstructorReturn(this, _Controller.call(this, object, property));
	
	    var _this = _this2;
	
	    _this2.__button = document.createElement('div');
	    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
	
	    _dom2.default.bind(_this2.__button, 'click', function (e) {
	      e.preventDefault();
	      _this.fire();
	      return false;
	    });
	
	    _dom2.default.addClass(_this2.__button, 'button');
	
	    _this2.domElement.appendChild(_this2.__button);
	    return _this2;
	  }
	
	  FunctionController.prototype.fire = function fire() {
	    if (this.__onChange) {
	      this.__onChange.call(this);
	    }
	    this.getValue().call(this.object);
	    if (this.__onFinishChange) {
	      this.__onFinishChange.call(this, this.getValue());
	    }
	  };
	
	  return FunctionController;
	}(_Controller3.default);
	
	exports.default = FunctionController;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Controller2 = __webpack_require__(7);
	
	var _Controller3 = _interopRequireDefault(_Controller2);
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _Color = __webpack_require__(2);
	
	var _Color2 = _interopRequireDefault(_Color);
	
	var _interpret = __webpack_require__(3);
	
	var _interpret2 = _interopRequireDefault(_interpret);
	
	var _common = __webpack_require__(5);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * dat-gui JavaScript Controller Library
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://code.google.com/p/dat-gui
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2011 Data Arts Team, Google Creative Lab
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ColorController = function (_Controller) {
	  _inherits(ColorController, _Controller);
	
	  function ColorController(object, property) {
	    _classCallCheck(this, ColorController);
	
	    var _this2 = _possibleConstructorReturn(this, _Controller.call(this, object, property));
	
	    _this2.__color = new _Color2.default(_this2.getValue());
	    _this2.__temp = new _Color2.default(0);
	
	    var _this = _this2;
	
	    _this2.domElement = document.createElement('div');
	
	    _dom2.default.makeSelectable(_this2.domElement, false);
	
	    _this2.__selector = document.createElement('div');
	    _this2.__selector.className = 'selector';
	
	    _this2.__saturation_field = document.createElement('div');
	    _this2.__saturation_field.className = 'saturation-field';
	
	    _this2.__field_knob = document.createElement('div');
	    _this2.__field_knob.className = 'field-knob';
	    _this2.__field_knob_border = '2px solid ';
	
	    _this2.__hue_knob = document.createElement('div');
	    _this2.__hue_knob.className = 'hue-knob';
	
	    _this2.__hue_field = document.createElement('div');
	    _this2.__hue_field.className = 'hue-field';
	
	    _this2.__input = document.createElement('input');
	    _this2.__input.type = 'text';
	    _this2.__input_textShadow = '0 1px 1px ';
	
	    _dom2.default.bind(_this2.__input, 'keydown', function (e) {
	      if (e.keyCode === 13) {
	        // on enter
	        onBlur.call(this);
	      }
	    });
	
	    _dom2.default.bind(_this2.__input, 'blur', onBlur);
	
	    _dom2.default.bind(_this2.__selector, 'mousedown', function () /* e */{
	      _dom2.default.addClass(this, 'drag').bind(window, 'mouseup', function () /* e */{
	        _dom2.default.removeClass(_this.__selector, 'drag');
	      });
	    });
	
	    var valueField = document.createElement('div');
	
	    _common2.default.extend(_this2.__selector.style, {
	      width: '122px',
	      height: '102px',
	      padding: '3px',
	      backgroundColor: '#222',
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
	    });
	
	    _common2.default.extend(_this2.__field_knob.style, {
	      position: 'absolute',
	      width: '12px',
	      height: '12px',
	      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
	      borderRadius: '12px',
	      zIndex: 1
	    });
	
	    _common2.default.extend(_this2.__hue_knob.style, {
	      position: 'absolute',
	      width: '15px',
	      height: '2px',
	      borderRight: '4px solid #fff',
	      zIndex: 1
	    });
	
	    _common2.default.extend(_this2.__saturation_field.style, {
	      width: '100px',
	      height: '100px',
	      border: '1px solid #555',
	      marginRight: '3px',
	      display: 'inline-block',
	      cursor: 'pointer'
	    });
	
	    _common2.default.extend(valueField.style, {
	      width: '100%',
	      height: '100%',
	      background: 'none'
	    });
	
	    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
	
	    _common2.default.extend(_this2.__hue_field.style, {
	      width: '15px',
	      height: '100px',
	      border: '1px solid #555',
	      cursor: 'ns-resize',
	      position: 'absolute',
	      top: '3px',
	      right: '3px'
	    });
	
	    hueGradient(_this2.__hue_field);
	
	    _common2.default.extend(_this2.__input.style, {
	      outline: 'none',
	      //      width: '120px',
	      textAlign: 'center',
	      //      padding: '4px',
	      //      marginBottom: '6px',
	      color: '#fff',
	      border: 0,
	      fontWeight: 'bold',
	      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
	    });
	
	    _dom2.default.bind(_this2.__saturation_field, 'mousedown', fieldDown);
	    _dom2.default.bind(_this2.__field_knob, 'mousedown', fieldDown);
	
	    _dom2.default.bind(_this2.__hue_field, 'mousedown', function (e) {
	      setH(e);
	      _dom2.default.bind(window, 'mousemove', setH);
	      _dom2.default.bind(window, 'mouseup', fieldUpH);
	    });
	
	    function fieldDown(e) {
	      setSV(e);
	      // document.body.style.cursor = 'none';
	      _dom2.default.bind(window, 'mousemove', setSV);
	      _dom2.default.bind(window, 'mouseup', fieldUpSV);
	    }
	
	    function fieldUpSV() {
	      _dom2.default.unbind(window, 'mousemove', setSV);
	      _dom2.default.unbind(window, 'mouseup', fieldUpSV);
	      // document.body.style.cursor = 'default';
	      onFinish();
	    }
	
	    function onBlur() {
	      var i = (0, _interpret2.default)(this.value);
	      if (i !== false) {
	        _this.__color.__state = i;
	        _this.setValue(_this.__color.toOriginal());
	      } else {
	        this.value = _this.__color.toString();
	      }
	    }
	
	    function fieldUpH() {
	      _dom2.default.unbind(window, 'mousemove', setH);
	      _dom2.default.unbind(window, 'mouseup', fieldUpH);
	      onFinish();
	    }
	
	    function onFinish() {
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
	      }
	    }
	
	    _this2.__saturation_field.appendChild(valueField);
	    _this2.__selector.appendChild(_this2.__field_knob);
	    _this2.__selector.appendChild(_this2.__saturation_field);
	    _this2.__selector.appendChild(_this2.__hue_field);
	    _this2.__hue_field.appendChild(_this2.__hue_knob);
	
	    _this2.domElement.appendChild(_this2.__input);
	    _this2.domElement.appendChild(_this2.__selector);
	
	    _this2.updateDisplay();
	
	    function setSV(e) {
	      e.preventDefault();
	
	      var fieldRect = _this.__saturation_field.getBoundingClientRect();
	      var s = (e.clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
	      var v = 1 - (e.clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
	
	      if (v > 1) {
	        v = 1;
	      } else if (v < 0) {
	        v = 0;
	      }
	
	      if (s > 1) {
	        s = 1;
	      } else if (s < 0) {
	        s = 0;
	      }
	
	      _this.__color.v = v;
	      _this.__color.s = s;
	
	      _this.setValue(_this.__color.toOriginal());
	
	      return false;
	    }
	
	    function setH(e) {
	      e.preventDefault();
	
	      var fieldRect = _this.__hue_field.getBoundingClientRect();
	      var h = 1 - (e.clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
	
	      if (h > 1) {
	        h = 1;
	      } else if (h < 0) {
	        h = 0;
	      }
	
	      _this.__color.h = h * 360;
	
	      _this.setValue(_this.__color.toOriginal());
	
	      return false;
	    }
	    return _this2;
	  }
	
	  ColorController.prototype.updateDisplay = function updateDisplay() {
	    var i = (0, _interpret2.default)(this.getValue());
	
	    if (i !== false) {
	      var mismatch = false;
	
	      // Check for mismatch on the interpreted value.
	
	      _common2.default.each(_Color2.default.COMPONENTS, function (component) {
	        if (!_common2.default.isUndefined(i[component]) && !_common2.default.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
	          mismatch = true;
	          return {}; // break
	        }
	      }, this);
	
	      // If nothing diverges, we keep our previous values
	      // for statefulness, otherwise we recalculate fresh
	      if (mismatch) {
	        _common2.default.extend(this.__color.__state, i);
	      }
	    }
	
	    _common2.default.extend(this.__temp.__state, this.__color.__state);
	
	    this.__temp.a = 1;
	
	    var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
	    var _flip = 255 - flip;
	
	    _common2.default.extend(this.__field_knob.style, {
	      marginLeft: 100 * this.__color.s - 7 + 'px',
	      marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
	      backgroundColor: this.__temp.toHexString(),
	      border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
	    });
	
	    this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
	
	    this.__temp.s = 1;
	    this.__temp.v = 1;
	
	    linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
	
	    this.__input.value = this.__color.toString();
	
	    _common2.default.extend(this.__input.style, {
	      backgroundColor: this.__color.toHexString(),
	      color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
	      textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
	    });
	  };
	
	  return ColorController;
	}(_Controller3.default);
	
	var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];
	
	function linearGradient(elem, x, a, b) {
	  elem.style.background = '';
	  _common2.default.each(vendors, function (vendor) {
	    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
	  });
	}
	
	function hueGradient(elem) {
	  elem.style.background = '';
	  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
	  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
	  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
	  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
	  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
	}
	
	exports.default = ColorController;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * dat-gui JavaScript Controller Library
	                                                                                                                                                                                                                                                                               * http://code.google.com/p/dat-gui
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * Copyright 2011 Data Arts Team, Google Creative Lab
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                               * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                               * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                               */
	
	var _css = __webpack_require__(18);
	
	var _css2 = _interopRequireDefault(_css);
	
	var _saveDialogue = __webpack_require__(19);
	
	var _saveDialogue2 = _interopRequireDefault(_saveDialogue);
	
	var _ControllerFactory = __webpack_require__(20);
	
	var _ControllerFactory2 = _interopRequireDefault(_ControllerFactory);
	
	var _Controller = __webpack_require__(7);
	
	var _Controller2 = _interopRequireDefault(_Controller);
	
	var _BooleanController = __webpack_require__(8);
	
	var _BooleanController2 = _interopRequireDefault(_BooleanController);
	
	var _FunctionController = __webpack_require__(15);
	
	var _FunctionController2 = _interopRequireDefault(_FunctionController);
	
	var _NumberControllerBox = __webpack_require__(13);
	
	var _NumberControllerBox2 = _interopRequireDefault(_NumberControllerBox);
	
	var _NumberControllerSlider = __webpack_require__(14);
	
	var _NumberControllerSlider2 = _interopRequireDefault(_NumberControllerSlider);
	
	var _ColorController = __webpack_require__(16);
	
	var _ColorController2 = _interopRequireDefault(_ColorController);
	
	var _requestAnimationFrame = __webpack_require__(21);
	
	var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);
	
	var _CenteredDiv = __webpack_require__(22);
	
	var _CenteredDiv2 = _interopRequireDefault(_CenteredDiv);
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _common = __webpack_require__(5);
	
	var _common2 = _interopRequireDefault(_common);
	
	var _style = __webpack_require__(23);
	
	var _style2 = _interopRequireDefault(_style);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// CSS to embed in build
	
	_css2.default.inject(_style2.default);
	
	/** Outer-most className for GUI's */
	var CSS_NAMESPACE = 'dg';
	
	var HIDE_KEY_CODE = 72;
	
	/** The only value shared between the JS and SCSS. Use caution. */
	var CLOSE_BUTTON_HEIGHT = 20;
	
	var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
	
	var SUPPORTS_LOCAL_STORAGE = function () {
	  try {
	    return 'localStorage' in window && window.localStorage !== null;
	  } catch (e) {
	    return false;
	  }
	}();
	
	var SAVE_DIALOGUE = void 0;
	
	/** Have we yet to create an autoPlace GUI? */
	var autoPlaceVirgin = true;
	
	/** Fixed position div that auto place GUI's go inside */
	var autoPlaceContainer = void 0;
	
	/** Are we hiding the GUI's ? */
	var hide = false;
	
	/** GUI's which should be hidden */
	var hideableGuis = [];
	
	/**
	 * A lightweight controller library for JavaScript. It allows you to easily
	 * manipulate variables and fire functions on the fly.
	 * @class
	 *
	 * @member dat.gui
	 *
	 * @param {Object} [params]
	 * @param {String} [params.name] The name of this GUI.
	 * @param {Object} [params.load] JSON object representing the saved state of
	 * this GUI.
	 * @param {Boolean} [params.auto=true]
	 * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
	 * @param {Boolean} [params.closed] If true, starts closed
	 * @param {Boolean} [params.closeOnTop] If true, close/open button shows on top of the GUI
	 */
	var GUI = function GUI(pars) {
	  var _this = this;
	
	  var params = pars || {};
	
	  /**
	   * Outermost DOM Element
	   * @type DOMElement
	   */
	  this.domElement = document.createElement('div');
	  this.__ul = document.createElement('ul');
	  this.domElement.appendChild(this.__ul);
	
	  _dom2.default.addClass(this.domElement, CSS_NAMESPACE);
	
	  /**
	   * Nested GUI's by name
	   * @ignore
	   */
	  this.__folders = {};
	
	  this.__controllers = [];
	
	  /**
	   * List of objects I'm remembering for save, only used in top level GUI
	   * @ignore
	   */
	  this.__rememberedObjects = [];
	
	  /**
	   * Maps the index of remembered objects to a map of controllers, only used
	   * in top level GUI.
	   *
	   * @private
	   * @ignore
	   *
	   * @example
	   * [
	   *  {
	     *    propertyName: Controller,
	     *    anotherPropertyName: Controller
	     *  },
	   *  {
	     *    propertyName: Controller
	     *  }
	   * ]
	   */
	  this.__rememberedObjectIndecesToControllers = [];
	
	  this.__listening = [];
	
	  // Default parameters
	  params = _common2.default.defaults(params, {
	    closeOnTop: false,
	    autoPlace: true,
	    width: GUI.DEFAULT_WIDTH
	  });
	
	  params = _common2.default.defaults(params, {
	    resizable: params.autoPlace,
	    hideable: params.autoPlace
	  });
	
	  if (!_common2.default.isUndefined(params.load)) {
	    // Explicit preset
	    if (params.preset) {
	      params.load.preset = params.preset;
	    }
	  } else {
	    params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
	  }
	
	  if (_common2.default.isUndefined(params.parent) && params.hideable) {
	    hideableGuis.push(this);
	  }
	
	  // Only root level GUI's are resizable.
	  params.resizable = _common2.default.isUndefined(params.parent) && params.resizable;
	
	  if (params.autoPlace && _common2.default.isUndefined(params.scrollable)) {
	    params.scrollable = true;
	  }
	  //    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;
	
	  // Not part of params because I don't want people passing this in via
	  // constructor. Should be a 'remembered' value.
	  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
	
	  var saveToLocalStorage = void 0;
	
	  Object.defineProperties(this,
	  /** @lends dat.gui.GUI.prototype */
	  {
	    /**
	     * The parent <code>GUI</code>
	     * @type dat.gui.GUI
	     */
	    parent: {
	      get: function get() {
	        return params.parent;
	      }
	    },
	
	    scrollable: {
	      get: function get() {
	        return params.scrollable;
	      }
	    },
	
	    /**
	     * Handles <code>GUI</code>'s element placement for you
	     * @type Boolean
	     */
	    autoPlace: {
	      get: function get() {
	        return params.autoPlace;
	      }
	    },
	
	    /**
	     * Handles <code>GUI</code>'s position of open/close button
	     * @type Boolean
	     */
	    closeOnTop: {
	      get: function get() {
	        return params.closeOnTop;
	      }
	    },
	
	    /**
	     * The identifier for a set of saved values
	     * @type String
	     */
	    preset: {
	      get: function get() {
	        if (_this.parent) {
	          return _this.getRoot().preset;
	        }
	
	        return params.load.preset;
	      },
	
	      set: function set(v) {
	        if (_this.parent) {
	          _this.getRoot().preset = v;
	        } else {
	          params.load.preset = v;
	        }
	        setPresetSelectIndex(this);
	        _this.revert();
	      }
	    },
	
	    /**
	     * The width of <code>GUI</code> element
	     * @type Number
	     */
	    width: {
	      get: function get() {
	        return params.width;
	      },
	      set: function set(v) {
	        params.width = v;
	        setWidth(_this, v);
	      }
	    },
	
	    /**
	     * The name of <code>GUI</code>. Used for folders. i.e
	     * a folder's name
	     * @type String
	     */
	    name: {
	      get: function get() {
	        return params.name;
	      },
	      set: function set(v) {
	        // TODO Check for collisions among sibling folders
	        params.name = v;
	        if (titleRowName) {
	          titleRowName.innerHTML = params.name;
	        }
	      }
	    },
	
	    /**
	     * Whether the <code>GUI</code> is collapsed or not
	     * @type Boolean
	     */
	    closed: {
	      get: function get() {
	        return params.closed;
	      },
	      set: function set(v) {
	        params.closed = v;
	        if (params.closed) {
	          _dom2.default.addClass(_this.__ul, GUI.CLASS_CLOSED);
	        } else {
	          _dom2.default.removeClass(_this.__ul, GUI.CLASS_CLOSED);
	        }
	        // For browsers that aren't going to respect the CSS transition,
	        // Lets just check our height against the window height right off
	        // the bat.
	        this.onResize();
	
	        if (_this.__closeButton) {
	          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
	        }
	      }
	    },
	
	    /**
	     * Contains all presets
	     * @type Object
	     */
	    load: {
	      get: function get() {
	        return params.load;
	      }
	    },
	
	    /**
	     * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
	     * <code>remember</code>ing
	     * @type Boolean
	     */
	    useLocalStorage: {
	
	      get: function get() {
	        return useLocalStorage;
	      },
	      set: function set(bool) {
	        if (SUPPORTS_LOCAL_STORAGE) {
	          useLocalStorage = bool;
	          if (bool) {
	            _dom2.default.bind(window, 'unload', saveToLocalStorage);
	          } else {
	            _dom2.default.unbind(window, 'unload', saveToLocalStorage);
	          }
	          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
	        }
	      }
	    }
	  });
	
	  // Are we a root level GUI?
	  if (_common2.default.isUndefined(params.parent)) {
	    params.closed = false;
	
	    _dom2.default.addClass(this.domElement, GUI.CLASS_MAIN);
	    _dom2.default.makeSelectable(this.domElement, false);
	
	    // Are we supposed to be loading locally?
	    if (SUPPORTS_LOCAL_STORAGE) {
	      if (useLocalStorage) {
	        _this.useLocalStorage = true;
	
	        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
	
	        if (savedGui) {
	          params.load = JSON.parse(savedGui);
	        }
	      }
	    }
	
	    this.__closeButton = document.createElement('div');
	    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
	    _dom2.default.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
	    if (params.closeOnTop) {
	      _dom2.default.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
	      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
	    } else {
	      _dom2.default.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
	      this.domElement.appendChild(this.__closeButton);
	    }
	
	    _dom2.default.bind(this.__closeButton, 'click', function () {
	      _this.closed = !_this.closed;
	    });
	    // Oh, you're a nested GUI!
	  } else {
	    if (params.closed === undefined) {
	      params.closed = true;
	    }
	
	    var _titleRowName = document.createTextNode(params.name);
	    _dom2.default.addClass(_titleRowName, 'controller-name');
	
	    var titleRow = addRow(_this, _titleRowName);
	
	    var onClickTitle = function onClickTitle(e) {
	      e.preventDefault();
	      _this.closed = !_this.closed;
	      return false;
	    };
	
	    _dom2.default.addClass(this.__ul, GUI.CLASS_CLOSED);
	
	    _dom2.default.addClass(titleRow, 'title');
	    _dom2.default.bind(titleRow, 'click', onClickTitle);
	
	    if (!params.closed) {
	      this.closed = false;
	    }
	  }
	
	  if (params.autoPlace) {
	    if (_common2.default.isUndefined(params.parent)) {
	      if (autoPlaceVirgin) {
	        autoPlaceContainer = document.createElement('div');
	        _dom2.default.addClass(autoPlaceContainer, CSS_NAMESPACE);
	        _dom2.default.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
	        document.body.appendChild(autoPlaceContainer);
	        autoPlaceVirgin = false;
	      }
	
	      // Put it in the dom for you.
	      autoPlaceContainer.appendChild(this.domElement);
	
	      // Apply the auto styles
	      _dom2.default.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
	    }
	
	    // Make it not elastic.
	    if (!this.parent) {
	      setWidth(_this, params.width);
	    }
	  }
	
	  this.__resizeHandler = function () {
	    _this.onResizeDebounced();
	  };
	
	  _dom2.default.bind(window, 'resize', this.__resizeHandler);
	  _dom2.default.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
	  _dom2.default.bind(this.__ul, 'transitionend', this.__resizeHandler);
	  _dom2.default.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
	  this.onResize();
	
	  if (params.resizable) {
	    addResizeHandle(this);
	  }
	
	  saveToLocalStorage = function saveToLocalStorage() {
	    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
	      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
	    }
	  };
	
	  // expose this method publicly
	  this.saveToLocalStorageIfPossible = saveToLocalStorage;
	
	  function resetWidth() {
	    var root = _this.getRoot();
	    root.width += 1;
	    _common2.default.defer(function () {
	      root.width -= 1;
	    });
	  }
	
	  if (!params.parent) {
	    resetWidth();
	  }
	};
	
	GUI.toggleHide = function () {
	  hide = !hide;
	  _common2.default.each(hideableGuis, function (gui) {
	    gui.domElement.style.display = hide ? 'none' : '';
	  });
	};
	
	GUI.CLASS_AUTO_PLACE = 'a';
	GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
	GUI.CLASS_MAIN = 'main';
	GUI.CLASS_CONTROLLER_ROW = 'cr';
	GUI.CLASS_TOO_TALL = 'taller-than-window';
	GUI.CLASS_CLOSED = 'closed';
	GUI.CLASS_CLOSE_BUTTON = 'close-button';
	GUI.CLASS_CLOSE_TOP = 'close-top';
	GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
	GUI.CLASS_DRAG = 'drag';
	
	GUI.DEFAULT_WIDTH = 245;
	GUI.TEXT_CLOSED = 'Close Controls';
	GUI.TEXT_OPEN = 'Open Controls';
	
	GUI._keydownHandler = function (e) {
	  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
	    GUI.toggleHide();
	  }
	};
	_dom2.default.bind(window, 'keydown', GUI._keydownHandler, false);
	
	_common2.default.extend(GUI.prototype,
	
	/** @lends dat.gui.GUI */
	{
	
	  /**
	   * @param object
	   * @param property
	   * @returns {dat.controllers.Controller} The new controller that was added.
	   * @instance
	   */
	  add: function add(object, property) {
	    return _add(this, object, property, {
	      factoryArgs: Array.prototype.slice.call(arguments, 2)
	    });
	  },
	
	  /**
	   * @param object
	   * @param property
	   * @returns {dat.controllers.ColorController} The new controller that was added.
	   * @instance
	   */
	  addColor: function addColor(object, property) {
	    return _add(this, object, property, {
	      color: true
	    });
	  },
	
	  /**
	   * @param controller
	   * @instance
	   */
	  remove: function remove(controller) {
	    // TODO listening?
	    this.__ul.removeChild(controller.__li);
	    this.__controllers.splice(this.__controllers.indexOf(controller), 1);
	    var _this = this;
	    _common2.default.defer(function () {
	      _this.onResize();
	    });
	  },
	
	  destroy: function destroy() {
	    if (this.autoPlace) {
	      autoPlaceContainer.removeChild(this.domElement);
	    }
	
	    _dom2.default.unbind(window, 'keydown', GUI._keydownHandler, false);
	    _dom2.default.unbind(window, 'resize', this.__resizeHandler);
	
	    if (this.saveToLocalStorageIfPossible) {
	      _dom2.default.unbind(window, 'unload', this.saveToLocalStorageIfPossible);
	    }
	  },
	
	  /**
	   * @param name
	   * @returns {dat.gui.GUI} The new folder.
	   * @throws {Error} if this GUI already has a folder by the specified
	   * name
	   * @instance
	   */
	  addFolder: function addFolder(name) {
	    // We have to prevent collisions on names in order to have a key
	    // by which to remember saved values
	    if (this.__folders[name] !== undefined) {
	      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
	    }
	
	    var newGuiParams = { name: name, parent: this };
	
	    // We need to pass down the autoPlace trait so that we can
	    // attach event listeners to open/close folder actions to
	    // ensure that a scrollbar appears if the window is too short.
	    newGuiParams.autoPlace = this.autoPlace;
	
	    // Do we have saved appearance data for this folder?
	    if (this.load && // Anything loaded?
	    this.load.folders && // Was my parent a dead-end?
	    this.load.folders[name]) {
	      // Did daddy remember me?
	      // Start me closed if I was closed
	      newGuiParams.closed = this.load.folders[name].closed;
	
	      // Pass down the loaded data
	      newGuiParams.load = this.load.folders[name];
	    }
	
	    var gui = new GUI(newGuiParams);
	    this.__folders[name] = gui;
	
	    var li = addRow(this, gui.domElement);
	    _dom2.default.addClass(li, 'folder');
	    return gui;
	  },
	
	  open: function open() {
	    this.closed = false;
	  },
	
	  close: function close() {
	    this.closed = true;
	  },
	
	  onResize: function onResize() {
	    // we debounce this function to prevent performance issues when rotating on tablet/mobile
	    var root = this.getRoot();
	    if (root.scrollable) {
	      var top = _dom2.default.getOffset(root.__ul).top;
	      var h = 0;
	
	      _common2.default.each(root.__ul.childNodes, function (node) {
	        if (!(root.autoPlace && node === root.__save_row)) {
	          h += _dom2.default.getHeight(node);
	        }
	      });
	
	      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
	        _dom2.default.addClass(root.domElement, GUI.CLASS_TOO_TALL);
	        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
	      } else {
	        _dom2.default.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
	        root.__ul.style.height = 'auto';
	      }
	    }
	
	    if (root.__resize_handle) {
	      _common2.default.defer(function () {
	        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
	      });
	    }
	
	    if (root.__closeButton) {
	      root.__closeButton.style.width = root.width + 'px';
	    }
	  },
	
	  onResizeDebounced: _common2.default.debounce(function () {
	    this.onResize();
	  }, 50),
	
	  /**
	   * Mark objects for saving. The order of these objects cannot change as
	   * the GUI grows. When remembering new objects, append them to the end
	   * of the list.
	   *
	   * @param {Object...} objects
	   * @throws {Error} if not called on a top level GUI.
	   * @instance
	   */
	  remember: function remember() {
	    if (_common2.default.isUndefined(SAVE_DIALOGUE)) {
	      SAVE_DIALOGUE = new _CenteredDiv2.default();
	      SAVE_DIALOGUE.domElement.innerHTML = _saveDialogue2.default;
	    }
	
	    if (this.parent) {
	      throw new Error('You can only call remember on a top level GUI.');
	    }
	
	    var _this = this;
	
	    _common2.default.each(Array.prototype.slice.call(arguments), function (object) {
	      if (_this.__rememberedObjects.length === 0) {
	        addSaveMenu(_this);
	      }
	      if (_this.__rememberedObjects.indexOf(object) === -1) {
	        _this.__rememberedObjects.push(object);
	      }
	    });
	
	    if (this.autoPlace) {
	      // Set save row width
	      setWidth(this, this.width);
	    }
	  },
	
	  /**
	   * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
	   * @instance
	   */
	  getRoot: function getRoot() {
	    var gui = this;
	    while (gui.parent) {
	      gui = gui.parent;
	    }
	    return gui;
	  },
	
	  /**
	   * @returns {Object} a JSON object representing the current state of
	   * this GUI as well as its remembered properties.
	   * @instance
	   */
	  getSaveObject: function getSaveObject() {
	    var toReturn = this.load;
	    toReturn.closed = this.closed;
	
	    // Am I remembering any values?
	    if (this.__rememberedObjects.length > 0) {
	      toReturn.preset = this.preset;
	
	      if (!toReturn.remembered) {
	        toReturn.remembered = {};
	      }
	
	      toReturn.remembered[this.preset] = getCurrentPreset(this);
	    }
	
	    toReturn.folders = {};
	    _common2.default.each(this.__folders, function (element, key) {
	      toReturn.folders[key] = element.getSaveObject();
	    });
	
	    return toReturn;
	  },
	
	  save: function save() {
	    if (!this.load.remembered) {
	      this.load.remembered = {};
	    }
	
	    this.load.remembered[this.preset] = getCurrentPreset(this);
	    markPresetModified(this, false);
	    this.saveToLocalStorageIfPossible();
	  },
	
	  saveAs: function saveAs(presetName) {
	    if (!this.load.remembered) {
	      // Retain default values upon first save
	      this.load.remembered = {};
	      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
	    }
	
	    this.load.remembered[presetName] = getCurrentPreset(this);
	    this.preset = presetName;
	    addPresetOption(this, presetName, true);
	    this.saveToLocalStorageIfPossible();
	  },
	
	  revert: function revert(gui) {
	    _common2.default.each(this.__controllers, function (controller) {
	      // Make revert work on Default.
	      if (!this.getRoot().load.remembered) {
	        controller.setValue(controller.initialValue);
	      } else {
	        recallSavedValue(gui || this.getRoot(), controller);
	      }
	
	      // fire onFinishChange callback
	      if (controller.__onFinishChange) {
	        controller.__onFinishChange.call(controller, controller.getValue());
	      }
	    }, this);
	
	    _common2.default.each(this.__folders, function (folder) {
	      folder.revert(folder);
	    });
	
	    if (!gui) {
	      markPresetModified(this.getRoot(), false);
	    }
	  },
	
	  listen: function listen(controller) {
	    var init = this.__listening.length === 0;
	    this.__listening.push(controller);
	    if (init) {
	      updateDisplays(this.__listening);
	    }
	  },
	
	  updateDisplay: function updateDisplay() {
	    _common2.default.each(this.__controllers, function (controller) {
	      controller.updateDisplay();
	    });
	    _common2.default.each(this.__folders, function (folder) {
	      folder.updateDisplay();
	    });
	  }
	});
	
	/**
	 * Add a row to the end of the GUI or before another row.
	 *
	 * @param gui
	 * @param [newDom] If specified, inserts the dom content in the new row
	 * @param [liBefore] If specified, places the new row before another row
	 */
	function addRow(gui, newDom, liBefore) {
	  var li = document.createElement('li');
	  if (newDom) {
	    li.appendChild(newDom);
	  }
	
	  if (liBefore) {
	    gui.__ul.insertBefore(li, liBefore);
	  } else {
	    gui.__ul.appendChild(li);
	  }
	  gui.onResize();
	  return li;
	}
	
	function markPresetModified(gui, modified) {
	  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
	
	  // console.log('mark', modified, opt);
	  if (modified) {
	    opt.innerHTML = opt.value + '*';
	  } else {
	    opt.innerHTML = opt.value;
	  }
	}
	
	function augmentController(gui, li, controller) {
	  controller.__li = li;
	  controller.__gui = gui;
	
	  _common2.default.extend(controller, {
	    options: function options(_options) {
	      if (arguments.length > 1) {
	        var nextSibling = controller.__li.nextElementSibling;
	        controller.remove();
	
	        return _add(gui, controller.object, controller.property, {
	          before: nextSibling,
	          factoryArgs: [_common2.default.toArray(arguments)]
	        });
	      }
	
	      if (_common2.default.isArray(_options) || _common2.default.isObject(_options)) {
	        var _nextSibling = controller.__li.nextElementSibling;
	        controller.remove();
	
	        return _add(gui, controller.object, controller.property, {
	          before: _nextSibling,
	          factoryArgs: [_options]
	        });
	      }
	    },
	
	    name: function name(v) {
	      controller.__li.firstElementChild.firstElementChild.innerHTML = v;
	      return controller;
	    },
	
	    listen: function listen() {
	      controller.__gui.listen(controller);
	      return controller;
	    },
	
	    remove: function remove() {
	      controller.__gui.remove(controller);
	      return controller;
	    }
	  });
	
	  // All sliders should be accompanied by a box.
	  if (controller instanceof _NumberControllerSlider2.default) {
	    var box = new _NumberControllerBox2.default(controller.object, controller.property, { min: controller.__min, max: controller.__max, step: controller.__step });
	
	    _common2.default.each(['updateDisplay', 'onChange', 'onFinishChange', 'step'], function (method) {
	      var pc = controller[method];
	      var pb = box[method];
	      controller[method] = box[method] = function () {
	        var args = Array.prototype.slice.call(arguments);
	        pb.apply(box, args);
	        return pc.apply(controller, args);
	      };
	    });
	
	    _dom2.default.addClass(li, 'has-slider');
	    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
	  } else if (controller instanceof _NumberControllerBox2.default) {
	    var r = function r(returned) {
	      // Have we defined both boundaries?
	      if (_common2.default.isNumber(controller.__min) && _common2.default.isNumber(controller.__max)) {
	        // Well, then lets just replace this with a slider.
	
	        // lets remember if the old controller had a specific name or was listening
	        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
	        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
	
	        controller.remove();
	        var newController = _add(gui, controller.object, controller.property, {
	          before: controller.__li.nextElementSibling,
	          factoryArgs: [controller.__min, controller.__max, controller.__step]
	        });
	
	        newController.name(oldName);
	        if (wasListening) newController.listen();
	
	        return newController;
	      }
	
	      return returned;
	    };
	
	    controller.min = _common2.default.compose(r, controller.min);
	    controller.max = _common2.default.compose(r, controller.max);
	  } else if (controller instanceof _BooleanController2.default) {
	    _dom2.default.bind(li, 'click', function () {
	      _dom2.default.fakeEvent(controller.__checkbox, 'click');
	    });
	
	    _dom2.default.bind(controller.__checkbox, 'click', function (e) {
	      e.stopPropagation(); // Prevents double-toggle
	    });
	  } else if (controller instanceof _FunctionController2.default) {
	    _dom2.default.bind(li, 'click', function () {
	      _dom2.default.fakeEvent(controller.__button, 'click');
	    });
	
	    _dom2.default.bind(li, 'mouseover', function () {
	      _dom2.default.addClass(controller.__button, 'hover');
	    });
	
	    _dom2.default.bind(li, 'mouseout', function () {
	      _dom2.default.removeClass(controller.__button, 'hover');
	    });
	  } else if (controller instanceof _ColorController2.default) {
	    _dom2.default.addClass(li, 'color');
	    controller.updateDisplay = _common2.default.compose(function (val) {
	      li.style.borderLeftColor = controller.__color.toString();
	      return val;
	    }, controller.updateDisplay);
	
	    controller.updateDisplay();
	  }
	
	  controller.setValue = _common2.default.compose(function (val) {
	    if (gui.getRoot().__preset_select && controller.isModified()) {
	      markPresetModified(gui.getRoot(), true);
	    }
	
	    return val;
	  }, controller.setValue);
	}
	
	function recallSavedValue(gui, controller) {
	  // Find the topmost GUI, that's where remembered objects live.
	  var root = gui.getRoot();
	
	  // Does the object we're controlling match anything we've been told to
	  // remember?
	  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);
	
	  // Why yes, it does!
	  if (matchedIndex !== -1) {
	    // Let me fetch a map of controllers for thcommon.isObject.
	    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];
	
	    // Ohp, I believe this is the first controller we've created for this
	    // object. Lets make the map fresh.
	    if (controllerMap === undefined) {
	      controllerMap = {};
	      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
	    }
	
	    // Keep track of this controller
	    controllerMap[controller.property] = controller;
	
	    // Okay, now have we saved any values for this controller?
	    if (root.load && root.load.remembered) {
	      var presetMap = root.load.remembered;
	
	      // Which preset are we trying to load?
	      var preset = void 0;
	
	      if (presetMap[gui.preset]) {
	        preset = presetMap[gui.preset];
	      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
	        // Uhh, you can have the default instead?
	        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
	      } else {
	        // Nada.
	        return;
	      }
	
	      // Did the loaded object remember thcommon.isObject? &&  Did we remember this particular property?
	      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
	        // We did remember something for this guy ...
	        var value = preset[matchedIndex][controller.property];
	
	        // And that's what it is.
	        controller.initialValue = value;
	        controller.setValue(value);
	      }
	    }
	  }
	}
	
	function _add(gui, object, property, params) {
	  if (object[property] === undefined) {
	    throw new Error('Object "' + object + '" has no property "' + property + '"');
	  }
	
	  var controller = void 0;
	
	  if (params.color) {
	    controller = new _ColorController2.default(object, property);
	  } else {
	    var factoryArgs = [object, property].concat(params.factoryArgs);
	    controller = _ControllerFactory2.default.apply(gui, factoryArgs);
	  }
	
	  if (params.before instanceof _Controller2.default) {
	    params.before = params.before.__li;
	  }
	
	  recallSavedValue(gui, controller);
	
	  _dom2.default.addClass(controller.domElement, 'c');
	
	  var name = document.createElement('span');
	  _dom2.default.addClass(name, 'property-name');
	  name.innerHTML = controller.property;
	
	  var container = document.createElement('div');
	  container.appendChild(name);
	  container.appendChild(controller.domElement);
	
	  var li = addRow(gui, container, params.before);
	
	  _dom2.default.addClass(li, GUI.CLASS_CONTROLLER_ROW);
	  if (controller instanceof _ColorController2.default) {
	    _dom2.default.addClass(li, 'color');
	  } else {
	    _dom2.default.addClass(li, _typeof(controller.getValue()));
	  }
	
	  augmentController(gui, li, controller);
	
	  gui.__controllers.push(controller);
	
	  return controller;
	}
	
	function getLocalStorageHash(gui, key) {
	  // TODO how does this deal with multiple GUI's?
	  return document.location.href + '.' + key;
	}
	
	function addPresetOption(gui, name, setSelected) {
	  var opt = document.createElement('option');
	  opt.innerHTML = name;
	  opt.value = name;
	  gui.__preset_select.appendChild(opt);
	  if (setSelected) {
	    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
	  }
	}
	
	function showHideExplain(gui, explain) {
	  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
	}
	
	function addSaveMenu(gui) {
	  var div = gui.__save_row = document.createElement('li');
	
	  _dom2.default.addClass(gui.domElement, 'has-save');
	
	  gui.__ul.insertBefore(div, gui.__ul.firstChild);
	
	  _dom2.default.addClass(div, 'save-row');
	
	  var gears = document.createElement('span');
	  gears.innerHTML = '&nbsp;';
	  _dom2.default.addClass(gears, 'button gears');
	
	  // TODO replace with FunctionController
	  var button = document.createElement('span');
	  button.innerHTML = 'Save';
	  _dom2.default.addClass(button, 'button');
	  _dom2.default.addClass(button, 'save');
	
	  var button2 = document.createElement('span');
	  button2.innerHTML = 'New';
	  _dom2.default.addClass(button2, 'button');
	  _dom2.default.addClass(button2, 'save-as');
	
	  var button3 = document.createElement('span');
	  button3.innerHTML = 'Revert';
	  _dom2.default.addClass(button3, 'button');
	  _dom2.default.addClass(button3, 'revert');
	
	  var select = gui.__preset_select = document.createElement('select');
	
	  if (gui.load && gui.load.remembered) {
	    _common2.default.each(gui.load.remembered, function (value, key) {
	      addPresetOption(gui, key, key === gui.preset);
	    });
	  } else {
	    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
	  }
	
	  _dom2.default.bind(select, 'change', function () {
	    for (var index = 0; index < gui.__preset_select.length; index++) {
	      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
	    }
	
	    gui.preset = this.value;
	  });
	
	  div.appendChild(select);
	  div.appendChild(gears);
	  div.appendChild(button);
	  div.appendChild(button2);
	  div.appendChild(button3);
	
	  if (SUPPORTS_LOCAL_STORAGE) {
	    var explain = document.getElementById('dg-local-explain');
	    var localStorageCheckBox = document.getElementById('dg-local-storage');
	    var saveLocally = document.getElementById('dg-save-locally');
	
	    saveLocally.style.display = 'block';
	
	    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
	      localStorageCheckBox.setAttribute('checked', 'checked');
	    }
	
	    showHideExplain(gui, explain);
	
	    // TODO: Use a boolean controller, fool!
	    _dom2.default.bind(localStorageCheckBox, 'change', function () {
	      gui.useLocalStorage = !gui.useLocalStorage;
	      showHideExplain(gui, explain);
	    });
	  }
	
	  var newConstructorTextArea = document.getElementById('dg-new-constructor');
	
	  _dom2.default.bind(newConstructorTextArea, 'keydown', function (e) {
	    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
	      SAVE_DIALOGUE.hide();
	    }
	  });
	
	  _dom2.default.bind(gears, 'click', function () {
	    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
	    SAVE_DIALOGUE.show();
	    newConstructorTextArea.focus();
	    newConstructorTextArea.select();
	  });
	
	  _dom2.default.bind(button, 'click', function () {
	    gui.save();
	  });
	
	  _dom2.default.bind(button2, 'click', function () {
	    var presetName = prompt('Enter a new preset name.');
	    if (presetName) {
	      gui.saveAs(presetName);
	    }
	  });
	
	  _dom2.default.bind(button3, 'click', function () {
	    gui.revert();
	  });
	
	  // div.appendChild(button2);
	}
	
	function addResizeHandle(gui) {
	  var pmouseX = void 0;
	
	  gui.__resize_handle = document.createElement('div');
	
	  _common2.default.extend(gui.__resize_handle.style, {
	
	    width: '6px',
	    marginLeft: '-3px',
	    height: '200px',
	    cursor: 'ew-resize',
	    position: 'absolute'
	    // border: '1px solid blue'
	
	  });
	
	  function drag(e) {
	    e.preventDefault();
	
	    gui.width += pmouseX - e.clientX;
	    gui.onResize();
	    pmouseX = e.clientX;
	
	    return false;
	  }
	
	  function dragStop() {
	    _dom2.default.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
	    _dom2.default.unbind(window, 'mousemove', drag);
	    _dom2.default.unbind(window, 'mouseup', dragStop);
	  }
	
	  function dragStart(e) {
	    e.preventDefault();
	
	    pmouseX = e.clientX;
	
	    _dom2.default.addClass(gui.__closeButton, GUI.CLASS_DRAG);
	    _dom2.default.bind(window, 'mousemove', drag);
	    _dom2.default.bind(window, 'mouseup', dragStop);
	
	    return false;
	  }
	
	  _dom2.default.bind(gui.__resize_handle, 'mousedown', dragStart);
	  _dom2.default.bind(gui.__closeButton, 'mousedown', dragStart);
	
	  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
	}
	
	function setWidth(gui, w) {
	  gui.domElement.style.width = w + 'px';
	  // Auto placed save-rows are position fixed, so we have to
	  // set the width manually if we want it to bleed to the edge
	  if (gui.__save_row && gui.autoPlace) {
	    gui.__save_row.style.width = w + 'px';
	  }
	  if (gui.__closeButton) {
	    gui.__closeButton.style.width = w + 'px';
	  }
	}
	
	function getCurrentPreset(gui, useInitialValues) {
	  var toReturn = {};
	
	  // For each object I'm remembering
	  _common2.default.each(gui.__rememberedObjects, function (val, index) {
	    var savedValues = {};
	
	    // The controllers I've made for thcommon.isObject by property
	    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
	
	    // Remember each value for each property
	    _common2.default.each(controllerMap, function (controller, property) {
	      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
	    });
	
	    // Save the values for thcommon.isObject
	    toReturn[index] = savedValues;
	  });
	
	  return toReturn;
	}
	
	function setPresetSelectIndex(gui) {
	  for (var index = 0; index < gui.__preset_select.length; index++) {
	    if (gui.__preset_select[index].value === gui.preset) {
	      gui.__preset_select.selectedIndex = index;
	    }
	  }
	}
	
	function updateDisplays(controllerArray) {
	  if (controllerArray.length !== 0) {
	    _requestAnimationFrame2.default.call(window, function () {
	      updateDisplays(controllerArray);
	    });
	  }
	
	  _common2.default.each(controllerArray, function (c) {
	    c.updateDisplay();
	  });
	}
	
	exports.default = GUI;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	module.exports = {
	  load: function load(url, indoc) {
	    var doc = indoc || document;
	    var link = doc.createElement('link');
	    link.type = 'text/css';
	    link.rel = 'stylesheet';
	    link.href = url;
	    doc.getElementsByTagName('head')[0].appendChild(link);
	  },
	
	  inject: function inject(css, indoc) {
	    var doc = indoc || document;
	    var injected = document.createElement('style');
	    injected.type = 'text/css';
	    injected.innerHTML = css;
	    var head = doc.getElementsByTagName('head')[0];
	    try {
	      head.appendChild(injected);
	    } catch (e) {// Unable to inject CSS, probably because of a Content Security Policy
	    }
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _OptionController = __webpack_require__(10);
	
	var _OptionController2 = _interopRequireDefault(_OptionController);
	
	var _NumberControllerBox = __webpack_require__(13);
	
	var _NumberControllerBox2 = _interopRequireDefault(_NumberControllerBox);
	
	var _NumberControllerSlider = __webpack_require__(14);
	
	var _NumberControllerSlider2 = _interopRequireDefault(_NumberControllerSlider);
	
	var _StringController = __webpack_require__(11);
	
	var _StringController2 = _interopRequireDefault(_StringController);
	
	var _FunctionController = __webpack_require__(15);
	
	var _FunctionController2 = _interopRequireDefault(_FunctionController);
	
	var _BooleanController = __webpack_require__(8);
	
	var _BooleanController2 = _interopRequireDefault(_BooleanController);
	
	var _common = __webpack_require__(5);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ControllerFactory = function ControllerFactory(object, property) {
	  var initialValue = object[property];
	
	  // Providing options?
	  if (_common2.default.isArray(arguments[2]) || _common2.default.isObject(arguments[2])) {
	    return new _OptionController2.default(object, property, arguments[2]);
	  }
	
	  // Providing a map?
	  if (_common2.default.isNumber(initialValue)) {
	    // Has min and max? (slider)
	    if (_common2.default.isNumber(arguments[2]) && _common2.default.isNumber(arguments[3])) {
	      // has step?
	      if (_common2.default.isNumber(arguments[4])) {
	        return new _NumberControllerSlider2.default(object, property, arguments[2], arguments[3], arguments[4]);
	      }
	
	      return new _NumberControllerSlider2.default(object, property, arguments[2], arguments[3]);
	    }
	
	    // number box
	    if (_common2.default.isNumber(arguments[4])) {
	      // has step
	      return new _NumberControllerBox2.default(object, property, { min: arguments[2], max: arguments[3], step: arguments[4] });
	    }
	    return new _NumberControllerBox2.default(object, property, { min: arguments[2], max: arguments[3] });
	  }
	
	  if (_common2.default.isString(initialValue)) {
	    return new _StringController2.default(object, property);
	  }
	
	  if (_common2.default.isFunction(initialValue)) {
	    return new _FunctionController2.default(object, property, '');
	  }
	
	  if (_common2.default.isBoolean(initialValue)) {
	    return new _BooleanController2.default(object, property);
	  }
	
	  return null;
	}; /**
	    * dat-gui JavaScript Controller Library
	    * http://code.google.com/p/dat-gui
	    *
	    * Copyright 2011 Data Arts Team, Google Creative Lab
	    *
	    * Licensed under the Apache License, Version 2.0 (the "License");
	    * you may not use this file except in compliance with the License.
	    * You may obtain a copy of the License at
	    *
	    * http://www.apache.org/licenses/LICENSE-2.0
	    */
	
	exports.default = ControllerFactory;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	function requestAnimationFrame(callback) {
	  setTimeout(callback, 1000 / 60);
	}
	
	exports.default = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;
	module.exports = exports["default"];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _common = __webpack_require__(5);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * dat-gui JavaScript Controller Library
	                                                                                                                                                           * http://code.google.com/p/dat-gui
	                                                                                                                                                           *
	                                                                                                                                                           * Copyright 2011 Data Arts Team, Google Creative Lab
	                                                                                                                                                           *
	                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                           * you may not use this file except in compliance with the License.
	                                                                                                                                                           * You may obtain a copy of the License at
	                                                                                                                                                           *
	                                                                                                                                                           * http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                           */
	
	var CenteredDiv = function () {
	  function CenteredDiv() {
	    _classCallCheck(this, CenteredDiv);
	
	    this.backgroundElement = document.createElement('div');
	    _common2.default.extend(this.backgroundElement.style, {
	      backgroundColor: 'rgba(0,0,0,0.8)',
	      top: 0,
	      left: 0,
	      display: 'none',
	      zIndex: '1000',
	      opacity: 0,
	      WebkitTransition: 'opacity 0.2s linear',
	      transition: 'opacity 0.2s linear'
	    });
	
	    _dom2.default.makeFullscreen(this.backgroundElement);
	    this.backgroundElement.style.position = 'fixed';
	
	    this.domElement = document.createElement('div');
	    _common2.default.extend(this.domElement.style, {
	      position: 'fixed',
	      display: 'none',
	      zIndex: '1001',
	      opacity: 0,
	      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
	      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
	    });
	
	    document.body.appendChild(this.backgroundElement);
	    document.body.appendChild(this.domElement);
	
	    var _this = this;
	    _dom2.default.bind(this.backgroundElement, 'click', function () {
	      _this.hide();
	    });
	  }
	
	  CenteredDiv.prototype.show = function show() {
	    var _this = this;
	
	    this.backgroundElement.style.display = 'block';
	
	    this.domElement.style.display = 'block';
	    this.domElement.style.opacity = 0;
	    //    this.domElement.style.top = '52%';
	    this.domElement.style.webkitTransform = 'scale(1.1)';
	
	    this.layout();
	
	    _common2.default.defer(function () {
	      _this.backgroundElement.style.opacity = 1;
	      _this.domElement.style.opacity = 1;
	      _this.domElement.style.webkitTransform = 'scale(1)';
	    });
	  };
	
	  /**
	   * Hide centered div
	   */
	
	
	  CenteredDiv.prototype.hide = function hide() {
	    var _this = this;
	
	    var hide = function hide() {
	      _this.domElement.style.display = 'none';
	      _this.backgroundElement.style.display = 'none';
	
	      _dom2.default.unbind(_this.domElement, 'webkitTransitionEnd', hide);
	      _dom2.default.unbind(_this.domElement, 'transitionend', hide);
	      _dom2.default.unbind(_this.domElement, 'oTransitionEnd', hide);
	    };
	
	    _dom2.default.bind(this.domElement, 'webkitTransitionEnd', hide);
	    _dom2.default.bind(this.domElement, 'transitionend', hide);
	    _dom2.default.bind(this.domElement, 'oTransitionEnd', hide);
	
	    this.backgroundElement.style.opacity = 0;
	    //    this.domElement.style.top = '48%';
	    this.domElement.style.opacity = 0;
	    this.domElement.style.webkitTransform = 'scale(1.1)';
	  };
	
	  CenteredDiv.prototype.layout = function layout() {
	    this.domElement.style.left = window.innerWidth / 2 - _dom2.default.getWidth(this.domElement) / 2 + 'px';
	    this.domElement.style.top = window.innerHeight / 2 - _dom2.default.getHeight(this.domElement) / 2 + 'px';
	  };
	
	  return CenteredDiv;
	}();
	
	exports.default = CenteredDiv;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports
	
	
	// module
	exports.push([module.id, ".dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI's */\n  /* Line items that don't contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */\n  /** allow overflow for color selector */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 0;\n    z-index: 0; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don't hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button.close-top {\n        position: relative; }\n      .dg.main .close-button.close-bottom {\n        position: absolute; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-y: visible; }\n    .dg.a.has-save > ul.close-top {\n      margin-top: 0; }\n    .dg.a.has-save > ul.close-bottom {\n      margin-top: 27px; }\n    .dg.a.has-save > ul.closed {\n      margin-top: 0; }\n    .dg.a .save-row {\n      top: 0;\n      z-index: 1002; }\n      .dg.a .save-row.close-top {\n        position: relative; }\n      .dg.a .save-row.close-bottom {\n        position: fixed; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out;\n    -webkit-transition: overflow 0.1s linear;\n    -o-transition: overflow 0.1s linear;\n    -moz-transition: overflow 0.1s linear;\n    transition: overflow 0.1s linear; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid transparent; }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px;\n    overflow: hidden; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%;\n    position: relative; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 7px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function,\n  .dg .cr.function .property-name,\n  .dg .cr.function *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .cr.color {\n    overflow: visible; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px 'Lucida Grande', sans-serif;\n  text-shadow: 0 -1px 0 #111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: #000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.color {\n    border-left: 3px solid; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2FA1D6; }\n    .dg .cr.number input[type=text] {\n      color: #2FA1D6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2FA1D6;\n    max-width: 100%; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n", ""]);
	
	// exports


/***/ },
/* 24 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }
/******/ ])
});
;

},{}],2:[function(require,module,exports){
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () {

		try {

			var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

		} catch ( e ) {

			return false;

		}

	} )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage: function () {

		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );

		}

		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};

// browserify support
if ( typeof module === 'object' ) {

	module.exports = Detector;

}

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let DatGUI = require('../lib/dat.gui/build/dat.gui');
let Detector = require('../lib/three.js/examples/js/Detector');
let container = document.createElement('div');
document.body.appendChild(container);
class Unicon {
    constructor() {
    }
    render() {
    }
    tick() {
        this.update();
        this.render();
    }
    update() {
    }
}
exports.Unicon = Unicon;
let unicon = new Unicon();
let interval = setInterval(unicon.tick, 1000 / 30);
},{"../lib/dat.gui/build/dat.gui":1,"../lib/three.js/examples/js/Detector":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzZXJ2ZXIvbGliL2RhdC5ndWkvYnVpbGQvZGF0Lmd1aS5qcyIsInNlcnZlci9saWIvdGhyZWUuanMvZXhhbXBsZXMvanMvRGV0ZWN0b3IuanMiLCJzZXJ2ZXIvdG9vbC91bmljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25zSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxREEsSUFBSSxNQUFNLEdBQVEsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDMUQsSUFBSSxRQUFRLEdBQU0sT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7QUFFbEUsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBRSxLQUFLLENBQUUsQ0FBQztBQUNoRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBRSxTQUFTLENBQUUsQ0FBQztBQVV2QztJQVdJO0lBQ0EsQ0FBQztJQVdELE1BQU07SUFDTixDQUFDO0lBT0QsSUFBSTtRQUVBLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBT0QsTUFBTTtJQUNOLENBQUM7Q0FDSjtBQTVDRCx3QkE0Q0M7QUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0FBQzFCLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBRSxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksR0FBQyxFQUFFLENBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xyXG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JylcclxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xyXG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxyXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcclxuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JylcclxuXHRcdGV4cG9ydHNbXCJkYXRcIl0gPSBmYWN0b3J5KCk7XHJcblx0ZWxzZVxyXG5cdFx0cm9vdFtcImRhdFwiXSA9IGZhY3RvcnkoKTtcclxufSkodGhpcywgZnVuY3Rpb24oKSB7XHJcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXHJcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxyXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XHJcbi8qKioqKiovXHJcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cclxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XHJcbi8qKioqKiovXHJcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcclxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxyXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXHJcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XHJcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxyXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXHJcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2VcclxuLyoqKioqKi8gXHRcdH07XHJcbi8qKioqKiovXHJcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cclxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xyXG4vKioqKioqL1xyXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxyXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XHJcbi8qKioqKiovXHJcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxyXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xyXG4vKioqKioqLyBcdH1cclxuLyoqKioqKi9cclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxyXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XHJcbi8qKioqKiovXHJcbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcclxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xyXG4vKioqKioqL1xyXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXHJcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcclxuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcclxuLyoqKioqKi8gfSlcclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuLyoqKioqKi8gKFtcclxuLyogMCAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0dmFyIF9pbmRleCA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XHJcblx0XHJcblx0dmFyIF9pbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleCk7XHJcblx0XHJcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSBfaW5kZXgyLmRlZmF1bHQ7IC8qKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG5cclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDEgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cdFxyXG5cdHZhciBfQ29sb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xyXG5cdFxyXG5cdHZhciBfQ29sb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sb3IpO1xyXG5cdFxyXG5cdHZhciBfbWF0aCA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XHJcblx0XHJcblx0dmFyIF9tYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21hdGgpO1xyXG5cdFxyXG5cdHZhciBfaW50ZXJwcmV0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcclxuXHRcclxuXHR2YXIgX2ludGVycHJldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnRlcnByZXQpO1xyXG5cdFxyXG5cdHZhciBfQ29udHJvbGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdHZhciBfQm9vbGVhbkNvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xyXG5cdFxyXG5cdHZhciBfQm9vbGVhbkNvbnRyb2xsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQm9vbGVhbkNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdHZhciBfT3B0aW9uQ29udHJvbGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xyXG5cdFxyXG5cdHZhciBfT3B0aW9uQ29udHJvbGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9PcHRpb25Db250cm9sbGVyKTtcclxuXHRcclxuXHR2YXIgX1N0cmluZ0NvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKTtcclxuXHRcclxuXHR2YXIgX1N0cmluZ0NvbnRyb2xsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3RyaW5nQ29udHJvbGxlcik7XHJcblx0XHJcblx0dmFyIF9OdW1iZXJDb250cm9sbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMik7XHJcblx0XHJcblx0dmFyIF9OdW1iZXJDb250cm9sbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX051bWJlckNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlckJveCA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlckJveDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OdW1iZXJDb250cm9sbGVyQm94KTtcclxuXHRcclxuXHR2YXIgX051bWJlckNvbnRyb2xsZXJTbGlkZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcclxuXHRcclxuXHR2YXIgX051bWJlckNvbnRyb2xsZXJTbGlkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTnVtYmVyQ29udHJvbGxlclNsaWRlcik7XHJcblx0XHJcblx0dmFyIF9GdW5jdGlvbkNvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcclxuXHRcclxuXHR2YXIgX0Z1bmN0aW9uQ29udHJvbGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9GdW5jdGlvbkNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdHZhciBfQ29sb3JDb250cm9sbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNik7XHJcblx0XHJcblx0dmFyIF9Db2xvckNvbnRyb2xsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sb3JDb250cm9sbGVyKTtcclxuXHRcclxuXHR2YXIgX2RvbSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XHJcblx0XHJcblx0dmFyIF9kb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZG9tKTtcclxuXHRcclxuXHR2YXIgX0dVSSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xyXG5cdFxyXG5cdHZhciBfR1VJMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dVSSk7XHJcblx0XHJcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgKlxyXG5cdCAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICpcclxuXHQgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgKlxyXG5cdCAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAqL1xyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IHtcclxuXHQgIGNvbG9yOiB7XHJcblx0ICAgIENvbG9yOiBfQ29sb3IyLmRlZmF1bHQsXHJcblx0ICAgIG1hdGg6IF9tYXRoMi5kZWZhdWx0LFxyXG5cdCAgICBpbnRlcnByZXQ6IF9pbnRlcnByZXQyLmRlZmF1bHRcclxuXHQgIH0sXHJcblx0XHJcblx0ICBjb250cm9sbGVyczoge1xyXG5cdCAgICBDb250cm9sbGVyOiBfQ29udHJvbGxlcjIuZGVmYXVsdCxcclxuXHQgICAgQm9vbGVhbkNvbnRyb2xsZXI6IF9Cb29sZWFuQ29udHJvbGxlcjIuZGVmYXVsdCxcclxuXHQgICAgT3B0aW9uQ29udHJvbGxlcjogX09wdGlvbkNvbnRyb2xsZXIyLmRlZmF1bHQsXHJcblx0ICAgIFN0cmluZ0NvbnRyb2xsZXI6IF9TdHJpbmdDb250cm9sbGVyMi5kZWZhdWx0LFxyXG5cdCAgICBOdW1iZXJDb250cm9sbGVyOiBfTnVtYmVyQ29udHJvbGxlcjIuZGVmYXVsdCxcclxuXHQgICAgTnVtYmVyQ29udHJvbGxlckJveDogX051bWJlckNvbnRyb2xsZXJCb3gyLmRlZmF1bHQsXHJcblx0ICAgIE51bWJlckNvbnRyb2xsZXJTbGlkZXI6IF9OdW1iZXJDb250cm9sbGVyU2xpZGVyMi5kZWZhdWx0LFxyXG5cdCAgICBGdW5jdGlvbkNvbnRyb2xsZXI6IF9GdW5jdGlvbkNvbnRyb2xsZXIyLmRlZmF1bHQsXHJcblx0ICAgIENvbG9yQ29udHJvbGxlcjogX0NvbG9yQ29udHJvbGxlcjIuZGVmYXVsdFxyXG5cdCAgfSxcclxuXHRcclxuXHQgIGRvbToge1xyXG5cdCAgICBkb206IF9kb20yLmRlZmF1bHRcclxuXHQgIH0sXHJcblx0XHJcblx0ICBndWk6IHtcclxuXHQgICAgR1VJOiBfR1VJMi5kZWZhdWx0XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgR1VJOiBfR1VJMi5kZWZhdWx0XHJcblx0fTtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDIgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cdFxyXG5cdHZhciBfaW50ZXJwcmV0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcclxuXHRcclxuXHR2YXIgX2ludGVycHJldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnRlcnByZXQpO1xyXG5cdFxyXG5cdHZhciBfbWF0aCA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XHJcblx0XHJcblx0dmFyIF9tYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21hdGgpO1xyXG5cdFxyXG5cdHZhciBfdG9TdHJpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xyXG5cdFxyXG5cdHZhciBfdG9TdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9TdHJpbmcpO1xyXG5cdFxyXG5cdHZhciBfY29tbW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21tb24pO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH0gLyoqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG5cdFxyXG5cdHZhciBDb2xvciA9IGZ1bmN0aW9uICgpIHtcclxuXHQgIGZ1bmN0aW9uIENvbG9yKCkge1xyXG5cdCAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sb3IpO1xyXG5cdFxyXG5cdCAgICB0aGlzLl9fc3RhdGUgPSBfaW50ZXJwcmV0Mi5kZWZhdWx0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHJcblx0ICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IGZhbHNlKSB7XHJcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gaW50ZXJwcmV0IGNvbG9yIGFyZ3VtZW50cycpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIHRoaXMuX19zdGF0ZS5hID0gdGhpcy5fX3N0YXRlLmEgfHwgMTtcclxuXHQgIH1cclxuXHRcclxuXHQgIENvbG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdCAgICByZXR1cm4gKDAsIF90b1N0cmluZzIuZGVmYXVsdCkodGhpcyk7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgQ29sb3IucHJvdG90eXBlLnRvSGV4U3RyaW5nID0gZnVuY3Rpb24gdG9IZXhTdHJpbmcoKSB7XHJcblx0ICAgIHJldHVybiAoMCwgX3RvU3RyaW5nMi5kZWZhdWx0KSh0aGlzLCB0cnVlKTtcclxuXHQgIH07XHJcblx0XHJcblx0ICBDb2xvci5wcm90b3R5cGUudG9PcmlnaW5hbCA9IGZ1bmN0aW9uIHRvT3JpZ2luYWwoKSB7XHJcblx0ICAgIHJldHVybiB0aGlzLl9fc3RhdGUuY29udmVyc2lvbi53cml0ZSh0aGlzKTtcclxuXHQgIH07XHJcblx0XHJcblx0ICByZXR1cm4gQ29sb3I7XHJcblx0fSgpO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGRlZmluZVJHQkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcclxuXHQgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xyXG5cdCAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuXHQgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnUkdCJykge1xyXG5cdCAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xyXG5cdCAgICAgIH1cclxuXHRcclxuXHQgICAgICBDb2xvci5yZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcclxuXHRcclxuXHQgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIHNldDogZnVuY3Rpb24gc2V0KHYpIHtcclxuXHQgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnUkdCJykge1xyXG5cdCAgICAgICAgQ29sb3IucmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XHJcblx0ICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnUkdCJztcclxuXHQgICAgICB9XHJcblx0XHJcblx0ICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xyXG5cdCAgICB9XHJcblx0ICB9KTtcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gZGVmaW5lSFNWQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50KSB7XHJcblx0ICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcclxuXHQgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XHJcblx0ICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpIHtcclxuXHQgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcclxuXHQgICAgICB9XHJcblx0XHJcblx0ICAgICAgQ29sb3IucmVjYWxjdWxhdGVIU1YodGhpcyk7XHJcblx0XHJcblx0ICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2KSB7XHJcblx0ICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hTVicpIHtcclxuXHQgICAgICAgIENvbG9yLnJlY2FsY3VsYXRlSFNWKHRoaXMpO1xyXG5cdCAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hTVic7XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcclxuXHQgICAgfVxyXG5cdCAgfSk7XHJcblx0fVxyXG5cdFxyXG5cdENvbG9yLnJlY2FsY3VsYXRlUkdCID0gZnVuY3Rpb24gKGNvbG9yLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XHJcblx0ICBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hFWCcpIHtcclxuXHQgICAgY29sb3IuX19zdGF0ZVtjb21wb25lbnRdID0gX21hdGgyLmRlZmF1bHQuY29tcG9uZW50X2Zyb21faGV4KGNvbG9yLl9fc3RhdGUuaGV4LCBjb21wb25lbnRIZXhJbmRleCk7XHJcblx0ICB9IGVsc2UgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKSB7XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZXh0ZW5kKGNvbG9yLl9fc3RhdGUsIF9tYXRoMi5kZWZhdWx0Lmhzdl90b19yZ2IoY29sb3IuX19zdGF0ZS5oLCBjb2xvci5fX3N0YXRlLnMsIGNvbG9yLl9fc3RhdGUudikpO1xyXG5cdCAgfSBlbHNlIHtcclxuXHQgICAgdGhyb3cgbmV3IEVycm9yKCdDb3JydXB0ZWQgY29sb3Igc3RhdGUnKTtcclxuXHQgIH1cclxuXHR9O1xyXG5cdFxyXG5cdENvbG9yLnJlY2FsY3VsYXRlSFNWID0gZnVuY3Rpb24gKGNvbG9yKSB7XHJcblx0ICB2YXIgcmVzdWx0ID0gX21hdGgyLmRlZmF1bHQucmdiX3RvX2hzdihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iKTtcclxuXHRcclxuXHQgIF9jb21tb24yLmRlZmF1bHQuZXh0ZW5kKGNvbG9yLl9fc3RhdGUsIHtcclxuXHQgICAgczogcmVzdWx0LnMsXHJcblx0ICAgIHY6IHJlc3VsdC52XHJcblx0ICB9KTtcclxuXHRcclxuXHQgIGlmICghX2NvbW1vbjIuZGVmYXVsdC5pc05hTihyZXN1bHQuaCkpIHtcclxuXHQgICAgY29sb3IuX19zdGF0ZS5oID0gcmVzdWx0Lmg7XHJcblx0ICB9IGVsc2UgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQoY29sb3IuX19zdGF0ZS5oKSkge1xyXG5cdCAgICBjb2xvci5fX3N0YXRlLmggPSAwO1xyXG5cdCAgfVxyXG5cdH07XHJcblx0XHJcblx0Q29sb3IuQ09NUE9ORU5UUyA9IFsncicsICdnJywgJ2InLCAnaCcsICdzJywgJ3YnLCAnaGV4JywgJ2EnXTtcclxuXHRcclxuXHRkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncicsIDIpO1xyXG5cdGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdnJywgMSk7XHJcblx0ZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2InLCAwKTtcclxuXHRcclxuXHRkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnaCcpO1xyXG5cdGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdzJyk7XHJcblx0ZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3YnKTtcclxuXHRcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnYScsIHtcclxuXHQgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG5cdCAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmE7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgc2V0OiBmdW5jdGlvbiBzZXQodikge1xyXG5cdCAgICB0aGlzLl9fc3RhdGUuYSA9IHY7XHJcblx0ICB9XHJcblx0fSk7XHJcblx0XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2hleCcsIHtcclxuXHQgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG5cdCAgICBpZiAoIXRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hFWCcpIHtcclxuXHQgICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gX21hdGgyLmRlZmF1bHQucmdiX3RvX2hleCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmhleDtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBzZXQ6IGZ1bmN0aW9uIHNldCh2KSB7XHJcblx0ICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIRVgnO1xyXG5cdCAgICB0aGlzLl9fc3RhdGUuaGV4ID0gdjtcclxuXHQgIH1cclxuXHR9KTtcclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSBDb2xvcjtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDMgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cdFxyXG5cdHZhciBfdG9TdHJpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xyXG5cdFxyXG5cdHZhciBfdG9TdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9TdHJpbmcpO1xyXG5cdFxyXG5cdHZhciBfY29tbW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21tb24pO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XHJcblx0XHJcblx0LyoqXHJcblx0ICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICpcclxuXHQgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAqXHJcblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICpcclxuXHQgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgKi9cclxuXHRcclxuXHR2YXIgSU5URVJQUkVUQVRJT05TID0gW1xyXG5cdC8vIFN0cmluZ3NcclxuXHR7XHJcblx0ICBsaXRtdXM6IF9jb21tb24yLmRlZmF1bHQuaXNTdHJpbmcsXHJcblx0ICBjb252ZXJzaW9uczoge1xyXG5cdCAgICBUSFJFRV9DSEFSX0hFWDoge1xyXG5cdCAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcclxuXHQgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldKShbQS1GMC05XSkoW0EtRjAtOV0pJC9pKTtcclxuXHQgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSB7XHJcblx0ICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgICAgIH1cclxuXHRcclxuXHQgICAgICAgIHJldHVybiB7XHJcblx0ICAgICAgICAgIHNwYWNlOiAnSEVYJyxcclxuXHQgICAgICAgICAgaGV4OiBwYXJzZUludCgnMHgnICsgdGVzdFsxXS50b1N0cmluZygpICsgdGVzdFsxXS50b1N0cmluZygpICsgdGVzdFsyXS50b1N0cmluZygpICsgdGVzdFsyXS50b1N0cmluZygpICsgdGVzdFszXS50b1N0cmluZygpICsgdGVzdFszXS50b1N0cmluZygpLCAwKVxyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICB9LFxyXG5cdFxyXG5cdCAgICAgIHdyaXRlOiBfdG9TdHJpbmcyLmRlZmF1bHRcclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgU0lYX0NIQVJfSEVYOiB7XHJcblx0ICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xyXG5cdCAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV17Nn0pJC9pKTtcclxuXHQgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSB7XHJcblx0ICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgICAgIH1cclxuXHRcclxuXHQgICAgICAgIHJldHVybiB7XHJcblx0ICAgICAgICAgIHNwYWNlOiAnSEVYJyxcclxuXHQgICAgICAgICAgaGV4OiBwYXJzZUludCgnMHgnICsgdGVzdFsxXS50b1N0cmluZygpLCAwKVxyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICB9LFxyXG5cdFxyXG5cdCAgICAgIHdyaXRlOiBfdG9TdHJpbmcyLmRlZmF1bHRcclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgQ1NTX1JHQjoge1xyXG5cdCAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcclxuXHQgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcKS8pO1xyXG5cdCAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHtcclxuXHQgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICAgICAgfVxyXG5cdFxyXG5cdCAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgc3BhY2U6ICdSR0InLFxyXG5cdCAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxyXG5cdCAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxyXG5cdCAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pXHJcblx0ICAgICAgICB9O1xyXG5cdCAgICAgIH0sXHJcblx0XHJcblx0ICAgICAgd3JpdGU6IF90b1N0cmluZzIuZGVmYXVsdFxyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICBDU1NfUkdCQToge1xyXG5cdCAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcclxuXHQgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JhXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwpLyk7XHJcblx0ICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkge1xyXG5cdCAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgICAgICB9XHJcblx0XHJcblx0ICAgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgICBzcGFjZTogJ1JHQicsXHJcblx0ICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXHJcblx0ICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXHJcblx0ICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSksXHJcblx0ICAgICAgICAgIGE6IHBhcnNlRmxvYXQodGVzdFs0XSlcclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgfSxcclxuXHRcclxuXHQgICAgICB3cml0ZTogX3RvU3RyaW5nMi5kZWZhdWx0XHJcblx0ICAgIH1cclxuXHQgIH1cclxuXHR9LFxyXG5cdFxyXG5cdC8vIE51bWJlcnNcclxuXHR7XHJcblx0ICBsaXRtdXM6IF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIsXHJcblx0XHJcblx0ICBjb252ZXJzaW9uczoge1xyXG5cdFxyXG5cdCAgICBIRVg6IHtcclxuXHQgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XHJcblx0ICAgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgICBzcGFjZTogJ0hFWCcsXHJcblx0ICAgICAgICAgIGhleDogb3JpZ2luYWwsXHJcblx0ICAgICAgICAgIGNvbnZlcnNpb25OYW1lOiAnSEVYJ1xyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICB9LFxyXG5cdFxyXG5cdCAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xyXG5cdCAgICAgICAgcmV0dXJuIGNvbG9yLmhleDtcclxuXHQgICAgICB9XHJcblx0ICAgIH1cclxuXHRcclxuXHQgIH1cclxuXHRcclxuXHR9LFxyXG5cdFxyXG5cdC8vIEFycmF5c1xyXG5cdHtcclxuXHQgIGxpdG11czogX2NvbW1vbjIuZGVmYXVsdC5pc0FycmF5LFxyXG5cdCAgY29udmVyc2lvbnM6IHtcclxuXHQgICAgUkdCX0FSUkFZOiB7XHJcblx0ICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xyXG5cdCAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPT0gMykge1xyXG5cdCAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgICAgICB9XHJcblx0XHJcblx0ICAgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgICBzcGFjZTogJ1JHQicsXHJcblx0ICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxyXG5cdCAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcclxuXHQgICAgICAgICAgYjogb3JpZ2luYWxbMl1cclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgfSxcclxuXHRcclxuXHQgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcclxuXHQgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYl07XHJcblx0ICAgICAgfVxyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICBSR0JBX0FSUkFZOiB7XHJcblx0ICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xyXG5cdCAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPT0gNCkgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgc3BhY2U6ICdSR0InLFxyXG5cdCAgICAgICAgICByOiBvcmlnaW5hbFswXSxcclxuXHQgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXHJcblx0ICAgICAgICAgIGI6IG9yaWdpbmFsWzJdLFxyXG5cdCAgICAgICAgICBhOiBvcmlnaW5hbFszXVxyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICB9LFxyXG5cdFxyXG5cdCAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xyXG5cdCAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCBjb2xvci5hXTtcclxuXHQgICAgICB9XHJcblx0ICAgIH1cclxuXHQgIH1cclxuXHR9LFxyXG5cdFxyXG5cdC8vIE9iamVjdHNcclxuXHR7XHJcblx0ICBsaXRtdXM6IF9jb21tb24yLmRlZmF1bHQuaXNPYmplY3QsXHJcblx0ICBjb252ZXJzaW9uczoge1xyXG5cdFxyXG5cdCAgICBSR0JBX09CSjoge1xyXG5cdCAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcclxuXHQgICAgICAgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmIF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIob3JpZ2luYWwuZykgJiYgX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihvcmlnaW5hbC5iKSAmJiBfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XHJcblx0ICAgICAgICAgIHJldHVybiB7XHJcblx0ICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxyXG5cdCAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXHJcblx0ICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcclxuXHQgICAgICAgICAgICBiOiBvcmlnaW5hbC5iLFxyXG5cdCAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcclxuXHQgICAgICAgICAgfTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgICB9LFxyXG5cdFxyXG5cdCAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xyXG5cdCAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgcjogY29sb3IucixcclxuXHQgICAgICAgICAgZzogY29sb3IuZyxcclxuXHQgICAgICAgICAgYjogY29sb3IuYixcclxuXHQgICAgICAgICAgYTogY29sb3IuYVxyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICB9XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIFJHQl9PQko6IHtcclxuXHQgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XHJcblx0ICAgICAgICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihvcmlnaW5hbC5yKSAmJiBfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmIF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIob3JpZ2luYWwuYikpIHtcclxuXHQgICAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgICBzcGFjZTogJ1JHQicsXHJcblx0ICAgICAgICAgICAgcjogb3JpZ2luYWwucixcclxuXHQgICAgICAgICAgICBnOiBvcmlnaW5hbC5nLFxyXG5cdCAgICAgICAgICAgIGI6IG9yaWdpbmFsLmJcclxuXHQgICAgICAgICAgfTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgICB9LFxyXG5cdFxyXG5cdCAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xyXG5cdCAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgcjogY29sb3IucixcclxuXHQgICAgICAgICAgZzogY29sb3IuZyxcclxuXHQgICAgICAgICAgYjogY29sb3IuYlxyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICB9XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIEhTVkFfT0JKOiB7XHJcblx0ICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xyXG5cdCAgICAgICAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIob3JpZ2luYWwuaCkgJiYgX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihvcmlnaW5hbC5zKSAmJiBfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKG9yaWdpbmFsLnYpICYmIF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcclxuXHQgICAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgICBzcGFjZTogJ0hTVicsXHJcblx0ICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcclxuXHQgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxyXG5cdCAgICAgICAgICAgIHY6IG9yaWdpbmFsLnYsXHJcblx0ICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxyXG5cdCAgICAgICAgICB9O1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICAgIH0sXHJcblx0XHJcblx0ICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKGNvbG9yKSB7XHJcblx0ICAgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgICBoOiBjb2xvci5oLFxyXG5cdCAgICAgICAgICBzOiBjb2xvci5zLFxyXG5cdCAgICAgICAgICB2OiBjb2xvci52LFxyXG5cdCAgICAgICAgICBhOiBjb2xvci5hXHJcblx0ICAgICAgICB9O1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgSFNWX09CSjoge1xyXG5cdCAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcclxuXHQgICAgICAgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmIF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIob3JpZ2luYWwucykgJiYgX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihvcmlnaW5hbC52KSkge1xyXG5cdCAgICAgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgICAgIHNwYWNlOiAnSFNWJyxcclxuXHQgICAgICAgICAgICBoOiBvcmlnaW5hbC5oLFxyXG5cdCAgICAgICAgICAgIHM6IG9yaWdpbmFsLnMsXHJcblx0ICAgICAgICAgICAgdjogb3JpZ2luYWwudlxyXG5cdCAgICAgICAgICB9O1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICAgIH0sXHJcblx0XHJcblx0ICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKGNvbG9yKSB7XHJcblx0ICAgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgICBoOiBjb2xvci5oLFxyXG5cdCAgICAgICAgICBzOiBjb2xvci5zLFxyXG5cdCAgICAgICAgICB2OiBjb2xvci52XHJcblx0ICAgICAgICB9O1xyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH1dO1xyXG5cdFxyXG5cdHZhciByZXN1bHQgPSB2b2lkIDA7XHJcblx0dmFyIHRvUmV0dXJuID0gdm9pZCAwO1xyXG5cdFxyXG5cdHZhciBpbnRlcnByZXQgPSBmdW5jdGlvbiBpbnRlcnByZXQoKSB7XHJcblx0ICB0b1JldHVybiA9IGZhbHNlO1xyXG5cdFxyXG5cdCAgdmFyIG9yaWdpbmFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBfY29tbW9uMi5kZWZhdWx0LnRvQXJyYXkoYXJndW1lbnRzKSA6IGFyZ3VtZW50c1swXTtcclxuXHQgIF9jb21tb24yLmRlZmF1bHQuZWFjaChJTlRFUlBSRVRBVElPTlMsIGZ1bmN0aW9uIChmYW1pbHkpIHtcclxuXHQgICAgaWYgKGZhbWlseS5saXRtdXMob3JpZ2luYWwpKSB7XHJcblx0ICAgICAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKGZhbWlseS5jb252ZXJzaW9ucywgZnVuY3Rpb24gKGNvbnZlcnNpb24sIGNvbnZlcnNpb25OYW1lKSB7XHJcblx0ICAgICAgICByZXN1bHQgPSBjb252ZXJzaW9uLnJlYWQob3JpZ2luYWwpO1xyXG5cdFxyXG5cdCAgICAgICAgaWYgKHRvUmV0dXJuID09PSBmYWxzZSAmJiByZXN1bHQgIT09IGZhbHNlKSB7XHJcblx0ICAgICAgICAgIHRvUmV0dXJuID0gcmVzdWx0O1xyXG5cdCAgICAgICAgICByZXN1bHQuY29udmVyc2lvbk5hbWUgPSBjb252ZXJzaW9uTmFtZTtcclxuXHQgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb24gPSBjb252ZXJzaW9uO1xyXG5cdCAgICAgICAgICByZXR1cm4gX2NvbW1vbjIuZGVmYXVsdC5CUkVBSztcclxuXHQgICAgICAgIH1cclxuXHQgICAgICB9KTtcclxuXHRcclxuXHQgICAgICByZXR1cm4gX2NvbW1vbjIuZGVmYXVsdC5CUkVBSztcclxuXHQgICAgfVxyXG5cdCAgfSk7XHJcblx0XHJcblx0ICByZXR1cm4gdG9SZXR1cm47XHJcblx0fTtcclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSBpbnRlcnByZXQ7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiA0ICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoY29sb3IsIGZvcmNlQ1NTSGV4KSB7XHJcblx0ICB2YXIgY29sb3JGb3JtYXQgPSBjb2xvci5fX3N0YXRlLmNvbnZlcnNpb25OYW1lLnRvU3RyaW5nKCk7XHJcblx0XHJcblx0ICB2YXIgciA9IE1hdGgucm91bmQoY29sb3Iucik7XHJcblx0ICB2YXIgZyA9IE1hdGgucm91bmQoY29sb3IuZyk7XHJcblx0ICB2YXIgYiA9IE1hdGgucm91bmQoY29sb3IuYik7XHJcblx0ICB2YXIgYSA9IGNvbG9yLmE7XHJcblx0ICB2YXIgaCA9IE1hdGgucm91bmQoY29sb3IuaCk7XHJcblx0ICB2YXIgcyA9IGNvbG9yLnMudG9GaXhlZCgxKTtcclxuXHQgIHZhciB2ID0gY29sb3Iudi50b0ZpeGVkKDEpO1xyXG5cdFxyXG5cdCAgaWYgKGZvcmNlQ1NTSGV4IHx8IGNvbG9yRm9ybWF0ID09PSAnVEhSRUVfQ0hBUl9IRVgnIHx8IGNvbG9yRm9ybWF0ID09PSAnU0lYX0NIQVJfSEVYJykge1xyXG5cdCAgICB2YXIgc3RyID0gY29sb3IuaGV4LnRvU3RyaW5nKDE2KTtcclxuXHQgICAgd2hpbGUgKHN0ci5sZW5ndGggPCA2KSB7XHJcblx0ICAgICAgc3RyID0gJzAnICsgc3RyO1xyXG5cdCAgICB9XHJcblx0ICAgIHJldHVybiAnIycgKyBzdHI7XHJcblx0ICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnQ1NTX1JHQicpIHtcclxuXHQgICAgcmV0dXJuICdyZ2IoJyArIHIgKyAnLCcgKyBnICsgJywnICsgYiArICcpJztcclxuXHQgIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdDU1NfUkdCQScpIHtcclxuXHQgICAgcmV0dXJuICdyZ2JhKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnLCcgKyBhICsgJyknO1xyXG5cdCAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ0hFWCcpIHtcclxuXHQgICAgcmV0dXJuICcweCcgKyBjb2xvci5oZXgudG9TdHJpbmcoMTYpO1xyXG5cdCAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ1JHQl9BUlJBWScpIHtcclxuXHQgICAgcmV0dXJuICdbJyArIHIgKyAnLCcgKyBnICsgJywnICsgYiArICddJztcclxuXHQgIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdSR0JBX0FSUkFZJykge1xyXG5cdCAgICByZXR1cm4gJ1snICsgciArICcsJyArIGcgKyAnLCcgKyBiICsgJywnICsgYSArICddJztcclxuXHQgIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdSR0JfT0JKJykge1xyXG5cdCAgICByZXR1cm4gJ3tyOicgKyByICsgJyxnOicgKyBnICsgJyxiOicgKyBiICsgJ30nO1xyXG5cdCAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ1JHQkFfT0JKJykge1xyXG5cdCAgICByZXR1cm4gJ3tyOicgKyByICsgJyxnOicgKyBnICsgJyxiOicgKyBiICsgJyxhOicgKyBhICsgJ30nO1xyXG5cdCAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ0hTVl9PQkonKSB7XHJcblx0ICAgIHJldHVybiAne2g6JyArIGggKyAnLHM6JyArIHMgKyAnLHY6JyArIHYgKyAnfSc7XHJcblx0ICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnSFNWQV9PQkonKSB7XHJcblx0ICAgIHJldHVybiAne2g6JyArIGggKyAnLHM6JyArIHMgKyAnLHY6JyArIHYgKyAnLGE6JyArIGEgKyAnfSc7XHJcblx0ICB9XHJcblx0XHJcblx0ICByZXR1cm4gJ3Vua25vd24gZm9ybWF0JztcclxuXHR9O1xyXG5cdFxyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyAvKipcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblxyXG4vKioqLyB9LFxyXG4vKiA1ICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHQvKipcclxuXHQgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgKlxyXG5cdCAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICpcclxuXHQgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgKlxyXG5cdCAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAqL1xyXG5cdFxyXG5cdHZhciBBUlJfRUFDSCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xyXG5cdHZhciBBUlJfU0xJQ0UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XHJcblx0XHJcblx0LyoqXHJcblx0ICogQmFuZC1haWQgbWV0aG9kcyBmb3IgdGhpbmdzIHRoYXQgc2hvdWxkIGJlIGEgbG90IGVhc2llciBpbiBKYXZhU2NyaXB0LlxyXG5cdCAqIEltcGxlbWVudGF0aW9uIGFuZCBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgdW5kZXJzY29yZS5qc1xyXG5cdCAqIGh0dHA6Ly9kb2N1bWVudGNsb3VkLmdpdGh1Yi5jb20vdW5kZXJzY29yZS9cclxuXHQgKi9cclxuXHRcclxuXHR2YXIgQ29tbW9uID0ge1xyXG5cdCAgQlJFQUs6IHt9LFxyXG5cdFxyXG5cdCAgZXh0ZW5kOiBmdW5jdGlvbiBleHRlbmQodGFyZ2V0KSB7XHJcblx0ICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbiAob2JqKSB7XHJcblx0ICAgICAgdmFyIGtleXMgPSB0aGlzLmlzT2JqZWN0KG9iaikgPyBPYmplY3Qua2V5cyhvYmopIDogW107XHJcblx0ICAgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuXHQgICAgICAgIGlmICghdGhpcy5pc1VuZGVmaW5lZChvYmpba2V5XSkpIHtcclxuXHQgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICB9LmJpbmQodGhpcykpO1xyXG5cdCAgICB9LCB0aGlzKTtcclxuXHRcclxuXHQgICAgcmV0dXJuIHRhcmdldDtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBkZWZhdWx0czogZnVuY3Rpb24gZGVmYXVsdHModGFyZ2V0KSB7XHJcblx0ICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbiAob2JqKSB7XHJcblx0ICAgICAgdmFyIGtleXMgPSB0aGlzLmlzT2JqZWN0KG9iaikgPyBPYmplY3Qua2V5cyhvYmopIDogW107XHJcblx0ICAgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuXHQgICAgICAgIGlmICh0aGlzLmlzVW5kZWZpbmVkKHRhcmdldFtrZXldKSkge1xyXG5cdCAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgIH0uYmluZCh0aGlzKSk7XHJcblx0ICAgIH0sIHRoaXMpO1xyXG5cdFxyXG5cdCAgICByZXR1cm4gdGFyZ2V0O1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGNvbXBvc2U6IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XHJcblx0ICAgIHZhciB0b0NhbGwgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xyXG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgIHZhciBhcmdzID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcclxuXHQgICAgICBmb3IgKHZhciBpID0gdG9DYWxsLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0ICAgICAgICBhcmdzID0gW3RvQ2FsbFtpXS5hcHBseSh0aGlzLCBhcmdzKV07XHJcblx0ICAgICAgfVxyXG5cdCAgICAgIHJldHVybiBhcmdzWzBdO1xyXG5cdCAgICB9O1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGVhY2g6IGZ1bmN0aW9uIGVhY2gob2JqLCBpdHIsIHNjb3BlKSB7XHJcblx0ICAgIGlmICghb2JqKSB7XHJcblx0ICAgICAgcmV0dXJuO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGlmIChBUlJfRUFDSCAmJiBvYmouZm9yRWFjaCAmJiBvYmouZm9yRWFjaCA9PT0gQVJSX0VBQ0gpIHtcclxuXHQgICAgICBvYmouZm9yRWFjaChpdHIsIHNjb3BlKTtcclxuXHQgICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSBvYmoubGVuZ3RoICsgMCkge1xyXG5cdCAgICAgIC8vIElzIG51bWJlciBidXQgbm90IE5hTlxyXG5cdCAgICAgIHZhciBrZXkgPSB2b2lkIDA7XHJcblx0ICAgICAgdmFyIGwgPSB2b2lkIDA7XHJcblx0ICAgICAgZm9yIChrZXkgPSAwLCBsID0gb2JqLmxlbmd0aDsga2V5IDwgbDsga2V5KyspIHtcclxuXHQgICAgICAgIGlmIChrZXkgaW4gb2JqICYmIGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSykge1xyXG5cdCAgICAgICAgICByZXR1cm47XHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgfVxyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgIGZvciAodmFyIF9rZXkgaW4gb2JqKSB7XHJcblx0ICAgICAgICBpZiAoaXRyLmNhbGwoc2NvcGUsIG9ialtfa2V5XSwgX2tleSkgPT09IHRoaXMuQlJFQUspIHtcclxuXHQgICAgICAgICAgcmV0dXJuO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdCAgfSxcclxuXHRcclxuXHQgIGRlZmVyOiBmdW5jdGlvbiBkZWZlcihmbmMpIHtcclxuXHQgICAgc2V0VGltZW91dChmbmMsIDApO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8vIGlmIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgcmVwZWF0ZWRseSwgd2FpdCB1bnRpbCB0aHJlc2hvbGQgcGFzc2VzIHVudGlsIHdlIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uXHJcblx0ICBkZWJvdW5jZTogZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgdGhyZXNob2xkLCBjYWxsSW1tZWRpYXRlbHkpIHtcclxuXHQgICAgdmFyIHRpbWVvdXQgPSB2b2lkIDA7XHJcblx0XHJcblx0ICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgdmFyIG9iaiA9IHRoaXM7XHJcblx0ICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcblx0ICAgICAgZnVuY3Rpb24gZGVsYXllZCgpIHtcclxuXHQgICAgICAgIHRpbWVvdXQgPSBudWxsO1xyXG5cdCAgICAgICAgaWYgKCFjYWxsSW1tZWRpYXRlbHkpIGZ1bmMuYXBwbHkob2JqLCBhcmdzKTtcclxuXHQgICAgICB9XHJcblx0XHJcblx0ICAgICAgdmFyIGNhbGxOb3cgPSBjYWxsSW1tZWRpYXRlbHkgfHwgIXRpbWVvdXQ7XHJcblx0XHJcblx0ICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdCAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHRocmVzaG9sZCk7XHJcblx0XHJcblx0ICAgICAgaWYgKGNhbGxOb3cpIHtcclxuXHQgICAgICAgIGZ1bmMuYXBwbHkob2JqLCBhcmdzKTtcclxuXHQgICAgICB9XHJcblx0ICAgIH07XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgdG9BcnJheTogZnVuY3Rpb24gdG9BcnJheShvYmopIHtcclxuXHQgICAgaWYgKG9iai50b0FycmF5KSByZXR1cm4gb2JqLnRvQXJyYXkoKTtcclxuXHQgICAgcmV0dXJuIEFSUl9TTElDRS5jYWxsKG9iaik7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xyXG5cdCAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQ7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgaXNOdWxsOiBmdW5jdGlvbiBpc051bGwob2JqKSB7XHJcblx0ICAgIHJldHVybiBvYmogPT09IG51bGw7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgaXNOYU46IGZ1bmN0aW9uIChfaXNOYU4pIHtcclxuXHQgICAgZnVuY3Rpb24gaXNOYU4oX3gpIHtcclxuXHQgICAgICByZXR1cm4gX2lzTmFOLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgaXNOYU4udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgcmV0dXJuIF9pc05hTi50b1N0cmluZygpO1xyXG5cdCAgICB9O1xyXG5cdFxyXG5cdCAgICByZXR1cm4gaXNOYU47XHJcblx0ICB9KGZ1bmN0aW9uIChvYmopIHtcclxuXHQgICAgcmV0dXJuIGlzTmFOKG9iaik7XHJcblx0ICB9KSxcclxuXHRcclxuXHQgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKG9iaikge1xyXG5cdCAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBBcnJheTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBpc09iamVjdDogZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XHJcblx0ICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGlzTnVtYmVyOiBmdW5jdGlvbiBpc051bWJlcihvYmopIHtcclxuXHQgICAgcmV0dXJuIG9iaiA9PT0gb2JqICsgMDtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBpc1N0cmluZzogZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XHJcblx0ICAgIHJldHVybiBvYmogPT09IG9iaiArICcnO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGlzQm9vbGVhbjogZnVuY3Rpb24gaXNCb29sZWFuKG9iaikge1xyXG5cdCAgICByZXR1cm4gb2JqID09PSBmYWxzZSB8fCBvYmogPT09IHRydWU7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgaXNGdW5jdGlvbjogZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcclxuXHQgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG5cdCAgfVxyXG5cdFxyXG5cdH07XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gQ29tbW9uO1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xyXG5cclxuLyoqKi8gfSxcclxuLyogNiAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcclxuXHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHQvKipcclxuXHQgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgKlxyXG5cdCAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICpcclxuXHQgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgKlxyXG5cdCAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAqL1xyXG5cdFxyXG5cdHZhciB0bXBDb21wb25lbnQgPSB2b2lkIDA7XHJcblx0XHJcblx0dmFyIENvbG9yTWF0aCA9IHtcclxuXHQgIGhzdl90b19yZ2I6IGZ1bmN0aW9uIGhzdl90b19yZ2IoaCwgcywgdikge1xyXG5cdCAgICB2YXIgaGkgPSBNYXRoLmZsb29yKGggLyA2MCkgJSA2O1xyXG5cdFxyXG5cdCAgICB2YXIgZiA9IGggLyA2MCAtIE1hdGguZmxvb3IoaCAvIDYwKTtcclxuXHQgICAgdmFyIHAgPSB2ICogKDEuMCAtIHMpO1xyXG5cdCAgICB2YXIgcSA9IHYgKiAoMS4wIC0gZiAqIHMpO1xyXG5cdCAgICB2YXIgdCA9IHYgKiAoMS4wIC0gKDEuMCAtIGYpICogcyk7XHJcblx0XHJcblx0ICAgIHZhciBjID0gW1t2LCB0LCBwXSwgW3EsIHYsIHBdLCBbcCwgdiwgdF0sIFtwLCBxLCB2XSwgW3QsIHAsIHZdLCBbdiwgcCwgcV1dW2hpXTtcclxuXHRcclxuXHQgICAgcmV0dXJuIHtcclxuXHQgICAgICByOiBjWzBdICogMjU1LFxyXG5cdCAgICAgIGc6IGNbMV0gKiAyNTUsXHJcblx0ICAgICAgYjogY1syXSAqIDI1NVxyXG5cdCAgICB9O1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIHJnYl90b19oc3Y6IGZ1bmN0aW9uIHJnYl90b19oc3YociwgZywgYikge1xyXG5cdCAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYik7XHJcblx0ICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcclxuXHQgICAgdmFyIGRlbHRhID0gbWF4IC0gbWluO1xyXG5cdCAgICB2YXIgaCA9IHZvaWQgMDtcclxuXHQgICAgdmFyIHMgPSB2b2lkIDA7XHJcblx0XHJcblx0ICAgIGlmIChtYXggIT09IDApIHtcclxuXHQgICAgICBzID0gZGVsdGEgLyBtYXg7XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0ICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgIGg6IE5hTixcclxuXHQgICAgICAgIHM6IDAsXHJcblx0ICAgICAgICB2OiAwXHJcblx0ICAgICAgfTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBpZiAociA9PT0gbWF4KSB7XHJcblx0ICAgICAgaCA9IChnIC0gYikgLyBkZWx0YTtcclxuXHQgICAgfSBlbHNlIGlmIChnID09PSBtYXgpIHtcclxuXHQgICAgICBoID0gMiArIChiIC0gcikgLyBkZWx0YTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICBoID0gNCArIChyIC0gZykgLyBkZWx0YTtcclxuXHQgICAgfVxyXG5cdCAgICBoIC89IDY7XHJcblx0ICAgIGlmIChoIDwgMCkge1xyXG5cdCAgICAgIGggKz0gMTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICByZXR1cm4ge1xyXG5cdCAgICAgIGg6IGggKiAzNjAsXHJcblx0ICAgICAgczogcyxcclxuXHQgICAgICB2OiBtYXggLyAyNTVcclxuXHQgICAgfTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICByZ2JfdG9faGV4OiBmdW5jdGlvbiByZ2JfdG9faGV4KHIsIGcsIGIpIHtcclxuXHQgICAgdmFyIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KDAsIDIsIHIpO1xyXG5cdCAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDEsIGcpO1xyXG5cdCAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDAsIGIpO1xyXG5cdCAgICByZXR1cm4gaGV4O1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGNvbXBvbmVudF9mcm9tX2hleDogZnVuY3Rpb24gY29tcG9uZW50X2Zyb21faGV4KGhleCwgY29tcG9uZW50SW5kZXgpIHtcclxuXHQgICAgcmV0dXJuIGhleCA+PiBjb21wb25lbnRJbmRleCAqIDggJiAweEZGO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGhleF93aXRoX2NvbXBvbmVudDogZnVuY3Rpb24gaGV4X3dpdGhfY29tcG9uZW50KGhleCwgY29tcG9uZW50SW5kZXgsIHZhbHVlKSB7XHJcblx0ICAgIHJldHVybiB2YWx1ZSA8PCAodG1wQ29tcG9uZW50ID0gY29tcG9uZW50SW5kZXggKiA4KSB8IGhleCAmIH4oMHhGRiA8PCB0bXBDb21wb25lbnQpO1xyXG5cdCAgfVxyXG5cdH07XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gQ29sb3JNYXRoO1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XHJcblxyXG4vKioqLyB9LFxyXG4vKiA3ICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAqXHJcblx0ICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgKlxyXG5cdCAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAqXHJcblx0ICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICovXHJcblx0XHJcblx0LyoqXHJcblx0ICogQGNsYXNzIEFuIFwiYWJzdHJhY3RcIiBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xyXG5cdCAqL1xyXG5cdHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgZnVuY3Rpb24gQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KSB7XHJcblx0ICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb250cm9sbGVyKTtcclxuXHRcclxuXHQgICAgdGhpcy5pbml0aWFsVmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xyXG5cdFxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhvc2Ugd2hvIGV4dGVuZCB0aGlzIGNsYXNzIHdpbGwgcHV0IHRoZWlyIERPTSBlbGVtZW50cyBpbiBoZXJlLlxyXG5cdCAgICAgKiBAdHlwZSB7RE9NRWxlbWVudH1cclxuXHQgICAgICovXHJcblx0ICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIG9iamVjdCB0byBtYW5pcHVsYXRlXHJcblx0ICAgICAqIEB0eXBlIHtPYmplY3R9XHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcclxuXHRcclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBtYW5pcHVsYXRlXHJcblx0ICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XHJcblx0XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGNoYW5nZS5cclxuXHQgICAgICogQHR5cGUge0Z1bmN0aW9ufVxyXG5cdCAgICAgKiBAaWdub3JlXHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLl9fb25DaGFuZ2UgPSB1bmRlZmluZWQ7XHJcblx0XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGZpbmlzaGluZyBjaGFuZ2UuXHJcblx0ICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cclxuXHQgICAgICogQGlnbm9yZVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlID0gdW5kZWZpbmVkO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKiBTcGVjaWZ5IHRoYXQgYSBmdW5jdGlvbiBmaXJlIGV2ZXJ5IHRpbWUgc29tZW9uZSBjaGFuZ2VzIHRoZSB2YWx1ZSB3aXRoXHJcblx0ICAgKiB0aGlzIENvbnRyb2xsZXIuXHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5jIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIHZhbHVlXHJcblx0ICAgKiBpcyBtb2RpZmllZCB2aWEgdGhpcyBDb250cm9sbGVyLlxyXG5cdCAgICogQHJldHVybnMge0NvbnRyb2xsZXJ9IHRoaXNcclxuXHQgICAqL1xyXG5cdFxyXG5cdFxyXG5cdCAgQ29udHJvbGxlci5wcm90b3R5cGUub25DaGFuZ2UgPSBmdW5jdGlvbiBvbkNoYW5nZShmbmMpIHtcclxuXHQgICAgdGhpcy5fX29uQ2hhbmdlID0gZm5jO1xyXG5cdCAgICByZXR1cm4gdGhpcztcclxuXHQgIH07XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIFNwZWNpZnkgdGhhdCBhIGZ1bmN0aW9uIGZpcmUgZXZlcnkgdGltZSBzb21lb25lIFwiZmluaXNoZXNcIiBjaGFuZ2luZ1xyXG5cdCAgICogdGhlIHZhbHVlIHdpaCB0aGlzIENvbnRyb2xsZXIuIFVzZWZ1bCBmb3IgdmFsdWVzIHRoYXQgY2hhbmdlXHJcblx0ICAgKiBpbmNyZW1lbnRhbGx5IGxpa2UgbnVtYmVycyBvciBzdHJpbmdzLlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuYyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyXHJcblx0ICAgKiBzb21lb25lIFwiZmluaXNoZXNcIiBjaGFuZ2luZyB0aGUgdmFsdWUgdmlhIHRoaXMgQ29udHJvbGxlci5cclxuXHQgICAqIEByZXR1cm5zIHtDb250cm9sbGVyfSB0aGlzXHJcblx0ICAgKi9cclxuXHRcclxuXHRcclxuXHQgIENvbnRyb2xsZXIucHJvdG90eXBlLm9uRmluaXNoQ2hhbmdlID0gZnVuY3Rpb24gb25GaW5pc2hDaGFuZ2UoZm5jKSB7XHJcblx0ICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZSA9IGZuYztcclxuXHQgICAgcmV0dXJuIHRoaXM7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKiBDaGFuZ2UgdGhlIHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIHtPYmplY3R9IG5ld1ZhbHVlIFRoZSBuZXcgdmFsdWUgb2YgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cclxuXHQgICAqL1xyXG5cdFxyXG5cdFxyXG5cdCAgQ29udHJvbGxlci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiBzZXRWYWx1ZShuZXdWYWx1ZSkge1xyXG5cdCAgICB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XSA9IG5ld1ZhbHVlO1xyXG5cdCAgICBpZiAodGhpcy5fX29uQ2hhbmdlKSB7XHJcblx0ICAgICAgdGhpcy5fX29uQ2hhbmdlLmNhbGwodGhpcywgbmV3VmFsdWUpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xyXG5cdCAgICByZXR1cm4gdGhpcztcclxuXHQgIH07XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIEdldHMgdGhlIHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XHJcblx0ICAgKlxyXG5cdCAgICogQHJldHVybnMge09iamVjdH0gVGhlIGN1cnJlbnQgdmFsdWUgb2YgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cclxuXHQgICAqL1xyXG5cdFxyXG5cdFxyXG5cdCAgQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiBnZXRWYWx1ZSgpIHtcclxuXHQgICAgcmV0dXJuIHRoaXMub2JqZWN0W3RoaXMucHJvcGVydHldO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogUmVmcmVzaGVzIHRoZSB2aXN1YWwgZGlzcGxheSBvZiBhIENvbnRyb2xsZXIgaW4gb3JkZXIgdG8ga2VlcCBzeW5jXHJcblx0ICAgKiB3aXRoIHRoZSBvYmplY3QncyBjdXJyZW50IHZhbHVlLlxyXG5cdCAgICogQHJldHVybnMge0NvbnRyb2xsZXJ9IHRoaXNcclxuXHQgICAqL1xyXG5cdFxyXG5cdFxyXG5cdCAgQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRGlzcGxheSA9IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XHJcblx0ICAgIHJldHVybiB0aGlzO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlIHZhbHVlIGhhcyBkZXZpYXRlZCBmcm9tIGluaXRpYWxWYWx1ZVxyXG5cdCAgICovXHJcblx0XHJcblx0XHJcblx0ICBDb250cm9sbGVyLnByb3RvdHlwZS5pc01vZGlmaWVkID0gZnVuY3Rpb24gaXNNb2RpZmllZCgpIHtcclxuXHQgICAgcmV0dXJuIHRoaXMuaW5pdGlhbFZhbHVlICE9PSB0aGlzLmdldFZhbHVlKCk7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgcmV0dXJuIENvbnRyb2xsZXI7XHJcblx0fSgpO1xyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IENvbnRyb2xsZXI7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiA4ICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXIyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29udHJvbGxlcjIpO1xyXG5cdFxyXG5cdHZhciBfZG9tID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcclxuXHRcclxuXHR2YXIgX2RvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kb20pO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH0gLyoqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuXHRcclxuXHQvKipcclxuXHQgKiBAY2xhc3MgUHJvdmlkZXMgYSBjaGVja2JveCBpbnB1dCB0byBhbHRlciB0aGUgYm9vbGVhbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXHJcblx0ICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcclxuXHQgKlxyXG5cdCAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXHJcblx0ICovXHJcblx0dmFyIEJvb2xlYW5Db250cm9sbGVyID0gZnVuY3Rpb24gKF9Db250cm9sbGVyKSB7XHJcblx0ICBfaW5oZXJpdHMoQm9vbGVhbkNvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcclxuXHRcclxuXHQgIGZ1bmN0aW9uIEJvb2xlYW5Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpIHtcclxuXHQgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJvb2xlYW5Db250cm9sbGVyKTtcclxuXHRcclxuXHQgICAgdmFyIF90aGlzMiA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db250cm9sbGVyLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSkpO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMgPSBfdGhpczI7XHJcblx0ICAgIF90aGlzMi5fX3ByZXYgPSBfdGhpczIuZ2V0VmFsdWUoKTtcclxuXHRcclxuXHQgICAgX3RoaXMyLl9fY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdCAgICBfdGhpczIuX19jaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcclxuXHRcclxuXHQgICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XHJcblx0ICAgICAgX3RoaXMuc2V0VmFsdWUoIV90aGlzLl9fcHJldik7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKF90aGlzMi5fX2NoZWNrYm94LCAnY2hhbmdlJywgb25DaGFuZ2UsIGZhbHNlKTtcclxuXHRcclxuXHQgICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9fY2hlY2tib3gpO1xyXG5cdFxyXG5cdCAgICAvLyBNYXRjaCBvcmlnaW5hbCB2YWx1ZVxyXG5cdCAgICBfdGhpczIudXBkYXRlRGlzcGxheSgpO1xyXG5cdCAgICByZXR1cm4gX3RoaXMyO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgQm9vbGVhbkNvbnRyb2xsZXIucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gc2V0VmFsdWUodikge1xyXG5cdCAgICB2YXIgdG9SZXR1cm4gPSBfQ29udHJvbGxlci5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcclxuXHQgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xyXG5cdCAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKHRoaXMsIHRoaXMuZ2V0VmFsdWUoKSk7XHJcblx0ICAgIH1cclxuXHQgICAgdGhpcy5fX3ByZXYgPSB0aGlzLmdldFZhbHVlKCk7XHJcblx0ICAgIHJldHVybiB0b1JldHVybjtcclxuXHQgIH07XHJcblx0XHJcblx0ICBCb29sZWFuQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRGlzcGxheSA9IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XHJcblx0ICAgIGlmICh0aGlzLmdldFZhbHVlKCkgPT09IHRydWUpIHtcclxuXHQgICAgICB0aGlzLl9fY2hlY2tib3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuXHQgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XHJcblx0ICAgICAgdGhpcy5fX3ByZXYgPSB0cnVlO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgIHRoaXMuX19jaGVja2JveC5jaGVja2VkID0gZmFsc2U7XHJcblx0ICAgICAgdGhpcy5fX3ByZXYgPSBmYWxzZTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICByZXR1cm4gX0NvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcclxuXHQgIH07XHJcblx0XHJcblx0ICByZXR1cm4gQm9vbGVhbkNvbnRyb2xsZXI7XHJcblx0fShfQ29udHJvbGxlcjMuZGVmYXVsdCk7XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gQm9vbGVhbkNvbnRyb2xsZXI7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiA5ICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tbW9uKTtcclxuXHRcclxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxyXG5cdFxyXG5cdHZhciBFVkVOVF9NQVAgPSB7XHJcblx0ICBIVE1MRXZlbnRzOiBbJ2NoYW5nZSddLFxyXG5cdCAgTW91c2VFdmVudHM6IFsnY2xpY2snLCAnbW91c2Vtb3ZlJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ21vdXNlb3ZlciddLFxyXG5cdCAgS2V5Ym9hcmRFdmVudHM6IFsna2V5ZG93biddXHJcblx0fTsgLyoqXHJcblx0ICAgICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAgICAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICAgICpcclxuXHQgICAgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAgICAqXHJcblx0ICAgICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICAgICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICAgICpcclxuXHQgICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgICAgKi9cclxuXHRcclxuXHR2YXIgRVZFTlRfTUFQX0lOViA9IHt9O1xyXG5cdF9jb21tb24yLmRlZmF1bHQuZWFjaChFVkVOVF9NQVAsIGZ1bmN0aW9uICh2LCBrKSB7XHJcblx0ICBfY29tbW9uMi5kZWZhdWx0LmVhY2godiwgZnVuY3Rpb24gKGUpIHtcclxuXHQgICAgRVZFTlRfTUFQX0lOVltlXSA9IGs7XHJcblx0ICB9KTtcclxuXHR9KTtcclxuXHRcclxuXHR2YXIgQ1NTX1ZBTFVFX1BJWEVMUyA9IC8oXFxkKyhcXC5cXGQrKT8pcHgvO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGNzc1ZhbHVlVG9QaXhlbHModmFsKSB7XHJcblx0ICBpZiAodmFsID09PSAnMCcgfHwgX2NvbW1vbjIuZGVmYXVsdC5pc1VuZGVmaW5lZCh2YWwpKSB7XHJcblx0ICAgIHJldHVybiAwO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgdmFyIG1hdGNoID0gdmFsLm1hdGNoKENTU19WQUxVRV9QSVhFTFMpO1xyXG5cdFxyXG5cdCAgaWYgKCFfY29tbW9uMi5kZWZhdWx0LmlzTnVsbChtYXRjaCkpIHtcclxuXHQgICAgcmV0dXJuIHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgLy8gVE9ETyAuLi5lbXM/ICU/XHJcblx0XHJcblx0ICByZXR1cm4gMDtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQG5hbWVzcGFjZVxyXG5cdCAqIEBtZW1iZXIgZGF0LmRvbVxyXG5cdCAqL1xyXG5cdHZhciBkb20gPSB7XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqXHJcblx0ICAgKiBAcGFyYW0gZWxlbVxyXG5cdCAgICogQHBhcmFtIHNlbGVjdGFibGVcclxuXHQgICAqL1xyXG5cdCAgbWFrZVNlbGVjdGFibGU6IGZ1bmN0aW9uIG1ha2VTZWxlY3RhYmxlKGVsZW0sIHNlbGVjdGFibGUpIHtcclxuXHQgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCB8fCBlbGVtLnN0eWxlID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHRcclxuXHQgICAgZWxlbS5vbnNlbGVjdHN0YXJ0ID0gc2VsZWN0YWJsZSA/IGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgIH0gOiBmdW5jdGlvbiAoKSB7fTtcclxuXHRcclxuXHQgICAgZWxlbS5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gc2VsZWN0YWJsZSA/ICdhdXRvJyA6ICdub25lJztcclxuXHQgICAgZWxlbS5zdHlsZS5LaHRtbFVzZXJTZWxlY3QgPSBzZWxlY3RhYmxlID8gJ2F1dG8nIDogJ25vbmUnO1xyXG5cdCAgICBlbGVtLnVuc2VsZWN0YWJsZSA9IHNlbGVjdGFibGUgPyAnb24nIDogJ29mZic7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIGVsZW1cclxuXHQgICAqIEBwYXJhbSBob3Jpem9udGFsXHJcblx0ICAgKiBAcGFyYW0gdmVydFxyXG5cdCAgICovXHJcblx0ICBtYWtlRnVsbHNjcmVlbjogZnVuY3Rpb24gbWFrZUZ1bGxzY3JlZW4oZWxlbSwgaG9yLCB2ZXJ0KSB7XHJcblx0ICAgIHZhciB2ZXJ0aWNhbCA9IHZlcnQ7XHJcblx0ICAgIHZhciBob3Jpem9udGFsID0gaG9yO1xyXG5cdFxyXG5cdCAgICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc1VuZGVmaW5lZChob3Jpem9udGFsKSkge1xyXG5cdCAgICAgIGhvcml6b250YWwgPSB0cnVlO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzVW5kZWZpbmVkKHZlcnRpY2FsKSkge1xyXG5cdCAgICAgIHZlcnRpY2FsID0gdHJ1ZTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcclxuXHQgICAgaWYgKGhvcml6b250YWwpIHtcclxuXHQgICAgICBlbGVtLnN0eWxlLmxlZnQgPSAwO1xyXG5cdCAgICAgIGVsZW0uc3R5bGUucmlnaHQgPSAwO1xyXG5cdCAgICB9XHJcblx0ICAgIGlmICh2ZXJ0aWNhbCkge1xyXG5cdCAgICAgIGVsZW0uc3R5bGUudG9wID0gMDtcclxuXHQgICAgICBlbGVtLnN0eWxlLmJvdHRvbSA9IDA7XHJcblx0ICAgIH1cclxuXHQgIH0sXHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqXHJcblx0ICAgKiBAcGFyYW0gZWxlbVxyXG5cdCAgICogQHBhcmFtIGV2ZW50VHlwZVxyXG5cdCAgICogQHBhcmFtIHBhcmFtc1xyXG5cdCAgICovXHJcblx0ICBmYWtlRXZlbnQ6IGZ1bmN0aW9uIGZha2VFdmVudChlbGVtLCBldmVudFR5cGUsIHBhcnMsIGF1eCkge1xyXG5cdCAgICB2YXIgcGFyYW1zID0gcGFycyB8fCB7fTtcclxuXHQgICAgdmFyIGNsYXNzTmFtZSA9IEVWRU5UX01BUF9JTlZbZXZlbnRUeXBlXTtcclxuXHQgICAgaWYgKCFjbGFzc05hbWUpIHtcclxuXHQgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V2ZW50IHR5cGUgJyArIGV2ZW50VHlwZSArICcgbm90IHN1cHBvcnRlZC4nKTtcclxuXHQgICAgfVxyXG5cdCAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoY2xhc3NOYW1lKTtcclxuXHQgICAgc3dpdGNoIChjbGFzc05hbWUpIHtcclxuXHQgICAgICBjYXNlICdNb3VzZUV2ZW50cyc6XHJcblx0ICAgICAgICB7XHJcblx0ICAgICAgICAgIHZhciBjbGllbnRYID0gcGFyYW1zLnggfHwgcGFyYW1zLmNsaWVudFggfHwgMDtcclxuXHQgICAgICAgICAgdmFyIGNsaWVudFkgPSBwYXJhbXMueSB8fCBwYXJhbXMuY2xpZW50WSB8fCAwO1xyXG5cdCAgICAgICAgICBldnQuaW5pdE1vdXNlRXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSwgcGFyYW1zLmNhbmNlbGFibGUgfHwgdHJ1ZSwgd2luZG93LCBwYXJhbXMuY2xpY2tDb3VudCB8fCAxLCAwLCAvLyBzY3JlZW4gWFxyXG5cdCAgICAgICAgICAwLCAvLyBzY3JlZW4gWVxyXG5cdCAgICAgICAgICBjbGllbnRYLCAvLyBjbGllbnQgWFxyXG5cdCAgICAgICAgICBjbGllbnRZLCAvLyBjbGllbnQgWVxyXG5cdCAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XHJcblx0ICAgICAgICAgIGJyZWFrO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgIGNhc2UgJ0tleWJvYXJkRXZlbnRzJzpcclxuXHQgICAgICAgIHtcclxuXHQgICAgICAgICAgdmFyIGluaXQgPSBldnQuaW5pdEtleWJvYXJkRXZlbnQgfHwgZXZ0LmluaXRLZXlFdmVudDsgLy8gd2Via2l0IHx8IG1velxyXG5cdCAgICAgICAgICBfY29tbW9uMi5kZWZhdWx0LmRlZmF1bHRzKHBhcmFtcywge1xyXG5cdCAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcblx0ICAgICAgICAgICAgY3RybEtleTogZmFsc2UsXHJcblx0ICAgICAgICAgICAgYWx0S2V5OiBmYWxzZSxcclxuXHQgICAgICAgICAgICBzaGlmdEtleTogZmFsc2UsXHJcblx0ICAgICAgICAgICAgbWV0YUtleTogZmFsc2UsXHJcblx0ICAgICAgICAgICAga2V5Q29kZTogdW5kZWZpbmVkLFxyXG5cdCAgICAgICAgICAgIGNoYXJDb2RlOiB1bmRlZmluZWRcclxuXHQgICAgICAgICAgfSk7XHJcblx0ICAgICAgICAgIGluaXQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSwgcGFyYW1zLmNhbmNlbGFibGUsIHdpbmRvdywgcGFyYW1zLmN0cmxLZXksIHBhcmFtcy5hbHRLZXksIHBhcmFtcy5zaGlmdEtleSwgcGFyYW1zLm1ldGFLZXksIHBhcmFtcy5rZXlDb2RlLCBwYXJhbXMuY2hhckNvZGUpO1xyXG5cdCAgICAgICAgICBicmVhaztcclxuXHQgICAgICAgIH1cclxuXHQgICAgICBkZWZhdWx0OlxyXG5cdCAgICAgICAge1xyXG5cdCAgICAgICAgICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsIHBhcmFtcy5jYW5jZWxhYmxlIHx8IHRydWUpO1xyXG5cdCAgICAgICAgICBicmVhaztcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmRlZmF1bHRzKGV2dCwgYXV4KTtcclxuXHQgICAgZWxlbS5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIGVsZW1cclxuXHQgICAqIEBwYXJhbSBldmVudFxyXG5cdCAgICogQHBhcmFtIGZ1bmNcclxuXHQgICAqIEBwYXJhbSBib29sXHJcblx0ICAgKi9cclxuXHQgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoZWxlbSwgZXZlbnQsIGZ1bmMsIG5ld0Jvb2wpIHtcclxuXHQgICAgdmFyIGJvb2wgPSBuZXdCb29sIHx8IGZhbHNlO1xyXG5cdCAgICBpZiAoZWxlbS5hZGRFdmVudExpc3RlbmVyKSB7XHJcblx0ICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLCBib29sKTtcclxuXHQgICAgfSBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50KSB7XHJcblx0ICAgICAgZWxlbS5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZ1bmMpO1xyXG5cdCAgICB9XHJcblx0ICAgIHJldHVybiBkb207XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIGVsZW1cclxuXHQgICAqIEBwYXJhbSBldmVudFxyXG5cdCAgICogQHBhcmFtIGZ1bmNcclxuXHQgICAqIEBwYXJhbSBib29sXHJcblx0ICAgKi9cclxuXHQgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKGVsZW0sIGV2ZW50LCBmdW5jLCBuZXdCb29sKSB7XHJcblx0ICAgIHZhciBib29sID0gbmV3Qm9vbCB8fCBmYWxzZTtcclxuXHQgICAgaWYgKGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xyXG5cdCAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYywgYm9vbCk7XHJcblx0ICAgIH0gZWxzZSBpZiAoZWxlbS5kZXRhY2hFdmVudCkge1xyXG5cdCAgICAgIGVsZW0uZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmdW5jKTtcclxuXHQgICAgfVxyXG5cdCAgICByZXR1cm4gZG9tO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSBlbGVtXHJcblx0ICAgKiBAcGFyYW0gY2xhc3NOYW1lXHJcblx0ICAgKi9cclxuXHQgIGFkZENsYXNzOiBmdW5jdGlvbiBhZGRDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcclxuXHQgICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcclxuXHQgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuXHQgICAgfSBlbHNlIGlmIChlbGVtLmNsYXNzTmFtZSAhPT0gY2xhc3NOYW1lKSB7XHJcblx0ICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgvICsvKTtcclxuXHQgICAgICBpZiAoY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSkgPT09IC0xKSB7XHJcblx0ICAgICAgICBjbGFzc2VzLnB1c2goY2xhc3NOYW1lKTtcclxuXHQgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJykucmVwbGFjZSgvXlxccysvLCAnJykucmVwbGFjZSgvXFxzKyQvLCAnJyk7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9XHJcblx0ICAgIHJldHVybiBkb207XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIGVsZW1cclxuXHQgICAqIEBwYXJhbSBjbGFzc05hbWVcclxuXHQgICAqL1xyXG5cdCAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xyXG5cdCAgICBpZiAoY2xhc3NOYW1lKSB7XHJcblx0ICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSBjbGFzc05hbWUpIHtcclxuXHQgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xyXG5cdCAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW0uY2xhc3NOYW1lLnNwbGl0KC8gKy8pO1xyXG5cdCAgICAgICAgdmFyIGluZGV4ID0gY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSk7XHJcblx0ICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcblx0ICAgICAgICAgIGNsYXNzZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHQgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICB9XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0ICAgICAgZWxlbS5jbGFzc05hbWUgPSB1bmRlZmluZWQ7XHJcblx0ICAgIH1cclxuXHQgICAgcmV0dXJuIGRvbTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBoYXNDbGFzczogZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XHJcblx0ICAgIHJldHVybiBuZXcgUmVnRXhwKCcoPzpefFxcXFxzKyknICsgY2xhc3NOYW1lICsgJyg/OlxcXFxzK3wkKScpLnRlc3QoZWxlbS5jbGFzc05hbWUpIHx8IGZhbHNlO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSBlbGVtXHJcblx0ICAgKi9cclxuXHQgIGdldFdpZHRoOiBmdW5jdGlvbiBnZXRXaWR0aChlbGVtKSB7XHJcblx0ICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XHJcblx0XHJcblx0ICAgIHJldHVybiBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItbGVmdC13aWR0aCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1yaWdodC13aWR0aCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctbGVmdCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctcmlnaHQnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlLndpZHRoKTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqXHJcblx0ICAgKiBAcGFyYW0gZWxlbVxyXG5cdCAgICovXHJcblx0ICBnZXRIZWlnaHQ6IGZ1bmN0aW9uIGdldEhlaWdodChlbGVtKSB7XHJcblx0ICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XHJcblx0XHJcblx0ICAgIHJldHVybiBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItdG9wLXdpZHRoJ10pICsgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLWJvdHRvbS13aWR0aCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctdG9wJ10pICsgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy1ib3R0b20nXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlLmhlaWdodCk7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIGVsXHJcblx0ICAgKi9cclxuXHQgIGdldE9mZnNldDogZnVuY3Rpb24gZ2V0T2Zmc2V0KGVsKSB7XHJcblx0ICAgIHZhciBlbGVtID0gZWw7XHJcblx0ICAgIHZhciBvZmZzZXQgPSB7IGxlZnQ6IDAsIHRvcDogMCB9O1xyXG5cdCAgICBpZiAoZWxlbS5vZmZzZXRQYXJlbnQpIHtcclxuXHQgICAgICBkbyB7XHJcblx0ICAgICAgICBvZmZzZXQubGVmdCArPSBlbGVtLm9mZnNldExlZnQ7XHJcblx0ICAgICAgICBvZmZzZXQudG9wICs9IGVsZW0ub2Zmc2V0VG9wO1xyXG5cdCAgICAgICAgZWxlbSA9IGVsZW0ub2Zmc2V0UGFyZW50O1xyXG5cdCAgICAgIH0gd2hpbGUgKGVsZW0pO1xyXG5cdCAgICB9XHJcblx0ICAgIHJldHVybiBvZmZzZXQ7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3Bvc3RzLzI2ODQ1NjEvcmV2aXNpb25zXHJcblx0ICAvKipcclxuXHQgICAqXHJcblx0ICAgKiBAcGFyYW0gZWxlbVxyXG5cdCAgICovXHJcblx0ICBpc0FjdGl2ZTogZnVuY3Rpb24gaXNBY3RpdmUoZWxlbSkge1xyXG5cdCAgICByZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoZWxlbS50eXBlIHx8IGVsZW0uaHJlZik7XHJcblx0ICB9XHJcblx0XHJcblx0fTtcclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSBkb207XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiAxMCAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyMiA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbnRyb2xsZXIyKTtcclxuXHRcclxuXHR2YXIgX2RvbSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XHJcblx0XHJcblx0dmFyIF9kb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZG9tKTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tbW9uKTtcclxuXHRcclxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9IC8qKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblx0XHJcblx0LyoqXHJcblx0ICogQGNsYXNzIFByb3ZpZGVzIGEgc2VsZWN0IGlucHV0IHRvIGFsdGVyIHRoZSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QsIHVzaW5nIGFcclxuXHQgKiBsaXN0IG9mIGFjY2VwdGVkIHZhbHVlcy5cclxuXHQgKlxyXG5cdCAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICogQHBhcmFtIHtPYmplY3R8c3RyaW5nW119IG9wdGlvbnMgQSBtYXAgb2YgbGFiZWxzIHRvIGFjY2VwdGFibGUgdmFsdWVzLCBvclxyXG5cdCAqIGEgbGlzdCBvZiBhY2NlcHRhYmxlIHN0cmluZyB2YWx1ZXMuXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xyXG5cdCAqL1xyXG5cdHZhciBPcHRpb25Db250cm9sbGVyID0gZnVuY3Rpb24gKF9Db250cm9sbGVyKSB7XHJcblx0ICBfaW5oZXJpdHMoT3B0aW9uQ29udHJvbGxlciwgX0NvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdCAgZnVuY3Rpb24gT3B0aW9uQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCBvcHRzKSB7XHJcblx0ICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBPcHRpb25Db250cm9sbGVyKTtcclxuXHRcclxuXHQgICAgdmFyIF90aGlzMiA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db250cm9sbGVyLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSkpO1xyXG5cdFxyXG5cdCAgICB2YXIgb3B0aW9ucyA9IG9wdHM7XHJcblx0XHJcblx0ICAgIHZhciBfdGhpcyA9IF90aGlzMjtcclxuXHRcclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRoZSBkcm9wIGRvd24gbWVudVxyXG5cdCAgICAgKiBAaWdub3JlXHJcblx0ICAgICAqL1xyXG5cdCAgICBfdGhpczIuX19zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcclxuXHRcclxuXHQgICAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNBcnJheShvcHRpb25zKSkge1xyXG5cdCAgICAgIHZhciBtYXAgPSB7fTtcclxuXHQgICAgICBfY29tbW9uMi5kZWZhdWx0LmVhY2gob3B0aW9ucywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHQgICAgICAgIG1hcFtlbGVtZW50XSA9IGVsZW1lbnQ7XHJcblx0ICAgICAgfSk7XHJcblx0ICAgICAgb3B0aW9ucyA9IG1hcDtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmVhY2gob3B0aW9ucywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuXHQgICAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcblx0ICAgICAgb3B0LmlubmVySFRNTCA9IGtleTtcclxuXHQgICAgICBvcHQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcclxuXHQgICAgICBfdGhpcy5fX3NlbGVjdC5hcHBlbmRDaGlsZChvcHQpO1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgLy8gQWNrbm93bGVkZ2Ugb3JpZ2luYWwgdmFsdWVcclxuXHQgICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKF90aGlzMi5fX3NlbGVjdCwgJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICB2YXIgZGVzaXJlZFZhbHVlID0gdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcblx0ICAgICAgX3RoaXMuc2V0VmFsdWUoZGVzaXJlZFZhbHVlKTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX3NlbGVjdCk7XHJcblx0ICAgIHJldHVybiBfdGhpczI7XHJcblx0ICB9XHJcblx0XHJcblx0ICBPcHRpb25Db250cm9sbGVyLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uIHNldFZhbHVlKHYpIHtcclxuXHQgICAgdmFyIHRvUmV0dXJuID0gX0NvbnRyb2xsZXIucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgdik7XHJcblx0XHJcblx0ICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcclxuXHQgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xyXG5cdCAgICB9XHJcblx0ICAgIHJldHVybiB0b1JldHVybjtcclxuXHQgIH07XHJcblx0XHJcblx0ICBPcHRpb25Db250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5ID0gZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcclxuXHQgICAgaWYgKF9kb20yLmRlZmF1bHQuaXNBY3RpdmUodGhpcy5fX3NlbGVjdCkpIHJldHVybiB0aGlzOyAvLyBwcmV2ZW50IG51bWJlciBmcm9tIHVwZGF0aW5nIGlmIHVzZXIgaXMgdHJ5aW5nIHRvIG1hbnVhbGx5IHVwZGF0ZVxyXG5cdCAgICB0aGlzLl9fc2VsZWN0LnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG5cdCAgICByZXR1cm4gX0NvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcclxuXHQgIH07XHJcblx0XHJcblx0ICByZXR1cm4gT3B0aW9uQ29udHJvbGxlcjtcclxuXHR9KF9Db250cm9sbGVyMy5kZWZhdWx0KTtcclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSBPcHRpb25Db250cm9sbGVyO1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xyXG5cclxuLyoqKi8gfSxcclxuLyogMTEgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cdFxyXG5cdHZhciBfQ29udHJvbGxlcjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xyXG5cdFxyXG5cdHZhciBfQ29udHJvbGxlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db250cm9sbGVyMik7XHJcblx0XHJcblx0dmFyIF9kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xyXG5cdFxyXG5cdHZhciBfZG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RvbSk7XHJcblx0XHJcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfSAvKipcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBjbGFzcyBQcm92aWRlcyBhIHRleHQgaW5wdXQgdG8gYWx0ZXIgdGhlIHN0cmluZyBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxyXG5cdCAqXHJcblx0ICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcclxuXHQgKi9cclxuXHR2YXIgU3RyaW5nQ29udHJvbGxlciA9IGZ1bmN0aW9uIChfQ29udHJvbGxlcikge1xyXG5cdCAgX2luaGVyaXRzKFN0cmluZ0NvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcclxuXHRcclxuXHQgIGZ1bmN0aW9uIFN0cmluZ0NvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSkge1xyXG5cdCAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RyaW5nQ29udHJvbGxlcik7XHJcblx0XHJcblx0ICAgIHZhciBfdGhpczIgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29udHJvbGxlci5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpKTtcclxuXHRcclxuXHQgICAgdmFyIF90aGlzID0gX3RoaXMyO1xyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcclxuXHQgICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2lucHV0LnZhbHVlKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XHJcblx0ICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcclxuXHQgICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIF90aGlzMi5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHQgICAgX3RoaXMyLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKF90aGlzMi5fX2lucHV0LCAna2V5dXAnLCBvbkNoYW5nZSk7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19pbnB1dCwgJ2NoYW5nZScsIG9uQ2hhbmdlKTtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKF90aGlzMi5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdCAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcblx0ICAgICAgICB0aGlzLmJsdXIoKTtcclxuXHQgICAgICB9XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBfdGhpczIudXBkYXRlRGlzcGxheSgpO1xyXG5cdFxyXG5cdCAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19pbnB1dCk7XHJcblx0ICAgIHJldHVybiBfdGhpczI7XHJcblx0ICB9XHJcblx0XHJcblx0ICBTdHJpbmdDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5ID0gZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcclxuXHQgICAgLy8gU3RvcHMgdGhlIGNhcmV0IGZyb20gbW92aW5nIG9uIGFjY291bnQgb2Y6XHJcblx0ICAgIC8vIGtleXVwIC0+IHNldFZhbHVlIC0+IHVwZGF0ZURpc3BsYXlcclxuXHQgICAgaWYgKCFfZG9tMi5kZWZhdWx0LmlzQWN0aXZlKHRoaXMuX19pbnB1dCkpIHtcclxuXHQgICAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XHJcblx0ICAgIH1cclxuXHQgICAgcmV0dXJuIF9Db250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgcmV0dXJuIFN0cmluZ0NvbnRyb2xsZXI7XHJcblx0fShfQ29udHJvbGxlcjMuZGVmYXVsdCk7XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gU3RyaW5nQ29udHJvbGxlcjtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDEyICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXIyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29udHJvbGxlcjIpO1xyXG5cdFxyXG5cdHZhciBfY29tbW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21tb24pO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH0gLyoqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuXHRcclxuXHRmdW5jdGlvbiBudW1EZWNpbWFscyh4KSB7XHJcblx0ICB2YXIgX3ggPSB4LnRvU3RyaW5nKCk7XHJcblx0ICBpZiAoX3guaW5kZXhPZignLicpID4gLTEpIHtcclxuXHQgICAgcmV0dXJuIF94Lmxlbmd0aCAtIF94LmluZGV4T2YoJy4nKSAtIDE7XHJcblx0ICB9XHJcblx0XHJcblx0ICByZXR1cm4gMDtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGNsYXNzIFJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgdGhhdCBpcyBhIG51bWJlci5cclxuXHQgKlxyXG5cdCAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIE9wdGlvbmFsIHBhcmFtZXRlcnNcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5taW5dIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1heF0gTWF4aW11bSBhbGxvd2VkIHZhbHVlXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMuc3RlcF0gSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxyXG5cdCAqXHJcblx0ICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcclxuXHQgKi9cclxuXHRcclxuXHR2YXIgTnVtYmVyQ29udHJvbGxlciA9IGZ1bmN0aW9uIChfQ29udHJvbGxlcikge1xyXG5cdCAgX2luaGVyaXRzKE51bWJlckNvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcclxuXHRcclxuXHQgIGZ1bmN0aW9uIE51bWJlckNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XHJcblx0ICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOdW1iZXJDb250cm9sbGVyKTtcclxuXHRcclxuXHQgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbnRyb2xsZXIuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XHJcblx0XHJcblx0ICAgIHZhciBfcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xyXG5cdFxyXG5cdCAgICBfdGhpcy5fX21pbiA9IF9wYXJhbXMubWluO1xyXG5cdCAgICBfdGhpcy5fX21heCA9IF9wYXJhbXMubWF4O1xyXG5cdCAgICBfdGhpcy5fX3N0ZXAgPSBfcGFyYW1zLnN0ZXA7XHJcblx0XHJcblx0ICAgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzVW5kZWZpbmVkKF90aGlzLl9fc3RlcCkpIHtcclxuXHQgICAgICBpZiAoX3RoaXMuaW5pdGlhbFZhbHVlID09PSAwKSB7XHJcblx0ICAgICAgICBfdGhpcy5fX2ltcGxpZWRTdGVwID0gMTsgLy8gV2hhdCBhcmUgd2UsIHBzeWNoaWNzP1xyXG5cdCAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICAvLyBIZXkgRG91ZywgY2hlY2sgdGhpcyBvdXQuXHJcblx0ICAgICAgICBfdGhpcy5fX2ltcGxpZWRTdGVwID0gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2coTWF0aC5hYnMoX3RoaXMuaW5pdGlhbFZhbHVlKSkgLyBNYXRoLkxOMTApKSAvIDEwO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICBfdGhpcy5fX2ltcGxpZWRTdGVwID0gX3RoaXMuX19zdGVwO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIF90aGlzLl9fcHJlY2lzaW9uID0gbnVtRGVjaW1hbHMoX3RoaXMuX19pbXBsaWVkU3RlcCk7XHJcblx0ICAgIHJldHVybiBfdGhpcztcclxuXHQgIH1cclxuXHRcclxuXHQgIE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gc2V0VmFsdWUodikge1xyXG5cdCAgICB2YXIgX3YgPSB2O1xyXG5cdFxyXG5cdCAgICBpZiAodGhpcy5fX21pbiAhPT0gdW5kZWZpbmVkICYmIF92IDwgdGhpcy5fX21pbikge1xyXG5cdCAgICAgIF92ID0gdGhpcy5fX21pbjtcclxuXHQgICAgfSBlbHNlIGlmICh0aGlzLl9fbWF4ICE9PSB1bmRlZmluZWQgJiYgX3YgPiB0aGlzLl9fbWF4KSB7XHJcblx0ICAgICAgX3YgPSB0aGlzLl9fbWF4O1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGlmICh0aGlzLl9fc3RlcCAhPT0gdW5kZWZpbmVkICYmIF92ICUgdGhpcy5fX3N0ZXAgIT09IDApIHtcclxuXHQgICAgICBfdiA9IE1hdGgucm91bmQoX3YgLyB0aGlzLl9fc3RlcCkgKiB0aGlzLl9fc3RlcDtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICByZXR1cm4gX0NvbnRyb2xsZXIucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgX3YpO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogU3BlY2lmeSBhIG1pbmltdW0gdmFsdWUgZm9yIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+LlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSB7TnVtYmVyfSBtaW5WYWx1ZSBUaGUgbWluaW11bSB2YWx1ZSBmb3JcclxuXHQgICAqIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XHJcblx0ICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcclxuXHQgICAqL1xyXG5cdFxyXG5cdFxyXG5cdCAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUubWluID0gZnVuY3Rpb24gbWluKHYpIHtcclxuXHQgICAgdGhpcy5fX21pbiA9IHY7XHJcblx0ICAgIHJldHVybiB0aGlzO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogU3BlY2lmeSBhIG1heGltdW0gdmFsdWUgZm9yIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+LlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhWYWx1ZSBUaGUgbWF4aW11bSB2YWx1ZSBmb3JcclxuXHQgICAqIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XHJcblx0ICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcclxuXHQgICAqL1xyXG5cdFxyXG5cdFxyXG5cdCAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUubWF4ID0gZnVuY3Rpb24gbWF4KHYpIHtcclxuXHQgICAgdGhpcy5fX21heCA9IHY7XHJcblx0ICAgIHJldHVybiB0aGlzO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogU3BlY2lmeSBhIHN0ZXAgdmFsdWUgdGhhdCBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxyXG5cdCAgICogaW5jcmVtZW50cyBieS5cclxuXHQgICAqXHJcblx0ICAgKiBAcGFyYW0ge051bWJlcn0gc3RlcFZhbHVlIFRoZSBzdGVwIHZhbHVlIGZvclxyXG5cdCAgICogZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcclxuXHQgICAqIEBkZWZhdWx0IGlmIG1pbmltdW0gYW5kIG1heGltdW0gc3BlY2lmaWVkIGluY3JlbWVudCBpcyAxJSBvZiB0aGVcclxuXHQgICAqIGRpZmZlcmVuY2Ugb3RoZXJ3aXNlIHN0ZXBWYWx1ZSBpcyAxXHJcblx0ICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcclxuXHQgICAqL1xyXG5cdFxyXG5cdFxyXG5cdCAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uIHN0ZXAodikge1xyXG5cdCAgICB0aGlzLl9fc3RlcCA9IHY7XHJcblx0ICAgIHRoaXMuX19pbXBsaWVkU3RlcCA9IHY7XHJcblx0ICAgIHRoaXMuX19wcmVjaXNpb24gPSBudW1EZWNpbWFscyh2KTtcclxuXHQgICAgcmV0dXJuIHRoaXM7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXI7XHJcblx0fShfQ29udHJvbGxlcjMuZGVmYXVsdCk7XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gTnVtYmVyQ29udHJvbGxlcjtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDEzICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX051bWJlckNvbnRyb2xsZXIyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMik7XHJcblx0XHJcblx0dmFyIF9OdW1iZXJDb250cm9sbGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX051bWJlckNvbnRyb2xsZXIyKTtcclxuXHRcclxuXHR2YXIgX2RvbSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XHJcblx0XHJcblx0dmFyIF9kb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZG9tKTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tbW9uKTtcclxuXHRcclxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9IC8qKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblx0XHJcblx0ZnVuY3Rpb24gcm91bmRUb0RlY2ltYWwodmFsdWUsIGRlY2ltYWxzKSB7XHJcblx0ICB2YXIgdGVuVG8gPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpO1xyXG5cdCAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiB0ZW5UbykgLyB0ZW5UbztcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGNsYXNzIFJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgdGhhdCBpcyBhIG51bWJlciBhbmRcclxuXHQgKiBwcm92aWRlcyBhbiBpbnB1dCBlbGVtZW50IHdpdGggd2hpY2ggdG8gbWFuaXB1bGF0ZSBpdC5cclxuXHQgKlxyXG5cdCAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXHJcblx0ICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gT3B0aW9uYWwgcGFyYW1ldGVyc1xyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1pbl0gTWluaW11bSBhbGxvd2VkIHZhbHVlXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWF4XSBNYXhpbXVtIGFsbG93ZWQgdmFsdWVcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5zdGVwXSBJbmNyZW1lbnQgYnkgd2hpY2ggdG8gY2hhbmdlIHZhbHVlXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xyXG5cdCAqL1xyXG5cdFxyXG5cdHZhciBOdW1iZXJDb250cm9sbGVyQm94ID0gZnVuY3Rpb24gKF9OdW1iZXJDb250cm9sbGVyKSB7XHJcblx0ICBfaW5oZXJpdHMoTnVtYmVyQ29udHJvbGxlckJveCwgX051bWJlckNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdCAgZnVuY3Rpb24gTnVtYmVyQ29udHJvbGxlckJveChvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcclxuXHQgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE51bWJlckNvbnRyb2xsZXJCb3gpO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMyID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX051bWJlckNvbnRyb2xsZXIuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpKTtcclxuXHRcclxuXHQgICAgX3RoaXMyLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMgPSBfdGhpczI7XHJcblx0XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiB7TnVtYmVyfSBQcmV2aW91cyBtb3VzZSB5IHBvc2l0aW9uXHJcblx0ICAgICAqIEBpZ25vcmVcclxuXHQgICAgICovXHJcblx0ICAgIHZhciBwcmV2WSA9IHZvaWQgMDtcclxuXHRcclxuXHQgICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XHJcblx0ICAgICAgdmFyIGF0dGVtcHRlZCA9IHBhcnNlRmxvYXQoX3RoaXMuX19pbnB1dC52YWx1ZSk7XHJcblx0ICAgICAgaWYgKCFfY29tbW9uMi5kZWZhdWx0LmlzTmFOKGF0dGVtcHRlZCkpIHtcclxuXHQgICAgICAgIF90aGlzLnNldFZhbHVlKGF0dGVtcHRlZCk7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGZ1bmN0aW9uIG9uRmluaXNoKCkge1xyXG5cdCAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XHJcblx0ICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XHJcblx0ICAgICAgb25GaW5pc2goKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBvbk1vdXNlRHJhZyhlKSB7XHJcblx0ICAgICAgdmFyIGRpZmYgPSBwcmV2WSAtIGUuY2xpZW50WTtcclxuXHQgICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5nZXRWYWx1ZSgpICsgZGlmZiAqIF90aGlzLl9faW1wbGllZFN0ZXApO1xyXG5cdFxyXG5cdCAgICAgIHByZXZZID0gZS5jbGllbnRZO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGZ1bmN0aW9uIG9uTW91c2VVcCgpIHtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XHJcblx0ICAgICAgb25GaW5pc2goKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XHJcblx0ICAgICAgcHJldlkgPSBlLmNsaWVudFk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgX3RoaXMyLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdCAgICBfdGhpczIuX19pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG5cdFxyXG5cdCAgICAvLyBNYWtlcyBpdCBzbyBtYW51YWxseSBzcGVjaWZpZWQgdmFsdWVzIGFyZSBub3QgdHJ1bmNhdGVkLlxyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9faW5wdXQsICdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdCAgICAgIC8vIFdoZW4gcHJlc3NpbmcgZW50ZXIsIHlvdSBjYW4gYmUgYXMgcHJlY2lzZSBhcyB5b3Ugd2FudC5cclxuXHQgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG5cdCAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gdHJ1ZTtcclxuXHQgICAgICAgIHRoaXMuYmx1cigpO1xyXG5cdCAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gZmFsc2U7XHJcblx0ICAgICAgICBvbkZpbmlzaCgpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIF90aGlzMi51cGRhdGVEaXNwbGF5KCk7XHJcblx0XHJcblx0ICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX2lucHV0KTtcclxuXHQgICAgcmV0dXJuIF90aGlzMjtcclxuXHQgIH1cclxuXHRcclxuXHQgIE51bWJlckNvbnRyb2xsZXJCb3gucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkgPSBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xyXG5cdCAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA/IHRoaXMuZ2V0VmFsdWUoKSA6IHJvdW5kVG9EZWNpbWFsKHRoaXMuZ2V0VmFsdWUoKSwgdGhpcy5fX3ByZWNpc2lvbik7XHJcblx0ICAgIHJldHVybiBfTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIHJldHVybiBOdW1iZXJDb250cm9sbGVyQm94O1xyXG5cdH0oX051bWJlckNvbnRyb2xsZXIzLmRlZmF1bHQpO1xyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IE51bWJlckNvbnRyb2xsZXJCb3g7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiAxNCAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0dmFyIF9OdW1iZXJDb250cm9sbGVyMiA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OdW1iZXJDb250cm9sbGVyMik7XHJcblx0XHJcblx0dmFyIF9kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xyXG5cdFxyXG5cdHZhciBfZG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RvbSk7XHJcblx0XHJcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfSAvKipcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG5cdFxyXG5cdGZ1bmN0aW9uIG1hcCh2LCBpMSwgaTIsIG8xLCBvMikge1xyXG5cdCAgcmV0dXJuIG8xICsgKG8yIC0gbzEpICogKCh2IC0gaTEpIC8gKGkyIC0gaTEpKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQGNsYXNzIFJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgdGhhdCBpcyBhIG51bWJlciwgY29udGFpbnNcclxuXHQgKiBhIG1pbmltdW0gYW5kIG1heGltdW0sIGFuZCBwcm92aWRlcyBhIHNsaWRlciBlbGVtZW50IHdpdGggd2hpY2ggdG9cclxuXHQgKiBtYW5pcHVsYXRlIGl0LiBJdCBzaG91bGQgYmUgbm90ZWQgdGhhdCB0aGUgc2xpZGVyIGVsZW1lbnQgaXMgbWFkZSB1cCBvZlxyXG5cdCAqIDxjb2RlPiZsdDtkaXYmZ3Q7PC9jb2RlPiB0YWdzLCA8c3Ryb25nPm5vdDwvc3Ryb25nPiB0aGUgaHRtbDVcclxuXHQgKiA8Y29kZT4mbHQ7c2xpZGVyJmd0OzwvY29kZT4gZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXHJcblx0ICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gbWluVmFsdWUgTWluaW11bSBhbGxvd2VkIHZhbHVlXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IG1heFZhbHVlIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwVmFsdWUgSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxyXG5cdCAqXHJcblx0ICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcclxuXHQgKi9cclxuXHRcclxuXHR2YXIgTnVtYmVyQ29udHJvbGxlclNsaWRlciA9IGZ1bmN0aW9uIChfTnVtYmVyQ29udHJvbGxlcikge1xyXG5cdCAgX2luaGVyaXRzKE51bWJlckNvbnRyb2xsZXJTbGlkZXIsIF9OdW1iZXJDb250cm9sbGVyKTtcclxuXHRcclxuXHQgIGZ1bmN0aW9uIE51bWJlckNvbnRyb2xsZXJTbGlkZXIob2JqZWN0LCBwcm9wZXJ0eSwgbWluLCBtYXgsIHN0ZXApIHtcclxuXHQgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE51bWJlckNvbnRyb2xsZXJTbGlkZXIpO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMyID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX051bWJlckNvbnRyb2xsZXIuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogbWluLCBtYXg6IG1heCwgc3RlcDogc3RlcCB9KSk7XHJcblx0XHJcblx0ICAgIHZhciBfdGhpcyA9IF90aGlzMjtcclxuXHRcclxuXHQgICAgX3RoaXMyLl9fYmFja2dyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdCAgICBfdGhpczIuX19mb3JlZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19iYWNrZ3JvdW5kLCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKF90aGlzMi5fX2JhY2tncm91bmQsICdzbGlkZXInKTtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhfdGhpczIuX19mb3JlZ3JvdW5kLCAnc2xpZGVyLWZnJyk7XHJcblx0XHJcblx0ICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcclxuXHQgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcclxuXHRcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQuYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcclxuXHRcclxuXHQgICAgICBvbk1vdXNlRHJhZyhlKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBvbk1vdXNlRHJhZyhlKSB7XHJcblx0ICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFxyXG5cdCAgICAgIHZhciBiZ1JlY3QgPSBfdGhpcy5fX2JhY2tncm91bmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHJcblx0ICAgICAgX3RoaXMuc2V0VmFsdWUobWFwKGUuY2xpZW50WCwgYmdSZWN0LmxlZnQsIGJnUmVjdC5yaWdodCwgX3RoaXMuX19taW4sIF90aGlzLl9fbWF4KSk7XHJcblx0XHJcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGZ1bmN0aW9uIG9uTW91c2VVcCgpIHtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XHJcblx0ICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcclxuXHQgICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIF90aGlzMi51cGRhdGVEaXNwbGF5KCk7XHJcblx0XHJcblx0ICAgIF90aGlzMi5fX2JhY2tncm91bmQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9fZm9yZWdyb3VuZCk7XHJcblx0ICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX2JhY2tncm91bmQpO1xyXG5cdCAgICByZXR1cm4gX3RoaXMyO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5wcm90b3R5cGUudXBkYXRlRGlzcGxheSA9IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XHJcblx0ICAgIHZhciBwY3QgPSAodGhpcy5nZXRWYWx1ZSgpIC0gdGhpcy5fX21pbikgLyAodGhpcy5fX21heCAtIHRoaXMuX19taW4pO1xyXG5cdCAgICB0aGlzLl9fZm9yZWdyb3VuZC5zdHlsZS53aWR0aCA9IHBjdCAqIDEwMCArICclJztcclxuXHQgICAgcmV0dXJuIF9OdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXJTbGlkZXI7XHJcblx0fShfTnVtYmVyQ29udHJvbGxlcjMuZGVmYXVsdCk7XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gTnVtYmVyQ29udHJvbGxlclNsaWRlcjtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDE1ICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXIyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29udHJvbGxlcjIpO1xyXG5cdFxyXG5cdHZhciBfZG9tID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcclxuXHRcclxuXHR2YXIgX2RvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kb20pO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH0gLyoqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuXHRcclxuXHQvKipcclxuXHQgKiBAY2xhc3MgUHJvdmlkZXMgYSBHVUkgaW50ZXJmYWNlIHRvIGZpcmUgYSBzcGVjaWZpZWQgbWV0aG9kLCBhIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xyXG5cdCAqL1xyXG5cdHZhciBGdW5jdGlvbkNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX0NvbnRyb2xsZXIpIHtcclxuXHQgIF9pbmhlcml0cyhGdW5jdGlvbkNvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcclxuXHRcclxuXHQgIGZ1bmN0aW9uIEZ1bmN0aW9uQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCB0ZXh0KSB7XHJcblx0ICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGdW5jdGlvbkNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMyID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbnRyb2xsZXIuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XHJcblx0XHJcblx0ICAgIHZhciBfdGhpcyA9IF90aGlzMjtcclxuXHRcclxuXHQgICAgX3RoaXMyLl9fYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0ICAgIF90aGlzMi5fX2J1dHRvbi5pbm5lckhUTUwgPSB0ZXh0ID09PSB1bmRlZmluZWQgPyAnRmlyZScgOiB0ZXh0O1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9fYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdCAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHQgICAgICBfdGhpcy5maXJlKCk7XHJcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhfdGhpczIuX19idXR0b24sICdidXR0b24nKTtcclxuXHRcclxuXHQgICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9fYnV0dG9uKTtcclxuXHQgICAgcmV0dXJuIF90aGlzMjtcclxuXHQgIH1cclxuXHRcclxuXHQgIEZ1bmN0aW9uQ29udHJvbGxlci5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIGZpcmUoKSB7XHJcblx0ICAgIGlmICh0aGlzLl9fb25DaGFuZ2UpIHtcclxuXHQgICAgICB0aGlzLl9fb25DaGFuZ2UuY2FsbCh0aGlzKTtcclxuXHQgICAgfVxyXG5cdCAgICB0aGlzLmdldFZhbHVlKCkuY2FsbCh0aGlzLm9iamVjdCk7XHJcblx0ICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcclxuXHQgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xyXG5cdCAgICB9XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgcmV0dXJuIEZ1bmN0aW9uQ29udHJvbGxlcjtcclxuXHR9KF9Db250cm9sbGVyMy5kZWZhdWx0KTtcclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSBGdW5jdGlvbkNvbnRyb2xsZXI7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiAxNiAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyMiA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbnRyb2xsZXIyKTtcclxuXHRcclxuXHR2YXIgX2RvbSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XHJcblx0XHJcblx0dmFyIF9kb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZG9tKTtcclxuXHRcclxuXHR2YXIgX0NvbG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcclxuXHRcclxuXHR2YXIgX0NvbG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbG9yKTtcclxuXHRcclxuXHR2YXIgX2ludGVycHJldCA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XHJcblx0XHJcblx0dmFyIF9pbnRlcnByZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW50ZXJwcmV0KTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tbW9uKTtcclxuXHRcclxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9IC8qKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblx0XHJcblx0dmFyIENvbG9yQ29udHJvbGxlciA9IGZ1bmN0aW9uIChfQ29udHJvbGxlcikge1xyXG5cdCAgX2luaGVyaXRzKENvbG9yQ29udHJvbGxlciwgX0NvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdCAgZnVuY3Rpb24gQ29sb3JDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpIHtcclxuXHQgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbG9yQ29udHJvbGxlcik7XHJcblx0XHJcblx0ICAgIHZhciBfdGhpczIgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29udHJvbGxlci5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpKTtcclxuXHRcclxuXHQgICAgX3RoaXMyLl9fY29sb3IgPSBuZXcgX0NvbG9yMi5kZWZhdWx0KF90aGlzMi5nZXRWYWx1ZSgpKTtcclxuXHQgICAgX3RoaXMyLl9fdGVtcCA9IG5ldyBfQ29sb3IyLmRlZmF1bHQoMCk7XHJcblx0XHJcblx0ICAgIHZhciBfdGhpcyA9IF90aGlzMjtcclxuXHRcclxuXHQgICAgX3RoaXMyLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5tYWtlU2VsZWN0YWJsZShfdGhpczIuZG9tRWxlbWVudCwgZmFsc2UpO1xyXG5cdFxyXG5cdCAgICBfdGhpczIuX19zZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdCAgICBfdGhpczIuX19zZWxlY3Rvci5jbGFzc05hbWUgPSAnc2VsZWN0b3InO1xyXG5cdFxyXG5cdCAgICBfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0ICAgIF90aGlzMi5fX3NhdHVyYXRpb25fZmllbGQuY2xhc3NOYW1lID0gJ3NhdHVyYXRpb24tZmllbGQnO1xyXG5cdFxyXG5cdCAgICBfdGhpczIuX19maWVsZF9rbm9iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0ICAgIF90aGlzMi5fX2ZpZWxkX2tub2IuY2xhc3NOYW1lID0gJ2ZpZWxkLWtub2InO1xyXG5cdCAgICBfdGhpczIuX19maWVsZF9rbm9iX2JvcmRlciA9ICcycHggc29saWQgJztcclxuXHRcclxuXHQgICAgX3RoaXMyLl9faHVlX2tub2IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHQgICAgX3RoaXMyLl9faHVlX2tub2IuY2xhc3NOYW1lID0gJ2h1ZS1rbm9iJztcclxuXHRcclxuXHQgICAgX3RoaXMyLl9faHVlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0ICAgIF90aGlzMi5fX2h1ZV9maWVsZC5jbGFzc05hbWUgPSAnaHVlLWZpZWxkJztcclxuXHRcclxuXHQgICAgX3RoaXMyLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdCAgICBfdGhpczIuX19pbnB1dC50eXBlID0gJ3RleHQnO1xyXG5cdCAgICBfdGhpczIuX19pbnB1dF90ZXh0U2hhZG93ID0gJzAgMXB4IDFweCAnO1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuXHQgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG5cdCAgICAgICAgLy8gb24gZW50ZXJcclxuXHQgICAgICAgIG9uQmx1ci5jYWxsKHRoaXMpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9fc2VsZWN0b3IsICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoKSAvKiBlICove1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3ModGhpcywgJ2RyYWcnKS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmdW5jdGlvbiAoKSAvKiBlICove1xyXG5cdCAgICAgICAgX2RvbTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhfdGhpcy5fX3NlbGVjdG9yLCAnZHJhZycpO1xyXG5cdCAgICAgIH0pO1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgdmFyIHZhbHVlRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5leHRlbmQoX3RoaXMyLl9fc2VsZWN0b3Iuc3R5bGUsIHtcclxuXHQgICAgICB3aWR0aDogJzEyMnB4JyxcclxuXHQgICAgICBoZWlnaHQ6ICcxMDJweCcsXHJcblx0ICAgICAgcGFkZGluZzogJzNweCcsXHJcblx0ICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzIyMicsXHJcblx0ICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjMpJ1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5leHRlbmQoX3RoaXMyLl9fZmllbGRfa25vYi5zdHlsZSwge1xyXG5cdCAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdCAgICAgIHdpZHRoOiAnMTJweCcsXHJcblx0ICAgICAgaGVpZ2h0OiAnMTJweCcsXHJcblx0ICAgICAgYm9yZGVyOiBfdGhpczIuX19maWVsZF9rbm9iX2JvcmRlciArIChfdGhpczIuX19jb2xvci52IDwgMC41ID8gJyNmZmYnIDogJyMwMDAnKSxcclxuXHQgICAgICBib3hTaGFkb3c6ICcwcHggMXB4IDNweCByZ2JhKDAsMCwwLDAuNSknLFxyXG5cdCAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxyXG5cdCAgICAgIHpJbmRleDogMVxyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5leHRlbmQoX3RoaXMyLl9faHVlX2tub2Iuc3R5bGUsIHtcclxuXHQgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHQgICAgICB3aWR0aDogJzE1cHgnLFxyXG5cdCAgICAgIGhlaWdodDogJzJweCcsXHJcblx0ICAgICAgYm9yZGVyUmlnaHQ6ICc0cHggc29saWQgI2ZmZicsXHJcblx0ICAgICAgekluZGV4OiAxXHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZChfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkLnN0eWxlLCB7XHJcblx0ICAgICAgd2lkdGg6ICcxMDBweCcsXHJcblx0ICAgICAgaGVpZ2h0OiAnMTAwcHgnLFxyXG5cdCAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjNTU1JyxcclxuXHQgICAgICBtYXJnaW5SaWdodDogJzNweCcsXHJcblx0ICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0ICAgICAgY3Vyc29yOiAncG9pbnRlcidcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZXh0ZW5kKHZhbHVlRmllbGQuc3R5bGUsIHtcclxuXHQgICAgICB3aWR0aDogJzEwMCUnLFxyXG5cdCAgICAgIGhlaWdodDogJzEwMCUnLFxyXG5cdCAgICAgIGJhY2tncm91bmQ6ICdub25lJ1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgbGluZWFyR3JhZGllbnQodmFsdWVGaWVsZCwgJ3RvcCcsICdyZ2JhKDAsMCwwLDApJywgJyMwMDAnKTtcclxuXHRcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5leHRlbmQoX3RoaXMyLl9faHVlX2ZpZWxkLnN0eWxlLCB7XHJcblx0ICAgICAgd2lkdGg6ICcxNXB4JyxcclxuXHQgICAgICBoZWlnaHQ6ICcxMDBweCcsXHJcblx0ICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICM1NTUnLFxyXG5cdCAgICAgIGN1cnNvcjogJ25zLXJlc2l6ZScsXHJcblx0ICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0ICAgICAgdG9wOiAnM3B4JyxcclxuXHQgICAgICByaWdodDogJzNweCdcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIGh1ZUdyYWRpZW50KF90aGlzMi5fX2h1ZV9maWVsZCk7XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZXh0ZW5kKF90aGlzMi5fX2lucHV0LnN0eWxlLCB7XHJcblx0ICAgICAgb3V0bGluZTogJ25vbmUnLFxyXG5cdCAgICAgIC8vICAgICAgd2lkdGg6ICcxMjBweCcsXHJcblx0ICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuXHQgICAgICAvLyAgICAgIHBhZGRpbmc6ICc0cHgnLFxyXG5cdCAgICAgIC8vICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuXHQgICAgICBjb2xvcjogJyNmZmYnLFxyXG5cdCAgICAgIGJvcmRlcjogMCxcclxuXHQgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcblx0ICAgICAgdGV4dFNoYWRvdzogX3RoaXMyLl9faW5wdXRfdGV4dFNoYWRvdyArICdyZ2JhKDAsMCwwLDAuNyknXHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9fc2F0dXJhdGlvbl9maWVsZCwgJ21vdXNlZG93bicsIGZpZWxkRG93bik7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19maWVsZF9rbm9iLCAnbW91c2Vkb3duJywgZmllbGREb3duKTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKF90aGlzMi5fX2h1ZV9maWVsZCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcblx0ICAgICAgc2V0SChlKTtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0SCk7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmaWVsZFVwSCk7XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBmaWVsZERvd24oZSkge1xyXG5cdCAgICAgIHNldFNWKGUpO1xyXG5cdCAgICAgIC8vIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ25vbmUnO1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRTVik7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmaWVsZFVwU1YpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGZ1bmN0aW9uIGZpZWxkVXBTVigpIHtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRTVik7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZpZWxkVXBTVik7XHJcblx0ICAgICAgLy8gZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XHJcblx0ICAgICAgb25GaW5pc2goKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XHJcblx0ICAgICAgdmFyIGkgPSAoMCwgX2ludGVycHJldDIuZGVmYXVsdCkodGhpcy52YWx1ZSk7XHJcblx0ICAgICAgaWYgKGkgIT09IGZhbHNlKSB7XHJcblx0ICAgICAgICBfdGhpcy5fX2NvbG9yLl9fc3RhdGUgPSBpO1xyXG5cdCAgICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xyXG5cdCAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICB0aGlzLnZhbHVlID0gX3RoaXMuX19jb2xvci50b1N0cmluZygpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBmaWVsZFVwSCgpIHtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZmllbGRVcEgpO1xyXG5cdCAgICAgIG9uRmluaXNoKCk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgZnVuY3Rpb24gb25GaW5pc2goKSB7XHJcblx0ICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcclxuXHQgICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkLmFwcGVuZENoaWxkKHZhbHVlRmllbGQpO1xyXG5cdCAgICBfdGhpczIuX19zZWxlY3Rvci5hcHBlbmRDaGlsZChfdGhpczIuX19maWVsZF9rbm9iKTtcclxuXHQgICAgX3RoaXMyLl9fc2VsZWN0b3IuYXBwZW5kQ2hpbGQoX3RoaXMyLl9fc2F0dXJhdGlvbl9maWVsZCk7XHJcblx0ICAgIF90aGlzMi5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKF90aGlzMi5fX2h1ZV9maWVsZCk7XHJcblx0ICAgIF90aGlzMi5fX2h1ZV9maWVsZC5hcHBlbmRDaGlsZChfdGhpczIuX19odWVfa25vYik7XHJcblx0XHJcblx0ICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX2lucHV0KTtcclxuXHQgICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9fc2VsZWN0b3IpO1xyXG5cdFxyXG5cdCAgICBfdGhpczIudXBkYXRlRGlzcGxheSgpO1xyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBzZXRTVihlKSB7XHJcblx0ICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFxyXG5cdCAgICAgIHZhciBmaWVsZFJlY3QgPSBfdGhpcy5fX3NhdHVyYXRpb25fZmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0ICAgICAgdmFyIHMgPSAoZS5jbGllbnRYIC0gZmllbGRSZWN0LmxlZnQpIC8gKGZpZWxkUmVjdC5yaWdodCAtIGZpZWxkUmVjdC5sZWZ0KTtcclxuXHQgICAgICB2YXIgdiA9IDEgLSAoZS5jbGllbnRZIC0gZmllbGRSZWN0LnRvcCkgLyAoZmllbGRSZWN0LmJvdHRvbSAtIGZpZWxkUmVjdC50b3ApO1xyXG5cdFxyXG5cdCAgICAgIGlmICh2ID4gMSkge1xyXG5cdCAgICAgICAgdiA9IDE7XHJcblx0ICAgICAgfSBlbHNlIGlmICh2IDwgMCkge1xyXG5cdCAgICAgICAgdiA9IDA7XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIGlmIChzID4gMSkge1xyXG5cdCAgICAgICAgcyA9IDE7XHJcblx0ICAgICAgfSBlbHNlIGlmIChzIDwgMCkge1xyXG5cdCAgICAgICAgcyA9IDA7XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIF90aGlzLl9fY29sb3IudiA9IHY7XHJcblx0ICAgICAgX3RoaXMuX19jb2xvci5zID0gcztcclxuXHRcclxuXHQgICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XHJcblx0XHJcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGZ1bmN0aW9uIHNldEgoZSkge1xyXG5cdCAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcclxuXHQgICAgICB2YXIgZmllbGRSZWN0ID0gX3RoaXMuX19odWVfZmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0ICAgICAgdmFyIGggPSAxIC0gKGUuY2xpZW50WSAtIGZpZWxkUmVjdC50b3ApIC8gKGZpZWxkUmVjdC5ib3R0b20gLSBmaWVsZFJlY3QudG9wKTtcclxuXHRcclxuXHQgICAgICBpZiAoaCA+IDEpIHtcclxuXHQgICAgICAgIGggPSAxO1xyXG5cdCAgICAgIH0gZWxzZSBpZiAoaCA8IDApIHtcclxuXHQgICAgICAgIGggPSAwO1xyXG5cdCAgICAgIH1cclxuXHRcclxuXHQgICAgICBfdGhpcy5fX2NvbG9yLmggPSBoICogMzYwO1xyXG5cdFxyXG5cdCAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcclxuXHRcclxuXHQgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgIH1cclxuXHQgICAgcmV0dXJuIF90aGlzMjtcclxuXHQgIH1cclxuXHRcclxuXHQgIENvbG9yQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRGlzcGxheSA9IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XHJcblx0ICAgIHZhciBpID0gKDAsIF9pbnRlcnByZXQyLmRlZmF1bHQpKHRoaXMuZ2V0VmFsdWUoKSk7XHJcblx0XHJcblx0ICAgIGlmIChpICE9PSBmYWxzZSkge1xyXG5cdCAgICAgIHZhciBtaXNtYXRjaCA9IGZhbHNlO1xyXG5cdFxyXG5cdCAgICAgIC8vIENoZWNrIGZvciBtaXNtYXRjaCBvbiB0aGUgaW50ZXJwcmV0ZWQgdmFsdWUuXHJcblx0XHJcblx0ICAgICAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKF9Db2xvcjIuZGVmYXVsdC5DT01QT05FTlRTLCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XHJcblx0ICAgICAgICBpZiAoIV9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQoaVtjb21wb25lbnRdKSAmJiAhX2NvbW1vbjIuZGVmYXVsdC5pc1VuZGVmaW5lZCh0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSAmJiBpW2NvbXBvbmVudF0gIT09IHRoaXMuX19jb2xvci5fX3N0YXRlW2NvbXBvbmVudF0pIHtcclxuXHQgICAgICAgICAgbWlzbWF0Y2ggPSB0cnVlO1xyXG5cdCAgICAgICAgICByZXR1cm4ge307IC8vIGJyZWFrXHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgfSwgdGhpcyk7XHJcblx0XHJcblx0ICAgICAgLy8gSWYgbm90aGluZyBkaXZlcmdlcywgd2Uga2VlcCBvdXIgcHJldmlvdXMgdmFsdWVzXHJcblx0ICAgICAgLy8gZm9yIHN0YXRlZnVsbmVzcywgb3RoZXJ3aXNlIHdlIHJlY2FsY3VsYXRlIGZyZXNoXHJcblx0ICAgICAgaWYgKG1pc21hdGNoKSB7XHJcblx0ICAgICAgICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZCh0aGlzLl9fY29sb3IuX19zdGF0ZSwgaSk7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZXh0ZW5kKHRoaXMuX190ZW1wLl9fc3RhdGUsIHRoaXMuX19jb2xvci5fX3N0YXRlKTtcclxuXHRcclxuXHQgICAgdGhpcy5fX3RlbXAuYSA9IDE7XHJcblx0XHJcblx0ICAgIHZhciBmbGlwID0gdGhpcy5fX2NvbG9yLnYgPCAwLjUgfHwgdGhpcy5fX2NvbG9yLnMgPiAwLjUgPyAyNTUgOiAwO1xyXG5cdCAgICB2YXIgX2ZsaXAgPSAyNTUgLSBmbGlwO1xyXG5cdFxyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZCh0aGlzLl9fZmllbGRfa25vYi5zdHlsZSwge1xyXG5cdCAgICAgIG1hcmdpbkxlZnQ6IDEwMCAqIHRoaXMuX19jb2xvci5zIC0gNyArICdweCcsXHJcblx0ICAgICAgbWFyZ2luVG9wOiAxMDAgKiAoMSAtIHRoaXMuX19jb2xvci52KSAtIDcgKyAncHgnLFxyXG5cdCAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5fX3RlbXAudG9IZXhTdHJpbmcoKSxcclxuXHQgICAgICBib3JkZXI6IHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciArICdyZ2IoJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJywnICsgZmxpcCArICcpJ1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgdGhpcy5fX2h1ZV9rbm9iLnN0eWxlLm1hcmdpblRvcCA9ICgxIC0gdGhpcy5fX2NvbG9yLmggLyAzNjApICogMTAwICsgJ3B4JztcclxuXHRcclxuXHQgICAgdGhpcy5fX3RlbXAucyA9IDE7XHJcblx0ICAgIHRoaXMuX190ZW1wLnYgPSAxO1xyXG5cdFxyXG5cdCAgICBsaW5lYXJHcmFkaWVudCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCwgJ2xlZnQnLCAnI2ZmZicsIHRoaXMuX190ZW1wLnRvSGV4U3RyaW5nKCkpO1xyXG5cdFxyXG5cdCAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLl9fY29sb3IudG9TdHJpbmcoKTtcclxuXHRcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5leHRlbmQodGhpcy5fX2lucHV0LnN0eWxlLCB7XHJcblx0ICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLl9fY29sb3IudG9IZXhTdHJpbmcoKSxcclxuXHQgICAgICBjb2xvcjogJ3JnYignICsgZmxpcCArICcsJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJyknLFxyXG5cdCAgICAgIHRleHRTaGFkb3c6IHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ICsgJ3JnYmEoJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKyAnLCcgKyBfZmxpcCArICcsLjcpJ1xyXG5cdCAgICB9KTtcclxuXHQgIH07XHJcblx0XHJcblx0ICByZXR1cm4gQ29sb3JDb250cm9sbGVyO1xyXG5cdH0oX0NvbnRyb2xsZXIzLmRlZmF1bHQpO1xyXG5cdFxyXG5cdHZhciB2ZW5kb3JzID0gWyctbW96LScsICctby0nLCAnLXdlYmtpdC0nLCAnLW1zLScsICcnXTtcclxuXHRcclxuXHRmdW5jdGlvbiBsaW5lYXJHcmFkaWVudChlbGVtLCB4LCBhLCBiKSB7XHJcblx0ICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcclxuXHQgIF9jb21tb24yLmRlZmF1bHQuZWFjaCh2ZW5kb3JzLCBmdW5jdGlvbiAodmVuZG9yKSB7XHJcblx0ICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogJyArIHZlbmRvciArICdsaW5lYXItZ3JhZGllbnQoJyArIHggKyAnLCAnICsgYSArICcgMCUsICcgKyBiICsgJyAxMDAlKTsgJztcclxuXHQgIH0pO1xyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBodWVHcmFkaWVudChlbGVtKSB7XHJcblx0ICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcclxuXHQgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwgI2ZmMDBmZiAxNyUsICMwMDAwZmYgMzQlLCAjMDBmZmZmIDUwJSwgIzAwZmYwMCA2NyUsICNmZmZmMDAgODQlLCAjZmYwMDAwIDEwMCUpOyc7XHJcblx0ICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnO1xyXG5cdCAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOyc7XHJcblx0ICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1tcy1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOyc7XHJcblx0ICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7JztcclxuXHR9XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gQ29sb3JDb250cm9sbGVyO1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xyXG5cclxuLyoqKi8gfSxcclxuLyogMTcgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cdFxyXG5cdHZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgLyoqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuXHRcclxuXHR2YXIgX2NzcyA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xyXG5cdFxyXG5cdHZhciBfY3NzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Nzcyk7XHJcblx0XHJcblx0dmFyIF9zYXZlRGlhbG9ndWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcclxuXHRcclxuXHR2YXIgX3NhdmVEaWFsb2d1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zYXZlRGlhbG9ndWUpO1xyXG5cdFxyXG5cdHZhciBfQ29udHJvbGxlckZhY3RvcnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXJGYWN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbnRyb2xsZXJGYWN0b3J5KTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xyXG5cdFxyXG5cdHZhciBfQ29udHJvbGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db250cm9sbGVyKTtcclxuXHRcclxuXHR2YXIgX0Jvb2xlYW5Db250cm9sbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcclxuXHRcclxuXHR2YXIgX0Jvb2xlYW5Db250cm9sbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Jvb2xlYW5Db250cm9sbGVyKTtcclxuXHRcclxuXHR2YXIgX0Z1bmN0aW9uQ29udHJvbGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xyXG5cdFxyXG5cdHZhciBfRnVuY3Rpb25Db250cm9sbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Z1bmN0aW9uQ29udHJvbGxlcik7XHJcblx0XHJcblx0dmFyIF9OdW1iZXJDb250cm9sbGVyQm94ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XHJcblx0XHJcblx0dmFyIF9OdW1iZXJDb250cm9sbGVyQm94MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX051bWJlckNvbnRyb2xsZXJCb3gpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlclNsaWRlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlclNsaWRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OdW1iZXJDb250cm9sbGVyU2xpZGVyKTtcclxuXHRcclxuXHR2YXIgX0NvbG9yQ29udHJvbGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xyXG5cdFxyXG5cdHZhciBfQ29sb3JDb250cm9sbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbG9yQ29udHJvbGxlcik7XHJcblx0XHJcblx0dmFyIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKTtcclxuXHRcclxuXHR2YXIgX3JlcXVlc3RBbmltYXRpb25GcmFtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpO1xyXG5cdFxyXG5cdHZhciBfQ2VudGVyZWREaXYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKTtcclxuXHRcclxuXHR2YXIgX0NlbnRlcmVkRGl2MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NlbnRlcmVkRGl2KTtcclxuXHRcclxuXHR2YXIgX2RvbSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XHJcblx0XHJcblx0dmFyIF9kb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZG9tKTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tbW9uKTtcclxuXHRcclxuXHR2YXIgX3N0eWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMyk7XHJcblx0XHJcblx0dmFyIF9zdHlsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZSk7XHJcblx0XHJcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cclxuXHRcclxuXHQvLyBDU1MgdG8gZW1iZWQgaW4gYnVpbGRcclxuXHRcclxuXHRfY3NzMi5kZWZhdWx0LmluamVjdChfc3R5bGUyLmRlZmF1bHQpO1xyXG5cdFxyXG5cdC8qKiBPdXRlci1tb3N0IGNsYXNzTmFtZSBmb3IgR1VJJ3MgKi9cclxuXHR2YXIgQ1NTX05BTUVTUEFDRSA9ICdkZyc7XHJcblx0XHJcblx0dmFyIEhJREVfS0VZX0NPREUgPSA3MjtcclxuXHRcclxuXHQvKiogVGhlIG9ubHkgdmFsdWUgc2hhcmVkIGJldHdlZW4gdGhlIEpTIGFuZCBTQ1NTLiBVc2UgY2F1dGlvbi4gKi9cclxuXHR2YXIgQ0xPU0VfQlVUVE9OX0hFSUdIVCA9IDIwO1xyXG5cdFxyXG5cdHZhciBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUgPSAnRGVmYXVsdCc7XHJcblx0XHJcblx0dmFyIFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UgPSBmdW5jdGlvbiAoKSB7XHJcblx0ICB0cnkge1xyXG5cdCAgICByZXR1cm4gJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93ICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UgIT09IG51bGw7XHJcblx0ICB9IGNhdGNoIChlKSB7XHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHQgIH1cclxuXHR9KCk7XHJcblx0XHJcblx0dmFyIFNBVkVfRElBTE9HVUUgPSB2b2lkIDA7XHJcblx0XHJcblx0LyoqIEhhdmUgd2UgeWV0IHRvIGNyZWF0ZSBhbiBhdXRvUGxhY2UgR1VJPyAqL1xyXG5cdHZhciBhdXRvUGxhY2VWaXJnaW4gPSB0cnVlO1xyXG5cdFxyXG5cdC8qKiBGaXhlZCBwb3NpdGlvbiBkaXYgdGhhdCBhdXRvIHBsYWNlIEdVSSdzIGdvIGluc2lkZSAqL1xyXG5cdHZhciBhdXRvUGxhY2VDb250YWluZXIgPSB2b2lkIDA7XHJcblx0XHJcblx0LyoqIEFyZSB3ZSBoaWRpbmcgdGhlIEdVSSdzID8gKi9cclxuXHR2YXIgaGlkZSA9IGZhbHNlO1xyXG5cdFxyXG5cdC8qKiBHVUkncyB3aGljaCBzaG91bGQgYmUgaGlkZGVuICovXHJcblx0dmFyIGhpZGVhYmxlR3VpcyA9IFtdO1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEEgbGlnaHR3ZWlnaHQgY29udHJvbGxlciBsaWJyYXJ5IGZvciBKYXZhU2NyaXB0LiBJdCBhbGxvd3MgeW91IHRvIGVhc2lseVxyXG5cdCAqIG1hbmlwdWxhdGUgdmFyaWFibGVzIGFuZCBmaXJlIGZ1bmN0aW9ucyBvbiB0aGUgZmx5LlxyXG5cdCAqIEBjbGFzc1xyXG5cdCAqXHJcblx0ICogQG1lbWJlciBkYXQuZ3VpXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW3BhcmFtcy5uYW1lXSBUaGUgbmFtZSBvZiB0aGlzIEdVSS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcy5sb2FkXSBKU09OIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHNhdmVkIHN0YXRlIG9mXHJcblx0ICogdGhpcyBHVUkuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbcGFyYW1zLmF1dG89dHJ1ZV1cclxuXHQgKiBAcGFyYW0ge2RhdC5ndWkuR1VJfSBbcGFyYW1zLnBhcmVudF0gVGhlIEdVSSBJJ20gbmVzdGVkIGluLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhcmFtcy5jbG9zZWRdIElmIHRydWUsIHN0YXJ0cyBjbG9zZWRcclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtwYXJhbXMuY2xvc2VPblRvcF0gSWYgdHJ1ZSwgY2xvc2Uvb3BlbiBidXR0b24gc2hvd3Mgb24gdG9wIG9mIHRoZSBHVUlcclxuXHQgKi9cclxuXHR2YXIgR1VJID0gZnVuY3Rpb24gR1VJKHBhcnMpIHtcclxuXHQgIHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHJcblx0ICB2YXIgcGFyYW1zID0gcGFycyB8fCB7fTtcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogT3V0ZXJtb3N0IERPTSBFbGVtZW50XHJcblx0ICAgKiBAdHlwZSBET01FbGVtZW50XHJcblx0ICAgKi9cclxuXHQgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdCAgdGhpcy5fX3VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHQgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fdWwpO1xyXG5cdFxyXG5cdCAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIENTU19OQU1FU1BBQ0UpO1xyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKiBOZXN0ZWQgR1VJJ3MgYnkgbmFtZVxyXG5cdCAgICogQGlnbm9yZVxyXG5cdCAgICovXHJcblx0ICB0aGlzLl9fZm9sZGVycyA9IHt9O1xyXG5cdFxyXG5cdCAgdGhpcy5fX2NvbnRyb2xsZXJzID0gW107XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIExpc3Qgb2Ygb2JqZWN0cyBJJ20gcmVtZW1iZXJpbmcgZm9yIHNhdmUsIG9ubHkgdXNlZCBpbiB0b3AgbGV2ZWwgR1VJXHJcblx0ICAgKiBAaWdub3JlXHJcblx0ICAgKi9cclxuXHQgIHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0cyA9IFtdO1xyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKiBNYXBzIHRoZSBpbmRleCBvZiByZW1lbWJlcmVkIG9iamVjdHMgdG8gYSBtYXAgb2YgY29udHJvbGxlcnMsIG9ubHkgdXNlZFxyXG5cdCAgICogaW4gdG9wIGxldmVsIEdVSS5cclxuXHQgICAqXHJcblx0ICAgKiBAcHJpdmF0ZVxyXG5cdCAgICogQGlnbm9yZVxyXG5cdCAgICpcclxuXHQgICAqIEBleGFtcGxlXHJcblx0ICAgKiBbXHJcblx0ICAgKiAge1xyXG5cdCAgICAgKiAgICBwcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXIsXHJcblx0ICAgICAqICAgIGFub3RoZXJQcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXJcclxuXHQgICAgICogIH0sXHJcblx0ICAgKiAge1xyXG5cdCAgICAgKiAgICBwcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXJcclxuXHQgICAgICogIH1cclxuXHQgICAqIF1cclxuXHQgICAqL1xyXG5cdCAgdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVycyA9IFtdO1xyXG5cdFxyXG5cdCAgdGhpcy5fX2xpc3RlbmluZyA9IFtdO1xyXG5cdFxyXG5cdCAgLy8gRGVmYXVsdCBwYXJhbWV0ZXJzXHJcblx0ICBwYXJhbXMgPSBfY29tbW9uMi5kZWZhdWx0LmRlZmF1bHRzKHBhcmFtcywge1xyXG5cdCAgICBjbG9zZU9uVG9wOiBmYWxzZSxcclxuXHQgICAgYXV0b1BsYWNlOiB0cnVlLFxyXG5cdCAgICB3aWR0aDogR1VJLkRFRkFVTFRfV0lEVEhcclxuXHQgIH0pO1xyXG5cdFxyXG5cdCAgcGFyYW1zID0gX2NvbW1vbjIuZGVmYXVsdC5kZWZhdWx0cyhwYXJhbXMsIHtcclxuXHQgICAgcmVzaXphYmxlOiBwYXJhbXMuYXV0b1BsYWNlLFxyXG5cdCAgICBoaWRlYWJsZTogcGFyYW1zLmF1dG9QbGFjZVxyXG5cdCAgfSk7XHJcblx0XHJcblx0ICBpZiAoIV9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQocGFyYW1zLmxvYWQpKSB7XHJcblx0ICAgIC8vIEV4cGxpY2l0IHByZXNldFxyXG5cdCAgICBpZiAocGFyYW1zLnByZXNldCkge1xyXG5cdCAgICAgIHBhcmFtcy5sb2FkLnByZXNldCA9IHBhcmFtcy5wcmVzZXQ7XHJcblx0ICAgIH1cclxuXHQgIH0gZWxzZSB7XHJcblx0ICAgIHBhcmFtcy5sb2FkID0geyBwcmVzZXQ6IERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSB9O1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLmhpZGVhYmxlKSB7XHJcblx0ICAgIGhpZGVhYmxlR3Vpcy5wdXNoKHRoaXMpO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgLy8gT25seSByb290IGxldmVsIEdVSSdzIGFyZSByZXNpemFibGUuXHJcblx0ICBwYXJhbXMucmVzaXphYmxlID0gX2NvbW1vbjIuZGVmYXVsdC5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSAmJiBwYXJhbXMucmVzaXphYmxlO1xyXG5cdFxyXG5cdCAgaWYgKHBhcmFtcy5hdXRvUGxhY2UgJiYgX2NvbW1vbjIuZGVmYXVsdC5pc1VuZGVmaW5lZChwYXJhbXMuc2Nyb2xsYWJsZSkpIHtcclxuXHQgICAgcGFyYW1zLnNjcm9sbGFibGUgPSB0cnVlO1xyXG5cdCAgfVxyXG5cdCAgLy8gICAgcGFyYW1zLnNjcm9sbGFibGUgPSBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLnNjcm9sbGFibGUgPT09IHRydWU7XHJcblx0XHJcblx0ICAvLyBOb3QgcGFydCBvZiBwYXJhbXMgYmVjYXVzZSBJIGRvbid0IHdhbnQgcGVvcGxlIHBhc3NpbmcgdGhpcyBpbiB2aWFcclxuXHQgIC8vIGNvbnN0cnVjdG9yLiBTaG91bGQgYmUgYSAncmVtZW1iZXJlZCcgdmFsdWUuXHJcblx0ICB2YXIgdXNlTG9jYWxTdG9yYWdlID0gU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKHRoaXMsICdpc0xvY2FsJykpID09PSAndHJ1ZSc7XHJcblx0XHJcblx0ICB2YXIgc2F2ZVRvTG9jYWxTdG9yYWdlID0gdm9pZCAwO1xyXG5cdFxyXG5cdCAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcyxcclxuXHQgIC8qKiBAbGVuZHMgZGF0Lmd1aS5HVUkucHJvdG90eXBlICovXHJcblx0ICB7XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgcGFyZW50IDxjb2RlPkdVSTwvY29kZT5cclxuXHQgICAgICogQHR5cGUgZGF0Lmd1aS5HVUlcclxuXHQgICAgICovXHJcblx0ICAgIHBhcmVudDoge1xyXG5cdCAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG5cdCAgICAgICAgcmV0dXJuIHBhcmFtcy5wYXJlbnQ7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICBzY3JvbGxhYmxlOiB7XHJcblx0ICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XHJcblx0ICAgICAgICByZXR1cm4gcGFyYW1zLnNjcm9sbGFibGU7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICAvKipcclxuXHQgICAgICogSGFuZGxlcyA8Y29kZT5HVUk8L2NvZGU+J3MgZWxlbWVudCBwbGFjZW1lbnQgZm9yIHlvdVxyXG5cdCAgICAgKiBAdHlwZSBCb29sZWFuXHJcblx0ICAgICAqL1xyXG5cdCAgICBhdXRvUGxhY2U6IHtcclxuXHQgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuXHQgICAgICAgIHJldHVybiBwYXJhbXMuYXV0b1BsYWNlO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgLyoqXHJcblx0ICAgICAqIEhhbmRsZXMgPGNvZGU+R1VJPC9jb2RlPidzIHBvc2l0aW9uIG9mIG9wZW4vY2xvc2UgYnV0dG9uXHJcblx0ICAgICAqIEB0eXBlIEJvb2xlYW5cclxuXHQgICAgICovXHJcblx0ICAgIGNsb3NlT25Ub3A6IHtcclxuXHQgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuXHQgICAgICAgIHJldHVybiBwYXJhbXMuY2xvc2VPblRvcDtcclxuXHQgICAgICB9XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgaWRlbnRpZmllciBmb3IgYSBzZXQgb2Ygc2F2ZWQgdmFsdWVzXHJcblx0ICAgICAqIEB0eXBlIFN0cmluZ1xyXG5cdCAgICAgKi9cclxuXHQgICAgcHJlc2V0OiB7XHJcblx0ICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XHJcblx0ICAgICAgICBpZiAoX3RoaXMucGFyZW50KSB7XHJcblx0ICAgICAgICAgIHJldHVybiBfdGhpcy5nZXRSb290KCkucHJlc2V0O1xyXG5cdCAgICAgICAgfVxyXG5cdFxyXG5cdCAgICAgICAgcmV0dXJuIHBhcmFtcy5sb2FkLnByZXNldDtcclxuXHQgICAgICB9LFxyXG5cdFxyXG5cdCAgICAgIHNldDogZnVuY3Rpb24gc2V0KHYpIHtcclxuXHQgICAgICAgIGlmIChfdGhpcy5wYXJlbnQpIHtcclxuXHQgICAgICAgICAgX3RoaXMuZ2V0Um9vdCgpLnByZXNldCA9IHY7XHJcblx0ICAgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgICBwYXJhbXMubG9hZC5wcmVzZXQgPSB2O1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgICAgc2V0UHJlc2V0U2VsZWN0SW5kZXgodGhpcyk7XHJcblx0ICAgICAgICBfdGhpcy5yZXZlcnQoKTtcclxuXHQgICAgICB9XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgd2lkdGggb2YgPGNvZGU+R1VJPC9jb2RlPiBlbGVtZW50XHJcblx0ICAgICAqIEB0eXBlIE51bWJlclxyXG5cdCAgICAgKi9cclxuXHQgICAgd2lkdGg6IHtcclxuXHQgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuXHQgICAgICAgIHJldHVybiBwYXJhbXMud2lkdGg7XHJcblx0ICAgICAgfSxcclxuXHQgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2KSB7XHJcblx0ICAgICAgICBwYXJhbXMud2lkdGggPSB2O1xyXG5cdCAgICAgICAgc2V0V2lkdGgoX3RoaXMsIHYpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRoZSBuYW1lIG9mIDxjb2RlPkdVSTwvY29kZT4uIFVzZWQgZm9yIGZvbGRlcnMuIGkuZVxyXG5cdCAgICAgKiBhIGZvbGRlcidzIG5hbWVcclxuXHQgICAgICogQHR5cGUgU3RyaW5nXHJcblx0ICAgICAqL1xyXG5cdCAgICBuYW1lOiB7XHJcblx0ICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XHJcblx0ICAgICAgICByZXR1cm4gcGFyYW1zLm5hbWU7XHJcblx0ICAgICAgfSxcclxuXHQgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2KSB7XHJcblx0ICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBjb2xsaXNpb25zIGFtb25nIHNpYmxpbmcgZm9sZGVyc1xyXG5cdCAgICAgICAgcGFyYW1zLm5hbWUgPSB2O1xyXG5cdCAgICAgICAgaWYgKHRpdGxlUm93TmFtZSkge1xyXG5cdCAgICAgICAgICB0aXRsZVJvd05hbWUuaW5uZXJIVE1MID0gcGFyYW1zLm5hbWU7XHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgfVxyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICAvKipcclxuXHQgICAgICogV2hldGhlciB0aGUgPGNvZGU+R1VJPC9jb2RlPiBpcyBjb2xsYXBzZWQgb3Igbm90XHJcblx0ICAgICAqIEB0eXBlIEJvb2xlYW5cclxuXHQgICAgICovXHJcblx0ICAgIGNsb3NlZDoge1xyXG5cdCAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG5cdCAgICAgICAgcmV0dXJuIHBhcmFtcy5jbG9zZWQ7XHJcblx0ICAgICAgfSxcclxuXHQgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2KSB7XHJcblx0ICAgICAgICBwYXJhbXMuY2xvc2VkID0gdjtcclxuXHQgICAgICAgIGlmIChwYXJhbXMuY2xvc2VkKSB7XHJcblx0ICAgICAgICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoX3RoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XHJcblx0ICAgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgICBfZG9tMi5kZWZhdWx0LnJlbW92ZUNsYXNzKF90aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgICAgLy8gRm9yIGJyb3dzZXJzIHRoYXQgYXJlbid0IGdvaW5nIHRvIHJlc3BlY3QgdGhlIENTUyB0cmFuc2l0aW9uLFxyXG5cdCAgICAgICAgLy8gTGV0cyBqdXN0IGNoZWNrIG91ciBoZWlnaHQgYWdhaW5zdCB0aGUgd2luZG93IGhlaWdodCByaWdodCBvZmZcclxuXHQgICAgICAgIC8vIHRoZSBiYXQuXHJcblx0ICAgICAgICB0aGlzLm9uUmVzaXplKCk7XHJcblx0XHJcblx0ICAgICAgICBpZiAoX3RoaXMuX19jbG9zZUJ1dHRvbikge1xyXG5cdCAgICAgICAgICBfdGhpcy5fX2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9IHYgPyBHVUkuVEVYVF9PUEVOIDogR1VJLlRFWFRfQ0xPU0VEO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgIH1cclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgLyoqXHJcblx0ICAgICAqIENvbnRhaW5zIGFsbCBwcmVzZXRzXHJcblx0ICAgICAqIEB0eXBlIE9iamVjdFxyXG5cdCAgICAgKi9cclxuXHQgICAgbG9hZDoge1xyXG5cdCAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG5cdCAgICAgICAgcmV0dXJuIHBhcmFtcy5sb2FkO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgLyoqXHJcblx0ICAgICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdG8gdXNlIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vU3RvcmFnZSNsb2NhbFN0b3JhZ2VcIj5sb2NhbFN0b3JhZ2U8L2E+IGFzIHRoZSBtZWFucyBmb3JcclxuXHQgICAgICogPGNvZGU+cmVtZW1iZXI8L2NvZGU+aW5nXHJcblx0ICAgICAqIEB0eXBlIEJvb2xlYW5cclxuXHQgICAgICovXHJcblx0ICAgIHVzZUxvY2FsU3RvcmFnZToge1xyXG5cdFxyXG5cdCAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG5cdCAgICAgICAgcmV0dXJuIHVzZUxvY2FsU3RvcmFnZTtcclxuXHQgICAgICB9LFxyXG5cdCAgICAgIHNldDogZnVuY3Rpb24gc2V0KGJvb2wpIHtcclxuXHQgICAgICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XHJcblx0ICAgICAgICAgIHVzZUxvY2FsU3RvcmFnZSA9IGJvb2w7XHJcblx0ICAgICAgICAgIGlmIChib29sKSB7XHJcblx0ICAgICAgICAgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIHNhdmVUb0xvY2FsU3RvcmFnZSk7XHJcblx0ICAgICAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICAgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQod2luZG93LCAndW5sb2FkJywgc2F2ZVRvTG9jYWxTdG9yYWdlKTtcclxuXHQgICAgICAgICAgfVxyXG5cdCAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKF90aGlzLCAnaXNMb2NhbCcpLCBib29sKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICB9XHJcblx0ICAgIH1cclxuXHQgIH0pO1xyXG5cdFxyXG5cdCAgLy8gQXJlIHdlIGEgcm9vdCBsZXZlbCBHVUk/XHJcblx0ICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xyXG5cdCAgICBwYXJhbXMuY2xvc2VkID0gZmFsc2U7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBHVUkuQ0xBU1NfTUFJTik7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQubWFrZVNlbGVjdGFibGUodGhpcy5kb21FbGVtZW50LCBmYWxzZSk7XHJcblx0XHJcblx0ICAgIC8vIEFyZSB3ZSBzdXBwb3NlZCB0byBiZSBsb2FkaW5nIGxvY2FsbHk/XHJcblx0ICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XHJcblx0ICAgICAgaWYgKHVzZUxvY2FsU3RvcmFnZSkge1xyXG5cdCAgICAgICAgX3RoaXMudXNlTG9jYWxTdG9yYWdlID0gdHJ1ZTtcclxuXHRcclxuXHQgICAgICAgIHZhciBzYXZlZEd1aSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2godGhpcywgJ2d1aScpKTtcclxuXHRcclxuXHQgICAgICAgIGlmIChzYXZlZEd1aSkge1xyXG5cdCAgICAgICAgICBwYXJhbXMubG9hZCA9IEpTT04ucGFyc2Uoc2F2ZWRHdWkpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICB0aGlzLl9fY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHQgICAgdGhpcy5fX2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9IEdVSS5URVhUX0NMT1NFRDtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyh0aGlzLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19DTE9TRV9CVVRUT04pO1xyXG5cdCAgICBpZiAocGFyYW1zLmNsb3NlT25Ub3ApIHtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKHRoaXMuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0NMT1NFX1RPUCk7XHJcblx0ICAgICAgdGhpcy5kb21FbGVtZW50Lmluc2VydEJlZm9yZSh0aGlzLl9fY2xvc2VCdXR0b24sIHRoaXMuZG9tRWxlbWVudC5jaGlsZE5vZGVzWzBdKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKHRoaXMuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0NMT1NFX0JPVFRPTSk7XHJcblx0ICAgICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19jbG9zZUJ1dHRvbik7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHRoaXMuX19jbG9zZUJ1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgIF90aGlzLmNsb3NlZCA9ICFfdGhpcy5jbG9zZWQ7XHJcblx0ICAgIH0pO1xyXG5cdCAgICAvLyBPaCwgeW91J3JlIGEgbmVzdGVkIEdVSSFcclxuXHQgIH0gZWxzZSB7XHJcblx0ICAgIGlmIChwYXJhbXMuY2xvc2VkID09PSB1bmRlZmluZWQpIHtcclxuXHQgICAgICBwYXJhbXMuY2xvc2VkID0gdHJ1ZTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICB2YXIgX3RpdGxlUm93TmFtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhcmFtcy5uYW1lKTtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhfdGl0bGVSb3dOYW1lLCAnY29udHJvbGxlci1uYW1lJyk7XHJcblx0XHJcblx0ICAgIHZhciB0aXRsZVJvdyA9IGFkZFJvdyhfdGhpcywgX3RpdGxlUm93TmFtZSk7XHJcblx0XHJcblx0ICAgIHZhciBvbkNsaWNrVGl0bGUgPSBmdW5jdGlvbiBvbkNsaWNrVGl0bGUoZSkge1xyXG5cdCAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHQgICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xyXG5cdCAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgfTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyh0aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKHRpdGxlUm93LCAndGl0bGUnKTtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHRpdGxlUm93LCAnY2xpY2snLCBvbkNsaWNrVGl0bGUpO1xyXG5cdFxyXG5cdCAgICBpZiAoIXBhcmFtcy5jbG9zZWQpIHtcclxuXHQgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xyXG5cdCAgICB9XHJcblx0ICB9XHJcblx0XHJcblx0ICBpZiAocGFyYW1zLmF1dG9QbGFjZSkge1xyXG5cdCAgICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xyXG5cdCAgICAgIGlmIChhdXRvUGxhY2VWaXJnaW4pIHtcclxuXHQgICAgICAgIGF1dG9QbGFjZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdCAgICAgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhhdXRvUGxhY2VDb250YWluZXIsIENTU19OQU1FU1BBQ0UpO1xyXG5cdCAgICAgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhhdXRvUGxhY2VDb250YWluZXIsIEdVSS5DTEFTU19BVVRPX1BMQUNFX0NPTlRBSU5FUik7XHJcblx0ICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF1dG9QbGFjZUNvbnRhaW5lcik7XHJcblx0ICAgICAgICBhdXRvUGxhY2VWaXJnaW4gPSBmYWxzZTtcclxuXHQgICAgICB9XHJcblx0XHJcblx0ICAgICAgLy8gUHV0IGl0IGluIHRoZSBkb20gZm9yIHlvdS5cclxuXHQgICAgICBhdXRvUGxhY2VDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcclxuXHRcclxuXHQgICAgICAvLyBBcHBseSB0aGUgYXV0byBzdHlsZXNcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKHRoaXMuZG9tRWxlbWVudCwgR1VJLkNMQVNTX0FVVE9fUExBQ0UpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIC8vIE1ha2UgaXQgbm90IGVsYXN0aWMuXHJcblx0ICAgIGlmICghdGhpcy5wYXJlbnQpIHtcclxuXHQgICAgICBzZXRXaWR0aChfdGhpcywgcGFyYW1zLndpZHRoKTtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdFxyXG5cdCAgdGhpcy5fX3Jlc2l6ZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0ICAgIF90aGlzLm9uUmVzaXplRGVib3VuY2VkKCk7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgX2RvbTIuZGVmYXVsdC5iaW5kKHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMuX19yZXNpemVIYW5kbGVyKTtcclxuXHQgIF9kb20yLmRlZmF1bHQuYmluZCh0aGlzLl9fdWwsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgdGhpcy5fX3Jlc2l6ZUhhbmRsZXIpO1xyXG5cdCAgX2RvbTIuZGVmYXVsdC5iaW5kKHRoaXMuX191bCwgJ3RyYW5zaXRpb25lbmQnLCB0aGlzLl9fcmVzaXplSGFuZGxlcik7XHJcblx0ICBfZG9tMi5kZWZhdWx0LmJpbmQodGhpcy5fX3VsLCAnb1RyYW5zaXRpb25FbmQnLCB0aGlzLl9fcmVzaXplSGFuZGxlcik7XHJcblx0ICB0aGlzLm9uUmVzaXplKCk7XHJcblx0XHJcblx0ICBpZiAocGFyYW1zLnJlc2l6YWJsZSkge1xyXG5cdCAgICBhZGRSZXNpemVIYW5kbGUodGhpcyk7XHJcblx0ICB9XHJcblx0XHJcblx0ICBzYXZlVG9Mb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbiBzYXZlVG9Mb2NhbFN0b3JhZ2UoKSB7XHJcblx0ICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goX3RoaXMsICdpc0xvY2FsJykpID09PSAndHJ1ZScpIHtcclxuXHQgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKF90aGlzLCAnZ3VpJyksIEpTT04uc3RyaW5naWZ5KF90aGlzLmdldFNhdmVPYmplY3QoKSkpO1xyXG5cdCAgICB9XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgLy8gZXhwb3NlIHRoaXMgbWV0aG9kIHB1YmxpY2x5XHJcblx0ICB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUgPSBzYXZlVG9Mb2NhbFN0b3JhZ2U7XHJcblx0XHJcblx0ICBmdW5jdGlvbiByZXNldFdpZHRoKCkge1xyXG5cdCAgICB2YXIgcm9vdCA9IF90aGlzLmdldFJvb3QoKTtcclxuXHQgICAgcm9vdC53aWR0aCArPSAxO1xyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmRlZmVyKGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICByb290LndpZHRoIC09IDE7XHJcblx0ICAgIH0pO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgaWYgKCFwYXJhbXMucGFyZW50KSB7XHJcblx0ICAgIHJlc2V0V2lkdGgoKTtcclxuXHQgIH1cclxuXHR9O1xyXG5cdFxyXG5cdEdVSS50b2dnbGVIaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgaGlkZSA9ICFoaWRlO1xyXG5cdCAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKGhpZGVhYmxlR3VpcywgZnVuY3Rpb24gKGd1aSkge1xyXG5cdCAgICBndWkuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gaGlkZSA/ICdub25lJyA6ICcnO1xyXG5cdCAgfSk7XHJcblx0fTtcclxuXHRcclxuXHRHVUkuQ0xBU1NfQVVUT19QTEFDRSA9ICdhJztcclxuXHRHVUkuQ0xBU1NfQVVUT19QTEFDRV9DT05UQUlORVIgPSAnYWMnO1xyXG5cdEdVSS5DTEFTU19NQUlOID0gJ21haW4nO1xyXG5cdEdVSS5DTEFTU19DT05UUk9MTEVSX1JPVyA9ICdjcic7XHJcblx0R1VJLkNMQVNTX1RPT19UQUxMID0gJ3RhbGxlci10aGFuLXdpbmRvdyc7XHJcblx0R1VJLkNMQVNTX0NMT1NFRCA9ICdjbG9zZWQnO1xyXG5cdEdVSS5DTEFTU19DTE9TRV9CVVRUT04gPSAnY2xvc2UtYnV0dG9uJztcclxuXHRHVUkuQ0xBU1NfQ0xPU0VfVE9QID0gJ2Nsb3NlLXRvcCc7XHJcblx0R1VJLkNMQVNTX0NMT1NFX0JPVFRPTSA9ICdjbG9zZS1ib3R0b20nO1xyXG5cdEdVSS5DTEFTU19EUkFHID0gJ2RyYWcnO1xyXG5cdFxyXG5cdEdVSS5ERUZBVUxUX1dJRFRIID0gMjQ1O1xyXG5cdEdVSS5URVhUX0NMT1NFRCA9ICdDbG9zZSBDb250cm9scyc7XHJcblx0R1VJLlRFWFRfT1BFTiA9ICdPcGVuIENvbnRyb2xzJztcclxuXHRcclxuXHRHVUkuX2tleWRvd25IYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcclxuXHQgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50LnR5cGUgIT09ICd0ZXh0JyAmJiAoZS53aGljaCA9PT0gSElERV9LRVlfQ09ERSB8fCBlLmtleUNvZGUgPT09IEhJREVfS0VZX0NPREUpKSB7XHJcblx0ICAgIEdVSS50b2dnbGVIaWRlKCk7XHJcblx0ICB9XHJcblx0fTtcclxuXHRfZG9tMi5kZWZhdWx0LmJpbmQod2luZG93LCAna2V5ZG93bicsIEdVSS5fa2V5ZG93bkhhbmRsZXIsIGZhbHNlKTtcclxuXHRcclxuXHRfY29tbW9uMi5kZWZhdWx0LmV4dGVuZChHVUkucHJvdG90eXBlLFxyXG5cdFxyXG5cdC8qKiBAbGVuZHMgZGF0Lmd1aS5HVUkgKi9cclxuXHR7XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIEBwYXJhbSBvYmplY3RcclxuXHQgICAqIEBwYXJhbSBwcm9wZXJ0eVxyXG5cdCAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSBUaGUgbmV3IGNvbnRyb2xsZXIgdGhhdCB3YXMgYWRkZWQuXHJcblx0ICAgKiBAaW5zdGFuY2VcclxuXHQgICAqL1xyXG5cdCAgYWRkOiBmdW5jdGlvbiBhZGQob2JqZWN0LCBwcm9wZXJ0eSkge1xyXG5cdCAgICByZXR1cm4gX2FkZCh0aGlzLCBvYmplY3QsIHByb3BlcnR5LCB7XHJcblx0ICAgICAgZmFjdG9yeUFyZ3M6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMilcclxuXHQgICAgfSk7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKiBAcGFyYW0gb2JqZWN0XHJcblx0ICAgKiBAcGFyYW0gcHJvcGVydHlcclxuXHQgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29sb3JDb250cm9sbGVyfSBUaGUgbmV3IGNvbnRyb2xsZXIgdGhhdCB3YXMgYWRkZWQuXHJcblx0ICAgKiBAaW5zdGFuY2VcclxuXHQgICAqL1xyXG5cdCAgYWRkQ29sb3I6IGZ1bmN0aW9uIGFkZENvbG9yKG9iamVjdCwgcHJvcGVydHkpIHtcclxuXHQgICAgcmV0dXJuIF9hZGQodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwge1xyXG5cdCAgICAgIGNvbG9yOiB0cnVlXHJcblx0ICAgIH0pO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogQHBhcmFtIGNvbnRyb2xsZXJcclxuXHQgICAqIEBpbnN0YW5jZVxyXG5cdCAgICovXHJcblx0ICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShjb250cm9sbGVyKSB7XHJcblx0ICAgIC8vIFRPRE8gbGlzdGVuaW5nP1xyXG5cdCAgICB0aGlzLl9fdWwucmVtb3ZlQ2hpbGQoY29udHJvbGxlci5fX2xpKTtcclxuXHQgICAgdGhpcy5fX2NvbnRyb2xsZXJzLnNwbGljZSh0aGlzLl9fY29udHJvbGxlcnMuaW5kZXhPZihjb250cm9sbGVyKSwgMSk7XHJcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZGVmZXIoZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgIF90aGlzLm9uUmVzaXplKCk7XHJcblx0ICAgIH0pO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XHJcblx0ICAgIGlmICh0aGlzLmF1dG9QbGFjZSkge1xyXG5cdCAgICAgIGF1dG9QbGFjZUNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQudW5iaW5kKHdpbmRvdywgJ2tleWRvd24nLCBHVUkuX2tleWRvd25IYW5kbGVyLCBmYWxzZSk7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQudW5iaW5kKHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMuX19yZXNpemVIYW5kbGVyKTtcclxuXHRcclxuXHQgICAgaWYgKHRoaXMuc2F2ZVRvTG9jYWxTdG9yYWdlSWZQb3NzaWJsZSkge1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQudW5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIHRoaXMuc2F2ZVRvTG9jYWxTdG9yYWdlSWZQb3NzaWJsZSk7XHJcblx0ICAgIH1cclxuXHQgIH0sXHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIEBwYXJhbSBuYW1lXHJcblx0ICAgKiBAcmV0dXJucyB7ZGF0Lmd1aS5HVUl9IFRoZSBuZXcgZm9sZGVyLlxyXG5cdCAgICogQHRocm93cyB7RXJyb3J9IGlmIHRoaXMgR1VJIGFscmVhZHkgaGFzIGEgZm9sZGVyIGJ5IHRoZSBzcGVjaWZpZWRcclxuXHQgICAqIG5hbWVcclxuXHQgICAqIEBpbnN0YW5jZVxyXG5cdCAgICovXHJcblx0ICBhZGRGb2xkZXI6IGZ1bmN0aW9uIGFkZEZvbGRlcihuYW1lKSB7XHJcblx0ICAgIC8vIFdlIGhhdmUgdG8gcHJldmVudCBjb2xsaXNpb25zIG9uIG5hbWVzIGluIG9yZGVyIHRvIGhhdmUgYSBrZXlcclxuXHQgICAgLy8gYnkgd2hpY2ggdG8gcmVtZW1iZXIgc2F2ZWQgdmFsdWVzXHJcblx0ICAgIGlmICh0aGlzLl9fZm9sZGVyc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgYWxyZWFkeSBoYXZlIGEgZm9sZGVyIGluIHRoaXMgR1VJIGJ5IHRoZScgKyAnIG5hbWUgXCInICsgbmFtZSArICdcIicpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIHZhciBuZXdHdWlQYXJhbXMgPSB7IG5hbWU6IG5hbWUsIHBhcmVudDogdGhpcyB9O1xyXG5cdFxyXG5cdCAgICAvLyBXZSBuZWVkIHRvIHBhc3MgZG93biB0aGUgYXV0b1BsYWNlIHRyYWl0IHNvIHRoYXQgd2UgY2FuXHJcblx0ICAgIC8vIGF0dGFjaCBldmVudCBsaXN0ZW5lcnMgdG8gb3Blbi9jbG9zZSBmb2xkZXIgYWN0aW9ucyB0b1xyXG5cdCAgICAvLyBlbnN1cmUgdGhhdCBhIHNjcm9sbGJhciBhcHBlYXJzIGlmIHRoZSB3aW5kb3cgaXMgdG9vIHNob3J0LlxyXG5cdCAgICBuZXdHdWlQYXJhbXMuYXV0b1BsYWNlID0gdGhpcy5hdXRvUGxhY2U7XHJcblx0XHJcblx0ICAgIC8vIERvIHdlIGhhdmUgc2F2ZWQgYXBwZWFyYW5jZSBkYXRhIGZvciB0aGlzIGZvbGRlcj9cclxuXHQgICAgaWYgKHRoaXMubG9hZCAmJiAvLyBBbnl0aGluZyBsb2FkZWQ/XHJcblx0ICAgIHRoaXMubG9hZC5mb2xkZXJzICYmIC8vIFdhcyBteSBwYXJlbnQgYSBkZWFkLWVuZD9cclxuXHQgICAgdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV0pIHtcclxuXHQgICAgICAvLyBEaWQgZGFkZHkgcmVtZW1iZXIgbWU/XHJcblx0ICAgICAgLy8gU3RhcnQgbWUgY2xvc2VkIGlmIEkgd2FzIGNsb3NlZFxyXG5cdCAgICAgIG5ld0d1aVBhcmFtcy5jbG9zZWQgPSB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXS5jbG9zZWQ7XHJcblx0XHJcblx0ICAgICAgLy8gUGFzcyBkb3duIHRoZSBsb2FkZWQgZGF0YVxyXG5cdCAgICAgIG5ld0d1aVBhcmFtcy5sb2FkID0gdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV07XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgdmFyIGd1aSA9IG5ldyBHVUkobmV3R3VpUGFyYW1zKTtcclxuXHQgICAgdGhpcy5fX2ZvbGRlcnNbbmFtZV0gPSBndWk7XHJcblx0XHJcblx0ICAgIHZhciBsaSA9IGFkZFJvdyh0aGlzLCBndWkuZG9tRWxlbWVudCk7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MobGksICdmb2xkZXInKTtcclxuXHQgICAgcmV0dXJuIGd1aTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xyXG5cdCAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcclxuXHQgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIG9uUmVzaXplOiBmdW5jdGlvbiBvblJlc2l6ZSgpIHtcclxuXHQgICAgLy8gd2UgZGVib3VuY2UgdGhpcyBmdW5jdGlvbiB0byBwcmV2ZW50IHBlcmZvcm1hbmNlIGlzc3VlcyB3aGVuIHJvdGF0aW5nIG9uIHRhYmxldC9tb2JpbGVcclxuXHQgICAgdmFyIHJvb3QgPSB0aGlzLmdldFJvb3QoKTtcclxuXHQgICAgaWYgKHJvb3Quc2Nyb2xsYWJsZSkge1xyXG5cdCAgICAgIHZhciB0b3AgPSBfZG9tMi5kZWZhdWx0LmdldE9mZnNldChyb290Ll9fdWwpLnRvcDtcclxuXHQgICAgICB2YXIgaCA9IDA7XHJcblx0XHJcblx0ICAgICAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKHJvb3QuX191bC5jaGlsZE5vZGVzLCBmdW5jdGlvbiAobm9kZSkge1xyXG5cdCAgICAgICAgaWYgKCEocm9vdC5hdXRvUGxhY2UgJiYgbm9kZSA9PT0gcm9vdC5fX3NhdmVfcm93KSkge1xyXG5cdCAgICAgICAgICBoICs9IF9kb20yLmRlZmF1bHQuZ2V0SGVpZ2h0KG5vZGUpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgIH0pO1xyXG5cdFxyXG5cdCAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0b3AgLSBDTE9TRV9CVVRUT05fSEVJR0hUIDwgaCkge1xyXG5cdCAgICAgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhyb290LmRvbUVsZW1lbnQsIEdVSS5DTEFTU19UT09fVEFMTCk7XHJcblx0ICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCArICdweCc7XHJcblx0ICAgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIF9kb20yLmRlZmF1bHQucmVtb3ZlQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xyXG5cdCAgICAgICAgcm9vdC5fX3VsLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcclxuXHQgICAgICB9XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgaWYgKHJvb3QuX19yZXNpemVfaGFuZGxlKSB7XHJcblx0ICAgICAgX2NvbW1vbjIuZGVmYXVsdC5kZWZlcihmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgICByb290Ll9fcmVzaXplX2hhbmRsZS5zdHlsZS5oZWlnaHQgPSByb290Ll9fdWwub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuXHQgICAgICB9KTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBpZiAocm9vdC5fX2Nsb3NlQnV0dG9uKSB7XHJcblx0ICAgICAgcm9vdC5fX2Nsb3NlQnV0dG9uLnN0eWxlLndpZHRoID0gcm9vdC53aWR0aCArICdweCc7XHJcblx0ICAgIH1cclxuXHQgIH0sXHJcblx0XHJcblx0ICBvblJlc2l6ZURlYm91bmNlZDogX2NvbW1vbjIuZGVmYXVsdC5kZWJvdW5jZShmdW5jdGlvbiAoKSB7XHJcblx0ICAgIHRoaXMub25SZXNpemUoKTtcclxuXHQgIH0sIDUwKSxcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogTWFyayBvYmplY3RzIGZvciBzYXZpbmcuIFRoZSBvcmRlciBvZiB0aGVzZSBvYmplY3RzIGNhbm5vdCBjaGFuZ2UgYXNcclxuXHQgICAqIHRoZSBHVUkgZ3Jvd3MuIFdoZW4gcmVtZW1iZXJpbmcgbmV3IG9iamVjdHMsIGFwcGVuZCB0aGVtIHRvIHRoZSBlbmRcclxuXHQgICAqIG9mIHRoZSBsaXN0LlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSB7T2JqZWN0Li4ufSBvYmplY3RzXHJcblx0ICAgKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm90IGNhbGxlZCBvbiBhIHRvcCBsZXZlbCBHVUkuXHJcblx0ICAgKiBAaW5zdGFuY2VcclxuXHQgICAqL1xyXG5cdCAgcmVtZW1iZXI6IGZ1bmN0aW9uIHJlbWVtYmVyKCkge1xyXG5cdCAgICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc1VuZGVmaW5lZChTQVZFX0RJQUxPR1VFKSkge1xyXG5cdCAgICAgIFNBVkVfRElBTE9HVUUgPSBuZXcgX0NlbnRlcmVkRGl2Mi5kZWZhdWx0KCk7XHJcblx0ICAgICAgU0FWRV9ESUFMT0dVRS5kb21FbGVtZW50LmlubmVySFRNTCA9IF9zYXZlRGlhbG9ndWUyLmRlZmF1bHQ7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgaWYgKHRoaXMucGFyZW50KSB7XHJcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2FuIG9ubHkgY2FsbCByZW1lbWJlciBvbiBhIHRvcCBsZXZlbCBHVUkuJyk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHRcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksIGZ1bmN0aW9uIChvYmplY3QpIHtcclxuXHQgICAgICBpZiAoX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5sZW5ndGggPT09IDApIHtcclxuXHQgICAgICAgIGFkZFNhdmVNZW51KF90aGlzKTtcclxuXHQgICAgICB9XHJcblx0ICAgICAgaWYgKF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpID09PSAtMSkge1xyXG5cdCAgICAgICAgX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5wdXNoKG9iamVjdCk7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgaWYgKHRoaXMuYXV0b1BsYWNlKSB7XHJcblx0ICAgICAgLy8gU2V0IHNhdmUgcm93IHdpZHRoXHJcblx0ICAgICAgc2V0V2lkdGgodGhpcywgdGhpcy53aWR0aCk7XHJcblx0ICAgIH1cclxuXHQgIH0sXHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIEByZXR1cm5zIHtkYXQuZ3VpLkdVSX0gdGhlIHRvcG1vc3QgcGFyZW50IEdVSSBvZiBhIG5lc3RlZCBHVUkuXHJcblx0ICAgKiBAaW5zdGFuY2VcclxuXHQgICAqL1xyXG5cdCAgZ2V0Um9vdDogZnVuY3Rpb24gZ2V0Um9vdCgpIHtcclxuXHQgICAgdmFyIGd1aSA9IHRoaXM7XHJcblx0ICAgIHdoaWxlIChndWkucGFyZW50KSB7XHJcblx0ICAgICAgZ3VpID0gZ3VpLnBhcmVudDtcclxuXHQgICAgfVxyXG5cdCAgICByZXR1cm4gZ3VpO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogQHJldHVybnMge09iamVjdH0gYSBKU09OIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgc3RhdGUgb2ZcclxuXHQgICAqIHRoaXMgR1VJIGFzIHdlbGwgYXMgaXRzIHJlbWVtYmVyZWQgcHJvcGVydGllcy5cclxuXHQgICAqIEBpbnN0YW5jZVxyXG5cdCAgICovXHJcblx0ICBnZXRTYXZlT2JqZWN0OiBmdW5jdGlvbiBnZXRTYXZlT2JqZWN0KCkge1xyXG5cdCAgICB2YXIgdG9SZXR1cm4gPSB0aGlzLmxvYWQ7XHJcblx0ICAgIHRvUmV0dXJuLmNsb3NlZCA9IHRoaXMuY2xvc2VkO1xyXG5cdFxyXG5cdCAgICAvLyBBbSBJIHJlbWVtYmVyaW5nIGFueSB2YWx1ZXM/XHJcblx0ICAgIGlmICh0aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgIHRvUmV0dXJuLnByZXNldCA9IHRoaXMucHJlc2V0O1xyXG5cdFxyXG5cdCAgICAgIGlmICghdG9SZXR1cm4ucmVtZW1iZXJlZCkge1xyXG5cdCAgICAgICAgdG9SZXR1cm4ucmVtZW1iZXJlZCA9IHt9O1xyXG5cdCAgICAgIH1cclxuXHRcclxuXHQgICAgICB0b1JldHVybi5yZW1lbWJlcmVkW3RoaXMucHJlc2V0XSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgdG9SZXR1cm4uZm9sZGVycyA9IHt9O1xyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uIChlbGVtZW50LCBrZXkpIHtcclxuXHQgICAgICB0b1JldHVybi5mb2xkZXJzW2tleV0gPSBlbGVtZW50LmdldFNhdmVPYmplY3QoKTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIHJldHVybiB0b1JldHVybjtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBzYXZlOiBmdW5jdGlvbiBzYXZlKCkge1xyXG5cdCAgICBpZiAoIXRoaXMubG9hZC5yZW1lbWJlcmVkKSB7XHJcblx0ICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWQgPSB7fTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFt0aGlzLnByZXNldF0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMpO1xyXG5cdCAgICBtYXJrUHJlc2V0TW9kaWZpZWQodGhpcywgZmFsc2UpO1xyXG5cdCAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUoKTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBzYXZlQXM6IGZ1bmN0aW9uIHNhdmVBcyhwcmVzZXROYW1lKSB7XHJcblx0ICAgIGlmICghdGhpcy5sb2FkLnJlbWVtYmVyZWQpIHtcclxuXHQgICAgICAvLyBSZXRhaW4gZGVmYXVsdCB2YWx1ZXMgdXBvbiBmaXJzdCBzYXZlXHJcblx0ICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWQgPSB7fTtcclxuXHQgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzLCB0cnVlKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtwcmVzZXROYW1lXSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XHJcblx0ICAgIHRoaXMucHJlc2V0ID0gcHJlc2V0TmFtZTtcclxuXHQgICAgYWRkUHJlc2V0T3B0aW9uKHRoaXMsIHByZXNldE5hbWUsIHRydWUpO1xyXG5cdCAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUoKTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICByZXZlcnQ6IGZ1bmN0aW9uIHJldmVydChndWkpIHtcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKHRoaXMuX19jb250cm9sbGVycywgZnVuY3Rpb24gKGNvbnRyb2xsZXIpIHtcclxuXHQgICAgICAvLyBNYWtlIHJldmVydCB3b3JrIG9uIERlZmF1bHQuXHJcblx0ICAgICAgaWYgKCF0aGlzLmdldFJvb3QoKS5sb2FkLnJlbWVtYmVyZWQpIHtcclxuXHQgICAgICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUoY29udHJvbGxlci5pbml0aWFsVmFsdWUpO1xyXG5cdCAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICByZWNhbGxTYXZlZFZhbHVlKGd1aSB8fCB0aGlzLmdldFJvb3QoKSwgY29udHJvbGxlcik7XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIC8vIGZpcmUgb25GaW5pc2hDaGFuZ2UgY2FsbGJhY2tcclxuXHQgICAgICBpZiAoY29udHJvbGxlci5fX29uRmluaXNoQ2hhbmdlKSB7XHJcblx0ICAgICAgICBjb250cm9sbGVyLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChjb250cm9sbGVyLCBjb250cm9sbGVyLmdldFZhbHVlKCkpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSwgdGhpcyk7XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZWFjaCh0aGlzLl9fZm9sZGVycywgZnVuY3Rpb24gKGZvbGRlcikge1xyXG5cdCAgICAgIGZvbGRlci5yZXZlcnQoZm9sZGVyKTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIGlmICghZ3VpKSB7XHJcblx0ICAgICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMuZ2V0Um9vdCgpLCBmYWxzZSk7XHJcblx0ICAgIH1cclxuXHQgIH0sXHJcblx0XHJcblx0ICBsaXN0ZW46IGZ1bmN0aW9uIGxpc3Rlbihjb250cm9sbGVyKSB7XHJcblx0ICAgIHZhciBpbml0ID0gdGhpcy5fX2xpc3RlbmluZy5sZW5ndGggPT09IDA7XHJcblx0ICAgIHRoaXMuX19saXN0ZW5pbmcucHVzaChjb250cm9sbGVyKTtcclxuXHQgICAgaWYgKGluaXQpIHtcclxuXHQgICAgICB1cGRhdGVEaXNwbGF5cyh0aGlzLl9fbGlzdGVuaW5nKTtcclxuXHQgICAgfVxyXG5cdCAgfSxcclxuXHRcclxuXHQgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZWFjaCh0aGlzLl9fY29udHJvbGxlcnMsIGZ1bmN0aW9uIChjb250cm9sbGVyKSB7XHJcblx0ICAgICAgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KCk7XHJcblx0ICAgIH0pO1xyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uIChmb2xkZXIpIHtcclxuXHQgICAgICBmb2xkZXIudXBkYXRlRGlzcGxheSgpO1xyXG5cdCAgICB9KTtcclxuXHQgIH1cclxuXHR9KTtcclxuXHRcclxuXHQvKipcclxuXHQgKiBBZGQgYSByb3cgdG8gdGhlIGVuZCBvZiB0aGUgR1VJIG9yIGJlZm9yZSBhbm90aGVyIHJvdy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBndWlcclxuXHQgKiBAcGFyYW0gW25ld0RvbV0gSWYgc3BlY2lmaWVkLCBpbnNlcnRzIHRoZSBkb20gY29udGVudCBpbiB0aGUgbmV3IHJvd1xyXG5cdCAqIEBwYXJhbSBbbGlCZWZvcmVdIElmIHNwZWNpZmllZCwgcGxhY2VzIHRoZSBuZXcgcm93IGJlZm9yZSBhbm90aGVyIHJvd1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGFkZFJvdyhndWksIG5ld0RvbSwgbGlCZWZvcmUpIHtcclxuXHQgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0ICBpZiAobmV3RG9tKSB7XHJcblx0ICAgIGxpLmFwcGVuZENoaWxkKG5ld0RvbSk7XHJcblx0ICB9XHJcblx0XHJcblx0ICBpZiAobGlCZWZvcmUpIHtcclxuXHQgICAgZ3VpLl9fdWwuaW5zZXJ0QmVmb3JlKGxpLCBsaUJlZm9yZSk7XHJcblx0ICB9IGVsc2Uge1xyXG5cdCAgICBndWkuX191bC5hcHBlbmRDaGlsZChsaSk7XHJcblx0ICB9XHJcblx0ICBndWkub25SZXNpemUoKTtcclxuXHQgIHJldHVybiBsaTtcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gbWFya1ByZXNldE1vZGlmaWVkKGd1aSwgbW9kaWZpZWQpIHtcclxuXHQgIHZhciBvcHQgPSBndWkuX19wcmVzZXRfc2VsZWN0W2d1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleF07XHJcblx0XHJcblx0ICAvLyBjb25zb2xlLmxvZygnbWFyaycsIG1vZGlmaWVkLCBvcHQpO1xyXG5cdCAgaWYgKG1vZGlmaWVkKSB7XHJcblx0ICAgIG9wdC5pbm5lckhUTUwgPSBvcHQudmFsdWUgKyAnKic7XHJcblx0ICB9IGVsc2Uge1xyXG5cdCAgICBvcHQuaW5uZXJIVE1MID0gb3B0LnZhbHVlO1xyXG5cdCAgfVxyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBhdWdtZW50Q29udHJvbGxlcihndWksIGxpLCBjb250cm9sbGVyKSB7XHJcblx0ICBjb250cm9sbGVyLl9fbGkgPSBsaTtcclxuXHQgIGNvbnRyb2xsZXIuX19ndWkgPSBndWk7XHJcblx0XHJcblx0ICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZChjb250cm9sbGVyLCB7XHJcblx0ICAgIG9wdGlvbnM6IGZ1bmN0aW9uIG9wdGlvbnMoX29wdGlvbnMpIHtcclxuXHQgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcclxuXHQgICAgICAgIHZhciBuZXh0U2libGluZyA9IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcblx0ICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xyXG5cdFxyXG5cdCAgICAgICAgcmV0dXJuIF9hZGQoZ3VpLCBjb250cm9sbGVyLm9iamVjdCwgY29udHJvbGxlci5wcm9wZXJ0eSwge1xyXG5cdCAgICAgICAgICBiZWZvcmU6IG5leHRTaWJsaW5nLFxyXG5cdCAgICAgICAgICBmYWN0b3J5QXJnczogW19jb21tb24yLmRlZmF1bHQudG9BcnJheShhcmd1bWVudHMpXVxyXG5cdCAgICAgICAgfSk7XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzQXJyYXkoX29wdGlvbnMpIHx8IF9jb21tb24yLmRlZmF1bHQuaXNPYmplY3QoX29wdGlvbnMpKSB7XHJcblx0ICAgICAgICB2YXIgX25leHRTaWJsaW5nID0gY29udHJvbGxlci5fX2xpLm5leHRFbGVtZW50U2libGluZztcclxuXHQgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XHJcblx0XHJcblx0ICAgICAgICByZXR1cm4gX2FkZChndWksIGNvbnRyb2xsZXIub2JqZWN0LCBjb250cm9sbGVyLnByb3BlcnR5LCB7XHJcblx0ICAgICAgICAgIGJlZm9yZTogX25leHRTaWJsaW5nLFxyXG5cdCAgICAgICAgICBmYWN0b3J5QXJnczogW19vcHRpb25zXVxyXG5cdCAgICAgICAgfSk7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICBuYW1lOiBmdW5jdGlvbiBuYW1lKHYpIHtcclxuXHQgICAgICBjb250cm9sbGVyLl9fbGkuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gdjtcclxuXHQgICAgICByZXR1cm4gY29udHJvbGxlcjtcclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgbGlzdGVuOiBmdW5jdGlvbiBsaXN0ZW4oKSB7XHJcblx0ICAgICAgY29udHJvbGxlci5fX2d1aS5saXN0ZW4oY29udHJvbGxlcik7XHJcblx0ICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xyXG5cdCAgICAgIGNvbnRyb2xsZXIuX19ndWkucmVtb3ZlKGNvbnRyb2xsZXIpO1xyXG5cdCAgICAgIHJldHVybiBjb250cm9sbGVyO1xyXG5cdCAgICB9XHJcblx0ICB9KTtcclxuXHRcclxuXHQgIC8vIEFsbCBzbGlkZXJzIHNob3VsZCBiZSBhY2NvbXBhbmllZCBieSBhIGJveC5cclxuXHQgIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgX051bWJlckNvbnRyb2xsZXJTbGlkZXIyLmRlZmF1bHQpIHtcclxuXHQgICAgdmFyIGJveCA9IG5ldyBfTnVtYmVyQ29udHJvbGxlckJveDIuZGVmYXVsdChjb250cm9sbGVyLm9iamVjdCwgY29udHJvbGxlci5wcm9wZXJ0eSwgeyBtaW46IGNvbnRyb2xsZXIuX19taW4sIG1heDogY29udHJvbGxlci5fX21heCwgc3RlcDogY29udHJvbGxlci5fX3N0ZXAgfSk7XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZWFjaChbJ3VwZGF0ZURpc3BsYXknLCAnb25DaGFuZ2UnLCAnb25GaW5pc2hDaGFuZ2UnLCAnc3RlcCddLCBmdW5jdGlvbiAobWV0aG9kKSB7XHJcblx0ICAgICAgdmFyIHBjID0gY29udHJvbGxlclttZXRob2RdO1xyXG5cdCAgICAgIHZhciBwYiA9IGJveFttZXRob2RdO1xyXG5cdCAgICAgIGNvbnRyb2xsZXJbbWV0aG9kXSA9IGJveFttZXRob2RdID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG5cdCAgICAgICAgcGIuYXBwbHkoYm94LCBhcmdzKTtcclxuXHQgICAgICAgIHJldHVybiBwYy5hcHBseShjb250cm9sbGVyLCBhcmdzKTtcclxuXHQgICAgICB9O1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhsaSwgJ2hhcy1zbGlkZXInKTtcclxuXHQgICAgY29udHJvbGxlci5kb21FbGVtZW50Lmluc2VydEJlZm9yZShib3guZG9tRWxlbWVudCwgY29udHJvbGxlci5kb21FbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcclxuXHQgIH0gZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIF9OdW1iZXJDb250cm9sbGVyQm94Mi5kZWZhdWx0KSB7XHJcblx0ICAgIHZhciByID0gZnVuY3Rpb24gcihyZXR1cm5lZCkge1xyXG5cdCAgICAgIC8vIEhhdmUgd2UgZGVmaW5lZCBib3RoIGJvdW5kYXJpZXM/XHJcblx0ICAgICAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIoY29udHJvbGxlci5fX21pbikgJiYgX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihjb250cm9sbGVyLl9fbWF4KSkge1xyXG5cdCAgICAgICAgLy8gV2VsbCwgdGhlbiBsZXRzIGp1c3QgcmVwbGFjZSB0aGlzIHdpdGggYSBzbGlkZXIuXHJcblx0XHJcblx0ICAgICAgICAvLyBsZXRzIHJlbWVtYmVyIGlmIHRoZSBvbGQgY29udHJvbGxlciBoYWQgYSBzcGVjaWZpYyBuYW1lIG9yIHdhcyBsaXN0ZW5pbmdcclxuXHQgICAgICAgIHZhciBvbGROYW1lID0gY29udHJvbGxlci5fX2xpLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmlubmVySFRNTDtcclxuXHQgICAgICAgIHZhciB3YXNMaXN0ZW5pbmcgPSBjb250cm9sbGVyLl9fZ3VpLl9fbGlzdGVuaW5nLmluZGV4T2YoY29udHJvbGxlcikgPiAtMTtcclxuXHRcclxuXHQgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XHJcblx0ICAgICAgICB2YXIgbmV3Q29udHJvbGxlciA9IF9hZGQoZ3VpLCBjb250cm9sbGVyLm9iamVjdCwgY29udHJvbGxlci5wcm9wZXJ0eSwge1xyXG5cdCAgICAgICAgICBiZWZvcmU6IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmcsXHJcblx0ICAgICAgICAgIGZhY3RvcnlBcmdzOiBbY29udHJvbGxlci5fX21pbiwgY29udHJvbGxlci5fX21heCwgY29udHJvbGxlci5fX3N0ZXBdXHJcblx0ICAgICAgICB9KTtcclxuXHRcclxuXHQgICAgICAgIG5ld0NvbnRyb2xsZXIubmFtZShvbGROYW1lKTtcclxuXHQgICAgICAgIGlmICh3YXNMaXN0ZW5pbmcpIG5ld0NvbnRyb2xsZXIubGlzdGVuKCk7XHJcblx0XHJcblx0ICAgICAgICByZXR1cm4gbmV3Q29udHJvbGxlcjtcclxuXHQgICAgICB9XHJcblx0XHJcblx0ICAgICAgcmV0dXJuIHJldHVybmVkO1xyXG5cdCAgICB9O1xyXG5cdFxyXG5cdCAgICBjb250cm9sbGVyLm1pbiA9IF9jb21tb24yLmRlZmF1bHQuY29tcG9zZShyLCBjb250cm9sbGVyLm1pbik7XHJcblx0ICAgIGNvbnRyb2xsZXIubWF4ID0gX2NvbW1vbjIuZGVmYXVsdC5jb21wb3NlKHIsIGNvbnRyb2xsZXIubWF4KTtcclxuXHQgIH0gZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIF9Cb29sZWFuQ29udHJvbGxlcjIuZGVmYXVsdCkge1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQobGksICdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmZha2VFdmVudChjb250cm9sbGVyLl9fY2hlY2tib3gsICdjbGljaycpO1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKGNvbnRyb2xsZXIuX19jaGVja2JveCwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHQgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50cyBkb3VibGUtdG9nZ2xlXHJcblx0ICAgIH0pO1xyXG5cdCAgfSBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgX0Z1bmN0aW9uQ29udHJvbGxlcjIuZGVmYXVsdCkge1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQobGksICdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmZha2VFdmVudChjb250cm9sbGVyLl9fYnV0dG9uLCAnY2xpY2snKTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChsaSwgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGNvbnRyb2xsZXIuX19idXR0b24sICdob3ZlcicpO1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKGxpLCAnbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcclxuXHQgICAgfSk7XHJcblx0ICB9IGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBfQ29sb3JDb250cm9sbGVyMi5kZWZhdWx0KSB7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MobGksICdjb2xvcicpO1xyXG5cdCAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkgPSBfY29tbW9uMi5kZWZhdWx0LmNvbXBvc2UoZnVuY3Rpb24gKHZhbCkge1xyXG5cdCAgICAgIGxpLnN0eWxlLmJvcmRlckxlZnRDb2xvciA9IGNvbnRyb2xsZXIuX19jb2xvci50b1N0cmluZygpO1xyXG5cdCAgICAgIHJldHVybiB2YWw7XHJcblx0ICAgIH0sIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSk7XHJcblx0XHJcblx0ICAgIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSgpO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgY29udHJvbGxlci5zZXRWYWx1ZSA9IF9jb21tb24yLmRlZmF1bHQuY29tcG9zZShmdW5jdGlvbiAodmFsKSB7XHJcblx0ICAgIGlmIChndWkuZ2V0Um9vdCgpLl9fcHJlc2V0X3NlbGVjdCAmJiBjb250cm9sbGVyLmlzTW9kaWZpZWQoKSkge1xyXG5cdCAgICAgIG1hcmtQcmVzZXRNb2RpZmllZChndWkuZ2V0Um9vdCgpLCB0cnVlKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICByZXR1cm4gdmFsO1xyXG5cdCAgfSwgY29udHJvbGxlci5zZXRWYWx1ZSk7XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIHJlY2FsbFNhdmVkVmFsdWUoZ3VpLCBjb250cm9sbGVyKSB7XHJcblx0ICAvLyBGaW5kIHRoZSB0b3Btb3N0IEdVSSwgdGhhdCdzIHdoZXJlIHJlbWVtYmVyZWQgb2JqZWN0cyBsaXZlLlxyXG5cdCAgdmFyIHJvb3QgPSBndWkuZ2V0Um9vdCgpO1xyXG5cdFxyXG5cdCAgLy8gRG9lcyB0aGUgb2JqZWN0IHdlJ3JlIGNvbnRyb2xsaW5nIG1hdGNoIGFueXRoaW5nIHdlJ3ZlIGJlZW4gdG9sZCB0b1xyXG5cdCAgLy8gcmVtZW1iZXI/XHJcblx0ICB2YXIgbWF0Y2hlZEluZGV4ID0gcm9vdC5fX3JlbWVtYmVyZWRPYmplY3RzLmluZGV4T2YoY29udHJvbGxlci5vYmplY3QpO1xyXG5cdFxyXG5cdCAgLy8gV2h5IHllcywgaXQgZG9lcyFcclxuXHQgIGlmIChtYXRjaGVkSW5kZXggIT09IC0xKSB7XHJcblx0ICAgIC8vIExldCBtZSBmZXRjaCBhIG1hcCBvZiBjb250cm9sbGVycyBmb3IgdGhjb21tb24uaXNPYmplY3QuXHJcblx0ICAgIHZhciBjb250cm9sbGVyTWFwID0gcm9vdC5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVyc1ttYXRjaGVkSW5kZXhdO1xyXG5cdFxyXG5cdCAgICAvLyBPaHAsIEkgYmVsaWV2ZSB0aGlzIGlzIHRoZSBmaXJzdCBjb250cm9sbGVyIHdlJ3ZlIGNyZWF0ZWQgZm9yIHRoaXNcclxuXHQgICAgLy8gb2JqZWN0LiBMZXRzIG1ha2UgdGhlIG1hcCBmcmVzaC5cclxuXHQgICAgaWYgKGNvbnRyb2xsZXJNYXAgPT09IHVuZGVmaW5lZCkge1xyXG5cdCAgICAgIGNvbnRyb2xsZXJNYXAgPSB7fTtcclxuXHQgICAgICByb290Ll9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW21hdGNoZWRJbmRleF0gPSBjb250cm9sbGVyTWFwO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIC8vIEtlZXAgdHJhY2sgb2YgdGhpcyBjb250cm9sbGVyXHJcblx0ICAgIGNvbnRyb2xsZXJNYXBbY29udHJvbGxlci5wcm9wZXJ0eV0gPSBjb250cm9sbGVyO1xyXG5cdFxyXG5cdCAgICAvLyBPa2F5LCBub3cgaGF2ZSB3ZSBzYXZlZCBhbnkgdmFsdWVzIGZvciB0aGlzIGNvbnRyb2xsZXI/XHJcblx0ICAgIGlmIChyb290LmxvYWQgJiYgcm9vdC5sb2FkLnJlbWVtYmVyZWQpIHtcclxuXHQgICAgICB2YXIgcHJlc2V0TWFwID0gcm9vdC5sb2FkLnJlbWVtYmVyZWQ7XHJcblx0XHJcblx0ICAgICAgLy8gV2hpY2ggcHJlc2V0IGFyZSB3ZSB0cnlpbmcgdG8gbG9hZD9cclxuXHQgICAgICB2YXIgcHJlc2V0ID0gdm9pZCAwO1xyXG5cdFxyXG5cdCAgICAgIGlmIChwcmVzZXRNYXBbZ3VpLnByZXNldF0pIHtcclxuXHQgICAgICAgIHByZXNldCA9IHByZXNldE1hcFtndWkucHJlc2V0XTtcclxuXHQgICAgICB9IGVsc2UgaWYgKHByZXNldE1hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdKSB7XHJcblx0ICAgICAgICAvLyBVaGgsIHlvdSBjYW4gaGF2ZSB0aGUgZGVmYXVsdCBpbnN0ZWFkP1xyXG5cdCAgICAgICAgcHJlc2V0ID0gcHJlc2V0TWFwW0RFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRV07XHJcblx0ICAgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIC8vIE5hZGEuXHJcblx0ICAgICAgICByZXR1cm47XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIC8vIERpZCB0aGUgbG9hZGVkIG9iamVjdCByZW1lbWJlciB0aGNvbW1vbi5pc09iamVjdD8gJiYgIERpZCB3ZSByZW1lbWJlciB0aGlzIHBhcnRpY3VsYXIgcHJvcGVydHk/XHJcblx0ICAgICAgaWYgKHByZXNldFttYXRjaGVkSW5kZXhdICYmIHByZXNldFttYXRjaGVkSW5kZXhdW2NvbnRyb2xsZXIucHJvcGVydHldICE9PSB1bmRlZmluZWQpIHtcclxuXHQgICAgICAgIC8vIFdlIGRpZCByZW1lbWJlciBzb21ldGhpbmcgZm9yIHRoaXMgZ3V5IC4uLlxyXG5cdCAgICAgICAgdmFyIHZhbHVlID0gcHJlc2V0W21hdGNoZWRJbmRleF1bY29udHJvbGxlci5wcm9wZXJ0eV07XHJcblx0XHJcblx0ICAgICAgICAvLyBBbmQgdGhhdCdzIHdoYXQgaXQgaXMuXHJcblx0ICAgICAgICBjb250cm9sbGVyLmluaXRpYWxWYWx1ZSA9IHZhbHVlO1xyXG5cdCAgICAgICAgY29udHJvbGxlci5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9XHJcblx0ICB9XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9hZGQoZ3VpLCBvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcclxuXHQgIGlmIChvYmplY3RbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcclxuXHQgICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3QgXCInICsgb2JqZWN0ICsgJ1wiIGhhcyBubyBwcm9wZXJ0eSBcIicgKyBwcm9wZXJ0eSArICdcIicpO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgdmFyIGNvbnRyb2xsZXIgPSB2b2lkIDA7XHJcblx0XHJcblx0ICBpZiAocGFyYW1zLmNvbG9yKSB7XHJcblx0ICAgIGNvbnRyb2xsZXIgPSBuZXcgX0NvbG9yQ29udHJvbGxlcjIuZGVmYXVsdChvYmplY3QsIHByb3BlcnR5KTtcclxuXHQgIH0gZWxzZSB7XHJcblx0ICAgIHZhciBmYWN0b3J5QXJncyA9IFtvYmplY3QsIHByb3BlcnR5XS5jb25jYXQocGFyYW1zLmZhY3RvcnlBcmdzKTtcclxuXHQgICAgY29udHJvbGxlciA9IF9Db250cm9sbGVyRmFjdG9yeTIuZGVmYXVsdC5hcHBseShndWksIGZhY3RvcnlBcmdzKTtcclxuXHQgIH1cclxuXHRcclxuXHQgIGlmIChwYXJhbXMuYmVmb3JlIGluc3RhbmNlb2YgX0NvbnRyb2xsZXIyLmRlZmF1bHQpIHtcclxuXHQgICAgcGFyYW1zLmJlZm9yZSA9IHBhcmFtcy5iZWZvcmUuX19saTtcclxuXHQgIH1cclxuXHRcclxuXHQgIHJlY2FsbFNhdmVkVmFsdWUoZ3VpLCBjb250cm9sbGVyKTtcclxuXHRcclxuXHQgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoY29udHJvbGxlci5kb21FbGVtZW50LCAnYycpO1xyXG5cdFxyXG5cdCAgdmFyIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0ICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKG5hbWUsICdwcm9wZXJ0eS1uYW1lJyk7XHJcblx0ICBuYW1lLmlubmVySFRNTCA9IGNvbnRyb2xsZXIucHJvcGVydHk7XHJcblx0XHJcblx0ICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0ICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmFtZSk7XHJcblx0ICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udHJvbGxlci5kb21FbGVtZW50KTtcclxuXHRcclxuXHQgIHZhciBsaSA9IGFkZFJvdyhndWksIGNvbnRhaW5lciwgcGFyYW1zLmJlZm9yZSk7XHJcblx0XHJcblx0ICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGxpLCBHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cpO1xyXG5cdCAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBfQ29sb3JDb250cm9sbGVyMi5kZWZhdWx0KSB7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MobGksICdjb2xvcicpO1xyXG5cdCAgfSBlbHNlIHtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhsaSwgX3R5cGVvZihjb250cm9sbGVyLmdldFZhbHVlKCkpKTtcclxuXHQgIH1cclxuXHRcclxuXHQgIGF1Z21lbnRDb250cm9sbGVyKGd1aSwgbGksIGNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdCAgZ3VpLl9fY29udHJvbGxlcnMucHVzaChjb250cm9sbGVyKTtcclxuXHRcclxuXHQgIHJldHVybiBjb250cm9sbGVyO1xyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2VIYXNoKGd1aSwga2V5KSB7XHJcblx0ICAvLyBUT0RPIGhvdyBkb2VzIHRoaXMgZGVhbCB3aXRoIG11bHRpcGxlIEdVSSdzP1xyXG5cdCAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgKyAnLicgKyBrZXk7XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIGFkZFByZXNldE9wdGlvbihndWksIG5hbWUsIHNldFNlbGVjdGVkKSB7XHJcblx0ICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcblx0ICBvcHQuaW5uZXJIVE1MID0gbmFtZTtcclxuXHQgIG9wdC52YWx1ZSA9IG5hbWU7XHJcblx0ICBndWkuX19wcmVzZXRfc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XHJcblx0ICBpZiAoc2V0U2VsZWN0ZWQpIHtcclxuXHQgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5zZWxlY3RlZEluZGV4ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGggLSAxO1xyXG5cdCAgfVxyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBzaG93SGlkZUV4cGxhaW4oZ3VpLCBleHBsYWluKSB7XHJcblx0ICBleHBsYWluLnN0eWxlLmRpc3BsYXkgPSBndWkudXNlTG9jYWxTdG9yYWdlID8gJ2Jsb2NrJyA6ICdub25lJztcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gYWRkU2F2ZU1lbnUoZ3VpKSB7XHJcblx0ICB2YXIgZGl2ID0gZ3VpLl9fc2F2ZV9yb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFxyXG5cdCAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhndWkuZG9tRWxlbWVudCwgJ2hhcy1zYXZlJyk7XHJcblx0XHJcblx0ICBndWkuX191bC5pbnNlcnRCZWZvcmUoZGl2LCBndWkuX191bC5maXJzdENoaWxkKTtcclxuXHRcclxuXHQgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoZGl2LCAnc2F2ZS1yb3cnKTtcclxuXHRcclxuXHQgIHZhciBnZWFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHQgIGdlYXJzLmlubmVySFRNTCA9ICcmbmJzcDsnO1xyXG5cdCAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhnZWFycywgJ2J1dHRvbiBnZWFycycpO1xyXG5cdFxyXG5cdCAgLy8gVE9ETyByZXBsYWNlIHdpdGggRnVuY3Rpb25Db250cm9sbGVyXHJcblx0ICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdCAgYnV0dG9uLmlubmVySFRNTCA9ICdTYXZlJztcclxuXHQgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoYnV0dG9uLCAnYnV0dG9uJyk7XHJcblx0ICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGJ1dHRvbiwgJ3NhdmUnKTtcclxuXHRcclxuXHQgIHZhciBidXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdCAgYnV0dG9uMi5pbm5lckhUTUwgPSAnTmV3JztcclxuXHQgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoYnV0dG9uMiwgJ2J1dHRvbicpO1xyXG5cdCAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhidXR0b24yLCAnc2F2ZS1hcycpO1xyXG5cdFxyXG5cdCAgdmFyIGJ1dHRvbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0ICBidXR0b24zLmlubmVySFRNTCA9ICdSZXZlcnQnO1xyXG5cdCAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhidXR0b24zLCAnYnV0dG9uJyk7XHJcblx0ICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGJ1dHRvbjMsICdyZXZlcnQnKTtcclxuXHRcclxuXHQgIHZhciBzZWxlY3QgPSBndWkuX19wcmVzZXRfc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XHJcblx0XHJcblx0ICBpZiAoZ3VpLmxvYWQgJiYgZ3VpLmxvYWQucmVtZW1iZXJlZCkge1xyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmVhY2goZ3VpLmxvYWQucmVtZW1iZXJlZCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuXHQgICAgICBhZGRQcmVzZXRPcHRpb24oZ3VpLCBrZXksIGtleSA9PT0gZ3VpLnByZXNldCk7XHJcblx0ICAgIH0pO1xyXG5cdCAgfSBlbHNlIHtcclxuXHQgICAgYWRkUHJlc2V0T3B0aW9uKGd1aSwgREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FLCBmYWxzZSk7XHJcblx0ICB9XHJcblx0XHJcblx0ICBfZG9tMi5kZWZhdWx0LmJpbmQoc2VsZWN0LCAnY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cdCAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGg7IGluZGV4KyspIHtcclxuXHQgICAgICBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS5pbm5lckhUTUwgPSBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS52YWx1ZTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBndWkucHJlc2V0ID0gdGhpcy52YWx1ZTtcclxuXHQgIH0pO1xyXG5cdFxyXG5cdCAgZGl2LmFwcGVuZENoaWxkKHNlbGVjdCk7XHJcblx0ICBkaXYuYXBwZW5kQ2hpbGQoZ2VhcnMpO1xyXG5cdCAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblx0ICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uMik7XHJcblx0ICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uMyk7XHJcblx0XHJcblx0ICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xyXG5cdCAgICB2YXIgZXhwbGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1sb2NhbC1leHBsYWluJyk7XHJcblx0ICAgIHZhciBsb2NhbFN0b3JhZ2VDaGVja0JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1sb2NhbC1zdG9yYWdlJyk7XHJcblx0ICAgIHZhciBzYXZlTG9jYWxseSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1zYXZlLWxvY2FsbHknKTtcclxuXHRcclxuXHQgICAgc2F2ZUxvY2FsbHkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHJcblx0ICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKGd1aSwgJ2lzTG9jYWwnKSkgPT09ICd0cnVlJykge1xyXG5cdCAgICAgIGxvY2FsU3RvcmFnZUNoZWNrQm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgc2hvd0hpZGVFeHBsYWluKGd1aSwgZXhwbGFpbik7XHJcblx0XHJcblx0ICAgIC8vIFRPRE86IFVzZSBhIGJvb2xlYW4gY29udHJvbGxlciwgZm9vbCFcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKGxvY2FsU3RvcmFnZUNoZWNrQm94LCAnY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgIGd1aS51c2VMb2NhbFN0b3JhZ2UgPSAhZ3VpLnVzZUxvY2FsU3RvcmFnZTtcclxuXHQgICAgICBzaG93SGlkZUV4cGxhaW4oZ3VpLCBleHBsYWluKTtcclxuXHQgICAgfSk7XHJcblx0ICB9XHJcblx0XHJcblx0ICB2YXIgbmV3Q29uc3RydWN0b3JUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1uZXctY29uc3RydWN0b3InKTtcclxuXHRcclxuXHQgIF9kb20yLmRlZmF1bHQuYmluZChuZXdDb25zdHJ1Y3RvclRleHRBcmVhLCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcblx0ICAgIGlmIChlLm1ldGFLZXkgJiYgKGUud2hpY2ggPT09IDY3IHx8IGUua2V5Q29kZSA9PT0gNjcpKSB7XHJcblx0ICAgICAgU0FWRV9ESUFMT0dVRS5oaWRlKCk7XHJcblx0ICAgIH1cclxuXHQgIH0pO1xyXG5cdFxyXG5cdCAgX2RvbTIuZGVmYXVsdC5iaW5kKGdlYXJzLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0ICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuaW5uZXJIVE1MID0gSlNPTi5zdHJpbmdpZnkoZ3VpLmdldFNhdmVPYmplY3QoKSwgdW5kZWZpbmVkLCAyKTtcclxuXHQgICAgU0FWRV9ESUFMT0dVRS5zaG93KCk7XHJcblx0ICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuZm9jdXMoKTtcclxuXHQgICAgbmV3Q29uc3RydWN0b3JUZXh0QXJlYS5zZWxlY3QoKTtcclxuXHQgIH0pO1xyXG5cdFxyXG5cdCAgX2RvbTIuZGVmYXVsdC5iaW5kKGJ1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdCAgICBndWkuc2F2ZSgpO1xyXG5cdCAgfSk7XHJcblx0XHJcblx0ICBfZG9tMi5kZWZhdWx0LmJpbmQoYnV0dG9uMiwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdCAgICB2YXIgcHJlc2V0TmFtZSA9IHByb21wdCgnRW50ZXIgYSBuZXcgcHJlc2V0IG5hbWUuJyk7XHJcblx0ICAgIGlmIChwcmVzZXROYW1lKSB7XHJcblx0ICAgICAgZ3VpLnNhdmVBcyhwcmVzZXROYW1lKTtcclxuXHQgICAgfVxyXG5cdCAgfSk7XHJcblx0XHJcblx0ICBfZG9tMi5kZWZhdWx0LmJpbmQoYnV0dG9uMywgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdCAgICBndWkucmV2ZXJ0KCk7XHJcblx0ICB9KTtcclxuXHRcclxuXHQgIC8vIGRpdi5hcHBlbmRDaGlsZChidXR0b24yKTtcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gYWRkUmVzaXplSGFuZGxlKGd1aSkge1xyXG5cdCAgdmFyIHBtb3VzZVggPSB2b2lkIDA7XHJcblx0XHJcblx0ICBndWkuX19yZXNpemVfaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHJcblx0ICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZChndWkuX19yZXNpemVfaGFuZGxlLnN0eWxlLCB7XHJcblx0XHJcblx0ICAgIHdpZHRoOiAnNnB4JyxcclxuXHQgICAgbWFyZ2luTGVmdDogJy0zcHgnLFxyXG5cdCAgICBoZWlnaHQ6ICcyMDBweCcsXHJcblx0ICAgIGN1cnNvcjogJ2V3LXJlc2l6ZScsXHJcblx0ICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXHJcblx0ICAgIC8vIGJvcmRlcjogJzFweCBzb2xpZCBibHVlJ1xyXG5cdFxyXG5cdCAgfSk7XHJcblx0XHJcblx0ICBmdW5jdGlvbiBkcmFnKGUpIHtcclxuXHQgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFxyXG5cdCAgICBndWkud2lkdGggKz0gcG1vdXNlWCAtIGUuY2xpZW50WDtcclxuXHQgICAgZ3VpLm9uUmVzaXplKCk7XHJcblx0ICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XHJcblx0XHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHQgIH1cclxuXHRcclxuXHQgIGZ1bmN0aW9uIGRyYWdTdG9wKCkge1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LnJlbW92ZUNsYXNzKGd1aS5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfRFJBRyk7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQudW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIGRyYWcpO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZHJhZ1N0b3ApO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgZnVuY3Rpb24gZHJhZ1N0YXJ0KGUpIHtcclxuXHQgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFxyXG5cdCAgICBwbW91c2VYID0gZS5jbGllbnRYO1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGd1aS5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfRFJBRyk7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBkcmFnKTtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBkcmFnU3RvcCk7XHJcblx0XHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHQgIH1cclxuXHRcclxuXHQgIF9kb20yLmRlZmF1bHQuYmluZChndWkuX19yZXNpemVfaGFuZGxlLCAnbW91c2Vkb3duJywgZHJhZ1N0YXJ0KTtcclxuXHQgIF9kb20yLmRlZmF1bHQuYmluZChndWkuX19jbG9zZUJ1dHRvbiwgJ21vdXNlZG93bicsIGRyYWdTdGFydCk7XHJcblx0XHJcblx0ICBndWkuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZ3VpLl9fcmVzaXplX2hhbmRsZSwgZ3VpLmRvbUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBzZXRXaWR0aChndWksIHcpIHtcclxuXHQgIGd1aS5kb21FbGVtZW50LnN0eWxlLndpZHRoID0gdyArICdweCc7XHJcblx0ICAvLyBBdXRvIHBsYWNlZCBzYXZlLXJvd3MgYXJlIHBvc2l0aW9uIGZpeGVkLCBzbyB3ZSBoYXZlIHRvXHJcblx0ICAvLyBzZXQgdGhlIHdpZHRoIG1hbnVhbGx5IGlmIHdlIHdhbnQgaXQgdG8gYmxlZWQgdG8gdGhlIGVkZ2VcclxuXHQgIGlmIChndWkuX19zYXZlX3JvdyAmJiBndWkuYXV0b1BsYWNlKSB7XHJcblx0ICAgIGd1aS5fX3NhdmVfcm93LnN0eWxlLndpZHRoID0gdyArICdweCc7XHJcblx0ICB9XHJcblx0ICBpZiAoZ3VpLl9fY2xvc2VCdXR0b24pIHtcclxuXHQgICAgZ3VpLl9fY2xvc2VCdXR0b24uc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcclxuXHQgIH1cclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gZ2V0Q3VycmVudFByZXNldChndWksIHVzZUluaXRpYWxWYWx1ZXMpIHtcclxuXHQgIHZhciB0b1JldHVybiA9IHt9O1xyXG5cdFxyXG5cdCAgLy8gRm9yIGVhY2ggb2JqZWN0IEknbSByZW1lbWJlcmluZ1xyXG5cdCAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKGd1aS5fX3JlbWVtYmVyZWRPYmplY3RzLCBmdW5jdGlvbiAodmFsLCBpbmRleCkge1xyXG5cdCAgICB2YXIgc2F2ZWRWYWx1ZXMgPSB7fTtcclxuXHRcclxuXHQgICAgLy8gVGhlIGNvbnRyb2xsZXJzIEkndmUgbWFkZSBmb3IgdGhjb21tb24uaXNPYmplY3QgYnkgcHJvcGVydHlcclxuXHQgICAgdmFyIGNvbnRyb2xsZXJNYXAgPSBndWkuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbaW5kZXhdO1xyXG5cdFxyXG5cdCAgICAvLyBSZW1lbWJlciBlYWNoIHZhbHVlIGZvciBlYWNoIHByb3BlcnR5XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZWFjaChjb250cm9sbGVyTWFwLCBmdW5jdGlvbiAoY29udHJvbGxlciwgcHJvcGVydHkpIHtcclxuXHQgICAgICBzYXZlZFZhbHVlc1twcm9wZXJ0eV0gPSB1c2VJbml0aWFsVmFsdWVzID8gY29udHJvbGxlci5pbml0aWFsVmFsdWUgOiBjb250cm9sbGVyLmdldFZhbHVlKCk7XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICAvLyBTYXZlIHRoZSB2YWx1ZXMgZm9yIHRoY29tbW9uLmlzT2JqZWN0XHJcblx0ICAgIHRvUmV0dXJuW2luZGV4XSA9IHNhdmVkVmFsdWVzO1xyXG5cdCAgfSk7XHJcblx0XHJcblx0ICByZXR1cm4gdG9SZXR1cm47XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIHNldFByZXNldFNlbGVjdEluZGV4KGd1aSkge1xyXG5cdCAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcblx0ICAgIGlmIChndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS52YWx1ZSA9PT0gZ3VpLnByZXNldCkge1xyXG5cdCAgICAgIGd1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG5cdCAgICB9XHJcblx0ICB9XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSkge1xyXG5cdCAgaWYgKGNvbnRyb2xsZXJBcnJheS5sZW5ndGggIT09IDApIHtcclxuXHQgICAgX3JlcXVlc3RBbmltYXRpb25GcmFtZTIuZGVmYXVsdC5jYWxsKHdpbmRvdywgZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSk7XHJcblx0ICAgIH0pO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKGNvbnRyb2xsZXJBcnJheSwgZnVuY3Rpb24gKGMpIHtcclxuXHQgICAgYy51cGRhdGVEaXNwbGF5KCk7XHJcblx0ICB9KTtcclxuXHR9XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gR1VJO1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xyXG5cclxuLyoqKi8gfSxcclxuLyogMTggKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHQvKipcclxuXHQgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgKlxyXG5cdCAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICpcclxuXHQgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgKlxyXG5cdCAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAqL1xyXG5cdFxyXG5cdG1vZHVsZS5leHBvcnRzID0ge1xyXG5cdCAgbG9hZDogZnVuY3Rpb24gbG9hZCh1cmwsIGluZG9jKSB7XHJcblx0ICAgIHZhciBkb2MgPSBpbmRvYyB8fCBkb2N1bWVudDtcclxuXHQgICAgdmFyIGxpbmsgPSBkb2MuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG5cdCAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xyXG5cdCAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuXHQgICAgbGluay5ocmVmID0gdXJsO1xyXG5cdCAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBpbmplY3Q6IGZ1bmN0aW9uIGluamVjdChjc3MsIGluZG9jKSB7XHJcblx0ICAgIHZhciBkb2MgPSBpbmRvYyB8fCBkb2N1bWVudDtcclxuXHQgICAgdmFyIGluamVjdGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHQgICAgaW5qZWN0ZWQudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcblx0ICAgIGluamVjdGVkLmlubmVySFRNTCA9IGNzcztcclxuXHQgICAgdmFyIGhlYWQgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHQgICAgdHJ5IHtcclxuXHQgICAgICBoZWFkLmFwcGVuZENoaWxkKGluamVjdGVkKTtcclxuXHQgICAgfSBjYXRjaCAoZSkgey8vIFVuYWJsZSB0byBpbmplY3QgQ1NTLCBwcm9iYWJseSBiZWNhdXNlIG9mIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3lcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH07XHJcblxyXG4vKioqLyB9LFxyXG4vKiAxOSAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcclxuXHJcblx0bW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcImRnLXNhdmVcXFwiIGNsYXNzPVxcXCJkZyBkaWFsb2d1ZVxcXCI+XFxuXFxuICBIZXJlJ3MgdGhlIG5ldyBsb2FkIHBhcmFtZXRlciBmb3IgeW91ciA8Y29kZT5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3I6XFxuXFxuICA8dGV4dGFyZWEgaWQ9XFxcImRnLW5ldy1jb25zdHJ1Y3RvclxcXCI+PC90ZXh0YXJlYT5cXG5cXG4gIDxkaXYgaWQ9XFxcImRnLXNhdmUtbG9jYWxseVxcXCI+XFxuXFxuICAgIDxpbnB1dCBpZD1cXFwiZGctbG9jYWwtc3RvcmFnZVxcXCIgdHlwZT1cXFwiY2hlY2tib3hcXFwiLz4gQXV0b21hdGljYWxseSBzYXZlXFxuICAgIHZhbHVlcyB0byA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IG9uIGV4aXQuXFxuXFxuICAgIDxkaXYgaWQ9XFxcImRnLWxvY2FsLWV4cGxhaW5cXFwiPlRoZSB2YWx1ZXMgc2F2ZWQgdG8gPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiB3aWxsXFxuICAgICAgb3ZlcnJpZGUgdGhvc2UgcGFzc2VkIHRvIDxjb2RlPmRhdC5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3IuIFRoaXMgbWFrZXMgaXRcXG4gICAgICBlYXNpZXIgdG8gd29yayBpbmNyZW1lbnRhbGx5LCBidXQgPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiBpcyBmcmFnaWxlLFxcbiAgICAgIGFuZCB5b3VyIGZyaWVuZHMgbWF5IG5vdCBzZWUgdGhlIHNhbWUgdmFsdWVzIHlvdSBkby5cXG5cXG4gICAgPC9kaXY+XFxuXFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cIjtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDIwICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX09wdGlvbkNvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcclxuXHRcclxuXHR2YXIgX09wdGlvbkNvbnRyb2xsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfT3B0aW9uQ29udHJvbGxlcik7XHJcblx0XHJcblx0dmFyIF9OdW1iZXJDb250cm9sbGVyQm94ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XHJcblx0XHJcblx0dmFyIF9OdW1iZXJDb250cm9sbGVyQm94MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX051bWJlckNvbnRyb2xsZXJCb3gpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlclNsaWRlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlclNsaWRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OdW1iZXJDb250cm9sbGVyU2xpZGVyKTtcclxuXHRcclxuXHR2YXIgX1N0cmluZ0NvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKTtcclxuXHRcclxuXHR2YXIgX1N0cmluZ0NvbnRyb2xsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3RyaW5nQ29udHJvbGxlcik7XHJcblx0XHJcblx0dmFyIF9GdW5jdGlvbkNvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcclxuXHRcclxuXHR2YXIgX0Z1bmN0aW9uQ29udHJvbGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9GdW5jdGlvbkNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdHZhciBfQm9vbGVhbkNvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xyXG5cdFxyXG5cdHZhciBfQm9vbGVhbkNvbnRyb2xsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQm9vbGVhbkNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdHZhciBfY29tbW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21tb24pO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XHJcblx0XHJcblx0dmFyIENvbnRyb2xsZXJGYWN0b3J5ID0gZnVuY3Rpb24gQ29udHJvbGxlckZhY3Rvcnkob2JqZWN0LCBwcm9wZXJ0eSkge1xyXG5cdCAgdmFyIGluaXRpYWxWYWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XHJcblx0XHJcblx0ICAvLyBQcm92aWRpbmcgb3B0aW9ucz9cclxuXHQgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzQXJyYXkoYXJndW1lbnRzWzJdKSB8fCBfY29tbW9uMi5kZWZhdWx0LmlzT2JqZWN0KGFyZ3VtZW50c1syXSkpIHtcclxuXHQgICAgcmV0dXJuIG5ldyBfT3B0aW9uQ29udHJvbGxlcjIuZGVmYXVsdChvYmplY3QsIHByb3BlcnR5LCBhcmd1bWVudHNbMl0pO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgLy8gUHJvdmlkaW5nIGEgbWFwP1xyXG5cdCAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIoaW5pdGlhbFZhbHVlKSkge1xyXG5cdCAgICAvLyBIYXMgbWluIGFuZCBtYXg/IChzbGlkZXIpXHJcblx0ICAgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKGFyZ3VtZW50c1syXSkgJiYgX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihhcmd1bWVudHNbM10pKSB7XHJcblx0ICAgICAgLy8gaGFzIHN0ZXA/XHJcblx0ICAgICAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIoYXJndW1lbnRzWzRdKSkge1xyXG5cdCAgICAgICAgcmV0dXJuIG5ldyBfTnVtYmVyQ29udHJvbGxlclNsaWRlcjIuZGVmYXVsdChvYmplY3QsIHByb3BlcnR5LCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSwgYXJndW1lbnRzWzRdKTtcclxuXHQgICAgICB9XHJcblx0XHJcblx0ICAgICAgcmV0dXJuIG5ldyBfTnVtYmVyQ29udHJvbGxlclNsaWRlcjIuZGVmYXVsdChvYmplY3QsIHByb3BlcnR5LCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgLy8gbnVtYmVyIGJveFxyXG5cdCAgICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihhcmd1bWVudHNbNF0pKSB7XHJcblx0ICAgICAgLy8gaGFzIHN0ZXBcclxuXHQgICAgICByZXR1cm4gbmV3IF9OdW1iZXJDb250cm9sbGVyQm94Mi5kZWZhdWx0KG9iamVjdCwgcHJvcGVydHksIHsgbWluOiBhcmd1bWVudHNbMl0sIG1heDogYXJndW1lbnRzWzNdLCBzdGVwOiBhcmd1bWVudHNbNF0gfSk7XHJcblx0ICAgIH1cclxuXHQgICAgcmV0dXJuIG5ldyBfTnVtYmVyQ29udHJvbGxlckJveDIuZGVmYXVsdChvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogYXJndW1lbnRzWzJdLCBtYXg6IGFyZ3VtZW50c1szXSB9KTtcclxuXHQgIH1cclxuXHRcclxuXHQgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzU3RyaW5nKGluaXRpYWxWYWx1ZSkpIHtcclxuXHQgICAgcmV0dXJuIG5ldyBfU3RyaW5nQ29udHJvbGxlcjIuZGVmYXVsdChvYmplY3QsIHByb3BlcnR5KTtcclxuXHQgIH1cclxuXHRcclxuXHQgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzRnVuY3Rpb24oaW5pdGlhbFZhbHVlKSkge1xyXG5cdCAgICByZXR1cm4gbmV3IF9GdW5jdGlvbkNvbnRyb2xsZXIyLmRlZmF1bHQob2JqZWN0LCBwcm9wZXJ0eSwgJycpO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNCb29sZWFuKGluaXRpYWxWYWx1ZSkpIHtcclxuXHQgICAgcmV0dXJuIG5ldyBfQm9vbGVhbkNvbnRyb2xsZXIyLmRlZmF1bHQob2JqZWN0LCBwcm9wZXJ0eSk7XHJcblx0ICB9XHJcblx0XHJcblx0ICByZXR1cm4gbnVsbDtcclxuXHR9OyAvKipcclxuXHQgICAgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICAgICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgICAgKlxyXG5cdCAgICAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICAgICpcclxuXHQgICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAgICAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgICAgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgICAgKlxyXG5cdCAgICAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAgICAqL1xyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IENvbnRyb2xsZXJGYWN0b3J5O1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xyXG5cclxuLyoqKi8gfSxcclxuLyogMjEgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XHJcblxyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0LyoqXHJcblx0ICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICpcclxuXHQgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAqXHJcblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICpcclxuXHQgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgKi9cclxuXHRcclxuXHRmdW5jdGlvbiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcclxuXHQgIHNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcblx0fVxyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDIyICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX2RvbSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XHJcblx0XHJcblx0dmFyIF9kb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZG9tKTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tbW9uKTtcclxuXHRcclxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9IC8qKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuXHRcclxuXHR2YXIgQ2VudGVyZWREaXYgPSBmdW5jdGlvbiAoKSB7XHJcblx0ICBmdW5jdGlvbiBDZW50ZXJlZERpdigpIHtcclxuXHQgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENlbnRlcmVkRGl2KTtcclxuXHRcclxuXHQgICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLCB7XHJcblx0ICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwwLjgpJyxcclxuXHQgICAgICB0b3A6IDAsXHJcblx0ICAgICAgbGVmdDogMCxcclxuXHQgICAgICBkaXNwbGF5OiAnbm9uZScsXHJcblx0ICAgICAgekluZGV4OiAnMTAwMCcsXHJcblx0ICAgICAgb3BhY2l0eTogMCxcclxuXHQgICAgICBXZWJraXRUcmFuc2l0aW9uOiAnb3BhY2l0eSAwLjJzIGxpbmVhcicsXHJcblx0ICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC4ycyBsaW5lYXInXHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0Lm1ha2VGdWxsc2NyZWVuKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQpO1xyXG5cdCAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcclxuXHRcclxuXHQgICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZXh0ZW5kKHRoaXMuZG9tRWxlbWVudC5zdHlsZSwge1xyXG5cdCAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG5cdCAgICAgIGRpc3BsYXk6ICdub25lJyxcclxuXHQgICAgICB6SW5kZXg6ICcxMDAxJyxcclxuXHQgICAgICBvcGFjaXR5OiAwLFxyXG5cdCAgICAgIFdlYmtpdFRyYW5zaXRpb246ICctd2Via2l0LXRyYW5zZm9ybSAwLjJzIGVhc2Utb3V0LCBvcGFjaXR5IDAuMnMgbGluZWFyJyxcclxuXHQgICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQsIG9wYWNpdHkgMC4ycyBsaW5lYXInXHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQpO1xyXG5cdCAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XHJcblx0XHJcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgX3RoaXMuaGlkZSgpO1xyXG5cdCAgICB9KTtcclxuXHQgIH1cclxuXHRcclxuXHQgIENlbnRlcmVkRGl2LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gc2hvdygpIHtcclxuXHQgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHRcclxuXHQgICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHRcclxuXHQgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cdCAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XHJcblx0ICAgIC8vICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSAnNTIlJztcclxuXHQgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxLjEpJztcclxuXHRcclxuXHQgICAgdGhpcy5sYXlvdXQoKTtcclxuXHRcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5kZWZlcihmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgX3RoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XHJcblx0ICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuXHQgICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxKSc7XHJcblx0ICAgIH0pO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogSGlkZSBjZW50ZXJlZCBkaXZcclxuXHQgICAqL1xyXG5cdFxyXG5cdFxyXG5cdCAgQ2VudGVyZWREaXYucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiBoaWRlKCkge1xyXG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFxyXG5cdCAgICB2YXIgaGlkZSA9IGZ1bmN0aW9uIGhpZGUoKSB7XHJcblx0ICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdCAgICAgIF90aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoaWRlKTtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LnVuYmluZChfdGhpcy5kb21FbGVtZW50LCAndHJhbnNpdGlvbmVuZCcsIGhpZGUpO1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQudW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICdvVHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xyXG5cdCAgICB9O1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQodGhpcy5kb21FbGVtZW50LCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQodGhpcy5kb21FbGVtZW50LCAndHJhbnNpdGlvbmVuZCcsIGhpZGUpO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQodGhpcy5kb21FbGVtZW50LCAnb1RyYW5zaXRpb25FbmQnLCBoaWRlKTtcclxuXHRcclxuXHQgICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHQgICAgLy8gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLnRvcCA9ICc0OCUnO1xyXG5cdCAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XHJcblx0ICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgQ2VudGVyZWREaXYucHJvdG90eXBlLmxheW91dCA9IGZ1bmN0aW9uIGxheW91dCgpIHtcclxuXHQgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSBfZG9tMi5kZWZhdWx0LmdldFdpZHRoKHRoaXMuZG9tRWxlbWVudCkgLyAyICsgJ3B4JztcclxuXHQgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLnRvcCA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDIgLSBfZG9tMi5kZWZhdWx0LmdldEhlaWdodCh0aGlzLmRvbUVsZW1lbnQpIC8gMiArICdweCc7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgcmV0dXJuIENlbnRlcmVkRGl2O1xyXG5cdH0oKTtcclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSBDZW50ZXJlZERpdjtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDIzICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KSgpO1xyXG5cdC8vIGltcG9ydHNcclxuXHRcclxuXHRcclxuXHQvLyBtb2R1bGVcclxuXHRleHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuZGcge1xcbiAgLyoqIENsZWFyIGxpc3Qgc3R5bGVzICovXFxuICAvKiBBdXRvLXBsYWNlIGNvbnRhaW5lciAqL1xcbiAgLyogQXV0by1wbGFjZWQgR1VJJ3MgKi9cXG4gIC8qIExpbmUgaXRlbXMgdGhhdCBkb24ndCBjb250YWluIGZvbGRlcnMuICovXFxuICAvKiogRm9sZGVyIG5hbWVzICovXFxuICAvKiogSGlkZXMgY2xvc2VkIGl0ZW1zICovXFxuICAvKiogQ29udHJvbGxlciByb3cgKi9cXG4gIC8qKiBOYW1lLWhhbGYgKGxlZnQpICovXFxuICAvKiogQ29udHJvbGxlci1oYWxmIChyaWdodCkgKi9cXG4gIC8qKiBDb250cm9sbGVyIHBsYWNlbWVudCAqL1xcbiAgLyoqIFNob3J0ZXIgbnVtYmVyIGJveGVzIHdoZW4gc2xpZGVyIGlzIHByZXNlbnQuICovXFxuICAvKiogRW5zdXJlIHRoZSBlbnRpcmUgYm9vbGVhbiBhbmQgZnVuY3Rpb24gcm93IHNob3dzIGEgaGFuZCAqL1xcbiAgLyoqIGFsbG93IG92ZXJmbG93IGZvciBjb2xvciBzZWxlY3RvciAqLyB9XFxuICAuZGcgdWwge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBjbGVhcjogYm90aDsgfVxcbiAgLmRnLmFjIHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBoZWlnaHQ6IDA7XFxuICAgIHotaW5kZXg6IDA7IH1cXG4gIC5kZzpub3QoLmFjKSAubWFpbiB7XFxuICAgIC8qKiBFeGNsdWRlIG1haW5zIGluIGFjIHNvIHRoYXQgd2UgZG9uJ3QgaGlkZSBjbG9zZSBidXR0b24gKi9cXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmRnLm1haW4ge1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMC4xcyBsaW5lYXI7XFxuICAgIC1vLXRyYW5zaXRpb246IG9wYWNpdHkgMC4xcyBsaW5lYXI7XFxuICAgIC1tb3otdHJhbnNpdGlvbjogb3BhY2l0eSAwLjFzIGxpbmVhcjtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjFzIGxpbmVhcjsgfVxcbiAgICAuZGcubWFpbi50YWxsZXItdGhhbi13aW5kb3cge1xcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87IH1cXG4gICAgICAuZGcubWFpbi50YWxsZXItdGhhbi13aW5kb3cgLmNsb3NlLWJ1dHRvbiB7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgLyogVE9ETywgdGhlc2UgYXJlIHN0eWxlIG5vdGVzICovXFxuICAgICAgICBtYXJnaW4tdG9wOiAtMXB4O1xcbiAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICMyYzJjMmM7IH1cXG4gICAgLmRnLm1haW4gdWwuY2xvc2VkIC5jbG9zZS1idXR0b24ge1xcbiAgICAgIG9wYWNpdHk6IDEgIWltcG9ydGFudDsgfVxcbiAgICAuZGcubWFpbjpob3ZlciAuY2xvc2UtYnV0dG9uLFxcbiAgICAuZGcubWFpbiAuY2xvc2UtYnV0dG9uLmRyYWcge1xcbiAgICAgIG9wYWNpdHk6IDE7IH1cXG4gICAgLmRnLm1haW4gLmNsb3NlLWJ1dHRvbiB7XFxuICAgICAgLypvcGFjaXR5OiAwOyovXFxuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMXMgbGluZWFyO1xcbiAgICAgIC1vLXRyYW5zaXRpb246IG9wYWNpdHkgMC4xcyBsaW5lYXI7XFxuICAgICAgLW1vei10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMXMgbGluZWFyO1xcbiAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xcyBsaW5lYXI7XFxuICAgICAgYm9yZGVyOiAwO1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAxOXB4O1xcbiAgICAgIGhlaWdodDogMjBweDtcXG4gICAgICAvKiBUT0RPLCB0aGVzZSBhcmUgc3R5bGUgbm90ZXMgKi9cXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7IH1cXG4gICAgICAuZGcubWFpbiAuY2xvc2UtYnV0dG9uLmNsb3NlLXRvcCB7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gICAgICAuZGcubWFpbiAuY2xvc2UtYnV0dG9uLmNsb3NlLWJvdHRvbSB7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7IH1cXG4gICAgICAuZGcubWFpbiAuY2xvc2UtYnV0dG9uOmhvdmVyIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxMTE7IH1cXG4gIC5kZy5hIHtcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuICAgIG92ZXJmbG93LXk6IHZpc2libGU7IH1cXG4gICAgLmRnLmEuaGFzLXNhdmUgPiB1bC5jbG9zZS10b3Age1xcbiAgICAgIG1hcmdpbi10b3A6IDA7IH1cXG4gICAgLmRnLmEuaGFzLXNhdmUgPiB1bC5jbG9zZS1ib3R0b20ge1xcbiAgICAgIG1hcmdpbi10b3A6IDI3cHg7IH1cXG4gICAgLmRnLmEuaGFzLXNhdmUgPiB1bC5jbG9zZWQge1xcbiAgICAgIG1hcmdpbi10b3A6IDA7IH1cXG4gICAgLmRnLmEgLnNhdmUtcm93IHtcXG4gICAgICB0b3A6IDA7XFxuICAgICAgei1pbmRleDogMTAwMjsgfVxcbiAgICAgIC5kZy5hIC5zYXZlLXJvdy5jbG9zZS10b3Age1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAgICAgLmRnLmEgLnNhdmUtcm93LmNsb3NlLWJvdHRvbSB7XFxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7IH1cXG4gIC5kZyBsaSB7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogaGVpZ2h0IDAuMXMgZWFzZS1vdXQ7XFxuICAgIC1vLXRyYW5zaXRpb246IGhlaWdodCAwLjFzIGVhc2Utb3V0O1xcbiAgICAtbW96LXRyYW5zaXRpb246IGhlaWdodCAwLjFzIGVhc2Utb3V0O1xcbiAgICB0cmFuc2l0aW9uOiBoZWlnaHQgMC4xcyBlYXNlLW91dDtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBvdmVyZmxvdyAwLjFzIGxpbmVhcjtcXG4gICAgLW8tdHJhbnNpdGlvbjogb3ZlcmZsb3cgMC4xcyBsaW5lYXI7XFxuICAgIC1tb3otdHJhbnNpdGlvbjogb3ZlcmZsb3cgMC4xcyBsaW5lYXI7XFxuICAgIHRyYW5zaXRpb246IG92ZXJmbG93IDAuMXMgbGluZWFyOyB9XFxuICAuZGcgbGk6bm90KC5mb2xkZXIpIHtcXG4gICAgY3Vyc29yOiBhdXRvO1xcbiAgICBoZWlnaHQ6IDI3cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyN3B4O1xcbiAgICBwYWRkaW5nOiAwIDRweCAwIDVweDsgfVxcbiAgLmRnIGxpLmZvbGRlciB7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdHJhbnNwYXJlbnQ7IH1cXG4gIC5kZyBsaS50aXRsZSB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgbWFyZ2luLWxlZnQ6IC00cHg7IH1cXG4gIC5kZyAuY2xvc2VkIGxpOm5vdCgudGl0bGUpLFxcbiAgLmRnIC5jbG9zZWQgdWwgbGksXFxuICAuZGcgLmNsb3NlZCB1bCBsaSA+ICoge1xcbiAgICBoZWlnaHQ6IDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGJvcmRlcjogMDsgfVxcbiAgLmRnIC5jciB7XFxuICAgIGNsZWFyOiBib3RoO1xcbiAgICBwYWRkaW5nLWxlZnQ6IDNweDtcXG4gICAgaGVpZ2h0OiAyN3B4O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAuZGcgLnByb3BlcnR5LW5hbWUge1xcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBjbGVhcjogbGVmdDtcXG4gICAgd2lkdGg6IDQwJTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IH1cXG4gIC5kZyAuYyB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB3aWR0aDogNjAlO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5kZyAuYyBpbnB1dFt0eXBlPXRleHRdIHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBtYXJnaW4tdG9wOiA0cHg7XFxuICAgIHBhZGRpbmc6IDNweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGZsb2F0OiByaWdodDsgfVxcbiAgLmRnIC5oYXMtc2xpZGVyIGlucHV0W3R5cGU9dGV4dF0ge1xcbiAgICB3aWR0aDogMzAlO1xcbiAgICAvKmRpc3BsYXk6IG5vbmU7Ki9cXG4gICAgbWFyZ2luLWxlZnQ6IDA7IH1cXG4gIC5kZyAuc2xpZGVyIHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHdpZHRoOiA2NiU7XFxuICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XFxuICAgIGhlaWdodDogMTlweDtcXG4gICAgbWFyZ2luLXRvcDogNHB4OyB9XFxuICAuZGcgLnNsaWRlci1mZyB7XFxuICAgIGhlaWdodDogMTAwJTsgfVxcbiAgLmRnIC5jIGlucHV0W3R5cGU9Y2hlY2tib3hdIHtcXG4gICAgbWFyZ2luLXRvcDogN3B4OyB9XFxuICAuZGcgLmMgc2VsZWN0IHtcXG4gICAgbWFyZ2luLXRvcDogNXB4OyB9XFxuICAuZGcgLmNyLmZ1bmN0aW9uLFxcbiAgLmRnIC5jci5mdW5jdGlvbiAucHJvcGVydHktbmFtZSxcXG4gIC5kZyAuY3IuZnVuY3Rpb24gKixcXG4gIC5kZyAuY3IuYm9vbGVhbixcXG4gIC5kZyAuY3IuYm9vbGVhbiAqIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAuZGcgLmNyLmNvbG9yIHtcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7IH1cXG4gIC5kZyAuc2VsZWN0b3Ige1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIG1hcmdpbi1sZWZ0OiAtOXB4O1xcbiAgICBtYXJnaW4tdG9wOiAyM3B4O1xcbiAgICB6LWluZGV4OiAxMDsgfVxcbiAgLmRnIC5jOmhvdmVyIC5zZWxlY3RvcixcXG4gIC5kZyAuc2VsZWN0b3IuZHJhZyB7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAuZGcgbGkuc2F2ZS1yb3cge1xcbiAgICBwYWRkaW5nOiAwOyB9XFxuICAgIC5kZyBsaS5zYXZlLXJvdyAuYnV0dG9uIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgcGFkZGluZzogMHB4IDZweDsgfVxcbiAgLmRnLmRpYWxvZ3VlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIyMjtcXG4gICAgd2lkdGg6IDQ2MHB4O1xcbiAgICBwYWRkaW5nOiAxNXB4O1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxNXB4OyB9XFxuXFxuLyogVE9ETyBTZXBhcmF0ZSBzdHlsZSBhbmQgc3RydWN0dXJlICovXFxuI2RnLW5ldy1jb25zdHJ1Y3RvciB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgY29sb3I6ICMyMjI7XFxuICBmb250LWZhbWlseTogTW9uYWNvLCBtb25vc3BhY2U7XFxuICBmb250LXNpemU6IDEwcHg7XFxuICBib3JkZXI6IDA7XFxuICByZXNpemU6IG5vbmU7XFxuICBib3gtc2hhZG93OiBpbnNldCAxcHggMXB4IDFweCAjODg4O1xcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xcbiAgbWFyZ2luOiAxMnB4IDA7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiA0NDBweDtcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG4gIGhlaWdodDogMTAwcHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4jZGctbG9jYWwtZXhwbGFpbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZm9udC1zaXplOiAxMXB4O1xcbiAgbGluZS1oZWlnaHQ6IDE3cHg7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzO1xcbiAgcGFkZGluZzogOHB4O1xcbiAgbWFyZ2luLXRvcDogMTBweDsgfVxcbiAgI2RnLWxvY2FsLWV4cGxhaW4gY29kZSB7XFxuICAgIGZvbnQtc2l6ZTogMTBweDsgfVxcblxcbiNkYXQtZ3VpLXNhdmUtbG9jYWxseSB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLyoqIE1haW4gdHlwZSAqL1xcbi5kZyB7XFxuICBjb2xvcjogI2VlZTtcXG4gIGZvbnQ6IDExcHggJ0x1Y2lkYSBHcmFuZGUnLCBzYW5zLXNlcmlmO1xcbiAgdGV4dC1zaGFkb3c6IDAgLTFweCAwICMxMTE7XFxuICAvKiogQXV0byBwbGFjZSAqL1xcbiAgLyogQ29udHJvbGxlciByb3csIDxsaT4gKi9cXG4gIC8qKiBDb250cm9sbGVycyAqLyB9XFxuICAuZGcubWFpbiB7XFxuICAgIC8qKiBTY3JvbGxiYXIgKi8gfVxcbiAgICAuZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgICAgIHdpZHRoOiA1cHg7XFxuICAgICAgYmFja2dyb3VuZDogIzFhMWExYTsgfVxcbiAgICAuZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyIHtcXG4gICAgICBoZWlnaHQ6IDA7XFxuICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgICAuZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgICBiYWNrZ3JvdW5kOiAjNjc2NzY3OyB9XFxuICAuZGcgbGk6bm90KC5mb2xkZXIpIHtcXG4gICAgYmFja2dyb3VuZDogIzFhMWExYTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMyYzJjMmM7IH1cXG4gIC5kZyBsaS5zYXZlLXJvdyB7XFxuICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZGFkNWNiO1xcbiAgICBib3JkZXI6IDA7IH1cXG4gICAgLmRnIGxpLnNhdmUtcm93IHNlbGVjdCB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcXG4gICAgICB3aWR0aDogMTA4cHg7IH1cXG4gICAgLmRnIGxpLnNhdmUtcm93IC5idXR0b24ge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XFxuICAgICAgbWFyZ2luLXRvcDogMXB4O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gICAgICBmb250LXNpemU6IDlweDtcXG4gICAgICBsaW5lLWhlaWdodDogN3B4O1xcbiAgICAgIHBhZGRpbmc6IDRweCA0cHggNXB4IDRweDtcXG4gICAgICBiYWNrZ3JvdW5kOiAjYzViZGFkO1xcbiAgICAgIGNvbG9yOiAjZmZmO1xcbiAgICAgIHRleHQtc2hhZG93OiAwIDFweCAwICNiMGE1OGY7XFxuICAgICAgYm94LXNoYWRvdzogMCAtMXB4IDAgI2IwYTU4ZjtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgICAuZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbi5nZWFycyB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjYzViZGFkIHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFzQUFBQU5DQVlBQUFCLzlaUTdBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQVFKSlJFRlVlTnBpWUtBVS9QLy9Qd0dJQy9BcENBQmlCU0FXK0k4QUNsQWNnS3hRNFQ5aG9NQUVVcnh4MlFTR042K2VnRFgrL3ZXVDRlN044MkFNWW9QQXgvZXZ3V29Zb1NZYkFDWDJzN0t4Q3h6Y3NlekRoM2V2Rm9ERUJZVEVFcXljZ2dXQXpBOUF1VVNRUWdlWVBhOWZQdjYvWVdtL0FjeDVJUGI3dHkvZncrUVpibHc2N3ZEczhSMFlIeVFoZ09ieCt5QUprQnFtRzVkUFBEaDFhUE9HUi9ldWdXMEc0dmxJb1RJZnlGY0ErUWVraGhISmhQZFF4YmlBSWd1TUJUUVpyUEQ3MTA4TTZyb1dZREZRaUlBQXY2QW93LzFiRndYZ2lzK2YyTFVBeW53b0lhTmN6OFhOeDNEbDdNRUpVREdRcHg5Z3RROFlDdWVCK0QyNk9FQ0FBUURhZHQ3ZTQ2RDQyUUFBQUFCSlJVNUVya0pnZ2c9PSkgMnB4IDFweCBuby1yZXBlYXQ7XFxuICAgICAgICBoZWlnaHQ6IDdweDtcXG4gICAgICAgIHdpZHRoOiA4cHg7IH1cXG4gICAgICAuZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbjpob3ZlciB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmFiMTllO1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAtMXB4IDAgI2IwYTU4ZjsgfVxcbiAgLmRnIGxpLmZvbGRlciB7XFxuICAgIGJvcmRlci1ib3R0b206IDA7IH1cXG4gIC5kZyBsaS50aXRsZSB7XFxuICAgIHBhZGRpbmctbGVmdDogMTZweDtcXG4gICAgYmFja2dyb3VuZDogIzAwMCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQlFBRkFKRUFBUC8vLy9QejgvLy8vLy8vL3lINUJBRUFBQUlBTEFBQUFBQUZBQVVBQUFJSWxJK2hLZ0Z4b0NnQU93PT0pIDZweCAxMHB4IG5vLXJlcGVhdDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpOyB9XFxuICAuZGcgLmNsb3NlZCBsaS50aXRsZSB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhCUUFGQUpFQUFQLy8vL1B6OC8vLy8vLy8veUg1QkFFQUFBSUFMQUFBQUFBRkFBVUFBQUlJbEdJV3FNQ2JXQUVBT3c9PSk7IH1cXG4gIC5kZyAuY3IuYm9vbGVhbiB7XFxuICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzgwNjc4NzsgfVxcbiAgLmRnIC5jci5jb2xvciB7XFxuICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQ7IH1cXG4gIC5kZyAuY3IuZnVuY3Rpb24ge1xcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICNlNjFkNWY7IH1cXG4gIC5kZyAuY3IubnVtYmVyIHtcXG4gICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjMkZBMUQ2OyB9XFxuICAgIC5kZyAuY3IubnVtYmVyIGlucHV0W3R5cGU9dGV4dF0ge1xcbiAgICAgIGNvbG9yOiAjMkZBMUQ2OyB9XFxuICAuZGcgLmNyLnN0cmluZyB7XFxuICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzFlZDM2ZjsgfVxcbiAgICAuZGcgLmNyLnN0cmluZyBpbnB1dFt0eXBlPXRleHRdIHtcXG4gICAgICBjb2xvcjogIzFlZDM2ZjsgfVxcbiAgLmRnIC5jci5mdW5jdGlvbjpob3ZlciwgLmRnIC5jci5ib29sZWFuOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogIzExMTsgfVxcbiAgLmRnIC5jIGlucHV0W3R5cGU9dGV4dF0ge1xcbiAgICBiYWNrZ3JvdW5kOiAjMzAzMDMwO1xcbiAgICBvdXRsaW5lOiBub25lOyB9XFxuICAgIC5kZyAuYyBpbnB1dFt0eXBlPXRleHRdOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjM2MzYzNjOyB9XFxuICAgIC5kZyAuYyBpbnB1dFt0eXBlPXRleHRdOmZvY3VzIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjNDk0OTQ5O1xcbiAgICAgIGNvbG9yOiAjZmZmOyB9XFxuICAuZGcgLmMgLnNsaWRlciB7XFxuICAgIGJhY2tncm91bmQ6ICMzMDMwMzA7XFxuICAgIGN1cnNvcjogZXctcmVzaXplOyB9XFxuICAuZGcgLmMgLnNsaWRlci1mZyB7XFxuICAgIGJhY2tncm91bmQ6ICMyRkExRDY7XFxuICAgIG1heC13aWR0aDogMTAwJTsgfVxcbiAgLmRnIC5jIC5zbGlkZXI6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiAjM2MzYzNjOyB9XFxuICAgIC5kZyAuYyAuc2xpZGVyOmhvdmVyIC5zbGlkZXItZmcge1xcbiAgICAgIGJhY2tncm91bmQ6ICM0NGFiZGE7IH1cXG5cIiwgXCJcIl0pO1xyXG5cdFxyXG5cdC8vIGV4cG9ydHNcclxuXHJcblxyXG4vKioqLyB9LFxyXG4vKiAyNCAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcclxuXHJcblx0LypcclxuXHRcdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0XHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcblx0Ki9cclxuXHQvLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgbGlzdCA9IFtdO1xyXG5cdFxyXG5cdFx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdFx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHRcdH07XHJcblx0XHJcblx0XHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdFx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGxpc3Q7XHJcblx0fTtcclxuXHJcblxyXG4vKioqLyB9XHJcbi8qKioqKiovIF0pXHJcbn0pO1xyXG47XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdC5ndWkuanMubWFwIiwiLyoqXHJcbiAqIEBhdXRob3IgYWx0ZXJlZHEgLyBodHRwOi8vYWx0ZXJlZHF1YWxpYS5jb20vXHJcbiAqIEBhdXRob3IgbXIuZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xyXG4gKi9cclxuXHJcbnZhciBEZXRlY3RvciA9IHtcclxuXHJcblx0Y2FudmFzOiAhISB3aW5kb3cuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxyXG5cdHdlYmdsOiAoIGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR0cnkge1xyXG5cclxuXHRcdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7IHJldHVybiAhISAoIHdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiYgKCBjYW52YXMuZ2V0Q29udGV4dCggJ3dlYmdsJyApIHx8IGNhbnZhcy5nZXRDb250ZXh0KCAnZXhwZXJpbWVudGFsLXdlYmdsJyApICkgKTtcclxuXHJcblx0XHR9IGNhdGNoICggZSApIHtcclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0gKSgpLFxyXG5cdHdvcmtlcnM6ICEhIHdpbmRvdy5Xb3JrZXIsXHJcblx0ZmlsZWFwaTogd2luZG93LkZpbGUgJiYgd2luZG93LkZpbGVSZWFkZXIgJiYgd2luZG93LkZpbGVMaXN0ICYmIHdpbmRvdy5CbG9iLFxyXG5cclxuXHRnZXRXZWJHTEVycm9yTWVzc2FnZTogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcclxuXHRcdGVsZW1lbnQuaWQgPSAnd2ViZ2wtZXJyb3ItbWVzc2FnZSc7XHJcblx0XHRlbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSAnbW9ub3NwYWNlJztcclxuXHRcdGVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSAnMTNweCc7XHJcblx0XHRlbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSAnbm9ybWFsJztcclxuXHRcdGVsZW1lbnQuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcblx0XHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZic7XHJcblx0XHRlbGVtZW50LnN0eWxlLmNvbG9yID0gJyMwMDAnO1xyXG5cdFx0ZWxlbWVudC5zdHlsZS5wYWRkaW5nID0gJzEuNWVtJztcclxuXHRcdGVsZW1lbnQuc3R5bGUud2lkdGggPSAnNDAwcHgnO1xyXG5cdFx0ZWxlbWVudC5zdHlsZS5tYXJnaW4gPSAnNWVtIGF1dG8gMCc7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMud2ViZ2wgKSB7XHJcblxyXG5cdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IHdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgPyBbXHJcblx0XHRcdFx0J1lvdXIgZ3JhcGhpY3MgY2FyZCBkb2VzIG5vdCBzZWVtIHRvIHN1cHBvcnQgPGEgaHJlZj1cImh0dHA6Ly9raHJvbm9zLm9yZy93ZWJnbC93aWtpL0dldHRpbmdfYV9XZWJHTF9JbXBsZW1lbnRhdGlvblwiIHN0eWxlPVwiY29sb3I6IzAwMFwiPldlYkdMPC9hPi48YnIgLz4nLFxyXG5cdFx0XHRcdCdGaW5kIG91dCBob3cgdG8gZ2V0IGl0IDxhIGhyZWY9XCJodHRwOi8vZ2V0LndlYmdsLm9yZy9cIiBzdHlsZT1cImNvbG9yOiMwMDBcIj5oZXJlPC9hPi4nXHJcblx0XHRcdF0uam9pbiggJ1xcbicgKSA6IFtcclxuXHRcdFx0XHQnWW91ciBicm93c2VyIGRvZXMgbm90IHNlZW0gdG8gc3VwcG9ydCA8YSBocmVmPVwiaHR0cDovL2tocm9ub3Mub3JnL3dlYmdsL3dpa2kvR2V0dGluZ19hX1dlYkdMX0ltcGxlbWVudGF0aW9uXCIgc3R5bGU9XCJjb2xvcjojMDAwXCI+V2ViR0w8L2E+Ljxici8+JyxcclxuXHRcdFx0XHQnRmluZCBvdXQgaG93IHRvIGdldCBpdCA8YSBocmVmPVwiaHR0cDovL2dldC53ZWJnbC5vcmcvXCIgc3R5bGU9XCJjb2xvcjojMDAwXCI+aGVyZTwvYT4uJ1xyXG5cdFx0XHRdLmpvaW4oICdcXG4nICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cclxuXHR9LFxyXG5cclxuXHRhZGRHZXRXZWJHTE1lc3NhZ2U6IGZ1bmN0aW9uICggcGFyYW1ldGVycyApIHtcclxuXHJcblx0XHR2YXIgcGFyZW50LCBpZCwgZWxlbWVudDtcclxuXHJcblx0XHRwYXJhbWV0ZXJzID0gcGFyYW1ldGVycyB8fCB7fTtcclxuXHJcblx0XHRwYXJlbnQgPSBwYXJhbWV0ZXJzLnBhcmVudCAhPT0gdW5kZWZpbmVkID8gcGFyYW1ldGVycy5wYXJlbnQgOiBkb2N1bWVudC5ib2R5O1xyXG5cdFx0aWQgPSBwYXJhbWV0ZXJzLmlkICE9PSB1bmRlZmluZWQgPyBwYXJhbWV0ZXJzLmlkIDogJ29sZGllJztcclxuXHJcblx0XHRlbGVtZW50ID0gRGV0ZWN0b3IuZ2V0V2ViR0xFcnJvck1lc3NhZ2UoKTtcclxuXHRcdGVsZW1lbnQuaWQgPSBpZDtcclxuXHJcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcclxuXHJcblx0fVxyXG5cclxufTtcclxuXHJcbi8vIGJyb3dzZXJpZnkgc3VwcG9ydFxyXG5pZiAoIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICkge1xyXG5cclxuXHRtb2R1bGUuZXhwb3J0cyA9IERldGVjdG9yO1xyXG5cclxufVxyXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyB1bmljb24udHNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0ICogYXMgR0wgICAgICAgICAgICAgICAgZnJvbSAnLi4vZW5naW5lL2dyYXBoaWMnO1xyXG4vL2ltcG9ydCB7QmVoYXZpb3VyICAgICAgICAgICB9IGZyb20gJy4uL2VuZ2luZS9iZWhhdmlvdXInO1xyXG4vL2ltcG9ydCB7Q2FtZXJhICAgICAgICAgICAgICB9IGZyb20gJy4uL2VuZ2luZS9jYW1lcmEnO1xyXG4vL2ltcG9ydCB7RWRpdG9yQXBwbGljYXRpb24gICB9IGZyb20gJy4uL2VkaXRvci9lZGl0b3ItYXBwbGljYXRpb24nO1xyXG4vL2ltcG9ydCB7R2FtZU9iamVjdCAgICAgICAgICB9IGZyb20gJy4uL2VuZ2luZS9nYW1lLW9iamVjdCc7XHJcbi8vaW1wb3J0IHtMaWdodCAgICAgICAgICAgICAgIH0gZnJvbSAnLi4vZW5naW5lL2xpZ2h0JztcclxuLy9pbXBvcnQge01lc2hSZW5kZXJlciAgICAgICAgfSBmcm9tICcuLi9lbmdpbmUvbWVzaC1yZW5kZXJlcic7XHJcbi8vaW1wb3J0IHtPcmJpdENvbnRyb2xzICAgICAgIH0gZnJvbSAnLi4vZWRpdG9yL29yYml0LWNvbnRyb2xzJztcclxuLy9pbXBvcnQge1ByaW1pdGl2ZVR5cGUgICAgICAgfSBmcm9tICcuLi9lbmdpbmUvcHJpbWl0aXZlLXR5cGUnO1xyXG4vL2ltcG9ydCB7UmVuZGVyZXIgICAgICAgICAgICB9IGZyb20gJy4uL2VuZ2luZS9yZW5kZXJlcic7XHJcbi8vaW1wb3J0IHtTY2VuZSAgICAgICAgICAgICAgIH0gZnJvbSAnLi4vZW5naW5lL3NjZW5lJztcclxuLy9pbXBvcnQge1RpbWUgICAgICAgICAgICAgICAgfSBmcm9tICcuLi9lbmdpbmUvdGltZSc7XHJcbi8vaW1wb3J0IHtWZWN0b3IzICAgICAgICAgICAgIH0gZnJvbSAnLi4vZW5naW5lL3ZlY3RvcjMnO1xyXG4vL2ltcG9ydCB7V2luZG93cyAgICAgICAgICAgICB9IGZyb20gJy4vd2luZG93cyc7XHJcbi8vXHJcbi8vaW1wb3J0IHtTY2VuZVZpZXcgICAgICAgICAgIH0gZnJvbSAnLi9zY2VuZS12aWV3JztcclxuXHJcbmxldCBEYXRHVUkgICAgICA9IHJlcXVpcmUoJy4uL2xpYi9kYXQuZ3VpL2J1aWxkL2RhdC5ndWknKTsgLy8g7KO87J2YIDog7ZiE7J6sIG5wbeyXkCAwLjYuMeuyhOyghOydgCDrrLjsoJzqsIAg7J6I64ukLlxyXG5sZXQgRGV0ZWN0b3IgICAgPSByZXF1aXJlKCcuLi9saWIvdGhyZWUuanMvZXhhbXBsZXMvanMvRGV0ZWN0b3InKTsgLy8gQHR5cGVzL3RocmVlL2RldGFjdG9y66W8IOyCrOyaqe2VmOuKlCDrsKnrspXsnYQg66qw65287IScIOy2lOqwgO2VqFxyXG5cclxubGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApO1xyXG5cclxuLyoqXHJcbiAqIHVuaWNvblxyXG4gKlxyXG4gKiBAYXV0aG9yIG1vc2ZyYW1lIC8gaHR0cHM6Ly9naXRodWIuY29tL21vc2ZyYW1lXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFVuaWNvblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVuaWNvbiB7XHJcblxyXG4gICAgLy8gWyBQdWJsaWMgVmFyaWFibGVzIF1cclxuXHJcbiAgICAvLyBbIENvbnN0cnVjdG9ycyBdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFVuaWNvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVW5pY29uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFsgUHVibGljIEZ1bmN0aW9ucyBdXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVuZGVyXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBVbmljb25cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB0aWNrXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBVbmljb25cclxuICAgICAqL1xyXG4gICAgdGljaygpIHtcclxuICAgICAgICAvL1RpbWUuX3RpY2soKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZVxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVW5pY29uXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgIH1cclxufVxyXG5cclxubGV0IHVuaWNvbiA9IG5ldyBVbmljb24oKTtcclxubGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoIHVuaWNvbi50aWNrLCAxMDAwLzMwICk7Il19
