
function VelRebound(vel, myCirclePos, otherCirclePos) {
    const delta = 0.1;

    if (myCirclePos[0] - otherCirclePos[0] > 0) {
        vel[0] = delta
    } else if (myCirclePos[0] - otherCirclePos[0] < 0) {
        vel[0] = -delta
    }

    if (myCirclePos[1] - otherCirclePos[1] > 0) {
        vel[1] = delta
    } else if (myCirclePos[1] - otherCirclePos[1] < 0) {
        vel[1] = -delta
    } 

    return vel

}

export function circleIntervalHandle(velVector, myCirclePos, otherCirclePos) {
    if(Math.abs(myCirclePos[0] - otherCirclePos[0]) <= 1 || Math.abs(myCirclePos[1] - otherCirclePos[1]) <= 1){
        return VelRebound(velVector, myCirclePos, otherCirclePos)
    }

    var vector = [otherCirclePos[0] - myCirclePos[0], otherCirclePos[1] - myCirclePos[1]]
    var vectorlength = (vector[0] ** 2 + vector[1] ** 2) ** 0.5

    var constant = (velVector[0] * vector[0] + velVector[1] * vector[1]) / vectorlength ** 2

    var projection = [constant * vector[0], constant * vector[1]]
    var vertical = [velVector[0] - projection[0], velVector[1] - projection[1]]
    
    return VelRebound(vertical, myCirclePos, otherCirclePos)
}


export function circleRectHandle(velVector, myCirclePos, rectPos, width, height) {
    if (rectPos[0] <= myCirclePos[0] && myCirclePos[0] <= rectPos[0] + width) {
        if (myCirclePos[1] <= rectPos[1] + height / 2) {
            return [velVector[0], -Math.abs(velVector[1])] // 上邊牆壁
        } else {
            return [velVector[0],  Math.abs(velVector[1])] // 下邊牆壁
        }
    } else if (rectPos[1] <= myCirclePos[1] && myCirclePos[1] <= rectPos[1] + height) {
        if (myCirclePos[0] <= rectPos[0] + width / 2) {
            return [-Math.abs(velVector[0]), velVector[1]] // 左邊牆壁
        } else {
            return [ Math.abs(velVector[0]), velVector[1]] // 右邊牆壁
        }
    } else {
        return velVector; // 請搞清楚
    }

}

