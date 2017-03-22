
const initState={
    status:0,
    msg:{
        flag:0,
        data:{}
    }
}

function HallChat(state=initState,action){
    switch(action.type){
        case 'hallChat':{
            return Object.assign({},state,{
                status:action.status,
                msg:action.msg
            })
        }
        default:{
            return state
        }
    }
}
export default HallChat;