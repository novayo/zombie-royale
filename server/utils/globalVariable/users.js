
module.exports = class Users {
    constructor() {
        this.data = {} // {'socket_id': {'name', 'room', }}
        this.room_data = {} // {'room' : {'socket_id':[socket_id], 'tick'}}
    }

    addUser(socket_id, name, room, tick) {
        // user data
        if (!(socket_id in this.data)) {
            this.data[socket_id] = { 'name': name, 'room': room,}
        }
        else{
            console.log(`[加入使用者異常!] ${socket_id}你已經在裡面了`);    //未來寫成Log.txt
            return;
        }
        // room data : init
        if (!(room in this.room_data)) {
            this.room_data[room] = {'socket_id': [],  'tick' : tick }
        }
        // 加入使用者socket id
        this.room_data[room]['socket_id'].push(socket_id)
    }

    getAllRoom(){
        return this.room_data;
    }

    getAllUsersName() {
        let names = []
        for (let socket_id in this.data) {
            username = this.data[socket_id]['name'];
            names.push(username);
        }
        return names
    }

    getRoomTick(room){
        if(! (room in this.room_data)){
            return 64;  //未來改成讀取全域設定檔變數
        }
        let tick = 0
        tick = this.room_data[room]['tick']
        return tick
    }

}