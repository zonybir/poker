import Hall from './sec'

const {combineReducers} = Redux,
    {routerReducer} = ReactRouterRedux,
    routing=routerReducer,

    reducer = combineReducers({
        Hall,
        routing
    })
export default reducer;