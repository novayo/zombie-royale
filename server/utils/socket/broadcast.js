const { getRoomTick } = require('../globalVariable');
const gv_ = require('../globalVariable');
const TEST = true;  //測試broadcast


//設定定期廣播room
SetRoomBroadcast = (io, room) =>{
    //tick = gv_.getRoomTick(room) -> 待開發
    if(!(room in gv_.getAllroom())){
        return;
    }

    tick = gv_.getRoomTick(room);
    setInterval(() => {
        //data = gv_.getRoomData(room); -> 待開發
        data = {'room' : room };
        if(TEST){
            data = {'room' : room};
        }
        
        io.to(room).emit('getRoom',  data);
        //console.log(`房間:${room}->當前所有使用者名稱：${room} , TICK = ${tick}`);
    }, 1000/tick)
}


module.exports = SetRoomBroadcast;


