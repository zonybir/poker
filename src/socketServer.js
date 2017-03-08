const Poker=require('./poker/index.js');
let playPoker={};
const server=(io)=>{
    io.of('/index')
    .on('connection',(socket)=>{
        console.log('wellcome '+socket.id);
        socket.emit('connectedOk',{data:'wellCom zonybir\'s Socket',statu:1})

        socket.on('addPlayHome',(data)=>{
            console.log(data);
            socket.emit('addHomeStatu',{
                statu:1,
                id:data.id
            })
        })

        socket.on('getPoker',(data)=>{
            playPoker=new Poker();
            socket.emit('getPoker',{
                poker:playPoker.get().playerP
            })
        })
        socket.on('getLevePoker',(d)=>{
            if(playPoker.hasSentLevenP) return;
            playPoker.hasSentLevenP=1;
            socket.emit('getLevePoker',{
                data:playPoker.get().levenP
            })
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