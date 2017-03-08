import Hall from './sec'
import Socket from './socket'
const {combineReducers} = Redux,
    {routerReducer} = ReactRouterRedux,
    routing=routerReducer,

    reducer = combineReducers({
        Hall,
        Socket,
        routing
    })
export default reducer;