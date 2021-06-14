import { user, map, update, updateGameData, socket } from './DataHelper/Restore'

function GetData(kind) {
    switch (kind) {
        case "update":
            return update;
        case "room":
            return user.room;
        case "name":
            return user.name;
        case "windowSize":
            return user.windowSize;
        case "map":
            return map
        case "updateGameData":
            return updateGameData.data
        case "_id":
            return user._id
        case "socket":
            return socket
        default:
            return null;
    }

}

export default GetData;
