var hallChat={},
    hallDispatch='';
export const InitHallChat=(dispatch)=>{
    hallDispatch=dispatch;

    hallChat = io.connect('ws://'+location.host+'/hall_chat');

    hallChat.on('connectedOk',setChatInfo);
    hallChat.on('newMsg',setChatInfo);
    //hallChat.on('recieveMsgOk',setChatInfo);
    return {
        type:''
    }
}

export const SentMsg=(msg)=>{
    hallChat.emit('newMsg',msg,(data)=>{
        msg.isSelft=1;
        msg.flag=(new Date()).getTime();
        msg.name=ls('userInfo').name;
        setChatInfo(msg);
    })
    return {
        type:''
    }
}
const setChatInfo=(msg)=>{
    console.log(msg);
    msg.time=get_date(msg.time);
    hallDispatch({
        type:'hallChat',
        status:1,
        msg:{
            flag:(new Date()).getTime(),
            data:msg
        }
    })
}