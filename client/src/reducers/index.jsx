import Game from './re_game'
import Pub from './re_pub'
import HallChat from './re_hall_chat'
const {combineReducers} = Redux,
    {routerReducer} = ReactRouterRedux,
    routing=routerReducer,

    reducer = combineReducers({
        Game,
        Pub,
        HallChat,
        routing
    })
export default reducer;