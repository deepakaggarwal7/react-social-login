(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var urlParser = void 0;

if (typeof window !== 'undefined') {
  urlParser = window.document.createElement('a');
}

/**
 * Create a copy of an object, omitting provided keys.
 * @param {Object} obj Object to copy
 * @param {Array} arr Keys to omit
 * @returns {Object}
 */
var omit = exports.omit = function omit(obj, arr) {
  return Object.keys(obj).reduce(function (res, key) {
    if (arr.indexOf(key) === -1) {
      res[key] = obj[key];
    }

    return res;
  }, {});
};

var parseAsURL = exports.parseAsURL = function parseAsURL(text) {
  if (!urlParser) {
    urlParser = window.document.createElement('a');
  }

  urlParser.href = text;

  return {
    protocol: urlParser.protocol,
    hostname: urlParser.hostname,
    port: urlParser.port,
    pathname: urlParser.pathname,
    search: urlParser.search,
    hash: urlParser.hash,
    host: urlParser.host,
    toString: function toString() {
      return this.protocol + '//' + this.host + (this.pathname === '/' ? '' : this.pathname) + this.search + this.hash;
    }
  };
};

/**
 * Get key value from url query strings
 * @param {string} key Key to get value from
 * @returns {string}
 */
var getQueryStringValue = exports.getQueryStringValue = function getQueryStringValue(key) {
  return decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
};

/**
 * Get key value from location hash
 * @param {string} key Key to get value from
 * @returns {string|null}
 */
var getHashValue = exports.getHashValue = function getHashValue(key) {
  var matches = window.location.hash.match(new RegExp(key + '=([^&]*)'));

  return matches ? matches[1] : null;
};

var cleanLocation = exports.cleanLocation = function cleanLocation() {
  if (!window.history || !window.history.pushState) {
    return;
  }

  var _window$location = window.location,
      protocol = _window$location.protocol,
      host = _window$location.host,
      pathname = _window$location.pathname,
      search = _window$location.search,
      hash = _window$location.hash;


  var cleanedHash = /access_token/.test(hash) ? '' : hash || '';
  var cleanedSearch = search.split('&').reduce(function (acc, keyval, i) {
    var del = /rslCallback=/.test(keyval) || /code=/.test(keyval) || /state=/.test(keyval) || /error=/.test(keyval) || /error_reason=/.test(keyval);

    if (i === 0 && del) {
      return '?';
    } else if (i === 0) {
      return keyval;
    } else if (del) {
      return acc;
    }

    return acc + '&' + keyval;
  }, '');

  cleanedSearch = cleanedSearch === '?' ? '' : cleanedSearch;

  window.history.pushState({
    html: document.body.innerHTML,
    pageTitle: document.title
  }, '', protocol + '//' + host + pathname + cleanedSearch + cleanedHash);

  return true;
};

var rslError = exports.rslError = function rslError(errorObject) {
  var error = [];

  error.push('[' + errorObject.provider + '][' + errorObject.type + '] ' + errorObject.description);

  if (errorObject.error) {
    error.push(JSON.stringify(errorObject.error, null, 2));
  }

  return Error(error.join('\n\nORIGINAL ERROR: '));
};

var timestampFromNow = exports.timestampFromNow = function timestampFromNow(duration) {
  var expiresAt = new Date();

  return expiresAt.setSeconds(expiresAt.getSeconds() + duration);
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var ReactIs = require('react-is');

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(9)();
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _amazon = __webpack_require__(11);

var _amazon2 = _interopRequireDefault(_amazon);

var _facebook = __webpack_require__(12);

var _facebook2 = _interopRequireDefault(_facebook);

var _github = __webpack_require__(13);

var _github2 = _interopRequireDefault(_github);

var _google = __webpack_require__(17);

var _google2 = _interopRequireDefault(_google);

var _instagram = __webpack_require__(18);

var _instagram2 = _interopRequireDefault(_instagram);

var _linkedin = __webpack_require__(20);

var _linkedin2 = _interopRequireDefault(_linkedin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  amazon: _amazon2.default,
  github: _github2.default,
  google: _google2.default,
  facebook: _facebook2.default,
  instagram: _instagram2.default,
  linkedin: _linkedin2.default
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing a user social account data. */
var SocialUser = function () {
  /**
   * Creates a social user.
   * @param {string} provider
   */
  function SocialUser(provider) {
    _classCallCheck(this, SocialUser);

    this._provider = provider;

    this._profile = {
      id: undefined,
      name: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      profilePicUrl: undefined,
      gender: undefined
    };

    this._token = {
      accessToken: undefined,
      expiresAt: undefined
    };
  }

  /**
   * Set provider.
   * @param {string} provider
   */


  _createClass(SocialUser, [{
    key: "provider",
    set: function set(provider) {
      this._provider = provider;
    }

    /**
     * Get provider.
     * @returns {string}
     */
    ,
    get: function get() {
      return this._provider;
    }

    /**
     * Set profile.
     * @param {Object} profile
     */

  }, {
    key: "profile",
    set: function set(profile) {
      this._profile = profile;
    }

    /**
     * Get profile.
     * @returns {Object}
     */
    ,
    get: function get() {
      return this._profile;
    }

    /**
     * Set token.
     * @param {Object} token
     */

  }, {
    key: "token",
    set: function set(token) {
      this._token = token;
    }

    /**
     * Get token.
     * @returns {Object}
     */
    ,
    get: function get() {
      return this._token;
    }
  }]);

  return SocialUser;
}();

exports.default = SocialUser;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OldSocialLogin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(8);

Object.defineProperty(exports, 'OldSocialLogin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_component).default;
  }
});

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _config = __webpack_require__(21);

var _config2 = _interopRequireDefault(_config);

var _sdk = __webpack_require__(4);

var _sdk2 = _interopRequireDefault(_sdk);

var _SocialUser = __webpack_require__(5);

var _SocialUser2 = _interopRequireDefault(_SocialUser);

var _utils = __webpack_require__(0);

var _cancelable = __webpack_require__(22);

var _cancelable2 = _interopRequireDefault(_cancelable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// // Enable Promises cancellation
// Promise.config({
//   cancellation: true
// })

/**
 * React Higher Order Component handling social login for multiple providers.
 * @param {Element} WrappedComponent
 * @constructor
 */
var SocialLogin = function SocialLogin(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(SocialLogin, _Component);

    function SocialLogin(props) {
      _classCallCheck(this, SocialLogin);

      var _this = _possibleConstructorReturn(this, (SocialLogin.__proto__ || Object.getPrototypeOf(SocialLogin)).call(this, props));

      _this.isStateless = !WrappedComponent.prototype.render;

      _this.state = {
        isLoaded: false,
        isConnected: false,
        isFetching: false

        // Load required SDK
      };_this.sdk = _sdk2.default[props.provider];
      _this.accessToken = null;
      _this.fetchProvider = props.provider === 'instagram' || props.provider === 'github';
      _this.loadPromise = Promise.resolve();
      _this.node = null;
      _this.onLoginSuccess = _this.onLoginSuccess.bind(_this);
      _this.onLoginFailure = _this.onLoginFailure.bind(_this);
      _this.onLogoutFailure = _this.onLogoutFailure.bind(_this);
      _this.onLogoutSuccess = _this.onLogoutSuccess.bind(_this);
      _this.login = _this.login.bind(_this);
      _this.logout = _this.logout.bind(_this);
      _this.setInstance = _this.setInstance.bind(_this);
      return _this;
    }

    /**
     * Loads SDK on componentDidMount and handles auto login.
     */


    _createClass(SocialLogin, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        var _props = this.props,
            appId = _props.appId,
            autoCleanUri = _props.autoCleanUri,
            autoLogin = _props.autoLogin,
            gatekeeper = _props.gatekeeper,
            redirect = _props.redirect,
            scope = _props.scope,
            version = _props.version,
            providerInitOptions = _props.providerInitOptions;

        this.loadPromise = (0, _cancelable2.default)(this.sdk.load({ appId: appId, redirect: redirect, gatekeeper: gatekeeper, scope: scope, version: version, providerInitOptions: providerInitOptions }).then(function (accessToken) {
          if (autoCleanUri) {
            (0, _utils.cleanLocation)();
          }

          if (accessToken) {
            _this2.accessToken = accessToken;
          }

          _this2.setState(function (prevState) {
            return _extends({}, prevState, {
              isLoaded: true
            });
          }, function () {
            if (autoLogin || _this2.accessToken) {
              if (_this2.fetchProvider && !_this2.accessToken) {
                _this2.sdk.login(appId, redirect).catch(_this2.onLoginFailure);
              } else {
                _this2.sdk.checkLogin(true).then(_this2.onLoginSuccess, _this2.onLoginFailure);
              }
            }
          });

          return null;
        }, this.onLoginFailure));
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _this3 = this;

        var _props2 = this.props,
            appId = _props2.appId,
            gatekeeper = _props2.gatekeeper,
            provider = _props2.provider;


        if (provider === 'github' && !gatekeeper && appId !== nextProps.appId) {
          this.setState(function () {
            return {
              isLoaded: false,
              isFetching: false,
              isConnected: false
            };
          }, function () {
            _this3.sdk.load(nextProps.appId).then(function () {
              _this3.setState(function (prevState) {
                return _extends({}, prevState, {
                  isLoaded: true
                });
              });
            }, _this3.onLoginFailure);
          });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.loadPromise.cancel();
        this.node = null;
      }
    }, {
      key: 'setInstance',
      value: function setInstance(node) {
        this.node = node;

        if (typeof this.props.getInstance === 'function') {
          this.props.getInstance(node);
        }
      }

      /**
       * Triggers login process.
       */

    }, {
      key: 'login',
      value: function login() {
        var _this4 = this;

        if (!navigator.onLine && this.props.onInternetFailure) {
          var shouldSkip = this.props.onInternetFailure();
          if (shouldSkip === false) {
            return;
          }
        }
        if (this.state.isLoaded && !this.state.isConnected && !this.state.isFetching) {
          this.setState(function (prevState) {
            return _extends({}, prevState, {
              isFetching: true
            });
          }, function () {
            _this4.sdk.login().then(_this4.onLoginSuccess, _this4.onLoginFailure);
          });
        } else if (this.state.isLoaded && this.state.isConnected) {
          this.props.onLoginFailure('User already connected');
        } else if (this.state.isLoaded && this.state.isFetching) {
          this.props.onLoginFailure('Fetching user');
        } else if (!this.state.isLoaded) {
          this.props.onLoginFailure('SDK not loaded');
        } else {
          this.props.onLoginFailure('Unknown error');
        }
      }

      /**
       * Create SocialUser on login success and transmit it to onLoginSuccess prop.
       * @param {Object} response
       */

    }, {
      key: 'onLoginSuccess',
      value: function onLoginSuccess(response) {
        var _props3 = this.props,
            onLoginSuccess = _props3.onLoginSuccess,
            provider = _props3.provider;

        var user = new _SocialUser2.default(provider);
        var socialUserData = this.sdk.generateUser(response);

        user.profile = socialUserData.profile;
        user.token = socialUserData.token;

        // Here we check that node is not null,
        // so we can update state before
        // triggering login success function
        if (this.node) {
          this.setState(function (prevState) {
            return _extends({}, prevState, {
              isFetching: false,
              isConnected: true
            });
          }, function () {
            if (typeof onLoginSuccess === 'function') {
              onLoginSuccess(user);
            }
          });
        } else {
          if (typeof onLoginSuccess === 'function') {
            onLoginSuccess(user);
          }
        }
      }

      /**
       * Handles login failure.
       * @param err
       */

    }, {
      key: 'onLoginFailure',
      value: function onLoginFailure(err) {
        var onLoginFailure = this.props.onLoginFailure;


        if (this.node) {
          this.setState(function (prevState) {
            return _extends({}, prevState, {
              isFetching: false,
              isConnected: false
            });
          }, function () {
            if (typeof onLoginFailure === 'function') {
              onLoginFailure(err);
            }
          });
        } else {
          if (typeof onLoginFailure === 'function') {
            onLoginFailure(err);
          }
        }
      }

      /**
       * Triggers logout process.
       */

    }, {
      key: 'logout',
      value: function logout() {
        if (this.state.isLoaded && this.state.isConnected) {
          this.sdk.logout().then(this.onLogoutSuccess, this.onLogoutFailure);
        } else if (this.state.isLoaded && !this.state.isConnected) {
          this.props.onLoginFailure('User not connected');
        } else {
          this.props.onLoginFailure('SDK not loaded');
        }
      }

      /**
       * Handles logout success
       */

    }, {
      key: 'onLogoutSuccess',
      value: function onLogoutSuccess() {
        var onLogoutSuccess = this.props.onLogoutSuccess;


        if (this.node) {
          this.setState(function (prevState) {
            return _extends({}, prevState, {
              isConnected: false
            });
          }, function () {
            if (typeof onLogoutSuccess === 'function') {
              onLogoutSuccess();
            }
          });
        } else {
          if (typeof onLogoutSuccess === 'function') {
            onLogoutSuccess();
          }
        }
      }

      /**
       * Handles logout failure.
       * @param err
       */

    }, {
      key: 'onLogoutFailure',
      value: function onLogoutFailure(err) {
        if (typeof this.props.onLoginFailure === 'function') {
          this.props.onLoginFailure(err);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        // Don’t forward unneeded props
        var originalProps = (0, _utils.omit)(this.props, ['appId', 'scope', 'autoCleanUri', 'autoLogin', 'gatekeeper', 'getInstance', 'onLoginFailure', 'onLoginSuccess', 'onLogoutFailure', 'onLogoutSuccess', 'provider', 'redirect', 'onInternetFailure', 'ref', 'providerInitOptions']);
        var additionnalProps = {};

        if (this.props.onLogoutFailure || this.props.onLogoutSuccess) {
          additionnalProps = {
            triggerLogout: this.logout
          };
        }

        if (!this.isStateless) {
          additionnalProps = _extends({}, additionnalProps, {
            ref: this.setInstance
          });
        }

        return this.state.isLoaded ? _react2.default.createElement(WrappedComponent, _extends({ triggerLogin: this.login }, additionnalProps, originalProps)) : null;
      }
    }]);

    return SocialLogin;
  }(_react.Component), _class.propTypes = {
    appId: _propTypes2.default.string.isRequired,
    autoCleanUri: _propTypes2.default.bool,
    autoLogin: _propTypes2.default.bool,
    gatekeeper: _propTypes2.default.string,
    getInstance: _propTypes2.default.func,
    onLoginFailure: _propTypes2.default.func,
    onLoginSuccess: _propTypes2.default.func,
    onLogoutFailure: _propTypes2.default.func,
    onLogoutSuccess: _propTypes2.default.func,
    onInternetFailure: _propTypes2.default.func,
    provider: _propTypes2.default.oneOf(_config2.default.providers).isRequired,
    redirect: function redirect(props, propName, componentName) {
      if (props.provider === 'instagram' && (!props[propName] || typeof props[propName] !== 'string')) {
        return new Error('Missing required `' + propName + '` prop of type `string` on ' + componentName + '.');
      }
    },
    scope: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
    providerInitOptions: _propTypes2.default.object
  }, _temp;
};

