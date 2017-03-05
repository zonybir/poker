const express = require('express'),
    http = require('http'),
    socket = require('socket.io'),
    expressServerCore = require('./src/server.js'),
    socketServerCore = require('./src/socketServer.js');
    app=express(),
    server = http.Server(app)
    io = socket(server);

expressServerCore(app,express);
socketServerCore(io);

server.listen(app.get('port'),()=>{
    console.log('server has started!\n'+new Date());
});
