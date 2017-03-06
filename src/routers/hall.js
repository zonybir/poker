const express = require('express'),
    router = express.Router();

router.use(function HallLog(req, res, next) {
  console.log('entry hall router,Time:'+new Date());
  next();
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
    res.status(200).json(['745','211','1313','1414'])
});

router.use('*',(req,res)=>{
    res.status(404).send('cannot find in zony');
})
module.exports = router;