const {connect} = ReactRedux;
import {
    hallList,
    joinGame
} from '../actions/hall';
import {
    InitSocket
} from '../actions/socket';
class Index extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        InitSocket(this.props.dispatch);
        this.props.dispatch(hallList());
    }
    render(){
        let {hallList,dispatch}=this.props;
        return(
            <div id='index'>
                <h1>IndexPage</h1>
                {
                    hallList.map((v,k)=>{
                        return(
                            <div onClick={()=>{dispatch(joinGame(v))}} key={'hall_home_'+k}>
                                {v}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const selectState=(state,ownProps)=>{
    return{
        hallList:state.Hall.hallList
    }
}

export default connect(selectState)(Index)