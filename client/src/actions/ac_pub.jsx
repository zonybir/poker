export const Login=(name,password)=>{
    return (dispatch,getState)=>{
        post('/pub/login',{
            name:name,
            password:password
        })
        .then((d)=>{
            ls('isLogin',1)('userInfo',d.data);
            dispatch({
                type:'Login',
                status:d.status,
                userInfo:d.data
            })
            location.hash='index';
        })
    }
}

export const HallList=()=>{
    return(dispatch,getState)=>{
        get('/hall/list')
        .then((d)=>{
            let list=[],resList=d.data.list;
            for(let key in resList){
                list.push({
                    id:key,
                    user:resList[key].user
                })
            }
            dispatch({
                type:'HallList',
                data:list
            })
        })
    }
}

export const JoinHome=(homeId)=>{
    return (dispatch,getState)=>{
        get('/hall/join',{
            id:homeId
        })
        .then((d)=>{
            d.data.status?
            location.hash='index/game/'+d.data.id:alert(d.message);
        })
    }
}