const express = require('express'),
    http = require('http'),
    socket = require('socket.io'),
    socketServerCore = require('./src/socketServer.js');
    app=express(),
    server = http.Server(app)
    io = socket(server),

    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    router = require('./src/routers/index.js'),
    bodyParser = require('body-parser');


app.set('port',process.env.PORT || 2111);
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser());
var sessionMiddleware = session({
     secret:'zonybir',
    resave:false,
    saveUninitialized:true
 });
 io.use((socket,next)=>{
    sessionMiddleware(socket.request,socket.request.res,next);
 })
app.use(sessionMiddleware);

router(app);
socketServerCore(io);

server.listen(app.get('port'),()=>{
    console.log('server has started!\n'+new Date());
});
