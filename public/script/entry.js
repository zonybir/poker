/******/ (function(modules) { // webpackBootstrap
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
	
	var _reducers = __webpack_require__(1);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _routes = __webpack_require__(3);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _Redux = Redux,
	    createStore = _Redux.createStore,
	    applyMiddleware = _Redux.applyMiddleware,
	    _ReactRedux = ReactRedux,
	    Provider = _ReactRedux.Provider,
	    _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    browserHistory = _ReactRouter.browserHistory,
	    _ReactRouterRedux = ReactRouterRedux,
	    syncHistoryWithStore = _ReactRouterRedux.syncHistoryWithStore,
	    store = createStore(_reducers2.default, applyMiddleware(ReduxThunk.default)),
	    history = syncHistoryWithStore(hashHistory, store);
	
	
	ReactDOM.render(React.createElement(
	    Provider,
	    { store: store },
	    React.createElement(Router, { history: history, routes: _routes2.default })
	), document.getElementById('zonybir'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _sec = __webpack_require__(2);
	
	var _sec2 = _interopRequireDefault(_sec);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _Redux = Redux,
	    combineReducers = _Redux.combineReducers,
	    _ReactRouterRedux = ReactRouterRedux,
	    routerReducer = _ReactRouterRedux.routerReducer,
	    routing = routerReducer,
	    reducer = combineReducers({
	    Hall: _sec2.default,
	    routing: routing
	});
	exports.default = reducer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var initState = {
	    hallList: []
	};
	
	function Hall() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case 'hallList':
	            {
	                return Object.assign({}, state, {
	                    hallList: action.data
	                });
	            }
	        default:
	            {
	                return state;
	            }
	    }
	}
	exports.default = Hall;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _index = __webpack_require__(4);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    IndexRoute = _ReactRouter.IndexRoute;
	exports.default = React.createElement(
	    Router,
	    null,
	    React.createElement(Router, { path: '/', component: _index2.default }),
	    React.createElement(Route, { path: '*', component: _index2.default })
	);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _hall = __webpack_require__(5);
	
	var _socket = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ReactRedux = ReactRedux,
	    connect = _ReactRedux.connect;
	
	var Index = function (_React$Component) {
	    _inherits(Index, _React$Component);
	
	    function Index(props) {
	        _classCallCheck(this, Index);
	
	        return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));
	    }
	
	    _createClass(Index, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            (0, _socket.InitSocket)(this.props.dispatch);
	            this.props.dispatch((0, _hall.hallList)());
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                hallList = _props.hallList,
	                dispatch = _props.dispatch;
	
	            return React.createElement(
	                'div',
	                { id: 'index' },
	                React.createElement(
	                    'h1',
	                    null,
	                    'IndexPage'
	                ),
	                hallList.map(function (v, k) {
	                    return React.createElement(
	                        'div',
	                        { onClick: function onClick() {
	                                dispatch((0, _hall.joinGame)(v));
	                            }, key: 'hall_home_' + k },
	                        v
	                    );
	                })
	            );
	        }
	    }]);
	
	    return Index;
	}(React.Component);
	
	var selectState = function selectState(state, ownProps) {
	    return {
	        hallList: state.Hall.hallList
	    };
	};
	
	exports.default = connect(selectState)(Index);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var hallList = exports.hallList = function hallList() {
	    return function (dispatch, getState) {
	        get('/hall/getlist').then(function (d) {
	            dispatch({
	                type: 'hallList',
	                data: d
	            });
	        });
	    };
	};
	
	var joinGame = exports.joinGame = function joinGame(homeId) {
	    return function (dispatch, getState) {};
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var InitSocket = exports.InitSocket = function InitSocket(dispatch) {
	    var socket = io.connect('ws://' + location.host + '/index');
	
	    socket.on('wellcom', function (d) {
	        console.log(d);
	        socket.emit('zony', { data: 'toJoin' });
	    });
	    socket.on('new', function (data) {
	        console.log(data);
	        var news = io.connect('ws://localhost:2111' + data.data);
	    });
	};

/***/ }
/******/ ]);
//# sourceMappingURL=entry.js.map