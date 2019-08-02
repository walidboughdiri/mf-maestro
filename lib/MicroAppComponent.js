(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MicroAppComponent"] = factory();
	else
		root["MfMaestro"] = root["MfMaestro"] || {}, root["MfMaestro"]["MicroAppComponent"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/MicroAppComponent.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/GlobalState.js":
/*!****************************!*\
  !*** ./src/GlobalState.js ***!
  \****************************/
/*! exports provided: isEventsDebugActivated, isManifestLoaded, isManifestLoading, isManifestInState, microAppState, isMicroAppLoaded, isMicroAppLoading, isMicroAppInState, microAppConfigFromState, addLoadCallback, store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEventsDebugActivated", function() { return isEventsDebugActivated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isManifestLoaded", function() { return isManifestLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isManifestLoading", function() { return isManifestLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isManifestInState", function() { return isManifestInState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "microAppState", function() { return microAppState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMicroAppLoaded", function() { return isMicroAppLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMicroAppLoading", function() { return isMicroAppLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMicroAppInState", function() { return isMicroAppInState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "microAppConfigFromState", function() { return microAppConfigFromState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLoadCallback", function() { return addLoadCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


function isEventsDebugActivated() {
  return store.getState().eventsDebug;
}
function isManifestLoaded(manifestUrl, id) {
  return isManifestInState(manifestUrl, "loaded", id);
}
function isManifestLoading(manifestUrl, id) {
  return isManifestInState(manifestUrl, "loading", id);
}
function isManifestInState(manifestUrl, state, id) {
  if (state !== "loading" && state !== "loaded") {
    throw "wrong state for manifest (state: \"".concat(state, "\")");
  }

  var _store$getState = store.getState(),
      loadedManifests = _store$getState.loadedManifests;

  return manifestUrl in loadedManifests && loadedManifests[manifestUrl].state === state;
}
function microAppState(appName) {
  return store.getState().loadedMicroApps[appName];
}
function isMicroAppLoaded(microAppName) {
  return isMicroAppInState(microAppName, "loaded");
}
function isMicroAppLoading(microAppName) {
  return isMicroAppInState(microAppName, "loading");
}
function isMicroAppInState(microAppName, state) {
  if (state !== "loading" && state !== "loaded") {
    throw "wrong state for manifest (state: \"".concat(state, "\")");
  }

  var _store$getState2 = store.getState(),
      loadedMicroApps = _store$getState2.loadedMicroApps;

  return _typeof(loadedMicroApps[microAppName]) === "object" && loadedMicroApps[microAppName].state === state;
}
function microAppConfigFromState(wrapperId, manifestUrl, microAppName) {
  if (!isManifestLoaded(manifestUrl, wrapperId)) return null;
  var manifestState = store.getState().loadedManifests[manifestUrl];
  if (manifestState === undefined) return null;
  return manifestState.content[microAppName];
}
function addLoadCallback(appName, wrapperId, callback) {
  store.dispatch({
    appName: appName,
    type: "addLoadCallbacks",
    callback: callback
  });
}
var initialState = {
  eventsDebug: false,
  loadCallbacks: {},
  loadedMicroApps: {},
  loadedManifests: {}
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "activateEventsDebug":
      return _objectSpread({}, state, {
        eventsDebug: true
      });

    case "addLoadCallback":
      return _objectSpread({}, state, {
        loadCallbacks: state.loadCallbacks[action.appName] ? _objectSpread({}, state.loadCallbacks, _defineProperty({}, action.appName, _objectSpread({}, state.loadCallbacks[action.appName], _defineProperty({}, action.appName, action.callback)))) : _objectSpread({}, state.loadCallbacks, _defineProperty({}, action.appName, action.callback))
      });

    case "deActivateEventsDebug":
      return _objectSpread({}, state, {
        eventsDebug: false
      });

    case "loadMicroApp":
      return _objectSpread({}, state, {
        loadedMicroApps: _objectSpread({}, state.loadedMicroApps, _defineProperty({}, action.microAppName, {
          state: "loading",
          callback: action.callback
        }))
      });

    case "addMicroApp":
      return _objectSpread({}, state, {
        loadedMicroApps: _objectSpread({}, state.loadedMicroApps, _defineProperty({}, action.microAppName, _objectSpread({
          state: "loaded"
        }, action.microAppObject)))
      });

    case "loadManifest":
      return _objectSpread({}, state, {
        loadedManifests: _objectSpread({}, state.loadedManifests, _defineProperty({}, action.url, {
          state: "loading",
          content: null
        }))
      });

    case "storeManifest":
      return _objectSpread({}, state, {
        loadedManifests: _objectSpread({}, state.loadedManifests, _defineProperty({}, action.url, {
          state: "loaded",
          content: action.content
        }))
      });

    case "storeManifestError":
      return _objectSpread({}, state, {
        loadedManifests: _objectSpread({}, state.loadedManifests, _defineProperty({}, action.url, {
          state: "error",
          content: action.error
        }))
      });

    default:
      return state;
  }
};

var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer);

window.MfMaestro.registerMicroApp = function (microAppName, microAppObject) {
  console.log("GS \u2022\u2022\u2022 registerMicroApp ".concat(microAppName));
  store.dispatch({
    microAppName: microAppName,
    microAppObject: microAppObject,
    type: "addMicroApp"
  });
  window.MfMaestro.instanciate(microAppName);
};

/***/ }),

