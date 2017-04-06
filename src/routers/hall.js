const express = require('express'),
    router = express.Router();

router.use(function HallLog(req, res, next) {
    req.session.user && req.session.user.id ? next() : res.status(200).json({message:'请登录',code:403,data:{}});
});
router.get('/list', function(req, res) {
    let gameHomeList=[],oneHome;
    for(let i in global.gameHome){
        let user=[];
        global.gameHome[i].user.map((v,k)=>{
            user.push(v.name);
        })
        oneHome={
            id:i,
            user:user
        }
        gameHomeList.push(oneHome);
    }
    res.status(200).json({
        code:200,
        data:{
            list:gameHomeList
        },
        message:'ok'
    });
});

router.get('/join', function(req, res) {
    let homeId=req.query.id,
        userInfo=global.userGameMap[req.session.user.name];
    if(!homeId){ res.status(200).send({code:400,data:[],message:'房间号不能为空'}); return;}

    let homeObj=global.gameHome[homeId];

    if(!homeObj) res.status(200).send({code:400,data:[],message:'房间不存在'});
    else{
        if(homeObj.user.length>=3 && homeObj.user.indexOf(req.session.user.name)<0) res.status(200).send({code:400,data:[],message:'房间已满'+homeObj.user.indexOf(req.session.user.name)});
        else{
            userInfo?userInfo.homeId=homeId : userInfo={homeId:homeId};
            global.userGameMap[req.session.user.name]=userInfo;
            if(homeObj.user.indexOf(req.session.user.name) < 0){
                homeObj.user.push({
                    poker:[],
                    redy:0,
                    name:req.session.user.name
                });
            }
            res.status(200).json({code:200,data:{status:1,id:homeId},message:'加入房间成功'});
        }
    }
});

router.use('*',(req,res)=>{
    res.status(404).send('cannot find in hall');
})
module.exports = router;