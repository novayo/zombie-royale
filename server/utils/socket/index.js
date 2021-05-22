const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const socket_settings = require('./socket_settings')

const app = express();
const server = http.createServer(app);

app.use(router); // as middleware

const io = socketio(server, {
    //https://stackoverflow.com/a/64805972
    cors: {
        origin: `http://localhost:3000`,
        credentials: true
    }
}); //https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

socket_settings(io);

module.exports = {
    'SERVER': server
}