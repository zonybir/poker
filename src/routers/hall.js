const express = require('express'),
    router = express.Router();

router.use(function HallLog(req, res, next) {
    console.log(req.session);
    //console.log(res.session.user);
    
    req.session.user && req.session.user.id ? next() : res.status(200).json({message:'请登录',code:403,data:{}});
  
});
router.get('/', function(req, res) {
    if(!req.session.user){
        req.session.user={
            name:'guest',
            view:1
        }
    }else{
        req.session.user.view++;
    }
    res.status(200).json(req.session);
});

router.get('/getlist', function(req, res) {
    res.status(200).json({
        code:200,
        data:{
            list:['745','211','1313','1414']
        },
        message:'ok'
    })
});

router.use('*',(req,res)=>{
    res.status(404).send('cannot find in zony');
})
module.exports = router;