export default class PokerItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {v,k,willSent}=this.props;
        let pokerValueA=this.pokerValue(v),isWillSent=0;
        willSent.map((vi,ki)=>{
            if(v==vi) isWillSent=1
        })
        return(
            <div className={'pokerItem '+pokerValueA[0].color}  style={{left:30*k+'px',top:isWillSent?'0':'20px'}} onClick={()=>{this.props.selectPokerItem(v)}}>
                <span className='pokerValue'>{pokerValueA[1]}</span>
                <span className='pokerColortext'>{pokerValueA[0].text}</span>
            </div>
        )
    }
    pokerColor(v){
        switch(v-0){
            case 1: return {text:'黑桃',color:'blank'};
            case 2: return {text:'红桃',color:'red'};
            case 3: return {text:'梅花',color:'flower'};
            case 4: return {text:'方块',color:'area'};
            case 5: return {text:'小王',color:'king_s'};
            case 6: return {text:'大王',color:'king'};
        }
    }
    pokerIndex(v){
        v-=0;
        return v==11?'J':v==12?'Q':v==13?'K':v==14?'A':v==88?'王':v;
    }
    pokerValue(v){
        v=v.split('-');
        return [this.pokerColor(v[0]),this.pokerIndex(v[1])];
    }
}