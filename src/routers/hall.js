const express = require('express'),
    router = express.Router();

router.use(function HallLog(req, res, next) {
    req.session.user && req.session.user.id ? next() : res.status(200).json({message:'请登录',code:403,data:{}});
});
router.get('/list', function(req, res) {
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
    let homeObj=global.hall[homeId];
    if(!homeObj) res.status(200).send({code:400,data:[],message:'房间不存在'});
    else{
        if(homeObj.user.length>=3 && homeObj.user.indexOf(req.session.user.name)<0) res.status(200).send({code:400,data:[],message:'房间已满'+homeObj.user.indexOf(req.session.user.name)});
        else{
            req.session.user.homeId=homeId;
            if(homeObj.user.indexOf(req.session.user.name) < 0){
                homeObj.user.push(req.session.user.name);
                homeObj.id=homeId;
            }
            res.status(200).json({code:200,data:{status:1,id:homeId},message:'加入房间成功'});
        }
    }
});

router.use('*',(req,res)=>{
    res.status(404).send('cannot find in hall');
})
module.exports = router;