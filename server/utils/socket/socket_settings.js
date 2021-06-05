const gv_ = require('../globalVariable');
const guid = require('../functions/guid');
const SetRoomBroadcast = require('./broadcast');

module.exports = socket_settings = (io) => {
    io.on('connection', (socket) => {
        socket.on('SetRoom', (data) => {
            username = data['username']['get']
            password = data['password']['get']
            room = data['room']
            //tick = data['tick']   待接
            tick = 128

            if (room == null) {
                room = guid()
            }

            gv_.addUser(socket.id, username, room , tick);
            SetRoomBroadcast(io, room);
            socket.join(room);
            socket.emit('getRoom', { 'room': room });  
        },)

        
    });   
}
