(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__) {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 4 */
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
      profilePicUrl: undefined
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  providers: ['facebook', 'google', 'linkedin']
};

exports.default = config;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _facebook = __webpack_require__(13);

var _facebook2 = _interopRequireDefault(_facebook);

var _google = __webpack_require__(14);

var _google2 = _interopRequireDefault(_google);

var _linkedin = __webpack_require__(15);

var _linkedin2 = _interopRequireDefault(_linkedin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  google: _google2.default,
  facebook: _facebook2.default,
  linkedin: _linkedin2.default
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(18)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(17)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(1);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _config = __webpack_require__(5);

var _config2 = _interopRequireDefault(_config);

var _sdk = __webpack_require__(6);

var _sdk2 = _interopRequireDefault(_sdk);

var _SocialUser = __webpack_require__(4);

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
  provider: _propTypes2.default.oneOf(_config2.default.providers).isRequired,
  version: _propTypes2.default.string
};
SocialLogin.defaultProps = {
  version: '2.8'
};
exports.default = SocialLogin;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OldSocialLogin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(10);

Object.defineProperty(exports, 'OldSocialLogin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_component).default;
  }
});

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _config = __webpack_require__(5);

var _config2 = _interopRequireDefault(_config);

var _sdk = __webpack_require__(6);

var _sdk2 = _interopRequireDefault(_sdk);

var _SocialUser = __webpack_require__(4);

var _SocialUser2 = _interopRequireDefault(_SocialUser);

var _utils = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

      _this.state = {
        isLoaded: false,
        isConnected: false,
        isFetching: false
        // Load required SDK
      };_this.sdk = _sdk2.default[props.provider];

      _this.onLoginSuccess = _this.onLoginSuccess.bind(_this);
      _this.onLoginFailure = _this.onLoginFailure.bind(_this);
      _this.login = _this.login.bind(_this);
      return _this;
    }

    /**
     * Loads SDK on componentDidMount and handles auto login.
     */


    _createClass(SocialLogin, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        this.sdk.load(this.props.appId).then(function () {
          return _this2.setState(function (prevState) {
            return _extends({}, prevState, {
              isLoaded: true
            });
          }, function () {
            if (_this2.props.autoLogin) {
              _this2.sdk.checkLogin().then(function (authResponse) {
                _this2.onLoginSuccess(authResponse);
              });
            }
          });
        });
      }

      /**
       * Triggers login process.
       */

    }, {
      key: 'login',
      value: function login() {
        var _this3 = this;

        if (this.state.isLoaded && !this.state.isConnected && !this.state.isFetching) {
          this.setState(function (prevState) {
            return _extends({}, prevState, {
              isFetching: true
            });
          });

          this.sdk.login().then(function (response) {
            return _this3.onLoginSuccess(response);
          }).catch(function () {
            return _this3.onLoginFailure('Login failed');
          });
        } else if (this.state.isLoaded && this.state.isConnected) {
          this.props.onLoginFailure('User already connected');
        } else {
          this.props.onLoginFailure('SDK not loaded');
        }
      }

      /**
       * Create SocialUser on login success and transmit it to onLoginSuccess prop.
       * @param {Object} response
       */

    }, {
      key: 'onLoginSuccess',
      value: function onLoginSuccess(response) {
        var _props = this.props,
            onLoginSuccess = _props.onLoginSuccess,
            provider = _props.provider;

        var user = new _SocialUser2.default(provider);
        var socialUserData = this.sdk.generateUser(response);

        this.setState(function (prevState) {
          return _extends({}, prevState, {
            isFetching: false,
            isConnected: true
          });
        });

        user.profile = socialUserData.profile;
        user.token = socialUserData.token;

        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess(user);
        }
      }

      /**
       * Handles login failure.
       * @param err
       */

    }, {
      key: 'onLoginFailure',
      value: function onLoginFailure(err) {
        this.setState(function (prevState) {
          return _extends({}, prevState, {
            isFetching: false,
            isConnected: false
          });
        });

        if (typeof this.props.onLoginFailure === 'function') {
          this.props.onLoginFailure(err);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        // Don’t forward unneeded props
        var originalProps = (0, _utils.omit)(this.props, ['appId', 'autoLogin', 'onLoginFailure', 'onLoginSuccess', 'provider']);

        return _react2.default.createElement(WrappedComponent, _extends({ triggerLogin: this.login }, originalProps));
      }
    }]);

    return SocialLogin;
  }(_react.Component), _class.propTypes = {
    appId: _propTypes2.default.string.isRequired,
    autoLogin: _propTypes2.default.bool,
    onLoginFailure: _propTypes2.default.func,
    onLoginSuccess: _propTypes2.default.func,
    provider: _propTypes2.default.oneOf(_config2.default.providers).isRequired
  }, _temp;
};

