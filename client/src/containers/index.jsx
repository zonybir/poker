const {connect} = ReactRedux;
import {
    hallList
} from '../actions/hall';

import HallChat from './hall_chat';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state={
            getLeven:0
        }
    }
    componentDidMount(){
        
        this.props.dispatch(hallList());
        let {loginStatus,userInfo}=this.props;
        if(!loginStatus) location.hash='login';
    }
    render(){
        let {hallList,dispatch,children,
                loginStatus,userInfo
            }=this.props;
        return(
            <div id='hall'>
                <div className='header'>
                    <div className='container'>
                        <div className='left'>ZONYBIR</div>
                        <div className='right'><span>Wellcome {userInfo.name}</span></div>
                    </div>
                    {
                        children && React.cloneElement(children,{name:'hall'})
                    }
                </div>
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
        loginStatus:state.Pub.status,
        userInfo:state.Pub.userInfo
    }
}

export default connect(selectState)(Index)