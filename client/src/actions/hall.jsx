export const hallList=()=>{
    return (dispatch,getState)=>{
        get('/hall/list')
        .then((d)=>{
            dispatch({
                type:'hallList',
                data:d.data.list
            })
        })
    }
}

export const joinGame=(homeId)=>{
    return (dispatch,getState)=>{
        get('/hall/join',{
            id:homeId
        })
        .then((d)=>{
            dispatch({
                type:'GameSetHomeInfo',
                data:d.data
            })
            location.hash='index/game';
        })
    }
}