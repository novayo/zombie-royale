

export const circleInterval = (myCirclePos, circle, rad) => {
    for(var i = 0; i < circle.length; i++){
        var distance = (myCirclePos[0] - circle[i].r[0]) ** 2 + (myCirclePos[1] - circle[i].r[1]) ** 2;
        if(distance !== 0 && distance <= (2 * rad) ** 2){
            return {event: true, index: i}
        }
    }
    return {event: false}
}

export const circleRect = (myCirclePos, rect, rad, width, height) => {
    for(var i = 0; i < rect.length; i++){
        if(myCirclePos[0] + rad >= rect[i].r[0] && myCirclePos[0] - rad <= rect[i].r[0] + width && myCirclePos[1] + rad >= rect[i].r[1] && myCirclePos[1] - rad <= rect[i].r[1] + height){
            return {event: true, index: i}
        }
    }
    return {event: false}
}
