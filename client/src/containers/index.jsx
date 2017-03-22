const {connect} = ReactRedux;
import {
    hallList,
    joinGame
} from '../actions/hall';
import {
    InitSocket,
    AddPlayHome,
    getPoker,
    getLevePoker
} from '../actions/socket';


import UserPoker from '../components/userPoker';
import HallChat from './hall_chat';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state={
            getLeven:0
        }
    }
    componentDidMount(){
        InitSocket(this.props.dispatch);
        this.props.dispatch(hallList());
        let {loginStatus,userInfo}=this.props;
        if(!loginStatus) location.hash='login';
    }
    render(){
        let {hallList,dispatch,socketStatu,addHomeStatu,homeId,pokerList,
                loginStatus,userInfo
            }=this.props;
        console.log(loginStatus);
        console.log(userInfo);
        
        if(homeId && addHomeStatu){
            return(
                <div id='index'>
                    <h4>addHome {homeId}</h4>
                    {
                        pokerList.length<=0?
                        <p onClick={()=>{getPoker(dispatch)}}>click to get poker</p>
                        :
                        pokerList.map((vp,kp)=>{
                            return <UserPoker kp={kp} vp={vp} key={'user_play_'+kp} getLeven={this.state.getLeven} callBack={this.handleGetLeven.bind(this)} dispatch={dispatch}/>
                        })
                    }
                    
                </div>
            )
        }
        return(
            <div id='hall'>
                <div className='header'>
                    <div className='container'>
                        <div className='left'>ZONYBIR</div>
                        <div className='right'><span>Wellcome {userInfo.name}</span></div>
                    </div>
                    
                </div>
                <h2>{socketStatu?'ok':'fail'}</h2>
                {
                    hallList.map((v,k)=>{
                        return(
                            <div onClick={()=>{AddPlayHome(dispatch,v)}} key={'hall_home_'+k}>
                                {v}
                            </div>
                        )
                    })
                }
                <HallChat dispatch={dispatch} />
            </div>
        )
    }
    handleGetLeven(kp){
        this.setState({
            getLeven:1
        },()=>{
            this.props.dispatch(getLevePoker(kp))
        })
    }
}

const selectState=(state,ownProps)=>{
    return{
        hallList:state.Hall.hallList,
        socketStatu:state.Socket.statu,
        addHomeStatu:state.Socket.addHomeStatu,
        homeId:state.Socket.homeId,
        pokerList:state.Socket.pokerList,

        loginStatus:state.Pub.status,
        userInfo:state.Pub.userInfo
    }
}

export default connect(selectState)(Index)