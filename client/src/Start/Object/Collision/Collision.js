import Focus from './Process/Focus'
import { circleInterval, circleRect } from './Process/Event'
import { circleIntervalHandle, circleRectHandle } from './Process/Handle'

const VelFunction = (vel) => {
    if(vel > 6 || vel < -6 || vel === 0){ // vel正常來說在此處不會有0的情況
        return vel;
    }else if(vel > 0){
        return vel + 0.01;
    }else{
        return vel - 0.01;
    }
}

function Collision(myCirclePos, velVector, circle, rect, rad, width, height, range) {

    // range內的物件判斷碰撞
    const focus = Focus(circle, rect, range);

    // circle和circle部碰撞
    const circleIntervalEvent = circleInterval(myCirclePos, focus.circle, rad);
    if(circleIntervalEvent.event){
        return circleIntervalHandle(velVector, myCirclePos, focus.circle[circleIntervalEvent.index].r);
    }

    // circle和rect部碰撞
    const circleRectEvent = circleRect(myCirclePos, focus.rect, rad, width, height);
    if(circleRectEvent.event){
        return circleRectHandle(velVector, myCirclePos, focus.rect[circleRectEvent.index].r, width, height)
    }

    // 若皆無碰撞事件
    return [VelFunction(velVector[0]), VelFunction(velVector[1])]
    
}

export default Collision
