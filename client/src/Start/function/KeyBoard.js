import Collision from '../Object/Collision/Collision'
import GetData from '../../Data/GetData'
import SendData from '../../Data/SendData'

export var keyboard = {
    keyup: {"z": true, "x": true, "w": true},
    keydown: {"ArrowUp": true, "ArrowDown": true, "ArrowLeft": true, "ArrowRight": true}
}

export const Keyboard = (kind, key) => {
    switch (kind) {
        case "keyup":
          return keyboard.keyup[key];
        case "keydown":
          return keyboard.keydown[key];
        default:
          return null;
      }
}

export const Move = (key, speed) => {

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

export const KeyUp = (key) => { // user => {allUser: allUser, myUser: myUser}
    if (Keyboard('keyup', key)) {
        SendData("setUser", { r: [Math.floor(Math.random() * 500), Math.floor(Math.random() * 500)], kind: key, name: GetData("name"), room: GetData("room") });
    }
}

export const KeyDown = (key, user, wall) => { // user => {allUser: allUser, myUser: myUser}
    if (Keyboard('keydown', key)) {
        var move = Move(key, 50);
        var collision = Collision(user.myUser.r, move, user.allUser, wall, 12, 20, 100, { left: [0, 500], top: [0, 500] });
        if (collision.move !== undefined) {
            move = collision.move;
        }
        if (collision.event) {
            var originUser = user.myUser.r
            originUser = [originUser[0] + move[0], originUser[1] + move[1]];
            SendData("setUser", { r: originUser, kind: "z", name: GetData("name"), room: GetData("room") });
        }

    }
}