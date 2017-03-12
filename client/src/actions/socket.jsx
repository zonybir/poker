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
        //console.log(canSent);
        callBack(canSent);
        if(!canSent) return;
        sentPokerList.map((v,k)=>{
            for(let i=0,len=thisPoker.length;i<len;i++){
                if(thisPoker[i] == v){
                    thisPoker.splice(i,1);
                    break;
                }
            }
        })
        AllPoker[index]=thisPoker;
        let newPoker=[];
        AllPoker.map((v,k)=>{
            if(k==index) newPoker.push(thisPoker);
            else newPoker.push(v);
        })
        dispatch({
            type:'setPoker',
            pokerList:newPoker
        })
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
    console.log(outList);
    let inPoker=outList.every((v)=> {return poker.indexOf(v) != -1;})
    if(!inPoker) return false;// hack  without in this poker 
    let rule={defPoker:[]};
    outList.map((v,k)=>{
        v=v.split('-')[1];
        if(!rule[v]){
            rule[v]=1;
            rule.defPoker.push(v-0);
        }
        else rule[v]++;
    })//count diffrent poker item in rule,and push into defPoker
    rule.defPoker=rule.defPoker.sort((a,b)=>{return a-b;});// sort defPoker
    let diffrPokerNum=[],// diffrent poker num list
        sameMax=1,
        sureRule=false,
        outPokerLen=rule.defPoker.length;
    rule.defPoker.map((v,k)=>diffrPokerNum.push(rule[v]));
    sameMax=Math.max.apply(this,diffrPokerNum);// get max diffrent poker num 
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
        let AAAX=false,AAABBBX=true;
        if(outPokerLen<=2) AAAX=true;
        else{
            let AAAlist=[],
                withPokerList=[],
                withPokerNum={};
            for(let i=0,len=outPokerLen,p=0;i<len;i++){
                p=rule.defPoker[i];
                if(rule[p] ==3 ) AAAlist.push(p);
                else {
                    withPokerNum[p]=rule[p];
                    withPokerList.push(p);
                }
            }
            let len=AAAlist.length;
            if(len<=1) AAABBBX=false;
            else{//min same poker is AAABBB
                for(let i=0,AAAlen=len-1;i<AAAlen;i++){
                    if(AAAlist[i]+1 != AAAlist[i+1]) AAABBBX=false;// is not order by XXX
                }
            }
            if(AAABBBX){// checke with poker
                //let bt=outPokerLen-len;
                let factWithPokerNum=0;
                withPokerList.map((v,k)=>{
                    factWithPokerNum+=withPokerNum[v];
                });
                if(factWithPokerNum != len){//same poker num != withPokerNum
                    if(factWithPokerNum == 2*len){
                        withPokerList.map((v,k)=>{
                            if(withPokerNum[v] != 2) AAABBBX=false;
                        })
                    }else AAABBBX=false;
                }
            }
        };
        sureRule=AAAX?AAAX:AAABBBX;
    }else
    if(sameMax==4){//AAAA      AAAABC   AAAABB 
        let AAAA=false;
        if(outPokerLen == 1)  AAAA=true;
        else{
            let diffrentPokerListNum=0,
                diffrentPokerNum=0;
            rule.defPoker.map((v,k)=>{
                if(rule[v] != 4) {
                    diffrentPokerListNum++;
                    diffrentPokerNum+=(rule[v]-0);
                }
            });
            if(diffrentPokerListNum == 1 && diffrentPokerNum==2) AAAA=true;
            else if(diffrentPokerListNum ==2 && (diffrentPokerNum==2 || diffrentPokerNum==4)) AAAA=true;
        }
        //need more think.    eg  AAABBBBX  AAABBBCCCC AAABBBBCC AAABBBCCCDDDEEEE
        if(outPokerLen>2){
            alert('need more think.\neg:\nAAABBBBX  AAABBBCCCC AAABBBBCC AAABBBCCCDDDEEEE')
            let AAAlist=[];
            rule.defPoker.map((v,k)=>{
                if(rule[v] >= 3){

                }
            })
        }
        sureRule=AAAA;
    }
    //console.log(sureRule);
    return sureRule;
}