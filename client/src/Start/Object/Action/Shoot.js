
export function Shoot(userPos, mousePos, userRad, bulletRad) {
    const totalTime = 5000;
    const timeStep = 100;
    const speed = 5;
    var vector = [mousePos[0] - (userPos[0] + userRad), mousePos[1] - (userPos[1] + userRad)];
    var vectorlength = (vector[0] ** 2 + vector[1] ** 2) ** 0.5;
    vector = [vector[0] / vectorlength, vector[1] / vectorlength];

    const start = [(userPos[0] + userRad) + vector[0] * (userRad + bulletRad + 5), (userPos[1] + userRad) + vector[1] * (userRad + bulletRad + 5)];
    const speedVector = [vector[0] * speed, vector[1] * speed];

    return {start: start, speedVector: speedVector, totalTime: totalTime, timeStep: timeStep};

}

