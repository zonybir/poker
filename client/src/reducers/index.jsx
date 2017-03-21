import Hall from './sec'
import Socket from './socket'
import Pub from './re_pub'
const {combineReducers} = Redux,
    {routerReducer} = ReactRouterRedux,
    routing=routerReducer,

    reducer = combineReducers({
        Hall,
        Socket,
        Pub,
        routing
    })
export default reducer;