const {connect} = ReactRedux;
import {
    Init,
    CheckUserInHome,
    RedyGo
} from '../actions/ac_game';
import UserPoker from '../components/userPoker';
class GameHome extends React.Component{
    constructor(props){
        super(props);
        //InitSocket(this.props.dispatch);
    }
    componentDidMount(){
        this.props.params.id?Init(this.props.dispatch,this.props.params.id):location.hash='index';
    }
    componentWillUnmount(){
        //alert(1);
    }
    render(){
        let {dispatch,params,socketStatu,homeInfo,redyStatus,pokerData,
             addHomeStatu,homeId,
             pokerList,sureSuper,willSuper}=this.props;
        return(
            <div className='game_home'>
                <h3 className='home_title'>您已进入{homeInfo.id}房间{socketStatu?'':<span>正在连接游戏服务器</span>}</h3>
                {
                    !redyStatus?
                    <p onClick={()=>RedyGo()}>redy</p>
                    :
                    <UserPoker dispatch={dispatch} data={pokerData} pokerList={pokerList} sureSuper={sureSuper} willSuper={willSuper}/>
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
        sureSuper:state.Game.sureSuper,
        willSuper:state.Game.willSuper
    }
}

export default connect(selectState)(GameHome)