
const initState={
    statu:0,
    homeInfo:{},
    redyStatus:0,
    pokerData:[],

    
    socket:{},
    
    addHomeStatu:0,
    homeId:0,
    pokerList:[]
}

function Hall(state=initState,action){
    switch(action.type){
        case 'GameSetHomeInfo':{
            return Object.assign({},state,{
                homeInfo:action.data
            })
        }
        case 'GamePubSet':{
            return Object.assign({},state,{
                [action.key]:action.value
            })
        }
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