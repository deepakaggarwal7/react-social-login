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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SocialLogin = undefined;

	var _socialLogin = __webpack_require__(1);

	var _socialLogin2 = _interopRequireDefault(_socialLogin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import SimpleControl from './simple.jsx'
	exports.SocialLogin = _socialLogin2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SocialUser = function SocialUser() {
	  _classCallCheck(this, SocialUser);

	  this.provider = '';

	  this.profile = {
	    name: '',
	    firstName: '',
	    lastName: '',
	    email: '',
	    profilePicUrl: ''
	  };

	  this.token = {
	    accessToken: '',
	    expiresAt: ''
	  };
	};

	exports.default = SocialUser;

	var SocialLogin = function (_React$Component) {
	  _inherits(SocialLogin, _React$Component);

	  function SocialLogin(props) {
	    _classCallCheck(this, SocialLogin);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SocialLogin).call(this, props));

	    _this.id = 'sl' + Math.floor(Math.random() * 0xFFFF) + '';
	    return _this;
	  }

	  _createClass(SocialLogin, [{
	    key: 'handleSocialLoginInvokeSuccess',
	    value: function handleSocialLoginInvokeSuccess(res) {
	      var user = new SocialUser();

	      user.provider = this.props.provider;
	      user.profile.id = res.wc.Ka;
	      user.profile.firstName = res.wc.Za;
	      user.profile.lastName = res.wc.Na;
	      user.profile.email = res.wc.hg;
	      user.profile.name = res.wc.wc;
	      user.profile.profilePicUrl = res.wc.Ph;
	      user.token.accessToken = res.hg.access_token;
	      user.token.expiresAt = res.hg.expires_at;
	      this.props.callback(user, null);
	    }
	  }, {
	    key: 'handleSocialLoginInvokeFailure',
	    value: function handleSocialLoginInvokeFailure(err) {
	      this.props.callback(null, err);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var d = document;
	      var appId = this.props.appId;
	      if (this.props.provider == 'Google') loader.loadGoogleSdk(d, this.id, appId, this.handleSocialLoginInvokeSuccess.bind(this), this.handleSocialLoginInvokeFailure.bind(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { id: this.id },
	        this.props.children
	      );
	    }
	  }]);

	  return SocialLogin;
	}(_react2.default.Component);

	//SupportedTypes


	exports.default = SocialLogin;
	SocialLogin.propTypes = {
	  provider: _react2.default.PropTypes.oneOf(['Google', 'Facebook']).isRequired,
	  appId: _react2.default.PropTypes.string.isRequired,
	  children: _react2.default.PropTypes.element.isRequired,
	  callback: _react2.default.PropTypes.func
	};

	//scripts Loading
	var loader = {

	  //Google Script loader
	  loadGoogleSdk: function loadGoogleSdk(d, cid, appId, fn, err) {
	    var js = d.createElement('script');
	    js.src = 'https://apis.google.com/js/platform.js';
	    js.id = 'gapi-client';
	    js.onload = function () {

	      gapi.load('auth2', function () {
	        if (!window.gapi.auth2.getAuthInstance()) window.gapi.auth2.init({ client_id: appId });
	        window.gapi.auth2.getAuthInstance().attachClickHandler(cid, {}, fn, err);
	      });
	    };
	    if (document.getElementsByTagName('script').length == 0) d.appendChild(js);else document.getElementsByTagName('script')[0].parentNode.appendChild(js);
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;