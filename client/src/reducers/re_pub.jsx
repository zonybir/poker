
const initState={
    status:ls('isLogin'),
    userInfo:ls('userInfo')||{}
}

function Pub(state=initState,action){
    switch(action.type){
        case 'Login':{
            return Object.assign({},state,{
                status:action.status,
                userInfo:action.userInfo
            })
        }
        default:{
            return state
        }
    }
}
export default Pub;