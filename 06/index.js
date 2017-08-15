var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;
var path = require('path');


app.use(express.static(path.join(__dirname, '/public')));

io.on('connection', function(socket) {
    var newdata;
    socket.on('newmsg',function (data) {
        newdata = data;
        console.log(newdata)
        socket.emit('getmsg',newdata);
    })
    
});



http.listen(port, function() {
    console.log('listening on ' + port);
});