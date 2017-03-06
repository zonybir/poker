
export const InitSocket=(dispatch)=>{
    let socket = io.connect('ws://'+location.host+'/index');

    socket.on('wellcom',function(d){
        console.log(d);
        socket.emit('zony',{data:'toJoin'});
        
    })
    socket.on('new',function(data){
        console.log(data);
        var news = io.connect('ws://localhost:2111'+data.data);
    })
}