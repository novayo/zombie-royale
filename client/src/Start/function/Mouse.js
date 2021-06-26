import GetData from '../../Data/GetData'
import SendData from '../../Data/SendData'
import { Shoot } from '../Object/Action/Shoot'

export const MouseDown = (myUser, mousePos) => {
    const shoot = Shoot(myUser, mousePos, 12, 2);
    var totalTime = shoot.totalTime;
    var start = shoot.start;

    const bulletFly = setInterval(() => {
        if (totalTime === 0) {
            clearInterval(bulletFly);
        }

        start = [start[0] + shoot.speedVector[0], start[1] + shoot.speedVector[1]];
        SendData("setUser", { r: start, kind: "Bullet", name: GetData("name"), room: GetData("room") });
        totalTime -= shoot.timeStep;

    }, shoot.timeStep);
}
