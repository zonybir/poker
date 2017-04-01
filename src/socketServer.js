const Poker=require('./poker/index.js');
const CheckRule = require('./poker/rule');
let playPoker={};
const server=(io)=>{

    io.use((socket,next)=>{
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

    const game=io.of('/game')
    .on('connection',(socket)=>{
        let user=socket.request.session.user,
            homeId=user.homeId,
            gameHome=global.hall[homeId],
            PokerHome=global.gameUser[homeId];
        if(!homeId || !gameHome || gameHome.user.indexOf(user.name)<0 || homeId!=user.homeId){
            socket.emit('ERROR',{data:[homeId,gameHome]});
            console.log('error socket conncet-------------------');
            console.log(user);
            console.log(gameHome);
            console.log('========================================')
            return;
        }
        socket.emit('connectedOk',{data:'wellCom zonybir\'s Socket',statu:1})

        socket.on('JionGameHome',(d,fn)=>{
            socket.join('gameHome_'+homeId,()=>{
                console.log(socket.rooms);
                socket.to('gameHome_'+homeId).emit('namespace',{msg:user.name+'加入房间'});
                fn({status:1,data:gameHome})
            });
        })

        socket.on('redygo',(d,fn)=>{//entry game home and wait start
            let len=PokerHome.user.length,
                userHomeObj={
                    name:user.name,
                    poker:[],
                    super:0,
                    canSent:0
                };
            if(len<=0){
                PokerHome.user.push(userHomeObj);
                fn({status:1,msg:'准备成功,等待其他玩家准备'});
            }else{
                let hasIn=0;
                PokerHome.user.map((v,k)=>{
                    v.name==user.name?hasIn=1:'';
                })
                if(hasIn){
                    fn({status:1,msg:'短线重连,准备成功,等待其他玩家准备'});
                    if(len>=2){
                        fn({status:1,msg:'游戏即克开始'});
                        let playPoker=new Poker(),
                            pokerList=playPoker.get().playerP;
                        pokerList.map((v,k)=>{
                            PokerHome.user[k].poker=v;
                        })
                        let superWho=Math.round(Math.random()*100)%3;
                        PokerHome.super=superWho;
                        PokerHome.canSent=superWho;
                        game.in('gameHome_'+homeId).emit('startGame');
                    }
                }else if(len>=3){
                    fn({status:0,msg:'房间已满'});
                }else{
                    PokerHome.user.push(userHomeObj);
                    if(len==2){
                        fn({status:1,msg:'游戏即克开始'});
                        let playPoker=new Poker(),
                            pokerList=playPoker.get().playerP;
                        pokerList.map((v,k)=>{
                            PokerHome.user[k].poker=v;
                        })
                        let superWho=Math.round(Math.random()*100)%3;
                        PokerHome.super=superWho;
                        PokerHome.canSent=superWho;
                        PokerHome.obj=playPoker;
                        game.in('gameHome_'+homeId).emit('startGame');
                        console.log('=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=');
                    }else{
                        fn({status:1,msg:'准备成功,等待其他玩家准备'});
                    }
                    
                }
            }
        })

        socket.on('startGame',(d,fn)=>{
            console.log(123123123);
            let poker={},
                isSuper=0;
            PokerHome.user.map((v,k)=>{
                if(v.name==user.name){
                    if(PokerHome.super == k) isSuper=1;
                    poker=v
                }
            })
            fn({list:poker.poker,super:isSuper});
        })

        socket.on('imSuper',(data,fn)=>{
            let isSuper=0;
            PokerHome.user.map((v,k)=>{if(v.name == user.name && k==PokerHome.super) isSuper=1;})
            isSuper?fn({
                status:1,
                poker:PokerHome.obj.state.levenP
            }):fn({status:0,poker:[]});
        })

        socket.on('sentPoker',(d,fn)=>{
            let userData={};
            PokerHome.user.map((v,k)=>{
                if(v.name == user.name) userData=v;
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