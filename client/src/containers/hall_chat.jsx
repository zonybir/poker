const {connect} = ReactRedux;
import {
    InitHallChat,
    SentMsg
} from '../actions/ac_hall_chat'
class HallChat extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let {status,dispatch}=this.props;
        if(!status) dispatch(InitHallChat(dispatch));
    }
    componentWillReceiveProps(nextProps){
        if(this.props.flag != nextProps.flag){
            this.appendChatInfo(nextProps.msg);
            nextProps.msg.isSelft ? this.refs.user_chat_info.value='':'';
        }
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
        this.props.dispatch(SentMsg({
            time:(new Date()).getTime(),
            info:this.refs.user_chat_info.value
        }))
    }
}
const selectState=(state)=>{
    return{
        status:state.HallChat.status,
        flag:state.HallChat.msg.flag,
        msg:state.HallChat.msg.data
    }
}
export default connect(selectState)(HallChat)