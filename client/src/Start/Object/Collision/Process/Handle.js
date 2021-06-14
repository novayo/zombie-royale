
function Handle(speedVector, myCirclePos, otherCirclePos) {
    if(Math.abs(myCirclePos[0] - otherCirclePos[0]) <= 1 || Math.abs(myCirclePos[1] - otherCirclePos[1]) <= 1){
        return {event: false}
    }

    var vector = [otherCirclePos[0] - myCirclePos[0], otherCirclePos[1] - myCirclePos[1]]
    var vectorlength = (vector[0] ** 2 + vector[1] ** 2) ** 0.5

    var constant = (speedVector[0] * vector[0] + speedVector[1] * vector[1]) / vectorlength ** 2

    var projection = [constant * vector[0], constant * vector[1]]
    var vertical = [speedVector[0] - projection[0], speedVector[1] - projection[1]]

    var speed = (speedVector[0] ** 2 + speedVector[1] ** 2) ** 0.5
    var projectionlength = (projection[0] ** 2 + projection[1] ** 2) ** 0.5
    vertical = [vertical[0] * speed / projectionlength, vertical[1] * speed / projectionlength]
    
    return {event: true, move: vertical}
}

export default Handle
