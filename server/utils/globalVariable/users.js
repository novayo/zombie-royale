
module.exports = class Users {
    constructor() {
        this.data = {} // {'socket_id': {'name', 'room'}}
        this.room = {} // {'room': [socket_id]}
    }

    addUser(socket_id, name, room) {
        // user data
        if (!(socket_id in this.data)) {
            this.data[socket_id] = { 'name': name, 'room': room }
        }

        // room data
        if (!(room in this.room)) {
            this.room[room] = []
        }
        if (!(socket_id in this.room[room])) {
            this.room[room].push(socket_id)
        }
    }

    getRoomUsers(room) {
        if (!room in this.room) {
            return
        }

        let ret = []
        for (let socket_id of this.room[room]) {
            username = this.data[socket_id].name;
            ret.push(username);
        }
        return ret
    }

    getAllUsersName() {
        let names = []
        for (let socket_id in this.data) {
            username = this.data[socket_id]['name'];
            names.push(username);
        }
        return names
    }

}