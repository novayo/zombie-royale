import GetData from './GetData'
import { updateGameData } from './DataHelper/Restore'

function UpdateData(getData) {
    // console.log(`${getData} socket on !!!`)

    let socket = GetData("socket");

    socket.on(getData, (data) => {
        updateGameData["data"] = data;

    });
}

export default UpdateData
