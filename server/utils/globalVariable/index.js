const socket = require('../socket');
const Users = require('./users')


class globalVariable {
    constructor() {
        this.users = new Users()
    }
    
    addUser(socket_id, name, room, tick) {
        this.users.addUser(socket_id, name, room, tick)
    }

    getAllUserName() {
        return this.users.getAllUsersName()
    }
    getAllroom(){
        return this.users.getAllRoom();
    }
    getRoomTick(room){
        return this.users.getRoomTick(room);
    }
}

const gv_ = new globalVariable()

module.exports = gv_