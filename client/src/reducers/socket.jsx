
const initState={
    socket:{},
    statu:0,
    addHomeStatu:0,
    homeId:0,
    pokerList:[]
}

function Hall(state=initState,action){
    switch(action.type){
        case 'setConnectName':{
            return Object.assign({},state,{
                [action.key]:action.socket
            })
        }
        case 'soket_connectHome':{
            return Object.assign({},state,{
                statu:action.statu
            })
        }
        case 'soket_addHome':{
            return Object.assign({},state,{
                addHomeStatu:action.statu,
                homeId:action.homeId
            })
        }
        case 'setPoker':{
            return Object.assign({},state,{
                pokerList:action.pokerList
            })
        }
        default:{
            return state
        }
    }
}
export default Hall;