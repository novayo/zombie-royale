
function SplitData(allObject) {
    var allWall = [];
    var allUser = [];
    for(let i = 0; i < allObject.length; i++){
        if(allObject[i].kind === "z"){
            allUser.push(allObject[i])

        }else if(allObject[i].kind === "x"){
            allWall.push(allObject[i])
        }
    }
    return {user: allUser, wall: allWall};
}

export default SplitData
