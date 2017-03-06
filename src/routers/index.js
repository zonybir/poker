const zony = require('./zony.js');
const hall = require('./hall.js');
const router=(app,express)=>{
    console.log(__dirname);
    app.get('/',(req,res)=>{
        res.send('homePage');
    })
    
    app.use('/zony',zony);
    app.use('/hall',hall);

    app.use('*',(req,res)=>{
        res.status(404).send('root 404');
    })
}
module.exports = router;