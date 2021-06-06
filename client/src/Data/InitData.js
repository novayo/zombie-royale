import io from 'socket.io-client';
import { URL, user, map, update } from './Restore'
import { GetData } from '../Data/GetData'

let TEST = true;

const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function InitData(name, passward) {
    let socket = GetData("socket");

    const _id = guid();

    let data = {
        'username': name,
        'password': passward,
        'room': `${Math.floor(Math.random() * 100)}`,
        'tick': 64,
        '_id': _id
    }

    if (TEST) {
        data['room'] = '25'
        user.Room = '25'
    }

    socket.emit("SetRoom", data)
    // socket.emit("SetRoom", {username: name, passward: passward})
    socket.on("getRoom", (data) => {
        user.Room = data.room;
        // map.size = data.map.size // 需討論 若造自動分配地圖就和Room綁再一起
        // map.kind = data.map.kind // 需討論
        // map.data = data.map.data // 需討論
        socket.disconnect();
    })
    user._id = _id;
    user.name = name;
    update.state = true;

}
