const cookieParser = require('cookie-parser'),
    session = require('express-session'),
    router = require('./routers/index.js');

const server=(app,express)=>{
    app.set('port',process.env.PORT || 80);
    app.use(express.static(__dirname+'/../public'));
    app.use(session({
        secret:'zonybir',
        resave:false,
        saveUninitialized:true
    }));

    app.use(cookieParser());

    router(app);

}

module.exports=server;