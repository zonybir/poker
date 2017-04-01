var player,
    dispatch,
    pokerList=[];
export const Init=(ReducerDispatch,homeId)=>{
    dispatch=ReducerDispatch;
    if(typeof player == 'undefined'){
        player = io.connect('ws://'+location.host+'/game');
        LisentAdd(homeId);
    }else
    player.emit('JionGameHome',{id:homeId},(d)=>{
        dispatch({
            type:'GameConnectInit',
            statu:d.status,
            homeInfo:d.data
        })
    }) 
}

const LisentAdd=(homeId)=>{
    
    player.on('ERROR',(d)=>{
        console.log(d.data);
        location.hash='index';
    })
    player.on('namespace',(d)=>{
        console.log(d.msg);
    })

    player.on('connectedOk',function(d){
        let status=d.statu;
        player.emit('JionGameHome',{id:homeId},(d)=>{
            dispatch({
                type:'GameConnectInit',
                statu:d.status,
                homeInfo:d.data
            })
        }) 
    
    })

    player.on('startGame',()=>{
        player.emit('startGame',{},(d)=>{
            pokerList=d.list;
            console.log(d);
            dispatch({
                type:'GamePokerSet',
                poker:pokerList.sort(pokerSort),
                sureSuper:0,
                willSuper:d.super
            })
        })
    })
}

export const RedyGo=()=>{
    player.emit('redygo',{},(d)=>{
        console.log(d);
        dispatch({
            type:'GamePubSet',
            key:'redyStatus',
            value:d.status
        })
    })
}
export const CheckUserInHome=(homeId)=>{
    player.emit('checkUserInHome',{id:homeId},(d)=>{})
}

export const ImSuper=()=>{
    player.emit('imSuper',{},(d)=>{
        if(d.status){
            console.log(pokerList.concat(d.poker).sort(pokerSort));
            console.log(d.poker)
            dispatch({
                type:'GamePokerSet',
                poker:pokerList.concat(d.poker).sort(pokerSort),
                sureSuper:1,
                willSuper:0
            })
        }else alert('你不是地主');
    })
}

export const WillSentPoker=(sentPokerList,callBack)=>{
    return (dispatch,getState)=>{
        let pokerList=getState().Game.pokerList,
            canSent=checkPokerRule(pokerList,sentPokerList);
        callBack(canSent);
        if(!canSent) return;
        else{
            player.emit('sentPoker',{poker:sentPokerList},(d)=>{
                if(!d.status){
                    alert(d.msg);
                }else{
                    dispatch({
                        type:'GamePubSet',
                        key:'pokerList',
                        value:JSON.parse(JSON.stringify(pokerList))
                    })
                }
            })
        }
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