exports.default = SocialLogin;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _sdk = __webpack_require__(4);

var _sdk2 = _interopRequireDefault(_sdk);

var _SocialUser = __webpack_require__(5);

var _SocialUser2 = _interopRequireDefault(_SocialUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SocialLogin = function (_Component) {
  _inherits(SocialLogin, _Component);

  function SocialLogin(props) {
    _classCallCheck(this, SocialLogin);

    var _this = _possibleConstructorReturn(this, (SocialLogin.__proto__ || Object.getPrototypeOf(SocialLogin)).call(this, props));

    _this.id = 'sl' + Math.floor(Math.random() * 0xFFFF);

    _this.handleSocialLoginInvokeSuccess = _this.handleSocialLoginInvokeSuccess.bind(_this);
    _this.handleSocialLoginInvokeFailure = _this.handleSocialLoginInvokeFailure.bind(_this);
    _this.handleLogin = _this.handleLogin.bind(_this);
    return _this;
  }

  _createClass(SocialLogin, [{
    key: 'handleSocialLoginInvokeSuccess',
    value: function handleSocialLoginInvokeSuccess(res) {
      var _props = this.props,
          callback = _props.callback,
          provider = _props.provider;

      // console.log(res)  // Uncomment to check response coming from provider in log

      var user = new _SocialUser2.default();
      var userProfile = void 0;
      var token = void 0;

      switch (provider) {
        case 'google':
          var profile = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
          var authResponse = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true);

          userProfile = {
            id: profile.getId(),
            name: profile.getName(),
            firstName: profile.getGivenName(),
            lastName: profile.getFamilyName(),
            email: profile.getEmail(),
            profilePicURL: profile.getImageUrl()
          };
          token = {
            accessToken: authResponse.access_token,
            idToken: authResponse.id_token,
            scope: authResponse.scope,
            expiresIn: authResponse.expires_in,
            firstIssued_at: authResponse.first_issued_at,
            expiresAt: authResponse.expires_at
          };

          break;
        case 'facebook':
          userProfile = {
            id: res.id,
            name: res.name,
            firstName: res.first_name,
            lastName: res.last_name,
            email: res.email,
            profilePicURL: res.picture.data.url
          };
          token = {
            accessToken: res.authResponse.accessToken,
            expiresAt: res.authResponse.expiresIn
          };

          break;
        case 'linkedin':
          userProfile = {
            id: window.IN.ENV.auth.member_id,
            name: res.values[0].firstName + ' ' + res.values[0].lastName,
            firstName: res.values[0].firstName,
            lastName: res.values[0].lastName,
            email: res.values[0].emailAddress,
            profilePicURL: res.values[0].pictureUrl
          };
          token = {
            accessToken: undefined // Couldn't find a way to fetch token
          };

          var expiresIn = new Date();

          expiresIn.setSeconds(expiresIn.getSeconds() + window.IN.ENV.auth.oauth_expires_in);
          user.token.expiresAt = expiresIn;

          break;
        default:
          throw new Error('Provider \u2019' + provider + '\u2019 isn\u2019t supported.');
      }

      user.provider = provider;
      user.profile = userProfile;
      user.token = token;

      callback(user, null);
    }
  }, {
    key: 'handleSocialLoginInvokeFailure',
    value: function handleSocialLoginInvokeFailure(err) {
      this.props.callback(null, err);
    }
  }, {
    key: 'handleLogin',
    value: function handleLogin(e, obj) {
      var _this2 = this;

      var _props2 = this.props,
          appId = _props2.appId,
          provider = _props2.provider,
          version = _props2.version;

      var handleSuccess = this.handleSocialLoginInvokeSuccess;

      if (provider === 'facebook') {
        window.FB.init({
          appId: appId,
          xfbml: true,
          version: 'v' + version
        });

        // Invoke Facebook Login
        window.FB.login(function (response) {
          var loginResponse = response;

          window.FB.api('/me', { fields: 'email,name,id,first_name,last_name,picture' }, function (profileResponse) {
            Object.assign(profileResponse, loginResponse);

            handleSuccess(profileResponse);
          });
        }, { scope: 'email' });
      } else if (provider === 'linkedin') {
        window.IN.User.authorize(function (data) {
          window.IN.API.Profile('me').fields(['id', 'firstName', 'lastName', 'pictureUrl', 'publicProfileUrl', 'emailAddress']).result(function (profile) {
            handleSuccess(profile);
          }).error(function (err) {
            _this2.handleSocialLoginInvokeFailure(err);
          });
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var appId = this.props.appId;

      if (this.props.provider === 'google') {
        _sdk2.default.google.oldLoad(appId, this.id, this.handleSocialLoginInvokeSuccess, this.handleSocialLoginInvokeFailure);
      } else if (this.props.provider === 'facebook') {
        _sdk2.default.facebook.oldLoad(appId);
      } else if (this.props.provider === 'linkedin') {
        _sdk2.default.linkedin.oldLoad(appId);
      }
    }
  }, {
    key: 'getProfile',
    value: function getProfile() {
      window.IN.API.Profile('me').fields(['id', 'firstName', 'lastName', 'pictureUrl', 'publicProfileUrl', 'emailAddress']).result(function (profile) {
        alert(profile);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: this.id, onClick: this.handleLogin },
        this.props.children
      );
    }
  }]);

  return SocialLogin;
}(_react.Component);

SocialLogin.propTypes = {
  appId: _propTypes2.default.string.isRequired,
  callback: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.element, _propTypes2.default.node]).isRequired,
  provider: _propTypes2.default.oneOf(['facebook', 'google', 'linkedin']).isRequired,
  version: _propTypes2.default.string
};
SocialLogin.defaultProps = {
  version: '2.8'
};
exports.default = SocialLogin;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(10);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = __webpack_require__(0);

var amazonScopes = ['profile'];

/**
 * Loads Amazon SDK.
 * @param {string} appId
 * @param {array|string} scope
 * @see https://developer.amazon.com/public/apis/engage/login-with-amazon/docs/install_sdk_javascript.html
 */
var load = function load(_ref) {
  var appId = _ref.appId,
      scope = _ref.scope;
  return new Promise(function (resolve) {
    // @TODO: handle errors
    if (document.getElementById('amazon-sdk')) {
      return resolve();
    }

    if (Array.isArray(scope)) {
      amazonScopes = amazonScopes.concat(scope);
    } else if (typeof scope === 'string' && scope) {
      amazonScopes = amazonScopes.concat(scope.split(','));
    }

    amazonScopes = amazonScopes.reduce(function (acc, item) {
      if (typeof item === 'string' && acc.indexOf(item) === -1) {
        acc.push(item.trim());
      }

      return acc;
    }, []);

    var firstJS = document.getElementsByTagName('script')[0];
    var js = document.createElement('script');

    js.src = 'https://api-cdn.amazon.com/sdk/login1.js';
    js.id = 'amazon-sdk';
    js.async = true;

    window.onAmazonLoginReady = function () {
      window.amazon.Login.setClientId(appId);

      return resolve();
    };

    if (!firstJS) {
      document.appendChild(js);
    } else {
      firstJS.parentNode.appendChild(js);
    }
  });
};

/**
 * Checks if user is logged in to app through Amazon.
 * Requires SDK to be loaded first.
 * @see https://developer.amazon.com/public/apis/engage/login-with-amazon/docs/javascript_sdk_reference.html#authorize
 */
var checkLogin = function checkLogin() {
  return new Promise(function (resolve, reject) {
    window.amazon.Login.authorize({ scope: amazonScopes }, function (response) {
      if (response.error) {
        return reject((0, _utils.rslError)({
          provider: 'amazon',
          type: 'auth',
          description: 'Authentication failed',
          error: response
        }));
      }

      return getProfile(response).then(resolve, reject);
    });
  });
};

/**
 * Trigger Amazon login process.
 * Requires SDK to be loaded first.
 */
var login = function login() {
  return new Promise(function (resolve, reject) {
    return checkLogin().then(resolve, reject);
  });
};

/**
 * Trigger Amazon logout.
 * Requires SDK to be loaded first.
 * @see https://developer.amazon.com/docs/login-with-amazon/javascript-sdk-reference.html#logout
 */
var logout = function logout() {
  return new Promise(function (resolve) {
    window.amazon.Login.logout();

    return resolve();
  });
};

/**
 * Gets currently logged in user profile data.
 * Requires SDK to be loaded first.
 * @see https://developer.amazon.com/public/apis/engage/login-with-amazon/docs/javascript_sdk_reference.html#retrieveProfile
 */
var getProfile = function getProfile(authResponse) {
  return new Promise(function (resolve, reject) {
    window.amazon.Login.retrieveProfile(authResponse.access_token, function (response) {
      if (response.error) {
        return reject((0, _utils.rslError)({
          provider: 'amazon',
          type: 'get_profile',
          description: 'Failed to get user profile',
          error: response
        }));
      }

      return resolve(_extends({}, authResponse, response));
    });
  });
};

/**
 * Helper to generate user account data.
 * @param {Object} response
 * @see https://developer.amazon.com/public/apis/engage/login-with-amazon/docs/javascript_sdk_reference.html#retrieveProfile
 */
var generateUser = function generateUser(response) {
  return {
    profile: {
      id: response.profile.CustomerId,
      name: response.profile.Name,
      firstName: response.profile.Name,
      lastName: response.profile.Name,
      email: response.profile.PrimaryEmail,
      profilePicURL: undefined // No profile picture available for Amazon provider
    },
    token: {
      accessToken: response.access_token,
      expiresAt: (0, _utils.timestampFromNow)(response.expires_in)
    }
  };
};

exports.default = {
  checkLogin: checkLogin,
  generateUser: generateUser,
  load: load,
  login: login,
  logout: logout
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = __webpack_require__(0);

var facebookScopes = ['public_profile', 'email'];

/**
 * Loads Facebook SDK.
 * @param {string} appId
 * @param {array|string} scope
 * @param {array|string} version
 * @see https://developers.facebook.com/docs/javascript/quickstart
 */
var load = function load(_ref) {
  var appId = _ref.appId,
      scope = _ref.scope,
      version = _ref.version,
      _ref$providerInitOpti = _ref.providerInitOptions,
      providerInitOptions = _ref$providerInitOpti === undefined ? {} : _ref$providerInitOpti;
  return new Promise(function (resolve) {
    // @TODO: handle errors
    if (document.getElementById('facebook-jssdk')) {
      return resolve();
    }

    if (Array.isArray(scope)) {
      facebookScopes = facebookScopes.concat(scope);
    } else if (typeof scope === 'string' && scope) {
      facebookScopes = facebookScopes.concat(scope.split(','));
    }

    facebookScopes = facebookScopes.reduce(function (acc, item) {
      if (typeof item === 'string' && acc.indexOf(item) === -1) {
        acc.push(item.trim());
      }

      return acc;
    }, []).join(',');

    var firstJS = document.getElementsByTagName('script')[0];
    var js = document.createElement('script');

    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    js.id = 'facebook-jssdk';

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        xfbml: true,
        version: version || 'v5.0',
        providerInitOptions: {}
      });

      return resolve();
    };

    if (!firstJS) {
      document.appendChild(js);
    } else {
      firstJS.parentNode.appendChild(js);
    }
  });
};

