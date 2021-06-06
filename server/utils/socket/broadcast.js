const gv_ = require('../globalVariable');
const TEST = true;  //測試broadcast

//設定定期廣播room
SetRoomBroadcast = (io, room) => {
    if (!(room in gv_.getAllroom())) {
        return;
    }

    tick = gv_.getRoomTick(room);
    setInterval(() => {
        data = gv_.getRoomBroadcastData(room);
        if (TEST) {
            data = { 'room': room };
        }

        io.to(room).emit('updateGameData', data);
        //console.log(`房間:${room}->當前所有使用者名稱：${room} , TICK = ${tick}`);
    }, 1000 / tick)
}


module.exports = SetRoomBroadcast;


