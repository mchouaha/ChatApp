var express = require('express');
var socket = require('socket.io');

// App setup
let app = express();
let server = app.listen(4000, () => {
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup server
let io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', (data) => {
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

});
