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
	
	var _routes = __webpack_require__(4);
	
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
	
	var _socket = __webpack_require__(3);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _Redux = Redux,
	    combineReducers = _Redux.combineReducers,
	    _ReactRouterRedux = ReactRouterRedux,
	    routerReducer = _ReactRouterRedux.routerReducer,
	    routing = routerReducer,
	    reducer = combineReducers({
	    Hall: _sec2.default,
	    Socket: _socket2.default,
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var initState = {
	    socket: {},
	    statu: 0,
	    addHomeStatu: 0,
	    homeId: 0,
	    pokerList: []
	};
	
	function Hall() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case 'setConnectName':
	            {
	                return Object.assign({}, state, _defineProperty({}, action.key, action.socket));
	            }
	        case 'soket_connectHome':
	            {
	                return Object.assign({}, state, {
	                    statu: action.statu
	                });
	            }
	        case 'soket_addHome':
	            {
	                return Object.assign({}, state, {
	                    addHomeStatu: action.statu,
	                    homeId: action.homeId
	                });
	            }
	        case 'setPoker':
	            {
	                return Object.assign({}, state, {
	                    pokerList: action.pokerList
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _index = __webpack_require__(5);
	
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _hall = __webpack_require__(6);
	
	var _socket = __webpack_require__(7);
	
	var _userPoker = __webpack_require__(9);
	
	var _userPoker2 = _interopRequireDefault(_userPoker);
	
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
	
	        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));
	
	        _this.state = {
	            getLeven: 0
	        };
	        return _this;
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
	            var _this2 = this;
	
	            var _props = this.props,
	                hallList = _props.hallList,
	                dispatch = _props.dispatch,
	                socketStatu = _props.socketStatu,
	                addHomeStatu = _props.addHomeStatu,
	                homeId = _props.homeId,
	                pokerList = _props.pokerList;
	
	            if (homeId && addHomeStatu) {
	                return React.createElement(
	                    'div',
	                    { id: 'index' },
	                    React.createElement(
	                        'h4',
	                        null,
	                        'addHome ',
	                        homeId
	                    ),
	                    pokerList.length <= 0 ? React.createElement(
	                        'p',
	                        { onClick: function onClick() {
	                                (0, _socket.getPoker)(dispatch);
	                            } },
	                        'click to get poker'
	                    ) : pokerList.map(function (vp, kp) {
	                        return React.createElement(_userPoker2.default, { kp: kp, vp: vp, key: 'user_play_' + kp, getLeven: _this2.state.getLeven, callBack: _this2.handleGetLeven.bind(_this2), dispatch: dispatch });
	                    })
	                );
	            }
	            return React.createElement(
	                'div',
	                { id: 'index' },
	                React.createElement(
	                    'h1',
	                    null,
	                    'IndexPage'
	                ),
	                React.createElement(
	                    'h2',
	                    null,
	                    socketStatu ? 'ok' : 'fail'
	                ),
	                hallList.map(function (v, k) {
	                    return React.createElement(
	                        'div',
	                        { onClick: function onClick() {
	                                (0, _socket.AddPlayHome)(dispatch, v);
	                            }, key: 'hall_home_' + k },
	                        v
	                    );
	                })
	            );
	        }
	    }, {
	        key: 'handleGetLeven',
	        value: function handleGetLeven(kp) {
	            var _this3 = this;
	
	            this.setState({
	                getLeven: 1
	            }, function () {
	                _this3.props.dispatch((0, _socket.getLevePoker)(kp));
	            });
	        }
	    }]);
	
	    return Index;
	}(React.Component);
	
	var selectState = function selectState(state, ownProps) {
	    return {
	        hallList: state.Hall.hallList,
	        socketStatu: state.Socket.statu,
	        addHomeStatu: state.Socket.addHomeStatu,
	        homeId: state.Socket.homeId,
	        pokerList: state.Socket.pokerList
	    };
	};
	
	exports.default = connect(selectState)(Index);

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var player = {};
	var InitSocket = exports.InitSocket = function InitSocket(dispatch) {
	    player = io.connect('ws://' + location.host + '/index');
	    console.log(player);
	    player.on('connectedOk', function (d) {
	        dispatch({
	            type: 'soket_connectHome',
	            statu: d.statu
	        });
	    });
	};
	
	var AddPlayHome = exports.AddPlayHome = function AddPlayHome(dispatch, homeId) {
	    player.emit('addPlayHome', {
	        id: homeId
	    });
	    player.on('addHomeStatu', function (d) {
	        dispatch({
	            type: 'soket_addHome',
	            statu: d.statu,
	            homeId: d.id
	        });
	    });
	};
	
	var getPoker = exports.getPoker = function getPoker(dispatch) {
	    player.emit('getPoker');
	    player.on('getPoker', function (d) {
	        var poker = sortPoker(d.poker);
	        console.log(poker);
	        dispatch({
	            type: 'setPoker',
	            pokerList: poker
	        });
	    });
	};
	
	var getLevePoker = exports.getLevePoker = function getLevePoker(playerIndex) {
	    return function (dispatch, getState) {
	        player.emit('getLevePoker');
	        player.on('getLevePoker', function (d) {
	            var AllP = getState().Socket.pokerList,
	                poker = void 0;
	            console.log(d.data);
	            d.data.map(function (v, k) {
	                AllP[playerIndex].push(v);
	            });
	            poker = sortPoker(AllP);
	            dispatch({
	                type: 'setPoker',
	                pokerList: poker
	            });
	        });
	    };
	};
	
	var WillSentPoker = exports.WillSentPoker = function WillSentPoker(index, sentPokerList, callBack) {
	    return function (dispatch, getState) {
	        var AllPoker = getState().Socket.pokerList,
	            thisPoker = AllPoker[index],
	            canSent = checkPokerRule(thisPoker, sentPokerList);
	        console.log(canSent);
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
	function sortPoker(arr) {
	    var n = [[], [], []];
	    arr.map(function (v, k) {
	        n[k] = v.sort(pokerSort);
	    });
	    return n;
	}
	
	function checkPokerRule(poker, outList) {
	    var inPoker = outList.every(function (v) {
	        return poker.indexOf(v) != -1;
	    });
	    if (!inPoker) return false;
	    var rule = { defPoker: [] };
	    outList.map(function (v, k) {
	        v = v.split('-')[1];
	        if (!rule[v]) {
	            rule[v] = 1;
	            rule.defPoker.push(v - 0);
	        } else rule[v]++;
	    });
	    rule.defPoker = rule.defPoker.sort(function (a, b) {
	        return a - b;
	    });
	    var diffrPokerNum = [],
	        sameMax = 1,
	        sureRule = false,
	        outPokerLen = rule.defPoker.length;
	    rule.defPoker.map(function (v, k) {
	        return diffrPokerNum.push(rule[v]);
	    });
	    sameMax = Math.max.apply(this, diffrPokerNum);
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
	        var AAAX = false;
	        if (outPokerLen == 2) AAAX = true;
	        var AAABBBX = true;
	        if (outPokerLen > 2) {
	            var AAAlist = [];
	            for (var _i2 = 0, _len3 = outPokerLen; _i2 < _len3; _i2++) {
	                if (rule[rule.defPoker[_i2]] == 3) AAAlist.push(rule.defPoker[_i2]);
	            }
	            var _len2 = AAAlist.length;
	            if (_len2 <= 1) AAABBBX = false;else {
	                var bt = outPokerLen - AAAlist.length;
	            }
	        } else AAABBBX = false;
	    } else if (sameMax == 4) {//AAAA      AAAABC   AAAABB 
	
	    }
	    console.log(sureRule);
	    console.log(rule);
	    return;
	    if (rule.defPoker.length == 1) {
	        //only defrent one poker  eg: A,AA,AAA,AAAA
	        var outText = '',
	            sinV = rule.defPoker[0],
	            singNum = rule[sinV];
	        outText = singNum == 1 ? '单个' : singNum == 2 ? sinV == 88 ? '王炸' : '对子' : singNum == 3 ? '三不带' : singNum == 4 ? '炸弹' : '你能开外挂';
	        sureRule = true;
	        console.log(outText);
	    } else if (rule.defPoker.length == 2) {
	        // has two defrent poker out    eg:AAAB,AAABB,AAABBB
	        var _outText = '',
	            hasThree = false,
	            nextPoker = '',
	            nextPokerNum = 0;
	        rule.defPoker.map(function (v, k) {
	            if (rule[v] == 3) hasThree = true;else nextPoker = v;
	        });
	        if (hasThree) {
	            nextPokerNum = rule[nextPoker];
	            _outText = nextPokerNum == 1 ? '三带一' : nextPokerNum == 2 ? '三带二' : nextPokerNum == 3 ? '双飞不带' : '';
	        }
	        sureRule = hasThree && !!_outText;
	        console.log(_outText);
	    } else if (rule.defPoker.length == 3) {//eg:AABBCC,AAABBBEE,AAAABC,
	
	    } else if (rule.defPoker.length > 4) {
	        //order out
	        var _isOrder = true;
	        rule.defPoker.map(function (v, k) {
	            //sure only one poker in this
	            if (rule[v] != 1) _isOrder = false;
	        });
	        for (var _i3 = 0, _len4 = rule.defPoker.length - 1; _i3 < _len4; _i3++) {
	            //sure order by poker;
	            if (rule.defPoker[_i3] + 1 != rule.defPoker[_i3 + 1]) _isOrder = false;
	            if (rule.defPoker[_i3] == 2 || rule.defPoker[_i3] == 88) _isOrder = false; // can not include 2 and king;
	        }
	        sureRule = _isOrder;
	    }
	
	    console.log(sureRule);
	    console.log(rule);
	}

/***/ },
/* 8 */
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _socket = __webpack_require__(7);
	
	var _pokeritem = __webpack_require__(8);
	
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
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props = this.props,
	                dispatch = _props.dispatch,
	                vp = _props.vp,
	                kp = _props.kp,
	                getLeven = _props.getLeven;
	
	            return React.createElement(
	                'div',
	                { className: 'playerPoker' },
	                React.createElement(
	                    'h1',
	                    null,
	                    '\u89D2\u8272\uFF1A',
	                    kp + 1
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'pokerContent' },
	                    vp.map(function (v, k) {
	                        return React.createElement(_pokeritem2.default, { k: k, v: v, key: "poker_item_" + k, willSent: _this2.state.sentPoker, selectPokerItem: _this2.handleSelectPokerItem.bind(_this2) });
	                    })
	                ),
	                getLeven ? "" : React.createElement(
	                    'h2',
	                    { onClick: function onClick() {
	                            _this2.props.callBack(kp);
	                        } },
	                    '\u5F97\u5230\u5730\u4E3B'
	                ),
	                React.createElement(
	                    'p',
	                    { onClick: this.handleSentPoker.bind(this, kp) },
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
	            dispatch((0, _socket.WillSentPoker)(index, sentPoker, function () {
	                console.log(1);
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

/***/ }
/******/ ]);
//# sourceMappingURL=entry.js.map