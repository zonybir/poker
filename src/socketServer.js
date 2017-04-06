const Poker=require('./poker/index.js');
const CheckRule = require('./poker/rule');
const SocketUtil = require('./pub/pokerSocketInfon');
const Rule = require('./poker/rule.js')
let playPoker={};
const server=(io)=>{

    io.use((socket,next)=>{
        let user = socket.request.session.user;
        if(user && user.id){
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

    const game=io.of('/game')
    .on('connection',(socket)=>{
        let Game=new SocketUtil(socket);
        if(!Game.status) return;
        socket.emit('connectedOk');
        socket.on('JionGameHome',(d,fn)=>{
            Game=new SocketUtil(socket);
            socket.join('gameHome_'+Game.id,()=>{
                socket.to('gameHome_'+Game.id).emit('namespace',{msg:Game.name+'加入房间'});
                console.log(Game.getHomeInfo());
                fn({
                    homeInfo:Game.getHomeInfo(),
                    info:'wellCom zonybir\'s Socket',
                    status:1
                })
            });
        })

        socket.on('redygo',(d,fn)=>{//entry game home and wait start
            Game.setRedy((res)=>{
                switch(res.type){//1 准备成功 等待其他玩家准备   0：准备失败  2：准备成功 开始游戏
                    case 0:{
                        fn({status:0,msg:res.msg});
                        break;
                    }
                    case 1:{
                        fn({status:1,msg:'准备成功,等待其他玩家准备'});
                        break;
                    }
                    case 2:{
                        fn({status:1,msg:'游戏即克开始'});
                        Game.setPoker(new Poker(),()=>{
                            game.in('gameHome_'+Game.id).emit('startGame');
                        })
                    }
                }
            })
        })

        socket.on('startGame',(d,fn)=>{
            let poker={},
                isSuper=0;
            Game.gameHome.user.map((v,k)=>{
                if(v.name==Game.name){
                    if(Game.gameHome.dizhu == k) isSuper=1;
                    poker=v
                }
            })
            fn({list:poker.poker,super:isSuper});
        })

        socket.on('imSuper',(data,fn)=>{
            let isSuper=0;
            Game.gameHome.user.map((v,k)=>{if(v.name == Game.name && k==Game.gameHome.dizhu) isSuper=1;})
            isSuper?fn({
                status:1,
                poker:Game.gameHome.poker
            }):fn({status:0,poker:[]});
        })

        socket.on('sentPoker',(d,fn)=>{
            let pokerRule= new Rule(Game.getUserPoker(),d.poker),
                canOut=pokerRule.canOut();
            if(canOut){
                Game.setOutPoker(d.poker);
                fn({status:1});
                let nowPoker=Game.getUserPoker();
                if(nowPoker.length<=0) console.log('you win');
            }else{
                fn({status:0})
            }
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