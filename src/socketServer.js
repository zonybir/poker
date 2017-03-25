const Poker=require('./poker/index.js');
let playPoker={};
const server=(io)=>{

    io.use((socket,next)=>{
        console.log('----------------');
        console.log(socket.request.session.user);
        let user = socket.request.session.user;
        if(user && user.id){
            socket.request.session.user.view++;
            next();
        }
        else return false;
    })

    const hall_chat=io.of('/hall_chat')
    .on('connection',(socket)=>{
        //socket.set('nikename',socket.request.session.user.name);
        hall_chat.emit('connectedOk',
        {
            name:'管理员',
            time:(new Date()).getTime(),
            info:socket.request.session.user.name+' 连接到服务器成功！'
        });

        socket.on('newMsg',(msg,fn)=>{
            //socket.get('nickname',(err,name)=>{
                console.log(msg);
                socket.emit('recieveMsgOk');
                socket.broadcast.emit('newMsg',{
                    name:socket.request.session.user.name,
                    time:(new Date()).getTime(),
                    info:msg.info
                });
            //})
            fn();
        })
    })

    io.of('/game')
    .on('connection',(socket)=>{
        socket.emit('connectedOk',{data:'wellCom zonybir\'s Socket',statu:1})

        socket.on('redygo',(d,fn)=>{//entry game home and wait start
            console.log(socket.request.session.user.name);
            let user=socket.request.session.user,
                gameId=global.gameUser[user.name];
            if(!gameId){fn('非法登录');}
            else{
                fn(socket.request.session.user);
            }
        })

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