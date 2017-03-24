import {
    getLevePoker,
    WillSentPoker
} from '../actions/ac_game';
import PokerItem from './pokeritem';
export default class UserPoker extends React.Component{
    constructor(props){
        super(props);
        this.state={
            sentPoker:[]
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            sentPoker:[]
        })
    }
    render(){
        let {dispatch,data}=this.props;
        return(
            <div className='playerPoker'>
                <div className='pokerContent'>
                    {
                        data.map((v,k)=>{
                            return <PokerItem k={k} v={v} key={"poker_item_"+k} willSent={this.state.sentPoker} selectPokerItem={this.handleSelectPokerItem.bind(this)}/>
                        })
                    }
                </div>
                {
                    
                    <h2 onClick={()=>{this.props.callBack(kp)}}>抢地主</h2>
                }
                <p onClick={this.handleSentPoker.bind(this)}>出牌</p>
            </div>
        )
    }
    handleSentPoker(index){
        let {sentPoker}=this.state,
            {dispatch}=this.props;
        if(sentPoker.length<=0){
            alert('请选择你要出的牌');
            return;
        }
        dispatch(WillSentPoker(index,sentPoker,(d)=>{
            console.log(d);
        }))

    }
    handleSelectPokerItem(v){
        
        let {sentPoker}=this.state,newSentPoker=[],hashV=0;;
        //console.log(sentPoker);
        for(let i=0,len=sentPoker.length;i<len;i++){
            //console.log(i);
            if(sentPoker[i] != v) newSentPoker.push(sentPoker[i]);
            else hashV=1;
        }
        hashV?'':newSentPoker.push(v);
        //console.log(newSentPoker)
        this.setState({
            sentPoker:newSentPoker
        })
    }
}