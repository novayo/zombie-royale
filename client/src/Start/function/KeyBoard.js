import Collision from '../Object/Collision/Collision'
import GetData from '../../Data/GetData'
import SendData from '../../Data/SendData'
import GetMyUser from './GetMyUser'
import SplitData from './SplitData'

export var keyboard = {
    keyup: new Set(["z", "x", "w"]),
    keydown: new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]),
    active: new Set()
}

export const MoveEvent = (key, speed) => {

    switch (key) {
        case "ArrowUp":
            return [0, -speed];
        case "ArrowDown":
            return [0, speed];
        case "ArrowLeft":
            return [-speed, 0];
        case "ArrowRight":
            return [speed, 0];
        default:
            return [0, 0];
      }
    
}

export const MoveEngine = (speed) => {

    setInterval(() => {
        if(keyboard.active.size === 0){
            return
        }

        var data = SplitData(GetData("updateGameData"))
        var user = {allUser: data.user, myUser: GetMyUser(data.user)};
        var wall = data.wall;

        var move = [0, 0];
        for (let action of keyboard.active.values()){
            move = [move[0] + MoveEvent(action, speed)[0], move[1] + MoveEvent(action, speed)[1]]
        }
    
        var collision = Collision(user.myUser.r, move, user.allUser, wall, 12, 20, 100, { left: [0, 500], top: [0, 500] });
    
        if (collision.move !== undefined) {
            move = collision.move;
        }
    
        if (collision.event) {
            var originUser = user.myUser.r
            originUser = [originUser[0] + move[0], originUser[1] + move[1]];
            SendData("setUser", { r: originUser, kind: "z", name: GetData("name"), room: GetData("room") });
        }

        // console.log(user.myUser.r);

    }, 10)


}

export const KeyUp = (key) => {

    keyboard.active.delete(key);

    if (!keyboard.keyup.has(key)) {
        return
    }

    SendData("setUser", { r: [Math.floor(Math.random() * 500), Math.floor(Math.random() * 500)], kind: key, name: GetData("name"), room: GetData("room") });

}

export const KeyDown = (key) => {
    if (!keyboard.keydown.has(key)) {
        return
    }

    if(keyboard.active.has(key)){
        return
    }else{
        keyboard.active.add(key)
    }

}