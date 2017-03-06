
const initState={
    socket:{}
}

function Hall(state=initState,action){
    switch(action.type){
        case 'setConnectName':{
            return Object.assign({},state,{
                [action.key]:action.socket
            })
        }
        default:{
            return state
        }
    }
}
export default Hall;