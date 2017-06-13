(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (__dirname){
var fs = require('fs')
var path = require('path')

var pathFile = path.join(__dirname, 'path.txt')

if (fs.existsSync(pathFile)) {
  module.exports = path.join(__dirname, fs.readFileSync(pathFile, 'utf-8'))
} else {
  throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again')
}

}).call(this,"/node_modules\\electron")

},{"fs":1,"path":3}],3:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":4}],4:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],5:[function(require,module,exports){
(function (global){
/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],6:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],7:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],8:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":6,"./encode":7}],9:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var punycode = require('punycode');
var util = require('./util');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

},{"./util":10,"punycode":5,"querystring":8}],10:[function(require,module,exports){
'use strict';

module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
(function (process){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// -----------------------------------------------------------------------------
// unicon.ts
// -----------------------------------------------------------------------------
const electron_1 = require("electron");
const electron_2 = require("electron");
const path = require('path');
const url = require('url');
const datGUI = require('../lib/dat.gui/build/dat.gui'); // 주의 : 현재 npm에 0.6.1버전은 문제가 있다.
const detector = require('../lib/three.js/examples/js/Detector'); // @types/three/detactor를 사용하는 방법을 몰라서 추가함
/**
 * unicon
 *
 * @author mosframe ( https://github.com/mosframe )
 *
 * @export
 * @class Unicon
 */
class Unicon {
    // [ Public Variables ]
    // [ Constructors ]
    /**
     * Creates an instance of Unicon.
     *
     * @memberof Unicon
     */
    constructor() {
        // [ main window ]
        electron_1.app.on('ready', this._createWindow);
        electron_1.app.on('window-all-closed', function () {
            if (process.platform !== 'darwin') {
                electron_1.app.quit();
            }
        });
        electron_1.app.on('activate', function () {
            if (this._mainWindow === null) {
                this.createWindow();
            }
        });
    }
    // [ Protected Functions ]
    _createWindow() {
        this._mainWindow = new electron_2.BrowserWindow({
            webPreferences: {
                nodeIntegration: false
            }
        });
        this._mainWindow.maximize();
        //this._mainWindow.setMenu( new Electron.Menu() );
        //this._mainWindow.loadURL(
        //    url.format( {
        //        pathname: path.join( __dirname, 'index.html' ),
        //        protocol: 'file:',
        //        slashes: true
        //    } )
        //);
        this._mainWindow.on('closed', function () {
            this._mainWindow = null;
        });
    }
}
exports.Unicon = Unicon;
let unicon = new Unicon();
}).call(this,require('_process'))

},{"../lib/dat.gui/build/dat.gui":11,"../lib/three.js/examples/js/Detector":12,"_process":4,"electron":2,"path":3,"url":9}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2VsZWN0cm9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcHVueWNvZGUvcHVueWNvZGUuanMiLCJub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2RlY29kZS5qcyIsIm5vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwibm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy91cmwvdXJsLmpzIiwibm9kZV9tb2R1bGVzL3VybC91dGlsLmpzIiwic2VydmVyL2xpYi9kYXQuZ3VpL2J1aWxkL2RhdC5ndWkuanMiLCJzZXJ2ZXIvbGliL3RocmVlLmpzL2V4YW1wbGVzL2pzL0RldGVjdG9yLmpzIiwic2VydmVyL3Rvb2wvdW5pY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzV0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuc0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzlFQSxnRkFBZ0Y7QUFDaEYsWUFBWTtBQUNaLGdGQUFnRjtBQUNoRix1Q0FBMEM7QUFDMUMsdUNBQTBDO0FBRzFDLE1BQU0sSUFBSSxHQUFRLE9BQU8sQ0FBRSxNQUFNLENBQUUsQ0FBQztBQUNwQyxNQUFNLEdBQUcsR0FBUyxPQUFPLENBQUUsS0FBSyxDQUFFLENBQUM7QUFDbkMsTUFBTSxNQUFNLEdBQU0sT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxnQ0FBZ0M7QUFDM0YsTUFBTSxRQUFRLEdBQUksT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsQ0FBQywwQ0FBMEM7QUFFN0c7Ozs7Ozs7R0FPRztBQUNIO0lBRUksdUJBQXVCO0lBRXZCLG1CQUFtQjtJQUVuQjs7OztPQUlHO0lBQ0g7UUFFSSxrQkFBa0I7UUFFbEIsY0FBRyxDQUFDLEVBQUUsQ0FBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBRSxDQUFDO1FBRXRDLGNBQUcsQ0FBQyxFQUFFLENBQUUsbUJBQW1CLEVBQUU7WUFDekIsRUFBRSxDQUFBLENBQUUsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxjQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDO1FBQ0wsQ0FBQyxDQUFFLENBQUM7UUFFSixjQUFHLENBQUMsRUFBRSxDQUFFLFVBQVUsRUFBRTtZQUNoQixFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QixDQUFDO1FBQ0wsQ0FBQyxDQUFFLENBQUM7SUFDUixDQUFDO0lBWUQsMEJBQTBCO0lBRWhCLGFBQWE7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHdCQUFhLENBQUU7WUFDbEMsY0FBYyxFQUFDO2dCQUNYLGVBQWUsRUFBRSxLQUFLO2FBQ3pCO1NBQ0osQ0FBRSxDQUFDO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixrREFBa0Q7UUFDbEQsMkJBQTJCO1FBQzNCLG1CQUFtQjtRQUNuQix5REFBeUQ7UUFDekQsNEJBQTRCO1FBQzVCLHVCQUF1QjtRQUN2QixTQUFTO1FBQ1QsSUFBSTtRQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFFLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDLENBQUUsQ0FBQztJQUNSLENBQUM7Q0FLSjtBQWpFRCx3QkFpRUM7QUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiIsInZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbnZhciBwYXRoRmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICdwYXRoLnR4dCcpXG5cbmlmIChmcy5leGlzdHNTeW5jKHBhdGhGaWxlKSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IHBhdGguam9pbihfX2Rpcm5hbWUsIGZzLnJlYWRGaWxlU3luYyhwYXRoRmlsZSwgJ3V0Zi04JykpXG59IGVsc2Uge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0VsZWN0cm9uIGZhaWxlZCB0byBpbnN0YWxsIGNvcnJlY3RseSwgcGxlYXNlIGRlbGV0ZSBub2RlX21vZHVsZXMvZWxlY3Ryb24gYW5kIHRyeSBpbnN0YWxsaW5nIGFnYWluJylcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyByZXNvbHZlcyAuIGFuZCAuLiBlbGVtZW50cyBpbiBhIHBhdGggYXJyYXkgd2l0aCBkaXJlY3RvcnkgbmFtZXMgdGhlcmVcbi8vIG11c3QgYmUgbm8gc2xhc2hlcywgZW1wdHkgZWxlbWVudHMsIG9yIGRldmljZSBuYW1lcyAoYzpcXCkgaW4gdGhlIGFycmF5XG4vLyAoc28gYWxzbyBubyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzIC0gaXQgZG9lcyBub3QgZGlzdGluZ3Vpc2hcbi8vIHJlbGF0aXZlIGFuZCBhYnNvbHV0ZSBwYXRocylcbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5KHBhcnRzLCBhbGxvd0Fib3ZlUm9vdCkge1xuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgbGFzdCA9IHBhcnRzW2ldO1xuICAgIGlmIChsYXN0ID09PSAnLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG4gIGlmIChhbGxvd0Fib3ZlUm9vdCkge1xuICAgIGZvciAoOyB1cC0tOyB1cCkge1xuICAgICAgcGFydHMudW5zaGlmdCgnLi4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFydHM7XG59XG5cbi8vIFNwbGl0IGEgZmlsZW5hbWUgaW50byBbcm9vdCwgZGlyLCBiYXNlbmFtZSwgZXh0XSwgdW5peCB2ZXJzaW9uXG4vLyAncm9vdCcgaXMganVzdCBhIHNsYXNoLCBvciBub3RoaW5nLlxudmFyIHNwbGl0UGF0aFJlID1cbiAgICAvXihcXC8/fCkoW1xcc1xcU10qPykoKD86XFwuezEsMn18W15cXC9dKz98KShcXC5bXi5cXC9dKnwpKSg/OltcXC9dKikkLztcbnZhciBzcGxpdFBhdGggPSBmdW5jdGlvbihmaWxlbmFtZSkge1xuICByZXR1cm4gc3BsaXRQYXRoUmUuZXhlYyhmaWxlbmFtZSkuc2xpY2UoMSk7XG59O1xuXG4vLyBwYXRoLnJlc29sdmUoW2Zyb20gLi4uXSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc29sdmVkUGF0aCA9ICcnLFxuICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAtMSAmJiAhcmVzb2x2ZWRBYnNvbHV0ZTsgaS0tKSB7XG4gICAgdmFyIHBhdGggPSAoaSA+PSAwKSA/IGFyZ3VtZW50c1tpXSA6IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAvLyBTa2lwIGVtcHR5IGFuZCBpbnZhbGlkIGVudHJpZXNcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH0gZWxzZSBpZiAoIXBhdGgpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IHBhdGguY2hhckF0KDApID09PSAnLyc7XG4gIH1cblxuICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XG4gIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocmVzb2x2ZWRQYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICByZXR1cm4gKChyZXNvbHZlZEFic29sdXRlID8gJy8nIDogJycpICsgcmVzb2x2ZWRQYXRoKSB8fCAnLic7XG59O1xuXG4vLyBwYXRoLm5vcm1hbGl6ZShwYXRoKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5ub3JtYWxpemUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpLFxuICAgICAgdHJhaWxpbmdTbGFzaCA9IHN1YnN0cihwYXRoLCAtMSkgPT09ICcvJztcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIWlzQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICBpZiAoIXBhdGggJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBwYXRoID0gJy4nO1xuICB9XG4gIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcbiAgICBwYXRoICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiAoaXNBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGg7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5qb2luID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwYXRocyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsIGZ1bmN0aW9uKHAsIGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBwICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0pLmpvaW4oJy8nKSk7XG59O1xuXG5cbi8vIHBhdGgucmVsYXRpdmUoZnJvbSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlbGF0aXZlID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgZnJvbSA9IGV4cG9ydHMucmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7XG4gIHRvID0gZXhwb3J0cy5yZXNvbHZlKHRvKS5zdWJzdHIoMSk7XG5cbiAgZnVuY3Rpb24gdHJpbShhcnIpIHtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIGZvciAoOyBzdGFydCA8IGFyci5sZW5ndGg7IHN0YXJ0KyspIHtcbiAgICAgIGlmIChhcnJbc3RhcnRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGVuZCA9IGFyci5sZW5ndGggLSAxO1xuICAgIGZvciAoOyBlbmQgPj0gMDsgZW5kLS0pIHtcbiAgICAgIGlmIChhcnJbZW5kXSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0ICsgMSk7XG4gIH1cblxuICB2YXIgZnJvbVBhcnRzID0gdHJpbShmcm9tLnNwbGl0KCcvJykpO1xuICB2YXIgdG9QYXJ0cyA9IHRyaW0odG8uc3BsaXQoJy8nKSk7XG5cbiAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsIHRvUGFydHMubGVuZ3RoKTtcbiAgdmFyIHNhbWVQYXJ0c0xlbmd0aCA9IGxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChmcm9tUGFydHNbaV0gIT09IHRvUGFydHNbaV0pIHtcbiAgICAgIHNhbWVQYXJ0c0xlbmd0aCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgb3V0cHV0UGFydHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IHNhbWVQYXJ0c0xlbmd0aDsgaSA8IGZyb21QYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIG91dHB1dFBhcnRzLnB1c2goJy4uJyk7XG4gIH1cblxuICBvdXRwdXRQYXJ0cyA9IG91dHB1dFBhcnRzLmNvbmNhdCh0b1BhcnRzLnNsaWNlKHNhbWVQYXJ0c0xlbmd0aCkpO1xuXG4gIHJldHVybiBvdXRwdXRQYXJ0cy5qb2luKCcvJyk7XG59O1xuXG5leHBvcnRzLnNlcCA9ICcvJztcbmV4cG9ydHMuZGVsaW1pdGVyID0gJzonO1xuXG5leHBvcnRzLmRpcm5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciByZXN1bHQgPSBzcGxpdFBhdGgocGF0aCksXG4gICAgICByb290ID0gcmVzdWx0WzBdLFxuICAgICAgZGlyID0gcmVzdWx0WzFdO1xuXG4gIGlmICghcm9vdCAmJiAhZGlyKSB7XG4gICAgLy8gTm8gZGlybmFtZSB3aGF0c29ldmVyXG4gICAgcmV0dXJuICcuJztcbiAgfVxuXG4gIGlmIChkaXIpIHtcbiAgICAvLyBJdCBoYXMgYSBkaXJuYW1lLCBzdHJpcCB0cmFpbGluZyBzbGFzaFxuICAgIGRpciA9IGRpci5zdWJzdHIoMCwgZGlyLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgcmV0dXJuIHJvb3QgKyBkaXI7XG59O1xuXG5cbmV4cG9ydHMuYmFzZW5hbWUgPSBmdW5jdGlvbihwYXRoLCBleHQpIHtcbiAgdmFyIGYgPSBzcGxpdFBhdGgocGF0aClbMl07XG4gIC8vIFRPRE86IG1ha2UgdGhpcyBjb21wYXJpc29uIGNhc2UtaW5zZW5zaXRpdmUgb24gd2luZG93cz9cbiAgaWYgKGV4dCAmJiBmLnN1YnN0cigtMSAqIGV4dC5sZW5ndGgpID09PSBleHQpIHtcbiAgICBmID0gZi5zdWJzdHIoMCwgZi5sZW5ndGggLSBleHQubGVuZ3RoKTtcbiAgfVxuICByZXR1cm4gZjtcbn07XG5cblxuZXhwb3J0cy5leHRuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gc3BsaXRQYXRoKHBhdGgpWzNdO1xufTtcblxuZnVuY3Rpb24gZmlsdGVyICh4cywgZikge1xuICAgIGlmICh4cy5maWx0ZXIpIHJldHVybiB4cy5maWx0ZXIoZik7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGYoeHNbaV0sIGksIHhzKSkgcmVzLnB1c2goeHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG4vLyBTdHJpbmcucHJvdG90eXBlLnN1YnN0ciAtIG5lZ2F0aXZlIGluZGV4IGRvbid0IHdvcmsgaW4gSUU4XG52YXIgc3Vic3RyID0gJ2FiJy5zdWJzdHIoLTEpID09PSAnYidcbiAgICA/IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHsgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbikgfVxuICAgIDogZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikge1xuICAgICAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IHN0ci5sZW5ndGggKyBzdGFydDtcbiAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbik7XG4gICAgfVxuO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qISBodHRwczovL210aHMuYmUvcHVueWNvZGUgdjEuNC4xIGJ5IEBtYXRoaWFzICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGVzICovXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiZcblx0XHQhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0IW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChcblx0XHRmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC5zZWxmID09PSBmcmVlR2xvYmFsXG5cdCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBgcHVueWNvZGVgIG9iamVjdC5cblx0ICogQG5hbWUgcHVueWNvZGVcblx0ICogQHR5cGUgT2JqZWN0XG5cdCAqL1xuXHR2YXIgcHVueWNvZGUsXG5cblx0LyoqIEhpZ2hlc3QgcG9zaXRpdmUgc2lnbmVkIDMyLWJpdCBmbG9hdCB2YWx1ZSAqL1xuXHRtYXhJbnQgPSAyMTQ3NDgzNjQ3LCAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG5cblx0LyoqIEJvb3RzdHJpbmcgcGFyYW1ldGVycyAqL1xuXHRiYXNlID0gMzYsXG5cdHRNaW4gPSAxLFxuXHR0TWF4ID0gMjYsXG5cdHNrZXcgPSAzOCxcblx0ZGFtcCA9IDcwMCxcblx0aW5pdGlhbEJpYXMgPSA3Mixcblx0aW5pdGlhbE4gPSAxMjgsIC8vIDB4ODBcblx0ZGVsaW1pdGVyID0gJy0nLCAvLyAnXFx4MkQnXG5cblx0LyoqIFJlZ3VsYXIgZXhwcmVzc2lvbnMgKi9cblx0cmVnZXhQdW55Y29kZSA9IC9eeG4tLS8sXG5cdHJlZ2V4Tm9uQVNDSUkgPSAvW15cXHgyMC1cXHg3RV0vLCAvLyB1bnByaW50YWJsZSBBU0NJSSBjaGFycyArIG5vbi1BU0NJSSBjaGFyc1xuXHRyZWdleFNlcGFyYXRvcnMgPSAvW1xceDJFXFx1MzAwMlxcdUZGMEVcXHVGRjYxXS9nLCAvLyBSRkMgMzQ5MCBzZXBhcmF0b3JzXG5cblx0LyoqIEVycm9yIG1lc3NhZ2VzICovXG5cdGVycm9ycyA9IHtcblx0XHQnb3ZlcmZsb3cnOiAnT3ZlcmZsb3c6IGlucHV0IG5lZWRzIHdpZGVyIGludGVnZXJzIHRvIHByb2Nlc3MnLFxuXHRcdCdub3QtYmFzaWMnOiAnSWxsZWdhbCBpbnB1dCA+PSAweDgwIChub3QgYSBiYXNpYyBjb2RlIHBvaW50KScsXG5cdFx0J2ludmFsaWQtaW5wdXQnOiAnSW52YWxpZCBpbnB1dCdcblx0fSxcblxuXHQvKiogQ29udmVuaWVuY2Ugc2hvcnRjdXRzICovXG5cdGJhc2VNaW51c1RNaW4gPSBiYXNlIC0gdE1pbixcblx0Zmxvb3IgPSBNYXRoLmZsb29yLFxuXHRzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLFxuXG5cdC8qKiBUZW1wb3JhcnkgdmFyaWFibGUgKi9cblx0a2V5O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgZXJyb3IgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIGVycm9yIHR5cGUuXG5cdCAqIEByZXR1cm5zIHtFcnJvcn0gVGhyb3dzIGEgYFJhbmdlRXJyb3JgIHdpdGggdGhlIGFwcGxpY2FibGUgZXJyb3IgbWVzc2FnZS5cblx0ICovXG5cdGZ1bmN0aW9uIGVycm9yKHR5cGUpIHtcblx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcblx0ICogaXRlbS5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdHdoaWxlIChsZW5ndGgtLSkge1xuXHRcdFx0cmVzdWx0W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3Mgb3IgZW1haWxcblx0ICogYWRkcmVzc2VzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZG9tYWluIFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0dmFyIHBhcnRzID0gc3RyaW5nLnNwbGl0KCdAJyk7XG5cdFx0dmFyIHJlc3VsdCA9ICcnO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG5cdFx0XHQvLyBJbiBlbWFpbCBhZGRyZXNzZXMsIG9ubHkgdGhlIGRvbWFpbiBuYW1lIHNob3VsZCBiZSBwdW55Y29kZWQuIExlYXZlXG5cdFx0XHQvLyB0aGUgbG9jYWwgcGFydCAoaS5lLiBldmVyeXRoaW5nIHVwIHRvIGBAYCkgaW50YWN0LlxuXHRcdFx0cmVzdWx0ID0gcGFydHNbMF0gKyAnQCc7XG5cdFx0XHRzdHJpbmcgPSBwYXJ0c1sxXTtcblx0XHR9XG5cdFx0Ly8gQXZvaWQgYHNwbGl0KHJlZ2V4KWAgZm9yIElFOCBjb21wYXRpYmlsaXR5LiBTZWUgIzE3LlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xceDJFJyk7XG5cdFx0dmFyIGxhYmVscyA9IHN0cmluZy5zcGxpdCgnLicpO1xuXHRcdHZhciBlbmNvZGVkID0gbWFwKGxhYmVscywgZm4pLmpvaW4oJy4nKTtcblx0XHRyZXR1cm4gcmVzdWx0ICsgZW5jb2RlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG5cdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0ICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcblx0ICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG5cdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG5cdCAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBkZWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgVW5pY29kZSBpbnB1dCBzdHJpbmcgKFVDUy0yKS5cblx0ICogQHJldHVybnMge0FycmF5fSBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGNvdW50ZXIgPSAwLFxuXHRcdCAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuXHRcdCAgICB2YWx1ZSxcblx0XHQgICAgZXh0cmE7XG5cdFx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0aWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7IC8vIGxvdyBzdXJyb2dhdGVcblx0XHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG5cdFx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBzdHJpbmcgYmFzZWQgb24gYW4gYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5kZWNvZGVgXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGVuY29kZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb2RlUG9pbnRzIFRoZSBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgbmV3IFVuaWNvZGUgc3RyaW5nIChVQ1MtMikuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0cmV0dXJuIG1hcChhcnJheSwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHR2YWx1ZSAtPSAweDEwMDAwO1xuXHRcdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgYmFzaWMgY29kZSBwb2ludCBpbnRvIGEgZGlnaXQvaW50ZWdlci5cblx0ICogQHNlZSBgZGlnaXRUb0Jhc2ljKClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlUG9pbnQgVGhlIGJhc2ljIG51bWVyaWMgY29kZSBwb2ludCB2YWx1ZS5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50IChmb3IgdXNlIGluXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaW4gdGhlIHJhbmdlIGAwYCB0byBgYmFzZSAtIDFgLCBvciBgYmFzZWAgaWZcblx0ICogdGhlIGNvZGUgcG9pbnQgZG9lcyBub3QgcmVwcmVzZW50IGEgdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBiYXNpY1RvRGlnaXQoY29kZVBvaW50KSB7XG5cdFx0aWYgKGNvZGVQb2ludCAtIDQ4IDwgMTApIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSAyMjtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDY1IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA2NTtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDk3IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA5Nztcblx0XHR9XG5cdFx0cmV0dXJuIGJhc2U7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBkaWdpdC9pbnRlZ2VyIGludG8gYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAc2VlIGBiYXNpY1RvRGlnaXQoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpZ2l0IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2ljIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgKHdoZW4gdXNlZCBmb3Jcblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpcyBgZGlnaXRgLCB3aGljaCBuZWVkcyB0byBiZSBpbiB0aGUgcmFuZ2Vcblx0ICogYDBgIHRvIGBiYXNlIC0gMWAuIElmIGBmbGFnYCBpcyBub24temVybywgdGhlIHVwcGVyY2FzZSBmb3JtIGlzXG5cdCAqIHVzZWQ7IGVsc2UsIHRoZSBsb3dlcmNhc2UgZm9ybSBpcyB1c2VkLiBUaGUgYmVoYXZpb3IgaXMgdW5kZWZpbmVkXG5cdCAqIGlmIGBmbGFnYCBpcyBub24temVybyBhbmQgYGRpZ2l0YCBoYXMgbm8gdXBwZXJjYXNlIGZvcm0uXG5cdCAqL1xuXHRmdW5jdGlvbiBkaWdpdFRvQmFzaWMoZGlnaXQsIGZsYWcpIHtcblx0XHQvLyAgMC4uMjUgbWFwIHRvIEFTQ0lJIGEuLnogb3IgQS4uWlxuXHRcdC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuXHRcdHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNikgLSAoKGZsYWcgIT0gMCkgPDwgNSk7XG5cdH1cblxuXHQvKipcblx0ICogQmlhcyBhZGFwdGF0aW9uIGZ1bmN0aW9uIGFzIHBlciBzZWN0aW9uIDMuNCBvZiBSRkMgMzQ5Mi5cblx0ICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHRcdHZhciBrID0gMDtcblx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0XHRmb3IgKC8qIG5vIGluaXRpYWxpemF0aW9uICovOyBkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHQgKiBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHQvLyBEb24ndCB1c2UgVUNTLTJcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICBvdXQsXG5cdFx0ICAgIGkgPSAwLFxuXHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0ICAgIGJpYXMgPSBpbml0aWFsQmlhcyxcblx0XHQgICAgYmFzaWMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIGluZGV4LFxuXHRcdCAgICBvbGRpLFxuXHRcdCAgICB3LFxuXHRcdCAgICBrLFxuXHRcdCAgICBkaWdpdCxcblx0XHQgICAgdCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcblx0ICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3Ncblx0ICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuXHQgKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cblx0ICogY29udmVydGVkIHRvIFVuaWNvZGUuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG5cdCAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuXHQgKiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG5cdCAqIFVuaWNvZGUgc3RyaW5nLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG5cdCAqIGVtYWlsIGFkZHJlc3MuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyAneG4tLScgKyBlbmNvZGUoc3RyaW5nKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cblx0cHVueWNvZGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIFN0cmluZ1xuXHRcdCAqL1xuXHRcdCd2ZXJzaW9uJzogJzEuNC4xJyxcblx0XHQvKipcblx0XHQgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuXHRcdCAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG5cdFx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoJ3B1bnljb2RlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cykge1xuXHRcdFx0Ly8gaW4gTm9kZS5qcywgaW8uanMsIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gcHVueWNvZGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKGtleSBpbiBwdW55Y29kZSkge1xuXHRcdFx0XHRwdW55Y29kZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gcHVueWNvZGVba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnB1bnljb2RlID0gcHVueWNvZGU7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJZiBvYmouaGFzT3duUHJvcGVydHkgaGFzIGJlZW4gb3ZlcnJpZGRlbiwgdGhlbiBjYWxsaW5nXG4vLyBvYmouaGFzT3duUHJvcGVydHkocHJvcCkgd2lsbCBicmVhay5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzA3XG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHFzLCBzZXAsIGVxLCBvcHRpb25zKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICB2YXIgb2JqID0ge307XG5cbiAgaWYgKHR5cGVvZiBxcyAhPT0gJ3N0cmluZycgfHwgcXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciByZWdleHAgPSAvXFwrL2c7XG4gIHFzID0gcXMuc3BsaXQoc2VwKTtcblxuICB2YXIgbWF4S2V5cyA9IDEwMDA7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLm1heEtleXMgPT09ICdudW1iZXInKSB7XG4gICAgbWF4S2V5cyA9IG9wdGlvbnMubWF4S2V5cztcbiAgfVxuXG4gIHZhciBsZW4gPSBxcy5sZW5ndGg7XG4gIC8vIG1heEtleXMgPD0gMCBtZWFucyB0aGF0IHdlIHNob3VsZCBub3QgbGltaXQga2V5cyBjb3VudFxuICBpZiAobWF4S2V5cyA+IDAgJiYgbGVuID4gbWF4S2V5cykge1xuICAgIGxlbiA9IG1heEtleXM7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIHggPSBxc1tpXS5yZXBsYWNlKHJlZ2V4cCwgJyUyMCcpLFxuICAgICAgICBpZHggPSB4LmluZGV4T2YoZXEpLFxuICAgICAgICBrc3RyLCB2c3RyLCBrLCB2O1xuXG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICBrc3RyID0geC5zdWJzdHIoMCwgaWR4KTtcbiAgICAgIHZzdHIgPSB4LnN1YnN0cihpZHggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAga3N0ciA9IHg7XG4gICAgICB2c3RyID0gJyc7XG4gICAgfVxuXG4gICAgayA9IGRlY29kZVVSSUNvbXBvbmVudChrc3RyKTtcbiAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZzdHIpO1xuXG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGspKSB7XG4gICAgICBvYmpba10gPSB2O1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICBvYmpba10ucHVzaCh2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2tdID0gW29ialtrXSwgdl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdjtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHYgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh2KSA/IHYgOiAnJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgb2JqID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG1hcChvYmplY3RLZXlzKG9iaiksIGZ1bmN0aW9uKGspIHtcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG4gICAgICBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIHJldHVybiBtYXAob2JqW2tdLCBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XG4gIGlmICh4cy5tYXApIHJldHVybiB4cy5tYXAoZik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgIHJlcy5wdXNoKGYoeHNbaV0sIGkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJlcy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwdW55Y29kZSA9IHJlcXVpcmUoJ3B1bnljb2RlJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5leHBvcnRzLnBhcnNlID0gdXJsUGFyc2U7XG5leHBvcnRzLnJlc29sdmUgPSB1cmxSZXNvbHZlO1xuZXhwb3J0cy5yZXNvbHZlT2JqZWN0ID0gdXJsUmVzb2x2ZU9iamVjdDtcbmV4cG9ydHMuZm9ybWF0ID0gdXJsRm9ybWF0O1xuXG5leHBvcnRzLlVybCA9IFVybDtcblxuZnVuY3Rpb24gVXJsKCkge1xuICB0aGlzLnByb3RvY29sID0gbnVsbDtcbiAgdGhpcy5zbGFzaGVzID0gbnVsbDtcbiAgdGhpcy5hdXRoID0gbnVsbDtcbiAgdGhpcy5ob3N0ID0gbnVsbDtcbiAgdGhpcy5wb3J0ID0gbnVsbDtcbiAgdGhpcy5ob3N0bmFtZSA9IG51bGw7XG4gIHRoaXMuaGFzaCA9IG51bGw7XG4gIHRoaXMuc2VhcmNoID0gbnVsbDtcbiAgdGhpcy5xdWVyeSA9IG51bGw7XG4gIHRoaXMucGF0aG5hbWUgPSBudWxsO1xuICB0aGlzLnBhdGggPSBudWxsO1xuICB0aGlzLmhyZWYgPSBudWxsO1xufVxuXG4vLyBSZWZlcmVuY2U6IFJGQyAzOTg2LCBSRkMgMTgwOCwgUkZDIDIzOTZcblxuLy8gZGVmaW5lIHRoZXNlIGhlcmUgc28gYXQgbGVhc3QgdGhleSBvbmx5IGhhdmUgdG8gYmVcbi8vIGNvbXBpbGVkIG9uY2Ugb24gdGhlIGZpcnN0IG1vZHVsZSBsb2FkLlxudmFyIHByb3RvY29sUGF0dGVybiA9IC9eKFthLXowLTkuKy1dKzopL2ksXG4gICAgcG9ydFBhdHRlcm4gPSAvOlswLTldKiQvLFxuXG4gICAgLy8gU3BlY2lhbCBjYXNlIGZvciBhIHNpbXBsZSBwYXRoIFVSTFxuICAgIHNpbXBsZVBhdGhQYXR0ZXJuID0gL14oXFwvXFwvPyg/IVxcLylbXlxcP1xcc10qKShcXD9bXlxcc10qKT8kLyxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIHJlc2VydmVkIGZvciBkZWxpbWl0aW5nIFVSTHMuXG4gICAgLy8gV2UgYWN0dWFsbHkganVzdCBhdXRvLWVzY2FwZSB0aGVzZS5cbiAgICBkZWxpbXMgPSBbJzwnLCAnPicsICdcIicsICdgJywgJyAnLCAnXFxyJywgJ1xcbicsICdcXHQnXSxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkIGZvciB2YXJpb3VzIHJlYXNvbnMuXG4gICAgdW53aXNlID0gWyd7JywgJ30nLCAnfCcsICdcXFxcJywgJ14nLCAnYCddLmNvbmNhdChkZWxpbXMpLFxuXG4gICAgLy8gQWxsb3dlZCBieSBSRkNzLCBidXQgY2F1c2Ugb2YgWFNTIGF0dGFja3MuICBBbHdheXMgZXNjYXBlIHRoZXNlLlxuICAgIGF1dG9Fc2NhcGUgPSBbJ1xcJyddLmNvbmNhdCh1bndpc2UpLFxuICAgIC8vIENoYXJhY3RlcnMgdGhhdCBhcmUgbmV2ZXIgZXZlciBhbGxvd2VkIGluIGEgaG9zdG5hbWUuXG4gICAgLy8gTm90ZSB0aGF0IGFueSBpbnZhbGlkIGNoYXJzIGFyZSBhbHNvIGhhbmRsZWQsIGJ1dCB0aGVzZVxuICAgIC8vIGFyZSB0aGUgb25lcyB0aGF0IGFyZSAqZXhwZWN0ZWQqIHRvIGJlIHNlZW4sIHNvIHdlIGZhc3QtcGF0aFxuICAgIC8vIHRoZW0uXG4gICAgbm9uSG9zdENoYXJzID0gWyclJywgJy8nLCAnPycsICc7JywgJyMnXS5jb25jYXQoYXV0b0VzY2FwZSksXG4gICAgaG9zdEVuZGluZ0NoYXJzID0gWycvJywgJz8nLCAnIyddLFxuICAgIGhvc3RuYW1lTWF4TGVuID0gMjU1LFxuICAgIGhvc3RuYW1lUGFydFBhdHRlcm4gPSAvXlsrYS16MC05QS1aXy1dezAsNjN9JC8sXG4gICAgaG9zdG5hbWVQYXJ0U3RhcnQgPSAvXihbK2EtejAtOUEtWl8tXXswLDYzfSkoLiopJC8sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgY2FuIGFsbG93IFwidW5zYWZlXCIgYW5kIFwidW53aXNlXCIgY2hhcnMuXG4gICAgdW5zYWZlUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBuZXZlciBoYXZlIGEgaG9zdG5hbWUuXG4gICAgaG9zdGxlc3NQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IGFsd2F5cyBjb250YWluIGEgLy8gYml0LlxuICAgIHNsYXNoZWRQcm90b2NvbCA9IHtcbiAgICAgICdodHRwJzogdHJ1ZSxcbiAgICAgICdodHRwcyc6IHRydWUsXG4gICAgICAnZnRwJzogdHJ1ZSxcbiAgICAgICdnb3BoZXInOiB0cnVlLFxuICAgICAgJ2ZpbGUnOiB0cnVlLFxuICAgICAgJ2h0dHA6JzogdHJ1ZSxcbiAgICAgICdodHRwczonOiB0cnVlLFxuICAgICAgJ2Z0cDonOiB0cnVlLFxuICAgICAgJ2dvcGhlcjonOiB0cnVlLFxuICAgICAgJ2ZpbGU6JzogdHJ1ZVxuICAgIH0sXG4gICAgcXVlcnlzdHJpbmcgPSByZXF1aXJlKCdxdWVyeXN0cmluZycpO1xuXG5mdW5jdGlvbiB1cmxQYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICh1cmwgJiYgdXRpbC5pc09iamVjdCh1cmwpICYmIHVybCBpbnN0YW5jZW9mIFVybCkgcmV0dXJuIHVybDtcblxuICB2YXIgdSA9IG5ldyBVcmw7XG4gIHUucGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCk7XG4gIHJldHVybiB1O1xufVxuXG5VcmwucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24odXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAoIXV0aWwuaXNTdHJpbmcodXJsKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQYXJhbWV0ZXIgJ3VybCcgbXVzdCBiZSBhIHN0cmluZywgbm90IFwiICsgdHlwZW9mIHVybCk7XG4gIH1cblxuICAvLyBDb3B5IGNocm9tZSwgSUUsIG9wZXJhIGJhY2tzbGFzaC1oYW5kbGluZyBiZWhhdmlvci5cbiAgLy8gQmFjayBzbGFzaGVzIGJlZm9yZSB0aGUgcXVlcnkgc3RyaW5nIGdldCBjb252ZXJ0ZWQgdG8gZm9yd2FyZCBzbGFzaGVzXG4gIC8vIFNlZTogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI1OTE2XG4gIHZhciBxdWVyeUluZGV4ID0gdXJsLmluZGV4T2YoJz8nKSxcbiAgICAgIHNwbGl0dGVyID1cbiAgICAgICAgICAocXVlcnlJbmRleCAhPT0gLTEgJiYgcXVlcnlJbmRleCA8IHVybC5pbmRleE9mKCcjJykpID8gJz8nIDogJyMnLFxuICAgICAgdVNwbGl0ID0gdXJsLnNwbGl0KHNwbGl0dGVyKSxcbiAgICAgIHNsYXNoUmVnZXggPSAvXFxcXC9nO1xuICB1U3BsaXRbMF0gPSB1U3BsaXRbMF0ucmVwbGFjZShzbGFzaFJlZ2V4LCAnLycpO1xuICB1cmwgPSB1U3BsaXQuam9pbihzcGxpdHRlcik7XG5cbiAgdmFyIHJlc3QgPSB1cmw7XG5cbiAgLy8gdHJpbSBiZWZvcmUgcHJvY2VlZGluZy5cbiAgLy8gVGhpcyBpcyB0byBzdXBwb3J0IHBhcnNlIHN0dWZmIGxpa2UgXCIgIGh0dHA6Ly9mb28uY29tICBcXG5cIlxuICByZXN0ID0gcmVzdC50cmltKCk7XG5cbiAgaWYgKCFzbGFzaGVzRGVub3RlSG9zdCAmJiB1cmwuc3BsaXQoJyMnKS5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBUcnkgZmFzdCBwYXRoIHJlZ2V4cFxuICAgIHZhciBzaW1wbGVQYXRoID0gc2ltcGxlUGF0aFBhdHRlcm4uZXhlYyhyZXN0KTtcbiAgICBpZiAoc2ltcGxlUGF0aCkge1xuICAgICAgdGhpcy5wYXRoID0gcmVzdDtcbiAgICAgIHRoaXMuaHJlZiA9IHJlc3Q7XG4gICAgICB0aGlzLnBhdGhuYW1lID0gc2ltcGxlUGF0aFsxXTtcbiAgICAgIGlmIChzaW1wbGVQYXRoWzJdKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gc2ltcGxlUGF0aFsyXTtcbiAgICAgICAgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5zZWFyY2guc3Vic3RyKDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5zZWFyY2guc3Vic3RyKDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSAnJztcbiAgICAgICAgdGhpcy5xdWVyeSA9IHt9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgdmFyIHByb3RvID0gcHJvdG9jb2xQYXR0ZXJuLmV4ZWMocmVzdCk7XG4gIGlmIChwcm90bykge1xuICAgIHByb3RvID0gcHJvdG9bMF07XG4gICAgdmFyIGxvd2VyUHJvdG8gPSBwcm90by50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMucHJvdG9jb2wgPSBsb3dlclByb3RvO1xuICAgIHJlc3QgPSByZXN0LnN1YnN0cihwcm90by5sZW5ndGgpO1xuICB9XG5cbiAgLy8gZmlndXJlIG91dCBpZiBpdCdzIGdvdCBhIGhvc3RcbiAgLy8gdXNlckBzZXJ2ZXIgaXMgKmFsd2F5cyogaW50ZXJwcmV0ZWQgYXMgYSBob3N0bmFtZSwgYW5kIHVybFxuICAvLyByZXNvbHV0aW9uIHdpbGwgdHJlYXQgLy9mb28vYmFyIGFzIGhvc3Q9Zm9vLHBhdGg9YmFyIGJlY2F1c2UgdGhhdCdzXG4gIC8vIGhvdyB0aGUgYnJvd3NlciByZXNvbHZlcyByZWxhdGl2ZSBVUkxzLlxuICBpZiAoc2xhc2hlc0Rlbm90ZUhvc3QgfHwgcHJvdG8gfHwgcmVzdC5tYXRjaCgvXlxcL1xcL1teQFxcL10rQFteQFxcL10rLykpIHtcbiAgICB2YXIgc2xhc2hlcyA9IHJlc3Quc3Vic3RyKDAsIDIpID09PSAnLy8nO1xuICAgIGlmIChzbGFzaGVzICYmICEocHJvdG8gJiYgaG9zdGxlc3NQcm90b2NvbFtwcm90b10pKSB7XG4gICAgICByZXN0ID0gcmVzdC5zdWJzdHIoMik7XG4gICAgICB0aGlzLnNsYXNoZXMgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaG9zdGxlc3NQcm90b2NvbFtwcm90b10gJiZcbiAgICAgIChzbGFzaGVzIHx8IChwcm90byAmJiAhc2xhc2hlZFByb3RvY29sW3Byb3RvXSkpKSB7XG5cbiAgICAvLyB0aGVyZSdzIGEgaG9zdG5hbWUuXG4gICAgLy8gdGhlIGZpcnN0IGluc3RhbmNlIG9mIC8sID8sIDssIG9yICMgZW5kcyB0aGUgaG9zdC5cbiAgICAvL1xuICAgIC8vIElmIHRoZXJlIGlzIGFuIEAgaW4gdGhlIGhvc3RuYW1lLCB0aGVuIG5vbi1ob3N0IGNoYXJzICphcmUqIGFsbG93ZWRcbiAgICAvLyB0byB0aGUgbGVmdCBvZiB0aGUgbGFzdCBAIHNpZ24sIHVubGVzcyBzb21lIGhvc3QtZW5kaW5nIGNoYXJhY3RlclxuICAgIC8vIGNvbWVzICpiZWZvcmUqIHRoZSBALXNpZ24uXG4gICAgLy8gVVJMcyBhcmUgb2Jub3hpb3VzLlxuICAgIC8vXG4gICAgLy8gZXg6XG4gICAgLy8gaHR0cDovL2FAYkBjLyA9PiB1c2VyOmFAYiBob3N0OmNcbiAgICAvLyBodHRwOi8vYUBiP0BjID0+IHVzZXI6YSBob3N0OmMgcGF0aDovP0BjXG5cbiAgICAvLyB2MC4xMiBUT0RPKGlzYWFjcyk6IFRoaXMgaXMgbm90IHF1aXRlIGhvdyBDaHJvbWUgZG9lcyB0aGluZ3MuXG4gICAgLy8gUmV2aWV3IG91ciB0ZXN0IGNhc2UgYWdhaW5zdCBicm93c2VycyBtb3JlIGNvbXByZWhlbnNpdmVseS5cblxuICAgIC8vIGZpbmQgdGhlIGZpcnN0IGluc3RhbmNlIG9mIGFueSBob3N0RW5kaW5nQ2hhcnNcbiAgICB2YXIgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaG9zdEVuZGluZ0NoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKGhvc3RFbmRpbmdDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuXG4gICAgLy8gYXQgdGhpcyBwb2ludCwgZWl0aGVyIHdlIGhhdmUgYW4gZXhwbGljaXQgcG9pbnQgd2hlcmUgdGhlXG4gICAgLy8gYXV0aCBwb3J0aW9uIGNhbm5vdCBnbyBwYXN0LCBvciB0aGUgbGFzdCBAIGNoYXIgaXMgdGhlIGRlY2lkZXIuXG4gICAgdmFyIGF1dGgsIGF0U2lnbjtcbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpIHtcbiAgICAgIC8vIGF0U2lnbiBjYW4gYmUgYW55d2hlcmUuXG4gICAgICBhdFNpZ24gPSByZXN0Lmxhc3RJbmRleE9mKCdAJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGF0U2lnbiBtdXN0IGJlIGluIGF1dGggcG9ydGlvbi5cbiAgICAgIC8vIGh0dHA6Ly9hQGIvY0BkID0+IGhvc3Q6YiBhdXRoOmEgcGF0aDovY0BkXG4gICAgICBhdFNpZ24gPSByZXN0Lmxhc3RJbmRleE9mKCdAJywgaG9zdEVuZCk7XG4gICAgfVxuXG4gICAgLy8gTm93IHdlIGhhdmUgYSBwb3J0aW9uIHdoaWNoIGlzIGRlZmluaXRlbHkgdGhlIGF1dGguXG4gICAgLy8gUHVsbCB0aGF0IG9mZi5cbiAgICBpZiAoYXRTaWduICE9PSAtMSkge1xuICAgICAgYXV0aCA9IHJlc3Quc2xpY2UoMCwgYXRTaWduKTtcbiAgICAgIHJlc3QgPSByZXN0LnNsaWNlKGF0U2lnbiArIDEpO1xuICAgICAgdGhpcy5hdXRoID0gZGVjb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIH1cblxuICAgIC8vIHRoZSBob3N0IGlzIHRoZSByZW1haW5pbmcgdG8gdGhlIGxlZnQgb2YgdGhlIGZpcnN0IG5vbi1ob3N0IGNoYXJcbiAgICBob3N0RW5kID0gLTE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub25Ib3N0Q2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoZWMgPSByZXN0LmluZGV4T2Yobm9uSG9zdENoYXJzW2ldKTtcbiAgICAgIGlmIChoZWMgIT09IC0xICYmIChob3N0RW5kID09PSAtMSB8fCBoZWMgPCBob3N0RW5kKSlcbiAgICAgICAgaG9zdEVuZCA9IGhlYztcbiAgICB9XG4gICAgLy8gaWYgd2Ugc3RpbGwgaGF2ZSBub3QgaGl0IGl0LCB0aGVuIHRoZSBlbnRpcmUgdGhpbmcgaXMgYSBob3N0LlxuICAgIGlmIChob3N0RW5kID09PSAtMSlcbiAgICAgIGhvc3RFbmQgPSByZXN0Lmxlbmd0aDtcblxuICAgIHRoaXMuaG9zdCA9IHJlc3Quc2xpY2UoMCwgaG9zdEVuZCk7XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoaG9zdEVuZCk7XG5cbiAgICAvLyBwdWxsIG91dCBwb3J0LlxuICAgIHRoaXMucGFyc2VIb3N0KCk7XG5cbiAgICAvLyB3ZSd2ZSBpbmRpY2F0ZWQgdGhhdCB0aGVyZSBpcyBhIGhvc3RuYW1lLFxuICAgIC8vIHNvIGV2ZW4gaWYgaXQncyBlbXB0eSwgaXQgaGFzIHRvIGJlIHByZXNlbnQuXG4gICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUgfHwgJyc7XG5cbiAgICAvLyBpZiBob3N0bmFtZSBiZWdpbnMgd2l0aCBbIGFuZCBlbmRzIHdpdGggXVxuICAgIC8vIGFzc3VtZSB0aGF0IGl0J3MgYW4gSVB2NiBhZGRyZXNzLlxuICAgIHZhciBpcHY2SG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lWzBdID09PSAnWycgJiZcbiAgICAgICAgdGhpcy5ob3N0bmFtZVt0aGlzLmhvc3RuYW1lLmxlbmd0aCAtIDFdID09PSAnXSc7XG5cbiAgICAvLyB2YWxpZGF0ZSBhIGxpdHRsZS5cbiAgICBpZiAoIWlwdjZIb3N0bmFtZSkge1xuICAgICAgdmFyIGhvc3RwYXJ0cyA9IHRoaXMuaG9zdG5hbWUuc3BsaXQoL1xcLi8pO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBob3N0cGFydHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBwYXJ0ID0gaG9zdHBhcnRzW2ldO1xuICAgICAgICBpZiAoIXBhcnQpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoIXBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICB2YXIgbmV3cGFydCA9ICcnO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwLCBrID0gcGFydC5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChwYXJ0LmNoYXJDb2RlQXQoaikgPiAxMjcpIHtcbiAgICAgICAgICAgICAgLy8gd2UgcmVwbGFjZSBub24tQVNDSUkgY2hhciB3aXRoIGEgdGVtcG9yYXJ5IHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgIC8vIHdlIG5lZWQgdGhpcyB0byBtYWtlIHN1cmUgc2l6ZSBvZiBob3N0bmFtZSBpcyBub3RcbiAgICAgICAgICAgICAgLy8gYnJva2VuIGJ5IHJlcGxhY2luZyBub24tQVNDSUkgYnkgbm90aGluZ1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9ICd4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld3BhcnQgKz0gcGFydFtqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2UgdGVzdCBhZ2FpbiB3aXRoIEFTQ0lJIGNoYXIgb25seVxuICAgICAgICAgIGlmICghbmV3cGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuICAgICAgICAgICAgdmFyIHZhbGlkUGFydHMgPSBob3N0cGFydHMuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICB2YXIgbm90SG9zdCA9IGhvc3RwYXJ0cy5zbGljZShpICsgMSk7XG4gICAgICAgICAgICB2YXIgYml0ID0gcGFydC5tYXRjaChob3N0bmFtZVBhcnRTdGFydCk7XG4gICAgICAgICAgICBpZiAoYml0KSB7XG4gICAgICAgICAgICAgIHZhbGlkUGFydHMucHVzaChiaXRbMV0pO1xuICAgICAgICAgICAgICBub3RIb3N0LnVuc2hpZnQoYml0WzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub3RIb3N0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXN0ID0gJy8nICsgbm90SG9zdC5qb2luKCcuJykgKyByZXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ob3N0bmFtZSA9IHZhbGlkUGFydHMuam9pbignLicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaG9zdG5hbWUubGVuZ3RoID4gaG9zdG5hbWVNYXhMZW4pIHtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaG9zdG5hbWVzIGFyZSBhbHdheXMgbG93ZXIgY2FzZS5cbiAgICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIC8vIElETkEgU3VwcG9ydDogUmV0dXJucyBhIHB1bnljb2RlZCByZXByZXNlbnRhdGlvbiBvZiBcImRvbWFpblwiLlxuICAgICAgLy8gSXQgb25seSBjb252ZXJ0cyBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgdGhhdFxuICAgICAgLy8gaGF2ZSBub24tQVNDSUkgY2hhcmFjdGVycywgaS5lLiBpdCBkb2Vzbid0IG1hdHRlciBpZlxuICAgICAgLy8geW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0IGFscmVhZHkgaXMgQVNDSUktb25seS5cbiAgICAgIHRoaXMuaG9zdG5hbWUgPSBwdW55Y29kZS50b0FTQ0lJKHRoaXMuaG9zdG5hbWUpO1xuICAgIH1cblxuICAgIHZhciBwID0gdGhpcy5wb3J0ID8gJzonICsgdGhpcy5wb3J0IDogJyc7XG4gICAgdmFyIGggPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuICAgIHRoaXMuaG9zdCA9IGggKyBwO1xuICAgIHRoaXMuaHJlZiArPSB0aGlzLmhvc3Q7XG5cbiAgICAvLyBzdHJpcCBbIGFuZCBdIGZyb20gdGhlIGhvc3RuYW1lXG4gICAgLy8gdGhlIGhvc3QgZmllbGQgc3RpbGwgcmV0YWlucyB0aGVtLCB0aG91Z2hcbiAgICBpZiAoaXB2Nkhvc3RuYW1lKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS5zdWJzdHIoMSwgdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIGlmIChyZXN0WzBdICE9PSAnLycpIHtcbiAgICAgICAgcmVzdCA9ICcvJyArIHJlc3Q7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gbm93IHJlc3QgaXMgc2V0IHRvIHRoZSBwb3N0LWhvc3Qgc3R1ZmYuXG4gIC8vIGNob3Agb2ZmIGFueSBkZWxpbSBjaGFycy5cbiAgaWYgKCF1bnNhZmVQcm90b2NvbFtsb3dlclByb3RvXSkge1xuXG4gICAgLy8gRmlyc3QsIG1ha2UgMTAwJSBzdXJlIHRoYXQgYW55IFwiYXV0b0VzY2FwZVwiIGNoYXJzIGdldFxuICAgIC8vIGVzY2FwZWQsIGV2ZW4gaWYgZW5jb2RlVVJJQ29tcG9uZW50IGRvZXNuJ3QgdGhpbmsgdGhleVxuICAgIC8vIG5lZWQgdG8gYmUuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhdXRvRXNjYXBlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGFlID0gYXV0b0VzY2FwZVtpXTtcbiAgICAgIGlmIChyZXN0LmluZGV4T2YoYWUpID09PSAtMSlcbiAgICAgICAgY29udGludWU7XG4gICAgICB2YXIgZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50KGFlKTtcbiAgICAgIGlmIChlc2MgPT09IGFlKSB7XG4gICAgICAgIGVzYyA9IGVzY2FwZShhZSk7XG4gICAgICB9XG4gICAgICByZXN0ID0gcmVzdC5zcGxpdChhZSkuam9pbihlc2MpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gY2hvcCBvZmYgZnJvbSB0aGUgdGFpbCBmaXJzdC5cbiAgdmFyIGhhc2ggPSByZXN0LmluZGV4T2YoJyMnKTtcbiAgaWYgKGhhc2ggIT09IC0xKSB7XG4gICAgLy8gZ290IGEgZnJhZ21lbnQgc3RyaW5nLlxuICAgIHRoaXMuaGFzaCA9IHJlc3Quc3Vic3RyKGhhc2gpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIGhhc2gpO1xuICB9XG4gIHZhciBxbSA9IHJlc3QuaW5kZXhPZignPycpO1xuICBpZiAocW0gIT09IC0xKSB7XG4gICAgdGhpcy5zZWFyY2ggPSByZXN0LnN1YnN0cihxbSk7XG4gICAgdGhpcy5xdWVyeSA9IHJlc3Quc3Vic3RyKHFtICsgMSk7XG4gICAgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgIHRoaXMucXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZSh0aGlzLnF1ZXJ5KTtcbiAgICB9XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgcW0pO1xuICB9IGVsc2UgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAvLyBubyBxdWVyeSBzdHJpbmcsIGJ1dCBwYXJzZVF1ZXJ5U3RyaW5nIHN0aWxsIHJlcXVlc3RlZFxuICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgdGhpcy5xdWVyeSA9IHt9O1xuICB9XG4gIGlmIChyZXN0KSB0aGlzLnBhdGhuYW1lID0gcmVzdDtcbiAgaWYgKHNsYXNoZWRQcm90b2NvbFtsb3dlclByb3RvXSAmJlxuICAgICAgdGhpcy5ob3N0bmFtZSAmJiAhdGhpcy5wYXRobmFtZSkge1xuICAgIHRoaXMucGF0aG5hbWUgPSAnLyc7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gIGlmICh0aGlzLnBhdGhuYW1lIHx8IHRoaXMuc2VhcmNoKSB7XG4gICAgdmFyIHAgPSB0aGlzLnBhdGhuYW1lIHx8ICcnO1xuICAgIHZhciBzID0gdGhpcy5zZWFyY2ggfHwgJyc7XG4gICAgdGhpcy5wYXRoID0gcCArIHM7XG4gIH1cblxuICAvLyBmaW5hbGx5LCByZWNvbnN0cnVjdCB0aGUgaHJlZiBiYXNlZCBvbiB3aGF0IGhhcyBiZWVuIHZhbGlkYXRlZC5cbiAgdGhpcy5ocmVmID0gdGhpcy5mb3JtYXQoKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBmb3JtYXQgYSBwYXJzZWQgb2JqZWN0IGludG8gYSB1cmwgc3RyaW5nXG5mdW5jdGlvbiB1cmxGb3JtYXQob2JqKSB7XG4gIC8vIGVuc3VyZSBpdCdzIGFuIG9iamVjdCwgYW5kIG5vdCBhIHN0cmluZyB1cmwuXG4gIC8vIElmIGl0J3MgYW4gb2JqLCB0aGlzIGlzIGEgbm8tb3AuXG4gIC8vIHRoaXMgd2F5LCB5b3UgY2FuIGNhbGwgdXJsX2Zvcm1hdCgpIG9uIHN0cmluZ3NcbiAgLy8gdG8gY2xlYW4gdXAgcG90ZW50aWFsbHkgd29ua3kgdXJscy5cbiAgaWYgKHV0aWwuaXNTdHJpbmcob2JqKSkgb2JqID0gdXJsUGFyc2Uob2JqKTtcbiAgaWYgKCEob2JqIGluc3RhbmNlb2YgVXJsKSkgcmV0dXJuIFVybC5wcm90b3R5cGUuZm9ybWF0LmNhbGwob2JqKTtcbiAgcmV0dXJuIG9iai5mb3JtYXQoKTtcbn1cblxuVXJsLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGF1dGggPSB0aGlzLmF1dGggfHwgJyc7XG4gIGlmIChhdXRoKSB7XG4gICAgYXV0aCA9IGVuY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICBhdXRoID0gYXV0aC5yZXBsYWNlKC8lM0EvaSwgJzonKTtcbiAgICBhdXRoICs9ICdAJztcbiAgfVxuXG4gIHZhciBwcm90b2NvbCA9IHRoaXMucHJvdG9jb2wgfHwgJycsXG4gICAgICBwYXRobmFtZSA9IHRoaXMucGF0aG5hbWUgfHwgJycsXG4gICAgICBoYXNoID0gdGhpcy5oYXNoIHx8ICcnLFxuICAgICAgaG9zdCA9IGZhbHNlLFxuICAgICAgcXVlcnkgPSAnJztcblxuICBpZiAodGhpcy5ob3N0KSB7XG4gICAgaG9zdCA9IGF1dGggKyB0aGlzLmhvc3Q7XG4gIH0gZWxzZSBpZiAodGhpcy5ob3N0bmFtZSkge1xuICAgIGhvc3QgPSBhdXRoICsgKHRoaXMuaG9zdG5hbWUuaW5kZXhPZignOicpID09PSAtMSA/XG4gICAgICAgIHRoaXMuaG9zdG5hbWUgOlxuICAgICAgICAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nKTtcbiAgICBpZiAodGhpcy5wb3J0KSB7XG4gICAgICBob3N0ICs9ICc6JyArIHRoaXMucG9ydDtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5xdWVyeSAmJlxuICAgICAgdXRpbC5pc09iamVjdCh0aGlzLnF1ZXJ5KSAmJlxuICAgICAgT2JqZWN0LmtleXModGhpcy5xdWVyeSkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkodGhpcy5xdWVyeSk7XG4gIH1cblxuICB2YXIgc2VhcmNoID0gdGhpcy5zZWFyY2ggfHwgKHF1ZXJ5ICYmICgnPycgKyBxdWVyeSkpIHx8ICcnO1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5zdWJzdHIoLTEpICE9PSAnOicpIHByb3RvY29sICs9ICc6JztcblxuICAvLyBvbmx5IHRoZSBzbGFzaGVkUHJvdG9jb2xzIGdldCB0aGUgLy8uICBOb3QgbWFpbHRvOiwgeG1wcDosIGV0Yy5cbiAgLy8gdW5sZXNzIHRoZXkgaGFkIHRoZW0gdG8gYmVnaW4gd2l0aC5cbiAgaWYgKHRoaXMuc2xhc2hlcyB8fFxuICAgICAgKCFwcm90b2NvbCB8fCBzbGFzaGVkUHJvdG9jb2xbcHJvdG9jb2xdKSAmJiBob3N0ICE9PSBmYWxzZSkge1xuICAgIGhvc3QgPSAnLy8nICsgKGhvc3QgfHwgJycpO1xuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJykgcGF0aG5hbWUgPSAnLycgKyBwYXRobmFtZTtcbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSAnJztcbiAgfVxuXG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSAnIycpIGhhc2ggPSAnIycgKyBoYXNoO1xuICBpZiAoc2VhcmNoICYmIHNlYXJjaC5jaGFyQXQoMCkgIT09ICc/Jykgc2VhcmNoID0gJz8nICsgc2VhcmNoO1xuXG4gIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZSgvWz8jXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQobWF0Y2gpO1xuICB9KTtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoJyMnLCAnJTIzJyk7XG5cbiAgcmV0dXJuIHByb3RvY29sICsgaG9zdCArIHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcbn07XG5cbmZ1bmN0aW9uIHVybFJlc29sdmUoc291cmNlLCByZWxhdGl2ZSkge1xuICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZShyZWxhdGl2ZSk7XG59XG5cblVybC5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG4gIHJldHVybiB0aGlzLnJlc29sdmVPYmplY3QodXJsUGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKSkuZm9ybWF0KCk7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlT2JqZWN0KHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgaWYgKCFzb3VyY2UpIHJldHVybiByZWxhdGl2ZTtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmVPYmplY3QocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmVPYmplY3QgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICBpZiAodXRpbC5pc1N0cmluZyhyZWxhdGl2ZSkpIHtcbiAgICB2YXIgcmVsID0gbmV3IFVybCgpO1xuICAgIHJlbC5wYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpO1xuICAgIHJlbGF0aXZlID0gcmVsO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBVcmwoKTtcbiAgdmFyIHRrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gIGZvciAodmFyIHRrID0gMDsgdGsgPCB0a2V5cy5sZW5ndGg7IHRrKyspIHtcbiAgICB2YXIgdGtleSA9IHRrZXlzW3RrXTtcbiAgICByZXN1bHRbdGtleV0gPSB0aGlzW3RrZXldO1xuICB9XG5cbiAgLy8gaGFzaCBpcyBhbHdheXMgb3ZlcnJpZGRlbiwgbm8gbWF0dGVyIHdoYXQuXG4gIC8vIGV2ZW4gaHJlZj1cIlwiIHdpbGwgcmVtb3ZlIGl0LlxuICByZXN1bHQuaGFzaCA9IHJlbGF0aXZlLmhhc2g7XG5cbiAgLy8gaWYgdGhlIHJlbGF0aXZlIHVybCBpcyBlbXB0eSwgdGhlbiB0aGVyZSdzIG5vdGhpbmcgbGVmdCB0byBkbyBoZXJlLlxuICBpZiAocmVsYXRpdmUuaHJlZiA9PT0gJycpIHtcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gaHJlZnMgbGlrZSAvL2Zvby9iYXIgYWx3YXlzIGN1dCB0byB0aGUgcHJvdG9jb2wuXG4gIGlmIChyZWxhdGl2ZS5zbGFzaGVzICYmICFyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgIC8vIHRha2UgZXZlcnl0aGluZyBleGNlcHQgdGhlIHByb3RvY29sIGZyb20gcmVsYXRpdmVcbiAgICB2YXIgcmtleXMgPSBPYmplY3Qua2V5cyhyZWxhdGl2ZSk7XG4gICAgZm9yICh2YXIgcmsgPSAwOyByayA8IHJrZXlzLmxlbmd0aDsgcmsrKykge1xuICAgICAgdmFyIHJrZXkgPSBya2V5c1tya107XG4gICAgICBpZiAocmtleSAhPT0gJ3Byb3RvY29sJylcbiAgICAgICAgcmVzdWx0W3JrZXldID0gcmVsYXRpdmVbcmtleV07XG4gICAgfVxuXG4gICAgLy91cmxQYXJzZSBhcHBlbmRzIHRyYWlsaW5nIC8gdG8gdXJscyBsaWtlIGh0dHA6Ly93d3cuZXhhbXBsZS5jb21cbiAgICBpZiAoc2xhc2hlZFByb3RvY29sW3Jlc3VsdC5wcm90b2NvbF0gJiZcbiAgICAgICAgcmVzdWx0Lmhvc3RuYW1lICYmICFyZXN1bHQucGF0aG5hbWUpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gcmVzdWx0LnBhdGhuYW1lID0gJy8nO1xuICAgIH1cblxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAocmVsYXRpdmUucHJvdG9jb2wgJiYgcmVsYXRpdmUucHJvdG9jb2wgIT09IHJlc3VsdC5wcm90b2NvbCkge1xuICAgIC8vIGlmIGl0J3MgYSBrbm93biB1cmwgcHJvdG9jb2wsIHRoZW4gY2hhbmdpbmdcbiAgICAvLyB0aGUgcHJvdG9jb2wgZG9lcyB3ZWlyZCB0aGluZ3NcbiAgICAvLyBmaXJzdCwgaWYgaXQncyBub3QgZmlsZTosIHRoZW4gd2UgTVVTVCBoYXZlIGEgaG9zdCxcbiAgICAvLyBhbmQgaWYgdGhlcmUgd2FzIGEgcGF0aFxuICAgIC8vIHRvIGJlZ2luIHdpdGgsIHRoZW4gd2UgTVVTVCBoYXZlIGEgcGF0aC5cbiAgICAvLyBpZiBpdCBpcyBmaWxlOiwgdGhlbiB0aGUgaG9zdCBpcyBkcm9wcGVkLFxuICAgIC8vIGJlY2F1c2UgdGhhdCdzIGtub3duIHRvIGJlIGhvc3RsZXNzLlxuICAgIC8vIGFueXRoaW5nIGVsc2UgaXMgYXNzdW1lZCB0byBiZSBhYnNvbHV0ZS5cbiAgICBpZiAoIXNsYXNoZWRQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmVsYXRpdmUpO1xuICAgICAgZm9yICh2YXIgdiA9IDA7IHYgPCBrZXlzLmxlbmd0aDsgdisrKSB7XG4gICAgICAgIHZhciBrID0ga2V5c1t2XTtcbiAgICAgICAgcmVzdWx0W2tdID0gcmVsYXRpdmVba107XG4gICAgICB9XG4gICAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmVzdWx0LnByb3RvY29sID0gcmVsYXRpdmUucHJvdG9jb2w7XG4gICAgaWYgKCFyZWxhdGl2ZS5ob3N0ICYmICFob3N0bGVzc1Byb3RvY29sW3JlbGF0aXZlLnByb3RvY29sXSkge1xuICAgICAgdmFyIHJlbFBhdGggPSAocmVsYXRpdmUucGF0aG5hbWUgfHwgJycpLnNwbGl0KCcvJyk7XG4gICAgICB3aGlsZSAocmVsUGF0aC5sZW5ndGggJiYgIShyZWxhdGl2ZS5ob3N0ID0gcmVsUGF0aC5zaGlmdCgpKSk7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3QpIHJlbGF0aXZlLmhvc3QgPSAnJztcbiAgICAgIGlmICghcmVsYXRpdmUuaG9zdG5hbWUpIHJlbGF0aXZlLmhvc3RuYW1lID0gJyc7XG4gICAgICBpZiAocmVsUGF0aFswXSAhPT0gJycpIHJlbFBhdGgudW5zaGlmdCgnJyk7XG4gICAgICBpZiAocmVsUGF0aC5sZW5ndGggPCAyKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgcmVzdWx0LnBhdGhuYW1lID0gcmVsUGF0aC5qb2luKCcvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbGF0aXZlLnBhdGhuYW1lO1xuICAgIH1cbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIHJlc3VsdC5ob3N0ID0gcmVsYXRpdmUuaG9zdCB8fCAnJztcbiAgICByZXN1bHQuYXV0aCA9IHJlbGF0aXZlLmF1dGg7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVsYXRpdmUuaG9zdG5hbWUgfHwgcmVsYXRpdmUuaG9zdDtcbiAgICByZXN1bHQucG9ydCA9IHJlbGF0aXZlLnBvcnQ7XG4gICAgLy8gdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnBhdGhuYW1lIHx8IHJlc3VsdC5zZWFyY2gpIHtcbiAgICAgIHZhciBwID0gcmVzdWx0LnBhdGhuYW1lIHx8ICcnO1xuICAgICAgdmFyIHMgPSByZXN1bHQuc2VhcmNoIHx8ICcnO1xuICAgICAgcmVzdWx0LnBhdGggPSBwICsgcztcbiAgICB9XG4gICAgcmVzdWx0LnNsYXNoZXMgPSByZXN1bHQuc2xhc2hlcyB8fCByZWxhdGl2ZS5zbGFzaGVzO1xuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB2YXIgaXNTb3VyY2VBYnMgPSAocmVzdWx0LnBhdGhuYW1lICYmIHJlc3VsdC5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJyksXG4gICAgICBpc1JlbEFicyA9IChcbiAgICAgICAgICByZWxhdGl2ZS5ob3N0IHx8XG4gICAgICAgICAgcmVsYXRpdmUucGF0aG5hbWUgJiYgcmVsYXRpdmUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLydcbiAgICAgICksXG4gICAgICBtdXN0RW5kQWJzID0gKGlzUmVsQWJzIHx8IGlzU291cmNlQWJzIHx8XG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuaG9zdCAmJiByZWxhdGl2ZS5wYXRobmFtZSkpLFxuICAgICAgcmVtb3ZlQWxsRG90cyA9IG11c3RFbmRBYnMsXG4gICAgICBzcmNQYXRoID0gcmVzdWx0LnBhdGhuYW1lICYmIHJlc3VsdC5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcmVsUGF0aCA9IHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLnNwbGl0KCcvJykgfHwgW10sXG4gICAgICBwc3ljaG90aWMgPSByZXN1bHQucHJvdG9jb2wgJiYgIXNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdO1xuXG4gIC8vIGlmIHRoZSB1cmwgaXMgYSBub24tc2xhc2hlZCB1cmwsIHRoZW4gcmVsYXRpdmVcbiAgLy8gbGlua3MgbGlrZSAuLi8uLiBzaG91bGQgYmUgYWJsZVxuICAvLyB0byBjcmF3bCB1cCB0byB0aGUgaG9zdG5hbWUsIGFzIHdlbGwuICBUaGlzIGlzIHN0cmFuZ2UuXG4gIC8vIHJlc3VsdC5wcm90b2NvbCBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSBub3cuXG4gIC8vIExhdGVyIG9uLCBwdXQgdGhlIGZpcnN0IHBhdGggcGFydCBpbnRvIHRoZSBob3N0IGZpZWxkLlxuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gJyc7XG4gICAgcmVzdWx0LnBvcnQgPSBudWxsO1xuICAgIGlmIChyZXN1bHQuaG9zdCkge1xuICAgICAgaWYgKHNyY1BhdGhbMF0gPT09ICcnKSBzcmNQYXRoWzBdID0gcmVzdWx0Lmhvc3Q7XG4gICAgICBlbHNlIHNyY1BhdGgudW5zaGlmdChyZXN1bHQuaG9zdCk7XG4gICAgfVxuICAgIHJlc3VsdC5ob3N0ID0gJyc7XG4gICAgaWYgKHJlbGF0aXZlLnByb3RvY29sKSB7XG4gICAgICByZWxhdGl2ZS5ob3N0bmFtZSA9IG51bGw7XG4gICAgICByZWxhdGl2ZS5wb3J0ID0gbnVsbDtcbiAgICAgIGlmIChyZWxhdGl2ZS5ob3N0KSB7XG4gICAgICAgIGlmIChyZWxQYXRoWzBdID09PSAnJykgcmVsUGF0aFswXSA9IHJlbGF0aXZlLmhvc3Q7XG4gICAgICAgIGVsc2UgcmVsUGF0aC51bnNoaWZ0KHJlbGF0aXZlLmhvc3QpO1xuICAgICAgfVxuICAgICAgcmVsYXRpdmUuaG9zdCA9IG51bGw7XG4gICAgfVxuICAgIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzICYmIChyZWxQYXRoWzBdID09PSAnJyB8fCBzcmNQYXRoWzBdID09PSAnJyk7XG4gIH1cblxuICBpZiAoaXNSZWxBYnMpIHtcbiAgICAvLyBpdCdzIGFic29sdXRlLlxuICAgIHJlc3VsdC5ob3N0ID0gKHJlbGF0aXZlLmhvc3QgfHwgcmVsYXRpdmUuaG9zdCA9PT0gJycpID9cbiAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3QgOiByZXN1bHQuaG9zdDtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSAocmVsYXRpdmUuaG9zdG5hbWUgfHwgcmVsYXRpdmUuaG9zdG5hbWUgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgOiByZXN1bHQuaG9zdG5hbWU7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICBzcmNQYXRoID0gcmVsUGF0aDtcbiAgICAvLyBmYWxsIHRocm91Z2ggdG8gdGhlIGRvdC1oYW5kbGluZyBiZWxvdy5cbiAgfSBlbHNlIGlmIChyZWxQYXRoLmxlbmd0aCkge1xuICAgIC8vIGl0J3MgcmVsYXRpdmVcbiAgICAvLyB0aHJvdyBhd2F5IHRoZSBleGlzdGluZyBmaWxlLCBhbmQgdGFrZSB0aGUgbmV3IHBhdGggaW5zdGVhZC5cbiAgICBpZiAoIXNyY1BhdGgpIHNyY1BhdGggPSBbXTtcbiAgICBzcmNQYXRoLnBvcCgpO1xuICAgIHNyY1BhdGggPSBzcmNQYXRoLmNvbmNhdChyZWxQYXRoKTtcbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICB9IGVsc2UgaWYgKCF1dGlsLmlzTnVsbE9yVW5kZWZpbmVkKHJlbGF0aXZlLnNlYXJjaCkpIHtcbiAgICAvLyBqdXN0IHB1bGwgb3V0IHRoZSBzZWFyY2guXG4gICAgLy8gbGlrZSBocmVmPSc/Zm9vJy5cbiAgICAvLyBQdXQgdGhpcyBhZnRlciB0aGUgb3RoZXIgdHdvIGNhc2VzIGJlY2F1c2UgaXQgc2ltcGxpZmllcyB0aGUgYm9vbGVhbnNcbiAgICBpZiAocHN5Y2hvdGljKSB7XG4gICAgICByZXN1bHQuaG9zdG5hbWUgPSByZXN1bHQuaG9zdCA9IHNyY1BhdGguc2hpZnQoKTtcbiAgICAgIC8vb2NjYXRpb25hbHkgdGhlIGF1dGggY2FuIGdldCBzdHVjayBvbmx5IGluIGhvc3RcbiAgICAgIC8vdGhpcyBlc3BlY2lhbGx5IGhhcHBlbnMgaW4gY2FzZXMgbGlrZVxuICAgICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICAgIHZhciBhdXRoSW5Ib3N0ID0gcmVzdWx0Lmhvc3QgJiYgcmVzdWx0Lmhvc3QuaW5kZXhPZignQCcpID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ob3N0LnNwbGl0KCdAJykgOiBmYWxzZTtcbiAgICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICAgIHJlc3VsdC5hdXRoID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgICByZXN1bHQuaG9zdCA9IHJlc3VsdC5ob3N0bmFtZSA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKCF1dGlsLmlzTnVsbChyZXN1bHQucGF0aG5hbWUpIHx8ICF1dGlsLmlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuICAgIH1cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIC8vIG5vIHBhdGggYXQgYWxsLiAgZWFzeS5cbiAgICAvLyB3ZSd2ZSBhbHJlYWR5IGhhbmRsZWQgdGhlIG90aGVyIHN0dWZmIGFib3ZlLlxuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChyZXN1bHQuc2VhcmNoKSB7XG4gICAgICByZXN1bHQucGF0aCA9ICcvJyArIHJlc3VsdC5zZWFyY2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gbnVsbDtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGlmIGEgdXJsIEVORHMgaW4gLiBvciAuLiwgdGhlbiBpdCBtdXN0IGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuICAvLyBob3dldmVyLCBpZiBpdCBlbmRzIGluIGFueXRoaW5nIGVsc2Ugbm9uLXNsYXNoeSxcbiAgLy8gdGhlbiBpdCBtdXN0IE5PVCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgdmFyIGxhc3QgPSBzcmNQYXRoLnNsaWNlKC0xKVswXTtcbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2ggPSAoXG4gICAgICAocmVzdWx0Lmhvc3QgfHwgcmVsYXRpdmUuaG9zdCB8fCBzcmNQYXRoLmxlbmd0aCA+IDEpICYmXG4gICAgICAobGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicpIHx8IGxhc3QgPT09ICcnKTtcblxuICAvLyBzdHJpcCBzaW5nbGUgZG90cywgcmVzb2x2ZSBkb3VibGUgZG90cyB0byBwYXJlbnQgZGlyXG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBzcmNQYXRoLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICBsYXN0ID0gc3JjUGF0aFtpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoIW11c3RFbmRBYnMgJiYgIXJlbW92ZUFsbERvdHMpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHNyY1BhdGgudW5zaGlmdCgnLi4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAobXVzdEVuZEFicyAmJiBzcmNQYXRoWzBdICE9PSAnJyAmJlxuICAgICAgKCFzcmNQYXRoWzBdIHx8IHNyY1BhdGhbMF0uY2hhckF0KDApICE9PSAnLycpKSB7XG4gICAgc3JjUGF0aC51bnNoaWZ0KCcnKTtcbiAgfVxuXG4gIGlmIChoYXNUcmFpbGluZ1NsYXNoICYmIChzcmNQYXRoLmpvaW4oJy8nKS5zdWJzdHIoLTEpICE9PSAnLycpKSB7XG4gICAgc3JjUGF0aC5wdXNoKCcnKTtcbiAgfVxuXG4gIHZhciBpc0Fic29sdXRlID0gc3JjUGF0aFswXSA9PT0gJycgfHxcbiAgICAgIChzcmNQYXRoWzBdICYmIHNyY1BhdGhbMF0uY2hhckF0KDApID09PSAnLycpO1xuXG4gIC8vIHB1dCB0aGUgaG9zdCBiYWNrXG4gIGlmIChwc3ljaG90aWMpIHtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSByZXN1bHQuaG9zdCA9IGlzQWJzb2x1dGUgPyAnJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNQYXRoLmxlbmd0aCA/IHNyY1BhdGguc2hpZnQoKSA6ICcnO1xuICAgIC8vb2NjYXRpb25hbHkgdGhlIGF1dGggY2FuIGdldCBzdHVjayBvbmx5IGluIGhvc3RcbiAgICAvL3RoaXMgZXNwZWNpYWxseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuICAgIHZhciBhdXRoSW5Ib3N0ID0gcmVzdWx0Lmhvc3QgJiYgcmVzdWx0Lmhvc3QuaW5kZXhPZignQCcpID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgaWYgKGF1dGhJbkhvc3QpIHtcbiAgICAgIHJlc3VsdC5hdXRoID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgfVxuICB9XG5cbiAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgfHwgKHJlc3VsdC5ob3N0ICYmIHNyY1BhdGgubGVuZ3RoKTtcblxuICBpZiAobXVzdEVuZEFicyAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoIXNyY1BhdGgubGVuZ3RoKSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gbnVsbDtcbiAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gc3JjUGF0aC5qb2luKCcvJyk7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgcmVxdWVzdC5odHRwXG4gIGlmICghdXRpbC5pc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhdXRpbC5pc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICByZXN1bHQucGF0aCA9IChyZXN1bHQucGF0aG5hbWUgPyByZXN1bHQucGF0aG5hbWUgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuICB9XG4gIHJlc3VsdC5hdXRoID0gcmVsYXRpdmUuYXV0aCB8fCByZXN1bHQuYXV0aDtcbiAgcmVzdWx0LnNsYXNoZXMgPSByZXN1bHQuc2xhc2hlcyB8fCByZWxhdGl2ZS5zbGFzaGVzO1xuICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblVybC5wcm90b3R5cGUucGFyc2VIb3N0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBob3N0ID0gdGhpcy5ob3N0O1xuICB2YXIgcG9ydCA9IHBvcnRQYXR0ZXJuLmV4ZWMoaG9zdCk7XG4gIGlmIChwb3J0KSB7XG4gICAgcG9ydCA9IHBvcnRbMF07XG4gICAgaWYgKHBvcnQgIT09ICc6Jykge1xuICAgICAgdGhpcy5wb3J0ID0gcG9ydC5zdWJzdHIoMSk7XG4gICAgfVxuICAgIGhvc3QgPSBob3N0LnN1YnN0cigwLCBob3N0Lmxlbmd0aCAtIHBvcnQubGVuZ3RoKTtcbiAgfVxuICBpZiAoaG9zdCkgdGhpcy5ob3N0bmFtZSA9IGhvc3Q7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNTdHJpbmc6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB0eXBlb2YoYXJnKSA9PT0gJ3N0cmluZyc7XG4gIH0sXG4gIGlzT2JqZWN0OiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gYXJnID09PSBudWxsO1xuICB9LFxuICBpc051bGxPclVuZGVmaW5lZDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PSBudWxsO1xuICB9XG59O1xuIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcclxuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXHJcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcclxuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcclxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XHJcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXHJcblx0XHRleHBvcnRzW1wiZGF0XCJdID0gZmFjdG9yeSgpO1xyXG5cdGVsc2VcclxuXHRcdHJvb3RbXCJkYXRcIl0gPSBmYWN0b3J5KCk7XHJcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xyXG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxyXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcclxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xyXG4vKioqKioqL1xyXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXHJcbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xyXG4vKioqKioqL1xyXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXHJcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcclxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XHJcbi8qKioqKiovXHJcbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxyXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xyXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcclxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxyXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXHJcbi8qKioqKiovIFx0XHR9O1xyXG4vKioqKioqL1xyXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXHJcbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcclxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xyXG4vKioqKioqL1xyXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcclxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcclxuLyoqKioqKi8gXHR9XHJcbi8qKioqKiovXHJcbi8qKioqKiovXHJcbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcclxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xyXG4vKioqKioqL1xyXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXHJcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xyXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XHJcbi8qKioqKiovXHJcbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXHJcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XHJcbi8qKioqKiovIH0pXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbi8qKioqKiovIChbXHJcbi8qIDAgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cdFxyXG5cdHZhciBfaW5kZXggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xyXG5cdFxyXG5cdHZhciBfaW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXgpO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gX2luZGV4Mi5kZWZhdWx0OyAvKipcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuXHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiAxICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX0NvbG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcclxuXHRcclxuXHR2YXIgX0NvbG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbG9yKTtcclxuXHRcclxuXHR2YXIgX21hdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xyXG5cdFxyXG5cdHZhciBfbWF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYXRoKTtcclxuXHRcclxuXHR2YXIgX2ludGVycHJldCA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XHJcblx0XHJcblx0dmFyIF9pbnRlcnByZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW50ZXJwcmV0KTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xyXG5cdFxyXG5cdHZhciBfQ29udHJvbGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db250cm9sbGVyKTtcclxuXHRcclxuXHR2YXIgX0Jvb2xlYW5Db250cm9sbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcclxuXHRcclxuXHR2YXIgX0Jvb2xlYW5Db250cm9sbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Jvb2xlYW5Db250cm9sbGVyKTtcclxuXHRcclxuXHR2YXIgX09wdGlvbkNvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcclxuXHRcclxuXHR2YXIgX09wdGlvbkNvbnRyb2xsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfT3B0aW9uQ29udHJvbGxlcik7XHJcblx0XHJcblx0dmFyIF9TdHJpbmdDb250cm9sbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XHJcblx0XHJcblx0dmFyIF9TdHJpbmdDb250cm9sbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0cmluZ0NvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OdW1iZXJDb250cm9sbGVyKTtcclxuXHRcclxuXHR2YXIgX051bWJlckNvbnRyb2xsZXJCb3ggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcclxuXHRcclxuXHR2YXIgX051bWJlckNvbnRyb2xsZXJCb3gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTnVtYmVyQ29udHJvbGxlckJveCk7XHJcblx0XHJcblx0dmFyIF9OdW1iZXJDb250cm9sbGVyU2xpZGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCk7XHJcblx0XHJcblx0dmFyIF9OdW1iZXJDb250cm9sbGVyU2xpZGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX051bWJlckNvbnRyb2xsZXJTbGlkZXIpO1xyXG5cdFxyXG5cdHZhciBfRnVuY3Rpb25Db250cm9sbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XHJcblx0XHJcblx0dmFyIF9GdW5jdGlvbkNvbnRyb2xsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRnVuY3Rpb25Db250cm9sbGVyKTtcclxuXHRcclxuXHR2YXIgX0NvbG9yQ29udHJvbGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xyXG5cdFxyXG5cdHZhciBfQ29sb3JDb250cm9sbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbG9yQ29udHJvbGxlcik7XHJcblx0XHJcblx0dmFyIF9kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xyXG5cdFxyXG5cdHZhciBfZG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RvbSk7XHJcblx0XHJcblx0dmFyIF9HVUkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcclxuXHRcclxuXHR2YXIgX0dVSTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9HVUkpO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XHJcblx0XHJcblx0LyoqXHJcblx0ICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICpcclxuXHQgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAqXHJcblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICpcclxuXHQgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgKi9cclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSB7XHJcblx0ICBjb2xvcjoge1xyXG5cdCAgICBDb2xvcjogX0NvbG9yMi5kZWZhdWx0LFxyXG5cdCAgICBtYXRoOiBfbWF0aDIuZGVmYXVsdCxcclxuXHQgICAgaW50ZXJwcmV0OiBfaW50ZXJwcmV0Mi5kZWZhdWx0XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgY29udHJvbGxlcnM6IHtcclxuXHQgICAgQ29udHJvbGxlcjogX0NvbnRyb2xsZXIyLmRlZmF1bHQsXHJcblx0ICAgIEJvb2xlYW5Db250cm9sbGVyOiBfQm9vbGVhbkNvbnRyb2xsZXIyLmRlZmF1bHQsXHJcblx0ICAgIE9wdGlvbkNvbnRyb2xsZXI6IF9PcHRpb25Db250cm9sbGVyMi5kZWZhdWx0LFxyXG5cdCAgICBTdHJpbmdDb250cm9sbGVyOiBfU3RyaW5nQ29udHJvbGxlcjIuZGVmYXVsdCxcclxuXHQgICAgTnVtYmVyQ29udHJvbGxlcjogX051bWJlckNvbnRyb2xsZXIyLmRlZmF1bHQsXHJcblx0ICAgIE51bWJlckNvbnRyb2xsZXJCb3g6IF9OdW1iZXJDb250cm9sbGVyQm94Mi5kZWZhdWx0LFxyXG5cdCAgICBOdW1iZXJDb250cm9sbGVyU2xpZGVyOiBfTnVtYmVyQ29udHJvbGxlclNsaWRlcjIuZGVmYXVsdCxcclxuXHQgICAgRnVuY3Rpb25Db250cm9sbGVyOiBfRnVuY3Rpb25Db250cm9sbGVyMi5kZWZhdWx0LFxyXG5cdCAgICBDb2xvckNvbnRyb2xsZXI6IF9Db2xvckNvbnRyb2xsZXIyLmRlZmF1bHRcclxuXHQgIH0sXHJcblx0XHJcblx0ICBkb206IHtcclxuXHQgICAgZG9tOiBfZG9tMi5kZWZhdWx0XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgZ3VpOiB7XHJcblx0ICAgIEdVSTogX0dVSTIuZGVmYXVsdFxyXG5cdCAgfSxcclxuXHRcclxuXHQgIEdVSTogX0dVSTIuZGVmYXVsdFxyXG5cdH07XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiAyICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX2ludGVycHJldCA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XHJcblx0XHJcblx0dmFyIF9pbnRlcnByZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW50ZXJwcmV0KTtcclxuXHRcclxuXHR2YXIgX21hdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xyXG5cdFxyXG5cdHZhciBfbWF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYXRoKTtcclxuXHRcclxuXHR2YXIgX3RvU3RyaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcclxuXHRcclxuXHR2YXIgX3RvU3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RvU3RyaW5nKTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tbW9uKTtcclxuXHRcclxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9IC8qKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuXHRcclxuXHR2YXIgQ29sb3IgPSBmdW5jdGlvbiAoKSB7XHJcblx0ICBmdW5jdGlvbiBDb2xvcigpIHtcclxuXHQgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbG9yKTtcclxuXHRcclxuXHQgICAgdGhpcy5fX3N0YXRlID0gX2ludGVycHJldDIuZGVmYXVsdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFxyXG5cdCAgICBpZiAodGhpcy5fX3N0YXRlID09PSBmYWxzZSkge1xyXG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGludGVycHJldCBjb2xvciBhcmd1bWVudHMnKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICB0aGlzLl9fc3RhdGUuYSA9IHRoaXMuX19zdGF0ZS5hIHx8IDE7XHJcblx0ICB9XHJcblx0XHJcblx0ICBDb2xvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHQgICAgcmV0dXJuICgwLCBfdG9TdHJpbmcyLmRlZmF1bHQpKHRoaXMpO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIENvbG9yLnByb3RvdHlwZS50b0hleFN0cmluZyA9IGZ1bmN0aW9uIHRvSGV4U3RyaW5nKCkge1xyXG5cdCAgICByZXR1cm4gKDAsIF90b1N0cmluZzIuZGVmYXVsdCkodGhpcywgdHJ1ZSk7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgQ29sb3IucHJvdG90eXBlLnRvT3JpZ2luYWwgPSBmdW5jdGlvbiB0b09yaWdpbmFsKCkge1xyXG5cdCAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmNvbnZlcnNpb24ud3JpdGUodGhpcyk7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgcmV0dXJuIENvbG9yO1xyXG5cdH0oKTtcclxuXHRcclxuXHRmdW5jdGlvbiBkZWZpbmVSR0JDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XHJcblx0ICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcclxuXHQgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XHJcblx0ICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ1JHQicpIHtcclxuXHQgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcclxuXHQgICAgICB9XHJcblx0XHJcblx0ICAgICAgQ29sb3IucmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XHJcblx0XHJcblx0ICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2KSB7XHJcblx0ICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ1JHQicpIHtcclxuXHQgICAgICAgIENvbG9yLnJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xyXG5cdCAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ1JHQic7XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcclxuXHQgICAgfVxyXG5cdCAgfSk7XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIGRlZmluZUhTVkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCkge1xyXG5cdCAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XHJcblx0ICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG5cdCAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKSB7XHJcblx0ICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIENvbG9yLnJlY2FsY3VsYXRlSFNWKHRoaXMpO1xyXG5cdFxyXG5cdCAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgc2V0OiBmdW5jdGlvbiBzZXQodikge1xyXG5cdCAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIU1YnKSB7XHJcblx0ICAgICAgICBDb2xvci5yZWNhbGN1bGF0ZUhTVih0aGlzKTtcclxuXHQgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIU1YnO1xyXG5cdCAgICAgIH1cclxuXHRcclxuXHQgICAgICB0aGlzLl9fc3RhdGVbY29tcG9uZW50XSA9IHY7XHJcblx0ICAgIH1cclxuXHQgIH0pO1xyXG5cdH1cclxuXHRcclxuXHRDb2xvci5yZWNhbGN1bGF0ZVJHQiA9IGZ1bmN0aW9uIChjb2xvciwgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCkge1xyXG5cdCAgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIRVgnKSB7XHJcblx0ICAgIGNvbG9yLl9fc3RhdGVbY29tcG9uZW50XSA9IF9tYXRoMi5kZWZhdWx0LmNvbXBvbmVudF9mcm9tX2hleChjb2xvci5fX3N0YXRlLmhleCwgY29tcG9uZW50SGV4SW5kZXgpO1xyXG5cdCAgfSBlbHNlIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSFNWJykge1xyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZChjb2xvci5fX3N0YXRlLCBfbWF0aDIuZGVmYXVsdC5oc3ZfdG9fcmdiKGNvbG9yLl9fc3RhdGUuaCwgY29sb3IuX19zdGF0ZS5zLCBjb2xvci5fX3N0YXRlLnYpKTtcclxuXHQgIH0gZWxzZSB7XHJcblx0ICAgIHRocm93IG5ldyBFcnJvcignQ29ycnVwdGVkIGNvbG9yIHN0YXRlJyk7XHJcblx0ICB9XHJcblx0fTtcclxuXHRcclxuXHRDb2xvci5yZWNhbGN1bGF0ZUhTViA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG5cdCAgdmFyIHJlc3VsdCA9IF9tYXRoMi5kZWZhdWx0LnJnYl90b19oc3YoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XHJcblx0XHJcblx0ICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZChjb2xvci5fX3N0YXRlLCB7XHJcblx0ICAgIHM6IHJlc3VsdC5zLFxyXG5cdCAgICB2OiByZXN1bHQudlxyXG5cdCAgfSk7XHJcblx0XHJcblx0ICBpZiAoIV9jb21tb24yLmRlZmF1bHQuaXNOYU4ocmVzdWx0LmgpKSB7XHJcblx0ICAgIGNvbG9yLl9fc3RhdGUuaCA9IHJlc3VsdC5oO1xyXG5cdCAgfSBlbHNlIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzVW5kZWZpbmVkKGNvbG9yLl9fc3RhdGUuaCkpIHtcclxuXHQgICAgY29sb3IuX19zdGF0ZS5oID0gMDtcclxuXHQgIH1cclxuXHR9O1xyXG5cdFxyXG5cdENvbG9yLkNPTVBPTkVOVFMgPSBbJ3InLCAnZycsICdiJywgJ2gnLCAncycsICd2JywgJ2hleCcsICdhJ107XHJcblx0XHJcblx0ZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3InLCAyKTtcclxuXHRkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnZycsIDEpO1xyXG5cdGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdiJywgMCk7XHJcblx0XHJcblx0ZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2gnKTtcclxuXHRkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncycpO1xyXG5cdGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICd2Jyk7XHJcblx0XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2EnLCB7XHJcblx0ICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuXHQgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5hO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIHNldDogZnVuY3Rpb24gc2V0KHYpIHtcclxuXHQgICAgdGhpcy5fX3N0YXRlLmEgPSB2O1xyXG5cdCAgfVxyXG5cdH0pO1xyXG5cdFxyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsICdoZXgnLCB7XHJcblx0ICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuXHQgICAgaWYgKCF0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIRVgnKSB7XHJcblx0ICAgICAgdGhpcy5fX3N0YXRlLmhleCA9IF9tYXRoMi5kZWZhdWx0LnJnYl90b19oZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5oZXg7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgc2V0OiBmdW5jdGlvbiBzZXQodikge1xyXG5cdCAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSEVYJztcclxuXHQgICAgdGhpcy5fX3N0YXRlLmhleCA9IHY7XHJcblx0ICB9XHJcblx0fSk7XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gQ29sb3I7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiAzICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX3RvU3RyaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcclxuXHRcclxuXHR2YXIgX3RvU3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RvU3RyaW5nKTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tbW9uKTtcclxuXHRcclxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAqXHJcblx0ICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgKlxyXG5cdCAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAqXHJcblx0ICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICovXHJcblx0XHJcblx0dmFyIElOVEVSUFJFVEFUSU9OUyA9IFtcclxuXHQvLyBTdHJpbmdzXHJcblx0e1xyXG5cdCAgbGl0bXVzOiBfY29tbW9uMi5kZWZhdWx0LmlzU3RyaW5nLFxyXG5cdCAgY29udmVyc2lvbnM6IHtcclxuXHQgICAgVEhSRUVfQ0hBUl9IRVg6IHtcclxuXHQgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XHJcblx0ICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XSkoW0EtRjAtOV0pKFtBLUYwLTldKSQvaSk7XHJcblx0ICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkge1xyXG5cdCAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgICAgICB9XHJcblx0XHJcblx0ICAgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgICBzcGFjZTogJ0hFWCcsXHJcblx0ICAgICAgICAgIGhleDogcGFyc2VJbnQoJzB4JyArIHRlc3RbMV0udG9TdHJpbmcoKSArIHRlc3RbMV0udG9TdHJpbmcoKSArIHRlc3RbMl0udG9TdHJpbmcoKSArIHRlc3RbMl0udG9TdHJpbmcoKSArIHRlc3RbM10udG9TdHJpbmcoKSArIHRlc3RbM10udG9TdHJpbmcoKSwgMClcclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgfSxcclxuXHRcclxuXHQgICAgICB3cml0ZTogX3RvU3RyaW5nMi5kZWZhdWx0XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIFNJWF9DSEFSX0hFWDoge1xyXG5cdCAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcclxuXHQgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldezZ9KSQvaSk7XHJcblx0ICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkge1xyXG5cdCAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgICAgICB9XHJcblx0XHJcblx0ICAgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgICBzcGFjZTogJ0hFWCcsXHJcblx0ICAgICAgICAgIGhleDogcGFyc2VJbnQoJzB4JyArIHRlc3RbMV0udG9TdHJpbmcoKSwgMClcclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgfSxcclxuXHRcclxuXHQgICAgICB3cml0ZTogX3RvU3RyaW5nMi5kZWZhdWx0XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIENTU19SR0I6IHtcclxuXHQgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XHJcblx0ICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCkvKTtcclxuXHQgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSB7XHJcblx0ICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgICAgIH1cclxuXHRcclxuXHQgICAgICAgIHJldHVybiB7XHJcblx0ICAgICAgICAgIHNwYWNlOiAnUkdCJyxcclxuXHQgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcclxuXHQgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcclxuXHQgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKVxyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICB9LFxyXG5cdFxyXG5cdCAgICAgIHdyaXRlOiBfdG9TdHJpbmcyLmRlZmF1bHRcclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgQ1NTX1JHQkE6IHtcclxuXHQgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XHJcblx0ICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiYVxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcKS8pO1xyXG5cdCAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHtcclxuXHQgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICAgICAgfVxyXG5cdFxyXG5cdCAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgc3BhY2U6ICdSR0InLFxyXG5cdCAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxyXG5cdCAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxyXG5cdCAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pLFxyXG5cdCAgICAgICAgICBhOiBwYXJzZUZsb2F0KHRlc3RbNF0pXHJcblx0ICAgICAgICB9O1xyXG5cdCAgICAgIH0sXHJcblx0XHJcblx0ICAgICAgd3JpdGU6IF90b1N0cmluZzIuZGVmYXVsdFxyXG5cdCAgICB9XHJcblx0ICB9XHJcblx0fSxcclxuXHRcclxuXHQvLyBOdW1iZXJzXHJcblx0e1xyXG5cdCAgbGl0bXVzOiBfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyLFxyXG5cdFxyXG5cdCAgY29udmVyc2lvbnM6IHtcclxuXHRcclxuXHQgICAgSEVYOiB7XHJcblx0ICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xyXG5cdCAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgc3BhY2U6ICdIRVgnLFxyXG5cdCAgICAgICAgICBoZXg6IG9yaWdpbmFsLFxyXG5cdCAgICAgICAgICBjb252ZXJzaW9uTmFtZTogJ0hFWCdcclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgfSxcclxuXHRcclxuXHQgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcclxuXHQgICAgICAgIHJldHVybiBjb2xvci5oZXg7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9XHJcblx0XHJcblx0ICB9XHJcblx0XHJcblx0fSxcclxuXHRcclxuXHQvLyBBcnJheXNcclxuXHR7XHJcblx0ICBsaXRtdXM6IF9jb21tb24yLmRlZmF1bHQuaXNBcnJheSxcclxuXHQgIGNvbnZlcnNpb25zOiB7XHJcblx0ICAgIFJHQl9BUlJBWToge1xyXG5cdCAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcclxuXHQgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT09IDMpIHtcclxuXHQgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICAgICAgfVxyXG5cdFxyXG5cdCAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgc3BhY2U6ICdSR0InLFxyXG5cdCAgICAgICAgICByOiBvcmlnaW5hbFswXSxcclxuXHQgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXHJcblx0ICAgICAgICAgIGI6IG9yaWdpbmFsWzJdXHJcblx0ICAgICAgICB9O1xyXG5cdCAgICAgIH0sXHJcblx0XHJcblx0ICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKGNvbG9yKSB7XHJcblx0ICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmJdO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgUkdCQV9BUlJBWToge1xyXG5cdCAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcclxuXHQgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT09IDQpIHJldHVybiBmYWxzZTtcclxuXHQgICAgICAgIHJldHVybiB7XHJcblx0ICAgICAgICAgIHNwYWNlOiAnUkdCJyxcclxuXHQgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXHJcblx0ICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxyXG5cdCAgICAgICAgICBiOiBvcmlnaW5hbFsyXSxcclxuXHQgICAgICAgICAgYTogb3JpZ2luYWxbM11cclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgfSxcclxuXHRcclxuXHQgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcclxuXHQgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYV07XHJcblx0ICAgICAgfVxyXG5cdCAgICB9XHJcblx0ICB9XHJcblx0fSxcclxuXHRcclxuXHQvLyBPYmplY3RzXHJcblx0e1xyXG5cdCAgbGl0bXVzOiBfY29tbW9uMi5kZWZhdWx0LmlzT2JqZWN0LFxyXG5cdCAgY29udmVyc2lvbnM6IHtcclxuXHRcclxuXHQgICAgUkdCQV9PQko6IHtcclxuXHQgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XHJcblx0ICAgICAgICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihvcmlnaW5hbC5yKSAmJiBfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmIF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIob3JpZ2luYWwuYikgJiYgX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihvcmlnaW5hbC5hKSkge1xyXG5cdCAgICAgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcclxuXHQgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxyXG5cdCAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXHJcblx0ICAgICAgICAgICAgYjogb3JpZ2luYWwuYixcclxuXHQgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXHJcblx0ICAgICAgICAgIH07XHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgICAgfSxcclxuXHRcclxuXHQgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcclxuXHQgICAgICAgIHJldHVybiB7XHJcblx0ICAgICAgICAgIHI6IGNvbG9yLnIsXHJcblx0ICAgICAgICAgIGc6IGNvbG9yLmcsXHJcblx0ICAgICAgICAgIGI6IGNvbG9yLmIsXHJcblx0ICAgICAgICAgIGE6IGNvbG9yLmFcclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgfVxyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICBSR0JfT0JKOiB7XHJcblx0ICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xyXG5cdCAgICAgICAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIob3JpZ2luYWwucikgJiYgX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihvcmlnaW5hbC5nKSAmJiBfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKG9yaWdpbmFsLmIpKSB7XHJcblx0ICAgICAgICAgIHJldHVybiB7XHJcblx0ICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxyXG5cdCAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXHJcblx0ICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcclxuXHQgICAgICAgICAgICBiOiBvcmlnaW5hbC5iXHJcblx0ICAgICAgICAgIH07XHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgICAgfSxcclxuXHRcclxuXHQgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcclxuXHQgICAgICAgIHJldHVybiB7XHJcblx0ICAgICAgICAgIHI6IGNvbG9yLnIsXHJcblx0ICAgICAgICAgIGc6IGNvbG9yLmcsXHJcblx0ICAgICAgICAgIGI6IGNvbG9yLmJcclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgfVxyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICBIU1ZBX09CSjoge1xyXG5cdCAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcclxuXHQgICAgICAgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmIF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIob3JpZ2luYWwucykgJiYgX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihvcmlnaW5hbC52KSAmJiBfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XHJcblx0ICAgICAgICAgIHJldHVybiB7XHJcblx0ICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxyXG5cdCAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXHJcblx0ICAgICAgICAgICAgczogb3JpZ2luYWwucyxcclxuXHQgICAgICAgICAgICB2OiBvcmlnaW5hbC52LFxyXG5cdCAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcclxuXHQgICAgICAgICAgfTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgICB9LFxyXG5cdFxyXG5cdCAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xyXG5cdCAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgaDogY29sb3IuaCxcclxuXHQgICAgICAgICAgczogY29sb3IucyxcclxuXHQgICAgICAgICAgdjogY29sb3IudixcclxuXHQgICAgICAgICAgYTogY29sb3IuYVxyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICB9XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIEhTVl9PQko6IHtcclxuXHQgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XHJcblx0ICAgICAgICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihvcmlnaW5hbC5oKSAmJiBfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmIF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIob3JpZ2luYWwudikpIHtcclxuXHQgICAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgICBzcGFjZTogJ0hTVicsXHJcblx0ICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcclxuXHQgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxyXG5cdCAgICAgICAgICAgIHY6IG9yaWdpbmFsLnZcclxuXHQgICAgICAgICAgfTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgICB9LFxyXG5cdFxyXG5cdCAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xyXG5cdCAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgaDogY29sb3IuaCxcclxuXHQgICAgICAgICAgczogY29sb3IucyxcclxuXHQgICAgICAgICAgdjogY29sb3IudlxyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICB9XHJcblx0ICAgIH1cclxuXHQgIH1cclxuXHR9XTtcclxuXHRcclxuXHR2YXIgcmVzdWx0ID0gdm9pZCAwO1xyXG5cdHZhciB0b1JldHVybiA9IHZvaWQgMDtcclxuXHRcclxuXHR2YXIgaW50ZXJwcmV0ID0gZnVuY3Rpb24gaW50ZXJwcmV0KCkge1xyXG5cdCAgdG9SZXR1cm4gPSBmYWxzZTtcclxuXHRcclxuXHQgIHZhciBvcmlnaW5hbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gX2NvbW1vbjIuZGVmYXVsdC50b0FycmF5KGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF07XHJcblx0ICBfY29tbW9uMi5kZWZhdWx0LmVhY2goSU5URVJQUkVUQVRJT05TLCBmdW5jdGlvbiAoZmFtaWx5KSB7XHJcblx0ICAgIGlmIChmYW1pbHkubGl0bXVzKG9yaWdpbmFsKSkge1xyXG5cdCAgICAgIF9jb21tb24yLmRlZmF1bHQuZWFjaChmYW1pbHkuY29udmVyc2lvbnMsIGZ1bmN0aW9uIChjb252ZXJzaW9uLCBjb252ZXJzaW9uTmFtZSkge1xyXG5cdCAgICAgICAgcmVzdWx0ID0gY29udmVyc2lvbi5yZWFkKG9yaWdpbmFsKTtcclxuXHRcclxuXHQgICAgICAgIGlmICh0b1JldHVybiA9PT0gZmFsc2UgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xyXG5cdCAgICAgICAgICB0b1JldHVybiA9IHJlc3VsdDtcclxuXHQgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb25OYW1lID0gY29udmVyc2lvbk5hbWU7XHJcblx0ICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uID0gY29udmVyc2lvbjtcclxuXHQgICAgICAgICAgcmV0dXJuIF9jb21tb24yLmRlZmF1bHQuQlJFQUs7XHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgfSk7XHJcblx0XHJcblx0ICAgICAgcmV0dXJuIF9jb21tb24yLmRlZmF1bHQuQlJFQUs7XHJcblx0ICAgIH1cclxuXHQgIH0pO1xyXG5cdFxyXG5cdCAgcmV0dXJuIHRvUmV0dXJuO1xyXG5cdH07XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gaW50ZXJwcmV0O1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xyXG5cclxuLyoqKi8gfSxcclxuLyogNCAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGNvbG9yLCBmb3JjZUNTU0hleCkge1xyXG5cdCAgdmFyIGNvbG9yRm9ybWF0ID0gY29sb3IuX19zdGF0ZS5jb252ZXJzaW9uTmFtZS50b1N0cmluZygpO1xyXG5cdFxyXG5cdCAgdmFyIHIgPSBNYXRoLnJvdW5kKGNvbG9yLnIpO1xyXG5cdCAgdmFyIGcgPSBNYXRoLnJvdW5kKGNvbG9yLmcpO1xyXG5cdCAgdmFyIGIgPSBNYXRoLnJvdW5kKGNvbG9yLmIpO1xyXG5cdCAgdmFyIGEgPSBjb2xvci5hO1xyXG5cdCAgdmFyIGggPSBNYXRoLnJvdW5kKGNvbG9yLmgpO1xyXG5cdCAgdmFyIHMgPSBjb2xvci5zLnRvRml4ZWQoMSk7XHJcblx0ICB2YXIgdiA9IGNvbG9yLnYudG9GaXhlZCgxKTtcclxuXHRcclxuXHQgIGlmIChmb3JjZUNTU0hleCB8fCBjb2xvckZvcm1hdCA9PT0gJ1RIUkVFX0NIQVJfSEVYJyB8fCBjb2xvckZvcm1hdCA9PT0gJ1NJWF9DSEFSX0hFWCcpIHtcclxuXHQgICAgdmFyIHN0ciA9IGNvbG9yLmhleC50b1N0cmluZygxNik7XHJcblx0ICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgNikge1xyXG5cdCAgICAgIHN0ciA9ICcwJyArIHN0cjtcclxuXHQgICAgfVxyXG5cdCAgICByZXR1cm4gJyMnICsgc3RyO1xyXG5cdCAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ0NTU19SR0InKSB7XHJcblx0ICAgIHJldHVybiAncmdiKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnKSc7XHJcblx0ICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnQ1NTX1JHQkEnKSB7XHJcblx0ICAgIHJldHVybiAncmdiYSgnICsgciArICcsJyArIGcgKyAnLCcgKyBiICsgJywnICsgYSArICcpJztcclxuXHQgIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdIRVgnKSB7XHJcblx0ICAgIHJldHVybiAnMHgnICsgY29sb3IuaGV4LnRvU3RyaW5nKDE2KTtcclxuXHQgIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdSR0JfQVJSQVknKSB7XHJcblx0ICAgIHJldHVybiAnWycgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnXSc7XHJcblx0ICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnUkdCQV9BUlJBWScpIHtcclxuXHQgICAgcmV0dXJuICdbJyArIHIgKyAnLCcgKyBnICsgJywnICsgYiArICcsJyArIGEgKyAnXSc7XHJcblx0ICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnUkdCX09CSicpIHtcclxuXHQgICAgcmV0dXJuICd7cjonICsgciArICcsZzonICsgZyArICcsYjonICsgYiArICd9JztcclxuXHQgIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdSR0JBX09CSicpIHtcclxuXHQgICAgcmV0dXJuICd7cjonICsgciArICcsZzonICsgZyArICcsYjonICsgYiArICcsYTonICsgYSArICd9JztcclxuXHQgIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdIU1ZfT0JKJykge1xyXG5cdCAgICByZXR1cm4gJ3toOicgKyBoICsgJyxzOicgKyBzICsgJyx2OicgKyB2ICsgJ30nO1xyXG5cdCAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ0hTVkFfT0JKJykge1xyXG5cdCAgICByZXR1cm4gJ3toOicgKyBoICsgJyxzOicgKyBzICsgJyx2OicgKyB2ICsgJyxhOicgKyBhICsgJ30nO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgcmV0dXJuICd1bmtub3duIGZvcm1hdCc7XHJcblx0fTtcclxuXHRcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsgLyoqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG5cclxuLyoqKi8gfSxcclxuLyogNSAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0LyoqXHJcblx0ICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICpcclxuXHQgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAqXHJcblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICpcclxuXHQgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgKi9cclxuXHRcclxuXHR2YXIgQVJSX0VBQ0ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcclxuXHR2YXIgQVJSX1NMSUNFID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEJhbmQtYWlkIG1ldGhvZHMgZm9yIHRoaW5ncyB0aGF0IHNob3VsZCBiZSBhIGxvdCBlYXNpZXIgaW4gSmF2YVNjcmlwdC5cclxuXHQgKiBJbXBsZW1lbnRhdGlvbiBhbmQgc3RydWN0dXJlIGluc3BpcmVkIGJ5IHVuZGVyc2NvcmUuanNcclxuXHQgKiBodHRwOi8vZG9jdW1lbnRjbG91ZC5naXRodWIuY29tL3VuZGVyc2NvcmUvXHJcblx0ICovXHJcblx0XHJcblx0dmFyIENvbW1vbiA9IHtcclxuXHQgIEJSRUFLOiB7fSxcclxuXHRcclxuXHQgIGV4dGVuZDogZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCkge1xyXG5cdCAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24gKG9iaikge1xyXG5cdCAgICAgIHZhciBrZXlzID0gdGhpcy5pc09iamVjdChvYmopID8gT2JqZWN0LmtleXMob2JqKSA6IFtdO1xyXG5cdCAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcblx0ICAgICAgICBpZiAoIXRoaXMuaXNVbmRlZmluZWQob2JqW2tleV0pKSB7XHJcblx0ICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHQgICAgfSwgdGhpcyk7XHJcblx0XHJcblx0ICAgIHJldHVybiB0YXJnZXQ7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgZGVmYXVsdHM6IGZ1bmN0aW9uIGRlZmF1bHRzKHRhcmdldCkge1xyXG5cdCAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24gKG9iaikge1xyXG5cdCAgICAgIHZhciBrZXlzID0gdGhpcy5pc09iamVjdChvYmopID8gT2JqZWN0LmtleXMob2JqKSA6IFtdO1xyXG5cdCAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcblx0ICAgICAgICBpZiAodGhpcy5pc1VuZGVmaW5lZCh0YXJnZXRba2V5XSkpIHtcclxuXHQgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICB9LmJpbmQodGhpcykpO1xyXG5cdCAgICB9LCB0aGlzKTtcclxuXHRcclxuXHQgICAgcmV0dXJuIHRhcmdldDtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBjb21wb3NlOiBmdW5jdGlvbiBjb21wb3NlKCkge1xyXG5cdCAgICB2YXIgdG9DYWxsID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcclxuXHQgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICB2YXIgYXJncyA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XHJcblx0ICAgICAgZm9yICh2YXIgaSA9IHRvQ2FsbC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdCAgICAgICAgYXJncyA9IFt0b0NhbGxbaV0uYXBwbHkodGhpcywgYXJncyldO1xyXG5cdCAgICAgIH1cclxuXHQgICAgICByZXR1cm4gYXJnc1swXTtcclxuXHQgICAgfTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBlYWNoOiBmdW5jdGlvbiBlYWNoKG9iaiwgaXRyLCBzY29wZSkge1xyXG5cdCAgICBpZiAoIW9iaikge1xyXG5cdCAgICAgIHJldHVybjtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBpZiAoQVJSX0VBQ0ggJiYgb2JqLmZvckVhY2ggJiYgb2JqLmZvckVhY2ggPT09IEFSUl9FQUNIKSB7XHJcblx0ICAgICAgb2JqLmZvckVhY2goaXRyLCBzY29wZSk7XHJcblx0ICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gb2JqLmxlbmd0aCArIDApIHtcclxuXHQgICAgICAvLyBJcyBudW1iZXIgYnV0IG5vdCBOYU5cclxuXHQgICAgICB2YXIga2V5ID0gdm9pZCAwO1xyXG5cdCAgICAgIHZhciBsID0gdm9pZCAwO1xyXG5cdCAgICAgIGZvciAoa2V5ID0gMCwgbCA9IG9iai5sZW5ndGg7IGtleSA8IGw7IGtleSsrKSB7XHJcblx0ICAgICAgICBpZiAoa2V5IGluIG9iaiAmJiBpdHIuY2FsbChzY29wZSwgb2JqW2tleV0sIGtleSkgPT09IHRoaXMuQlJFQUspIHtcclxuXHQgICAgICAgICAgcmV0dXJuO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgIH1cclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICBmb3IgKHZhciBfa2V5IGluIG9iaikge1xyXG5cdCAgICAgICAgaWYgKGl0ci5jYWxsKHNjb3BlLCBvYmpbX2tleV0sIF9rZXkpID09PSB0aGlzLkJSRUFLKSB7XHJcblx0ICAgICAgICAgIHJldHVybjtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICB9XHJcblx0ICAgIH1cclxuXHQgIH0sXHJcblx0XHJcblx0ICBkZWZlcjogZnVuY3Rpb24gZGVmZXIoZm5jKSB7XHJcblx0ICAgIHNldFRpbWVvdXQoZm5jLCAwKTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICAvLyBpZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHJlcGVhdGVkbHksIHdhaXQgdW50aWwgdGhyZXNob2xkIHBhc3NlcyB1bnRpbCB3ZSBleGVjdXRlIHRoZSBmdW5jdGlvblxyXG5cdCAgZGVib3VuY2U6IGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHRocmVzaG9sZCwgY2FsbEltbWVkaWF0ZWx5KSB7XHJcblx0ICAgIHZhciB0aW1lb3V0ID0gdm9pZCAwO1xyXG5cdFxyXG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgIHZhciBvYmogPSB0aGlzO1xyXG5cdCAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG5cdCAgICAgIGZ1bmN0aW9uIGRlbGF5ZWQoKSB7XHJcblx0ICAgICAgICB0aW1lb3V0ID0gbnVsbDtcclxuXHQgICAgICAgIGlmICghY2FsbEltbWVkaWF0ZWx5KSBmdW5jLmFwcGx5KG9iaiwgYXJncyk7XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIHZhciBjYWxsTm93ID0gY2FsbEltbWVkaWF0ZWx5IHx8ICF0aW1lb3V0O1xyXG5cdFxyXG5cdCAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHQgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChkZWxheWVkLCB0aHJlc2hvbGQpO1xyXG5cdFxyXG5cdCAgICAgIGlmIChjYWxsTm93KSB7XHJcblx0ICAgICAgICBmdW5jLmFwcGx5KG9iaiwgYXJncyk7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9O1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIHRvQXJyYXk6IGZ1bmN0aW9uIHRvQXJyYXkob2JqKSB7XHJcblx0ICAgIGlmIChvYmoudG9BcnJheSkgcmV0dXJuIG9iai50b0FycmF5KCk7XHJcblx0ICAgIHJldHVybiBBUlJfU0xJQ0UuY2FsbChvYmopO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcclxuXHQgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGlzTnVsbDogZnVuY3Rpb24gaXNOdWxsKG9iaikge1xyXG5cdCAgICByZXR1cm4gb2JqID09PSBudWxsO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGlzTmFOOiBmdW5jdGlvbiAoX2lzTmFOKSB7XHJcblx0ICAgIGZ1bmN0aW9uIGlzTmFOKF94KSB7XHJcblx0ICAgICAgcmV0dXJuIF9pc05hTi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGlzTmFOLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgIHJldHVybiBfaXNOYU4udG9TdHJpbmcoKTtcclxuXHQgICAgfTtcclxuXHRcclxuXHQgICAgcmV0dXJuIGlzTmFOO1xyXG5cdCAgfShmdW5jdGlvbiAob2JqKSB7XHJcblx0ICAgIHJldHVybiBpc05hTihvYmopO1xyXG5cdCAgfSksXHJcblx0XHJcblx0ICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChvYmopIHtcclxuXHQgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgaXNPYmplY3Q6IGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xyXG5cdCAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBpc051bWJlcjogZnVuY3Rpb24gaXNOdW1iZXIob2JqKSB7XHJcblx0ICAgIHJldHVybiBvYmogPT09IG9iaiArIDA7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgaXNTdHJpbmc6IGZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xyXG5cdCAgICByZXR1cm4gb2JqID09PSBvYmogKyAnJztcclxuXHQgIH0sXHJcblx0XHJcblx0ICBpc0Jvb2xlYW46IGZ1bmN0aW9uIGlzQm9vbGVhbihvYmopIHtcclxuXHQgICAgcmV0dXJuIG9iaiA9PT0gZmFsc2UgfHwgb2JqID09PSB0cnVlO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIGlzRnVuY3Rpb246IGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XHJcblx0ICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuXHQgIH1cclxuXHRcclxuXHR9O1xyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IENvbW1vbjtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDYgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XHJcblxyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0LyoqXHJcblx0ICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICpcclxuXHQgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAqXHJcblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICpcclxuXHQgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgKi9cclxuXHRcclxuXHR2YXIgdG1wQ29tcG9uZW50ID0gdm9pZCAwO1xyXG5cdFxyXG5cdHZhciBDb2xvck1hdGggPSB7XHJcblx0ICBoc3ZfdG9fcmdiOiBmdW5jdGlvbiBoc3ZfdG9fcmdiKGgsIHMsIHYpIHtcclxuXHQgICAgdmFyIGhpID0gTWF0aC5mbG9vcihoIC8gNjApICUgNjtcclxuXHRcclxuXHQgICAgdmFyIGYgPSBoIC8gNjAgLSBNYXRoLmZsb29yKGggLyA2MCk7XHJcblx0ICAgIHZhciBwID0gdiAqICgxLjAgLSBzKTtcclxuXHQgICAgdmFyIHEgPSB2ICogKDEuMCAtIGYgKiBzKTtcclxuXHQgICAgdmFyIHQgPSB2ICogKDEuMCAtICgxLjAgLSBmKSAqIHMpO1xyXG5cdFxyXG5cdCAgICB2YXIgYyA9IFtbdiwgdCwgcF0sIFtxLCB2LCBwXSwgW3AsIHYsIHRdLCBbcCwgcSwgdl0sIFt0LCBwLCB2XSwgW3YsIHAsIHFdXVtoaV07XHJcblx0XHJcblx0ICAgIHJldHVybiB7XHJcblx0ICAgICAgcjogY1swXSAqIDI1NSxcclxuXHQgICAgICBnOiBjWzFdICogMjU1LFxyXG5cdCAgICAgIGI6IGNbMl0gKiAyNTVcclxuXHQgICAgfTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICByZ2JfdG9faHN2OiBmdW5jdGlvbiByZ2JfdG9faHN2KHIsIGcsIGIpIHtcclxuXHQgICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xyXG5cdCAgICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XHJcblx0ICAgIHZhciBkZWx0YSA9IG1heCAtIG1pbjtcclxuXHQgICAgdmFyIGggPSB2b2lkIDA7XHJcblx0ICAgIHZhciBzID0gdm9pZCAwO1xyXG5cdFxyXG5cdCAgICBpZiAobWF4ICE9PSAwKSB7XHJcblx0ICAgICAgcyA9IGRlbHRhIC8gbWF4O1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgIHJldHVybiB7XHJcblx0ICAgICAgICBoOiBOYU4sXHJcblx0ICAgICAgICBzOiAwLFxyXG5cdCAgICAgICAgdjogMFxyXG5cdCAgICAgIH07XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgaWYgKHIgPT09IG1heCkge1xyXG5cdCAgICAgIGggPSAoZyAtIGIpIC8gZGVsdGE7XHJcblx0ICAgIH0gZWxzZSBpZiAoZyA9PT0gbWF4KSB7XHJcblx0ICAgICAgaCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0ICAgICAgaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XHJcblx0ICAgIH1cclxuXHQgICAgaCAvPSA2O1xyXG5cdCAgICBpZiAoaCA8IDApIHtcclxuXHQgICAgICBoICs9IDE7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgcmV0dXJuIHtcclxuXHQgICAgICBoOiBoICogMzYwLFxyXG5cdCAgICAgIHM6IHMsXHJcblx0ICAgICAgdjogbWF4IC8gMjU1XHJcblx0ICAgIH07XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgcmdiX3RvX2hleDogZnVuY3Rpb24gcmdiX3RvX2hleChyLCBnLCBiKSB7XHJcblx0ICAgIHZhciBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudCgwLCAyLCByKTtcclxuXHQgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAxLCBnKTtcclxuXHQgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAwLCBiKTtcclxuXHQgICAgcmV0dXJuIGhleDtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBjb21wb25lbnRfZnJvbV9oZXg6IGZ1bmN0aW9uIGNvbXBvbmVudF9mcm9tX2hleChoZXgsIGNvbXBvbmVudEluZGV4KSB7XHJcblx0ICAgIHJldHVybiBoZXggPj4gY29tcG9uZW50SW5kZXggKiA4ICYgMHhGRjtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBoZXhfd2l0aF9jb21wb25lbnQ6IGZ1bmN0aW9uIGhleF93aXRoX2NvbXBvbmVudChoZXgsIGNvbXBvbmVudEluZGV4LCB2YWx1ZSkge1xyXG5cdCAgICByZXR1cm4gdmFsdWUgPDwgKHRtcENvbXBvbmVudCA9IGNvbXBvbmVudEluZGV4ICogOCkgfCBoZXggJiB+KDB4RkYgPDwgdG1wQ29tcG9uZW50KTtcclxuXHQgIH1cclxuXHR9O1xyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IENvbG9yTWF0aDtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xyXG5cclxuLyoqKi8gfSxcclxuLyogNyAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgKlxyXG5cdCAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICpcclxuXHQgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgKlxyXG5cdCAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAqL1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBjbGFzcyBBbiBcImFic3RyYWN0XCIgY2xhc3MgdGhhdCByZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxyXG5cdCAqXHJcblx0ICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcclxuXHQgKi9cclxuXHR2YXIgQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcclxuXHQgIGZ1bmN0aW9uIENvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSkge1xyXG5cdCAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29udHJvbGxlcik7XHJcblx0XHJcblx0ICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcclxuXHRcclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRob3NlIHdobyBleHRlbmQgdGhpcyBjbGFzcyB3aWxsIHB1dCB0aGVpciBET00gZWxlbWVudHMgaW4gaGVyZS5cclxuXHQgICAgICogQHR5cGUge0RPTUVsZW1lbnR9XHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRoZSBvYmplY3QgdG8gbWFuaXB1bGF0ZVxyXG5cdCAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XHJcblx0XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gbWFuaXB1bGF0ZVxyXG5cdCAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xyXG5cdFxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBjaGFuZ2UuXHJcblx0ICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cclxuXHQgICAgICogQGlnbm9yZVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fX29uQ2hhbmdlID0gdW5kZWZpbmVkO1xyXG5cdFxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBmaW5pc2hpbmcgY2hhbmdlLlxyXG5cdCAgICAgKiBAdHlwZSB7RnVuY3Rpb259XHJcblx0ICAgICAqIEBpZ25vcmVcclxuXHQgICAgICovXHJcblx0ICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZSA9IHVuZGVmaW5lZDtcclxuXHQgIH1cclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogU3BlY2lmeSB0aGF0IGEgZnVuY3Rpb24gZmlyZSBldmVyeSB0aW1lIHNvbWVvbmUgY2hhbmdlcyB0aGUgdmFsdWUgd2l0aFxyXG5cdCAgICogdGhpcyBDb250cm9sbGVyLlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuYyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSB2YWx1ZVxyXG5cdCAgICogaXMgbW9kaWZpZWQgdmlhIHRoaXMgQ29udHJvbGxlci5cclxuXHQgICAqIEByZXR1cm5zIHtDb250cm9sbGVyfSB0aGlzXHJcblx0ICAgKi9cclxuXHRcclxuXHRcclxuXHQgIENvbnRyb2xsZXIucHJvdG90eXBlLm9uQ2hhbmdlID0gZnVuY3Rpb24gb25DaGFuZ2UoZm5jKSB7XHJcblx0ICAgIHRoaXMuX19vbkNoYW5nZSA9IGZuYztcclxuXHQgICAgcmV0dXJuIHRoaXM7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKiBTcGVjaWZ5IHRoYXQgYSBmdW5jdGlvbiBmaXJlIGV2ZXJ5IHRpbWUgc29tZW9uZSBcImZpbmlzaGVzXCIgY2hhbmdpbmdcclxuXHQgICAqIHRoZSB2YWx1ZSB3aWggdGhpcyBDb250cm9sbGVyLiBVc2VmdWwgZm9yIHZhbHVlcyB0aGF0IGNoYW5nZVxyXG5cdCAgICogaW5jcmVtZW50YWxseSBsaWtlIG51bWJlcnMgb3Igc3RyaW5ncy5cclxuXHQgICAqXHJcblx0ICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbmMgVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlclxyXG5cdCAgICogc29tZW9uZSBcImZpbmlzaGVzXCIgY2hhbmdpbmcgdGhlIHZhbHVlIHZpYSB0aGlzIENvbnRyb2xsZXIuXHJcblx0ICAgKiBAcmV0dXJucyB7Q29udHJvbGxlcn0gdGhpc1xyXG5cdCAgICovXHJcblx0XHJcblx0XHJcblx0ICBDb250cm9sbGVyLnByb3RvdHlwZS5vbkZpbmlzaENoYW5nZSA9IGZ1bmN0aW9uIG9uRmluaXNoQ2hhbmdlKGZuYykge1xyXG5cdCAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UgPSBmbmM7XHJcblx0ICAgIHJldHVybiB0aGlzO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogQ2hhbmdlIHRoZSB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSB7T2JqZWN0fSBuZXdWYWx1ZSBUaGUgbmV3IHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XHJcblx0ICAgKi9cclxuXHRcclxuXHRcclxuXHQgIENvbnRyb2xsZXIucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gc2V0VmFsdWUobmV3VmFsdWUpIHtcclxuXHQgICAgdGhpcy5vYmplY3RbdGhpcy5wcm9wZXJ0eV0gPSBuZXdWYWx1ZTtcclxuXHQgICAgaWYgKHRoaXMuX19vbkNoYW5nZSkge1xyXG5cdCAgICAgIHRoaXMuX19vbkNoYW5nZS5jYWxsKHRoaXMsIG5ld1ZhbHVlKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcclxuXHQgICAgcmV0dXJuIHRoaXM7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKiBHZXRzIHRoZSB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxyXG5cdCAgICpcclxuXHQgICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBjdXJyZW50IHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XHJcblx0ICAgKi9cclxuXHRcclxuXHRcclxuXHQgIENvbnRyb2xsZXIucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XHJcblx0ICAgIHJldHVybiB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XTtcclxuXHQgIH07XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIFJlZnJlc2hlcyB0aGUgdmlzdWFsIGRpc3BsYXkgb2YgYSBDb250cm9sbGVyIGluIG9yZGVyIHRvIGtlZXAgc3luY1xyXG5cdCAgICogd2l0aCB0aGUgb2JqZWN0J3MgY3VycmVudCB2YWx1ZS5cclxuXHQgICAqIEByZXR1cm5zIHtDb250cm9sbGVyfSB0aGlzXHJcblx0ICAgKi9cclxuXHRcclxuXHRcclxuXHQgIENvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkgPSBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xyXG5cdCAgICByZXR1cm4gdGhpcztcclxuXHQgIH07XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIHRoZSB2YWx1ZSBoYXMgZGV2aWF0ZWQgZnJvbSBpbml0aWFsVmFsdWVcclxuXHQgICAqL1xyXG5cdFxyXG5cdFxyXG5cdCAgQ29udHJvbGxlci5wcm90b3R5cGUuaXNNb2RpZmllZCA9IGZ1bmN0aW9uIGlzTW9kaWZpZWQoKSB7XHJcblx0ICAgIHJldHVybiB0aGlzLmluaXRpYWxWYWx1ZSAhPT0gdGhpcy5nZXRWYWx1ZSgpO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIHJldHVybiBDb250cm9sbGVyO1xyXG5cdH0oKTtcclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSBDb250cm9sbGVyO1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xyXG5cclxuLyoqKi8gfSxcclxuLyogOCAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyMiA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbnRyb2xsZXIyKTtcclxuXHRcclxuXHR2YXIgX2RvbSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XHJcblx0XHJcblx0dmFyIF9kb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZG9tKTtcclxuXHRcclxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9IC8qKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblx0XHJcblx0LyoqXHJcblx0ICogQGNsYXNzIFByb3ZpZGVzIGEgY2hlY2tib3ggaW5wdXQgdG8gYWx0ZXIgdGhlIGJvb2xlYW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxyXG5cdCAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xyXG5cdCAqL1xyXG5cdHZhciBCb29sZWFuQ29udHJvbGxlciA9IGZ1bmN0aW9uIChfQ29udHJvbGxlcikge1xyXG5cdCAgX2luaGVyaXRzKEJvb2xlYW5Db250cm9sbGVyLCBfQ29udHJvbGxlcik7XHJcblx0XHJcblx0ICBmdW5jdGlvbiBCb29sZWFuQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KSB7XHJcblx0ICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb29sZWFuQ29udHJvbGxlcik7XHJcblx0XHJcblx0ICAgIHZhciBfdGhpczIgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29udHJvbGxlci5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpKTtcclxuXHRcclxuXHQgICAgdmFyIF90aGlzID0gX3RoaXMyO1xyXG5cdCAgICBfdGhpczIuX19wcmV2ID0gX3RoaXMyLmdldFZhbHVlKCk7XHJcblx0XHJcblx0ICAgIF90aGlzMi5fX2NoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHQgICAgX3RoaXMyLl9fY2hlY2tib3guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XHJcblx0XHJcblx0ICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xyXG5cdCAgICAgIF90aGlzLnNldFZhbHVlKCFfdGhpcy5fX3ByZXYpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19jaGVja2JveCwgJ2NoYW5nZScsIG9uQ2hhbmdlLCBmYWxzZSk7XHJcblx0XHJcblx0ICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX2NoZWNrYm94KTtcclxuXHRcclxuXHQgICAgLy8gTWF0Y2ggb3JpZ2luYWwgdmFsdWVcclxuXHQgICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcclxuXHQgICAgcmV0dXJuIF90aGlzMjtcclxuXHQgIH1cclxuXHRcclxuXHQgIEJvb2xlYW5Db250cm9sbGVyLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uIHNldFZhbHVlKHYpIHtcclxuXHQgICAgdmFyIHRvUmV0dXJuID0gX0NvbnRyb2xsZXIucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgdik7XHJcblx0ICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcclxuXHQgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xyXG5cdCAgICB9XHJcblx0ICAgIHRoaXMuX19wcmV2ID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG5cdCAgICByZXR1cm4gdG9SZXR1cm47XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgQm9vbGVhbkNvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkgPSBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xyXG5cdCAgICBpZiAodGhpcy5nZXRWYWx1ZSgpID09PSB0cnVlKSB7XHJcblx0ICAgICAgdGhpcy5fX2NoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcblx0ICAgICAgdGhpcy5fX2NoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xyXG5cdCAgICAgIHRoaXMuX19wcmV2ID0gdHJ1ZTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xyXG5cdCAgICAgIHRoaXMuX19wcmV2ID0gZmFsc2U7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgcmV0dXJuIF9Db250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgcmV0dXJuIEJvb2xlYW5Db250cm9sbGVyO1xyXG5cdH0oX0NvbnRyb2xsZXIzLmRlZmF1bHQpO1xyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IEJvb2xlYW5Db250cm9sbGVyO1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xyXG5cclxuLyoqKi8gfSxcclxuLyogOSAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0dmFyIF9jb21tb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xyXG5cdFxyXG5cdHZhciBfY29tbW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbW1vbik7XHJcblx0XHJcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cclxuXHRcclxuXHR2YXIgRVZFTlRfTUFQID0ge1xyXG5cdCAgSFRNTEV2ZW50czogWydjaGFuZ2UnXSxcclxuXHQgIE1vdXNlRXZlbnRzOiBbJ2NsaWNrJywgJ21vdXNlbW92ZScsICdtb3VzZWRvd24nLCAnbW91c2V1cCcsICdtb3VzZW92ZXInXSxcclxuXHQgIEtleWJvYXJkRXZlbnRzOiBbJ2tleWRvd24nXVxyXG5cdH07IC8qKlxyXG5cdCAgICAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgICAgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAgICAqXHJcblx0ICAgICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgICAgKlxyXG5cdCAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICAgICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAgICAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAgICAqXHJcblx0ICAgICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICAgICovXHJcblx0XHJcblx0dmFyIEVWRU5UX01BUF9JTlYgPSB7fTtcclxuXHRfY29tbW9uMi5kZWZhdWx0LmVhY2goRVZFTlRfTUFQLCBmdW5jdGlvbiAodiwgaykge1xyXG5cdCAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKHYsIGZ1bmN0aW9uIChlKSB7XHJcblx0ICAgIEVWRU5UX01BUF9JTlZbZV0gPSBrO1xyXG5cdCAgfSk7XHJcblx0fSk7XHJcblx0XHJcblx0dmFyIENTU19WQUxVRV9QSVhFTFMgPSAvKFxcZCsoXFwuXFxkKyk/KXB4LztcclxuXHRcclxuXHRmdW5jdGlvbiBjc3NWYWx1ZVRvUGl4ZWxzKHZhbCkge1xyXG5cdCAgaWYgKHZhbCA9PT0gJzAnIHx8IF9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQodmFsKSkge1xyXG5cdCAgICByZXR1cm4gMDtcclxuXHQgIH1cclxuXHRcclxuXHQgIHZhciBtYXRjaCA9IHZhbC5tYXRjaChDU1NfVkFMVUVfUElYRUxTKTtcclxuXHRcclxuXHQgIGlmICghX2NvbW1vbjIuZGVmYXVsdC5pc051bGwobWF0Y2gpKSB7XHJcblx0ICAgIHJldHVybiBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcclxuXHQgIH1cclxuXHRcclxuXHQgIC8vIFRPRE8gLi4uZW1zPyAlP1xyXG5cdFxyXG5cdCAgcmV0dXJuIDA7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBuYW1lc3BhY2VcclxuXHQgKiBAbWVtYmVyIGRhdC5kb21cclxuXHQgKi9cclxuXHR2YXIgZG9tID0ge1xyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIGVsZW1cclxuXHQgICAqIEBwYXJhbSBzZWxlY3RhYmxlXHJcblx0ICAgKi9cclxuXHQgIG1ha2VTZWxlY3RhYmxlOiBmdW5jdGlvbiBtYWtlU2VsZWN0YWJsZShlbGVtLCBzZWxlY3RhYmxlKSB7XHJcblx0ICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQgfHwgZWxlbS5zdHlsZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblx0XHJcblx0ICAgIGVsZW0ub25zZWxlY3RzdGFydCA9IHNlbGVjdGFibGUgPyBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICB9IDogZnVuY3Rpb24gKCkge307XHJcblx0XHJcblx0ICAgIGVsZW0uc3R5bGUuTW96VXNlclNlbGVjdCA9IHNlbGVjdGFibGUgPyAnYXV0bycgOiAnbm9uZSc7XHJcblx0ICAgIGVsZW0uc3R5bGUuS2h0bWxVc2VyU2VsZWN0ID0gc2VsZWN0YWJsZSA/ICdhdXRvJyA6ICdub25lJztcclxuXHQgICAgZWxlbS51bnNlbGVjdGFibGUgPSBzZWxlY3RhYmxlID8gJ29uJyA6ICdvZmYnO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSBlbGVtXHJcblx0ICAgKiBAcGFyYW0gaG9yaXpvbnRhbFxyXG5cdCAgICogQHBhcmFtIHZlcnRcclxuXHQgICAqL1xyXG5cdCAgbWFrZUZ1bGxzY3JlZW46IGZ1bmN0aW9uIG1ha2VGdWxsc2NyZWVuKGVsZW0sIGhvciwgdmVydCkge1xyXG5cdCAgICB2YXIgdmVydGljYWwgPSB2ZXJ0O1xyXG5cdCAgICB2YXIgaG9yaXpvbnRhbCA9IGhvcjtcclxuXHRcclxuXHQgICAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQoaG9yaXpvbnRhbCkpIHtcclxuXHQgICAgICBob3Jpem9udGFsID0gdHJ1ZTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc1VuZGVmaW5lZCh2ZXJ0aWNhbCkpIHtcclxuXHQgICAgICB2ZXJ0aWNhbCA9IHRydWU7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgZWxlbS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHJcblx0ICAgIGlmIChob3Jpem9udGFsKSB7XHJcblx0ICAgICAgZWxlbS5zdHlsZS5sZWZ0ID0gMDtcclxuXHQgICAgICBlbGVtLnN0eWxlLnJpZ2h0ID0gMDtcclxuXHQgICAgfVxyXG5cdCAgICBpZiAodmVydGljYWwpIHtcclxuXHQgICAgICBlbGVtLnN0eWxlLnRvcCA9IDA7XHJcblx0ICAgICAgZWxlbS5zdHlsZS5ib3R0b20gPSAwO1xyXG5cdCAgICB9XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIGVsZW1cclxuXHQgICAqIEBwYXJhbSBldmVudFR5cGVcclxuXHQgICAqIEBwYXJhbSBwYXJhbXNcclxuXHQgICAqL1xyXG5cdCAgZmFrZUV2ZW50OiBmdW5jdGlvbiBmYWtlRXZlbnQoZWxlbSwgZXZlbnRUeXBlLCBwYXJzLCBhdXgpIHtcclxuXHQgICAgdmFyIHBhcmFtcyA9IHBhcnMgfHwge307XHJcblx0ICAgIHZhciBjbGFzc05hbWUgPSBFVkVOVF9NQVBfSU5WW2V2ZW50VHlwZV07XHJcblx0ICAgIGlmICghY2xhc3NOYW1lKSB7XHJcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudCB0eXBlICcgKyBldmVudFR5cGUgKyAnIG5vdCBzdXBwb3J0ZWQuJyk7XHJcblx0ICAgIH1cclxuXHQgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KGNsYXNzTmFtZSk7XHJcblx0ICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XHJcblx0ICAgICAgY2FzZSAnTW91c2VFdmVudHMnOlxyXG5cdCAgICAgICAge1xyXG5cdCAgICAgICAgICB2YXIgY2xpZW50WCA9IHBhcmFtcy54IHx8IHBhcmFtcy5jbGllbnRYIHx8IDA7XHJcblx0ICAgICAgICAgIHZhciBjbGllbnRZID0gcGFyYW1zLnkgfHwgcGFyYW1zLmNsaWVudFkgfHwgMDtcclxuXHQgICAgICAgICAgZXZ0LmluaXRNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsIHBhcmFtcy5jYW5jZWxhYmxlIHx8IHRydWUsIHdpbmRvdywgcGFyYW1zLmNsaWNrQ291bnQgfHwgMSwgMCwgLy8gc2NyZWVuIFhcclxuXHQgICAgICAgICAgMCwgLy8gc2NyZWVuIFlcclxuXHQgICAgICAgICAgY2xpZW50WCwgLy8gY2xpZW50IFhcclxuXHQgICAgICAgICAgY2xpZW50WSwgLy8gY2xpZW50IFlcclxuXHQgICAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xyXG5cdCAgICAgICAgICBicmVhaztcclxuXHQgICAgICAgIH1cclxuXHQgICAgICBjYXNlICdLZXlib2FyZEV2ZW50cyc6XHJcblx0ICAgICAgICB7XHJcblx0ICAgICAgICAgIHZhciBpbml0ID0gZXZ0LmluaXRLZXlib2FyZEV2ZW50IHx8IGV2dC5pbml0S2V5RXZlbnQ7IC8vIHdlYmtpdCB8fCBtb3pcclxuXHQgICAgICAgICAgX2NvbW1vbjIuZGVmYXVsdC5kZWZhdWx0cyhwYXJhbXMsIHtcclxuXHQgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG5cdCAgICAgICAgICAgIGN0cmxLZXk6IGZhbHNlLFxyXG5cdCAgICAgICAgICAgIGFsdEtleTogZmFsc2UsXHJcblx0ICAgICAgICAgICAgc2hpZnRLZXk6IGZhbHNlLFxyXG5cdCAgICAgICAgICAgIG1ldGFLZXk6IGZhbHNlLFxyXG5cdCAgICAgICAgICAgIGtleUNvZGU6IHVuZGVmaW5lZCxcclxuXHQgICAgICAgICAgICBjaGFyQ29kZTogdW5kZWZpbmVkXHJcblx0ICAgICAgICAgIH0pO1xyXG5cdCAgICAgICAgICBpbml0KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsIHBhcmFtcy5jYW5jZWxhYmxlLCB3aW5kb3csIHBhcmFtcy5jdHJsS2V5LCBwYXJhbXMuYWx0S2V5LCBwYXJhbXMuc2hpZnRLZXksIHBhcmFtcy5tZXRhS2V5LCBwYXJhbXMua2V5Q29kZSwgcGFyYW1zLmNoYXJDb2RlKTtcclxuXHQgICAgICAgICAgYnJlYWs7XHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgZGVmYXVsdDpcclxuXHQgICAgICAgIHtcclxuXHQgICAgICAgICAgZXZ0LmluaXRFdmVudChldmVudFR5cGUsIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLCBwYXJhbXMuY2FuY2VsYWJsZSB8fCB0cnVlKTtcclxuXHQgICAgICAgICAgYnJlYWs7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5kZWZhdWx0cyhldnQsIGF1eCk7XHJcblx0ICAgIGVsZW0uZGlzcGF0Y2hFdmVudChldnQpO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSBlbGVtXHJcblx0ICAgKiBAcGFyYW0gZXZlbnRcclxuXHQgICAqIEBwYXJhbSBmdW5jXHJcblx0ICAgKiBAcGFyYW0gYm9vbFxyXG5cdCAgICovXHJcblx0ICBiaW5kOiBmdW5jdGlvbiBiaW5kKGVsZW0sIGV2ZW50LCBmdW5jLCBuZXdCb29sKSB7XHJcblx0ICAgIHZhciBib29sID0gbmV3Qm9vbCB8fCBmYWxzZTtcclxuXHQgICAgaWYgKGVsZW0uYWRkRXZlbnRMaXN0ZW5lcikge1xyXG5cdCAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYywgYm9vbCk7XHJcblx0ICAgIH0gZWxzZSBpZiAoZWxlbS5hdHRhY2hFdmVudCkge1xyXG5cdCAgICAgIGVsZW0uYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmdW5jKTtcclxuXHQgICAgfVxyXG5cdCAgICByZXR1cm4gZG9tO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSBlbGVtXHJcblx0ICAgKiBAcGFyYW0gZXZlbnRcclxuXHQgICAqIEBwYXJhbSBmdW5jXHJcblx0ICAgKiBAcGFyYW0gYm9vbFxyXG5cdCAgICovXHJcblx0ICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZChlbGVtLCBldmVudCwgZnVuYywgbmV3Qm9vbCkge1xyXG5cdCAgICB2YXIgYm9vbCA9IG5ld0Jvb2wgfHwgZmFsc2U7XHJcblx0ICAgIGlmIChlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcclxuXHQgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMsIGJvb2wpO1xyXG5cdCAgICB9IGVsc2UgaWYgKGVsZW0uZGV0YWNoRXZlbnQpIHtcclxuXHQgICAgICBlbGVtLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgZnVuYyk7XHJcblx0ICAgIH1cclxuXHQgICAgcmV0dXJuIGRvbTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqXHJcblx0ICAgKiBAcGFyYW0gZWxlbVxyXG5cdCAgICogQHBhcmFtIGNsYXNzTmFtZVxyXG5cdCAgICovXHJcblx0ICBhZGRDbGFzczogZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XHJcblx0ICAgIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0ICAgICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcblx0ICAgIH0gZWxzZSBpZiAoZWxlbS5jbGFzc05hbWUgIT09IGNsYXNzTmFtZSkge1xyXG5cdCAgICAgIHZhciBjbGFzc2VzID0gZWxlbS5jbGFzc05hbWUuc3BsaXQoLyArLyk7XHJcblx0ICAgICAgaWYgKGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpID09PSAtMSkge1xyXG5cdCAgICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzTmFtZSk7XHJcblx0ICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpLnJlcGxhY2UoL15cXHMrLywgJycpLnJlcGxhY2UoL1xccyskLywgJycpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdCAgICByZXR1cm4gZG9tO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSBlbGVtXHJcblx0ICAgKiBAcGFyYW0gY2xhc3NOYW1lXHJcblx0ICAgKi9cclxuXHQgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcclxuXHQgICAgaWYgKGNsYXNzTmFtZSkge1xyXG5cdCAgICAgIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gY2xhc3NOYW1lKSB7XHJcblx0ICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcclxuXHQgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgvICsvKTtcclxuXHQgICAgICAgIHZhciBpbmRleCA9IGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpO1xyXG5cdCAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG5cdCAgICAgICAgICBjbGFzc2VzLnNwbGljZShpbmRleCwgMSk7XHJcblx0ICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgfVxyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgIGVsZW0uY2xhc3NOYW1lID0gdW5kZWZpbmVkO1xyXG5cdCAgICB9XHJcblx0ICAgIHJldHVybiBkb207XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgaGFzQ2xhc3M6IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xyXG5cdCAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKD86XnxcXFxccyspJyArIGNsYXNzTmFtZSArICcoPzpcXFxccyt8JCknKS50ZXN0KGVsZW0uY2xhc3NOYW1lKSB8fCBmYWxzZTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqXHJcblx0ICAgKiBAcGFyYW0gZWxlbVxyXG5cdCAgICovXHJcblx0ICBnZXRXaWR0aDogZnVuY3Rpb24gZ2V0V2lkdGgoZWxlbSkge1xyXG5cdCAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xyXG5cdFxyXG5cdCAgICByZXR1cm4gY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLWxlZnQtd2lkdGgnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItcmlnaHQtd2lkdGgnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLWxlZnQnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLXJpZ2h0J10pICsgY3NzVmFsdWVUb1BpeGVscyhzdHlsZS53aWR0aCk7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIGVsZW1cclxuXHQgICAqL1xyXG5cdCAgZ2V0SGVpZ2h0OiBmdW5jdGlvbiBnZXRIZWlnaHQoZWxlbSkge1xyXG5cdCAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xyXG5cdFxyXG5cdCAgICByZXR1cm4gY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLXRvcC13aWR0aCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1ib3R0b20td2lkdGgnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLXRvcCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctYm90dG9tJ10pICsgY3NzVmFsdWVUb1BpeGVscyhzdHlsZS5oZWlnaHQpO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICpcclxuXHQgICAqIEBwYXJhbSBlbFxyXG5cdCAgICovXHJcblx0ICBnZXRPZmZzZXQ6IGZ1bmN0aW9uIGdldE9mZnNldChlbCkge1xyXG5cdCAgICB2YXIgZWxlbSA9IGVsO1xyXG5cdCAgICB2YXIgb2Zmc2V0ID0geyBsZWZ0OiAwLCB0b3A6IDAgfTtcclxuXHQgICAgaWYgKGVsZW0ub2Zmc2V0UGFyZW50KSB7XHJcblx0ICAgICAgZG8ge1xyXG5cdCAgICAgICAgb2Zmc2V0LmxlZnQgKz0gZWxlbS5vZmZzZXRMZWZ0O1xyXG5cdCAgICAgICAgb2Zmc2V0LnRvcCArPSBlbGVtLm9mZnNldFRvcDtcclxuXHQgICAgICAgIGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudDtcclxuXHQgICAgICB9IHdoaWxlIChlbGVtKTtcclxuXHQgICAgfVxyXG5cdCAgICByZXR1cm4gb2Zmc2V0O1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9wb3N0cy8yNjg0NTYxL3JldmlzaW9uc1xyXG5cdCAgLyoqXHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIGVsZW1cclxuXHQgICAqL1xyXG5cdCAgaXNBY3RpdmU6IGZ1bmN0aW9uIGlzQWN0aXZlKGVsZW0pIHtcclxuXHQgICAgcmV0dXJuIGVsZW0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKGVsZW0udHlwZSB8fCBlbGVtLmhyZWYpO1xyXG5cdCAgfVxyXG5cdFxyXG5cdH07XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gZG9tO1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xyXG5cclxuLyoqKi8gfSxcclxuLyogMTAgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cdFxyXG5cdHZhciBfQ29udHJvbGxlcjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xyXG5cdFxyXG5cdHZhciBfQ29udHJvbGxlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db250cm9sbGVyMik7XHJcblx0XHJcblx0dmFyIF9kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xyXG5cdFxyXG5cdHZhciBfZG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RvbSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xyXG5cdFxyXG5cdHZhciBfY29tbW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbW1vbik7XHJcblx0XHJcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfSAvKipcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBjbGFzcyBQcm92aWRlcyBhIHNlbGVjdCBpbnB1dCB0byBhbHRlciB0aGUgcHJvcGVydHkgb2YgYW4gb2JqZWN0LCB1c2luZyBhXHJcblx0ICogbGlzdCBvZiBhY2NlcHRlZCB2YWx1ZXMuXHJcblx0ICpcclxuXHQgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ1tdfSBvcHRpb25zIEEgbWFwIG9mIGxhYmVscyB0byBhY2NlcHRhYmxlIHZhbHVlcywgb3JcclxuXHQgKiBhIGxpc3Qgb2YgYWNjZXB0YWJsZSBzdHJpbmcgdmFsdWVzLlxyXG5cdCAqXHJcblx0ICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcclxuXHQgKi9cclxuXHR2YXIgT3B0aW9uQ29udHJvbGxlciA9IGZ1bmN0aW9uIChfQ29udHJvbGxlcikge1xyXG5cdCAgX2luaGVyaXRzKE9wdGlvbkNvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcclxuXHRcclxuXHQgIGZ1bmN0aW9uIE9wdGlvbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgb3B0cykge1xyXG5cdCAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgT3B0aW9uQ29udHJvbGxlcik7XHJcblx0XHJcblx0ICAgIHZhciBfdGhpczIgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29udHJvbGxlci5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpKTtcclxuXHRcclxuXHQgICAgdmFyIG9wdGlvbnMgPSBvcHRzO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMgPSBfdGhpczI7XHJcblx0XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgZHJvcCBkb3duIG1lbnVcclxuXHQgICAgICogQGlnbm9yZVxyXG5cdCAgICAgKi9cclxuXHQgICAgX3RoaXMyLl9fc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XHJcblx0XHJcblx0ICAgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzQXJyYXkob3B0aW9ucykpIHtcclxuXHQgICAgICB2YXIgbWFwID0ge307XHJcblx0ICAgICAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0ICAgICAgICBtYXBbZWxlbWVudF0gPSBlbGVtZW50O1xyXG5cdCAgICAgIH0pO1xyXG5cdCAgICAgIG9wdGlvbnMgPSBtYXA7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcblx0ICAgICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG5cdCAgICAgIG9wdC5pbm5lckhUTUwgPSBrZXk7XHJcblx0ICAgICAgb3B0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XHJcblx0ICAgICAgX3RoaXMuX19zZWxlY3QuYXBwZW5kQ2hpbGQob3B0KTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIC8vIEFja25vd2xlZGdlIG9yaWdpbmFsIHZhbHVlXHJcblx0ICAgIF90aGlzMi51cGRhdGVEaXNwbGF5KCk7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19zZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgdmFyIGRlc2lyZWRWYWx1ZSA9IHRoaXMub3B0aW9uc1t0aGlzLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG5cdCAgICAgIF90aGlzLnNldFZhbHVlKGRlc2lyZWRWYWx1ZSk7XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19zZWxlY3QpO1xyXG5cdCAgICByZXR1cm4gX3RoaXMyO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgT3B0aW9uQ29udHJvbGxlci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiBzZXRWYWx1ZSh2KSB7XHJcblx0ICAgIHZhciB0b1JldHVybiA9IF9Db250cm9sbGVyLnByb3RvdHlwZS5zZXRWYWx1ZS5jYWxsKHRoaXMsIHYpO1xyXG5cdFxyXG5cdCAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XHJcblx0ICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcclxuXHQgICAgfVxyXG5cdCAgICByZXR1cm4gdG9SZXR1cm47XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgT3B0aW9uQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRGlzcGxheSA9IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XHJcblx0ICAgIGlmIChfZG9tMi5kZWZhdWx0LmlzQWN0aXZlKHRoaXMuX19zZWxlY3QpKSByZXR1cm4gdGhpczsgLy8gcHJldmVudCBudW1iZXIgZnJvbSB1cGRhdGluZyBpZiB1c2VyIGlzIHRyeWluZyB0byBtYW51YWxseSB1cGRhdGVcclxuXHQgICAgdGhpcy5fX3NlbGVjdC52YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcclxuXHQgICAgcmV0dXJuIF9Db250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgcmV0dXJuIE9wdGlvbkNvbnRyb2xsZXI7XHJcblx0fShfQ29udHJvbGxlcjMuZGVmYXVsdCk7XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gT3B0aW9uQ29udHJvbGxlcjtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDExICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXIyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29udHJvbGxlcjIpO1xyXG5cdFxyXG5cdHZhciBfZG9tID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcclxuXHRcclxuXHR2YXIgX2RvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kb20pO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH0gLyoqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuXHRcclxuXHQvKipcclxuXHQgKiBAY2xhc3MgUHJvdmlkZXMgYSB0ZXh0IGlucHV0IHRvIGFsdGVyIHRoZSBzdHJpbmcgcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcclxuXHQgKlxyXG5cdCAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXHJcblx0ICovXHJcblx0dmFyIFN0cmluZ0NvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX0NvbnRyb2xsZXIpIHtcclxuXHQgIF9pbmhlcml0cyhTdHJpbmdDb250cm9sbGVyLCBfQ29udHJvbGxlcik7XHJcblx0XHJcblx0ICBmdW5jdGlvbiBTdHJpbmdDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpIHtcclxuXHQgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN0cmluZ0NvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMyID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbnRyb2xsZXIuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XHJcblx0XHJcblx0ICAgIHZhciBfdGhpcyA9IF90aGlzMjtcclxuXHRcclxuXHQgICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XHJcblx0ICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19pbnB1dC52YWx1ZSk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgZnVuY3Rpb24gb25CbHVyKCkge1xyXG5cdCAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XHJcblx0ICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBfdGhpczIuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcblx0ICAgIF90aGlzMi5fX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19pbnB1dCwgJ2tleXVwJywgb25DaGFuZ2UpO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuXHQgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG5cdCAgICAgICAgdGhpcy5ibHVyKCk7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcclxuXHRcclxuXHQgICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9faW5wdXQpO1xyXG5cdCAgICByZXR1cm4gX3RoaXMyO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgU3RyaW5nQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRGlzcGxheSA9IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XHJcblx0ICAgIC8vIFN0b3BzIHRoZSBjYXJldCBmcm9tIG1vdmluZyBvbiBhY2NvdW50IG9mOlxyXG5cdCAgICAvLyBrZXl1cCAtPiBzZXRWYWx1ZSAtPiB1cGRhdGVEaXNwbGF5XHJcblx0ICAgIGlmICghX2RvbTIuZGVmYXVsdC5pc0FjdGl2ZSh0aGlzLl9faW5wdXQpKSB7XHJcblx0ICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG5cdCAgICB9XHJcblx0ICAgIHJldHVybiBfQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIHJldHVybiBTdHJpbmdDb250cm9sbGVyO1xyXG5cdH0oX0NvbnRyb2xsZXIzLmRlZmF1bHQpO1xyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IFN0cmluZ0NvbnRyb2xsZXI7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiAxMiAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyMiA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbnRyb2xsZXIyKTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tbW9uKTtcclxuXHRcclxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9IC8qKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblx0XHJcblx0ZnVuY3Rpb24gbnVtRGVjaW1hbHMoeCkge1xyXG5cdCAgdmFyIF94ID0geC50b1N0cmluZygpO1xyXG5cdCAgaWYgKF94LmluZGV4T2YoJy4nKSA+IC0xKSB7XHJcblx0ICAgIHJldHVybiBfeC5sZW5ndGggLSBfeC5pbmRleE9mKCcuJykgLSAxO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgcmV0dXJuIDA7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBPcHRpb25hbCBwYXJhbWV0ZXJzXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWluXSBNaW5pbXVtIGFsbG93ZWQgdmFsdWVcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5tYXhdIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLnN0ZXBdIEluY3JlbWVudCBieSB3aGljaCB0byBjaGFuZ2UgdmFsdWVcclxuXHQgKlxyXG5cdCAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXHJcblx0ICovXHJcblx0XHJcblx0dmFyIE51bWJlckNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX0NvbnRyb2xsZXIpIHtcclxuXHQgIF9pbmhlcml0cyhOdW1iZXJDb250cm9sbGVyLCBfQ29udHJvbGxlcik7XHJcblx0XHJcblx0ICBmdW5jdGlvbiBOdW1iZXJDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xyXG5cdCAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTnVtYmVyQ29udHJvbGxlcik7XHJcblx0XHJcblx0ICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db250cm9sbGVyLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSkpO1xyXG5cdFxyXG5cdCAgICB2YXIgX3BhcmFtcyA9IHBhcmFtcyB8fCB7fTtcclxuXHRcclxuXHQgICAgX3RoaXMuX19taW4gPSBfcGFyYW1zLm1pbjtcclxuXHQgICAgX3RoaXMuX19tYXggPSBfcGFyYW1zLm1heDtcclxuXHQgICAgX3RoaXMuX19zdGVwID0gX3BhcmFtcy5zdGVwO1xyXG5cdFxyXG5cdCAgICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc1VuZGVmaW5lZChfdGhpcy5fX3N0ZXApKSB7XHJcblx0ICAgICAgaWYgKF90aGlzLmluaXRpYWxWYWx1ZSA9PT0gMCkge1xyXG5cdCAgICAgICAgX3RoaXMuX19pbXBsaWVkU3RlcCA9IDE7IC8vIFdoYXQgYXJlIHdlLCBwc3ljaGljcz9cclxuXHQgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgLy8gSGV5IERvdWcsIGNoZWNrIHRoaXMgb3V0LlxyXG5cdCAgICAgICAgX3RoaXMuX19pbXBsaWVkU3RlcCA9IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKE1hdGgubG9nKE1hdGguYWJzKF90aGlzLmluaXRpYWxWYWx1ZSkpIC8gTWF0aC5MTjEwKSkgLyAxMDtcclxuXHQgICAgICB9XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0ICAgICAgX3RoaXMuX19pbXBsaWVkU3RlcCA9IF90aGlzLl9fc3RlcDtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBfdGhpcy5fX3ByZWNpc2lvbiA9IG51bURlY2ltYWxzKF90aGlzLl9faW1wbGllZFN0ZXApO1xyXG5cdCAgICByZXR1cm4gX3RoaXM7XHJcblx0ICB9XHJcblx0XHJcblx0ICBOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uIHNldFZhbHVlKHYpIHtcclxuXHQgICAgdmFyIF92ID0gdjtcclxuXHRcclxuXHQgICAgaWYgKHRoaXMuX19taW4gIT09IHVuZGVmaW5lZCAmJiBfdiA8IHRoaXMuX19taW4pIHtcclxuXHQgICAgICBfdiA9IHRoaXMuX19taW47XHJcblx0ICAgIH0gZWxzZSBpZiAodGhpcy5fX21heCAhPT0gdW5kZWZpbmVkICYmIF92ID4gdGhpcy5fX21heCkge1xyXG5cdCAgICAgIF92ID0gdGhpcy5fX21heDtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBpZiAodGhpcy5fX3N0ZXAgIT09IHVuZGVmaW5lZCAmJiBfdiAlIHRoaXMuX19zdGVwICE9PSAwKSB7XHJcblx0ICAgICAgX3YgPSBNYXRoLnJvdW5kKF92IC8gdGhpcy5fX3N0ZXApICogdGhpcy5fX3N0ZXA7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgcmV0dXJuIF9Db250cm9sbGVyLnByb3RvdHlwZS5zZXRWYWx1ZS5jYWxsKHRoaXMsIF92KTtcclxuXHQgIH07XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIFNwZWNpZnkgYSBtaW5pbXVtIHZhbHVlIGZvciA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPi5cclxuXHQgICAqXHJcblx0ICAgKiBAcGFyYW0ge051bWJlcn0gbWluVmFsdWUgVGhlIG1pbmltdW0gdmFsdWUgZm9yXHJcblx0ICAgKiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxyXG5cdCAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXHJcblx0ICAgKi9cclxuXHRcclxuXHRcclxuXHQgIE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLm1pbiA9IGZ1bmN0aW9uIG1pbih2KSB7XHJcblx0ICAgIHRoaXMuX19taW4gPSB2O1xyXG5cdCAgICByZXR1cm4gdGhpcztcclxuXHQgIH07XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIFNwZWNpZnkgYSBtYXhpbXVtIHZhbHVlIGZvciA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPi5cclxuXHQgICAqXHJcblx0ICAgKiBAcGFyYW0ge051bWJlcn0gbWF4VmFsdWUgVGhlIG1heGltdW0gdmFsdWUgZm9yXHJcblx0ICAgKiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxyXG5cdCAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXHJcblx0ICAgKi9cclxuXHRcclxuXHRcclxuXHQgIE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLm1heCA9IGZ1bmN0aW9uIG1heCh2KSB7XHJcblx0ICAgIHRoaXMuX19tYXggPSB2O1xyXG5cdCAgICByZXR1cm4gdGhpcztcclxuXHQgIH07XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIFNwZWNpZnkgYSBzdGVwIHZhbHVlIHRoYXQgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcclxuXHQgICAqIGluY3JlbWVudHMgYnkuXHJcblx0ICAgKlxyXG5cdCAgICogQHBhcmFtIHtOdW1iZXJ9IHN0ZXBWYWx1ZSBUaGUgc3RlcCB2YWx1ZSBmb3JcclxuXHQgICAqIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXHJcblx0ICAgKiBAZGVmYXVsdCBpZiBtaW5pbXVtIGFuZCBtYXhpbXVtIHNwZWNpZmllZCBpbmNyZW1lbnQgaXMgMSUgb2YgdGhlXHJcblx0ICAgKiBkaWZmZXJlbmNlIG90aGVyd2lzZSBzdGVwVmFsdWUgaXMgMVxyXG5cdCAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXHJcblx0ICAgKi9cclxuXHRcclxuXHRcclxuXHQgIE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiBzdGVwKHYpIHtcclxuXHQgICAgdGhpcy5fX3N0ZXAgPSB2O1xyXG5cdCAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSB2O1xyXG5cdCAgICB0aGlzLl9fcHJlY2lzaW9uID0gbnVtRGVjaW1hbHModik7XHJcblx0ICAgIHJldHVybiB0aGlzO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIHJldHVybiBOdW1iZXJDb250cm9sbGVyO1xyXG5cdH0oX0NvbnRyb2xsZXIzLmRlZmF1bHQpO1xyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IE51bWJlckNvbnRyb2xsZXI7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiAxMyAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0dmFyIF9OdW1iZXJDb250cm9sbGVyMiA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OdW1iZXJDb250cm9sbGVyMik7XHJcblx0XHJcblx0dmFyIF9kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xyXG5cdFxyXG5cdHZhciBfZG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RvbSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xyXG5cdFxyXG5cdHZhciBfY29tbW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbW1vbik7XHJcblx0XHJcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfSAvKipcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG5cdFxyXG5cdGZ1bmN0aW9uIHJvdW5kVG9EZWNpbWFsKHZhbHVlLCBkZWNpbWFscykge1xyXG5cdCAgdmFyIHRlblRvID0gTWF0aC5wb3coMTAsIGRlY2ltYWxzKTtcclxuXHQgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogdGVuVG8pIC8gdGVuVG87XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIgYW5kXHJcblx0ICogcHJvdmlkZXMgYW4gaW5wdXQgZWxlbWVudCB3aXRoIHdoaWNoIHRvIG1hbmlwdWxhdGUgaXQuXHJcblx0ICpcclxuXHQgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxyXG5cdCAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIE9wdGlvbmFsIHBhcmFtZXRlcnNcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5taW5dIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1heF0gTWF4aW11bSBhbGxvd2VkIHZhbHVlXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMuc3RlcF0gSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxyXG5cdCAqXHJcblx0ICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcclxuXHQgKi9cclxuXHRcclxuXHR2YXIgTnVtYmVyQ29udHJvbGxlckJveCA9IGZ1bmN0aW9uIChfTnVtYmVyQ29udHJvbGxlcikge1xyXG5cdCAgX2luaGVyaXRzKE51bWJlckNvbnRyb2xsZXJCb3gsIF9OdW1iZXJDb250cm9sbGVyKTtcclxuXHRcclxuXHQgIGZ1bmN0aW9uIE51bWJlckNvbnRyb2xsZXJCb3gob2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XHJcblx0ICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOdW1iZXJDb250cm9sbGVyQm94KTtcclxuXHRcclxuXHQgICAgdmFyIF90aGlzMiA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9OdW1iZXJDb250cm9sbGVyLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSk7XHJcblx0XHJcblx0ICAgIF90aGlzMi5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSBmYWxzZTtcclxuXHRcclxuXHQgICAgdmFyIF90aGlzID0gX3RoaXMyO1xyXG5cdFxyXG5cdCAgICAvKipcclxuXHQgICAgICoge051bWJlcn0gUHJldmlvdXMgbW91c2UgeSBwb3NpdGlvblxyXG5cdCAgICAgKiBAaWdub3JlXHJcblx0ICAgICAqL1xyXG5cdCAgICB2YXIgcHJldlkgPSB2b2lkIDA7XHJcblx0XHJcblx0ICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xyXG5cdCAgICAgIHZhciBhdHRlbXB0ZWQgPSBwYXJzZUZsb2F0KF90aGlzLl9faW5wdXQudmFsdWUpO1xyXG5cdCAgICAgIGlmICghX2NvbW1vbjIuZGVmYXVsdC5pc05hTihhdHRlbXB0ZWQpKSB7XHJcblx0ICAgICAgICBfdGhpcy5zZXRWYWx1ZShhdHRlbXB0ZWQpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBvbkZpbmlzaCgpIHtcclxuXHQgICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xyXG5cdCAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcclxuXHQgICAgICB9XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgZnVuY3Rpb24gb25CbHVyKCkge1xyXG5cdCAgICAgIG9uRmluaXNoKCk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgZnVuY3Rpb24gb25Nb3VzZURyYWcoZSkge1xyXG5cdCAgICAgIHZhciBkaWZmID0gcHJldlkgLSBlLmNsaWVudFk7XHJcblx0ICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuZ2V0VmFsdWUoKSArIGRpZmYgKiBfdGhpcy5fX2ltcGxpZWRTdGVwKTtcclxuXHRcclxuXHQgICAgICBwcmV2WSA9IGUuY2xpZW50WTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQudW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xyXG5cdCAgICAgIG9uRmluaXNoKCk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgZnVuY3Rpb24gb25Nb3VzZURvd24oZSkge1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xyXG5cdCAgICAgIHByZXZZID0gZS5jbGllbnRZO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIF90aGlzMi5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHQgICAgX3RoaXMyLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuXHRcclxuXHQgICAgLy8gTWFrZXMgaXQgc28gbWFudWFsbHkgc3BlY2lmaWVkIHZhbHVlcyBhcmUgbm90IHRydW5jYXRlZC5cclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKF90aGlzMi5fX2lucHV0LCAnY2hhbmdlJywgb25DaGFuZ2UpO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKF90aGlzMi5fX2lucHV0LCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuXHQgICAgICAvLyBXaGVuIHByZXNzaW5nIGVudGVyLCB5b3UgY2FuIGJlIGFzIHByZWNpc2UgYXMgeW91IHdhbnQuXHJcblx0ICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuXHQgICAgICAgIF90aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IHRydWU7XHJcblx0ICAgICAgICB0aGlzLmJsdXIoKTtcclxuXHQgICAgICAgIF90aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xyXG5cdCAgICAgICAgb25GaW5pc2goKTtcclxuXHQgICAgICB9XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBfdGhpczIudXBkYXRlRGlzcGxheSgpO1xyXG5cdFxyXG5cdCAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19pbnB1dCk7XHJcblx0ICAgIHJldHVybiBfdGhpczI7XHJcblx0ICB9XHJcblx0XHJcblx0ICBOdW1iZXJDb250cm9sbGVyQm94LnByb3RvdHlwZS51cGRhdGVEaXNwbGF5ID0gZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcclxuXHQgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPyB0aGlzLmdldFZhbHVlKCkgOiByb3VuZFRvRGVjaW1hbCh0aGlzLmdldFZhbHVlKCksIHRoaXMuX19wcmVjaXNpb24pO1xyXG5cdCAgICByZXR1cm4gX051bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcclxuXHQgIH07XHJcblx0XHJcblx0ICByZXR1cm4gTnVtYmVyQ29udHJvbGxlckJveDtcclxuXHR9KF9OdW1iZXJDb250cm9sbGVyMy5kZWZhdWx0KTtcclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSBOdW1iZXJDb250cm9sbGVyQm94O1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xyXG5cclxuLyoqKi8gfSxcclxuLyogMTQgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlcjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcclxuXHRcclxuXHR2YXIgX051bWJlckNvbnRyb2xsZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTnVtYmVyQ29udHJvbGxlcjIpO1xyXG5cdFxyXG5cdHZhciBfZG9tID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcclxuXHRcclxuXHR2YXIgX2RvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kb20pO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH0gLyoqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuXHRcclxuXHRmdW5jdGlvbiBtYXAodiwgaTEsIGkyLCBvMSwgbzIpIHtcclxuXHQgIHJldHVybiBvMSArIChvMiAtIG8xKSAqICgodiAtIGkxKSAvIChpMiAtIGkxKSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIsIGNvbnRhaW5zXHJcblx0ICogYSBtaW5pbXVtIGFuZCBtYXhpbXVtLCBhbmQgcHJvdmlkZXMgYSBzbGlkZXIgZWxlbWVudCB3aXRoIHdoaWNoIHRvXHJcblx0ICogbWFuaXB1bGF0ZSBpdC4gSXQgc2hvdWxkIGJlIG5vdGVkIHRoYXQgdGhlIHNsaWRlciBlbGVtZW50IGlzIG1hZGUgdXAgb2ZcclxuXHQgKiA8Y29kZT4mbHQ7ZGl2Jmd0OzwvY29kZT4gdGFncywgPHN0cm9uZz5ub3Q8L3N0cm9uZz4gdGhlIGh0bWw1XHJcblx0ICogPGNvZGU+Jmx0O3NsaWRlciZndDs8L2NvZGU+IGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxyXG5cdCAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IG1pblZhbHVlIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBtYXhWYWx1ZSBNYXhpbXVtIGFsbG93ZWQgdmFsdWVcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gc3RlcFZhbHVlIEluY3JlbWVudCBieSB3aGljaCB0byBjaGFuZ2UgdmFsdWVcclxuXHQgKlxyXG5cdCAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXHJcblx0ICovXHJcblx0XHJcblx0dmFyIE51bWJlckNvbnRyb2xsZXJTbGlkZXIgPSBmdW5jdGlvbiAoX051bWJlckNvbnRyb2xsZXIpIHtcclxuXHQgIF9pbmhlcml0cyhOdW1iZXJDb250cm9sbGVyU2xpZGVyLCBfTnVtYmVyQ29udHJvbGxlcik7XHJcblx0XHJcblx0ICBmdW5jdGlvbiBOdW1iZXJDb250cm9sbGVyU2xpZGVyKG9iamVjdCwgcHJvcGVydHksIG1pbiwgbWF4LCBzdGVwKSB7XHJcblx0ICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOdW1iZXJDb250cm9sbGVyU2xpZGVyKTtcclxuXHRcclxuXHQgICAgdmFyIF90aGlzMiA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9OdW1iZXJDb250cm9sbGVyLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IG1pbiwgbWF4OiBtYXgsIHN0ZXA6IHN0ZXAgfSkpO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMgPSBfdGhpczI7XHJcblx0XHJcblx0ICAgIF90aGlzMi5fX2JhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHQgICAgX3RoaXMyLl9fZm9yZWdyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9fYmFja2dyb3VuZCwgJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhfdGhpczIuX19iYWNrZ3JvdW5kLCAnc2xpZGVyJyk7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoX3RoaXMyLl9fZm9yZWdyb3VuZCwgJ3NsaWRlci1mZycpO1xyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XHJcblx0ICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XHJcblx0XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XHJcblx0XHJcblx0ICAgICAgb25Nb3VzZURyYWcoZSk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgZnVuY3Rpb24gb25Nb3VzZURyYWcoZSkge1xyXG5cdCAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcclxuXHQgICAgICB2YXIgYmdSZWN0ID0gX3RoaXMuX19iYWNrZ3JvdW5kLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFxyXG5cdCAgICAgIF90aGlzLnNldFZhbHVlKG1hcChlLmNsaWVudFgsIGJnUmVjdC5sZWZ0LCBiZ1JlY3QucmlnaHQsIF90aGlzLl9fbWluLCBfdGhpcy5fX21heCkpO1xyXG5cdFxyXG5cdCAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQudW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xyXG5cdCAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XHJcblx0ICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBfdGhpczIudXBkYXRlRGlzcGxheSgpO1xyXG5cdFxyXG5cdCAgICBfdGhpczIuX19iYWNrZ3JvdW5kLmFwcGVuZENoaWxkKF90aGlzMi5fX2ZvcmVncm91bmQpO1xyXG5cdCAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19iYWNrZ3JvdW5kKTtcclxuXHQgICAgcmV0dXJuIF90aGlzMjtcclxuXHQgIH1cclxuXHRcclxuXHQgIE51bWJlckNvbnRyb2xsZXJTbGlkZXIucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkgPSBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xyXG5cdCAgICB2YXIgcGN0ID0gKHRoaXMuZ2V0VmFsdWUoKSAtIHRoaXMuX19taW4pIC8gKHRoaXMuX19tYXggLSB0aGlzLl9fbWluKTtcclxuXHQgICAgdGhpcy5fX2ZvcmVncm91bmQuc3R5bGUud2lkdGggPSBwY3QgKiAxMDAgKyAnJSc7XHJcblx0ICAgIHJldHVybiBfTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIHJldHVybiBOdW1iZXJDb250cm9sbGVyU2xpZGVyO1xyXG5cdH0oX051bWJlckNvbnRyb2xsZXIzLmRlZmF1bHQpO1xyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IE51bWJlckNvbnRyb2xsZXJTbGlkZXI7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiAxNSAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyMiA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbnRyb2xsZXIyKTtcclxuXHRcclxuXHR2YXIgX2RvbSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XHJcblx0XHJcblx0dmFyIF9kb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZG9tKTtcclxuXHRcclxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XHJcblx0XHJcblx0ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9IC8qKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblx0XHJcblx0LyoqXHJcblx0ICogQGNsYXNzIFByb3ZpZGVzIGEgR1VJIGludGVyZmFjZSB0byBmaXJlIGEgc3BlY2lmaWVkIG1ldGhvZCwgYSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxyXG5cdCAqXHJcblx0ICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcclxuXHQgKi9cclxuXHR2YXIgRnVuY3Rpb25Db250cm9sbGVyID0gZnVuY3Rpb24gKF9Db250cm9sbGVyKSB7XHJcblx0ICBfaW5oZXJpdHMoRnVuY3Rpb25Db250cm9sbGVyLCBfQ29udHJvbGxlcik7XHJcblx0XHJcblx0ICBmdW5jdGlvbiBGdW5jdGlvbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgdGV4dCkge1xyXG5cdCAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRnVuY3Rpb25Db250cm9sbGVyKTtcclxuXHRcclxuXHQgICAgdmFyIF90aGlzMiA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db250cm9sbGVyLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSkpO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMgPSBfdGhpczI7XHJcblx0XHJcblx0ICAgIF90aGlzMi5fX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdCAgICBfdGhpczIuX19idXR0b24uaW5uZXJIVE1MID0gdGV4dCA9PT0gdW5kZWZpbmVkID8gJ0ZpcmUnIDogdGV4dDtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKF90aGlzMi5fX2J1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHQgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0ICAgICAgX3RoaXMuZmlyZSgpO1xyXG5cdCAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoX3RoaXMyLl9fYnV0dG9uLCAnYnV0dG9uJyk7XHJcblx0XHJcblx0ICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX2J1dHRvbik7XHJcblx0ICAgIHJldHVybiBfdGhpczI7XHJcblx0ICB9XHJcblx0XHJcblx0ICBGdW5jdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiBmaXJlKCkge1xyXG5cdCAgICBpZiAodGhpcy5fX29uQ2hhbmdlKSB7XHJcblx0ICAgICAgdGhpcy5fX29uQ2hhbmdlLmNhbGwodGhpcyk7XHJcblx0ICAgIH1cclxuXHQgICAgdGhpcy5nZXRWYWx1ZSgpLmNhbGwodGhpcy5vYmplY3QpO1xyXG5cdCAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XHJcblx0ICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcclxuXHQgICAgfVxyXG5cdCAgfTtcclxuXHRcclxuXHQgIHJldHVybiBGdW5jdGlvbkNvbnRyb2xsZXI7XHJcblx0fShfQ29udHJvbGxlcjMuZGVmYXVsdCk7XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gRnVuY3Rpb25Db250cm9sbGVyO1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xyXG5cclxuLyoqKi8gfSxcclxuLyogMTYgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cdFxyXG5cdHZhciBfQ29udHJvbGxlcjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xyXG5cdFxyXG5cdHZhciBfQ29udHJvbGxlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db250cm9sbGVyMik7XHJcblx0XHJcblx0dmFyIF9kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xyXG5cdFxyXG5cdHZhciBfZG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RvbSk7XHJcblx0XHJcblx0dmFyIF9Db2xvciA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XHJcblx0XHJcblx0dmFyIF9Db2xvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db2xvcik7XHJcblx0XHJcblx0dmFyIF9pbnRlcnByZXQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xyXG5cdFxyXG5cdHZhciBfaW50ZXJwcmV0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludGVycHJldCk7XHJcblx0XHJcblx0dmFyIF9jb21tb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xyXG5cdFxyXG5cdHZhciBfY29tbW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbW1vbik7XHJcblx0XHJcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfSAvKipcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG5cdFxyXG5cdHZhciBDb2xvckNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX0NvbnRyb2xsZXIpIHtcclxuXHQgIF9pbmhlcml0cyhDb2xvckNvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcclxuXHRcclxuXHQgIGZ1bmN0aW9uIENvbG9yQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KSB7XHJcblx0ICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2xvckNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMyID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbnRyb2xsZXIuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XHJcblx0XHJcblx0ICAgIF90aGlzMi5fX2NvbG9yID0gbmV3IF9Db2xvcjIuZGVmYXVsdChfdGhpczIuZ2V0VmFsdWUoKSk7XHJcblx0ICAgIF90aGlzMi5fX3RlbXAgPSBuZXcgX0NvbG9yMi5kZWZhdWx0KDApO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMgPSBfdGhpczI7XHJcblx0XHJcblx0ICAgIF90aGlzMi5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQubWFrZVNlbGVjdGFibGUoX3RoaXMyLmRvbUVsZW1lbnQsIGZhbHNlKTtcclxuXHRcclxuXHQgICAgX3RoaXMyLl9fc2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHQgICAgX3RoaXMyLl9fc2VsZWN0b3IuY2xhc3NOYW1lID0gJ3NlbGVjdG9yJztcclxuXHRcclxuXHQgICAgX3RoaXMyLl9fc2F0dXJhdGlvbl9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdCAgICBfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkLmNsYXNzTmFtZSA9ICdzYXR1cmF0aW9uLWZpZWxkJztcclxuXHRcclxuXHQgICAgX3RoaXMyLl9fZmllbGRfa25vYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdCAgICBfdGhpczIuX19maWVsZF9rbm9iLmNsYXNzTmFtZSA9ICdmaWVsZC1rbm9iJztcclxuXHQgICAgX3RoaXMyLl9fZmllbGRfa25vYl9ib3JkZXIgPSAnMnB4IHNvbGlkICc7XHJcblx0XHJcblx0ICAgIF90aGlzMi5fX2h1ZV9rbm9iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0ICAgIF90aGlzMi5fX2h1ZV9rbm9iLmNsYXNzTmFtZSA9ICdodWUta25vYic7XHJcblx0XHJcblx0ICAgIF90aGlzMi5fX2h1ZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdCAgICBfdGhpczIuX19odWVfZmllbGQuY2xhc3NOYW1lID0gJ2h1ZS1maWVsZCc7XHJcblx0XHJcblx0ICAgIF90aGlzMi5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHQgICAgX3RoaXMyLl9faW5wdXQudHlwZSA9ICd0ZXh0JztcclxuXHQgICAgX3RoaXMyLl9faW5wdXRfdGV4dFNoYWRvdyA9ICcwIDFweCAxcHggJztcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKF90aGlzMi5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcblx0ICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuXHQgICAgICAgIC8vIG9uIGVudGVyXHJcblx0ICAgICAgICBvbkJsdXIuY2FsbCh0aGlzKTtcclxuXHQgICAgICB9XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKF90aGlzMi5fX3NlbGVjdG9yLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKCkgLyogZSAqL3tcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKHRoaXMsICdkcmFnJykuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZnVuY3Rpb24gKCkgLyogZSAqL3tcclxuXHQgICAgICAgIF9kb20yLmRlZmF1bHQucmVtb3ZlQ2xhc3MoX3RoaXMuX19zZWxlY3RvciwgJ2RyYWcnKTtcclxuXHQgICAgICB9KTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIHZhciB2YWx1ZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZXh0ZW5kKF90aGlzMi5fX3NlbGVjdG9yLnN0eWxlLCB7XHJcblx0ICAgICAgd2lkdGg6ICcxMjJweCcsXHJcblx0ICAgICAgaGVpZ2h0OiAnMTAycHgnLFxyXG5cdCAgICAgIHBhZGRpbmc6ICczcHgnLFxyXG5cdCAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyMjInLFxyXG5cdCAgICAgIGJveFNoYWRvdzogJzBweCAxcHggM3B4IHJnYmEoMCwwLDAsMC4zKSdcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZXh0ZW5kKF90aGlzMi5fX2ZpZWxkX2tub2Iuc3R5bGUsIHtcclxuXHQgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHQgICAgICB3aWR0aDogJzEycHgnLFxyXG5cdCAgICAgIGhlaWdodDogJzEycHgnLFxyXG5cdCAgICAgIGJvcmRlcjogX3RoaXMyLl9fZmllbGRfa25vYl9ib3JkZXIgKyAoX3RoaXMyLl9fY29sb3IudiA8IDAuNSA/ICcjZmZmJyA6ICcjMDAwJyksXHJcblx0ICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjUpJyxcclxuXHQgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcclxuXHQgICAgICB6SW5kZXg6IDFcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZXh0ZW5kKF90aGlzMi5fX2h1ZV9rbm9iLnN0eWxlLCB7XHJcblx0ICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0ICAgICAgd2lkdGg6ICcxNXB4JyxcclxuXHQgICAgICBoZWlnaHQ6ICcycHgnLFxyXG5cdCAgICAgIGJvcmRlclJpZ2h0OiAnNHB4IHNvbGlkICNmZmYnLFxyXG5cdCAgICAgIHpJbmRleDogMVxyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5leHRlbmQoX3RoaXMyLl9fc2F0dXJhdGlvbl9maWVsZC5zdHlsZSwge1xyXG5cdCAgICAgIHdpZHRoOiAnMTAwcHgnLFxyXG5cdCAgICAgIGhlaWdodDogJzEwMHB4JyxcclxuXHQgICAgICBib3JkZXI6ICcxcHggc29saWQgIzU1NScsXHJcblx0ICAgICAgbWFyZ2luUmlnaHQ6ICczcHgnLFxyXG5cdCAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdCAgICAgIGN1cnNvcjogJ3BvaW50ZXInXHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZCh2YWx1ZUZpZWxkLnN0eWxlLCB7XHJcblx0ICAgICAgd2lkdGg6ICcxMDAlJyxcclxuXHQgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuXHQgICAgICBiYWNrZ3JvdW5kOiAnbm9uZSdcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIGxpbmVhckdyYWRpZW50KHZhbHVlRmllbGQsICd0b3AnLCAncmdiYSgwLDAsMCwwKScsICcjMDAwJyk7XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZXh0ZW5kKF90aGlzMi5fX2h1ZV9maWVsZC5zdHlsZSwge1xyXG5cdCAgICAgIHdpZHRoOiAnMTVweCcsXHJcblx0ICAgICAgaGVpZ2h0OiAnMTAwcHgnLFxyXG5cdCAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjNTU1JyxcclxuXHQgICAgICBjdXJzb3I6ICducy1yZXNpemUnLFxyXG5cdCAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdCAgICAgIHRvcDogJzNweCcsXHJcblx0ICAgICAgcmlnaHQ6ICczcHgnXHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBodWVHcmFkaWVudChfdGhpczIuX19odWVfZmllbGQpO1xyXG5cdFxyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZChfdGhpczIuX19pbnB1dC5zdHlsZSwge1xyXG5cdCAgICAgIG91dGxpbmU6ICdub25lJyxcclxuXHQgICAgICAvLyAgICAgIHdpZHRoOiAnMTIwcHgnLFxyXG5cdCAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0ICAgICAgLy8gICAgICBwYWRkaW5nOiAnNHB4JyxcclxuXHQgICAgICAvLyAgICAgIG1hcmdpbkJvdHRvbTogJzZweCcsXHJcblx0ICAgICAgY29sb3I6ICcjZmZmJyxcclxuXHQgICAgICBib3JkZXI6IDAsXHJcblx0ICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG5cdCAgICAgIHRleHRTaGFkb3c6IF90aGlzMi5fX2lucHV0X3RleHRTaGFkb3cgKyAncmdiYSgwLDAsMCwwLjcpJ1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKF90aGlzMi5fX3NhdHVyYXRpb25fZmllbGQsICdtb3VzZWRvd24nLCBmaWVsZERvd24pO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQoX3RoaXMyLl9fZmllbGRfa25vYiwgJ21vdXNlZG93bicsIGZpZWxkRG93bik7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChfdGhpczIuX19odWVfZmllbGQsICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdCAgICAgIHNldEgoZSk7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldEgpO1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZmllbGRVcEgpO1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgZnVuY3Rpb24gZmllbGREb3duKGUpIHtcclxuXHQgICAgICBzZXRTVihlKTtcclxuXHQgICAgICAvLyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9ICdub25lJztcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0U1YpO1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZmllbGRVcFNWKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBmaWVsZFVwU1YoKSB7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0U1YpO1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQudW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmaWVsZFVwU1YpO1xyXG5cdCAgICAgIC8vIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xyXG5cdCAgICAgIG9uRmluaXNoKCk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgZnVuY3Rpb24gb25CbHVyKCkge1xyXG5cdCAgICAgIHZhciBpID0gKDAsIF9pbnRlcnByZXQyLmRlZmF1bHQpKHRoaXMudmFsdWUpO1xyXG5cdCAgICAgIGlmIChpICE9PSBmYWxzZSkge1xyXG5cdCAgICAgICAgX3RoaXMuX19jb2xvci5fX3N0YXRlID0gaTtcclxuXHQgICAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcclxuXHQgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgdGhpcy52YWx1ZSA9IF90aGlzLl9fY29sb3IudG9TdHJpbmcoKTtcclxuXHQgICAgICB9XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgZnVuY3Rpb24gZmllbGRVcEgoKSB7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0SCk7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZpZWxkVXBIKTtcclxuXHQgICAgICBvbkZpbmlzaCgpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGZ1bmN0aW9uIG9uRmluaXNoKCkge1xyXG5cdCAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XHJcblx0ICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcclxuXHQgICAgICB9XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgX3RoaXMyLl9fc2F0dXJhdGlvbl9maWVsZC5hcHBlbmRDaGlsZCh2YWx1ZUZpZWxkKTtcclxuXHQgICAgX3RoaXMyLl9fc2VsZWN0b3IuYXBwZW5kQ2hpbGQoX3RoaXMyLl9fZmllbGRfa25vYik7XHJcblx0ICAgIF90aGlzMi5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKF90aGlzMi5fX3NhdHVyYXRpb25fZmllbGQpO1xyXG5cdCAgICBfdGhpczIuX19zZWxlY3Rvci5hcHBlbmRDaGlsZChfdGhpczIuX19odWVfZmllbGQpO1xyXG5cdCAgICBfdGhpczIuX19odWVfZmllbGQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9faHVlX2tub2IpO1xyXG5cdFxyXG5cdCAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19pbnB1dCk7XHJcblx0ICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX3NlbGVjdG9yKTtcclxuXHRcclxuXHQgICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcclxuXHRcclxuXHQgICAgZnVuY3Rpb24gc2V0U1YoZSkge1xyXG5cdCAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcclxuXHQgICAgICB2YXIgZmllbGRSZWN0ID0gX3RoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdCAgICAgIHZhciBzID0gKGUuY2xpZW50WCAtIGZpZWxkUmVjdC5sZWZ0KSAvIChmaWVsZFJlY3QucmlnaHQgLSBmaWVsZFJlY3QubGVmdCk7XHJcblx0ICAgICAgdmFyIHYgPSAxIC0gKGUuY2xpZW50WSAtIGZpZWxkUmVjdC50b3ApIC8gKGZpZWxkUmVjdC5ib3R0b20gLSBmaWVsZFJlY3QudG9wKTtcclxuXHRcclxuXHQgICAgICBpZiAodiA+IDEpIHtcclxuXHQgICAgICAgIHYgPSAxO1xyXG5cdCAgICAgIH0gZWxzZSBpZiAodiA8IDApIHtcclxuXHQgICAgICAgIHYgPSAwO1xyXG5cdCAgICAgIH1cclxuXHRcclxuXHQgICAgICBpZiAocyA+IDEpIHtcclxuXHQgICAgICAgIHMgPSAxO1xyXG5cdCAgICAgIH0gZWxzZSBpZiAocyA8IDApIHtcclxuXHQgICAgICAgIHMgPSAwO1xyXG5cdCAgICAgIH1cclxuXHRcclxuXHQgICAgICBfdGhpcy5fX2NvbG9yLnYgPSB2O1xyXG5cdCAgICAgIF90aGlzLl9fY29sb3IucyA9IHM7XHJcblx0XHJcblx0ICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xyXG5cdFxyXG5cdCAgICAgIHJldHVybiBmYWxzZTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBzZXRIKGUpIHtcclxuXHQgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHJcblx0ICAgICAgdmFyIGZpZWxkUmVjdCA9IF90aGlzLl9faHVlX2ZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdCAgICAgIHZhciBoID0gMSAtIChlLmNsaWVudFkgLSBmaWVsZFJlY3QudG9wKSAvIChmaWVsZFJlY3QuYm90dG9tIC0gZmllbGRSZWN0LnRvcCk7XHJcblx0XHJcblx0ICAgICAgaWYgKGggPiAxKSB7XHJcblx0ICAgICAgICBoID0gMTtcclxuXHQgICAgICB9IGVsc2UgaWYgKGggPCAwKSB7XHJcblx0ICAgICAgICBoID0gMDtcclxuXHQgICAgICB9XHJcblx0XHJcblx0ICAgICAgX3RoaXMuX19jb2xvci5oID0gaCAqIDM2MDtcclxuXHRcclxuXHQgICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XHJcblx0XHJcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICB9XHJcblx0ICAgIHJldHVybiBfdGhpczI7XHJcblx0ICB9XHJcblx0XHJcblx0ICBDb2xvckNvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkgPSBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xyXG5cdCAgICB2YXIgaSA9ICgwLCBfaW50ZXJwcmV0Mi5kZWZhdWx0KSh0aGlzLmdldFZhbHVlKCkpO1xyXG5cdFxyXG5cdCAgICBpZiAoaSAhPT0gZmFsc2UpIHtcclxuXHQgICAgICB2YXIgbWlzbWF0Y2ggPSBmYWxzZTtcclxuXHRcclxuXHQgICAgICAvLyBDaGVjayBmb3IgbWlzbWF0Y2ggb24gdGhlIGludGVycHJldGVkIHZhbHVlLlxyXG5cdFxyXG5cdCAgICAgIF9jb21tb24yLmRlZmF1bHQuZWFjaChfQ29sb3IyLmRlZmF1bHQuQ09NUE9ORU5UUywgZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG5cdCAgICAgICAgaWYgKCFfY29tbW9uMi5kZWZhdWx0LmlzVW5kZWZpbmVkKGlbY29tcG9uZW50XSkgJiYgIV9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQodGhpcy5fX2NvbG9yLl9fc3RhdGVbY29tcG9uZW50XSkgJiYgaVtjb21wb25lbnRdICE9PSB0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSB7XHJcblx0ICAgICAgICAgIG1pc21hdGNoID0gdHJ1ZTtcclxuXHQgICAgICAgICAgcmV0dXJuIHt9OyAvLyBicmVha1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgIH0sIHRoaXMpO1xyXG5cdFxyXG5cdCAgICAgIC8vIElmIG5vdGhpbmcgZGl2ZXJnZXMsIHdlIGtlZXAgb3VyIHByZXZpb3VzIHZhbHVlc1xyXG5cdCAgICAgIC8vIGZvciBzdGF0ZWZ1bG5lc3MsIG90aGVyd2lzZSB3ZSByZWNhbGN1bGF0ZSBmcmVzaFxyXG5cdCAgICAgIGlmIChtaXNtYXRjaCkge1xyXG5cdCAgICAgICAgX2NvbW1vbjIuZGVmYXVsdC5leHRlbmQodGhpcy5fX2NvbG9yLl9fc3RhdGUsIGkpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZCh0aGlzLl9fdGVtcC5fX3N0YXRlLCB0aGlzLl9fY29sb3IuX19zdGF0ZSk7XHJcblx0XHJcblx0ICAgIHRoaXMuX190ZW1wLmEgPSAxO1xyXG5cdFxyXG5cdCAgICB2YXIgZmxpcCA9IHRoaXMuX19jb2xvci52IDwgMC41IHx8IHRoaXMuX19jb2xvci5zID4gMC41ID8gMjU1IDogMDtcclxuXHQgICAgdmFyIF9mbGlwID0gMjU1IC0gZmxpcDtcclxuXHRcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5leHRlbmQodGhpcy5fX2ZpZWxkX2tub2Iuc3R5bGUsIHtcclxuXHQgICAgICBtYXJnaW5MZWZ0OiAxMDAgKiB0aGlzLl9fY29sb3IucyAtIDcgKyAncHgnLFxyXG5cdCAgICAgIG1hcmdpblRvcDogMTAwICogKDEgLSB0aGlzLl9fY29sb3IudikgLSA3ICsgJ3B4JyxcclxuXHQgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuX190ZW1wLnRvSGV4U3RyaW5nKCksXHJcblx0ICAgICAgYm9yZGVyOiB0aGlzLl9fZmllbGRfa25vYl9ib3JkZXIgKyAncmdiKCcgKyBmbGlwICsgJywnICsgZmxpcCArICcsJyArIGZsaXAgKyAnKSdcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIHRoaXMuX19odWVfa25vYi5zdHlsZS5tYXJnaW5Ub3AgPSAoMSAtIHRoaXMuX19jb2xvci5oIC8gMzYwKSAqIDEwMCArICdweCc7XHJcblx0XHJcblx0ICAgIHRoaXMuX190ZW1wLnMgPSAxO1xyXG5cdCAgICB0aGlzLl9fdGVtcC52ID0gMTtcclxuXHRcclxuXHQgICAgbGluZWFyR3JhZGllbnQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQsICdsZWZ0JywgJyNmZmYnLCB0aGlzLl9fdGVtcC50b0hleFN0cmluZygpKTtcclxuXHRcclxuXHQgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX2NvbG9yLnRvU3RyaW5nKCk7XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZXh0ZW5kKHRoaXMuX19pbnB1dC5zdHlsZSwge1xyXG5cdCAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5fX2NvbG9yLnRvSGV4U3RyaW5nKCksXHJcblx0ICAgICAgY29sb3I6ICdyZ2IoJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJywnICsgZmxpcCArICcpJyxcclxuXHQgICAgICB0ZXh0U2hhZG93OiB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyArICdyZ2JhKCcgKyBfZmxpcCArICcsJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKyAnLC43KSdcclxuXHQgICAgfSk7XHJcblx0ICB9O1xyXG5cdFxyXG5cdCAgcmV0dXJuIENvbG9yQ29udHJvbGxlcjtcclxuXHR9KF9Db250cm9sbGVyMy5kZWZhdWx0KTtcclxuXHRcclxuXHR2YXIgdmVuZG9ycyA9IFsnLW1vei0nLCAnLW8tJywgJy13ZWJraXQtJywgJy1tcy0nLCAnJ107XHJcblx0XHJcblx0ZnVuY3Rpb24gbGluZWFyR3JhZGllbnQoZWxlbSwgeCwgYSwgYikge1xyXG5cdCAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XHJcblx0ICBfY29tbW9uMi5kZWZhdWx0LmVhY2godmVuZG9ycywgZnVuY3Rpb24gKHZlbmRvcikge1xyXG5cdCAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6ICcgKyB2ZW5kb3IgKyAnbGluZWFyLWdyYWRpZW50KCcgKyB4ICsgJywgJyArIGEgKyAnIDAlLCAnICsgYiArICcgMTAwJSk7ICc7XHJcblx0ICB9KTtcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gaHVlR3JhZGllbnQoZWxlbSkge1xyXG5cdCAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XHJcblx0ICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsICNmZjAwZmYgMTclLCAjMDAwMGZmIDM0JSwgIzAwZmZmZiA1MCUsICMwMGZmMDAgNjclLCAjZmZmZjAwIDg0JSwgI2ZmMDAwMCAxMDAlKTsnO1xyXG5cdCAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7JztcclxuXHQgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnO1xyXG5cdCAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtbXMtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnO1xyXG5cdCAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOyc7XHJcblx0fVxyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IENvbG9yQ29udHJvbGxlcjtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDE3ICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuXHRcclxuXHR2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IC8qKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblx0XHJcblx0dmFyIF9jc3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcclxuXHRcclxuXHR2YXIgX2NzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jc3MpO1xyXG5cdFxyXG5cdHZhciBfc2F2ZURpYWxvZ3VlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XHJcblx0XHJcblx0dmFyIF9zYXZlRGlhbG9ndWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2F2ZURpYWxvZ3VlKTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXJGYWN0b3J5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMCk7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyRmFjdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db250cm9sbGVyRmFjdG9yeSk7XHJcblx0XHJcblx0dmFyIF9Db250cm9sbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcclxuXHRcclxuXHR2YXIgX0NvbnRyb2xsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29udHJvbGxlcik7XHJcblx0XHJcblx0dmFyIF9Cb29sZWFuQ29udHJvbGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XHJcblx0XHJcblx0dmFyIF9Cb29sZWFuQ29udHJvbGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Cb29sZWFuQ29udHJvbGxlcik7XHJcblx0XHJcblx0dmFyIF9GdW5jdGlvbkNvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcclxuXHRcclxuXHR2YXIgX0Z1bmN0aW9uQ29udHJvbGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9GdW5jdGlvbkNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlckJveCA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlckJveDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OdW1iZXJDb250cm9sbGVyQm94KTtcclxuXHRcclxuXHR2YXIgX051bWJlckNvbnRyb2xsZXJTbGlkZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcclxuXHRcclxuXHR2YXIgX051bWJlckNvbnRyb2xsZXJTbGlkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTnVtYmVyQ29udHJvbGxlclNsaWRlcik7XHJcblx0XHJcblx0dmFyIF9Db2xvckNvbnRyb2xsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KTtcclxuXHRcclxuXHR2YXIgX0NvbG9yQ29udHJvbGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db2xvckNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdHZhciBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7XHJcblx0XHJcblx0dmFyIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVxdWVzdEFuaW1hdGlvbkZyYW1lKTtcclxuXHRcclxuXHR2YXIgX0NlbnRlcmVkRGl2ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMik7XHJcblx0XHJcblx0dmFyIF9DZW50ZXJlZERpdjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9DZW50ZXJlZERpdik7XHJcblx0XHJcblx0dmFyIF9kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xyXG5cdFxyXG5cdHZhciBfZG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RvbSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xyXG5cdFxyXG5cdHZhciBfY29tbW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbW1vbik7XHJcblx0XHJcblx0dmFyIF9zdHlsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xyXG5cdFxyXG5cdHZhciBfc3R5bGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGUpO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XHJcblx0XHJcblx0Ly8gQ1NTIHRvIGVtYmVkIGluIGJ1aWxkXHJcblx0XHJcblx0X2NzczIuZGVmYXVsdC5pbmplY3QoX3N0eWxlMi5kZWZhdWx0KTtcclxuXHRcclxuXHQvKiogT3V0ZXItbW9zdCBjbGFzc05hbWUgZm9yIEdVSSdzICovXHJcblx0dmFyIENTU19OQU1FU1BBQ0UgPSAnZGcnO1xyXG5cdFxyXG5cdHZhciBISURFX0tFWV9DT0RFID0gNzI7XHJcblx0XHJcblx0LyoqIFRoZSBvbmx5IHZhbHVlIHNoYXJlZCBiZXR3ZWVuIHRoZSBKUyBhbmQgU0NTUy4gVXNlIGNhdXRpb24uICovXHJcblx0dmFyIENMT1NFX0JVVFRPTl9IRUlHSFQgPSAyMDtcclxuXHRcclxuXHR2YXIgREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FID0gJ0RlZmF1bHQnO1xyXG5cdFxyXG5cdHZhciBTVVBQT1JUU19MT0NBTF9TVE9SQUdFID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgdHJ5IHtcclxuXHQgICAgcmV0dXJuICdsb2NhbFN0b3JhZ2UnIGluIHdpbmRvdyAmJiB3aW5kb3cubG9jYWxTdG9yYWdlICE9PSBudWxsO1xyXG5cdCAgfSBjYXRjaCAoZSkge1xyXG5cdCAgICByZXR1cm4gZmFsc2U7XHJcblx0ICB9XHJcblx0fSgpO1xyXG5cdFxyXG5cdHZhciBTQVZFX0RJQUxPR1VFID0gdm9pZCAwO1xyXG5cdFxyXG5cdC8qKiBIYXZlIHdlIHlldCB0byBjcmVhdGUgYW4gYXV0b1BsYWNlIEdVST8gKi9cclxuXHR2YXIgYXV0b1BsYWNlVmlyZ2luID0gdHJ1ZTtcclxuXHRcclxuXHQvKiogRml4ZWQgcG9zaXRpb24gZGl2IHRoYXQgYXV0byBwbGFjZSBHVUkncyBnbyBpbnNpZGUgKi9cclxuXHR2YXIgYXV0b1BsYWNlQ29udGFpbmVyID0gdm9pZCAwO1xyXG5cdFxyXG5cdC8qKiBBcmUgd2UgaGlkaW5nIHRoZSBHVUkncyA/ICovXHJcblx0dmFyIGhpZGUgPSBmYWxzZTtcclxuXHRcclxuXHQvKiogR1VJJ3Mgd2hpY2ggc2hvdWxkIGJlIGhpZGRlbiAqL1xyXG5cdHZhciBoaWRlYWJsZUd1aXMgPSBbXTtcclxuXHRcclxuXHQvKipcclxuXHQgKiBBIGxpZ2h0d2VpZ2h0IGNvbnRyb2xsZXIgbGlicmFyeSBmb3IgSmF2YVNjcmlwdC4gSXQgYWxsb3dzIHlvdSB0byBlYXNpbHlcclxuXHQgKiBtYW5pcHVsYXRlIHZhcmlhYmxlcyBhbmQgZmlyZSBmdW5jdGlvbnMgb24gdGhlIGZseS5cclxuXHQgKiBAY2xhc3NcclxuXHQgKlxyXG5cdCAqIEBtZW1iZXIgZGF0Lmd1aVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IFtwYXJhbXMubmFtZV0gVGhlIG5hbWUgb2YgdGhpcyBHVUkuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXMubG9hZF0gSlNPTiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBzYXZlZCBzdGF0ZSBvZlxyXG5cdCAqIHRoaXMgR1VJLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhcmFtcy5hdXRvPXRydWVdXHJcblx0ICogQHBhcmFtIHtkYXQuZ3VpLkdVSX0gW3BhcmFtcy5wYXJlbnRdIFRoZSBHVUkgSSdtIG5lc3RlZCBpbi5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtwYXJhbXMuY2xvc2VkXSBJZiB0cnVlLCBzdGFydHMgY2xvc2VkXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbcGFyYW1zLmNsb3NlT25Ub3BdIElmIHRydWUsIGNsb3NlL29wZW4gYnV0dG9uIHNob3dzIG9uIHRvcCBvZiB0aGUgR1VJXHJcblx0ICovXHJcblx0dmFyIEdVSSA9IGZ1bmN0aW9uIEdVSShwYXJzKSB7XHJcblx0ICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFxyXG5cdCAgdmFyIHBhcmFtcyA9IHBhcnMgfHwge307XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIE91dGVybW9zdCBET00gRWxlbWVudFxyXG5cdCAgICogQHR5cGUgRE9NRWxlbWVudFxyXG5cdCAgICovXHJcblx0ICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHQgIHRoaXMuX191bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblx0ICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3VsKTtcclxuXHRcclxuXHQgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBDU1NfTkFNRVNQQUNFKTtcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogTmVzdGVkIEdVSSdzIGJ5IG5hbWVcclxuXHQgICAqIEBpZ25vcmVcclxuXHQgICAqL1xyXG5cdCAgdGhpcy5fX2ZvbGRlcnMgPSB7fTtcclxuXHRcclxuXHQgIHRoaXMuX19jb250cm9sbGVycyA9IFtdO1xyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKiBMaXN0IG9mIG9iamVjdHMgSSdtIHJlbWVtYmVyaW5nIGZvciBzYXZlLCBvbmx5IHVzZWQgaW4gdG9wIGxldmVsIEdVSVxyXG5cdCAgICogQGlnbm9yZVxyXG5cdCAgICovXHJcblx0ICB0aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMgPSBbXTtcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogTWFwcyB0aGUgaW5kZXggb2YgcmVtZW1iZXJlZCBvYmplY3RzIHRvIGEgbWFwIG9mIGNvbnRyb2xsZXJzLCBvbmx5IHVzZWRcclxuXHQgICAqIGluIHRvcCBsZXZlbCBHVUkuXHJcblx0ICAgKlxyXG5cdCAgICogQHByaXZhdGVcclxuXHQgICAqIEBpZ25vcmVcclxuXHQgICAqXHJcblx0ICAgKiBAZXhhbXBsZVxyXG5cdCAgICogW1xyXG5cdCAgICogIHtcclxuXHQgICAgICogICAgcHJvcGVydHlOYW1lOiBDb250cm9sbGVyLFxyXG5cdCAgICAgKiAgICBhbm90aGVyUHJvcGVydHlOYW1lOiBDb250cm9sbGVyXHJcblx0ICAgICAqICB9LFxyXG5cdCAgICogIHtcclxuXHQgICAgICogICAgcHJvcGVydHlOYW1lOiBDb250cm9sbGVyXHJcblx0ICAgICAqICB9XHJcblx0ICAgKiBdXHJcblx0ICAgKi9cclxuXHQgIHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnMgPSBbXTtcclxuXHRcclxuXHQgIHRoaXMuX19saXN0ZW5pbmcgPSBbXTtcclxuXHRcclxuXHQgIC8vIERlZmF1bHQgcGFyYW1ldGVyc1xyXG5cdCAgcGFyYW1zID0gX2NvbW1vbjIuZGVmYXVsdC5kZWZhdWx0cyhwYXJhbXMsIHtcclxuXHQgICAgY2xvc2VPblRvcDogZmFsc2UsXHJcblx0ICAgIGF1dG9QbGFjZTogdHJ1ZSxcclxuXHQgICAgd2lkdGg6IEdVSS5ERUZBVUxUX1dJRFRIXHJcblx0ICB9KTtcclxuXHRcclxuXHQgIHBhcmFtcyA9IF9jb21tb24yLmRlZmF1bHQuZGVmYXVsdHMocGFyYW1zLCB7XHJcblx0ICAgIHJlc2l6YWJsZTogcGFyYW1zLmF1dG9QbGFjZSxcclxuXHQgICAgaGlkZWFibGU6IHBhcmFtcy5hdXRvUGxhY2VcclxuXHQgIH0pO1xyXG5cdFxyXG5cdCAgaWYgKCFfY29tbW9uMi5kZWZhdWx0LmlzVW5kZWZpbmVkKHBhcmFtcy5sb2FkKSkge1xyXG5cdCAgICAvLyBFeHBsaWNpdCBwcmVzZXRcclxuXHQgICAgaWYgKHBhcmFtcy5wcmVzZXQpIHtcclxuXHQgICAgICBwYXJhbXMubG9hZC5wcmVzZXQgPSBwYXJhbXMucHJlc2V0O1xyXG5cdCAgICB9XHJcblx0ICB9IGVsc2Uge1xyXG5cdCAgICBwYXJhbXMubG9hZCA9IHsgcHJlc2V0OiBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUgfTtcclxuXHQgIH1cclxuXHRcclxuXHQgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5oaWRlYWJsZSkge1xyXG5cdCAgICBoaWRlYWJsZUd1aXMucHVzaCh0aGlzKTtcclxuXHQgIH1cclxuXHRcclxuXHQgIC8vIE9ubHkgcm9vdCBsZXZlbCBHVUkncyBhcmUgcmVzaXphYmxlLlxyXG5cdCAgcGFyYW1zLnJlc2l6YWJsZSA9IF9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLnJlc2l6YWJsZTtcclxuXHRcclxuXHQgIGlmIChwYXJhbXMuYXV0b1BsYWNlICYmIF9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQocGFyYW1zLnNjcm9sbGFibGUpKSB7XHJcblx0ICAgIHBhcmFtcy5zY3JvbGxhYmxlID0gdHJ1ZTtcclxuXHQgIH1cclxuXHQgIC8vICAgIHBhcmFtcy5zY3JvbGxhYmxlID0gY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5zY3JvbGxhYmxlID09PSB0cnVlO1xyXG5cdFxyXG5cdCAgLy8gTm90IHBhcnQgb2YgcGFyYW1zIGJlY2F1c2UgSSBkb24ndCB3YW50IHBlb3BsZSBwYXNzaW5nIHRoaXMgaW4gdmlhXHJcblx0ICAvLyBjb25zdHJ1Y3Rvci4gU2hvdWxkIGJlIGEgJ3JlbWVtYmVyZWQnIHZhbHVlLlxyXG5cdCAgdmFyIHVzZUxvY2FsU3RvcmFnZSA9IFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaCh0aGlzLCAnaXNMb2NhbCcpKSA9PT0gJ3RydWUnO1xyXG5cdFxyXG5cdCAgdmFyIHNhdmVUb0xvY2FsU3RvcmFnZSA9IHZvaWQgMDtcclxuXHRcclxuXHQgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsXHJcblx0ICAvKiogQGxlbmRzIGRhdC5ndWkuR1VJLnByb3RvdHlwZSAqL1xyXG5cdCAge1xyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIHBhcmVudCA8Y29kZT5HVUk8L2NvZGU+XHJcblx0ICAgICAqIEB0eXBlIGRhdC5ndWkuR1VJXHJcblx0ICAgICAqL1xyXG5cdCAgICBwYXJlbnQ6IHtcclxuXHQgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuXHQgICAgICAgIHJldHVybiBwYXJhbXMucGFyZW50O1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgc2Nyb2xsYWJsZToge1xyXG5cdCAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG5cdCAgICAgICAgcmV0dXJuIHBhcmFtcy5zY3JvbGxhYmxlO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgLyoqXHJcblx0ICAgICAqIEhhbmRsZXMgPGNvZGU+R1VJPC9jb2RlPidzIGVsZW1lbnQgcGxhY2VtZW50IGZvciB5b3VcclxuXHQgICAgICogQHR5cGUgQm9vbGVhblxyXG5cdCAgICAgKi9cclxuXHQgICAgYXV0b1BsYWNlOiB7XHJcblx0ICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XHJcblx0ICAgICAgICByZXR1cm4gcGFyYW1zLmF1dG9QbGFjZTtcclxuXHQgICAgICB9XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBIYW5kbGVzIDxjb2RlPkdVSTwvY29kZT4ncyBwb3NpdGlvbiBvZiBvcGVuL2Nsb3NlIGJ1dHRvblxyXG5cdCAgICAgKiBAdHlwZSBCb29sZWFuXHJcblx0ICAgICAqL1xyXG5cdCAgICBjbG9zZU9uVG9wOiB7XHJcblx0ICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XHJcblx0ICAgICAgICByZXR1cm4gcGFyYW1zLmNsb3NlT25Ub3A7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIGlkZW50aWZpZXIgZm9yIGEgc2V0IG9mIHNhdmVkIHZhbHVlc1xyXG5cdCAgICAgKiBAdHlwZSBTdHJpbmdcclxuXHQgICAgICovXHJcblx0ICAgIHByZXNldDoge1xyXG5cdCAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG5cdCAgICAgICAgaWYgKF90aGlzLnBhcmVudCkge1xyXG5cdCAgICAgICAgICByZXR1cm4gX3RoaXMuZ2V0Um9vdCgpLnByZXNldDtcclxuXHQgICAgICAgIH1cclxuXHRcclxuXHQgICAgICAgIHJldHVybiBwYXJhbXMubG9hZC5wcmVzZXQ7XHJcblx0ICAgICAgfSxcclxuXHRcclxuXHQgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2KSB7XHJcblx0ICAgICAgICBpZiAoX3RoaXMucGFyZW50KSB7XHJcblx0ICAgICAgICAgIF90aGlzLmdldFJvb3QoKS5wcmVzZXQgPSB2O1xyXG5cdCAgICAgICAgfSBlbHNlIHtcclxuXHQgICAgICAgICAgcGFyYW1zLmxvYWQucHJlc2V0ID0gdjtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICAgIHNldFByZXNldFNlbGVjdEluZGV4KHRoaXMpO1xyXG5cdCAgICAgICAgX3RoaXMucmV2ZXJ0KCk7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIHdpZHRoIG9mIDxjb2RlPkdVSTwvY29kZT4gZWxlbWVudFxyXG5cdCAgICAgKiBAdHlwZSBOdW1iZXJcclxuXHQgICAgICovXHJcblx0ICAgIHdpZHRoOiB7XHJcblx0ICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XHJcblx0ICAgICAgICByZXR1cm4gcGFyYW1zLndpZHRoO1xyXG5cdCAgICAgIH0sXHJcblx0ICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodikge1xyXG5cdCAgICAgICAgcGFyYW1zLndpZHRoID0gdjtcclxuXHQgICAgICAgIHNldFdpZHRoKF90aGlzLCB2KTtcclxuXHQgICAgICB9XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgbmFtZSBvZiA8Y29kZT5HVUk8L2NvZGU+LiBVc2VkIGZvciBmb2xkZXJzLiBpLmVcclxuXHQgICAgICogYSBmb2xkZXIncyBuYW1lXHJcblx0ICAgICAqIEB0eXBlIFN0cmluZ1xyXG5cdCAgICAgKi9cclxuXHQgICAgbmFtZToge1xyXG5cdCAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG5cdCAgICAgICAgcmV0dXJuIHBhcmFtcy5uYW1lO1xyXG5cdCAgICAgIH0sXHJcblx0ICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodikge1xyXG5cdCAgICAgICAgLy8gVE9ETyBDaGVjayBmb3IgY29sbGlzaW9ucyBhbW9uZyBzaWJsaW5nIGZvbGRlcnNcclxuXHQgICAgICAgIHBhcmFtcy5uYW1lID0gdjtcclxuXHQgICAgICAgIGlmICh0aXRsZVJvd05hbWUpIHtcclxuXHQgICAgICAgICAgdGl0bGVSb3dOYW1lLmlubmVySFRNTCA9IHBhcmFtcy5uYW1lO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgIH1cclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFdoZXRoZXIgdGhlIDxjb2RlPkdVSTwvY29kZT4gaXMgY29sbGFwc2VkIG9yIG5vdFxyXG5cdCAgICAgKiBAdHlwZSBCb29sZWFuXHJcblx0ICAgICAqL1xyXG5cdCAgICBjbG9zZWQ6IHtcclxuXHQgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuXHQgICAgICAgIHJldHVybiBwYXJhbXMuY2xvc2VkO1xyXG5cdCAgICAgIH0sXHJcblx0ICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodikge1xyXG5cdCAgICAgICAgcGFyYW1zLmNsb3NlZCA9IHY7XHJcblx0ICAgICAgICBpZiAocGFyYW1zLmNsb3NlZCkge1xyXG5cdCAgICAgICAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKF90aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xyXG5cdCAgICAgICAgfSBlbHNlIHtcclxuXHQgICAgICAgICAgX2RvbTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhfdGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICAgIC8vIEZvciBicm93c2VycyB0aGF0IGFyZW4ndCBnb2luZyB0byByZXNwZWN0IHRoZSBDU1MgdHJhbnNpdGlvbixcclxuXHQgICAgICAgIC8vIExldHMganVzdCBjaGVjayBvdXIgaGVpZ2h0IGFnYWluc3QgdGhlIHdpbmRvdyBoZWlnaHQgcmlnaHQgb2ZmXHJcblx0ICAgICAgICAvLyB0aGUgYmF0LlxyXG5cdCAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xyXG5cdFxyXG5cdCAgICAgICAgaWYgKF90aGlzLl9fY2xvc2VCdXR0b24pIHtcclxuXHQgICAgICAgICAgX3RoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSB2ID8gR1VJLlRFWFRfT1BFTiA6IEdVSS5URVhUX0NMT1NFRDtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICB9XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBDb250YWlucyBhbGwgcHJlc2V0c1xyXG5cdCAgICAgKiBAdHlwZSBPYmplY3RcclxuXHQgICAgICovXHJcblx0ICAgIGxvYWQ6IHtcclxuXHQgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuXHQgICAgICAgIHJldHVybiBwYXJhbXMubG9hZDtcclxuXHQgICAgICB9XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRvIHVzZSA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL1N0b3JhZ2UjbG9jYWxTdG9yYWdlXCI+bG9jYWxTdG9yYWdlPC9hPiBhcyB0aGUgbWVhbnMgZm9yXHJcblx0ICAgICAqIDxjb2RlPnJlbWVtYmVyPC9jb2RlPmluZ1xyXG5cdCAgICAgKiBAdHlwZSBCb29sZWFuXHJcblx0ICAgICAqL1xyXG5cdCAgICB1c2VMb2NhbFN0b3JhZ2U6IHtcclxuXHRcclxuXHQgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuXHQgICAgICAgIHJldHVybiB1c2VMb2NhbFN0b3JhZ2U7XHJcblx0ICAgICAgfSxcclxuXHQgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChib29sKSB7XHJcblx0ICAgICAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xyXG5cdCAgICAgICAgICB1c2VMb2NhbFN0b3JhZ2UgPSBib29sO1xyXG5cdCAgICAgICAgICBpZiAoYm9vbCkge1xyXG5cdCAgICAgICAgICAgIF9kb20yLmRlZmF1bHQuYmluZCh3aW5kb3csICd1bmxvYWQnLCBzYXZlVG9Mb2NhbFN0b3JhZ2UpO1xyXG5cdCAgICAgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgICAgIF9kb20yLmRlZmF1bHQudW5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIHNhdmVUb0xvY2FsU3RvcmFnZSk7XHJcblx0ICAgICAgICAgIH1cclxuXHQgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChfdGhpcywgJ2lzTG9jYWwnKSwgYm9vbCk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgfVxyXG5cdCAgICB9XHJcblx0ICB9KTtcclxuXHRcclxuXHQgIC8vIEFyZSB3ZSBhIHJvb3QgbGV2ZWwgR1VJP1xyXG5cdCAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkpIHtcclxuXHQgICAgcGFyYW1zLmNsb3NlZCA9IGZhbHNlO1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKHRoaXMuZG9tRWxlbWVudCwgR1VJLkNMQVNTX01BSU4pO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0Lm1ha2VTZWxlY3RhYmxlKHRoaXMuZG9tRWxlbWVudCwgZmFsc2UpO1xyXG5cdFxyXG5cdCAgICAvLyBBcmUgd2Ugc3VwcG9zZWQgdG8gYmUgbG9hZGluZyBsb2NhbGx5P1xyXG5cdCAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xyXG5cdCAgICAgIGlmICh1c2VMb2NhbFN0b3JhZ2UpIHtcclxuXHQgICAgICAgIF90aGlzLnVzZUxvY2FsU3RvcmFnZSA9IHRydWU7XHJcblx0XHJcblx0ICAgICAgICB2YXIgc2F2ZWRHdWkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKHRoaXMsICdndWknKSk7XHJcblx0XHJcblx0ICAgICAgICBpZiAoc2F2ZWRHdWkpIHtcclxuXHQgICAgICAgICAgcGFyYW1zLmxvYWQgPSBKU09OLnBhcnNlKHNhdmVkR3VpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICB9XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgdGhpcy5fX2Nsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0ICAgIHRoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBHVUkuVEVYVF9DTE9TRUQ7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3ModGhpcy5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfQ0xPU0VfQlVUVE9OKTtcclxuXHQgICAgaWYgKHBhcmFtcy5jbG9zZU9uVG9wKSB7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyh0aGlzLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19DTE9TRV9UT1ApO1xyXG5cdCAgICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5fX2Nsb3NlQnV0dG9uLCB0aGlzLmRvbUVsZW1lbnQuY2hpbGROb2Rlc1swXSk7XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyh0aGlzLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19DTE9TRV9CT1RUT00pO1xyXG5cdCAgICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fY2xvc2VCdXR0b24pO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZCh0aGlzLl9fY2xvc2VCdXR0b24sICdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xyXG5cdCAgICB9KTtcclxuXHQgICAgLy8gT2gsIHlvdSdyZSBhIG5lc3RlZCBHVUkhXHJcblx0ICB9IGVsc2Uge1xyXG5cdCAgICBpZiAocGFyYW1zLmNsb3NlZCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0ICAgICAgcGFyYW1zLmNsb3NlZCA9IHRydWU7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgdmFyIF90aXRsZVJvd05hbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYXJhbXMubmFtZSk7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoX3RpdGxlUm93TmFtZSwgJ2NvbnRyb2xsZXItbmFtZScpO1xyXG5cdFxyXG5cdCAgICB2YXIgdGl0bGVSb3cgPSBhZGRSb3coX3RoaXMsIF90aXRsZVJvd05hbWUpO1xyXG5cdFxyXG5cdCAgICB2YXIgb25DbGlja1RpdGxlID0gZnVuY3Rpb24gb25DbGlja1RpdGxlKGUpIHtcclxuXHQgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0ICAgICAgX3RoaXMuY2xvc2VkID0gIV90aGlzLmNsb3NlZDtcclxuXHQgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgIH07XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3ModGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyh0aXRsZVJvdywgJ3RpdGxlJyk7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZCh0aXRsZVJvdywgJ2NsaWNrJywgb25DbGlja1RpdGxlKTtcclxuXHRcclxuXHQgICAgaWYgKCFwYXJhbXMuY2xvc2VkKSB7XHJcblx0ICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdFxyXG5cdCAgaWYgKHBhcmFtcy5hdXRvUGxhY2UpIHtcclxuXHQgICAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkpIHtcclxuXHQgICAgICBpZiAoYXV0b1BsYWNlVmlyZ2luKSB7XHJcblx0ICAgICAgICBhdXRvUGxhY2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHQgICAgICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoYXV0b1BsYWNlQ29udGFpbmVyLCBDU1NfTkFNRVNQQUNFKTtcclxuXHQgICAgICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoYXV0b1BsYWNlQ29udGFpbmVyLCBHVUkuQ0xBU1NfQVVUT19QTEFDRV9DT05UQUlORVIpO1xyXG5cdCAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhdXRvUGxhY2VDb250YWluZXIpO1xyXG5cdCAgICAgICAgYXV0b1BsYWNlVmlyZ2luID0gZmFsc2U7XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIC8vIFB1dCBpdCBpbiB0aGUgZG9tIGZvciB5b3UuXHJcblx0ICAgICAgYXV0b1BsYWNlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XHJcblx0XHJcblx0ICAgICAgLy8gQXBwbHkgdGhlIGF1dG8gc3R5bGVzXHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19BVVRPX1BMQUNFKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICAvLyBNYWtlIGl0IG5vdCBlbGFzdGljLlxyXG5cdCAgICBpZiAoIXRoaXMucGFyZW50KSB7XHJcblx0ICAgICAgc2V0V2lkdGgoX3RoaXMsIHBhcmFtcy53aWR0aCk7XHJcblx0ICAgIH1cclxuXHQgIH1cclxuXHRcclxuXHQgIHRoaXMuX19yZXNpemVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgICBfdGhpcy5vblJlc2l6ZURlYm91bmNlZCgpO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIF9kb20yLmRlZmF1bHQuYmluZCh3aW5kb3csICdyZXNpemUnLCB0aGlzLl9fcmVzaXplSGFuZGxlcik7XHJcblx0ICBfZG9tMi5kZWZhdWx0LmJpbmQodGhpcy5fX3VsLCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIHRoaXMuX19yZXNpemVIYW5kbGVyKTtcclxuXHQgIF9kb20yLmRlZmF1bHQuYmluZCh0aGlzLl9fdWwsICd0cmFuc2l0aW9uZW5kJywgdGhpcy5fX3Jlc2l6ZUhhbmRsZXIpO1xyXG5cdCAgX2RvbTIuZGVmYXVsdC5iaW5kKHRoaXMuX191bCwgJ29UcmFuc2l0aW9uRW5kJywgdGhpcy5fX3Jlc2l6ZUhhbmRsZXIpO1xyXG5cdCAgdGhpcy5vblJlc2l6ZSgpO1xyXG5cdFxyXG5cdCAgaWYgKHBhcmFtcy5yZXNpemFibGUpIHtcclxuXHQgICAgYWRkUmVzaXplSGFuZGxlKHRoaXMpO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgc2F2ZVRvTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gc2F2ZVRvTG9jYWxTdG9yYWdlKCkge1xyXG5cdCAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKF90aGlzLCAnaXNMb2NhbCcpKSA9PT0gJ3RydWUnKSB7XHJcblx0ICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChfdGhpcywgJ2d1aScpLCBKU09OLnN0cmluZ2lmeShfdGhpcy5nZXRTYXZlT2JqZWN0KCkpKTtcclxuXHQgICAgfVxyXG5cdCAgfTtcclxuXHRcclxuXHQgIC8vIGV4cG9zZSB0aGlzIG1ldGhvZCBwdWJsaWNseVxyXG5cdCAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2VJZlBvc3NpYmxlID0gc2F2ZVRvTG9jYWxTdG9yYWdlO1xyXG5cdFxyXG5cdCAgZnVuY3Rpb24gcmVzZXRXaWR0aCgpIHtcclxuXHQgICAgdmFyIHJvb3QgPSBfdGhpcy5nZXRSb290KCk7XHJcblx0ICAgIHJvb3Qud2lkdGggKz0gMTtcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5kZWZlcihmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgcm9vdC53aWR0aCAtPSAxO1xyXG5cdCAgICB9KTtcclxuXHQgIH1cclxuXHRcclxuXHQgIGlmICghcGFyYW1zLnBhcmVudCkge1xyXG5cdCAgICByZXNldFdpZHRoKCk7XHJcblx0ICB9XHJcblx0fTtcclxuXHRcclxuXHRHVUkudG9nZ2xlSGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuXHQgIGhpZGUgPSAhaGlkZTtcclxuXHQgIF9jb21tb24yLmRlZmF1bHQuZWFjaChoaWRlYWJsZUd1aXMsIGZ1bmN0aW9uIChndWkpIHtcclxuXHQgICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGhpZGUgPyAnbm9uZScgOiAnJztcclxuXHQgIH0pO1xyXG5cdH07XHJcblx0XHJcblx0R1VJLkNMQVNTX0FVVE9fUExBQ0UgPSAnYSc7XHJcblx0R1VJLkNMQVNTX0FVVE9fUExBQ0VfQ09OVEFJTkVSID0gJ2FjJztcclxuXHRHVUkuQ0xBU1NfTUFJTiA9ICdtYWluJztcclxuXHRHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cgPSAnY3InO1xyXG5cdEdVSS5DTEFTU19UT09fVEFMTCA9ICd0YWxsZXItdGhhbi13aW5kb3cnO1xyXG5cdEdVSS5DTEFTU19DTE9TRUQgPSAnY2xvc2VkJztcclxuXHRHVUkuQ0xBU1NfQ0xPU0VfQlVUVE9OID0gJ2Nsb3NlLWJ1dHRvbic7XHJcblx0R1VJLkNMQVNTX0NMT1NFX1RPUCA9ICdjbG9zZS10b3AnO1xyXG5cdEdVSS5DTEFTU19DTE9TRV9CT1RUT00gPSAnY2xvc2UtYm90dG9tJztcclxuXHRHVUkuQ0xBU1NfRFJBRyA9ICdkcmFnJztcclxuXHRcclxuXHRHVUkuREVGQVVMVF9XSURUSCA9IDI0NTtcclxuXHRHVUkuVEVYVF9DTE9TRUQgPSAnQ2xvc2UgQ29udHJvbHMnO1xyXG5cdEdVSS5URVhUX09QRU4gPSAnT3BlbiBDb250cm9scyc7XHJcblx0XHJcblx0R1VJLl9rZXlkb3duSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcblx0ICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50eXBlICE9PSAndGV4dCcgJiYgKGUud2hpY2ggPT09IEhJREVfS0VZX0NPREUgfHwgZS5rZXlDb2RlID09PSBISURFX0tFWV9DT0RFKSkge1xyXG5cdCAgICBHVUkudG9nZ2xlSGlkZSgpO1xyXG5cdCAgfVxyXG5cdH07XHJcblx0X2RvbTIuZGVmYXVsdC5iaW5kKHdpbmRvdywgJ2tleWRvd24nLCBHVUkuX2tleWRvd25IYW5kbGVyLCBmYWxzZSk7XHJcblx0XHJcblx0X2NvbW1vbjIuZGVmYXVsdC5leHRlbmQoR1VJLnByb3RvdHlwZSxcclxuXHRcclxuXHQvKiogQGxlbmRzIGRhdC5ndWkuR1VJICovXHJcblx0e1xyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKiBAcGFyYW0gb2JqZWN0XHJcblx0ICAgKiBAcGFyYW0gcHJvcGVydHlcclxuXHQgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gVGhlIG5ldyBjb250cm9sbGVyIHRoYXQgd2FzIGFkZGVkLlxyXG5cdCAgICogQGluc3RhbmNlXHJcblx0ICAgKi9cclxuXHQgIGFkZDogZnVuY3Rpb24gYWRkKG9iamVjdCwgcHJvcGVydHkpIHtcclxuXHQgICAgcmV0dXJuIF9hZGQodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwge1xyXG5cdCAgICAgIGZhY3RvcnlBcmdzOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXHJcblx0ICAgIH0pO1xyXG5cdCAgfSxcclxuXHRcclxuXHQgIC8qKlxyXG5cdCAgICogQHBhcmFtIG9iamVjdFxyXG5cdCAgICogQHBhcmFtIHByb3BlcnR5XHJcblx0ICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbG9yQ29udHJvbGxlcn0gVGhlIG5ldyBjb250cm9sbGVyIHRoYXQgd2FzIGFkZGVkLlxyXG5cdCAgICogQGluc3RhbmNlXHJcblx0ICAgKi9cclxuXHQgIGFkZENvbG9yOiBmdW5jdGlvbiBhZGRDb2xvcihvYmplY3QsIHByb3BlcnR5KSB7XHJcblx0ICAgIHJldHVybiBfYWRkKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHtcclxuXHQgICAgICBjb2xvcjogdHJ1ZVxyXG5cdCAgICB9KTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIEBwYXJhbSBjb250cm9sbGVyXHJcblx0ICAgKiBAaW5zdGFuY2VcclxuXHQgICAqL1xyXG5cdCAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoY29udHJvbGxlcikge1xyXG5cdCAgICAvLyBUT0RPIGxpc3RlbmluZz9cclxuXHQgICAgdGhpcy5fX3VsLnJlbW92ZUNoaWxkKGNvbnRyb2xsZXIuX19saSk7XHJcblx0ICAgIHRoaXMuX19jb250cm9sbGVycy5zcGxpY2UodGhpcy5fX2NvbnRyb2xsZXJzLmluZGV4T2YoY29udHJvbGxlciksIDEpO1xyXG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmRlZmVyKGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICBfdGhpcy5vblJlc2l6ZSgpO1xyXG5cdCAgICB9KTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG5cdCAgICBpZiAodGhpcy5hdXRvUGxhY2UpIHtcclxuXHQgICAgICBhdXRvUGxhY2VDb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LnVuYmluZCh3aW5kb3csICdrZXlkb3duJywgR1VJLl9rZXlkb3duSGFuZGxlciwgZmFsc2UpO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LnVuYmluZCh3aW5kb3csICdyZXNpemUnLCB0aGlzLl9fcmVzaXplSGFuZGxlcik7XHJcblx0XHJcblx0ICAgIGlmICh0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUpIHtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LnVuYmluZCh3aW5kb3csICd1bmxvYWQnLCB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUpO1xyXG5cdCAgICB9XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKiBAcGFyYW0gbmFtZVxyXG5cdCAgICogQHJldHVybnMge2RhdC5ndWkuR1VJfSBUaGUgbmV3IGZvbGRlci5cclxuXHQgICAqIEB0aHJvd3Mge0Vycm9yfSBpZiB0aGlzIEdVSSBhbHJlYWR5IGhhcyBhIGZvbGRlciBieSB0aGUgc3BlY2lmaWVkXHJcblx0ICAgKiBuYW1lXHJcblx0ICAgKiBAaW5zdGFuY2VcclxuXHQgICAqL1xyXG5cdCAgYWRkRm9sZGVyOiBmdW5jdGlvbiBhZGRGb2xkZXIobmFtZSkge1xyXG5cdCAgICAvLyBXZSBoYXZlIHRvIHByZXZlbnQgY29sbGlzaW9ucyBvbiBuYW1lcyBpbiBvcmRlciB0byBoYXZlIGEga2V5XHJcblx0ICAgIC8vIGJ5IHdoaWNoIHRvIHJlbWVtYmVyIHNhdmVkIHZhbHVlc1xyXG5cdCAgICBpZiAodGhpcy5fX2ZvbGRlcnNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGFscmVhZHkgaGF2ZSBhIGZvbGRlciBpbiB0aGlzIEdVSSBieSB0aGUnICsgJyBuYW1lIFwiJyArIG5hbWUgKyAnXCInKTtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICB2YXIgbmV3R3VpUGFyYW1zID0geyBuYW1lOiBuYW1lLCBwYXJlbnQ6IHRoaXMgfTtcclxuXHRcclxuXHQgICAgLy8gV2UgbmVlZCB0byBwYXNzIGRvd24gdGhlIGF1dG9QbGFjZSB0cmFpdCBzbyB0aGF0IHdlIGNhblxyXG5cdCAgICAvLyBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzIHRvIG9wZW4vY2xvc2UgZm9sZGVyIGFjdGlvbnMgdG9cclxuXHQgICAgLy8gZW5zdXJlIHRoYXQgYSBzY3JvbGxiYXIgYXBwZWFycyBpZiB0aGUgd2luZG93IGlzIHRvbyBzaG9ydC5cclxuXHQgICAgbmV3R3VpUGFyYW1zLmF1dG9QbGFjZSA9IHRoaXMuYXV0b1BsYWNlO1xyXG5cdFxyXG5cdCAgICAvLyBEbyB3ZSBoYXZlIHNhdmVkIGFwcGVhcmFuY2UgZGF0YSBmb3IgdGhpcyBmb2xkZXI/XHJcblx0ICAgIGlmICh0aGlzLmxvYWQgJiYgLy8gQW55dGhpbmcgbG9hZGVkP1xyXG5cdCAgICB0aGlzLmxvYWQuZm9sZGVycyAmJiAvLyBXYXMgbXkgcGFyZW50IGEgZGVhZC1lbmQ/XHJcblx0ICAgIHRoaXMubG9hZC5mb2xkZXJzW25hbWVdKSB7XHJcblx0ICAgICAgLy8gRGlkIGRhZGR5IHJlbWVtYmVyIG1lP1xyXG5cdCAgICAgIC8vIFN0YXJ0IG1lIGNsb3NlZCBpZiBJIHdhcyBjbG9zZWRcclxuXHQgICAgICBuZXdHdWlQYXJhbXMuY2xvc2VkID0gdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV0uY2xvc2VkO1xyXG5cdFxyXG5cdCAgICAgIC8vIFBhc3MgZG93biB0aGUgbG9hZGVkIGRhdGFcclxuXHQgICAgICBuZXdHdWlQYXJhbXMubG9hZCA9IHRoaXMubG9hZC5mb2xkZXJzW25hbWVdO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIHZhciBndWkgPSBuZXcgR1VJKG5ld0d1aVBhcmFtcyk7XHJcblx0ICAgIHRoaXMuX19mb2xkZXJzW25hbWVdID0gZ3VpO1xyXG5cdFxyXG5cdCAgICB2YXIgbGkgPSBhZGRSb3codGhpcywgZ3VpLmRvbUVsZW1lbnQpO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGxpLCAnZm9sZGVyJyk7XHJcblx0ICAgIHJldHVybiBndWk7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcclxuXHQgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XHJcblx0ICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICBvblJlc2l6ZTogZnVuY3Rpb24gb25SZXNpemUoKSB7XHJcblx0ICAgIC8vIHdlIGRlYm91bmNlIHRoaXMgZnVuY3Rpb24gdG8gcHJldmVudCBwZXJmb3JtYW5jZSBpc3N1ZXMgd2hlbiByb3RhdGluZyBvbiB0YWJsZXQvbW9iaWxlXHJcblx0ICAgIHZhciByb290ID0gdGhpcy5nZXRSb290KCk7XHJcblx0ICAgIGlmIChyb290LnNjcm9sbGFibGUpIHtcclxuXHQgICAgICB2YXIgdG9wID0gX2RvbTIuZGVmYXVsdC5nZXRPZmZzZXQocm9vdC5fX3VsKS50b3A7XHJcblx0ICAgICAgdmFyIGggPSAwO1xyXG5cdFxyXG5cdCAgICAgIF9jb21tb24yLmRlZmF1bHQuZWFjaChyb290Ll9fdWwuY2hpbGROb2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcclxuXHQgICAgICAgIGlmICghKHJvb3QuYXV0b1BsYWNlICYmIG5vZGUgPT09IHJvb3QuX19zYXZlX3JvdykpIHtcclxuXHQgICAgICAgICAgaCArPSBfZG9tMi5kZWZhdWx0LmdldEhlaWdodChub2RlKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICB9KTtcclxuXHRcclxuXHQgICAgICBpZiAod2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCA8IGgpIHtcclxuXHQgICAgICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xyXG5cdCAgICAgICAgcm9vdC5fX3VsLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRvcCAtIENMT1NFX0JVVFRPTl9IRUlHSFQgKyAncHgnO1xyXG5cdCAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICBfZG9tMi5kZWZhdWx0LnJlbW92ZUNsYXNzKHJvb3QuZG9tRWxlbWVudCwgR1VJLkNMQVNTX1RPT19UQUxMKTtcclxuXHQgICAgICAgIHJvb3QuX191bC5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XHJcblx0ICAgICAgfVxyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGlmIChyb290Ll9fcmVzaXplX2hhbmRsZSkge1xyXG5cdCAgICAgIF9jb21tb24yLmRlZmF1bHQuZGVmZXIoZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgICAgcm9vdC5fX3Jlc2l6ZV9oYW5kbGUuc3R5bGUuaGVpZ2h0ID0gcm9vdC5fX3VsLm9mZnNldEhlaWdodCArICdweCc7XHJcblx0ICAgICAgfSk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgaWYgKHJvb3QuX19jbG9zZUJ1dHRvbikge1xyXG5cdCAgICAgIHJvb3QuX19jbG9zZUJ1dHRvbi5zdHlsZS53aWR0aCA9IHJvb3Qud2lkdGggKyAncHgnO1xyXG5cdCAgICB9XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgb25SZXNpemVEZWJvdW5jZWQ6IF9jb21tb24yLmRlZmF1bHQuZGVib3VuY2UoZnVuY3Rpb24gKCkge1xyXG5cdCAgICB0aGlzLm9uUmVzaXplKCk7XHJcblx0ICB9LCA1MCksXHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIE1hcmsgb2JqZWN0cyBmb3Igc2F2aW5nLiBUaGUgb3JkZXIgb2YgdGhlc2Ugb2JqZWN0cyBjYW5ub3QgY2hhbmdlIGFzXHJcblx0ICAgKiB0aGUgR1VJIGdyb3dzLiBXaGVuIHJlbWVtYmVyaW5nIG5ldyBvYmplY3RzLCBhcHBlbmQgdGhlbSB0byB0aGUgZW5kXHJcblx0ICAgKiBvZiB0aGUgbGlzdC5cclxuXHQgICAqXHJcblx0ICAgKiBAcGFyYW0ge09iamVjdC4uLn0gb2JqZWN0c1xyXG5cdCAgICogQHRocm93cyB7RXJyb3J9IGlmIG5vdCBjYWxsZWQgb24gYSB0b3AgbGV2ZWwgR1VJLlxyXG5cdCAgICogQGluc3RhbmNlXHJcblx0ICAgKi9cclxuXHQgIHJlbWVtYmVyOiBmdW5jdGlvbiByZW1lbWJlcigpIHtcclxuXHQgICAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNVbmRlZmluZWQoU0FWRV9ESUFMT0dVRSkpIHtcclxuXHQgICAgICBTQVZFX0RJQUxPR1VFID0gbmV3IF9DZW50ZXJlZERpdjIuZGVmYXVsdCgpO1xyXG5cdCAgICAgIFNBVkVfRElBTE9HVUUuZG9tRWxlbWVudC5pbm5lckhUTUwgPSBfc2F2ZURpYWxvZ3VlMi5kZWZhdWx0O1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIGlmICh0aGlzLnBhcmVudCkge1xyXG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbiBvbmx5IGNhbGwgcmVtZW1iZXIgb24gYSB0b3AgbGV2ZWwgR1VJLicpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZWFjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLCBmdW5jdGlvbiAob2JqZWN0KSB7XHJcblx0ICAgICAgaWYgKF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMubGVuZ3RoID09PSAwKSB7XHJcblx0ICAgICAgICBhZGRTYXZlTWVudShfdGhpcyk7XHJcblx0ICAgICAgfVxyXG5cdCAgICAgIGlmIChfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSA9PT0gLTEpIHtcclxuXHQgICAgICAgIF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMucHVzaChvYmplY3QpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIGlmICh0aGlzLmF1dG9QbGFjZSkge1xyXG5cdCAgICAgIC8vIFNldCBzYXZlIHJvdyB3aWR0aFxyXG5cdCAgICAgIHNldFdpZHRoKHRoaXMsIHRoaXMud2lkdGgpO1xyXG5cdCAgICB9XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgLyoqXHJcblx0ICAgKiBAcmV0dXJucyB7ZGF0Lmd1aS5HVUl9IHRoZSB0b3Btb3N0IHBhcmVudCBHVUkgb2YgYSBuZXN0ZWQgR1VJLlxyXG5cdCAgICogQGluc3RhbmNlXHJcblx0ICAgKi9cclxuXHQgIGdldFJvb3Q6IGZ1bmN0aW9uIGdldFJvb3QoKSB7XHJcblx0ICAgIHZhciBndWkgPSB0aGlzO1xyXG5cdCAgICB3aGlsZSAoZ3VpLnBhcmVudCkge1xyXG5cdCAgICAgIGd1aSA9IGd1aS5wYXJlbnQ7XHJcblx0ICAgIH1cclxuXHQgICAgcmV0dXJuIGd1aTtcclxuXHQgIH0sXHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIEByZXR1cm5zIHtPYmplY3R9IGEgSlNPTiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IHN0YXRlIG9mXHJcblx0ICAgKiB0aGlzIEdVSSBhcyB3ZWxsIGFzIGl0cyByZW1lbWJlcmVkIHByb3BlcnRpZXMuXHJcblx0ICAgKiBAaW5zdGFuY2VcclxuXHQgICAqL1xyXG5cdCAgZ2V0U2F2ZU9iamVjdDogZnVuY3Rpb24gZ2V0U2F2ZU9iamVjdCgpIHtcclxuXHQgICAgdmFyIHRvUmV0dXJuID0gdGhpcy5sb2FkO1xyXG5cdCAgICB0b1JldHVybi5jbG9zZWQgPSB0aGlzLmNsb3NlZDtcclxuXHRcclxuXHQgICAgLy8gQW0gSSByZW1lbWJlcmluZyBhbnkgdmFsdWVzP1xyXG5cdCAgICBpZiAodGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmxlbmd0aCA+IDApIHtcclxuXHQgICAgICB0b1JldHVybi5wcmVzZXQgPSB0aGlzLnByZXNldDtcclxuXHRcclxuXHQgICAgICBpZiAoIXRvUmV0dXJuLnJlbWVtYmVyZWQpIHtcclxuXHQgICAgICAgIHRvUmV0dXJuLnJlbWVtYmVyZWQgPSB7fTtcclxuXHQgICAgICB9XHJcblx0XHJcblx0ICAgICAgdG9SZXR1cm4ucmVtZW1iZXJlZFt0aGlzLnByZXNldF0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIHRvUmV0dXJuLmZvbGRlcnMgPSB7fTtcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbiAoZWxlbWVudCwga2V5KSB7XHJcblx0ICAgICAgdG9SZXR1cm4uZm9sZGVyc1trZXldID0gZWxlbWVudC5nZXRTYXZlT2JqZWN0KCk7XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICByZXR1cm4gdG9SZXR1cm47XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgc2F2ZTogZnVuY3Rpb24gc2F2ZSgpIHtcclxuXHQgICAgaWYgKCF0aGlzLmxvYWQucmVtZW1iZXJlZCkge1xyXG5cdCAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbdGhpcy5wcmVzZXRdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcclxuXHQgICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMsIGZhbHNlKTtcclxuXHQgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2VJZlBvc3NpYmxlKCk7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgc2F2ZUFzOiBmdW5jdGlvbiBzYXZlQXMocHJlc2V0TmFtZSkge1xyXG5cdCAgICBpZiAoIXRoaXMubG9hZC5yZW1lbWJlcmVkKSB7XHJcblx0ICAgICAgLy8gUmV0YWluIGRlZmF1bHQgdmFsdWVzIHVwb24gZmlyc3Qgc2F2ZVxyXG5cdCAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XHJcblx0ICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcywgdHJ1ZSk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbcHJlc2V0TmFtZV0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMpO1xyXG5cdCAgICB0aGlzLnByZXNldCA9IHByZXNldE5hbWU7XHJcblx0ICAgIGFkZFByZXNldE9wdGlvbih0aGlzLCBwcmVzZXROYW1lLCB0cnVlKTtcclxuXHQgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2VJZlBvc3NpYmxlKCk7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgcmV2ZXJ0OiBmdW5jdGlvbiByZXZlcnQoZ3VpKSB7XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZWFjaCh0aGlzLl9fY29udHJvbGxlcnMsIGZ1bmN0aW9uIChjb250cm9sbGVyKSB7XHJcblx0ICAgICAgLy8gTWFrZSByZXZlcnQgd29yayBvbiBEZWZhdWx0LlxyXG5cdCAgICAgIGlmICghdGhpcy5nZXRSb290KCkubG9hZC5yZW1lbWJlcmVkKSB7XHJcblx0ICAgICAgICBjb250cm9sbGVyLnNldFZhbHVlKGNvbnRyb2xsZXIuaW5pdGlhbFZhbHVlKTtcclxuXHQgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgcmVjYWxsU2F2ZWRWYWx1ZShndWkgfHwgdGhpcy5nZXRSb290KCksIGNvbnRyb2xsZXIpO1xyXG5cdCAgICAgIH1cclxuXHRcclxuXHQgICAgICAvLyBmaXJlIG9uRmluaXNoQ2hhbmdlIGNhbGxiYWNrXHJcblx0ICAgICAgaWYgKGNvbnRyb2xsZXIuX19vbkZpbmlzaENoYW5nZSkge1xyXG5cdCAgICAgICAgY29udHJvbGxlci5fX29uRmluaXNoQ2hhbmdlLmNhbGwoY29udHJvbGxlciwgY29udHJvbGxlci5nZXRWYWx1ZSgpKTtcclxuXHQgICAgICB9XHJcblx0ICAgIH0sIHRoaXMpO1xyXG5cdFxyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uIChmb2xkZXIpIHtcclxuXHQgICAgICBmb2xkZXIucmV2ZXJ0KGZvbGRlcik7XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBpZiAoIWd1aSkge1xyXG5cdCAgICAgIG1hcmtQcmVzZXRNb2RpZmllZCh0aGlzLmdldFJvb3QoKSwgZmFsc2UpO1xyXG5cdCAgICB9XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgbGlzdGVuOiBmdW5jdGlvbiBsaXN0ZW4oY29udHJvbGxlcikge1xyXG5cdCAgICB2YXIgaW5pdCA9IHRoaXMuX19saXN0ZW5pbmcubGVuZ3RoID09PSAwO1xyXG5cdCAgICB0aGlzLl9fbGlzdGVuaW5nLnB1c2goY29udHJvbGxlcik7XHJcblx0ICAgIGlmIChpbml0KSB7XHJcblx0ICAgICAgdXBkYXRlRGlzcGxheXModGhpcy5fX2xpc3RlbmluZyk7XHJcblx0ICAgIH1cclxuXHQgIH0sXHJcblx0XHJcblx0ICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmVhY2godGhpcy5fX2NvbnRyb2xsZXJzLCBmdW5jdGlvbiAoY29udHJvbGxlcikge1xyXG5cdCAgICAgIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSgpO1xyXG5cdCAgICB9KTtcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbiAoZm9sZGVyKSB7XHJcblx0ICAgICAgZm9sZGVyLnVwZGF0ZURpc3BsYXkoKTtcclxuXHQgICAgfSk7XHJcblx0ICB9XHJcblx0fSk7XHJcblx0XHJcblx0LyoqXHJcblx0ICogQWRkIGEgcm93IHRvIHRoZSBlbmQgb2YgdGhlIEdVSSBvciBiZWZvcmUgYW5vdGhlciByb3cuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZ3VpXHJcblx0ICogQHBhcmFtIFtuZXdEb21dIElmIHNwZWNpZmllZCwgaW5zZXJ0cyB0aGUgZG9tIGNvbnRlbnQgaW4gdGhlIG5ldyByb3dcclxuXHQgKiBAcGFyYW0gW2xpQmVmb3JlXSBJZiBzcGVjaWZpZWQsIHBsYWNlcyB0aGUgbmV3IHJvdyBiZWZvcmUgYW5vdGhlciByb3dcclxuXHQgKi9cclxuXHRmdW5jdGlvbiBhZGRSb3coZ3VpLCBuZXdEb20sIGxpQmVmb3JlKSB7XHJcblx0ICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdCAgaWYgKG5ld0RvbSkge1xyXG5cdCAgICBsaS5hcHBlbmRDaGlsZChuZXdEb20pO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgaWYgKGxpQmVmb3JlKSB7XHJcblx0ICAgIGd1aS5fX3VsLmluc2VydEJlZm9yZShsaSwgbGlCZWZvcmUpO1xyXG5cdCAgfSBlbHNlIHtcclxuXHQgICAgZ3VpLl9fdWwuYXBwZW5kQ2hpbGQobGkpO1xyXG5cdCAgfVxyXG5cdCAgZ3VpLm9uUmVzaXplKCk7XHJcblx0ICByZXR1cm4gbGk7XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIG1hcmtQcmVzZXRNb2RpZmllZChndWksIG1vZGlmaWVkKSB7XHJcblx0ICB2YXIgb3B0ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdFtndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXhdO1xyXG5cdFxyXG5cdCAgLy8gY29uc29sZS5sb2coJ21hcmsnLCBtb2RpZmllZCwgb3B0KTtcclxuXHQgIGlmIChtb2RpZmllZCkge1xyXG5cdCAgICBvcHQuaW5uZXJIVE1MID0gb3B0LnZhbHVlICsgJyonO1xyXG5cdCAgfSBlbHNlIHtcclxuXHQgICAgb3B0LmlubmVySFRNTCA9IG9wdC52YWx1ZTtcclxuXHQgIH1cclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gYXVnbWVudENvbnRyb2xsZXIoZ3VpLCBsaSwgY29udHJvbGxlcikge1xyXG5cdCAgY29udHJvbGxlci5fX2xpID0gbGk7XHJcblx0ICBjb250cm9sbGVyLl9fZ3VpID0gZ3VpO1xyXG5cdFxyXG5cdCAgX2NvbW1vbjIuZGVmYXVsdC5leHRlbmQoY29udHJvbGxlciwge1xyXG5cdCAgICBvcHRpb25zOiBmdW5jdGlvbiBvcHRpb25zKF9vcHRpb25zKSB7XHJcblx0ICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XHJcblx0ICAgICAgICB2YXIgbmV4dFNpYmxpbmcgPSBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG5cdCAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcclxuXHRcclxuXHQgICAgICAgIHJldHVybiBfYWRkKGd1aSwgY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksIHtcclxuXHQgICAgICAgICAgYmVmb3JlOiBuZXh0U2libGluZyxcclxuXHQgICAgICAgICAgZmFjdG9yeUFyZ3M6IFtfY29tbW9uMi5kZWZhdWx0LnRvQXJyYXkoYXJndW1lbnRzKV1cclxuXHQgICAgICAgIH0pO1xyXG5cdCAgICAgIH1cclxuXHRcclxuXHQgICAgICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc0FycmF5KF9vcHRpb25zKSB8fCBfY29tbW9uMi5kZWZhdWx0LmlzT2JqZWN0KF9vcHRpb25zKSkge1xyXG5cdCAgICAgICAgdmFyIF9uZXh0U2libGluZyA9IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcblx0ICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xyXG5cdFxyXG5cdCAgICAgICAgcmV0dXJuIF9hZGQoZ3VpLCBjb250cm9sbGVyLm9iamVjdCwgY29udHJvbGxlci5wcm9wZXJ0eSwge1xyXG5cdCAgICAgICAgICBiZWZvcmU6IF9uZXh0U2libGluZyxcclxuXHQgICAgICAgICAgZmFjdG9yeUFyZ3M6IFtfb3B0aW9uc11cclxuXHQgICAgICAgIH0pO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfSxcclxuXHRcclxuXHQgICAgbmFtZTogZnVuY3Rpb24gbmFtZSh2KSB7XHJcblx0ICAgICAgY29udHJvbGxlci5fX2xpLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmlubmVySFRNTCA9IHY7XHJcblx0ICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XHJcblx0ICAgIH0sXHJcblx0XHJcblx0ICAgIGxpc3RlbjogZnVuY3Rpb24gbGlzdGVuKCkge1xyXG5cdCAgICAgIGNvbnRyb2xsZXIuX19ndWkubGlzdGVuKGNvbnRyb2xsZXIpO1xyXG5cdCAgICAgIHJldHVybiBjb250cm9sbGVyO1xyXG5cdCAgICB9LFxyXG5cdFxyXG5cdCAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcclxuXHQgICAgICBjb250cm9sbGVyLl9fZ3VpLnJlbW92ZShjb250cm9sbGVyKTtcclxuXHQgICAgICByZXR1cm4gY29udHJvbGxlcjtcclxuXHQgICAgfVxyXG5cdCAgfSk7XHJcblx0XHJcblx0ICAvLyBBbGwgc2xpZGVycyBzaG91bGQgYmUgYWNjb21wYW5pZWQgYnkgYSBib3guXHJcblx0ICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIF9OdW1iZXJDb250cm9sbGVyU2xpZGVyMi5kZWZhdWx0KSB7XHJcblx0ICAgIHZhciBib3ggPSBuZXcgX051bWJlckNvbnRyb2xsZXJCb3gyLmRlZmF1bHQoY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksIHsgbWluOiBjb250cm9sbGVyLl9fbWluLCBtYXg6IGNvbnRyb2xsZXIuX19tYXgsIHN0ZXA6IGNvbnRyb2xsZXIuX19zdGVwIH0pO1xyXG5cdFxyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmVhY2goWyd1cGRhdGVEaXNwbGF5JywgJ29uQ2hhbmdlJywgJ29uRmluaXNoQ2hhbmdlJywgJ3N0ZXAnXSwgZnVuY3Rpb24gKG1ldGhvZCkge1xyXG5cdCAgICAgIHZhciBwYyA9IGNvbnRyb2xsZXJbbWV0aG9kXTtcclxuXHQgICAgICB2YXIgcGIgPSBib3hbbWV0aG9kXTtcclxuXHQgICAgICBjb250cm9sbGVyW21ldGhvZF0gPSBib3hbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuXHQgICAgICAgIHBiLmFwcGx5KGJveCwgYXJncyk7XHJcblx0ICAgICAgICByZXR1cm4gcGMuYXBwbHkoY29udHJvbGxlciwgYXJncyk7XHJcblx0ICAgICAgfTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MobGksICdoYXMtc2xpZGVyJyk7XHJcblx0ICAgIGNvbnRyb2xsZXIuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoYm94LmRvbUVsZW1lbnQsIGNvbnRyb2xsZXIuZG9tRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XHJcblx0ICB9IGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBfTnVtYmVyQ29udHJvbGxlckJveDIuZGVmYXVsdCkge1xyXG5cdCAgICB2YXIgciA9IGZ1bmN0aW9uIHIocmV0dXJuZWQpIHtcclxuXHQgICAgICAvLyBIYXZlIHdlIGRlZmluZWQgYm90aCBib3VuZGFyaWVzP1xyXG5cdCAgICAgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKGNvbnRyb2xsZXIuX19taW4pICYmIF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIoY29udHJvbGxlci5fX21heCkpIHtcclxuXHQgICAgICAgIC8vIFdlbGwsIHRoZW4gbGV0cyBqdXN0IHJlcGxhY2UgdGhpcyB3aXRoIGEgc2xpZGVyLlxyXG5cdFxyXG5cdCAgICAgICAgLy8gbGV0cyByZW1lbWJlciBpZiB0aGUgb2xkIGNvbnRyb2xsZXIgaGFkIGEgc3BlY2lmaWMgbmFtZSBvciB3YXMgbGlzdGVuaW5nXHJcblx0ICAgICAgICB2YXIgb2xkTmFtZSA9IGNvbnRyb2xsZXIuX19saS5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUw7XHJcblx0ICAgICAgICB2YXIgd2FzTGlzdGVuaW5nID0gY29udHJvbGxlci5fX2d1aS5fX2xpc3RlbmluZy5pbmRleE9mKGNvbnRyb2xsZXIpID4gLTE7XHJcblx0XHJcblx0ICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xyXG5cdCAgICAgICAgdmFyIG5ld0NvbnRyb2xsZXIgPSBfYWRkKGd1aSwgY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksIHtcclxuXHQgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxyXG5cdCAgICAgICAgICBmYWN0b3J5QXJnczogW2NvbnRyb2xsZXIuX19taW4sIGNvbnRyb2xsZXIuX19tYXgsIGNvbnRyb2xsZXIuX19zdGVwXVxyXG5cdCAgICAgICAgfSk7XHJcblx0XHJcblx0ICAgICAgICBuZXdDb250cm9sbGVyLm5hbWUob2xkTmFtZSk7XHJcblx0ICAgICAgICBpZiAod2FzTGlzdGVuaW5nKSBuZXdDb250cm9sbGVyLmxpc3RlbigpO1xyXG5cdFxyXG5cdCAgICAgICAgcmV0dXJuIG5ld0NvbnRyb2xsZXI7XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIHJldHVybiByZXR1cm5lZDtcclxuXHQgICAgfTtcclxuXHRcclxuXHQgICAgY29udHJvbGxlci5taW4gPSBfY29tbW9uMi5kZWZhdWx0LmNvbXBvc2UociwgY29udHJvbGxlci5taW4pO1xyXG5cdCAgICBjb250cm9sbGVyLm1heCA9IF9jb21tb24yLmRlZmF1bHQuY29tcG9zZShyLCBjb250cm9sbGVyLm1heCk7XHJcblx0ICB9IGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBfQm9vbGVhbkNvbnRyb2xsZXIyLmRlZmF1bHQpIHtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5mYWtlRXZlbnQoY29udHJvbGxlci5fX2NoZWNrYm94LCAnY2xpY2snKTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChjb250cm9sbGVyLl9fY2hlY2tib3gsICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0ICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudHMgZG91YmxlLXRvZ2dsZVxyXG5cdCAgICB9KTtcclxuXHQgIH0gZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIF9GdW5jdGlvbkNvbnRyb2xsZXIyLmRlZmF1bHQpIHtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5mYWtlRXZlbnQoY29udHJvbGxlci5fX2J1dHRvbiwgJ2NsaWNrJyk7XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQobGksICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChsaSwgJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQucmVtb3ZlQ2xhc3MoY29udHJvbGxlci5fX2J1dHRvbiwgJ2hvdmVyJyk7XHJcblx0ICAgIH0pO1xyXG5cdCAgfSBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgX0NvbG9yQ29udHJvbGxlcjIuZGVmYXVsdCkge1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGxpLCAnY29sb3InKTtcclxuXHQgICAgY29udHJvbGxlci51cGRhdGVEaXNwbGF5ID0gX2NvbW1vbjIuZGVmYXVsdC5jb21wb3NlKGZ1bmN0aW9uICh2YWwpIHtcclxuXHQgICAgICBsaS5zdHlsZS5ib3JkZXJMZWZ0Q29sb3IgPSBjb250cm9sbGVyLl9fY29sb3IudG9TdHJpbmcoKTtcclxuXHQgICAgICByZXR1cm4gdmFsO1xyXG5cdCAgICB9LCBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkpO1xyXG5cdFxyXG5cdCAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkoKTtcclxuXHQgIH1cclxuXHRcclxuXHQgIGNvbnRyb2xsZXIuc2V0VmFsdWUgPSBfY29tbW9uMi5kZWZhdWx0LmNvbXBvc2UoZnVuY3Rpb24gKHZhbCkge1xyXG5cdCAgICBpZiAoZ3VpLmdldFJvb3QoKS5fX3ByZXNldF9zZWxlY3QgJiYgY29udHJvbGxlci5pc01vZGlmaWVkKCkpIHtcclxuXHQgICAgICBtYXJrUHJlc2V0TW9kaWZpZWQoZ3VpLmdldFJvb3QoKSwgdHJ1ZSk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgcmV0dXJuIHZhbDtcclxuXHQgIH0sIGNvbnRyb2xsZXIuc2V0VmFsdWUpO1xyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiByZWNhbGxTYXZlZFZhbHVlKGd1aSwgY29udHJvbGxlcikge1xyXG5cdCAgLy8gRmluZCB0aGUgdG9wbW9zdCBHVUksIHRoYXQncyB3aGVyZSByZW1lbWJlcmVkIG9iamVjdHMgbGl2ZS5cclxuXHQgIHZhciByb290ID0gZ3VpLmdldFJvb3QoKTtcclxuXHRcclxuXHQgIC8vIERvZXMgdGhlIG9iamVjdCB3ZSdyZSBjb250cm9sbGluZyBtYXRjaCBhbnl0aGluZyB3ZSd2ZSBiZWVuIHRvbGQgdG9cclxuXHQgIC8vIHJlbWVtYmVyP1xyXG5cdCAgdmFyIG1hdGNoZWRJbmRleCA9IHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0cy5pbmRleE9mKGNvbnRyb2xsZXIub2JqZWN0KTtcclxuXHRcclxuXHQgIC8vIFdoeSB5ZXMsIGl0IGRvZXMhXHJcblx0ICBpZiAobWF0Y2hlZEluZGV4ICE9PSAtMSkge1xyXG5cdCAgICAvLyBMZXQgbWUgZmV0Y2ggYSBtYXAgb2YgY29udHJvbGxlcnMgZm9yIHRoY29tbW9uLmlzT2JqZWN0LlxyXG5cdCAgICB2YXIgY29udHJvbGxlck1hcCA9IHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbbWF0Y2hlZEluZGV4XTtcclxuXHRcclxuXHQgICAgLy8gT2hwLCBJIGJlbGlldmUgdGhpcyBpcyB0aGUgZmlyc3QgY29udHJvbGxlciB3ZSd2ZSBjcmVhdGVkIGZvciB0aGlzXHJcblx0ICAgIC8vIG9iamVjdC4gTGV0cyBtYWtlIHRoZSBtYXAgZnJlc2guXHJcblx0ICAgIGlmIChjb250cm9sbGVyTWFwID09PSB1bmRlZmluZWQpIHtcclxuXHQgICAgICBjb250cm9sbGVyTWFwID0ge307XHJcblx0ICAgICAgcm9vdC5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVyc1ttYXRjaGVkSW5kZXhdID0gY29udHJvbGxlck1hcDtcclxuXHQgICAgfVxyXG5cdFxyXG5cdCAgICAvLyBLZWVwIHRyYWNrIG9mIHRoaXMgY29udHJvbGxlclxyXG5cdCAgICBjb250cm9sbGVyTWFwW2NvbnRyb2xsZXIucHJvcGVydHldID0gY29udHJvbGxlcjtcclxuXHRcclxuXHQgICAgLy8gT2theSwgbm93IGhhdmUgd2Ugc2F2ZWQgYW55IHZhbHVlcyBmb3IgdGhpcyBjb250cm9sbGVyP1xyXG5cdCAgICBpZiAocm9vdC5sb2FkICYmIHJvb3QubG9hZC5yZW1lbWJlcmVkKSB7XHJcblx0ICAgICAgdmFyIHByZXNldE1hcCA9IHJvb3QubG9hZC5yZW1lbWJlcmVkO1xyXG5cdFxyXG5cdCAgICAgIC8vIFdoaWNoIHByZXNldCBhcmUgd2UgdHJ5aW5nIHRvIGxvYWQ/XHJcblx0ICAgICAgdmFyIHByZXNldCA9IHZvaWQgMDtcclxuXHRcclxuXHQgICAgICBpZiAocHJlc2V0TWFwW2d1aS5wcmVzZXRdKSB7XHJcblx0ICAgICAgICBwcmVzZXQgPSBwcmVzZXRNYXBbZ3VpLnByZXNldF07XHJcblx0ICAgICAgfSBlbHNlIGlmIChwcmVzZXRNYXBbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXSkge1xyXG5cdCAgICAgICAgLy8gVWhoLCB5b3UgY2FuIGhhdmUgdGhlIGRlZmF1bHQgaW5zdGVhZD9cclxuXHQgICAgICAgIHByZXNldCA9IHByZXNldE1hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdO1xyXG5cdCAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICAvLyBOYWRhLlxyXG5cdCAgICAgICAgcmV0dXJuO1xyXG5cdCAgICAgIH1cclxuXHRcclxuXHQgICAgICAvLyBEaWQgdGhlIGxvYWRlZCBvYmplY3QgcmVtZW1iZXIgdGhjb21tb24uaXNPYmplY3Q/ICYmICBEaWQgd2UgcmVtZW1iZXIgdGhpcyBwYXJ0aWN1bGFyIHByb3BlcnR5P1xyXG5cdCAgICAgIGlmIChwcmVzZXRbbWF0Y2hlZEluZGV4XSAmJiBwcmVzZXRbbWF0Y2hlZEluZGV4XVtjb250cm9sbGVyLnByb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0ICAgICAgICAvLyBXZSBkaWQgcmVtZW1iZXIgc29tZXRoaW5nIGZvciB0aGlzIGd1eSAuLi5cclxuXHQgICAgICAgIHZhciB2YWx1ZSA9IHByZXNldFttYXRjaGVkSW5kZXhdW2NvbnRyb2xsZXIucHJvcGVydHldO1xyXG5cdFxyXG5cdCAgICAgICAgLy8gQW5kIHRoYXQncyB3aGF0IGl0IGlzLlxyXG5cdCAgICAgICAgY29udHJvbGxlci5pbml0aWFsVmFsdWUgPSB2YWx1ZTtcclxuXHQgICAgICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUodmFsdWUpO1xyXG5cdCAgICAgIH1cclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBfYWRkKGd1aSwgb2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XHJcblx0ICBpZiAob2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0ICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0IFwiJyArIG9iamVjdCArICdcIiBoYXMgbm8gcHJvcGVydHkgXCInICsgcHJvcGVydHkgKyAnXCInKTtcclxuXHQgIH1cclxuXHRcclxuXHQgIHZhciBjb250cm9sbGVyID0gdm9pZCAwO1xyXG5cdFxyXG5cdCAgaWYgKHBhcmFtcy5jb2xvcikge1xyXG5cdCAgICBjb250cm9sbGVyID0gbmV3IF9Db2xvckNvbnRyb2xsZXIyLmRlZmF1bHQob2JqZWN0LCBwcm9wZXJ0eSk7XHJcblx0ICB9IGVsc2Uge1xyXG5cdCAgICB2YXIgZmFjdG9yeUFyZ3MgPSBbb2JqZWN0LCBwcm9wZXJ0eV0uY29uY2F0KHBhcmFtcy5mYWN0b3J5QXJncyk7XHJcblx0ICAgIGNvbnRyb2xsZXIgPSBfQ29udHJvbGxlckZhY3RvcnkyLmRlZmF1bHQuYXBwbHkoZ3VpLCBmYWN0b3J5QXJncyk7XHJcblx0ICB9XHJcblx0XHJcblx0ICBpZiAocGFyYW1zLmJlZm9yZSBpbnN0YW5jZW9mIF9Db250cm9sbGVyMi5kZWZhdWx0KSB7XHJcblx0ICAgIHBhcmFtcy5iZWZvcmUgPSBwYXJhbXMuYmVmb3JlLl9fbGk7XHJcblx0ICB9XHJcblx0XHJcblx0ICByZWNhbGxTYXZlZFZhbHVlKGd1aSwgY29udHJvbGxlcik7XHJcblx0XHJcblx0ICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGNvbnRyb2xsZXIuZG9tRWxlbWVudCwgJ2MnKTtcclxuXHRcclxuXHQgIHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdCAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhuYW1lLCAncHJvcGVydHktbmFtZScpO1xyXG5cdCAgbmFtZS5pbm5lckhUTUwgPSBjb250cm9sbGVyLnByb3BlcnR5O1xyXG5cdFxyXG5cdCAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdCAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWUpO1xyXG5cdCAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xsZXIuZG9tRWxlbWVudCk7XHJcblx0XHJcblx0ICB2YXIgbGkgPSBhZGRSb3coZ3VpLCBjb250YWluZXIsIHBhcmFtcy5iZWZvcmUpO1xyXG5cdFxyXG5cdCAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhsaSwgR1VJLkNMQVNTX0NPTlRST0xMRVJfUk9XKTtcclxuXHQgIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgX0NvbG9yQ29udHJvbGxlcjIuZGVmYXVsdCkge1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGxpLCAnY29sb3InKTtcclxuXHQgIH0gZWxzZSB7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MobGksIF90eXBlb2YoY29udHJvbGxlci5nZXRWYWx1ZSgpKSk7XHJcblx0ICB9XHJcblx0XHJcblx0ICBhdWdtZW50Q29udHJvbGxlcihndWksIGxpLCBjb250cm9sbGVyKTtcclxuXHRcclxuXHQgIGd1aS5fX2NvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcik7XHJcblx0XHJcblx0ICByZXR1cm4gY29udHJvbGxlcjtcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlSGFzaChndWksIGtleSkge1xyXG5cdCAgLy8gVE9ETyBob3cgZG9lcyB0aGlzIGRlYWwgd2l0aCBtdWx0aXBsZSBHVUkncz9cclxuXHQgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmICsgJy4nICsga2V5O1xyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBhZGRQcmVzZXRPcHRpb24oZ3VpLCBuYW1lLCBzZXRTZWxlY3RlZCkge1xyXG5cdCAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG5cdCAgb3B0LmlubmVySFRNTCA9IG5hbWU7XHJcblx0ICBvcHQudmFsdWUgPSBuYW1lO1xyXG5cdCAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5hcHBlbmRDaGlsZChvcHQpO1xyXG5cdCAgaWYgKHNldFNlbGVjdGVkKSB7XHJcblx0ICAgIGd1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoIC0gMTtcclxuXHQgIH1cclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gc2hvd0hpZGVFeHBsYWluKGd1aSwgZXhwbGFpbikge1xyXG5cdCAgZXhwbGFpbi5zdHlsZS5kaXNwbGF5ID0gZ3VpLnVzZUxvY2FsU3RvcmFnZSA/ICdibG9jaycgOiAnbm9uZSc7XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIGFkZFNhdmVNZW51KGd1aSkge1xyXG5cdCAgdmFyIGRpdiA9IGd1aS5fX3NhdmVfcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcclxuXHQgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoZ3VpLmRvbUVsZW1lbnQsICdoYXMtc2F2ZScpO1xyXG5cdFxyXG5cdCAgZ3VpLl9fdWwuaW5zZXJ0QmVmb3JlKGRpdiwgZ3VpLl9fdWwuZmlyc3RDaGlsZCk7XHJcblx0XHJcblx0ICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGRpdiwgJ3NhdmUtcm93Jyk7XHJcblx0XHJcblx0ICB2YXIgZ2VhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0ICBnZWFycy5pbm5lckhUTUwgPSAnJm5ic3A7JztcclxuXHQgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoZ2VhcnMsICdidXR0b24gZ2VhcnMnKTtcclxuXHRcclxuXHQgIC8vIFRPRE8gcmVwbGFjZSB3aXRoIEZ1bmN0aW9uQ29udHJvbGxlclxyXG5cdCAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHQgIGJ1dHRvbi5pbm5lckhUTUwgPSAnU2F2ZSc7XHJcblx0ICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGJ1dHRvbiwgJ2J1dHRvbicpO1xyXG5cdCAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhidXR0b24sICdzYXZlJyk7XHJcblx0XHJcblx0ICB2YXIgYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHQgIGJ1dHRvbjIuaW5uZXJIVE1MID0gJ05ldyc7XHJcblx0ICBfZG9tMi5kZWZhdWx0LmFkZENsYXNzKGJ1dHRvbjIsICdidXR0b24nKTtcclxuXHQgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoYnV0dG9uMiwgJ3NhdmUtYXMnKTtcclxuXHRcclxuXHQgIHZhciBidXR0b24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdCAgYnV0dG9uMy5pbm5lckhUTUwgPSAnUmV2ZXJ0JztcclxuXHQgIF9kb20yLmRlZmF1bHQuYWRkQ2xhc3MoYnV0dG9uMywgJ2J1dHRvbicpO1xyXG5cdCAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhidXR0b24zLCAncmV2ZXJ0Jyk7XHJcblx0XHJcblx0ICB2YXIgc2VsZWN0ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xyXG5cdFxyXG5cdCAgaWYgKGd1aS5sb2FkICYmIGd1aS5sb2FkLnJlbWVtYmVyZWQpIHtcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5lYWNoKGd1aS5sb2FkLnJlbWVtYmVyZWQsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcblx0ICAgICAgYWRkUHJlc2V0T3B0aW9uKGd1aSwga2V5LCBrZXkgPT09IGd1aS5wcmVzZXQpO1xyXG5cdCAgICB9KTtcclxuXHQgIH0gZWxzZSB7XHJcblx0ICAgIGFkZFByZXNldE9wdGlvbihndWksIERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSwgZmFsc2UpO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgX2RvbTIuZGVmYXVsdC5iaW5kKHNlbGVjdCwgJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcblx0ICAgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0uaW5uZXJIVE1MID0gZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWU7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgZ3VpLnByZXNldCA9IHRoaXMudmFsdWU7XHJcblx0ICB9KTtcclxuXHRcclxuXHQgIGRpdi5hcHBlbmRDaGlsZChzZWxlY3QpO1xyXG5cdCAgZGl2LmFwcGVuZENoaWxkKGdlYXJzKTtcclxuXHQgIGRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cdCAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjIpO1xyXG5cdCAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjMpO1xyXG5cdFxyXG5cdCAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcclxuXHQgICAgdmFyIGV4cGxhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbG9jYWwtZXhwbGFpbicpO1xyXG5cdCAgICB2YXIgbG9jYWxTdG9yYWdlQ2hlY2tCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbG9jYWwtc3RvcmFnZScpO1xyXG5cdCAgICB2YXIgc2F2ZUxvY2FsbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctc2F2ZS1sb2NhbGx5Jyk7XHJcblx0XHJcblx0ICAgIHNhdmVMb2NhbGx5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cdFxyXG5cdCAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChndWksICdpc0xvY2FsJykpID09PSAndHJ1ZScpIHtcclxuXHQgICAgICBsb2NhbFN0b3JhZ2VDaGVja0JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIHNob3dIaWRlRXhwbGFpbihndWksIGV4cGxhaW4pO1xyXG5cdFxyXG5cdCAgICAvLyBUT0RPOiBVc2UgYSBib29sZWFuIGNvbnRyb2xsZXIsIGZvb2whXHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZChsb2NhbFN0b3JhZ2VDaGVja0JveCwgJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICBndWkudXNlTG9jYWxTdG9yYWdlID0gIWd1aS51c2VMb2NhbFN0b3JhZ2U7XHJcblx0ICAgICAgc2hvd0hpZGVFeHBsYWluKGd1aSwgZXhwbGFpbik7XHJcblx0ICAgIH0pO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgdmFyIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbmV3LWNvbnN0cnVjdG9yJyk7XHJcblx0XHJcblx0ICBfZG9tMi5kZWZhdWx0LmJpbmQobmV3Q29uc3RydWN0b3JUZXh0QXJlYSwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdCAgICBpZiAoZS5tZXRhS2V5ICYmIChlLndoaWNoID09PSA2NyB8fCBlLmtleUNvZGUgPT09IDY3KSkge1xyXG5cdCAgICAgIFNBVkVfRElBTE9HVUUuaGlkZSgpO1xyXG5cdCAgICB9XHJcblx0ICB9KTtcclxuXHRcclxuXHQgIF9kb20yLmRlZmF1bHQuYmluZChnZWFycywgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdCAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGd1aS5nZXRTYXZlT2JqZWN0KCksIHVuZGVmaW5lZCwgMik7XHJcblx0ICAgIFNBVkVfRElBTE9HVUUuc2hvdygpO1xyXG5cdCAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLmZvY3VzKCk7XHJcblx0ICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuc2VsZWN0KCk7XHJcblx0ICB9KTtcclxuXHRcclxuXHQgIF9kb20yLmRlZmF1bHQuYmluZChidXR0b24sICdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgZ3VpLnNhdmUoKTtcclxuXHQgIH0pO1xyXG5cdFxyXG5cdCAgX2RvbTIuZGVmYXVsdC5iaW5kKGJ1dHRvbjIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgdmFyIHByZXNldE5hbWUgPSBwcm9tcHQoJ0VudGVyIGEgbmV3IHByZXNldCBuYW1lLicpO1xyXG5cdCAgICBpZiAocHJlc2V0TmFtZSkge1xyXG5cdCAgICAgIGd1aS5zYXZlQXMocHJlc2V0TmFtZSk7XHJcblx0ICAgIH1cclxuXHQgIH0pO1xyXG5cdFxyXG5cdCAgX2RvbTIuZGVmYXVsdC5iaW5kKGJ1dHRvbjMsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgZ3VpLnJldmVydCgpO1xyXG5cdCAgfSk7XHJcblx0XHJcblx0ICAvLyBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uMik7XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIGFkZFJlc2l6ZUhhbmRsZShndWkpIHtcclxuXHQgIHZhciBwbW91c2VYID0gdm9pZCAwO1xyXG5cdFxyXG5cdCAgZ3VpLl9fcmVzaXplX2hhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFxyXG5cdCAgX2NvbW1vbjIuZGVmYXVsdC5leHRlbmQoZ3VpLl9fcmVzaXplX2hhbmRsZS5zdHlsZSwge1xyXG5cdFxyXG5cdCAgICB3aWR0aDogJzZweCcsXHJcblx0ICAgIG1hcmdpbkxlZnQ6ICctM3B4JyxcclxuXHQgICAgaGVpZ2h0OiAnMjAwcHgnLFxyXG5cdCAgICBjdXJzb3I6ICdldy1yZXNpemUnLFxyXG5cdCAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xyXG5cdCAgICAvLyBib3JkZXI6ICcxcHggc29saWQgYmx1ZSdcclxuXHRcclxuXHQgIH0pO1xyXG5cdFxyXG5cdCAgZnVuY3Rpb24gZHJhZyhlKSB7XHJcblx0ICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcclxuXHQgICAgZ3VpLndpZHRoICs9IHBtb3VzZVggLSBlLmNsaWVudFg7XHJcblx0ICAgIGd1aS5vblJlc2l6ZSgpO1xyXG5cdCAgICBwbW91c2VYID0gZS5jbGllbnRYO1xyXG5cdFxyXG5cdCAgICByZXR1cm4gZmFsc2U7XHJcblx0ICB9XHJcblx0XHJcblx0ICBmdW5jdGlvbiBkcmFnU3RvcCgpIHtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBkcmFnKTtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIGRyYWdTdG9wKTtcclxuXHQgIH1cclxuXHRcclxuXHQgIGZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XHJcblx0ICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcclxuXHQgICAgcG1vdXNlWCA9IGUuY2xpZW50WDtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5hZGRDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XHJcblx0ICAgIF9kb20yLmRlZmF1bHQuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZHJhZ1N0b3ApO1xyXG5cdFxyXG5cdCAgICByZXR1cm4gZmFsc2U7XHJcblx0ICB9XHJcblx0XHJcblx0ICBfZG9tMi5kZWZhdWx0LmJpbmQoZ3VpLl9fcmVzaXplX2hhbmRsZSwgJ21vdXNlZG93bicsIGRyYWdTdGFydCk7XHJcblx0ICBfZG9tMi5kZWZhdWx0LmJpbmQoZ3VpLl9fY2xvc2VCdXR0b24sICdtb3VzZWRvd24nLCBkcmFnU3RhcnQpO1xyXG5cdFxyXG5cdCAgZ3VpLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGd1aS5fX3Jlc2l6ZV9oYW5kbGUsIGd1aS5kb21FbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gc2V0V2lkdGgoZ3VpLCB3KSB7XHJcblx0ICBndWkuZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xyXG5cdCAgLy8gQXV0byBwbGFjZWQgc2F2ZS1yb3dzIGFyZSBwb3NpdGlvbiBmaXhlZCwgc28gd2UgaGF2ZSB0b1xyXG5cdCAgLy8gc2V0IHRoZSB3aWR0aCBtYW51YWxseSBpZiB3ZSB3YW50IGl0IHRvIGJsZWVkIHRvIHRoZSBlZGdlXHJcblx0ICBpZiAoZ3VpLl9fc2F2ZV9yb3cgJiYgZ3VpLmF1dG9QbGFjZSkge1xyXG5cdCAgICBndWkuX19zYXZlX3Jvdy5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xyXG5cdCAgfVxyXG5cdCAgaWYgKGd1aS5fX2Nsb3NlQnV0dG9uKSB7XHJcblx0ICAgIGd1aS5fX2Nsb3NlQnV0dG9uLnN0eWxlLndpZHRoID0gdyArICdweCc7XHJcblx0ICB9XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIGdldEN1cnJlbnRQcmVzZXQoZ3VpLCB1c2VJbml0aWFsVmFsdWVzKSB7XHJcblx0ICB2YXIgdG9SZXR1cm4gPSB7fTtcclxuXHRcclxuXHQgIC8vIEZvciBlYWNoIG9iamVjdCBJJ20gcmVtZW1iZXJpbmdcclxuXHQgIF9jb21tb24yLmRlZmF1bHQuZWFjaChndWkuX19yZW1lbWJlcmVkT2JqZWN0cywgZnVuY3Rpb24gKHZhbCwgaW5kZXgpIHtcclxuXHQgICAgdmFyIHNhdmVkVmFsdWVzID0ge307XHJcblx0XHJcblx0ICAgIC8vIFRoZSBjb250cm9sbGVycyBJJ3ZlIG1hZGUgZm9yIHRoY29tbW9uLmlzT2JqZWN0IGJ5IHByb3BlcnR5XHJcblx0ICAgIHZhciBjb250cm9sbGVyTWFwID0gZ3VpLl9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW2luZGV4XTtcclxuXHRcclxuXHQgICAgLy8gUmVtZW1iZXIgZWFjaCB2YWx1ZSBmb3IgZWFjaCBwcm9wZXJ0eVxyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmVhY2goY29udHJvbGxlck1hcCwgZnVuY3Rpb24gKGNvbnRyb2xsZXIsIHByb3BlcnR5KSB7XHJcblx0ICAgICAgc2F2ZWRWYWx1ZXNbcHJvcGVydHldID0gdXNlSW5pdGlhbFZhbHVlcyA/IGNvbnRyb2xsZXIuaW5pdGlhbFZhbHVlIDogY29udHJvbGxlci5nZXRWYWx1ZSgpO1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgLy8gU2F2ZSB0aGUgdmFsdWVzIGZvciB0aGNvbW1vbi5pc09iamVjdFxyXG5cdCAgICB0b1JldHVybltpbmRleF0gPSBzYXZlZFZhbHVlcztcclxuXHQgIH0pO1xyXG5cdFxyXG5cdCAgcmV0dXJuIHRvUmV0dXJuO1xyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBzZXRQcmVzZXRTZWxlY3RJbmRleChndWkpIHtcclxuXHQgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG5cdCAgICBpZiAoZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWUgPT09IGd1aS5wcmVzZXQpIHtcclxuXHQgICAgICBndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiB1cGRhdGVEaXNwbGF5cyhjb250cm9sbGVyQXJyYXkpIHtcclxuXHQgIGlmIChjb250cm9sbGVyQXJyYXkubGVuZ3RoICE9PSAwKSB7XHJcblx0ICAgIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUyLmRlZmF1bHQuY2FsbCh3aW5kb3csIGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICB1cGRhdGVEaXNwbGF5cyhjb250cm9sbGVyQXJyYXkpO1xyXG5cdCAgICB9KTtcclxuXHQgIH1cclxuXHRcclxuXHQgIF9jb21tb24yLmRlZmF1bHQuZWFjaChjb250cm9sbGVyQXJyYXksIGZ1bmN0aW9uIChjKSB7XHJcblx0ICAgIGMudXBkYXRlRGlzcGxheSgpO1xyXG5cdCAgfSk7XHJcblx0fVxyXG5cdFxyXG5cdGV4cG9ydHMuZGVmYXVsdCA9IEdVSTtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDE4ICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblx0XHJcblx0LyoqXHJcblx0ICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICpcclxuXHQgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAqXHJcblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICpcclxuXHQgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgKi9cclxuXHRcclxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHQgIGxvYWQ6IGZ1bmN0aW9uIGxvYWQodXJsLCBpbmRvYykge1xyXG5cdCAgICB2YXIgZG9jID0gaW5kb2MgfHwgZG9jdW1lbnQ7XHJcblx0ICAgIHZhciBsaW5rID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuXHQgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcclxuXHQgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XHJcblx0ICAgIGxpbmsuaHJlZiA9IHVybDtcclxuXHQgICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0ICB9LFxyXG5cdFxyXG5cdCAgaW5qZWN0OiBmdW5jdGlvbiBpbmplY3QoY3NzLCBpbmRvYykge1xyXG5cdCAgICB2YXIgZG9jID0gaW5kb2MgfHwgZG9jdW1lbnQ7XHJcblx0ICAgIHZhciBpbmplY3RlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblx0ICAgIGluamVjdGVkLnR5cGUgPSAndGV4dC9jc3MnO1xyXG5cdCAgICBpbmplY3RlZC5pbm5lckhUTUwgPSBjc3M7XHJcblx0ICAgIHZhciBoZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0ICAgIHRyeSB7XHJcblx0ICAgICAgaGVhZC5hcHBlbmRDaGlsZChpbmplY3RlZCk7XHJcblx0ICAgIH0gY2F0Y2ggKGUpIHsvLyBVbmFibGUgdG8gaW5qZWN0IENTUywgcHJvYmFibHkgYmVjYXVzZSBvZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5XHJcblx0ICAgIH1cclxuXHQgIH1cclxuXHR9O1xyXG5cclxuLyoqKi8gfSxcclxuLyogMTkgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XHJcblxyXG5cdG1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJkZy1zYXZlXFxcIiBjbGFzcz1cXFwiZGcgZGlhbG9ndWVcXFwiPlxcblxcbiAgSGVyZSdzIHRoZSBuZXcgbG9hZCBwYXJhbWV0ZXIgZm9yIHlvdXIgPGNvZGU+R1VJPC9jb2RlPidzIGNvbnN0cnVjdG9yOlxcblxcbiAgPHRleHRhcmVhIGlkPVxcXCJkZy1uZXctY29uc3RydWN0b3JcXFwiPjwvdGV4dGFyZWE+XFxuXFxuICA8ZGl2IGlkPVxcXCJkZy1zYXZlLWxvY2FsbHlcXFwiPlxcblxcbiAgICA8aW5wdXQgaWQ9XFxcImRnLWxvY2FsLXN0b3JhZ2VcXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIi8+IEF1dG9tYXRpY2FsbHkgc2F2ZVxcbiAgICB2YWx1ZXMgdG8gPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiBvbiBleGl0LlxcblxcbiAgICA8ZGl2IGlkPVxcXCJkZy1sb2NhbC1leHBsYWluXFxcIj5UaGUgdmFsdWVzIHNhdmVkIHRvIDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gd2lsbFxcbiAgICAgIG92ZXJyaWRlIHRob3NlIHBhc3NlZCB0byA8Y29kZT5kYXQuR1VJPC9jb2RlPidzIGNvbnN0cnVjdG9yLiBUaGlzIG1ha2VzIGl0XFxuICAgICAgZWFzaWVyIHRvIHdvcmsgaW5jcmVtZW50YWxseSwgYnV0IDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gaXMgZnJhZ2lsZSxcXG4gICAgICBhbmQgeW91ciBmcmllbmRzIG1heSBub3Qgc2VlIHRoZSBzYW1lIHZhbHVlcyB5b3UgZG8uXFxuXFxuICAgIDwvZGl2PlxcblxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XCI7XHJcblxyXG4vKioqLyB9LFxyXG4vKiAyMCAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0dmFyIF9PcHRpb25Db250cm9sbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XHJcblx0XHJcblx0dmFyIF9PcHRpb25Db250cm9sbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX09wdGlvbkNvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlckJveCA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xyXG5cdFxyXG5cdHZhciBfTnVtYmVyQ29udHJvbGxlckJveDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OdW1iZXJDb250cm9sbGVyQm94KTtcclxuXHRcclxuXHR2YXIgX051bWJlckNvbnRyb2xsZXJTbGlkZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcclxuXHRcclxuXHR2YXIgX051bWJlckNvbnRyb2xsZXJTbGlkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTnVtYmVyQ29udHJvbGxlclNsaWRlcik7XHJcblx0XHJcblx0dmFyIF9TdHJpbmdDb250cm9sbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XHJcblx0XHJcblx0dmFyIF9TdHJpbmdDb250cm9sbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0cmluZ0NvbnRyb2xsZXIpO1xyXG5cdFxyXG5cdHZhciBfRnVuY3Rpb25Db250cm9sbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XHJcblx0XHJcblx0dmFyIF9GdW5jdGlvbkNvbnRyb2xsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRnVuY3Rpb25Db250cm9sbGVyKTtcclxuXHRcclxuXHR2YXIgX0Jvb2xlYW5Db250cm9sbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcclxuXHRcclxuXHR2YXIgX0Jvb2xlYW5Db250cm9sbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Jvb2xlYW5Db250cm9sbGVyKTtcclxuXHRcclxuXHR2YXIgX2NvbW1vbiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tbW9uKTtcclxuXHRcclxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxyXG5cdFxyXG5cdHZhciBDb250cm9sbGVyRmFjdG9yeSA9IGZ1bmN0aW9uIENvbnRyb2xsZXJGYWN0b3J5KG9iamVjdCwgcHJvcGVydHkpIHtcclxuXHQgIHZhciBpbml0aWFsVmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xyXG5cdFxyXG5cdCAgLy8gUHJvdmlkaW5nIG9wdGlvbnM/XHJcblx0ICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc0FycmF5KGFyZ3VtZW50c1syXSkgfHwgX2NvbW1vbjIuZGVmYXVsdC5pc09iamVjdChhcmd1bWVudHNbMl0pKSB7XHJcblx0ICAgIHJldHVybiBuZXcgX09wdGlvbkNvbnRyb2xsZXIyLmRlZmF1bHQob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdKTtcclxuXHQgIH1cclxuXHRcclxuXHQgIC8vIFByb3ZpZGluZyBhIG1hcD9cclxuXHQgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKGluaXRpYWxWYWx1ZSkpIHtcclxuXHQgICAgLy8gSGFzIG1pbiBhbmQgbWF4PyAoc2xpZGVyKVxyXG5cdCAgICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc051bWJlcihhcmd1bWVudHNbMl0pICYmIF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIoYXJndW1lbnRzWzNdKSkge1xyXG5cdCAgICAgIC8vIGhhcyBzdGVwP1xyXG5cdCAgICAgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzTnVtYmVyKGFyZ3VtZW50c1s0XSkpIHtcclxuXHQgICAgICAgIHJldHVybiBuZXcgX051bWJlckNvbnRyb2xsZXJTbGlkZXIyLmRlZmF1bHQob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10sIGFyZ3VtZW50c1s0XSk7XHJcblx0ICAgICAgfVxyXG5cdFxyXG5cdCAgICAgIHJldHVybiBuZXcgX051bWJlckNvbnRyb2xsZXJTbGlkZXIyLmRlZmF1bHQob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgIC8vIG51bWJlciBib3hcclxuXHQgICAgaWYgKF9jb21tb24yLmRlZmF1bHQuaXNOdW1iZXIoYXJndW1lbnRzWzRdKSkge1xyXG5cdCAgICAgIC8vIGhhcyBzdGVwXHJcblx0ICAgICAgcmV0dXJuIG5ldyBfTnVtYmVyQ29udHJvbGxlckJveDIuZGVmYXVsdChvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogYXJndW1lbnRzWzJdLCBtYXg6IGFyZ3VtZW50c1szXSwgc3RlcDogYXJndW1lbnRzWzRdIH0pO1xyXG5cdCAgICB9XHJcblx0ICAgIHJldHVybiBuZXcgX051bWJlckNvbnRyb2xsZXJCb3gyLmRlZmF1bHQob2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IGFyZ3VtZW50c1syXSwgbWF4OiBhcmd1bWVudHNbM10gfSk7XHJcblx0ICB9XHJcblx0XHJcblx0ICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc1N0cmluZyhpbml0aWFsVmFsdWUpKSB7XHJcblx0ICAgIHJldHVybiBuZXcgX1N0cmluZ0NvbnRyb2xsZXIyLmRlZmF1bHQob2JqZWN0LCBwcm9wZXJ0eSk7XHJcblx0ICB9XHJcblx0XHJcblx0ICBpZiAoX2NvbW1vbjIuZGVmYXVsdC5pc0Z1bmN0aW9uKGluaXRpYWxWYWx1ZSkpIHtcclxuXHQgICAgcmV0dXJuIG5ldyBfRnVuY3Rpb25Db250cm9sbGVyMi5kZWZhdWx0KG9iamVjdCwgcHJvcGVydHksICcnKTtcclxuXHQgIH1cclxuXHRcclxuXHQgIGlmIChfY29tbW9uMi5kZWZhdWx0LmlzQm9vbGVhbihpbml0aWFsVmFsdWUpKSB7XHJcblx0ICAgIHJldHVybiBuZXcgX0Jvb2xlYW5Db250cm9sbGVyMi5kZWZhdWx0KG9iamVjdCwgcHJvcGVydHkpO1xyXG5cdCAgfVxyXG5cdFxyXG5cdCAgcmV0dXJuIG51bGw7XHJcblx0fTsgLyoqXHJcblx0ICAgICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAgICAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXHJcblx0ICAgICpcclxuXHQgICAgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAgICAqXHJcblx0ICAgICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuXHQgICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICAgICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblx0ICAgICpcclxuXHQgICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgICAgKi9cclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSBDb250cm9sbGVyRmFjdG9yeTtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcclxuXHJcbi8qKiovIH0sXHJcbi8qIDIxICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xyXG5cclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cdC8qKlxyXG5cdCAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcclxuXHQgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAqXHJcblx0ICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcclxuXHQgKlxyXG5cdCAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcblx0ICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG5cdCAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAqXHJcblx0ICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblx0ICovXHJcblx0XHJcblx0ZnVuY3Rpb24gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKSB7XHJcblx0ICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG5cdH1cclxuXHRcclxuXHRleHBvcnRzLmRlZmF1bHQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XHJcblxyXG4vKioqLyB9LFxyXG4vKiAyMiAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdFxyXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHJcblx0dmFyIF9kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xyXG5cdFxyXG5cdHZhciBfZG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RvbSk7XHJcblx0XHJcblx0dmFyIF9jb21tb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xyXG5cdFxyXG5cdHZhciBfY29tbW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbW1vbik7XHJcblx0XHJcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cclxuXHRcclxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfSAvKipcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblx0XHJcblx0dmFyIENlbnRlcmVkRGl2ID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgZnVuY3Rpb24gQ2VudGVyZWREaXYoKSB7XHJcblx0ICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDZW50ZXJlZERpdik7XHJcblx0XHJcblx0ICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHQgICAgX2NvbW1vbjIuZGVmYXVsdC5leHRlbmQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZSwge1xyXG5cdCAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsMC44KScsXHJcblx0ICAgICAgdG9wOiAwLFxyXG5cdCAgICAgIGxlZnQ6IDAsXHJcblx0ICAgICAgZGlzcGxheTogJ25vbmUnLFxyXG5cdCAgICAgIHpJbmRleDogJzEwMDAnLFxyXG5cdCAgICAgIG9wYWNpdHk6IDAsXHJcblx0ICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ29wYWNpdHkgMC4ycyBsaW5lYXInLFxyXG5cdCAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgbGluZWFyJ1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5tYWtlRnVsbHNjcmVlbih0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcclxuXHQgICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcblx0XHJcblx0ICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdCAgICBfY29tbW9uMi5kZWZhdWx0LmV4dGVuZCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUsIHtcclxuXHQgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuXHQgICAgICBkaXNwbGF5OiAnbm9uZScsXHJcblx0ICAgICAgekluZGV4OiAnMTAwMScsXHJcblx0ICAgICAgb3BhY2l0eTogMCxcclxuXHQgICAgICBXZWJraXRUcmFuc2l0aW9uOiAnLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLW91dCwgb3BhY2l0eSAwLjJzIGxpbmVhcicsXHJcblx0ICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjJzIGVhc2Utb3V0LCBvcGFjaXR5IDAuMnMgbGluZWFyJ1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcclxuXHQgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xyXG5cdFxyXG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdCAgICBfZG9tMi5kZWZhdWx0LmJpbmQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudCwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgIF90aGlzLmhpZGUoKTtcclxuXHQgICAgfSk7XHJcblx0ICB9XHJcblx0XHJcblx0ICBDZW50ZXJlZERpdi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIHNob3coKSB7XHJcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHJcblx0ICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHJcblx0ICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHQgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cdCAgICAvLyAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gJzUyJSc7XHJcblx0ICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XHJcblx0XHJcblx0ICAgIHRoaXMubGF5b3V0KCk7XHJcblx0XHJcblx0ICAgIF9jb21tb24yLmRlZmF1bHQuZGVmZXIoZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgIF90aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xyXG5cdCAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XHJcblx0ICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xyXG5cdCAgICB9KTtcclxuXHQgIH07XHJcblx0XHJcblx0ICAvKipcclxuXHQgICAqIEhpZGUgY2VudGVyZWQgZGl2XHJcblx0ICAgKi9cclxuXHRcclxuXHRcclxuXHQgIENlbnRlcmVkRGl2LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gaGlkZSgpIHtcclxuXHQgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHRcclxuXHQgICAgdmFyIGhpZGUgPSBmdW5jdGlvbiBoaWRlKCkge1xyXG5cdCAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHQgICAgICBfdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFxyXG5cdCAgICAgIF9kb20yLmRlZmF1bHQudW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGlkZSk7XHJcblx0ICAgICAgX2RvbTIuZGVmYXVsdC51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcclxuXHQgICAgICBfZG9tMi5kZWZhdWx0LnVuYmluZChfdGhpcy5kb21FbGVtZW50LCAnb1RyYW5zaXRpb25FbmQnLCBoaWRlKTtcclxuXHQgICAgfTtcclxuXHRcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoaWRlKTtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcclxuXHQgICAgX2RvbTIuZGVmYXVsdC5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ29UcmFuc2l0aW9uRW5kJywgaGlkZSk7XHJcblx0XHJcblx0ICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XHJcblx0ICAgIC8vICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSAnNDglJztcclxuXHQgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cdCAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDEuMSknO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIENlbnRlcmVkRGl2LnByb3RvdHlwZS5sYXlvdXQgPSBmdW5jdGlvbiBsYXlvdXQoKSB7XHJcblx0ICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gX2RvbTIuZGVmYXVsdC5nZXRXaWR0aCh0aGlzLmRvbUVsZW1lbnQpIC8gMiArICdweCc7XHJcblx0ICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gX2RvbTIuZGVmYXVsdC5nZXRIZWlnaHQodGhpcy5kb21FbGVtZW50KSAvIDIgKyAncHgnO1xyXG5cdCAgfTtcclxuXHRcclxuXHQgIHJldHVybiBDZW50ZXJlZERpdjtcclxuXHR9KCk7XHJcblx0XHJcblx0ZXhwb3J0cy5kZWZhdWx0ID0gQ2VudGVyZWREaXY7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XHJcblxyXG4vKioqLyB9LFxyXG4vKiAyMyAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblx0ZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNCkoKTtcclxuXHQvLyBpbXBvcnRzXHJcblx0XHJcblx0XHJcblx0Ly8gbW9kdWxlXHJcblx0ZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmRnIHtcXG4gIC8qKiBDbGVhciBsaXN0IHN0eWxlcyAqL1xcbiAgLyogQXV0by1wbGFjZSBjb250YWluZXIgKi9cXG4gIC8qIEF1dG8tcGxhY2VkIEdVSSdzICovXFxuICAvKiBMaW5lIGl0ZW1zIHRoYXQgZG9uJ3QgY29udGFpbiBmb2xkZXJzLiAqL1xcbiAgLyoqIEZvbGRlciBuYW1lcyAqL1xcbiAgLyoqIEhpZGVzIGNsb3NlZCBpdGVtcyAqL1xcbiAgLyoqIENvbnRyb2xsZXIgcm93ICovXFxuICAvKiogTmFtZS1oYWxmIChsZWZ0KSAqL1xcbiAgLyoqIENvbnRyb2xsZXItaGFsZiAocmlnaHQpICovXFxuICAvKiogQ29udHJvbGxlciBwbGFjZW1lbnQgKi9cXG4gIC8qKiBTaG9ydGVyIG51bWJlciBib3hlcyB3aGVuIHNsaWRlciBpcyBwcmVzZW50LiAqL1xcbiAgLyoqIEVuc3VyZSB0aGUgZW50aXJlIGJvb2xlYW4gYW5kIGZ1bmN0aW9uIHJvdyBzaG93cyBhIGhhbmQgKi9cXG4gIC8qKiBhbGxvdyBvdmVyZmxvdyBmb3IgY29sb3Igc2VsZWN0b3IgKi8gfVxcbiAgLmRnIHVsIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgY2xlYXI6IGJvdGg7IH1cXG4gIC5kZy5hYyB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICB6LWluZGV4OiAwOyB9XFxuICAuZGc6bm90KC5hYykgLm1haW4ge1xcbiAgICAvKiogRXhjbHVkZSBtYWlucyBpbiBhYyBzbyB0aGF0IHdlIGRvbid0IGhpZGUgY2xvc2UgYnV0dG9uICovXFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC5kZy5tYWluIHtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMXMgbGluZWFyO1xcbiAgICAtby10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMXMgbGluZWFyO1xcbiAgICAtbW96LXRyYW5zaXRpb246IG9wYWNpdHkgMC4xcyBsaW5lYXI7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xcyBsaW5lYXI7IH1cXG4gICAgLmRnLm1haW4udGFsbGVyLXRoYW4td2luZG93IHtcXG4gICAgICBvdmVyZmxvdy15OiBhdXRvOyB9XFxuICAgICAgLmRnLm1haW4udGFsbGVyLXRoYW4td2luZG93IC5jbG9zZS1idXR0b24ge1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIC8qIFRPRE8sIHRoZXNlIGFyZSBzdHlsZSBub3RlcyAqL1xcbiAgICAgICAgbWFyZ2luLXRvcDogLTFweDtcXG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMmMyYzJjOyB9XFxuICAgIC5kZy5tYWluIHVsLmNsb3NlZCAuY2xvc2UtYnV0dG9uIHtcXG4gICAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7IH1cXG4gICAgLmRnLm1haW46aG92ZXIgLmNsb3NlLWJ1dHRvbixcXG4gICAgLmRnLm1haW4gLmNsb3NlLWJ1dHRvbi5kcmFnIHtcXG4gICAgICBvcGFjaXR5OiAxOyB9XFxuICAgIC5kZy5tYWluIC5jbG9zZS1idXR0b24ge1xcbiAgICAgIC8qb3BhY2l0eTogMDsqL1xcbiAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjFzIGxpbmVhcjtcXG4gICAgICAtby10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMXMgbGluZWFyO1xcbiAgICAgIC1tb3otdHJhbnNpdGlvbjogb3BhY2l0eSAwLjFzIGxpbmVhcjtcXG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMXMgbGluZWFyO1xcbiAgICAgIGJvcmRlcjogMDtcXG4gICAgICBsaW5lLWhlaWdodDogMTlweDtcXG4gICAgICBoZWlnaHQ6IDIwcHg7XFxuICAgICAgLyogVE9ETywgdGhlc2UgYXJlIHN0eWxlIG5vdGVzICovXFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwOyB9XFxuICAgICAgLmRnLm1haW4gLmNsb3NlLWJ1dHRvbi5jbG9zZS10b3Age1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAgICAgLmRnLm1haW4gLmNsb3NlLWJ1dHRvbi5jbG9zZS1ib3R0b20ge1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlOyB9XFxuICAgICAgLmRnLm1haW4gLmNsb3NlLWJ1dHRvbjpob3ZlciB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTExOyB9XFxuICAuZGcuYSB7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgICBvdmVyZmxvdy15OiB2aXNpYmxlOyB9XFxuICAgIC5kZy5hLmhhcy1zYXZlID4gdWwuY2xvc2UtdG9wIHtcXG4gICAgICBtYXJnaW4tdG9wOiAwOyB9XFxuICAgIC5kZy5hLmhhcy1zYXZlID4gdWwuY2xvc2UtYm90dG9tIHtcXG4gICAgICBtYXJnaW4tdG9wOiAyN3B4OyB9XFxuICAgIC5kZy5hLmhhcy1zYXZlID4gdWwuY2xvc2VkIHtcXG4gICAgICBtYXJnaW4tdG9wOiAwOyB9XFxuICAgIC5kZy5hIC5zYXZlLXJvdyB7XFxuICAgICAgdG9wOiAwO1xcbiAgICAgIHotaW5kZXg6IDEwMDI7IH1cXG4gICAgICAuZGcuYSAuc2F2ZS1yb3cuY2xvc2UtdG9wIHtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgICAgIC5kZy5hIC5zYXZlLXJvdy5jbG9zZS1ib3R0b20ge1xcbiAgICAgICAgcG9zaXRpb246IGZpeGVkOyB9XFxuICAuZGcgbGkge1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGhlaWdodCAwLjFzIGVhc2Utb3V0O1xcbiAgICAtby10cmFuc2l0aW9uOiBoZWlnaHQgMC4xcyBlYXNlLW91dDtcXG4gICAgLW1vei10cmFuc2l0aW9uOiBoZWlnaHQgMC4xcyBlYXNlLW91dDtcXG4gICAgdHJhbnNpdGlvbjogaGVpZ2h0IDAuMXMgZWFzZS1vdXQ7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogb3ZlcmZsb3cgMC4xcyBsaW5lYXI7XFxuICAgIC1vLXRyYW5zaXRpb246IG92ZXJmbG93IDAuMXMgbGluZWFyO1xcbiAgICAtbW96LXRyYW5zaXRpb246IG92ZXJmbG93IDAuMXMgbGluZWFyO1xcbiAgICB0cmFuc2l0aW9uOiBvdmVyZmxvdyAwLjFzIGxpbmVhcjsgfVxcbiAgLmRnIGxpOm5vdCguZm9sZGVyKSB7XFxuICAgIGN1cnNvcjogYXV0bztcXG4gICAgaGVpZ2h0OiAyN3B4O1xcbiAgICBsaW5lLWhlaWdodDogMjdweDtcXG4gICAgcGFkZGluZzogMCA0cHggMCA1cHg7IH1cXG4gIC5kZyBsaS5mb2xkZXIge1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHRyYW5zcGFyZW50OyB9XFxuICAuZGcgbGkudGl0bGUge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG1hcmdpbi1sZWZ0OiAtNHB4OyB9XFxuICAuZGcgLmNsb3NlZCBsaTpub3QoLnRpdGxlKSxcXG4gIC5kZyAuY2xvc2VkIHVsIGxpLFxcbiAgLmRnIC5jbG9zZWQgdWwgbGkgPiAqIHtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBib3JkZXI6IDA7IH1cXG4gIC5kZyAuY3Ige1xcbiAgICBjbGVhcjogYm90aDtcXG4gICAgcGFkZGluZy1sZWZ0OiAzcHg7XFxuICAgIGhlaWdodDogMjdweDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmRnIC5wcm9wZXJ0eS1uYW1lIHtcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgY2xlYXI6IGxlZnQ7XFxuICAgIHdpZHRoOiA0MCU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyB9XFxuICAuZGcgLmMge1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgd2lkdGg6IDYwJTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAuZGcgLmMgaW5wdXRbdHlwZT10ZXh0XSB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgbWFyZ2luLXRvcDogNHB4O1xcbiAgICBwYWRkaW5nOiAzcHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBmbG9hdDogcmlnaHQ7IH1cXG4gIC5kZyAuaGFzLXNsaWRlciBpbnB1dFt0eXBlPXRleHRdIHtcXG4gICAgd2lkdGg6IDMwJTtcXG4gICAgLypkaXNwbGF5OiBub25lOyovXFxuICAgIG1hcmdpbi1sZWZ0OiAwOyB9XFxuICAuZGcgLnNsaWRlciB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB3aWR0aDogNjYlO1xcbiAgICBtYXJnaW4tbGVmdDogLTVweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgICBoZWlnaHQ6IDE5cHg7XFxuICAgIG1hcmdpbi10b3A6IDRweDsgfVxcbiAgLmRnIC5zbGlkZXItZmcge1xcbiAgICBoZWlnaHQ6IDEwMCU7IH1cXG4gIC5kZyAuYyBpbnB1dFt0eXBlPWNoZWNrYm94XSB7XFxuICAgIG1hcmdpbi10b3A6IDdweDsgfVxcbiAgLmRnIC5jIHNlbGVjdCB7XFxuICAgIG1hcmdpbi10b3A6IDVweDsgfVxcbiAgLmRnIC5jci5mdW5jdGlvbixcXG4gIC5kZyAuY3IuZnVuY3Rpb24gLnByb3BlcnR5LW5hbWUsXFxuICAuZGcgLmNyLmZ1bmN0aW9uICosXFxuICAuZGcgLmNyLmJvb2xlYW4sXFxuICAuZGcgLmNyLmJvb2xlYW4gKiB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgLmRnIC5jci5jb2xvciB7XFxuICAgIG92ZXJmbG93OiB2aXNpYmxlOyB9XFxuICAuZGcgLnNlbGVjdG9yIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBtYXJnaW4tbGVmdDogLTlweDtcXG4gICAgbWFyZ2luLXRvcDogMjNweDtcXG4gICAgei1pbmRleDogMTA7IH1cXG4gIC5kZyAuYzpob3ZlciAuc2VsZWN0b3IsXFxuICAuZGcgLnNlbGVjdG9yLmRyYWcge1xcbiAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgLmRnIGxpLnNhdmUtcm93IHtcXG4gICAgcGFkZGluZzogMDsgfVxcbiAgICAuZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbiB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHBhZGRpbmc6IDBweCA2cHg7IH1cXG4gIC5kZy5kaWFsb2d1ZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI7XFxuICAgIHdpZHRoOiA0NjBweDtcXG4gICAgcGFkZGluZzogMTVweDtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBsaW5lLWhlaWdodDogMTVweDsgfVxcblxcbi8qIFRPRE8gU2VwYXJhdGUgc3R5bGUgYW5kIHN0cnVjdHVyZSAqL1xcbiNkZy1uZXctY29uc3RydWN0b3Ige1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGNvbG9yOiAjMjIyO1xcbiAgZm9udC1mYW1pbHk6IE1vbmFjbywgbW9ub3NwYWNlO1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgYm9yZGVyOiAwO1xcbiAgcmVzaXplOiBub25lO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMXB4IDFweCAxcHggIzg4ODtcXG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcXG4gIG1hcmdpbjogMTJweCAwO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogNDQwcHg7XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuI2RnLWxvY2FsLWV4cGxhaW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZvbnQtc2l6ZTogMTFweDtcXG4gIGxpbmUtaGVpZ2h0OiAxN3B4O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcXG4gIHBhZGRpbmc6IDhweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7IH1cXG4gICNkZy1sb2NhbC1leHBsYWluIGNvZGUge1xcbiAgICBmb250LXNpemU6IDEwcHg7IH1cXG5cXG4jZGF0LWd1aS1zYXZlLWxvY2FsbHkge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi8qKiBNYWluIHR5cGUgKi9cXG4uZGcge1xcbiAgY29sb3I6ICNlZWU7XFxuICBmb250OiAxMXB4ICdMdWNpZGEgR3JhbmRlJywgc2Fucy1zZXJpZjtcXG4gIHRleHQtc2hhZG93OiAwIC0xcHggMCAjMTExO1xcbiAgLyoqIEF1dG8gcGxhY2UgKi9cXG4gIC8qIENvbnRyb2xsZXIgcm93LCA8bGk+ICovXFxuICAvKiogQ29udHJvbGxlcnMgKi8gfVxcbiAgLmRnLm1haW4ge1xcbiAgICAvKiogU2Nyb2xsYmFyICovIH1cXG4gICAgLmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXG4gICAgICB3aWR0aDogNXB4O1xcbiAgICAgIGJhY2tncm91bmQ6ICMxYTFhMWE7IH1cXG4gICAgLmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLWNvcm5lciB7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gICAgLmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgICAgYmFja2dyb3VuZDogIzY3Njc2NzsgfVxcbiAgLmRnIGxpOm5vdCguZm9sZGVyKSB7XFxuICAgIGJhY2tncm91bmQ6ICMxYTFhMWE7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMmMyYzJjOyB9XFxuICAuZGcgbGkuc2F2ZS1yb3cge1xcbiAgICBsaW5lLWhlaWdodDogMjVweDtcXG4gICAgYmFja2dyb3VuZDogI2RhZDVjYjtcXG4gICAgYm9yZGVyOiAwOyB9XFxuICAgIC5kZyBsaS5zYXZlLXJvdyBzZWxlY3Qge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XFxuICAgICAgd2lkdGg6IDEwOHB4OyB9XFxuICAgIC5kZyBsaS5zYXZlLXJvdyAuYnV0dG9uIHtcXG4gICAgICBtYXJnaW4tbGVmdDogNXB4O1xcbiAgICAgIG1hcmdpbi10b3A6IDFweDtcXG4gICAgICBib3JkZXItcmFkaXVzOiAycHg7XFxuICAgICAgZm9udC1zaXplOiA5cHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IDdweDtcXG4gICAgICBwYWRkaW5nOiA0cHggNHB4IDVweCA0cHg7XFxuICAgICAgYmFja2dyb3VuZDogI2M1YmRhZDtcXG4gICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICB0ZXh0LXNoYWRvdzogMCAxcHggMCAjYjBhNThmO1xcbiAgICAgIGJveC1zaGFkb3c6IDAgLTFweCAwICNiMGE1OGY7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgICAgLmRnIGxpLnNhdmUtcm93IC5idXR0b24uZ2VhcnMge1xcbiAgICAgICAgYmFja2dyb3VuZDogI2M1YmRhZCB1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBc0FBQUFOQ0FZQUFBQi85WlE3QUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUFRSkpSRUZVZU5waVlLQVUvUC8vUHdHSUMvQXBDQUJpQlNBVytJOEFDbEFjZ0t4UTRUOWhvTUFFVXJ4eDJRU0dONitlZ0RYKy92V1Q0ZTdOODJBTVlvUEF4L2V2d1dvWW9TWWJBQ1gyczdLeEN4emNzZXpEaDNldkZvREVCWVRFRXF5Y2dnV0F6QTlBdVVTUVFnZVlQYTlmUHY2L1lXbS9BY3g1SVBiN3R5L2Z3K1FaYmx3Njd2RHM4UjBZSHlRaGdPYngreUFKa0JxbUc1ZFBQRGgxYVBPR1IvZXVnVzBHNHZsSW9USWZ5RmNBK1Fla2hoSEpoUGRReGJpQUlndU1CVFFaclBENzEwOE02cm9XWURGUWlJQUF2NkFvdy8xYkZ3WGdpcytmMkxVQXlud29JYU5jejhYTngzRGw3TUVKVURHUXB4OWd0UThZQ3VlQitEMjZPRUNBQVFEYWR0N2U0NkQ0MlFBQUFBQkpSVTVFcmtKZ2dnPT0pIDJweCAxcHggbm8tcmVwZWF0O1xcbiAgICAgICAgaGVpZ2h0OiA3cHg7XFxuICAgICAgICB3aWR0aDogOHB4OyB9XFxuICAgICAgLmRnIGxpLnNhdmUtcm93IC5idXR0b246aG92ZXIge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2JhYjE5ZTtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgLTFweCAwICNiMGE1OGY7IH1cXG4gIC5kZyBsaS5mb2xkZXIge1xcbiAgICBib3JkZXItYm90dG9tOiAwOyB9XFxuICAuZGcgbGkudGl0bGUge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDE2cHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMDAgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEJRQUZBSkVBQVAvLy8vUHo4Ly8vLy8vLy95SDVCQUVBQUFJQUxBQUFBQUFGQUFVQUFBSUlsSStoS2dGeG9DZ0FPdz09KSA2cHggMTBweCBuby1yZXBlYXQ7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTsgfVxcbiAgLmRnIC5jbG9zZWQgbGkudGl0bGUge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQlFBRkFKRUFBUC8vLy9QejgvLy8vLy8vL3lINUJBRUFBQUlBTEFBQUFBQUZBQVVBQUFJSWxHSVdxTUNiV0FFQU93PT0pOyB9XFxuICAuZGcgLmNyLmJvb2xlYW4ge1xcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICM4MDY3ODc7IH1cXG4gIC5kZyAuY3IuY29sb3Ige1xcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkOyB9XFxuICAuZGcgLmNyLmZ1bmN0aW9uIHtcXG4gICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjZTYxZDVmOyB9XFxuICAuZGcgLmNyLm51bWJlciB7XFxuICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzJGQTFENjsgfVxcbiAgICAuZGcgLmNyLm51bWJlciBpbnB1dFt0eXBlPXRleHRdIHtcXG4gICAgICBjb2xvcjogIzJGQTFENjsgfVxcbiAgLmRnIC5jci5zdHJpbmcge1xcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICMxZWQzNmY7IH1cXG4gICAgLmRnIC5jci5zdHJpbmcgaW5wdXRbdHlwZT10ZXh0XSB7XFxuICAgICAgY29sb3I6ICMxZWQzNmY7IH1cXG4gIC5kZyAuY3IuZnVuY3Rpb246aG92ZXIsIC5kZyAuY3IuYm9vbGVhbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQ6ICMxMTE7IH1cXG4gIC5kZyAuYyBpbnB1dFt0eXBlPXRleHRdIHtcXG4gICAgYmFja2dyb3VuZDogIzMwMzAzMDtcXG4gICAgb3V0bGluZTogbm9uZTsgfVxcbiAgICAuZGcgLmMgaW5wdXRbdHlwZT10ZXh0XTpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzNjM2MzYzsgfVxcbiAgICAuZGcgLmMgaW5wdXRbdHlwZT10ZXh0XTpmb2N1cyB7XFxuICAgICAgYmFja2dyb3VuZDogIzQ5NDk0OTtcXG4gICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgLmRnIC5jIC5zbGlkZXIge1xcbiAgICBiYWNrZ3JvdW5kOiAjMzAzMDMwO1xcbiAgICBjdXJzb3I6IGV3LXJlc2l6ZTsgfVxcbiAgLmRnIC5jIC5zbGlkZXItZmcge1xcbiAgICBiYWNrZ3JvdW5kOiAjMkZBMUQ2O1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7IH1cXG4gIC5kZyAuYyAuc2xpZGVyOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogIzNjM2MzYzsgfVxcbiAgICAuZGcgLmMgLnNsaWRlcjpob3ZlciAuc2xpZGVyLWZnIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjNDRhYmRhOyB9XFxuXCIsIFwiXCJdKTtcclxuXHRcclxuXHQvLyBleHBvcnRzXHJcblxyXG5cclxuLyoqKi8gfSxcclxuLyogMjQgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XHJcblxyXG5cdC8qXHJcblx0XHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdFx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG5cdCovXHJcblx0Ly8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGxpc3QgPSBbXTtcclxuXHRcclxuXHRcdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRcdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0XHR9O1xyXG5cdFxyXG5cdFx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRcdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBsaXN0O1xyXG5cdH07XHJcblxyXG5cclxuLyoqKi8gfVxyXG4vKioqKioqLyBdKVxyXG59KTtcclxuO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXQuZ3VpLmpzLm1hcCIsIi8qKlxyXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xyXG4gKiBAYXV0aG9yIG1yLmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cclxuICovXHJcblxyXG52YXIgRGV0ZWN0b3IgPSB7XHJcblxyXG5cdGNhbnZhczogISEgd2luZG93LkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuXHR3ZWJnbDogKCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHJcblx0XHRcdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApOyByZXR1cm4gISEgKCB3aW5kb3cuV2ViR0xSZW5kZXJpbmdDb250ZXh0ICYmICggY2FudmFzLmdldENvbnRleHQoICd3ZWJnbCcgKSB8fCBjYW52YXMuZ2V0Q29udGV4dCggJ2V4cGVyaW1lbnRhbC13ZWJnbCcgKSApICk7XHJcblxyXG5cdFx0fSBjYXRjaCAoIGUgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9ICkoKSxcclxuXHR3b3JrZXJzOiAhISB3aW5kb3cuV29ya2VyLFxyXG5cdGZpbGVhcGk6IHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYixcclxuXHJcblx0Z2V0V2ViR0xFcnJvck1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XHJcblx0XHRlbGVtZW50LmlkID0gJ3dlYmdsLWVycm9yLW1lc3NhZ2UnO1xyXG5cdFx0ZWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gJ21vbm9zcGFjZSc7XHJcblx0XHRlbGVtZW50LnN0eWxlLmZvbnRTaXplID0gJzEzcHgnO1xyXG5cdFx0ZWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gJ25vcm1hbCc7XHJcblx0XHRlbGVtZW50LnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG5cdFx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmYnO1xyXG5cdFx0ZWxlbWVudC5zdHlsZS5jb2xvciA9ICcjMDAwJztcclxuXHRcdGVsZW1lbnQuc3R5bGUucGFkZGluZyA9ICcxLjVlbSc7XHJcblx0XHRlbGVtZW50LnN0eWxlLndpZHRoID0gJzQwMHB4JztcclxuXHRcdGVsZW1lbnQuc3R5bGUubWFyZ2luID0gJzVlbSBhdXRvIDAnO1xyXG5cclxuXHRcdGlmICggISB0aGlzLndlYmdsICkge1xyXG5cclxuXHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSB3aW5kb3cuV2ViR0xSZW5kZXJpbmdDb250ZXh0ID8gW1xyXG5cdFx0XHRcdCdZb3VyIGdyYXBoaWNzIGNhcmQgZG9lcyBub3Qgc2VlbSB0byBzdXBwb3J0IDxhIGhyZWY9XCJodHRwOi8va2hyb25vcy5vcmcvd2ViZ2wvd2lraS9HZXR0aW5nX2FfV2ViR0xfSW1wbGVtZW50YXRpb25cIiBzdHlsZT1cImNvbG9yOiMwMDBcIj5XZWJHTDwvYT4uPGJyIC8+JyxcclxuXHRcdFx0XHQnRmluZCBvdXQgaG93IHRvIGdldCBpdCA8YSBocmVmPVwiaHR0cDovL2dldC53ZWJnbC5vcmcvXCIgc3R5bGU9XCJjb2xvcjojMDAwXCI+aGVyZTwvYT4uJ1xyXG5cdFx0XHRdLmpvaW4oICdcXG4nICkgOiBbXHJcblx0XHRcdFx0J1lvdXIgYnJvd3NlciBkb2VzIG5vdCBzZWVtIHRvIHN1cHBvcnQgPGEgaHJlZj1cImh0dHA6Ly9raHJvbm9zLm9yZy93ZWJnbC93aWtpL0dldHRpbmdfYV9XZWJHTF9JbXBsZW1lbnRhdGlvblwiIHN0eWxlPVwiY29sb3I6IzAwMFwiPldlYkdMPC9hPi48YnIvPicsXHJcblx0XHRcdFx0J0ZpbmQgb3V0IGhvdyB0byBnZXQgaXQgPGEgaHJlZj1cImh0dHA6Ly9nZXQud2ViZ2wub3JnL1wiIHN0eWxlPVwiY29sb3I6IzAwMFwiPmhlcmU8L2E+LidcclxuXHRcdFx0XS5qb2luKCAnXFxuJyApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHJcblx0fSxcclxuXHJcblx0YWRkR2V0V2ViR0xNZXNzYWdlOiBmdW5jdGlvbiAoIHBhcmFtZXRlcnMgKSB7XHJcblxyXG5cdFx0dmFyIHBhcmVudCwgaWQsIGVsZW1lbnQ7XHJcblxyXG5cdFx0cGFyYW1ldGVycyA9IHBhcmFtZXRlcnMgfHwge307XHJcblxyXG5cdFx0cGFyZW50ID0gcGFyYW1ldGVycy5wYXJlbnQgIT09IHVuZGVmaW5lZCA/IHBhcmFtZXRlcnMucGFyZW50IDogZG9jdW1lbnQuYm9keTtcclxuXHRcdGlkID0gcGFyYW1ldGVycy5pZCAhPT0gdW5kZWZpbmVkID8gcGFyYW1ldGVycy5pZCA6ICdvbGRpZSc7XHJcblxyXG5cdFx0ZWxlbWVudCA9IERldGVjdG9yLmdldFdlYkdMRXJyb3JNZXNzYWdlKCk7XHJcblx0XHRlbGVtZW50LmlkID0gaWQ7XHJcblxyXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XHJcblxyXG5cdH1cclxuXHJcbn07XHJcblxyXG4vLyBicm93c2VyaWZ5IHN1cHBvcnRcclxuaWYgKCB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyApIHtcclxuXHJcblx0bW9kdWxlLmV4cG9ydHMgPSBEZXRlY3RvcjtcclxuXHJcbn1cclxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gdW5pY29uLnRzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmltcG9ydCB7YXBwICAgICAgICAgICAgIH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5pbXBvcnQge0Jyb3dzZXJXaW5kb3cgICB9IGZyb20gJ2VsZWN0cm9uJztcclxuaW1wb3J0ICogYXMgaW5kZXggICAgICAgICBmcm9tICcuL2luZGV4JztcclxuXHJcbmNvbnN0IHBhdGggICAgICA9IHJlcXVpcmUoICdwYXRoJyApO1xyXG5jb25zdCB1cmwgICAgICAgPSByZXF1aXJlKCAndXJsJyApO1xyXG5jb25zdCBkYXRHVUkgICAgPSByZXF1aXJlKCcuLi9saWIvZGF0Lmd1aS9idWlsZC9kYXQuZ3VpJyk7IC8vIOyjvOydmCA6IO2YhOyerCBucG3sl5AgMC42LjHrsoTsoITsnYAg66y47KCc6rCAIOyeiOuLpC5cclxuY29uc3QgZGV0ZWN0b3IgID0gcmVxdWlyZSgnLi4vbGliL3RocmVlLmpzL2V4YW1wbGVzL2pzL0RldGVjdG9yJyk7IC8vIEB0eXBlcy90aHJlZS9kZXRhY3RvcuulvCDsgqzsmqntlZjripQg67Cp67KV7J2EIOuqsOudvOyEnCDstpTqsIDtlahcclxuXHJcbi8qKlxyXG4gKiB1bmljb25cclxuICpcclxuICogQGF1dGhvciBtb3NmcmFtZSAoIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3NmcmFtZSApXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFVuaWNvblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVuaWNvbiB7XHJcblxyXG4gICAgLy8gWyBQdWJsaWMgVmFyaWFibGVzIF1cclxuXHJcbiAgICAvLyBbIENvbnN0cnVjdG9ycyBdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFVuaWNvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVW5pY29uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICAvLyBbIG1haW4gd2luZG93IF1cclxuXHJcbiAgICAgICAgYXBwLm9uKCAncmVhZHknLCB0aGlzLl9jcmVhdGVXaW5kb3cgKTtcclxuXHJcbiAgICAgICAgYXBwLm9uKCAnd2luZG93LWFsbC1jbG9zZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoIHByb2Nlc3MucGxhdGZvcm0gIT09ICdkYXJ3aW4nICkge1xyXG4gICAgICAgICAgICAgICAgYXBwLnF1aXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gKTtcclxuXHJcbiAgICAgICAgYXBwLm9uKCAnYWN0aXZhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCB0aGlzLl9tYWluV2luZG93ID09PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVXaW5kb3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBbIFB1YmxpYyBGdW5jdGlvbnMgXVxyXG5cclxuICAgIC8vIFsgUHVibGljIFN0YXRpYyBWYXJpYWJsZXMgXVxyXG5cclxuICAgIC8vIFsgUHVibGljIFN0YXRpYyBGdW5jdGlvbnMgXVxyXG5cclxuICAgIC8vIFsgUHJvdGVjdGVkIFZhcmlhYmxlcyBdXHJcblxyXG4gICAgcHJvdGVjdGVkIF9tYWluV2luZG93IDogRWxlY3Ryb24uQnJvd3NlcldpbmRvdztcclxuXHJcbiAgICAvLyBbIFByb3RlY3RlZCBGdW5jdGlvbnMgXVxyXG5cclxuICAgIHByb3RlY3RlZCBfY3JlYXRlV2luZG93KCkge1xyXG4gICAgICAgIHRoaXMuX21haW5XaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdygge1xyXG4gICAgICAgICAgICB3ZWJQcmVmZXJlbmNlczp7XHJcbiAgICAgICAgICAgICAgICBub2RlSW50ZWdyYXRpb246IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgdGhpcy5fbWFpbldpbmRvdy5tYXhpbWl6ZSgpO1xyXG4gICAgICAgIC8vdGhpcy5fbWFpbldpbmRvdy5zZXRNZW51KCBuZXcgRWxlY3Ryb24uTWVudSgpICk7XHJcbiAgICAgICAgLy90aGlzLl9tYWluV2luZG93LmxvYWRVUkwoXHJcbiAgICAgICAgLy8gICAgdXJsLmZvcm1hdCgge1xyXG4gICAgICAgIC8vICAgICAgICBwYXRobmFtZTogcGF0aC5qb2luKCBfX2Rpcm5hbWUsICdpbmRleC5odG1sJyApLFxyXG4gICAgICAgIC8vICAgICAgICBwcm90b2NvbDogJ2ZpbGU6JyxcclxuICAgICAgICAvLyAgICAgICAgc2xhc2hlczogdHJ1ZVxyXG4gICAgICAgIC8vICAgIH0gKVxyXG4gICAgICAgIC8vKTtcclxuICAgICAgICB0aGlzLl9tYWluV2luZG93Lm9uKCAnY2xvc2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluV2luZG93ID0gbnVsbDtcclxuICAgICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gWyBQcm90ZWN0ZWQgU3RhdGljIFZhcmlhYmxlcyBdXHJcblxyXG4gICAgLy8gWyBQcm90ZWN0ZWQgU3RhdGljIEZ1bmN0aW9ucyBdXHJcbn1cclxuXHJcbmxldCB1bmljb24gPSBuZXcgVW5pY29uKCk7XHJcbiJdfQ==
