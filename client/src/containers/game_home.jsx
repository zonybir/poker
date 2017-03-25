const {connect} = ReactRedux;
import {
    Init,
    RedyGo
} from '../actions/ac_game';
import UserPoker from '../components/userPoker';
class GameHome extends React.Component{
    constructor(props){
        super(props);
        //InitSocket(this.props.dispatch);
    }
    componentDidMount(){
        Init(this.props.dispatch);
    }
    componentWillUnmount(){
        //alert(1);
    }
    render(){
        let {dispatch,socketStatu,homeInfo,redyStatus,pokerData,
             addHomeStatu,homeId,pokerList}=this.props;
        return(
            <div className='game_home'>
                <h3 className='home_title'>您已进入{homeInfo.id}房间{socketStatu?'':<span>正在连接游戏服务器</span>}</h3>
                {
                    !redyStatus?
                    <p onClick={()=>RedyGo()}>redy</p>
                    :
                    <UserPoker dispatch={dispatch} data={pokerData}/>
                }
            </div>
        )
    }
}

const selectState=(state,ownProps)=>{
    return{
        socketStatu:state.Game.statu,
        homeInfo:state.Game.homeInfo,
        redyStatus:state.Game.redyStatus,
        pokerData:state.Game.pokerData,

        addHomeStatu:state.Game.addHomeStatu,
        homeId:state.Game.homeId,
        pokerList:state.Game.pokerList,
    }
}

export default connect(selectState)(GameHome)