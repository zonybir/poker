
const initState={
    hallList:[]
}

function Hall(state=initState,action){
    switch(action.type){
        case 'hallList':{
            return Object.assign({},state,{
                hallList:action.data
            })
        }
        default:{
            return state
        }
    }
}
export default Hall;