exports.default = SocialLogin;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Loads Facebook SDK.
 * @param {string} appId
 * @see https://developers.facebook.com/docs/javascript/quickstart
 */
var load = function load(appId) {
  return new Promise(function (resolve, reject) {
    // @TODO: handle errors
    if (document.getElementById('facebook-jssdk')) {
      return resolve();
    }

    var firstJS = document.getElementsByTagName('script')[0];
    var js = document.createElement('script');

    js.src = '//connect.facebook.net/en_US/sdk.js';
    js.id = 'facebook-jssdk';

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        xfbml: true,
        version: 'v2.9'
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
      return reject();
    }

    switch (response.status) {
      case 'connected':
        getProfile().then(function (profile) {
          return resolve(_extends({}, profile, response.authResponse));
        });

        break;
      case 'not_authorized':
      case 'unknown':
        return reject();
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
    });
  });
};

/**
 * Gets currently logged in user profile data.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/tools/explorer?method=GET&path=me%3Ffields%3Demail%2Cname%2Cid%2Cfirst_name%2Clast_name%2Cpicture&version=v2.9
 */
var getProfile = function getProfile() {
  return new Promise(function (resolve, reject) {
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
      accessToken: response.authResponse.accessToken,
      expiresAt: response.authResponse.expiresIn
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
        version: 'v2.8'
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
  oldLoad: oldLoad
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Loads Google SDK.
 * @param {string} appId
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientloadname--------version--------callback
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2initparams
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2getauthinstance
 */
var load = function load(appId) {
  return new Promise(function (resolve, reject) {
    var firstJS = document.getElementsByTagName('script')[0];
    var js = document.createElement('script');

    js.src = '//apis.google.com/js/platform.js';
    js.id = 'gapi-client';

    js.onload = function () {
      window.gapi.load('auth2', function () {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init({
            client_id: appId
          }).then(function () {
            return resolve();
          }, function () {
            return reject();
          });
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
      return reject();
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
    }, function () {
      return reject();
    });
  });
};

/**
 * Helper to generate user account data.
 * @param {Object} response
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetbasicprofile
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetauthresponseincludeauthorizationdata
 */
var generateUser = function generateUser(response) {
  var profile = response.getBasicProfile();
  var authResponse = response.getAuthResponse(true);

  return {
    profile: {
      id: profile.getId(),
      name: profile.getName(),
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      email: profile.getEmail(),
      profilePicURL: profile.getImageUrl()
    },
    token: {
      accessToken: authResponse.access_token,
      expiresAt: authResponse.expires_at
    }
  };
};

var oldLoad = function oldLoad(appId, cid, fn, err) {
  var js = document.createElement('script');

  js.src = 'https://apis.google.com/js/platform.js';
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
  oldLoad: oldLoad
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Loads LinkedIn SDK.
 * @param {string} appId
 */
var load = function load(appId) {
  return new Promise(function (resolve, reject) {
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
      return reject();
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
 * Gets currently logged in user profile data.
 * Requires SDK to be loaded first.
 * @see https://developer.linkedin.com/docs/getting-started-js-sdk
 */
var getProfile = function getProfile() {
  return new Promise(function (resolve, reject) {
    window.IN.API.Profile('me').fields(['id', 'firstName', 'lastName', 'pictureUrl', 'publicProfileUrl', 'emailAddress']).result(resolve).error(reject);
  });
};

/**
 * Helper to generate user account data.
 * @param {Object} response
 */
var generateUser = function generateUser(response) {
  var expiresAt = new Date();

  return {
    profile: {
      id: window.IN.ENV.auth.member_id,
      name: response.values[0].firstName + ' ' + response.values[0].lastName,
      firstName: response.values[0].firstName,
      lastName: response.values[0].lastName,
      email: response.values[0].emailAddress,
      profilePicURL: response.values[0].pictureUrl
    },
    token: {
      accessToken: undefined, // Couldn't find a way to fetch token
      expiresAt: expiresAt.setSeconds(expiresAt.getSeconds() + window.IN.ENV.auth.oauth_expires_in)
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
  oldLoad: oldLoad
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(9);
  var ReactPropTypesSecret = __webpack_require__(3);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var ReactPropTypesSecret = __webpack_require__(3);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
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
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var warning = __webpack_require__(9);

var ReactPropTypesSecret = __webpack_require__(3);
var checkPropTypes = __webpack_require__(16);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
});