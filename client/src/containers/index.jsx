const {connect} = ReactRedux;
import HallChat from './hall_chat';
class Index extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        if(!this.props.loginStatus) location.hash='login';
    }
    render(){
        let {dispatch,children,loginStatus,userInfo}=this.props;
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
}

const selectState=(state,ownProps)=>{
    return{
        loginStatus:state.Pub.status,
        userInfo:state.Pub.userInfo
    }
}

export default connect(selectState)(Index)