/**
 * Gets Facebook user profile if connected.
 * @param {Object} response
 */
var handleLoginStatus = function handleLoginStatus(response) {
  return new Promise(function (resolve, reject) {
    if (!response.authResponse) {
      return reject((0, _utils.rslError)({
        provider: 'facebook',
        type: 'auth',
        description: 'Authentication failed',
        error: response
      }));
    }

    switch (response.status) {
      case 'connected':
        getProfile().then(function (profile) {
          return resolve(_extends({}, profile, response.authResponse));
        });

        break;
      case 'not_authorized':
      case 'unknown':
        return reject((0, _utils.rslError)({
          provider: 'facebook',
          type: 'auth',
          description: 'Authentication has been cancelled or an unknown error occurred',
          error: response
        }));
    }
  });
};

/**
 * Checks if user is logged in to app through Facebook.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/
 */
var checkLogin = function checkLogin() {
  return new Promise(function (resolve, reject) {
    window.FB.getLoginStatus(function (response) {
      return handleLoginStatus(response).then(resolve, reject);
    });
  });
};

/**
 * Trigger Facebook login popup.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/docs/reference/javascript/FB.login/v2.9
 */
var login = function login() {
  return new Promise(function (resolve, reject) {
    window.FB.login(function (response) {
      return handleLoginStatus(response).then(resolve, reject);
    }, { scope: facebookScopes });
  });
};

