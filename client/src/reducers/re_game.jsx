
const initState={
    statu:0,
    homeInfo:{},
    redyStatus:0,
    pokerData:{list:[]},
    
    socket:{},
    
    addHomeStatu:0,
    homeId:0,


    pokerList:[],
    sureSuper:0,
    willSuper:0
}

function Hall(state=initState,action){
    switch(action.type){
        case 'GamePubSet':{
            return Object.assign({},state,{
                [action.key]:action.value
            })
        }
        case 'GameConnectInit':{
            return Object.assign({},state,{
                status:action.status,
                homeInfo:action.homeInfo
            })
        }
        case 'soket_addHome':{
            return Object.assign({},state,{
                addHomeStatu:action.statu,
                homeId:action.homeId
            })
        }
        case 'GamePokerSet':{
            return Object.assign({},state,{
                pokerList:action.poker,
                sureSuper:action.sureSuper,
                willSuper:action.willSuper
            })
        }
        default:{
            return state
        }
    }
}
export default Hall;