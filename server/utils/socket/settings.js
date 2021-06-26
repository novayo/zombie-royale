const gv_ = require('../globalVariable');
const guid = require('../functions/guid');
const SetRoomBroadcast = require('./broadcast');

module.exports = socket_settings = (io) => {
    io.on('connection', (socket) => {
        socket.on('SetRoom', (data) => {
            _id = data['_id']
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
        })

        socket.on('disconnect', () =>{
            //未來改成延遲timeout->
            socket.emit('disconnected');
        })

        socket.on('leftRoom', (_id) =>{ // either client disconnect or leave room call this 
            gv_.removeUserFromRoom(_id);
        })

        socket.on('getData', (data) =>{
            var retData = {}
            var _id = data['_id']
            var kind = data['kind']
            switch(kind){     
                //根據kind做對應的事
                default:
                    break;
            }
            retData['_id'] = _id;
            retData['kind'] = kind
            retData['data'] = ""
            socket.emit('retData', retData)

        })

        socket.on('setObject', (data) =>{
            let _id = data['_id']
            let r = data['r']   //var pos = data['pos']
            let kind = data['kind']
            let name = data['name']
            let room = data['room']
            let vel = data['room']
            if(name!="")
                gv_.setUserInfo(_id, name, room, kind, r, vel)
            
        })



    });
}
