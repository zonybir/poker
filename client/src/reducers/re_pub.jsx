
const initState={
    status:0,
    userInfo:{}
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