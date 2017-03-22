const express = require('express'),
    router = express.Router();

router.use(function HallLog(req, res, next) {
  console.log('entry pub router,Time:'+new Date());
  next();
});
router.post('/login', function(req, res) {
    //console.log(req.params);
    let {name,password}=req.body;
    console.log(name,password);
    if(name && password==1){
        let use={
            name:name,
            id:(new Date()).getTime(),
            view:1
        };
        req.session.user=use
        res.status(200).json({message:'登录成功',status:1,data:use,code:200});
    }else{
        res.status(200).json({message:'用户名或密码错误',status:0,data:{},code:403});
    }
    
});

router.get('/getlist', function(req, res) {
    res.status(200).json(['745','211','1313','1414'])
});

router.use('*',(req,res)=>{
    res.status(404).send('cannot find in zony');
})
module.exports = router;