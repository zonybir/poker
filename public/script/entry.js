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
	
	var _routes = __webpack_require__(5);
	
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
	
	var _re_game = __webpack_require__(2);
	
	var _re_game2 = _interopRequireDefault(_re_game);
	
	var _re_pub = __webpack_require__(3);
	
	var _re_pub2 = _interopRequireDefault(_re_pub);
	
	var _re_hall_chat = __webpack_require__(4);
	
	var _re_hall_chat2 = _interopRequireDefault(_re_hall_chat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _Redux = Redux,
	    combineReducers = _Redux.combineReducers,
	    _ReactRouterRedux = ReactRouterRedux,
	    routerReducer = _ReactRouterRedux.routerReducer,
	    routing = routerReducer,
	    reducer = combineReducers({
	    Game: _re_game2.default,
	    Pub: _re_pub2.default,
	    HallChat: _re_hall_chat2.default,
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
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var initState = {
	    statu: 0,
	    homeInfo: {},
	    redyStatus: 0,
	    pokerData: { list: [] },
	
	    socket: {},
	
	    addHomeStatu: 0,
	    homeId: 0,
	
	    pokerList: [],
	    sureSuper: 0,
	    willSuper: 0
	};
	
	function Hall() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case 'GamePubSet':
	            {
	                return Object.assign({}, state, _defineProperty({}, action.key, action.value));
	            }
	        case 'GameConnectInit':
	            {
	                return Object.assign({}, state, {
	                    status: action.status,
	                    homeInfo: action.homeInfo
	                });
	            }
	        case 'soket_addHome':
	            {
	                return Object.assign({}, state, {
	                    addHomeStatu: action.statu,
	                    homeId: action.homeId
	                });
	            }
	        case 'GamePokerSet':
	            {
	                return Object.assign({}, state, {
	                    pokerList: action.poker,
	                    sureSuper: action.sureSuper,
	                    willSuper: action.willSuper
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var initState = {
	    status: ls('isLogin'),
	    userInfo: ls('userInfo') || {},
	    hallList: []
	};
	
	function Pub() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case 'Login':
	            {
	                return Object.assign({}, state, {
	                    status: action.status,
	                    userInfo: action.userInfo
	                });
	            }
	        case 'HallList':
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
	exports.default = Pub;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var initState = {
	    status: 0,
	    msg: {
	        flag: 0,
	        data: {}
	    }
	};
	
	function HallChat() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case 'hallChat':
	            {
	                return Object.assign({}, state, {
	                    status: action.status,
	                    msg: action.msg
	                });
	            }
	        default:
	            {
	                return state;
	            }
	    }
	}
	exports.default = HallChat;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _index = __webpack_require__(6);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _login = __webpack_require__(9);
	
	var _login2 = _interopRequireDefault(_login);
	
	var _hall = __webpack_require__(11);
	
	var _hall2 = _interopRequireDefault(_hall);
	
	var _game_home = __webpack_require__(12);
	
	var _game_home2 = _interopRequireDefault(_game_home);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import Main from './containers/main'
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    IndexRoute = _ReactRouter.IndexRoute;
	exports.default = React.createElement(
	    Router,
	    null,
	    React.createElement(
	        Router,
	        { path: 'index', component: _index2.default },
	        React.createElement(IndexRoute, { component: _hall2.default }),
	        React.createElement(Route, { path: 'game/:id', component: _game_home2.default })
	    ),
	    React.createElement(Router, { path: 'login', component: _login2.default }),
	    React.createElement(Route, { path: '*', component: _index2.default })
	);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _hall_chat = __webpack_require__(7);
	
	var _hall_chat2 = _interopRequireDefault(_hall_chat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	            if (!this.props.loginStatus) location.hash = 'login';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                dispatch = _props.dispatch,
	                children = _props.children,
	                loginStatus = _props.loginStatus,
	                userInfo = _props.userInfo;
	
	            return React.createElement(
	                'div',
	                { id: 'hall' },
	                React.createElement(
	                    'div',
	                    { className: 'header' },
	                    React.createElement(
	                        'div',
	                        { className: 'container' },
	                        React.createElement(
	                            'div',
	                            { className: 'left' },
	                            'ZONYBIR'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'right' },
	                            React.createElement(
	                                'span',
	                                null,
	                                'Wellcome ',
	                                userInfo.name
	                            )
	                        )
	                    ),
	                    children && React.cloneElement(children, { name: 'hall' })
	                ),
	                React.createElement(_hall_chat2.default, { dispatch: dispatch })
	            );
	        }
	    }]);
	
	    return Index;
	}(React.Component);
	
	var selectState = function selectState(state, ownProps) {
	    return {
	        loginStatus: state.Pub.status,
	        userInfo: state.Pub.userInfo
	    };
	};
	
	exports.default = connect(selectState)(Index);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ac_hall_chat = __webpack_require__(8);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ReactRedux = ReactRedux,
	    connect = _ReactRedux.connect;
	
	var HallChat = function (_React$Component) {
	    _inherits(HallChat, _React$Component);
	
	    function HallChat(props) {
	        _classCallCheck(this, HallChat);
	
	        return _possibleConstructorReturn(this, (HallChat.__proto__ || Object.getPrototypeOf(HallChat)).call(this, props));
	    }
	
	    _createClass(HallChat, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _props = this.props,
	                status = _props.status,
	                dispatch = _props.dispatch;
	
	            if (!status) dispatch((0, _ac_hall_chat.InitHallChat)(dispatch));
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if (this.props.flag != nextProps.flag) {
	                this.appendChatInfo(nextProps.msg);
	                nextProps.msg.isSelft ? this.refs.user_chat_info.value = '' : '';
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return React.createElement(
	                'div',
	                { className: 'hall_chat_fixed' },
	                React.createElement(
	                    'div',
	                    { className: 'chat_containter', id: 'chat_main_box' },
	                    React.createElement('ul', { className: 'chat_content', id: 'chat_containers_hall' })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'send_container' },
	                    React.createElement('textarea', { ref: 'user_chat_info' }),
	                    React.createElement(
	                        'span',
	                        { onClick: function onClick() {
	                                return _this2.handleSentMeg();
	                            } },
	                        '\u53D1\u9001'
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'appendChatInfo',
	        value: function appendChatInfo(v) {
	            var dom = d_id('chat_containers_hall');
	            var MsgContainer = create_dom('li', '', '\n            <p class=\'title\'>' + v.name + '<span>' + v.time + '</span></p>\n            <div class=\'info\'>' + v.info + '</div>\n        ');
	            dom.appendChild(MsgContainer);
	            d_id('chat_main_box').scrollTop = 1000000000;
	        }
	    }, {
	        key: 'handleSentMeg',
	        value: function handleSentMeg() {
	            this.props.dispatch((0, _ac_hall_chat.SentMsg)({
	                time: new Date().getTime(),
	                info: this.refs.user_chat_info.value
	            }));
	        }
	    }]);
	
	    return HallChat;
	}(React.Component);
	
	var selectState = function selectState(state) {
	    return {
	        status: state.HallChat.status,
	        flag: state.HallChat.msg.flag,
	        msg: state.HallChat.msg.data
	    };
	};
	exports.default = connect(selectState)(HallChat);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var hallChat = {},
	    hallDispatch = '';
	var InitHallChat = exports.InitHallChat = function InitHallChat(dispatch) {
	    hallDispatch = dispatch;
	
	    hallChat = io.connect('ws://' + location.host + '/hall_chat');
	
	    hallChat.on('connectedOk', setChatInfo);
	    hallChat.on('newMsg', setChatInfo);
	    //hallChat.on('recieveMsgOk',setChatInfo);
	    return {
	        type: ''
	    };
	};
	
	var SentMsg = exports.SentMsg = function SentMsg(msg) {
	    hallChat.emit('newMsg', msg, function (data) {
	        msg.isSelft = 1;
	        msg.flag = new Date().getTime();
	        msg.name = ls('userInfo').name;
	        setChatInfo(msg);
	    });
	    return {
	        type: ''
	    };
	};
	var setChatInfo = function setChatInfo(msg) {
	    console.log(msg);
	    msg.time = get_date(msg.time);
	    hallDispatch({
	        type: 'hallChat',
	        status: 1,
	        msg: {
	            flag: new Date().getTime(),
	            data: msg
	        }
	    });
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ac_pub = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ReactRedux = ReactRedux,
	    connect = _ReactRedux.connect;
	
	var LoginPage = function (_React$Component) {
	    _inherits(LoginPage, _React$Component);
	
	    function LoginPage(props) {
	        _classCallCheck(this, LoginPage);
	
	        return _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call(this, props));
	    }
	
	    _createClass(LoginPage, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props = this.props,
	                dispatch = _props.dispatch,
	                status = _props.status;
	
	            return React.createElement(
	                'div',
	                { id: 'login' },
	                React.createElement(
	                    'div',
	                    { className: 'login_content' },
	                    React.createElement('input', { type: 'text', placeholder: 'your name', ref: 'name' }),
	                    React.createElement('br', null),
	                    React.createElement('input', { type: 'password', placeholder: 'your password', ref: 'password' }),
	                    React.createElement('br', null),
	                    React.createElement('input', { type: 'submit', value: 'sign in', onClick: function onClick() {
	                            return _this2.handleLogin();
	                        } })
	                )
	            );
	        }
	    }, {
	        key: 'handleLogin',
	        value: function handleLogin() {
	            var name = this.refs.name.value,
	                pwd = this.refs.password.value;
	            if (name && pwd) this.props.dispatch((0, _ac_pub.Login)(name, pwd));else alert('请填写用户名和密码');
	        }
	    }]);
	
	    return LoginPage;
	}(React.Component);
	
	var selectState = function selectState(state, ownProps) {
	    return {
	        status: state.Pub.status
	    };
	};
	
	exports.default = connect(selectState)(LoginPage);

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Login = exports.Login = function Login(name, password) {
	    return function (dispatch, getState) {
	        post('/pub/login', {
	            name: name,
	            password: password
	        }).then(function (d) {
	            ls('isLogin', 1)('userInfo', d.data);
	            dispatch({
	                type: 'Login',
	                status: d.status,
	                userInfo: d.data
	            });
	            location.hash = 'index';
	        });
	    };
	};
	
	var HallList = exports.HallList = function HallList() {
	    return function (dispatch, getState) {
	        get('/hall/list').then(function (d) {
	            var resList = d.data.list;
	            dispatch({
	                type: 'HallList',
	                data: resList
	            });
	        });
	    };
	};
	
	var JoinHome = exports.JoinHome = function JoinHome(homeId) {
	    return function (dispatch, getState) {
	        get('/hall/join', {
	            id: homeId
	        }).then(function (d) {
	            d.data.status ? location.hash = 'index/game/' + d.data.id : alert(d.message);
	        });
	    };
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ac_pub = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ReactRedux = ReactRedux,
	    connect = _ReactRedux.connect;
	
	var Hall = function (_React$Component) {
	    _inherits(Hall, _React$Component);
	
	    function Hall(props) {
	        _classCallCheck(this, Hall);
	
	        return _possibleConstructorReturn(this, (Hall.__proto__ || Object.getPrototypeOf(Hall)).call(this, props));
	    }
	
	    _createClass(Hall, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.props.dispatch((0, _ac_pub.HallList)());
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                hallList = _props.hallList,
	                dispatch = _props.dispatch;
	
	            return React.createElement(
	                'div',
	                { className: 'hall_list' },
	                React.createElement(
	                    'div',
	                    { className: 'home_list' },
	                    hallList.map(function (v, k) {
	                        return React.createElement(
	                            'div',
	                            { className: 'game_home', onClick: function onClick() {
	                                    dispatch((0, _ac_pub.JoinHome)(v.id));
	                                }, key: 'hall_home_' + k },
	                            React.createElement('div', { className: 'user_position top' }),
	                            React.createElement('div', { className: 'user_position left' }),
	                            React.createElement('div', { className: 'user_position right' }),
	                            React.createElement(
	                                'p',
	                                { className: 'home_id' },
	                                '房间ID：' + v.id
	                            )
	                        );
	                    })
	                )
	            );
	        }
	    }]);
	
	    return Hall;
	}(React.Component);
	
	var selectState = function selectState(state, ownProps) {
	    return {
	        hallList: state.Pub.hallList
	    };
	};
	
	exports.default = connect(selectState)(Hall);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ac_game = __webpack_require__(13);
	
	var _userPoker = __webpack_require__(14);
	
	var _userPoker2 = _interopRequireDefault(_userPoker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ReactRedux = ReactRedux,
	    connect = _ReactRedux.connect;
	
	var GameHome = function (_React$Component) {
	    _inherits(GameHome, _React$Component);
	
	    function GameHome(props) {
	        _classCallCheck(this, GameHome);
	
	        return _possibleConstructorReturn(this, (GameHome.__proto__ || Object.getPrototypeOf(GameHome)).call(this, props));
	        //InitSocket(this.props.dispatch);
	    }
	
	    _createClass(GameHome, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.props.params.id ? (0, _ac_game.Init)(this.props.dispatch, this.props.params.id) : location.hash = 'index';
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            //alert(1);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                dispatch = _props.dispatch,
	                params = _props.params,
	                socketStatu = _props.socketStatu,
	                homeInfo = _props.homeInfo,
	                redyStatus = _props.redyStatus,
	                pokerData = _props.pokerData,
	                addHomeStatu = _props.addHomeStatu,
	                homeId = _props.homeId,
	                pokerList = _props.pokerList,
	                sureSuper = _props.sureSuper,
	                willSuper = _props.willSuper;
	
	            return React.createElement(
	                'div',
	                { className: 'game_home' },
	                React.createElement(
	                    'h3',
	                    { className: 'home_title' },
	                    '\u60A8\u5DF2\u8FDB\u5165',
	                    homeInfo.id,
	                    '\u623F\u95F4',
	                    socketStatu ? '' : React.createElement(
	                        'span',
	                        null,
	                        '\u6B63\u5728\u8FDE\u63A5\u6E38\u620F\u670D\u52A1\u5668'
	                    )
	                ),
	                !redyStatus ? React.createElement(
	                    'p',
	                    { onClick: function onClick() {
	                            return (0, _ac_game.RedyGo)();
	                        } },
	                    'redy'
	                ) : React.createElement(_userPoker2.default, { dispatch: dispatch, data: pokerData, pokerList: pokerList, sureSuper: sureSuper, willSuper: willSuper })
	            );
	        }
	    }]);
	
	    return GameHome;
	}(React.Component);
	
	var selectState = function selectState(state, ownProps) {
	    return {
	        socketStatu: state.Game.status,
	        homeInfo: state.Game.homeInfo,
	        redyStatus: state.Game.redyStatus,
	        pokerData: state.Game.pokerData,
	
	        addHomeStatu: state.Game.addHomeStatu,
	        homeId: state.Game.homeId,
	
	        pokerList: state.Game.pokerList,
	        sureSuper: state.Game.sureSuper,
	        willSuper: state.Game.willSuper
	    };
	};
	
	exports.default = connect(selectState)(GameHome);

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var player,
	    dispatch,
	    pokerList = [];
	var Init = exports.Init = function Init(ReducerDispatch, homeId) {
	    dispatch = ReducerDispatch;
	    if (typeof player == 'undefined') {
	        player = io.connect('ws://' + location.host + '/game');
	        LisentAdd(homeId);
	    } else player.emit('JionGameHome', { id: homeId }, function (d) {
	        console.log(d);
	        dispatch({
	            type: 'GameConnectInit',
	            statu: d.status,
	            homeInfo: d.data
	        });
	    });
	};
	
	var LisentAdd = function LisentAdd(homeId) {
	
	    player.on('ERROR', function (d) {
	        console.log(d.data);
	        location.hash = 'index';
	    });
	    player.on('namespace', function (d) {
	        console.log(d.msg);
	    });
	
	    player.on('connectedOk', function () {
	        player.emit('JionGameHome', { id: homeId }, function (d) {
	            dispatch({
	                type: 'GameConnectInit',
	                status: d.status,
	                homeInfo: d.homeInfo
	            });
	        });
	    });
	
	    player.on('startGame', function () {
	        player.emit('startGame', {}, function (d) {
	            pokerList = d.list;
	            console.log(d);
	            dispatch({
	                type: 'GamePokerSet',
	                poker: pokerList.sort(pokerSort),
	                sureSuper: 0,
	                willSuper: d.super
	            });
	        });
	    });
	};
	
	var RedyGo = exports.RedyGo = function RedyGo() {
	    player.emit('redygo', {}, function (d) {
	        console.log(d);
	        dispatch({
	            type: 'GamePubSet',
	            key: 'redyStatus',
	            value: d.status
	        });
	    });
	};
	var CheckUserInHome = exports.CheckUserInHome = function CheckUserInHome(homeId) {
	    player.emit('checkUserInHome', { id: homeId }, function (d) {});
	};
	
	var ImSuper = exports.ImSuper = function ImSuper() {
	    player.emit('imSuper', {}, function (d) {
	        if (d.status) {
	            console.log(pokerList.concat(d.poker).sort(pokerSort));
	            console.log(d.poker);
	            dispatch({
	                type: 'GamePokerSet',
	                poker: pokerList.concat(d.poker).sort(pokerSort),
	                sureSuper: 1,
	                willSuper: 0
	            });
	        } else alert('你不是地主');
	    });
	};
	
	var WillSentPoker = exports.WillSentPoker = function WillSentPoker(sentPokerList, callBack) {
	    return function (dispatch, getState) {
	        var pokerList = getState().Game.pokerList,
	            canSent = checkPokerRule(pokerList, sentPokerList);
	        callBack(canSent);
	        if (!canSent) return;else {
	            player.emit('sentPoker', { poker: sentPokerList }, function (d) {
	                if (!d.status) {
	                    alert(d.msg);
	                } else {
	                    dispatch({
	                        type: 'GamePubSet',
	                        key: 'pokerList',
	                        value: JSON.parse(JSON.stringify(pokerList))
	                    });
	                }
	            });
	        }
	    };
	};
	
	function pokerSort(a, b) {
	    a = a.split('-');
	    b = b.split('-');
	    a[1] == 2 ? a[1] = 33 : '';
	    b[1] == 2 ? b[1] = 33 : '';
	    var value = a[1] - b[1],
	        color = b[0] - a[0];
	    if (value == 0) return color;
	    return value;
	}
	
	function checkPokerRule(poker, outList) {
	    console.log(outList);
	    var inPoker = outList.every(function (v) {
	        return poker.indexOf(v) != -1;
	    });
	    if (!inPoker) return false; // hack  without in this poker 
	    var rule = { defPoker: [] };
	    outList.map(function (v, k) {
	        v = v.split('-')[1];
	        if (!rule[v]) {
	            rule[v] = 1;
	            rule.defPoker.push(v - 0);
	        } else rule[v]++;
	    }); //count diffrent poker item in rule,and push into defPoker
	    rule.defPoker = rule.defPoker.sort(function (a, b) {
	        return a - b;
	    }); // sort defPoker
	    var diffrPokerNum = [],
	        // diffrent poker num list
	    sameMax = 1,
	        sureRule = false,
	        outPokerLen = rule.defPoker.length;
	    rule.defPoker.map(function (v, k) {
	        return diffrPokerNum.push(rule[v]);
	    });
	    sameMax = Math.max.apply(this, diffrPokerNum); // get max diffrent poker num 
	    if (sameMax == 1) {
	        //A       eg:A,ABCDE...
	        var isSing = false;
	        if (outPokerLen == 1) isSing = true;
	        var isOrder = true;
	        if (outPokerLen > 4) {
	            for (var i = 0, len = outPokerLen - 1; i < len; i++) {
	                //sure order by poker;
	                if (rule.defPoker[i] + 1 != rule.defPoker[i + 1]) isOrder = false;
	                if (rule.defPoker[i] == 2 || rule.defPoker[i] == 88) isOrder = false; // can not include 2 and king;
	            }
	        } else isOrder = false;
	        sureRule = isSing ? isSing : isOrder;
	    } else if (sameMax == 2) {
	        //AA     eg:AA,AABBCC...
	        var isDoub = false;
	        if (outPokerLen == 1) isDoub = true;
	        var isDoubOrder = true;
	        if (outPokerLen > 2) {
	            for (var _i = 0, _len = outPokerLen - 1; _i < _len; _i++) {
	                //sure order by poker;
	                if (rule.defPoker[_i] + 1 != rule.defPoker[_i + 1]) isDoubOrder = false;
	                if (rule.defPoker[_i] == 2 || rule.defPoker[_i] == 88) isDoubOrder = false; // can not include 2 and king;
	                if (rule[rule.defPoker[_i + 1]] != 2) isDoubOrder = false;
	            }
	            if (rule[rule.defPoker[0]] != 2) isDoubOrder = false;
	        } else isDoubOrder = false;
	        sureRule = isDoub ? isDoub : isDoubOrder;
	    } else if (sameMax == 3) {
	        //AAA     eg:AAAB,AAABB,AAABBB,     AAABBBCC,AAABBBCD
	        var AAAX = false,
	            AAABBBX = true;
	        if (outPokerLen <= 2) AAAX = true;else {
	            var AAAlist = [],
	                withPokerList = [],
	                withPokerNum = {};
	            for (var _i2 = 0, _len3 = outPokerLen, p = 0; _i2 < _len3; _i2++) {
	                p = rule.defPoker[_i2];
	                if (rule[p] == 3) AAAlist.push(p);else {
	                    withPokerNum[p] = rule[p];
	                    withPokerList.push(p);
	                }
	            }
	            var _len2 = AAAlist.length;
	            if (_len2 <= 1) AAABBBX = false;else {
	                //min same poker is AAABBB
	                for (var _i3 = 0, AAAlen = _len2 - 1; _i3 < AAAlen; _i3++) {
	                    if (AAAlist[_i3] + 1 != AAAlist[_i3 + 1]) AAABBBX = false; // is not order by XXX
	                }
	            }
	            if (AAABBBX) {
	                // checke with poker
	                //let bt=outPokerLen-len;
	                var factWithPokerNum = 0;
	                withPokerList.map(function (v, k) {
	                    factWithPokerNum += withPokerNum[v];
	                });
	                if (factWithPokerNum != _len2) {
	                    //same poker num != withPokerNum
	                    if (factWithPokerNum == 2 * _len2) {
	                        withPokerList.map(function (v, k) {
	                            if (withPokerNum[v] != 2) AAABBBX = false;
	                        });
	                    } else AAABBBX = false;
	                }
	            }
	        };
	        sureRule = AAAX ? AAAX : AAABBBX;
	    } else if (sameMax == 4) {
	        //AAAA      AAAABC   AAAABB 
	        var AAAA = false;
	        if (outPokerLen == 1) AAAA = true;else {
	            var diffrentPokerListNum = 0,
	                diffrentPokerNum = 0;
	            rule.defPoker.map(function (v, k) {
	                if (rule[v] != 4) {
	                    diffrentPokerListNum++;
	                    diffrentPokerNum += rule[v] - 0;
	                }
	            });
	            if (diffrentPokerListNum == 1 && diffrentPokerNum == 2) AAAA = true;else if (diffrentPokerListNum == 2 && (diffrentPokerNum == 2 || diffrentPokerNum == 4)) AAAA = true;
	        }
	        //need more think.    eg  AAABBBBX  AAABBBCCCC AAABBBBCC AAABBBCCCDDDEEEE
	        if (outPokerLen > 2) {
	            alert('need more think.\neg:\nAAABBBBX  AAABBBCCCC AAABBBBCC AAABBBCCCDDDEEEE');
	            var _AAAlist = [];
	            rule.defPoker.map(function (v, k) {
	                if (rule[v] >= 3) {}
	            });
	        }
	        sureRule = AAAA;
	    }
	    //console.log(sureRule);
	    return sureRule;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ac_game = __webpack_require__(13);
	
	var _pokeritem = __webpack_require__(15);
	
	var _pokeritem2 = _interopRequireDefault(_pokeritem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UserPoker = function (_React$Component) {
	    _inherits(UserPoker, _React$Component);
	
	    function UserPoker(props) {
	        _classCallCheck(this, UserPoker);
	
	        var _this = _possibleConstructorReturn(this, (UserPoker.__proto__ || Object.getPrototypeOf(UserPoker)).call(this, props));
	
	        _this.state = {
	            sentPoker: []
	        };
	        return _this;
	    }
	
	    _createClass(UserPoker, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                sentPoker: []
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props = this.props,
	                dispatch = _props.dispatch,
	                pokerList = _props.pokerList,
	                sureSuper = _props.sureSuper,
	                willSuper = _props.willSuper;
	
	            return React.createElement(
	                'div',
	                { className: 'playerPoker' },
	                React.createElement(
	                    'div',
	                    { className: 'pokerContent' },
	                    pokerList.map(function (v, k) {
	                        return React.createElement(_pokeritem2.default, { k: k, v: v, key: "poker_item_" + k, willSent: _this2.state.sentPoker, selectPokerItem: _this2.handleSelectPokerItem.bind(_this2) });
	                    })
	                ),
	                sureSuper ? '你是地主' : willSuper ? React.createElement(
	                    'h2',
	                    { onClick: function onClick() {
	                            return (0, _ac_game.ImSuper)();
	                        } },
	                    '\u53EB\u5730\u4E3B'
	                ) : '',
	                React.createElement(
	                    'p',
	                    { onClick: this.handleSentPoker.bind(this) },
	                    '\u51FA\u724C'
	                )
	            );
	        }
	    }, {
	        key: 'handleSentPoker',
	        value: function handleSentPoker(index) {
	            var sentPoker = this.state.sentPoker,
	                dispatch = this.props.dispatch;
	
	            if (sentPoker.length <= 0) {
	                alert('请选择你要出的牌');
	                return;
	            }
	            dispatch((0, _ac_game.WillSentPoker)(sentPoker, function (d) {
	                console.log(d);
	            }));
	        }
	    }, {
	        key: 'handleSelectPokerItem',
	        value: function handleSelectPokerItem(v) {
	            var sentPoker = this.state.sentPoker,
	                newSentPoker = [],
	                hashV = 0;;
	            //console.log(sentPoker);
	            for (var i = 0, len = sentPoker.length; i < len; i++) {
	                //console.log(i);
	                if (sentPoker[i] != v) newSentPoker.push(sentPoker[i]);else hashV = 1;
	            }
	            hashV ? '' : newSentPoker.push(v);
	            //console.log(newSentPoker)
	            this.setState({
	                sentPoker: newSentPoker
	            });
	        }
	    }]);
	
	    return UserPoker;
	}(React.Component);
	
	exports.default = UserPoker;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PokerItem = function (_React$Component) {
	    _inherits(PokerItem, _React$Component);
	
	    function PokerItem(props) {
	        _classCallCheck(this, PokerItem);
	
	        return _possibleConstructorReturn(this, (PokerItem.__proto__ || Object.getPrototypeOf(PokerItem)).call(this, props));
	    }
	
	    _createClass(PokerItem, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props = this.props,
	                v = _props.v,
	                k = _props.k,
	                willSent = _props.willSent;
	
	            var pokerValueA = this.pokerValue(v),
	                isWillSent = 0;
	            willSent.map(function (vi, ki) {
	                if (v == vi) isWillSent = 1;
	            });
	            return React.createElement(
	                'div',
	                { className: 'pokerItem ' + pokerValueA[0].color, style: { left: 30 * k + 'px', top: isWillSent ? '0' : '20px' }, onClick: function onClick() {
	                        _this2.props.selectPokerItem(v);
	                    } },
	                React.createElement(
	                    'span',
	                    { className: 'pokerValue' },
	                    pokerValueA[1]
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'pokerColortext' },
	                    pokerValueA[0].text
	                )
	            );
	        }
	    }, {
	        key: 'pokerColor',
	        value: function pokerColor(v) {
	            switch (v - 0) {
	                case 1:
	                    return { text: '黑桃', color: 'blank' };
	                case 2:
	                    return { text: '红桃', color: 'red' };
	                case 3:
	                    return { text: '梅花', color: 'flower' };
	                case 4:
	                    return { text: '方块', color: 'area' };
	                case 5:
	                    return { text: '小王', color: 'king_s' };
	                case 6:
	                    return { text: '大王', color: 'king' };
	            }
	        }
	    }, {
	        key: 'pokerIndex',
	        value: function pokerIndex(v) {
	            v -= 0;
	            return v == 11 ? 'J' : v == 12 ? 'Q' : v == 13 ? 'K' : v == 14 ? 'A' : v == 88 ? '王' : v;
	        }
	    }, {
	        key: 'pokerValue',
	        value: function pokerValue(v) {
	            v = v.split('-');
	            return [this.pokerColor(v[0]), this.pokerIndex(v[1])];
	        }
	    }]);
	
	    return PokerItem;
	}(React.Component);
	
	exports.default = PokerItem;

/***/ }
/******/ ]);
//# sourceMappingURL=entry.js.map