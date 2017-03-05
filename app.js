const express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    router = require('./src/routers/index.js'),
    app=express();

app.set('port',process.env.PORT || 80);
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret:'zonybir',
    resave:false,
    saveUninitialized:true
}));

app.use(cookieParser());

router(app);

app.listen(app.get('port'),()=>{
    console.log('server has started!\n'+new Date());
});