/**
 * Trigger Facebook logout.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/docs/reference/javascript/FB.logout
 */
var logout = function logout() {
  return new Promise(function (resolve) {
    window.FB.logout(resolve);
  });
};

/**
 * Gets currently logged in user profile data.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/tools/explorer?method=GET&path=me%3Ffields%3Demail%2Cname%2Cid%2Cfirst_name%2Clast_name%2Cpicture&version=v2.9
 */
var getProfile = function getProfile() {
  return new Promise(function (resolve) {
    window.FB.api('/me', 'GET', {
      fields: 'email,name,id,first_name,last_name,picture'
    }, resolve);
  });
};

/**
 * Helper to generate user account data.
 * @param {Object} response
 */
var generateUser = function generateUser(response) {
  return {
    profile: {
      id: response.id,
      name: response.name,
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
      profilePicURL: response.picture.data.url
    },
    token: {
      accessToken: response.accessToken,
      expiresAt: (0, _utils.timestampFromNow)(response.expiresIn)
    }
  };
};

var oldLoad = function oldLoad(appId) {
  var id = 'fb-client';
  var fjs = document.getElementsByTagName('script')[0];
  var js = void 0;

  if (document.getElementById(id)) {
    return;
  }

  js = document.createElement('script');

  js.id = id;
  js.src = '//connect.facebook.net/en_US/all.js';

  js.onLoad = function () {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        xfbml: true,
        version: 'v3.3'
      });
    };
  };

  fjs.parentNode.insertBefore(js, fjs);
};