/***/ "./src/MicroAppComponent.js":
/*!**********************************!*\
  !*** ./src/MicroAppComponent.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MicroAppComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loadServiceManifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loadServiceManifest */ "./src/loadServiceManifest.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "react-i18next");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _GlobalState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GlobalState */ "./src/GlobalState.js");
/* harmony import */ var _MicroAppTypes_NativeMicroApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MicroAppTypes/NativeMicroApp */ "./src/MicroAppTypes/NativeMicroApp.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var renderers = {
  elm: _MicroAppTypes_NativeMicroApp__WEBPACK_IMPORTED_MODULE_4__["default"]
};

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
}

function MicroAppComponent(props) {
  window.MfMaestro.setupMicroAppCallbacks(props.app);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      isMicroAppLaunchable = _useState2[0],
      setMicroAppLaunchable = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(props.app + "@" + uuidv4()),
      _useState4 = _slicedToArray(_useState3, 2),
      wrapperId = _useState4[0],
      setWrapperId = _useState4[1];

  console.log("1 >>>>>>>>>>>>>>>>>>>>> ".concat(wrapperId, " MicroAppComponent refreshing"), props);
  var manifestUrl = props.manifestUrl || "/".concat(props.serviceName, "/assets/components.json");
  console.log("1 ".concat(wrapperId, " manifestUrl au tout d\xE9but : "), manifestUrl);
  console.log("1 ".concat(wrapperId, " manifest loaded: "), Object(_GlobalState__WEBPACK_IMPORTED_MODULE_3__["isManifestLoaded"])(manifestUrl, wrapperId));

  var _useTranslation = Object(react_i18next__WEBPACK_IMPORTED_MODULE_2__["useTranslation"])(),
      t = _useTranslation.t;

  var Renderer = null;

  if (Object(_GlobalState__WEBPACK_IMPORTED_MODULE_3__["isManifestLoaded"])(manifestUrl, wrapperId)) {
    console.log("1 ".concat(wrapperId, " manifest loaded, setup renderer"));
    var microAppConfig = Object(_GlobalState__WEBPACK_IMPORTED_MODULE_3__["microAppConfigFromState"])(wrapperId, manifestUrl, props.app);
    console.log("1 ".concat(wrapperId, " microAppConfig:"), microAppConfig);
    if (_typeof(microAppConfig) !== "object") return;
    Renderer = renderers[microAppConfig.type];
  }

  console.log("1 ".concat(wrapperId, " is microApp loaded:"), Object(_GlobalState__WEBPACK_IMPORTED_MODULE_3__["isMicroAppLoaded"])(props.app));

  if (!Object(_GlobalState__WEBPACK_IMPORTED_MODULE_3__["isMicroAppLoaded"])(props.app)) {
    console.log("1 ".concat(wrapperId, " microApp loaded not loaded, add loadCallback"));
    window.MfMaestro.addLoadCallback(props.app, wrapperId, function () {
      console.log("RRRRRRRRRRRRRRRR 1(if !microAppLoaded) ".concat(wrapperId, " >>>> call window.MfMaestro.loadCallbacks[").concat(props.app, "]"));

      if (!isMicroAppLaunchable) {
        console.log("RRRRRRRRRRRRRRR setMicroAppLaunchable 1", true);
        setMicroAppLaunchable(true);
      }
    });
  } else {
    console.log("1 ".concat(wrapperId, " microApp loaded, start application"));
  }

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    function loadManifest() {
      return _loadManifest.apply(this, arguments);
    }

    function _loadManifest() {
      _loadManifest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var lMicroApp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                lMicroApp = function _ref() {
                  var microAppConfig = Object(_GlobalState__WEBPACK_IMPORTED_MODULE_3__["microAppConfigFromState"])(wrapperId, manifestUrl, props.app);
                  console.log("3 ".concat(wrapperId, " loadMicroAppCode <<<<<<"), microAppConfig);
                  if (Object(_GlobalState__WEBPACK_IMPORTED_MODULE_3__["isMicroAppLoading"])(props.app)) return;
                  _GlobalState__WEBPACK_IMPORTED_MODULE_3__["store"].dispatch({
                    type: "loadMicroApp",
                    microAppName: props.app
                  });
                  var script = document.createElement("script");
                  script.src = microAppConfig.url;
                  document.body.appendChild(script);
                };

                if (!Object(_GlobalState__WEBPACK_IMPORTED_MODULE_3__["isManifestLoading"])(manifestUrl, wrapperId)) {
                  _context.next = 4;
                  break;
                }

                console.log("2 ".concat(wrapperId, " MicroAppComponent > useEffect/loadManifest > manifest is loading, out!"));
                return _context.abrupt("return");

              case 4:
                console.log("2 ".concat(wrapperId, " MicroAppComponent > useEffect/loadManifest > start loading manifest <<<<<<<<<<<<"));

                if (Object(_GlobalState__WEBPACK_IMPORTED_MODULE_3__["isManifestLoaded"])(manifestUrl, wrapperId)) {
                  _context.next = 9;
                  break;
                }

                console.log("2 ".concat(wrapperId, " on loade le manifeste"));
                _context.next = 9;
                return lmanifest();

              case 9:
                if (!Object(_GlobalState__WEBPACK_IMPORTED_MODULE_3__["isMicroAppLoaded"])(props.app)) {
                  console.log("2 ".concat(wrapperId, " on loade microApp"));
                  lMicroApp();
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _loadManifest.apply(this, arguments);
    }

    console.log("2 ".concat(wrapperId, " in useEffect loadManifest :"), manifestUrl);
    loadManifest();
  });

  function lmanifest() {
    return _lmanifest.apply(this, arguments);
  }

  function _lmanifest() {
    _lmanifest = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var loadedManifest;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _GlobalState__WEBPACK_IMPORTED_MODULE_3__["store"].dispatch({
                type: "loadManifest",
                url: manifestUrl
              });
              _context2.prev = 1;
              _context2.next = 4;
              return Object(_loadServiceManifest__WEBPACK_IMPORTED_MODULE_1__["default"])(manifestUrl);

            case 4:
              loadedManifest = _context2.sent;

              if (!loadedManifest.error) {
                console.log("2 ".concat(wrapperId, " loadedManifest (apres await):"), loadedManifest);
                _GlobalState__WEBPACK_IMPORTED_MODULE_3__["store"].dispatch({
                  type: "storeManifest",
                  url: manifestUrl,
                  content: loadedManifest
                });
              }

              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              _GlobalState__WEBPACK_IMPORTED_MODULE_3__["store"].dispatch({
                type: "storeManifestError",
                url: manifestUrl,
                error: _context2.t0
              });

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 8]]);
    }));
    return _lmanifest.apply(this, arguments);
  }

  if (!isMicroAppLaunchable) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, t("loading micro app ".concat(props.app, " in ").concat(wrapperId)));
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Renderer, {
    type: "micro-app-component",
    app: props.app,
    wrapperId: wrapperId
  });
}

