import Collision from '../Object/Collision/Collision'
import GetData from '../../Data/GetData'
import SendData from '../../Data/SendData'
import GetMyUser from './GetMyUser'
import SplitData from './SplitData'

var keyboard = {
    keyup: new Set(["z", "x", "w"]),
    keydown: new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]),
    active: new Set()
}

const VelFunction = (vel) => {
    if(vel > 3){
        return vel;
    }else{
        return vel + 0.01;
    }
}

const MoveEvent = (key, vel) => {

    switch (key) {
        case "ArrowUp":
            return [0, -vel];
        case "ArrowDown":
            return [0, vel];
        case "ArrowLeft":
            return [-vel, 0];
        case "ArrowRight":
            return [vel, 0];
        default:
            return [0, 0];
      }
    
}

export const MoveEngine = () => {

    setInterval(() => {
        if(keyboard.active.size === 0){
            return
        }

        var data = SplitData(GetData("updateGameData"))
        var user = {allUser: data.user, myUser: GetMyUser(data.user)};
        var wall = data.wall;

        var move = [0, 0];
        for (let action of keyboard.active.values()){
            move = [move[0] + MoveEvent(action, user.myUser.vel)[0], move[1] + MoveEvent(action, user.myUser.vel)[1]]
        }
    
        var collision = Collision(user.myUser.r, move, user.allUser, wall, 12, 20, 100, { left: [0, 500], top: [0, 500] });
    
        if (collision.move !== undefined) {
            move = collision.move;
        }
    
        if (collision.event) {
            var originUser = user.myUser.r
            originUser = [originUser[0] + move[0], originUser[1] + move[1]];
            SendData("setUser", { r: originUser, vel: VelFunction(user.myUser.vel), kind: "z", name: GetData("name"), room: GetData("room") });
        }

        // console.log(user.myUser.r);

    }, 10)


}

export const KeyUp = (key) => {

    keyboard.active.delete(key);

    if (keyboard.active.size === 0) {
        SendData("setUser", { r: GetMyUser(SplitData(GetData("updateGameData")).user).r, vel: 1, kind: "z", name: GetData("name"), room: GetData("room") });
    }

    if (!keyboard.keyup.has(key)) {
        return
    }

    SendData("setUser", { r: [Math.floor(Math.random() * 500), Math.floor(Math.random() * 500)], vel: 1, kind: key, name: GetData("name"), room: GetData("room") });

}

export const KeyDown = (key) => {
    if (!keyboard.keydown.has(key) || keyboard.active.has(key)) {
        return
    }

    keyboard.active.add(key)

}