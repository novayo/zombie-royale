// import Focus from './Process/Focus'
import {circleInterval, circleRect} from './Process/Event'
import Handle from './Process/Handle'

function Collision(myCirclePos, speedVector, circle, rect, rad, width, height, range) {
    const focus = {circle: circle, rect: rect};//Focus(circle, rect, range);
    const circleRectEvent = circleRect(myCirclePos, speedVector, rect, rad, width, height);
    if(circleRectEvent.event){
        return {event: false}
    }

    const circleIntervalEvent = circleInterval(myCirclePos, speedVector, circle, rad);
    if(circleIntervalEvent.event){
        
        return {event: false} // Handle(speedVector, myCirclePos, focus.circle[circleIntervalEvent.index].r);
    }

    return {event: true}
    
}

export default Collision
