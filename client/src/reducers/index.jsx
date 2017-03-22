import Hall from './sec'
import Socket from './socket'
import Pub from './re_pub'
import HallChat from './re_hall_chat'
const {combineReducers} = Redux,
    {routerReducer} = ReactRouterRedux,
    routing=routerReducer,

    reducer = combineReducers({
        Hall,
        Socket,
        Pub,
        HallChat,
        routing
    })
export default reducer;