const gv_ = require('../globalVariable');
const guid = require('../functions/guid');

module.exports = socket_settings = (io) => {
    io.on('connection', (socket) => {
        socket.on('SetRoom', (data) => {
            username = data['username']['get']
            password = data['password']['get']
            room = data['room']

            if (room == null) {
                room = guid()
            }

            gv_.addUser(socket.id, username, room);
            socket.emit('getRoom', { 'room': room });
        })
    });
}
