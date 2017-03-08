class Pk{
    constructor(data){
        this.state={
            poker:[],
            playerP:[[],[],[]],
            levenP:[]
        }
        let {poker}=this.state,index=0;
        for(let j=1;j<5;j++){
            for(let i=2;i<15;i++){
                poker.push(j+'-'+i);
            }
        }
        poker.push('5-88','6-88');
        this.random();
        this.random();
        this.random();
        this.random();
        this.getPlayerP();
        //this.byOrderPlayerP();
    }
    get(){
        return this.state;
    }
    getRandomNum(){
        return 0+Math.round(Math.random()*(53-0));
    }
    random(){
        let {poker}=this.state;
        for(let i=0;i<54;i++){
            let temp,first=this.getRandomNum(),sencod=this.getRandomNum();
            temp=poker[first];
            poker[first]=poker[sencod];
            poker[sencod]=temp;
        }
    }
    getPlayerP(){
        let {poker,playerP,levenP}=this.state;
        for(let i=0;i<3;i++){
            levenP.push((poker.splice(this.getRandomNum(),1))[0])
        }
        for(let i=0,len=poker.length;i<len;i++){
            playerP[i%3].push(poker[i])
        }
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