exports.default = {
  checkLogin: checkLogin,
  generateUser: generateUser,
  load: load,
  login: login,
  logout: logout,
  oldLoad: oldLoad
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = __webpack_require__(14);

var _v2 = _interopRequireDefault(_v);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GITHUB_API = 'https://api.github.com/graphql';

var oauth = false;
var gatekeeperURL = void 0;
var githubAccessToken = void 0;
var githubAppId = void 0;
var githubAuth = void 0;

// Load fetch polyfill for browsers not supporting fetch API
if (typeof window !== 'undefined' && !window.fetch) {
  __webpack_require__(1);
}

/**
 * Fake Github SDK loading (needed to trick RSL into thinking its loaded).
 * @param {string} appId
 * @param {string} gatekeeper
 * @param {string} redirect
 * @param {array|string} scope
 */
var load = function load(_ref) {
  var appId = _ref.appId,
      gatekeeper = _ref.gatekeeper,
      redirect = _ref.redirect,
      scope = _ref.scope;
  return new Promise(function (resolve, reject) {
    if (!appId) {
      return reject((0, _utils.rslError)({
        provider: 'github',
        type: 'load',
        description: 'Cannot load SDK without appId',
        error: null
      }));
    }

    githubAppId = appId;

    if (gatekeeper) {
      gatekeeperURL = gatekeeper;
      oauth = true;

      var _redirect = (0, _utils.parseAsURL)(redirect);
      var searchParams = 'rslCallback=github';
      var githubScopes = ['user'];

      if (Array.isArray(scope)) {
        githubScopes = scope;
      } else if (typeof scope === 'string' && scope) {
        githubScopes = scope.split(',');
      }

      githubScopes = githubScopes.reduce(function (acc, item) {
        if (typeof item === 'string' && acc.indexOf(item) === -1) {
          acc.push(item.trim());
        }

        return acc;
      }, []).join('%20');

      _redirect.search = _redirect.search ? _redirect.search + '&' + searchParams : '?' + searchParams;

      githubAuth = 'https://github.com/login/oauth/authorize?client_id=' + githubAppId + '&redirect_uri=' + encodeURIComponent(_redirect.toString()) + '&scope=' + githubScopes + '&state=' + (0, _v2.default)(redirect, _v2.default.URL);

      if ((0, _utils.getQueryStringValue)('rslCallback') === 'github') {
        getAccessToken().then(function (accessToken) {
          githubAccessToken = accessToken;

          return resolve(githubAccessToken);
        }).catch(reject);
      } else {
        return resolve();
      }
    } else {
      return resolve();
    }
  });
};

/**
 * Check if user is logged in to app through GitHub.
 * @see https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/#redirect-urls
 */
var checkLogin = function checkLogin() {
  var autoLogin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (autoLogin) {
    return login();
  }

  if (!githubAccessToken && oauth) {
    return Promise.reject((0, _utils.rslError)({
      provider: 'github',
      type: 'access_token',
      description: 'No access token available',
      error: null
    }));
  }

  return new Promise(function (resolve, reject) {
    window.fetch(GITHUB_API, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Bearer ' + (githubAccessToken || githubAppId)
      }),
      body: JSON.stringify({ query: 'query { viewer { login, name, email, avatarUrl, id } }' })
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.message || json.errors) {
        return reject((0, _utils.rslError)({
          provider: 'github',
          type: 'check_login',
          description: 'Failed to fetch user data',
          error: json
        }));
      }

      return resolve(json);
    }).catch(function () {
      return reject((0, _utils.rslError)({
        provider: 'github',
        type: 'check_login',
        description: 'Failed to fetch user data due to window.fetch() error',
        error: null
      }));
    });
  });
};

