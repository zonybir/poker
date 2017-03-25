const express = require('express'),
    http = require('http'),
    socket = require('socket.io'),
    socketServerCore = require('./src/socketServer.js'),
    app=express(),
    server = http.Server(app)
    io = socket(server);
    server = http.Server(app),
    io = socket(server),

    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    router = require('./src/routers/index.js'),
    bodyParser = require('body-parser');


app.set('port',process.env.PORT || 2111);
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/json' })); //
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

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

global.hall=[];
global.gameUser={};
[1,2,3,4,5].map((v,k)=>{
    let id=Math.round(Math.random()*10000);
    global.hall.push({
        id:id,
        user:[],
        dz:0
    })
})
router(app);
socketServerCore(io);

server.listen(app.get('port'),()=>{
    console.log('server has started!\n'+new Date());
});
