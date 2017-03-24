export default class HallChat extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let hallChat = io.connect('ws://'+location.host+'/hall_chat');
        hallChat.on('connectedOk',(msg)=>{
            msg.time=get_date(msg.time);
            this.appendChatInfo(msg);
        });
        hallChat.on('newMsg',(msg)=>{
            msg.time=get_date(msg.time);
            this.appendChatInfo(msg)
        });
        hallChat.on('recieveMsgOk',(msg)=>this.ServerRecieveMas(msg));
        this.hallChat=hallChat;
    }
    render(){
        return(
            <div className='hall_chat_fixed'>
                <div className='chat_containter' id='chat_main_box'>
                    <ul className='chat_content' id='chat_containers_hall'>
                    </ul>
                </div>
                <div className='send_container'>
                    <textarea ref='user_chat_info'/><span onClick={()=>this.handleSentMeg()}>发送</span>
                </div>
            </div>
        )
    }
    appendChatInfo(v){
        let dom=d_id('chat_containers_hall');
        let MsgContainer=create_dom('li','',`
            <p class='title'>${v.name}<span>${v.time}</span></p>
            <div class='info'>${v.info}</div>
        `)
        dom.appendChild(MsgContainer);
        d_id('chat_main_box').scrollTop=1000000000;
    }
    handleSentMeg(){
        this.hallChat.emit('newMsg',{
            info:this.refs.user_chat_info.value
        },()=>{
            console.log(1);
        })
    }
    ServerRecieveMas(){
        let testarea=this.refs.user_chat_info,
            value=testarea.value;
        this.appendChatInfo({
            name:ls('userInfo').name,
            time:get_date(),
            info:value
        })
        testarea.value='';
    }
}