/**
 * Trigger GitHub login process.
 * This code only triggers login request, response is handled by a callback handled on SDK load.
 * @see https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps
 */
var login = function login() {
  return new Promise(function (resolve, reject) {
    checkLogin().then(function (response) {
      return resolve(response);
    }).catch(function (error) {
      if (!oauth) {
        return reject(error);
      }

      window.open(githubAuth, '_self');
    });
  });
};

/**
 * Fake GitHub logout always throwing error.
 */
var logout = function logout() {
  return new Promise(function (resolve, reject) {
    return reject((0, _utils.rslError)({
      provider: 'github',
      type: 'logout',
      description: 'Cannot logout from github provider',
      error: null
    }));
  });
};

/**
 * Get access token with authorization code
 * @see https://github.com/prose/gatekeeper
 * @see https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps
 */
var getAccessToken = function getAccessToken() {
  return new Promise(function (resolve, reject) {
    var authorizationCode = (0, _utils.getQueryStringValue)('code');

    if (!authorizationCode) {
      return reject(new Error('Authorization code not found'));
    }

    window.fetch(gatekeeperURL + '/authenticate/' + authorizationCode).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.error || !json.token) {
        return reject((0, _utils.rslError)({
          provider: 'github',
          type: 'access_token',
          description: 'Got error from fetch access token',
          error: json
        }));
      }

      return resolve(json.token);
    }).catch(function (error) {
      return reject((0, _utils.rslError)({
        provider: 'github',
        type: 'access_token',
        description: 'Failed to fetch user data due to window.fetch() error',
        error: error
      }));
    });
  });
};

/**
 * Helper to generate user account data.
 * @param {Object} viewer
 * @see About token expiration: https://gist.github.com/technoweenie/419219#gistcomment-3232
 */
var generateUser = function generateUser(_ref2) {
  var viewer = _ref2.data.viewer;

  return {
    profile: {
      id: viewer.id,
      name: viewer.login,
      firstName: viewer.name,
      lastName: viewer.name,
      email: viewer.email,
      profilePicURL: viewer.avatarUrl
    },
    token: {
      accessToken: githubAccessToken || githubAppId,
      expiresAt: Infinity
    }
  };
};

