const net = require('net');
const server = net.createServer(socket => {
    socket.on('data', data => {
        socket.write(data);
    });
});

server.listen(8000);

//in another terminal: telnet 127.0.0.1 8000, to use