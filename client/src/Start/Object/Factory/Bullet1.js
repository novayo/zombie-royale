import React from 'react'

function Bullet1(props) {
    const [ID, posx, posy] = [props.data.name, props.data.r[0], props.data.r[1]];
    return (
        <div>
            <svg id = { ID } height="4" width="4" style = {{left: posx + 'px', top: posy + 'px', position:'absolute'}}>
                <circle cx="2" cy="2" r="2" fill="red" />
            </svg> 
        </div>
    )
}

export default Bullet1
