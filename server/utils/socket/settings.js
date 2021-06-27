const gv_ = require('../globalVariable');
const guid = require('../functions/guid');
const SetRoomBroadcast = require('./broadcast');

module.exports = socket_settings = (io) => {
    io.on('connection', (socket) => {
        socket.on('SetRoom', (data) => {
            let _id = data['_id']
            let username = data['username']
            let room = data['room']
            let tick = data['tick']

            if (room == null) {
                room = guid()
            }

            gv_.addUser(_id, username, room, tick);
            socket.join(room);
            
            SetRoomBroadcast(io, room);
            socket.emit('getRoom', { 'room': room , "_id" : _id});
        })

        socket.on('setUser', (data) => {
            // data = 使用者資料
            let _id = data['_id']
            let r = data['r']
            let kind = data['kind']
            let name = data['name']
            let room = data['room']
            let vel = data['vel']
            // 設定使用者資訊
            gv_.setUserInfo(_id, name, room, kind, r, vel)
        })

        socket.on('disconnect', () =>{
            socket.emit('disconnected');
        })

        socket.on('leftRoom', (_id) =>{ // either client disconnect or leave room call this 
            gv_.removeUserFromRoom(_id);
        })

        socket.on('getData', (data) =>{
            var retData = {}
            var _id = data['_id']
            var kind = data['kind']
            let ret_Data = ""
            switch(kind){     
                //根據kind做對應的事
                default:
                    break;
            }
            retData['_id'] = _id;
            retData['kind'] = kind
            retData['data'] = ret_Data
            socket.emit('retData', retData)

        })

        socket.on('setObject', (data) =>{
            let _id = data['_id']
            let pos = data['pos']
            let kind = data['kind']
            let name = data['username']
            let room = data['room']
            let vel = data['vel']
            
            switch(kind){
                case 'user':
                    gv_.setUserInfo(_id, name, room, kind, pos, vel)
                    break;
                case 'bullet':  
                    //之後要新增
                    break;
                default:
                    break;
            }
            
        })

    });
}
