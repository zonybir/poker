const express = require('express'),
    router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('entry zony router, Time: ', Date.now());
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

router.get('/about', function(req, res) {
  res.send('About birds');
});

router.use('*',(req,res)=>{
    res.status(404).send('cannot find in zony');
})
module.exports = router;