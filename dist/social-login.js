(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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
var config = {
  providers: ['facebook', 'google', 'linkedin']
};

exports.default = config;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _facebook = __webpack_require__(3);

var _facebook2 = _interopRequireDefault(_facebook);

var _google = __webpack_require__(4);

var _google2 = _interopRequireDefault(_google);

var _linkedin = __webpack_require__(5);

var _linkedin2 = _interopRequireDefault(_linkedin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  google: _google2.default,
  facebook: _facebook2.default,
  linkedin: _linkedin2.default
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var facebookSDKLoader = function facebookSDKLoader(d, cid, appId, fn, err) {
  var id = 'fb-client';
  var fjs = d.getElementsByTagName('script')[0];
  var js = void 0;

  if (d.getElementById(id)) {
    return;
  }

  js = d.createElement('script');

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

exports.default = facebookSDKLoader;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var googleSDKLoader = function googleSDKLoader(d, cid, appId, fn, err) {
  var js = d.createElement('script');

  js.src = 'https://apis.google.com/js/platform.js';
  js.id = 'gapi-client';

  js.onload = function () {
    window.gapi.load('auth2', function () {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({ client_id: appId });
      }

      window.gapi.auth2.getAuthInstance().attachClickHandler(cid, {}, fn, err);
    });
  };

  if (document.getElementsByTagName('script').length === 0) {
    d.appendChild(js);
  } else {
    document.getElementsByTagName('script')[0].parentNode.appendChild(js);
  }
};

exports.default = googleSDKLoader;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var linkedInSDKLoader = function linkedInSDKLoader(d, cid, appId, fn, err) {
  var id = 'li-client';
  var fjs = d.getElementsByTagName('script')[0];
  var js = void 0;

  if (d.getElementById(id)) {
    return;
  }

  js = d.createElement('script');

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

exports.default = linkedInSDKLoader;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _loaders = __webpack_require__(1);

var _loaders2 = _interopRequireDefault(_loaders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocialUser = function () {
  function SocialUser() {
    _classCallCheck(this, SocialUser);

    this._provider = undefined;

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

  _createClass(SocialUser, [{
    key: 'provider',
    set: function set(provider) {
      if (_config2.default.providers.indexOf(provider) === -1) {
        throw new Error('Provider \u2019' + provider + '\u2019 isn\u2019t supported.');
      }

      this._provider = provider;
    },
    get: function get() {
      return this._provider;
    }
  }, {
    key: 'profile',
    set: function set(profile) {
      var id = profile.id,
          firstName = profile.firstName,
          lastName = profile.lastName,
          email = profile.email,
          name = profile.name,
          profilePicURL = profile.profilePicURL,
          rest = _objectWithoutProperties(profile, ['id', 'firstName', 'lastName', 'email', 'name', 'profilePicURL']);

      if (Object.keys(rest).length > 0) {
        var keys = Object.keys(rest).join(', ');

        console.warn('The following keys are not supported and thus won\u2019t be saved: ' + keys);
      }

      this._profile = {
        id: id,
        name: name,
        firstName: firstName,
        lastName: lastName,
        email: email,
        profilePicURL: profilePicURL
      };
    },
    get: function get() {
      return this._profile;
    }
  }, {
    key: 'token',
    set: function set(token) {
      var accessToken = token.accessToken,
          expiresAt = token.expiresAt,
          rest = _objectWithoutProperties(token, ['accessToken', 'expiresAt']);

      if (Object.keys(rest).length > 0) {
        var keys = Object.keys(rest).join(', ');

        console.warn('The following keys are not supported and thus won\u2019t be saved: ' + keys);
      }

      this._token = {
        accessToken: accessToken,
        expiresAt: expiresAt
      };
    },
    get: function get() {
      return this._token;
    }
  }]);

  return SocialUser;
}();

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
      if (res.error) {
        return this.handleSocialLoginInvokeFailure(res.error);
      }

      var _props = this.props,
          callback = _props.callback,
          provider = _props.provider;


      var user = new SocialUser();
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
      var d = document;
      var appId = this.props.appId;

      if (this.props.provider === 'google') {
        _loaders2.default.google(d, this.id, appId, this.handleSocialLoginInvokeSuccess, this.handleSocialLoginInvokeFailure);
      } else if (this.props.provider === 'facebook') {
        _loaders2.default.facebook(d, this.id, appId, this.handleSocialLoginInvokeSuccess, this.handleSocialLoginInvokeFailure);
      } else if (this.props.provider === 'linkedin') {
        _loaders2.default.linkedin(d, this.id, appId, this.handleSocialLoginInvokeSuccess, this.handleSocialLoginInvokeFailure);
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
  appId: _react.PropTypes.string.isRequired,
  callback: _react.PropTypes.func,
  children: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.element, _react.PropTypes.node]).isRequired,
  provider: _react.PropTypes.oneOf(_config2.default.providers).isRequired,
  version: _react.PropTypes.string
};
SocialLogin.defaultProps = {
  version: '2.8'
};
exports.default = SocialLogin;

/***/ })
/******/ ]);
});