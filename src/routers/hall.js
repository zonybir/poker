const express = require('express'),
    router = express.Router();

router.use(function HallLog(req, res, next) {
    console.log(req.session);
    req.session.user && req.session.user.id ? next() : res.status(200).json({message:'请登录',code:403,data:{}});
});
router.get('/list', function(req, res) {
    console.log(global.hall);
    res.status(200).json({
        code:200,
        data:{
            list:global.hall
        },
        message:'ok'
    });
});

router.get('/join', function(req, res) {
    let homeId=req.query.id;
    if(!homeId){ res.status(200).send({code:400,data:[],message:'房间号不能为空'}); return;}
    let index,homeObj,findHome=false;
    global.hall.map((v,k)=>{
        if(v.id == homeId){
            index=k;
            homeObj=v;
            findHome=true;
        }
    })
    if(!findHome) res.status(200).send({code:400,data:[],message:'房间不存在'});
    else{
        if(homeObj.user.length>=3) res.status(200).send({code:400,data:[],message:'房间已满'});
        else{
            global.gameUser[req.session.user.name]=homeId;
            homeObj.user.push(req.session.user.name);
            global.hall[index]=homeObj;
            res.status(200).json({code:200,data:homeObj,message:'ok'});
        }
    }
});

router.use('*',(req,res)=>{
    res.status(404).send('cannot find in hall');
})
module.exports = router;