import GetData from './GetData'
import { updateGameData } from './DataHelper/Restore'

const client_test = false;

// 測試使用
function PushData(newData){
    if(newData.kind === "Bullet"){ // 先暫時鎖住
        return
    }

    var flag = true;
    if(newData.kind === "z"){
        for(let i = 0; i < updateGameData.data.length; i++){
            if(updateGameData.data[i].kind === "z" && updateGameData.data[i].name === newData.name){
                updateGameData.data[i].r = newData.r
                updateGameData.data[i].vel = newData.vel
                flag = false
            }
        }
    }
    if(flag){
        updateGameData.data.push(newData)
    }
}


function SendData(setData, data) {
    data["_id"] = GetData("_id")

    if(client_test){
        PushData(data);
        return;
    }

    let socket = GetData("socket");
    socket.emit(setData, data);

}

export default SendData
