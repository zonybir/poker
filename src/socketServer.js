
const server=(io)=>{
    io.of('/index')
    .on('connection',(socket)=>{
        console.log('wellcome '+socket.id);

        socket.emit('wellcom',{data:'wellCom zonybir\'s Socket'})

        socket.on('zony',(data)=>{
            console.log(data);
            socket.emit('new',{data:'/join'})
        })
    })
    .on('disconnected',()=>{
        console.log('close index Socket');
    })
    io.of('join')
    .on('connection',(socket)=>{
        console.log('connection join');
        console.log('-------------')
        console.log(socket.id);
    })
}

module.exports=server;