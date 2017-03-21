const cookieParser = require('cookie-parser'),
    session = require('express-session'),
    router = require('./routers/index.js'),
    bodyParser = require('body-parser');

const server=(app,express)=>{
    app.set('port',process.env.PORT || 2111);
    app.use(express.static(__dirname+'/../public'));
    app.use(session({
        secret:'zonybir',
        resave:false,
        saveUninitialized:true
    }));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    
    router(app);

}

module.exports=server;