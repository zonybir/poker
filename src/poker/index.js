class Pk{
    constructor(data){
        let allp=[],index=0;
        for(let i=2;i<17;i++){
            if(i<15)
                for(let j=1;j<5;j++){
                    index++;
                    allp.push({
                        value:i,
                        color:j,
                        index:index
                    })
                }
            else{
                index++;
                allp.push({
                    value:i,
                    color:4,
                    index:index
                })
            }
        }
        this.state={
            d:allp
        }
        this.random();
        this.random();
        this.random();
        this.random();
        this.getPlayerP();
        this.byOrderPlayerP();
    }
    get(){
        return this.state.d;
    }
    getRandomNum(){
        return 0+Math.round(Math.random()*(53-0));
    }
    random(){
        let {d}=this.state;
        for(let i=0;i<54;i++){
            let temp,first=this.getRandomNum(),sencod=this.getRandomNum();
            temp=d[first];
            d[first]=d[sencod];
            d[sencod]=temp;
        }
    }
    getPlayerP(){
        let {d}=this.state,dipa=[],player=[[],[],[]];
        for(let i=0;i<3;i++){
            dipa.push(d.splice(this.getRandomNum(),1))
        }
        for(let i=0,len=d.length;i<len;i++){
            player[i%3].push(d[i])
        }
        this.state.playerP=player;
        this.state.levenP=dipa;
    }
    byOrderPlayerP(){
        let {playerP}=this.state;
        playerP.map((v,k)=>{
            playerP[k]=v.sort(this.playerPSort);
        })
    }
    playerPSort(a,b){
        return a.index-b.index;
    }
}
module.exports=Pk;