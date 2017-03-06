export const hallList=()=>{
    return (dispatch,getState)=>{
        get('/hall/getlist')
        .then((d)=>{
            dispatch({
                type:'hallList',
                data:d
            })
        })
    }
}

export const joinGame=(homeId)=>{
    return (dispatch,getState)=>{
        
    }
}