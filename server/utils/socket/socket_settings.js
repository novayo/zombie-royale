const gv_ = require('../globalVariable');
const guid = require('../functions/guid');
const SetRoomBroadcast = require('./broadcast');

module.exports = socket_settings = (io) => {
    io.on('connection', (socket) => {
        socket.on('SetRoom', (data) => {
            username = data['username']
            password = data['password']
            room = data['room']
            tick = data['tick']

            if (room == null) {
                room = guid()
            }

            gv_.addUser(socket.id, username, room, tick);
            socket.join(room);
            SetRoomBroadcast(io, room);
            socket.emit('getRoom', { 'room': room });
        })


    });
}
