var player={};
export const InitSocket=(dispatch)=>{
    player = io.connect('ws://'+location.host+'/index');
    console.log(player);
    player.on('connectedOk',function(d){
        dispatch({
            type:'soket_connectHome',
            statu:d.statu
        })
    })
}

export const AddPlayHome=(dispatch,homeId)=>{
    player.emit('addPlayHome',{
        id:homeId
    })
    player.on('addHomeStatu',(d)=>{
        dispatch({
            type:'soket_addHome',
            statu:d.statu,
            homeId:d.id
        })
    })
}

export const getPoker=(dispatch)=>{
    player.emit('getPoker');
    player.on('getPoker',(d)=>{
        let poker=sortPoker(d.poker);
        console.log(poker);
        dispatch({
            type:'setPoker',
            pokerList:poker
        })
    })
}

export const getLevePoker=(playerIndex)=>{
    return (dispatch,getState)=>{
        player.emit('getLevePoker');
        player.on('getLevePoker',(d)=>{
            let AllP=getState().Socket.pokerList,
                poker;
            console.log(d.data);
            d.data.map((v,k)=>{
                AllP[playerIndex].push(v);
            })
            poker=sortPoker(AllP);
            dispatch({
                type:'setPoker',
                pokerList:poker
            })
        })
    }
    
}

export const WillSentPoker=(index,sentPokerList,callBack)=>{
    return (dispatch,getState)=>{
        let AllPoker=getState().Socket.pokerList,
            thisPoker=AllPoker[index],
            canSent=checkPokerRule(thisPoker,sentPokerList);
        console.log(canSent);
    }
}

function pokerSort(a,b){
    a=a.split('-');
    b=b.split('-');
    a[1]==2?a[1]=33:'';
    b[1]==2?b[1]=33:'';
    let value=a[1]-b[1],
        color=b[0]-a[0];
    if(value==0) return color;
    return value;
    
}
function sortPoker(arr){
    let n=[[],[],[]];
    arr.map((v,k)=>{
        n[k]=v.sort(pokerSort);
    })
    return n;
}

function checkPokerRule(poker,outList){
    let inPoker=outList.every((v)=> {return poker.indexOf(v) != -1;})
    if(!inPoker) return false;
    let rule={defPoker:[]};
    outList.map((v,k)=>{
        v=v.split('-')[1];
        if(!rule[v]){
            rule[v]=1;
            rule.defPoker.push(v-0);
        }
        else rule[v]++;
    })
    rule.defPoker=rule.defPoker.sort((a,b)=>{return a-b;});
    let diffrPokerNum=[],
        sameMax=1,
        sureRule=false,
        outPokerLen=rule.defPoker.length;
    rule.defPoker.map((v,k)=>diffrPokerNum.push(rule[v]));
    sameMax=Math.max.apply(this,diffrPokerNum);
    if(sameMax==1){//A       eg:A,ABCDE...
        let isSing=false;
        if(outPokerLen==1) isSing=true;
        let isOrder=true;
        if(outPokerLen>4){
            for(let i=0,len=outPokerLen-1;i<len;i++){//sure order by poker;
                if(rule.defPoker[i]+1 != rule.defPoker[i+1]) isOrder=false;
                if(rule.defPoker[i] == 2 || rule.defPoker[i]==88) isOrder=false;// can not include 2 and king;
            }
        }else isOrder=false;
        sureRule=isSing?isSing:isOrder;
    }else
    if(sameMax==2){//AA     eg:AA,AABBCC...
        let isDoub=false;
        if(outPokerLen==1) isDoub=true;
        let isDoubOrder=true;
        if(outPokerLen >2){
            for(let i=0,len=outPokerLen-1;i<len;i++){//sure order by poker;
                if(rule.defPoker[i]+1 != rule.defPoker[i+1]) isDoubOrder=false;
                if(rule.defPoker[i] == 2 || rule.defPoker[i]==88) isDoubOrder=false;// can not include 2 and king;
                if(rule[rule.defPoker[i+1]] !=2) isDoubOrder=false;
            }
            if(rule[rule.defPoker[0]] != 2 ) isDoubOrder=false;
        }else isDoubOrder=false;
        sureRule=isDoub?isDoub:isDoubOrder;
    }else
    if(sameMax==3){//AAA     eg:AAAB,AAABB,AAABBB,     AAABBBCC,AAABBBCD
        let AAAX=false;
        if(outPokerLen==2) AAAX=true;
        let AAABBBX=true;
        if(outPokerLen>2){
            let AAAlist=[];
            for(let i=0,len=outPokerLen;i<len;i++){
                if(rule[rule.defPoker[i]] ==3 ) AAAlist.push(rule.defPoker[i]);
            }
            let len=AAAlist.length;
            if(len<=1) AAABBBX=false;
            else{
                let bt=outPokerLen-AAAlist.length;
            }
        }else AAABBBX=false;
    }else
    if(sameMax==4){//AAAA      AAAABC   AAAABB 

    }
    console.log(sureRule);
    console.log(rule);
    return;
    if(rule.defPoker.length==1){//only defrent one poker  eg: A,AA,AAA,AAAA
        let outText='',
            sinV=rule.defPoker[0],
            singNum=rule[sinV];
        outText=singNum==1?'单个':singNum==2?sinV==88?'王炸':'对子':singNum==3?'三不带':singNum==4?'炸弹':'你能开外挂';
        sureRule=true;
        console.log(outText);
    }else 
    if(rule.defPoker.length==2){// has two defrent poker out    eg:AAAB,AAABB,AAABBB
        let outText='',
            hasThree=false,
            nextPoker='',
            nextPokerNum=0;
            rule.defPoker.map((v,k)=>{
                if(rule[v] == 3) hasThree=true;
                else nextPoker=v;
            })
            if(hasThree){
                nextPokerNum=rule[nextPoker];
                outText=nextPokerNum==1?'三带一':nextPokerNum==2?'三带二':nextPokerNum==3?'双飞不带':'';
            }
            sureRule=(hasThree && !!outText);
            console.log(outText);

    }else
    if(rule.defPoker.length==3){//eg:AABBCC,AAABBBEE,AAAABC,

    }else
    if(rule.defPoker.length>4){//order out
        let isOrder=true;
        rule.defPoker.map((v,k)=>{//sure only one poker in this
            if(rule[v] != 1) isOrder=false;
        })
        for(let i=0,len=rule.defPoker.length-1;i<len;i++){//sure order by poker;
            if(rule.defPoker[i]+1 != rule.defPoker[i+1]) isOrder=false;
            if(rule.defPoker[i] == 2 || rule.defPoker[i]==88) isOrder=false;// can not include 2 and king;
        }
        sureRule=isOrder;
    }
    
    console.log(sureRule);
    console.log(rule);

}