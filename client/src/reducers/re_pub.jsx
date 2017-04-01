
const initState={
    status:ls('isLogin'),
    userInfo:ls('userInfo')||{},
    hallList:[]
}

function Pub(state=initState,action){
    switch(action.type){
        case 'Login':{
            return Object.assign({},state,{
                status:action.status,
                userInfo:action.userInfo
            })
        }
        case 'HallList':{
            return Object.assign({},state,{
                hallList:action.data
            })
        }
        default:{
            return state
        }
    }
}
export default Pub;