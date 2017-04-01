const zony = require('./zony.js');
const hall = require('./hall.js');
const pub = require('./pub.js');
const router=(app,express)=>{
    app.get('/',(req,res)=>{
        res.send('homePage');
    })
    app.use('/pub',pub);
    app.use('/zony',zony);
    app.use('/hall',hall);

    app.use('*',(req,res)=>{
        res.status(404).send('root 404');
    })
}
module.exports = router;