/***/ }),

/***/ "./src/MicroAppTypes/NativeMicroApp.js":
/*!*********************************************!*\
  !*** ./src/MicroAppTypes/NativeMicroApp.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GlobalState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GlobalState */ "./src/GlobalState.js");


/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(function NativeMicroApp(props) {
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    Object(_GlobalState__WEBPACK_IMPORTED_MODULE_1__["microAppState"])(props.app).start(props.wrapperId, {});
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: props.wrapperId
  });
}));

/***/ }),

/***/ "./src/loadServiceManifest.js":
/*!************************************!*\
  !*** ./src/loadServiceManifest.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appManifestFetcher; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function appManifestFetcher(_x) {
  return _appManifestFetcher.apply(this, arguments);
}

function _appManifestFetcher() {
  _appManifestFetcher = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(manifestUrl) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(manifestUrl);

          case 2:
            response = _context.sent;

            if (response.ok) {
              _context.next = 8;
              break;
            }

            _context.t0 = response.status;
            _context.next = _context.t0 === 404 ? 7 : 8;
            break;

          case 7:
            return _context.abrupt("return", {
              error: response.statusText,
              errorDetail: "Unable to load the manifest file for '".concat(manifestUrl, "' (404)"),
              response: response
            });

          case 8:
            _context.next = 10;
            return response.json();

          case 10:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _appManifestFetcher.apply(this, arguments);
}

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-i18next":
/*!********************************!*\
  !*** external "react-i18next" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-i18next");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NZk1hZXN0cm8uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9NZk1hZXN0cm8uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL01mTWFlc3Ryby5bbmFtZV0vLi9zcmMvR2xvYmFsU3RhdGUuanMiLCJ3ZWJwYWNrOi8vTWZNYWVzdHJvLltuYW1lXS8uL3NyYy9NaWNyb0FwcENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9NZk1hZXN0cm8uW25hbWVdLy4vc3JjL01pY3JvQXBwVHlwZXMvTmF0aXZlTWljcm9BcHAuanMiLCJ3ZWJwYWNrOi8vTWZNYWVzdHJvLltuYW1lXS8uL3NyYy9sb2FkU2VydmljZU1hbmlmZXN0LmpzIiwid2VicGFjazovL01mTWFlc3Ryby5bbmFtZV0vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL01mTWFlc3Ryby5bbmFtZV0vZXh0ZXJuYWwgXCJyZWFjdC1pMThuZXh0XCIiLCJ3ZWJwYWNrOi8vTWZNYWVzdHJvLltuYW1lXS9leHRlcm5hbCBcInJlZHV4XCIiXSwibmFtZXMiOlsiaXNFdmVudHNEZWJ1Z0FjdGl2YXRlZCIsInN0b3JlIiwiZ2V0U3RhdGUiLCJldmVudHNEZWJ1ZyIsImlzTWFuaWZlc3RMb2FkZWQiLCJtYW5pZmVzdFVybCIsImlkIiwiaXNNYW5pZmVzdEluU3RhdGUiLCJpc01hbmlmZXN0TG9hZGluZyIsInN0YXRlIiwibG9hZGVkTWFuaWZlc3RzIiwibWljcm9BcHBTdGF0ZSIsImFwcE5hbWUiLCJsb2FkZWRNaWNyb0FwcHMiLCJpc01pY3JvQXBwTG9hZGVkIiwibWljcm9BcHBOYW1lIiwiaXNNaWNyb0FwcEluU3RhdGUiLCJpc01pY3JvQXBwTG9hZGluZyIsIm1pY3JvQXBwQ29uZmlnRnJvbVN0YXRlIiwid3JhcHBlcklkIiwibWFuaWZlc3RTdGF0ZSIsInVuZGVmaW5lZCIsImNvbnRlbnQiLCJhZGRMb2FkQ2FsbGJhY2siLCJjYWxsYmFjayIsImRpc3BhdGNoIiwidHlwZSIsImluaXRpYWxTdGF0ZSIsImxvYWRDYWxsYmFja3MiLCJyZWR1Y2VyIiwiYWN0aW9uIiwibWljcm9BcHBPYmplY3QiLCJ1cmwiLCJlcnJvciIsImNyZWF0ZVN0b3JlIiwid2luZG93IiwiTWZNYWVzdHJvIiwicmVnaXN0ZXJNaWNyb0FwcCIsImNvbnNvbGUiLCJsb2ciLCJpbnN0YW5jaWF0ZSIsInJlbmRlcmVycyIsImVsbSIsIk5hdGl2ZU1pY3JvQXBwIiwidXVpZHY0IiwicmVwbGFjZSIsImMiLCJjcnlwdG8iLCJnZXRSYW5kb21WYWx1ZXMiLCJVaW50OEFycmF5IiwidG9TdHJpbmciLCJNaWNyb0FwcENvbXBvbmVudCIsInByb3BzIiwic2V0dXBNaWNyb0FwcENhbGxiYWNrcyIsImFwcCIsInVzZVN0YXRlIiwiaXNNaWNyb0FwcExhdW5jaGFibGUiLCJzZXRNaWNyb0FwcExhdW5jaGFibGUiLCJzZXRXcmFwcGVySWQiLCJzZXJ2aWNlTmFtZSIsInVzZVRyYW5zbGF0aW9uIiwidCIsIlJlbmRlcmVyIiwibWljcm9BcHBDb25maWciLCJ1c2VFZmZlY3QiLCJsb2FkTWFuaWZlc3QiLCJsTWljcm9BcHAiLCJzY3JpcHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJsbWFuaWZlc3QiLCJsb2FkU2VydmljZU1hbmlmZXN0IiwibG9hZGVkTWFuaWZlc3QiLCJSZWFjdCIsIm1lbW8iLCJzdGFydCIsImFwcE1hbmlmZXN0RmV0Y2hlciIsImZldGNoIiwicmVzcG9uc2UiLCJvayIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJlcnJvckRldGFpbCIsImpzb24iLCJkYXRhIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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RWlDLEtBQUssQ0FBQ2pDO0FBQWYsSUFBUDtBQUNELENBTGMsQ0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIZSxTQUFlNEQsa0JBQTlCO0FBQUE7QUFBQTs7Ozs7MEJBQWUsaUJBQWtDMUUsV0FBbEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDVTJFLEtBQUssQ0FBQzNFLFdBQUQsQ0FEZjs7QUFBQTtBQUNQNEUsb0JBRE87O0FBQUEsZ0JBRVJBLFFBQVEsQ0FBQ0MsRUFGRDtBQUFBO0FBQUE7QUFBQTs7QUFBQSwwQkFHSEQsUUFBUSxDQUFDRSxNQUhOO0FBQUEsNENBSUosR0FKSTtBQUFBOztBQUFBO0FBQUEsNkNBS0E7QUFDTGxELG1CQUFLLEVBQUVnRCxRQUFRLENBQUNHLFVBRFg7QUFFTEMseUJBQVcsa0RBQTJDaEYsV0FBM0MsWUFGTjtBQUdMNEUsc0JBQVEsRUFBUkE7QUFISyxhQUxBOztBQUFBO0FBQUE7QUFBQSxtQkFZTUEsUUFBUSxDQUFDSyxJQUFULEVBWk47O0FBQUE7QUFZUEMsZ0JBWk87QUFBQSw2Q0FhTkEsSUFiTTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7Ozs7Ozs7Ozs7O0FDQWYsa0M7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEsa0MiLCJmaWxlIjoiTWljcm9BcHBDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJNaWNyb0FwcENvbXBvbmVudFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJNZk1hZXN0cm9cIl0gPSByb290W1wiTWZNYWVzdHJvXCJdIHx8IHt9LCByb290W1wiTWZNYWVzdHJvXCJdW1wiTWljcm9BcHBDb21wb25lbnRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL01pY3JvQXBwQ29tcG9uZW50LmpzXCIpO1xuIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tIFwicmVkdXhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXZlbnRzRGVidWdBY3RpdmF0ZWQoKSB7XG4gIHJldHVybiBzdG9yZS5nZXRTdGF0ZSgpLmV2ZW50c0RlYnVnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNYW5pZmVzdExvYWRlZChtYW5pZmVzdFVybCwgaWQpIHtcbiAgcmV0dXJuIGlzTWFuaWZlc3RJblN0YXRlKG1hbmlmZXN0VXJsLCBcImxvYWRlZFwiLCBpZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01hbmlmZXN0TG9hZGluZyhtYW5pZmVzdFVybCwgaWQpIHtcbiAgcmV0dXJuIGlzTWFuaWZlc3RJblN0YXRlKG1hbmlmZXN0VXJsLCBcImxvYWRpbmdcIiwgaWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNYW5pZmVzdEluU3RhdGUobWFuaWZlc3RVcmwsIHN0YXRlLCBpZCkge1xuICBpZiAoc3RhdGUgIT09IFwibG9hZGluZ1wiICYmIHN0YXRlICE9PSBcImxvYWRlZFwiKSB7XG4gICAgdGhyb3cgYHdyb25nIHN0YXRlIGZvciBtYW5pZmVzdCAoc3RhdGU6IFwiJHtzdGF0ZX1cIilgO1xuICB9XG4gIGNvbnN0IHsgbG9hZGVkTWFuaWZlc3RzIH0gPSBzdG9yZS5nZXRTdGF0ZSgpO1xuICByZXR1cm4gKFxuICAgIG1hbmlmZXN0VXJsIGluIGxvYWRlZE1hbmlmZXN0cyAmJlxuICAgIGxvYWRlZE1hbmlmZXN0c1ttYW5pZmVzdFVybF0uc3RhdGUgPT09IHN0YXRlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWNyb0FwcFN0YXRlKGFwcE5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlLmdldFN0YXRlKCkubG9hZGVkTWljcm9BcHBzW2FwcE5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNaWNyb0FwcExvYWRlZChtaWNyb0FwcE5hbWUpIHtcbiAgcmV0dXJuIGlzTWljcm9BcHBJblN0YXRlKG1pY3JvQXBwTmFtZSwgXCJsb2FkZWRcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01pY3JvQXBwTG9hZGluZyhtaWNyb0FwcE5hbWUpIHtcbiAgcmV0dXJuIGlzTWljcm9BcHBJblN0YXRlKG1pY3JvQXBwTmFtZSwgXCJsb2FkaW5nXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNaWNyb0FwcEluU3RhdGUobWljcm9BcHBOYW1lLCBzdGF0ZSkge1xuICBpZiAoc3RhdGUgIT09IFwibG9hZGluZ1wiICYmIHN0YXRlICE9PSBcImxvYWRlZFwiKSB7XG4gICAgdGhyb3cgYHdyb25nIHN0YXRlIGZvciBtYW5pZmVzdCAoc3RhdGU6IFwiJHtzdGF0ZX1cIilgO1xuICB9XG4gIGNvbnN0IHsgbG9hZGVkTWljcm9BcHBzIH0gPSBzdG9yZS5nZXRTdGF0ZSgpO1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBsb2FkZWRNaWNyb0FwcHNbbWljcm9BcHBOYW1lXSA9PT0gXCJvYmplY3RcIiAmJlxuICAgIGxvYWRlZE1pY3JvQXBwc1ttaWNyb0FwcE5hbWVdLnN0YXRlID09PSBzdGF0ZVxuICApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG1pY3JvQXBwQ29uZmlnRnJvbVN0YXRlKHdyYXBwZXJJZCwgbWFuaWZlc3RVcmwsIG1pY3JvQXBwTmFtZSkge1xuICBpZiAoIWlzTWFuaWZlc3RMb2FkZWQobWFuaWZlc3RVcmwsIHdyYXBwZXJJZCkpIHJldHVybiBudWxsO1xuICBjb25zdCBtYW5pZmVzdFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKS5sb2FkZWRNYW5pZmVzdHNbbWFuaWZlc3RVcmxdO1xuICBpZiAobWFuaWZlc3RTdGF0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIG1hbmlmZXN0U3RhdGUuY29udGVudFttaWNyb0FwcE5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTG9hZENhbGxiYWNrKGFwcE5hbWUsIHdyYXBwZXJJZCwgY2FsbGJhY2spIHtcbiAgc3RvcmUuZGlzcGF0Y2goeyBhcHBOYW1lLCB0eXBlOiBcImFkZExvYWRDYWxsYmFja3NcIiwgY2FsbGJhY2sgfSk7XG59XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZXZlbnRzRGVidWc6IGZhbHNlLFxuICBsb2FkQ2FsbGJhY2tzOiB7fSxcbiAgbG9hZGVkTWljcm9BcHBzOiB7fSxcbiAgbG9hZGVkTWFuaWZlc3RzOiB7fVxufTtcblxuY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFwiYWN0aXZhdGVFdmVudHNEZWJ1Z1wiOlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGV2ZW50c0RlYnVnOiB0cnVlIH07XG4gICAgY2FzZSBcImFkZExvYWRDYWxsYmFja1wiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvYWRDYWxsYmFja3M6IHN0YXRlLmxvYWRDYWxsYmFja3NbYWN0aW9uLmFwcE5hbWVdXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLmxvYWRDYWxsYmFja3MsXG4gICAgICAgICAgICAgIFthY3Rpb24uYXBwTmFtZV06IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZS5sb2FkQ2FsbGJhY2tzW2FjdGlvbi5hcHBOYW1lXSxcbiAgICAgICAgICAgICAgICBbYWN0aW9uLmFwcE5hbWVdOiBhY3Rpb24uY2FsbGJhY2tcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogeyAuLi5zdGF0ZS5sb2FkQ2FsbGJhY2tzLCBbYWN0aW9uLmFwcE5hbWVdOiBhY3Rpb24uY2FsbGJhY2sgfVxuICAgICAgfTtcbiAgICBjYXNlIFwiZGVBY3RpdmF0ZUV2ZW50c0RlYnVnXCI6XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZXZlbnRzRGVidWc6IGZhbHNlIH07XG4gICAgY2FzZSBcImxvYWRNaWNyb0FwcFwiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvYWRlZE1pY3JvQXBwczoge1xuICAgICAgICAgIC4uLnN0YXRlLmxvYWRlZE1pY3JvQXBwcyxcbiAgICAgICAgICBbYWN0aW9uLm1pY3JvQXBwTmFtZV06IHtcbiAgICAgICAgICAgIHN0YXRlOiBcImxvYWRpbmdcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiBhY3Rpb24uY2FsbGJhY2tcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgY2FzZSBcImFkZE1pY3JvQXBwXCI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbG9hZGVkTWljcm9BcHBzOiB7XG4gICAgICAgICAgLi4uc3RhdGUubG9hZGVkTWljcm9BcHBzLFxuICAgICAgICAgIFthY3Rpb24ubWljcm9BcHBOYW1lXToge1xuICAgICAgICAgICAgc3RhdGU6IFwibG9hZGVkXCIsXG4gICAgICAgICAgICAuLi5hY3Rpb24ubWljcm9BcHBPYmplY3RcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgY2FzZSBcImxvYWRNYW5pZmVzdFwiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvYWRlZE1hbmlmZXN0czoge1xuICAgICAgICAgIC4uLnN0YXRlLmxvYWRlZE1hbmlmZXN0cyxcbiAgICAgICAgICBbYWN0aW9uLnVybF06IHtcbiAgICAgICAgICAgIHN0YXRlOiBcImxvYWRpbmdcIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IG51bGxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgY2FzZSBcInN0b3JlTWFuaWZlc3RcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsb2FkZWRNYW5pZmVzdHM6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5sb2FkZWRNYW5pZmVzdHMsXG4gICAgICAgICAgW2FjdGlvbi51cmxdOiB7XG4gICAgICAgICAgICBzdGF0ZTogXCJsb2FkZWRcIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IGFjdGlvbi5jb250ZW50XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIGNhc2UgXCJzdG9yZU1hbmlmZXN0RXJyb3JcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsb2FkZWRNYW5pZmVzdHM6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5sb2FkZWRNYW5pZmVzdHMsXG4gICAgICAgICAgW2FjdGlvbi51cmxdOiB7XG4gICAgICAgICAgICBzdGF0ZTogXCJlcnJvclwiLFxuICAgICAgICAgICAgY29udGVudDogYWN0aW9uLmVycm9yXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpO1xuXG53aW5kb3cuTWZNYWVzdHJvLnJlZ2lzdGVyTWljcm9BcHAgPSBmdW5jdGlvbihtaWNyb0FwcE5hbWUsIG1pY3JvQXBwT2JqZWN0KSB7XG4gIGNvbnNvbGUubG9nKGBHUyDigKLigKLigKIgcmVnaXN0ZXJNaWNyb0FwcCAke21pY3JvQXBwTmFtZX1gKTtcbiAgc3RvcmUuZGlzcGF0Y2goe1xuICAgIG1pY3JvQXBwTmFtZSxcbiAgICBtaWNyb0FwcE9iamVjdCxcbiAgICB0eXBlOiBcImFkZE1pY3JvQXBwXCJcbiAgfSk7XG4gIHdpbmRvdy5NZk1hZXN0cm8uaW5zdGFuY2lhdGUobWljcm9BcHBOYW1lKTtcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGxvYWRTZXJ2aWNlTWFuaWZlc3QgZnJvbSBcIi4vbG9hZFNlcnZpY2VNYW5pZmVzdFwiO1xuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tIFwicmVhY3QtaTE4bmV4dFwiO1xuaW1wb3J0IHtcbiAgaXNNYW5pZmVzdExvYWRlZCxcbiAgaXNNYW5pZmVzdExvYWRpbmcsXG4gIGlzTWljcm9BcHBMb2FkZWQsXG4gIGlzTWljcm9BcHBMb2FkaW5nLFxuICBtaWNyb0FwcENvbmZpZ0Zyb21TdGF0ZSxcbiAgc3RvcmVcbn0gZnJvbSBcIi4vR2xvYmFsU3RhdGVcIjtcbmltcG9ydCBOYXRpdmVNaWNyb0FwcCBmcm9tIFwiLi9NaWNyb0FwcFR5cGVzL05hdGl2ZU1pY3JvQXBwXCI7XG5jb25zdCByZW5kZXJlcnMgPSB7XG4gIGVsbTogTmF0aXZlTWljcm9BcHBcbn07XG5mdW5jdGlvbiB1dWlkdjQoKSB7XG4gIHJldHVybiAoWzFlN10gKyAtMWUzICsgLTRlMyArIC04ZTMgKyAtMWUxMSkucmVwbGFjZSgvWzAxOF0vZywgYyA9PlxuICAgIChcbiAgICAgIGMgXlxuICAgICAgKGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChjIC8gNCkpKVxuICAgICkudG9TdHJpbmcoMTYpXG4gICk7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNaWNyb0FwcENvbXBvbmVudChwcm9wcykge1xuICB3aW5kb3cuTWZNYWVzdHJvLnNldHVwTWljcm9BcHBDYWxsYmFja3MocHJvcHMuYXBwKTtcblxuICBjb25zdCBbaXNNaWNyb0FwcExhdW5jaGFibGUsIHNldE1pY3JvQXBwTGF1bmNoYWJsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt3cmFwcGVySWQsIHNldFdyYXBwZXJJZF0gPSB1c2VTdGF0ZShwcm9wcy5hcHAgKyBcIkBcIiArIHV1aWR2NCgpKTtcbiAgY29uc29sZS5sb2coXG4gICAgYDEgPj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+ICR7d3JhcHBlcklkfSBNaWNyb0FwcENvbXBvbmVudCByZWZyZXNoaW5nYCxcbiAgICBwcm9wc1xuICApO1xuICBjb25zdCBtYW5pZmVzdFVybCA9XG4gICAgcHJvcHMubWFuaWZlc3RVcmwgfHwgYC8ke3Byb3BzLnNlcnZpY2VOYW1lfS9hc3NldHMvY29tcG9uZW50cy5qc29uYDtcbiAgY29uc29sZS5sb2coYDEgJHt3cmFwcGVySWR9IG1hbmlmZXN0VXJsIGF1IHRvdXQgZMOpYnV0IDogYCwgbWFuaWZlc3RVcmwpO1xuICBjb25zb2xlLmxvZyhcbiAgICBgMSAke3dyYXBwZXJJZH0gbWFuaWZlc3QgbG9hZGVkOiBgLFxuICAgIGlzTWFuaWZlc3RMb2FkZWQobWFuaWZlc3RVcmwsIHdyYXBwZXJJZClcbiAgKTtcblxuICBjb25zdCB7IHQgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gIGxldCBSZW5kZXJlciA9IG51bGw7XG4gIGlmIChpc01hbmlmZXN0TG9hZGVkKG1hbmlmZXN0VXJsLCB3cmFwcGVySWQpKSB7XG4gICAgY29uc29sZS5sb2coYDEgJHt3cmFwcGVySWR9IG1hbmlmZXN0IGxvYWRlZCwgc2V0dXAgcmVuZGVyZXJgKTtcbiAgICBjb25zdCBtaWNyb0FwcENvbmZpZyA9IG1pY3JvQXBwQ29uZmlnRnJvbVN0YXRlKFxuICAgICAgd3JhcHBlcklkLFxuICAgICAgbWFuaWZlc3RVcmwsXG4gICAgICBwcm9wcy5hcHBcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKGAxICR7d3JhcHBlcklkfSBtaWNyb0FwcENvbmZpZzpgLCBtaWNyb0FwcENvbmZpZyk7XG4gICAgaWYgKHR5cGVvZiBtaWNyb0FwcENvbmZpZyAhPT0gXCJvYmplY3RcIikgcmV0dXJuO1xuICAgIFJlbmRlcmVyID0gcmVuZGVyZXJzW21pY3JvQXBwQ29uZmlnLnR5cGVdO1xuICB9XG4gIGNvbnNvbGUubG9nKFxuICAgIGAxICR7d3JhcHBlcklkfSBpcyBtaWNyb0FwcCBsb2FkZWQ6YCxcbiAgICBpc01pY3JvQXBwTG9hZGVkKHByb3BzLmFwcClcbiAgKTtcbiAgaWYgKCFpc01pY3JvQXBwTG9hZGVkKHByb3BzLmFwcCkpIHtcbiAgICBjb25zb2xlLmxvZyhgMSAke3dyYXBwZXJJZH0gbWljcm9BcHAgbG9hZGVkIG5vdCBsb2FkZWQsIGFkZCBsb2FkQ2FsbGJhY2tgKTtcbiAgICB3aW5kb3cuTWZNYWVzdHJvLmFkZExvYWRDYWxsYmFjayhwcm9wcy5hcHAsIHdyYXBwZXJJZCwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBSUlJSUlJSUlJSUlJSUlJSIDEoaWYgIW1pY3JvQXBwTG9hZGVkKSAke3dyYXBwZXJJZH0gPj4+PiBjYWxsIHdpbmRvdy5NZk1hZXN0cm8ubG9hZENhbGxiYWNrc1ske3Byb3BzLmFwcH1dYFxuICAgICAgKTtcbiAgICAgIGlmICghaXNNaWNyb0FwcExhdW5jaGFibGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSUlJSUlJSUlJSUlJSUlIgc2V0TWljcm9BcHBMYXVuY2hhYmxlIDFcIiwgdHJ1ZSk7XG4gICAgICAgIHNldE1pY3JvQXBwTGF1bmNoYWJsZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhgMSAke3dyYXBwZXJJZH0gbWljcm9BcHAgbG9hZGVkLCBzdGFydCBhcHBsaWNhdGlvbmApO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBhc3luYyBmdW5jdGlvbiBsb2FkTWFuaWZlc3QoKSB7XG4gICAgICBpZiAoaXNNYW5pZmVzdExvYWRpbmcobWFuaWZlc3RVcmwsIHdyYXBwZXJJZCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYDIgJHt3cmFwcGVySWR9IE1pY3JvQXBwQ29tcG9uZW50ID4gdXNlRWZmZWN0L2xvYWRNYW5pZmVzdCA+IG1hbmlmZXN0IGlzIGxvYWRpbmcsIG91dCFgXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgMiAke3dyYXBwZXJJZH0gTWljcm9BcHBDb21wb25lbnQgPiB1c2VFZmZlY3QvbG9hZE1hbmlmZXN0ID4gc3RhcnQgbG9hZGluZyBtYW5pZmVzdCA8PDw8PDw8PDw8PDxgXG4gICAgICApO1xuICAgICAgaWYgKCFpc01hbmlmZXN0TG9hZGVkKG1hbmlmZXN0VXJsLCB3cmFwcGVySWQpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAyICR7d3JhcHBlcklkfSBvbiBsb2FkZSBsZSBtYW5pZmVzdGVgKTtcbiAgICAgICAgYXdhaXQgbG1hbmlmZXN0KCk7XG4gICAgICB9XG4gICAgICBpZiAoIWlzTWljcm9BcHBMb2FkZWQocHJvcHMuYXBwKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgMiAke3dyYXBwZXJJZH0gb24gbG9hZGUgbWljcm9BcHBgKTtcbiAgICAgICAgbE1pY3JvQXBwKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGxNaWNyb0FwcCgpIHtcbiAgICAgICAgY29uc3QgbWljcm9BcHBDb25maWcgPSBtaWNyb0FwcENvbmZpZ0Zyb21TdGF0ZShcbiAgICAgICAgICB3cmFwcGVySWQsXG4gICAgICAgICAgbWFuaWZlc3RVcmwsXG4gICAgICAgICAgcHJvcHMuYXBwXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc29sZS5sb2coYDMgJHt3cmFwcGVySWR9IGxvYWRNaWNyb0FwcENvZGUgPDw8PDw8YCwgbWljcm9BcHBDb25maWcpO1xuICAgICAgICBpZiAoaXNNaWNyb0FwcExvYWRpbmcocHJvcHMuYXBwKSkgcmV0dXJuO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgdHlwZTogXCJsb2FkTWljcm9BcHBcIixcbiAgICAgICAgICBtaWNyb0FwcE5hbWU6IHByb3BzLmFwcFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgc2NyaXB0LnNyYyA9IG1pY3JvQXBwQ29uZmlnLnVybDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgMiAke3dyYXBwZXJJZH0gaW4gdXNlRWZmZWN0IGxvYWRNYW5pZmVzdCA6YCwgbWFuaWZlc3RVcmwpO1xuICAgIGxvYWRNYW5pZmVzdCgpO1xuICB9KTtcbiAgYXN5bmMgZnVuY3Rpb24gbG1hbmlmZXN0KCkge1xuICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogXCJsb2FkTWFuaWZlc3RcIiwgdXJsOiBtYW5pZmVzdFVybCB9KTtcbiAgICB0cnkge1xuICAgICAgbGV0IGxvYWRlZE1hbmlmZXN0ID0gYXdhaXQgbG9hZFNlcnZpY2VNYW5pZmVzdChtYW5pZmVzdFVybCk7XG4gICAgICBpZiAoIWxvYWRlZE1hbmlmZXN0LmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGAyICR7d3JhcHBlcklkfSBsb2FkZWRNYW5pZmVzdCAoYXByZXMgYXdhaXQpOmAsXG4gICAgICAgICAgbG9hZGVkTWFuaWZlc3RcbiAgICAgICAgKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IFwic3RvcmVNYW5pZmVzdFwiLFxuICAgICAgICAgIHVybDogbWFuaWZlc3RVcmwsXG4gICAgICAgICAgY29udGVudDogbG9hZGVkTWFuaWZlc3RcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogXCJzdG9yZU1hbmlmZXN0RXJyb3JcIixcbiAgICAgICAgdXJsOiBtYW5pZmVzdFVybCxcbiAgICAgICAgZXJyb3JcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaXNNaWNyb0FwcExhdW5jaGFibGUpIHtcbiAgICByZXR1cm4gPGRpdj57dChgbG9hZGluZyBtaWNybyBhcHAgJHtwcm9wcy5hcHB9IGluICR7d3JhcHBlcklkfWApfTwvZGl2PjtcbiAgfVxuICByZXR1cm4gKFxuICAgIDxSZW5kZXJlclxuICAgICAgdHlwZT1cIm1pY3JvLWFwcC1jb21wb25lbnRcIlxuICAgICAgYXBwPXtwcm9wcy5hcHB9XG4gICAgICB3cmFwcGVySWQ9e3dyYXBwZXJJZH1cbiAgICAvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgbWljcm9BcHBTdGF0ZSB9IGZyb20gXCIuLi9HbG9iYWxTdGF0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5tZW1vKGZ1bmN0aW9uIE5hdGl2ZU1pY3JvQXBwKHByb3BzKSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbWljcm9BcHBTdGF0ZShwcm9wcy5hcHApLnN0YXJ0KHByb3BzLndyYXBwZXJJZCwge30pO1xuICB9LCBbXSk7XG4gIHJldHVybiA8ZGl2IGlkPXtwcm9wcy53cmFwcGVySWR9PjwvZGl2Pjtcbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gYXBwTWFuaWZlc3RGZXRjaGVyKG1hbmlmZXN0VXJsKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gobWFuaWZlc3RVcmwpO1xuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgIGNhc2UgNDA0OlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGVycm9yOiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICAgIGVycm9yRGV0YWlsOiBgVW5hYmxlIHRvIGxvYWQgdGhlIG1hbmlmZXN0IGZpbGUgZm9yICcke21hbmlmZXN0VXJsfScgKDQwNClgLFxuICAgICAgICAgIHJlc3BvbnNlXG4gICAgICAgIH07XG4gICAgfVxuICB9XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBkYXRhO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaTE4bmV4dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTsiXSwic291cmNlUm9vdCI6IiJ9