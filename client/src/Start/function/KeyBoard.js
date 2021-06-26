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

const MoveEvent = (key, vel) => {

    var [velx, vely] = [
        Math.max(Math.abs(vel[0]), 1), 
        Math.max(Math.abs(vel[1]), 1)
    ]

    switch (key) {
        case "ArrowUp":
            return [0, -vely];
        case "ArrowDown":
            return [0, vely];
        case "ArrowLeft":
            return [-velx, 0];
        case "ArrowRight":
            return [velx, 0];
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
        var wall = data.wall;
        var user = {
            allUser: data.user, 
            myUser: GetMyUser(data.user)
        };
        
        var move = [0, 0];
        for (let action of keyboard.active.values()){ // double key support
            move = [
                move[0] + MoveEvent(action, user.myUser.vel)[0], 
                move[1] + MoveEvent(action, user.myUser.vel)[1]
            ]
        }
    
        move = Collision(
            user.myUser.r,                        // myCirclePos
            move,                                 // velVector
            user.allUser,                         // circle
            wall,                                 // rect
            12,                                   // circle rad
            20,                                   // rect width
            100,                                  // rect height
            { left: [0, 500], top: [0, 500] }     // focus range
        );

        var originUser = user.myUser.r
        originUser = [
            originUser[0] + move[0], 
            originUser[1] + move[1]
        ];
        SendData(
            "setUser", 
            { 
                r: originUser, 
                vel: move, 
                kind: "z", 
                name: GetData("name"), 
                room: GetData("room") 
            }
        );

        // console.log(user.myUser.r);

    }, 10)


}

export const KeyUp = (key) => {

    keyboard.active.delete(key);

    if (!keyboard.active.has("ArrowUp") && !keyboard.active.has("ArrowDown")){
        const data = GetMyUser(SplitData(GetData("updateGameData")).user);
        SendData(
            "setUser", 
            { 
                r: data.r, 
                vel: [data.vel[0], 0], 
                kind: "z", 
                name: GetData("name"), 
                room: GetData("room") 
            }
        );
    }

    if (!keyboard.active.has("ArrowLeft") && !keyboard.active.has("ArrowRight")){
        const data = GetMyUser(SplitData(GetData("updateGameData")).user);
        SendData(
            "setUser", 
            { 
                r: data.r, 
                vel: [0, data.vel[1]], 
                kind: "z", 
                name: GetData("name"), 
                room: GetData("room") 
            }
        );
    }

    if (!keyboard.keyup.has(key)) {
        return
    }

    SendData(
        "setUser", 
        { 
            r: [Math.floor(Math.random() * 500), Math.floor(Math.random() * 500)], 
            vel: [0, 0], 
            kind: key, 
            name: GetData("name"), 
            room: GetData("room") 
        }
    );

}

export const KeyDown = (key) => {
    if (!keyboard.keydown.has(key) || keyboard.active.has(key)) {
        return
    }

    keyboard.active.add(key)

}