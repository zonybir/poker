const {connect} = ReactRedux;
import {
    Login
} from '../actions/ac_pub';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let {status}=this.props;
        if(status) location.hash='/';
    }
    render(){
        let {dispatch,status}=this.props;
        return(
            <div id='login'>
                <div className='login_content'>
                <input type='text' placeholder='your name' ref='name' /><br />
                <input type='password' placeholder='your password' ref='password' /><br />
                <input type='submit' value='sign in' onClick={()=>this.handleLogin()}/>
                </div>
            </div>
        )
    }
    handleLogin(){
        let name=this.refs.name.value,
            pwd=this.refs.password.value;
        if(name && pwd) this.props.dispatch(Login(name,pwd));
        else alert('请填写用户名和密码');
    }
}

const selectState=(state,ownProps)=>{
    return{
        status:state.Pub.status
    }
}

export default connect(selectState)(LoginPage)