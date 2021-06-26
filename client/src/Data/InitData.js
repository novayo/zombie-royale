import { user, update } from './DataHelper/Restore'
import HotData from './DataHelper/HotData'

let TEST = true;

const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

async function InitData(name, passward) {
    const _id = guid();

    let data = {
        'username': name,
        'password': passward,
        'room': `${Math.floor(Math.random() * 100)}`,
        'tick': 64,
        '_id': _id
    }

    if (TEST) {
        data["room"] = "25";
        user["room"] = "25";
    }

    // const ret = await HotData("SetRoom", "getRoom", data)

    // user["room"] = ret["room"];
    user["_id"] = data["_id"];
    user["name"] = data["username"];
    
    update["state"] = true;

    const ret = await HotData("SetRoom", "getRoom", data)

    console.log("InitData Complete !!! Do not forget solve this problem")

}

export default InitData;
