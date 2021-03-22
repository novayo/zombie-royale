const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.SERVER_PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    //https://stackoverflow.com/a/64805972
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
}); //https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

app.use(router); // as middleware

io.on('connection', (socket) => {

});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));