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
    }
    render(){
        let {hallList,dispatch,socketStatu,addHomeStatu,homeId,pokerList}=this.props;
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
            <div id='index'>
                <h1>IndexPage</h1>
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
        pokerList:state.Socket.pokerList
    }
}

export default connect(selectState)(Index)