exports.default = {
  checkLogin: checkLogin,
  generateUser: generateUser,
  load: load,
  login: login,
  logout: logout
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var sha1 = __webpack_require__(15);
var bytesToUuid = __webpack_require__(16);

function uuidToBytes(uuid) {
  // Note: We assume we're being passed a valid uuid string
  var bytes = [];
  uuid.replace(/[a-fA-F0-9]{2}/g, function(hex) {
    bytes.push(parseInt(hex, 16));
  });

  return bytes;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape
  var bytes = new Array(str.length);
  for (var i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

function v5(name, namespace, buf, offset) {
  if (typeof(name) == 'string') name = stringToBytes(name);
  if (typeof(namespace) == 'string') namespace = uuidToBytes(namespace);

  if (!Array.isArray(name)) throw TypeError('name must be an array of bytes');
  if (!Array.isArray(namespace) || namespace.length != 16) throw TypeError('namespace must be uuid string or an Array of 16 byte values');

  // Per 4.3
  var bytes = sha1(namespace.concat(name));
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return buf || bytesToUuid(bytes);
}

// Pre-defined namespaces, per Appendix C
v5.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
v5.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

module.exports = v5;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html


function f(s, x, y, z) {
  switch (s) {
    case 0: return (x & y) ^ (~x & z);
    case 1: return x ^ y ^ z;
    case 2: return (x & y) ^ (x & z) ^ (y & z);
    case 3: return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return (x << n) | (x>>> (32 - n));
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof(bytes) == 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
    bytes = new Array(msg.length);
    for (var i = 0; i < msg.length; i++) bytes[i] = msg.charCodeAt(i);
  }

  bytes.push(0x80);

  var l = bytes.length/4 + 2;
  var N = Math.ceil(l/16);
  var M = new Array(N);

  for (var i=0; i<N; i++) {
    M[i] = new Array(16);
    for (var j=0; j<16; j++) {
      M[i][j] =
        bytes[i * 64 + j * 4] << 24 |
        bytes[i * 64 + j * 4 + 1] << 16 |
        bytes[i * 64 + j * 4 + 2] << 8 |
        bytes[i * 64 + j * 4 + 3];
    }
  }

  M[N - 1][14] = ((bytes.length - 1) * 8) /
    Math.pow(2, 32); M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = ((bytes.length - 1) * 8) & 0xffffffff;

  for (var i=0; i<N; i++) {
    var W = new Array(80);

    for (var t=0; t<16; t++) W[t] = M[i][t];
    for (var t=16; t<80; t++) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4];

    for (var t=0; t<80; t++) {
      var s = Math.floor(t/20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
  }

  return [
    H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff,
    H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff,
    H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff,
    H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff,
    H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff
  ];
}

module.exports = sha1;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = __webpack_require__(0);

/**
 * Loads Google SDK.
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientloadname--------version--------callback
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2initparams
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2getauthinstance
 */
var load = function load(_ref) {
  var appId = _ref.appId,
      scope = _ref.scope,
      _ref$providerInitOpti = _ref.providerInitOptions,
      providerInitOptions = _ref$providerInitOpti === undefined ? {} : _ref$providerInitOpti;
  return new Promise(function (resolve, reject) {
    var firstJS = document.getElementsByTagName('script')[0];
    var js = document.createElement('script');

    js.src = 'https://apis.google.com/js/api.js';
    js.id = 'gapi-client';

    js.onload = function () {
      window.gapi.load('auth2', function () {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(_extends({
            client_id: appId,
            fetchBasicProfile: true,
            scope: scope ? Array.isArray(scope) && scope.join(' ') || scope : null
          }, providerInitOptions)).then(function () {
            return resolve();
          }, function (err) {
            return reject((0, _utils.rslError)({
              provider: 'google',
              type: 'load',
              description: 'Failed to load SDK',
              error: err
            }));
          });
        } else {
          resolve();
        }
      });
    };

    if (!firstJS) {
      document.appendChild(js);
    } else {
      firstJS.parentNode.appendChild(js);
    }
  });
};

/**
 * Checks if user is logged in to app through Google.
 * Requires SDK to be loaded first.
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2getauthinstance
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthissignedinget
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthcurrentuserget
 */
var checkLogin = function checkLogin() {
  return new Promise(function (resolve, reject) {
    var GoogleAuth = window.gapi.auth2.getAuthInstance();

    if (!GoogleAuth.isSignedIn.get()) {
      return reject((0, _utils.rslError)({
        provider: 'google',
        type: 'check_login',
        description: 'Not authenticated',
        error: null
      }));
    }

    return resolve(GoogleAuth.currentUser.get());
  });
};

/**
 * Trigger Google login process.
 * Requires SDK to be loaded first.
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2getauthinstance
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthsignin
 */
var login = function login() {
  return new Promise(function (resolve, reject) {
    var GoogleAuth = window.gapi.auth2.getAuthInstance();

    GoogleAuth.signIn().then(function () {
      return checkLogin().then(resolve, reject);
    }, function (err) {
      return reject((0, _utils.rslError)({
        provider: 'google',
        type: 'auth',
        description: 'Authentication failed',
        error: err
      }));
    });
  });
};

/**
 * Trigger Google logout.
 * Requires SDK to be loaded first.
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthsignout
 */
var logout = function logout() {
  return new Promise(function (resolve, reject) {
    var GoogleAuth = window.gapi.auth2.getAuthInstance();

    GoogleAuth.signOut().then(resolve, reject);
  });
};

/**
 * Helper to generate user account data.
 * @param {Object} response
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetbasicprofile
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetauthresponseincludeauthorizationdata
 */
var generateUser = function generateUser(response) {
  var gender = '';
  var profile = response.getBasicProfile();
  var authResponse = response.getAuthResponse(true);

  // Need to get gender if defined within scope
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + authResponse.access_token, false);
  xmlHttp.send(null);
  if (xmlHttp.status === 200) {
    var strJSON = xmlHttp.responseText;
    var objJSON = JSON.parse(strJSON);
    gender = objJSON.gender;
  }

  return {
    profile: {
      id: profile.getId(),
      name: profile.getName(),
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      email: profile.getEmail(),
      profilePicURL: profile.getImageUrl(),
      gender: gender
    },
    token: {
      accessToken: authResponse.access_token,
      idToken: authResponse.id_token,
      scope: authResponse.scope,
      expiresIn: authResponse.expires_in,
      firstIssued_at: authResponse.first_issued_at,
      expiresAt: authResponse.expires_at
    }
  };
};

var oldLoad = function oldLoad(appId, cid, fn, err) {
  var js = document.createElement('script');

  js.src = 'https://apis.google.com/js/api.js';
  js.id = 'gapi-client';

  js.onload = function () {
    window.gapi.load('auth2', function () {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({
          client_id: appId
        });
      }

      window.gapi.auth2.getAuthInstance().attachClickHandler(cid, {}, fn, err);
    });
  };

  if (document.getElementsByTagName('script').length === 0) {
    document.appendChild(js);
  } else {
    document.getElementsByTagName('script')[0].parentNode.appendChild(js);
  }
};

exports.default = {
  checkLogin: checkLogin,
  generateUser: generateUser,
  load: load,
  login: login,
  logout: logout,
  oldLoad: oldLoad
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchJsonp = __webpack_require__(19);

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INSTAGRAM_API = 'https://api.instagram.com/v1';

var instagramAuth = void 0;
var instagramAccessToken = void 0;

/**
 * @param {string} appId
 * @param {string} redirect
 * @param {array|string} scope
 * Fake Instagram SDK loading (needed to trick RSL into thinking its loaded).
 */
var load = function load(_ref) {
  var appId = _ref.appId,
      redirect = _ref.redirect,
      scope = _ref.scope;
  return new Promise(function (resolve, reject) {
    var _redirect = (0, _utils.parseAsURL)(redirect);
    var searchParams = 'rslCallback=instagram';
    var instagramScopes = ['user_profile'];

    if (Array.isArray(scope)) {
      instagramScopes = instagramScopes.concat(scope);
    } else if (typeof scope === 'string' && scope) {
      instagramScopes = instagramScopes.concat(scope.split(','));
    }

    instagramScopes = instagramScopes.reduce(function (acc, item) {
      if (typeof item === 'string' && acc.indexOf(item) === -1) {
        acc.push(item.trim());
      }

      return acc;
    }, []).join('+');

    _redirect.search = _redirect.search ? _redirect.search + '&' + searchParams : '?' + searchParams;

    instagramAuth = 'https://api.instagram.com/oauth/authorize/?client_id=' + appId + '&scope=' + instagramScopes + '&redirect_uri=' + encodeURIComponent(_redirect.toString()) + '&response_type=code';

    if ((0, _utils.getQueryStringValue)('rslCallback') === 'instagram') {
      if ((0, _utils.getQueryStringValue)('error')) {
        return reject((0, _utils.rslError)({
          provider: 'instagram',
          type: 'auth',
          description: 'Authentication failed',
          error: {
            error_reason: (0, _utils.getQueryStringValue)('error_reason'),
            error_description: (0, _utils.getQueryStringValue)('error_description')
          }
        }));
      } else {
        instagramAccessToken = (0, _utils.getHashValue)('access_token');
      }
    }

    return resolve(instagramAccessToken);
  });
};

/**
 * Checks if user is logged in to app through Instagram.
 * @see https://www.instagram.com/developer/endpoints/users/#get_users_self
 */
var checkLogin = function checkLogin() {
  var autoLogin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (autoLogin) {
    return login();
  }

  if (!instagramAccessToken) {
    return Promise.reject((0, _utils.rslError)({
      provider: 'instagram',
      type: 'access_token',
      description: 'No access token available',
      error: null
    }));
  }

  return new Promise(function (resolve, reject) {
    (0, _fetchJsonp2.default)(INSTAGRAM_API + '/users/self/?access_token=' + instagramAccessToken).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.meta.code !== 200) {
        return reject((0, _utils.rslError)({
          provider: 'instagram',
          type: 'check_login',
          description: 'Failed to fetch user data',
          error: json.meta
        }));
      }

      return resolve({ data: json.data, accessToken: instagramAccessToken });
    }).catch(function (err) {
      return reject({ // eslint-disable-line prefer-promise-reject-errors
        fetchErr: true,
        err: (0, _utils.rslError)({
          provider: 'instagram',
          type: 'check_login',
          description: 'Failed to fetch user data due to fetch error',
          error: err
        })
      });
    });
  });
};

