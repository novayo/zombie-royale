
function Focus(circle, rect, range) {
    var [newCircle, newRect] = [[], []];
    for(var i = 0; i < circle.length; i++){
        if(range.left[0] <= circle[i].r[0] && circle[i].r[1] <= range.left[0] && range.top[0] <= circle[i].r[1] && circle[i].r[1] <= range.top[1]){
            newCircle.append(circle[i])
        }
    }
    for(i = 0; i < rect.length; i++){
        if(range.left[0] <= rect[i].r[0] && rect[i].r[0] <= range.left[1] && range.top[0] <= rect[i].r[1] && rect[i].r[1] <= range.top[1]){
            newRect.append(rect[i])
        }
    }
    return {circle: newCircle, rect: newRect}
}

export default Focus
