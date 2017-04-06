class info{
    constructor(socket){
        let user=socket.request.session.user;
        this.name=user.name;
        this.gameUserInfo=global.userGameMap[user.name];
        this.id=this.gameUserInfo.homeId || false;
        this.gameHome=global.gameHome[this.id];
        this.status=true;
        if(!this.id || !this.gameHome || this.getHomeInfo().user.indexOf(user.name)<0){
            this.status=false;
            socket.emit('ERROR',{data:[this.id,this.gameHome]});
            console.log('error socket conncet-------------------');
            console.log(this.gameHome);
            console.log('========================================')
            return false;
        }
    }
    getHomeInfo(){
        let homeInfo={
            id:this.id,
            user:[],
            redy:[0,0,0]
        };
        this.gameHome.user.map((v,k)=>{
            homeInfo.user.push(v.name);
            homeInfo.redy[k]=v.redy || false;
        });
        return homeInfo;
    }
    getUserPoker(){
        let poker=[];
        this.gameHome.user.map((v,k)=>{
            if(v.name == this.name) poker=v.poker;
        })
        return poker;
    }
    setRedy(callBack){
        let len=this.gameHome.user.length,i=0;
        console.log(this.gameHome);
        for(;i<len;i++){
            if(this.gameHome.user[i].name == this.name){
                console.log('--------find this user');
                console.log(this.gameHome.user[i]);
                console.log('--------find this user========');
                this.gameHome.user[i].redy = !this.gameHome.user[i].redy;
                break;
            }
        }
        console.log(this.gameHome)
        let homeInfo=this.getHomeInfo();
        len=0;
        homeInfo.redy.map((v,k)=>{v?len++:'';});
        let type=1;
        if(len == 3) type=2;
        console.log('==============');
        callBack({
            type:type,
            msg:''
        })
    }
    setPoker(poker,callBack){
        let pokerData=poker.get();//levenP
        pokerData.playerP.map((v,k)=>{
            this.gameHome.user[k].poker=v;
        })
        this.gameHome.dizhu=Math.round(Math.random()*100)%3;
        this.gameHome.poker=pokerData.levenP;
        console.log('---------gameHome');
        console.log(this.gameHome);
        console.log('==========end==========');
        callBack();
    }
    resetUserPoker(poker){
        let i=0,len=this.gameHome.user.length;
        for(;i<len;i++){
            if(this.gameHome.user[i].name == this.name){
                this.gameHome.user[i].poker=poker;
                break;
            }
        }
    }
    setOutPoker(outPoker){
        let userPoker=this.getUserPoker();
        outPoker.map((v,k)=>{
            userPoker.splice(userPoker.indexOf(v),1);
        })
        this.resetUserPoker(userPoker);
    }
}

module.exports=info