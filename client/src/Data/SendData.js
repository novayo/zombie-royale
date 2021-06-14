import GetData from './GetData'

function SendData(setData, data) {
    data["_id"] = GetData("_id")

    let socket = GetData("socket");
    socket.emit(setData, data);

}

export default SendData