/**
 * Trigger Instagram login process.
 * This code only triggers login request, response is handled by a callback handled on SDK load.
 * @see https://www.instagram.com/developer/authentication/
 */
var login = function login() {
  return new Promise(function (resolve, reject) {
    checkLogin().then(function (response) {
      return resolve(response);
    }).catch(function (err) {
      if (!err.fetchErr) {
        window.open(instagramAuth, '_self');
      } else {
        return reject(err.err);
      }
    });
  });
};

/**
 * Fake Instagram logout.
 */
var logout = function logout() {
  return new Promise(function (resolve) {
    instagramAccessToken = undefined;

    return resolve();
  });
};

/**
 * Helper to generate user account data.
 * @param {Object} data
 * @see About token expiration: https://www.instagram.com/developer/authentication/
 * @see Instagram API doesn’t provide email: https://www.instagram.com/developer/endpoints/users/#get_users_self
 */
var generateUser = function generateUser(data) {
  return {
    profile: {
      id: data.data.id,
      name: data.data.full_name,
      firstName: data.data.full_name,
      lastName: data.data.full_name,
      email: undefined,
      profilePicURL: data.data.profile_picture
    },
    token: {
      accessToken: data.accessToken,
      expiresAt: Infinity
    }
  };
};

exports.default = {
  checkLogin: checkLogin,
  generateUser: generateUser,
  load: load,
  login: login,
  logout: logout
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.fetchJsonp = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  }

  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    var timeoutId = undefined;

    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        removeScript(scriptId);

        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      if (options.charset) {
        jsonpScript.setAttribute('charset', options.charset);
      }
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        window[callbackFunction] = function () {
          clearFunction(callbackFunction);
        };
      }, timeout);

      // Caught if got 404/500
      jsonpScript.onerror = function () {
        reject(new Error('JSONP request to ' + _url + ' failed'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

/**
 * Loads LinkedIn SDK.
 * @param {string} appId
 */
var load = function load(_ref) {
  var appId = _ref.appId;
  return new Promise(function (resolve) {
    // @TODO: handle errors
    if (document.getElementById('linkedin-client')) {
      return resolve();
    }

    var firstJS = document.getElementsByTagName('script')[0];
    var js = document.createElement('script');

    js.src = '//platform.linkedin.com/in.js?async=true';
    js.id = 'linkedin-client';

    js.onload = function () {
      window.IN.init({
        api_key: appId
      });

      return resolve();
    };

    if (!firstJS) {
      document.appendChild(js);
    } else {
      firstJS.parentNode.appendChild(js);
    }
  });
};

/**
 * Checks if user is logged in to app through LinkedIn.
 * Requires SDK to be loaded first.
 * @see https://developer.linkedin.com/docs/getting-started-js-sdk
 */
var checkLogin = function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (!window.IN.User.isAuthorized()) {
      return reject((0, _utils.rslError)({
        provider: 'linkedin',
        type: 'check_login',
        description: 'Not authenticated',
        error: null
      }));
    }

    return getProfile().then(resolve, reject);
  });
};

/**
 * Trigger LinkedIn login popup.
 * Requires SDK to be loaded first.
 * @see https://developer.linkedin.com/docs/getting-started-js-sdk
 */
var login = function login() {
  return new Promise(function (resolve, reject) {
    window.IN.User.authorize(function () {
      return checkLogin().then(getProfile).then(resolve).catch(reject);
    });
  });
};

/**
 * Trigger LinkedIn logout.
 * Requires SDK to be loaded first.
 * @see https://developer.linkedin.com/docs/getting-started-js-sdk Section Additional SDK functions - Log the user out
 */
var logout = function logout() {
  return new Promise(function (resolve) {
    window.IN.User.logout(resolve);
  });
};

/**
 * Gets currently logged in user profile data.
 * Requires SDK to be loaded first.
 * @see https://developer.linkedin.com/docs/getting-started-js-sdk
 */
var getProfile = function getProfile() {
  return new Promise(function (resolve, reject) {
    window.IN.API.Profile('me').fields(['id', 'firstName', 'lastName', 'pictureUrl', 'publicProfileUrl', 'emailAddress']).result(resolve).error(function (err) {
      return reject((0, _utils.rslError)({
        provider: 'linkedin',
        type: 'get_profile',
        description: 'Failed to get user profile',
        error: err
      }));
    });
  });
};

/**
 * Helper to generate user account data.
 * @param {Object} response
 */
var generateUser = function generateUser(response) {
  return {
    profile: {
      id: window.IN.ENV.auth.member_id,
      name: response.values[0].firstName + ' ' + response.values[0].lastName,
      firstName: response.values[0].firstName,
      lastName: response.values[0].lastName,
      email: response.values[0].emailAddress,
      publicProfileURL: response.values[0].publicProfileUrl,
      profilePicURL: response.values[0].pictureUrl
    },
    token: {
      accessToken: window.IN.ENV.auth.oauth_token,
      expiresAt: (0, _utils.timestampFromNow)(window.IN.ENV.auth.oauth_expires_in)
    }
  };
};

var oldLoad = function oldLoad(appId) {
  var id = 'li-client';
  var fjs = document.getElementsByTagName('script')[0];
  var js = void 0;

  if (document.getElementById(id)) {
    return;
  }

  js = document.createElement('script');

  js.id = id;
  js.src = '//platform.linkedin.com/in.js?async=true';

  js.onload = function () {
    window.IN.init({
      api_key: appId,
      authorize: true
    });
  };

  fjs.parentNode.insertBefore(js, fjs);
};

exports.default = {
  checkLogin: checkLogin,
  generateUser: generateUser,
  load: load,
  login: login,
  logout: logout,
  oldLoad: oldLoad
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  providers: ['amazon', 'facebook', 'github', 'google', 'instagram', 'linkedin']
};

exports.default = config;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (promise) {
  var hasCanceled_ = false;

  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return hasCanceled_ ? reject(new Error({ isCanceled: true })) : resolve(val);
    });
    promise.catch(function (error) {
      return hasCanceled_ ? reject(new Error({ isCanceled: true })) : reject(error);
    });
  });

  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      hasCanceled_ = true;
    }
  };
};

/***/ })
/******/ ]);
});