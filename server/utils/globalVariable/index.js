const Users = require('./users')

class globalVariable {
    constructor() {
        this.users = new Users()
    }

    addUser(socket_id, name, room) {
        this.users.addUser(socket_id, name, room)
    }

    getAllUserName() {
        return this.users.getAllUsersName()
    }
}

const gv_ = new globalVariable()

module.exports = gv_