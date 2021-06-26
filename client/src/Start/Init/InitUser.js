import GetData from '../../Data/GetData'

function InitUser(UpdateData, SendData, RenderUser) {
    // const size = GetData("map");
    const size = 500;

    const user = {
        '_id': GetData('_id'),
        'r': [Math.floor(Math.random() * size), Math.floor(Math.random() * size)],
        'vel': [0, 0],
        'kind': "z",
        'name': GetData("name"),
        'room': GetData("room")
    }

    UpdateData("updateGameData");
    SendData("setUser", user);
    RenderUser();

    console.log("InitUser Complete !!!")
}

export default InitUser;
