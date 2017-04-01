const {connect} = ReactRedux;
import {
    HallList,
    JoinHome
} from '../actions/ac_pub';
class Hall extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.dispatch(HallList());
    }
    render(){
        let {hallList,dispatch}=this.props;
        return(
            <div className='hall_list'>
                <div className='home_list'>
                {
                    hallList.map((v,k)=>{
                        return(
                            <div className='game_home' onClick={()=>{dispatch(JoinHome(v.id))}} key={'hall_home_'+k}>
                                <div className='user_position top' />
                                <div className='user_position left' />
                                <div className='user_position right' />
                                <p className='home_id'>{'房间ID：'+v.id}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

const selectState=(state,ownProps)=>{
    return{
        hallList:state.Pub.hallList
    }
}

export default connect(selectState)(Hall)