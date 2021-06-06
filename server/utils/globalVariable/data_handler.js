
module.exports = class Handler {
    constructor() {
        this.user_data = {} // {'_id': {'name', 'room', }}
        this.room_data = {} // {'room' : {'_id':[_id], 'tick'}}
    }

    // 函數名稱修正
    addUser(_id, name, room, tick) {
        // user data
        if (!(_id in this.user_data)) {
            this.user_data[_id] = { 'name': name, 'room': room, 'kind': '', 'r': [-1, -1] }
        }
        else {
            console.log(`[加入使用者異常!] ${_id}你已經在裡面了`);    //未來寫成Log.txt
            return;
        }
        // room data : init
        if (!(room in this.room_data)) {
            this.room_data[room] = { '_id': [], 'tick': tick }
        }
        // 加入使用者socket id
        this.room_data[room]['_id'].push(_id)
    }

    setUserInfo(_id, name, room, kind, r) {

        if (!(_id in this.user_data)) {
            return
        }

        // 之後優化
        this.user_data[_id]['name'] = name
        this.user_data[_id]['room'] = room
        this.user_data[_id]['kind'] = kind
        this.user_data[_id]['r'] = r
    }

    getAllRoom() {
        return this.room_data;
    }

    getRoomBroadcastData(room) {
        data = {}

        if (room in this.room_data) {
            data = {} // 討論要傳送什麼資料出去
        }
        return data
    }

    getAllUsersName() {
        let names = []
        for (let _id in this.user_data) {
            let username = this.user_data[_id]['name'];
            names.push(username);
        }
        return names
    }

    getAllUserInfoList() {
        let ret = []
        for (let _id in this.user_data) {
            let name = this.user_data[_id]['name']
            let room = this.user_data[_id]['room']
            let kind = this.user_data[_id]['kind']
            let r = this.user_data[_id]['r']
            ret.push({ '_id': _id, 'r': r, 'name': name, 'room': room, 'kind': kind })
        }
        return ret
    }

    getRoomTick(room) {
        if (!(room in this.room_data)) {
            return 64;  //未來改成讀取全域設定檔變數
        }
        let tick = 0
        tick = this.room_data[room]['tick']
        return tick
    }

}