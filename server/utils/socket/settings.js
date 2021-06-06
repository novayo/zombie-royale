const gv_ = require('../globalVariable');
const guid = require('../functions/guid');
const SetRoomBroadcast = require('./broadcast');

module.exports = socket_settings = (io) => {
    io.on('connection', (socket) => {
        socket.on('SetRoom', (data) => {
            let _id = data['_id']
            let username = data['username']
            let password = data['password']
            let room = data['room']
            let tick = data['tick']

            if (room == null) {
                room = guid()
            }

            gv_.addUser(_id, username, room, tick);
            socket.join(room);
            SetRoomBroadcast(io, room);
            socket.emit('getRoom', { 'room': room });
        })


        socket.on('setUser', (data) => {
            // data = 使用者資料
            let _id = data['_id']
            let r = data['r']
            let kind = data['kind']
            let name = data['name']
            let room = data['room']

            // 設定使用者資訊
            gv_.setUserInfo(_id, name, room, kind, r)

            // 用socket id 取出使用者資料
            need_data = gv_.getAllUserInfoList()
            socket.emit('getUser', need_data)
        })

    });
}
