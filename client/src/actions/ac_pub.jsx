export const Login=(name,password)=>{
    return (dispatch,getState)=>{
        post('/pub/login',{
            name:name,
            password:password
        })
        .then((d)=>{
            dispatch({
                type:'Login',
                status:d.status,
                userInfo:d.data
            })
            location.hash='index'
        })
    }
}