const zony = require('./zony.js');

const router=(app)=>{
    app.get('/',(req,res)=>{
        res.send('homePage');
    })
    app.use('/zony',zony);
    app.use('*',(req,res)=>{
        res.sendStatus(404);
    })
}
module.exports = router;