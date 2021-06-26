import GetData from './GetData'
import { updateGameData } from './DataHelper/Restore'

const client_test = true;

function UpdateData(getData) {
    if(client_test){
        return;
    }

    // console.log(`${getData} socket on !!!`)

    let socket = GetData("socket");

    socket.on(getData, (data) => {
        updateGameData["data"] = data;
    });
}

export default UpdateData
