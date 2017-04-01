class Ruls{
    constructor(poker,outList){
        this.poker=poker;
        this.outPoker=outList;
        this.rule={
            diffrent:[],
            diffrentNum:[],
            map:{},
            sameMax:1,
            diffrentLen:0
        };
        this.inie();
    }
    init(){//count diffrent poker item in rule,and push into defPoker
        let diffrentPoker=[],pokerMap={};
        this.outPoker.map((v,k)=>{
            v=v.split('-')[1];
            if(!pokerMap[v]){
                pokerMap[v]=1;
                diffrentPoker.push(v-0);
            }
            else pokerMap[v]++;
        })
        diffrentPoker=diffrentPoker.sort((a,b)=>{return a-b;});// sort defPoker

        let diffrPokerNum=[],// diffrent poker num list
            sameMax=1,
            sureRule=false,
            diffrentPokerLen=diffrentPoker.length;

        diffrentPoker.map((v,k)=>diffrPokerNum.push(rule[v]));

        sameMax=Math.max.apply(this,diffrPokerNum);// get max diffrent poker num 
        this.rule={
            diffrent:diffrentPoker,
            diffrentNum:diffrPokerNum,
            map:pokerMap,
            sameMax:sameMax,
            diffrentLen:diffrentPokerLen
        }
    }
    inPoker(){
        return this.outPoker.every((v)=>{return this.poker.indexOf(v) != -1;})
    }
    isSingle(){
        let {diffrentLen,diffrent}=this.rule;
        let isSing=false;
        if(diffrentLen==1) isSing=true;
        let isOrder=true;
        if(diffrentLen>4){
            for(let i=0,len=diffrentLen-1;i<len;i++){//sure order by poker;
                if(diffrent[i]+1 != diffrent[i+1]) isOrder=false;
                if(diffrent[i] == 2 || diffrent[i]==88) isOrder=false;// can not include 2 and king;
            }
        }else isOrder=false;
        return isSing?isSing:isOrder;
    }
    isDouble(){
        let {diffrentLen,diffrent,map}=this.rule;
        let isDoub=false;
        if(diffrentLen==1) isDoub=true;
        let isDoubOrder=true;
        if(diffrentLen >2){
            for(let i=0,len=diffrentLen-1;i<len;i++){//sure order by poker;
                if(diffrent[i]+1 != diffrent[i+1]) isDoubOrder=false;
                if(diffrent[i] == 2 || diffrent[i]==88) isDoubOrder=false;// can not include 2 and king;
                if(map[diffrent[i+1]] !=2) isDoubOrder=false;
            }
            if(map[diffrent[0]] != 2 ) isDoubOrder=false;
        }else isDoubOrder=false;
        return isDoub?isDoub:isDoubOrder;
    }
    isThird(){
        let {diffrentLen,diffrent,map}=this.rule;
        let AAAX=false,AAABBBX=true;
        if(diffrentLen<=2) AAAX=true;
        else{
            let AAAlist=[],
                withPokerList=[],
                withPokerNum={};
            for(let i=0,len=diffrentLen,p=0;i<len;i++){
                let temp=diffrent[i];
                if(map[temp] ==3 ) AAAlist.push(temp);
                else {
                    withPokerNum[temp]=map[temp];
                    withPokerList.push(temp);
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
                if(factWithPokerNum != len &&factWithPokerNum!=0){//same poker num != withPokerNum
                    if(factWithPokerNum == 2*len){
                        withPokerList.map((v,k)=>{
                            if(withPokerNum[v] != 2) AAABBBX=false;
                        })
                    }else AAABBBX=false;
                }
            }
        };
        return AAAX?AAAX:AAABBBX;
    }
    isFourth(){
        let {diffrentLen,diffrent,map}=this.rule;
        let AAAA=false;
        if(diffrentLen == 1)  AAAA=true;
        else{
            let diffrentPokerListNum=0,
                diffrentPokerNum=0;
            diffrent.map((v,k)=>{
                if(map[v] != 4) {
                    diffrentPokerListNum++;
                    diffrentPokerNum+=(map[v]-0);
                }
            });
            if(diffrentPokerListNum == 1 && diffrentPokerNum==2) AAAA=true;
            else if(diffrentPokerListNum ==2 && (diffrentPokerNum==2 || diffrentPokerNum==4)) AAAA=true;
        }
        //need more think.    eg  AAABBBBX  AAABBBCCCC AAABBBBCC AAABBBCCCDDDEEEE
        if(diffrentLen>2){
            alert('need more think.\neg:\nAAABBBBX  AAABBBCCCC AAABBBBCC AAABBBCCCDDDEEEE')
            let AAAlist=[];
            rule.defPoker.map((v,k)=>{
                if(rule[v] >= 3){

                }
            })
        }
        return AAAA;
    }
}

module.exports = Ruls;