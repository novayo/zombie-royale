

export const circleInterval = (myCirclePos, speedVector, circle, rad) => {
    for(var i = 0; i < circle.length; i++){
        var moveCirclePos = [myCirclePos[0] + speedVector[0], myCirclePos[1] + speedVector[1]]
        var distance = (myCirclePos[0] - circle[i].r[0]) ** 2 + (myCirclePos[1] - circle[i].r[1]) ** 2;
        var movedistance = (moveCirclePos[0] - circle[i].r[0]) ** 2 + (moveCirclePos[1] - circle[i].r[1]) ** 2;
        if(distance !== 0 && movedistance <= (2 * rad) ** 2){
            return {event: true, index: i}
        }
    }
    return {event: false}
}

export const circleRect = (myCirclePos, speedVector, rect, rad, width, height) => {
    for(var i = 0; i < rect.length; i++){
        var moveCirclePos = [myCirclePos[0] + speedVector[0], myCirclePos[1] + speedVector[1]]
        if(moveCirclePos[0] + 2 * rad >= rect[i].r[0] && moveCirclePos[0] <= rect[i].r[0] + width && moveCirclePos[1] + 2 * rad >= rect[i].r[1] && moveCirclePos[1] <= rect[i].r[1] + height){
            return {event: true}
        }
    }
    return {event: false}
}

// function Event(myCirclePos, speedVector, circle, rect, rad, width, height) {
//     if(circleRect(myCirclePos, speedVector, rect, rad, width, height)){
//         return {circleRect: true}
//     }

//     return circleInterval(myCirclePos, speedVector, circle, rad);
// }

// export default Event
