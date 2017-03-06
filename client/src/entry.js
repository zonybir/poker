import storeData from './reducers'
import Routes from './routes'

const {createStore,applyMiddleware} = Redux,
    {Provider} = ReactRedux,
    {Router,Route,hashHistory,browserHistory} = ReactRouter,
    {syncHistoryWithStore} = ReactRouterRedux,

    store = createStore(
        storeData,
        applyMiddleware(ReduxThunk.default)
    ),

    history = syncHistoryWithStore(hashHistory,store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={Routes} />
    </Provider>,
    document.getElementById('zonybir')
)