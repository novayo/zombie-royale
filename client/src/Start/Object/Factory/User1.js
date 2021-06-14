import React from 'react'

function User1(props) {
    const [ID, posx, posy] = [props.data.name, props.data.r[0], props.data.r[1]];
    return (
        <div>
            <svg id = { ID } height="24" width="24" style = {{left: posx + 'px', top: posy + 'px', position:'absolute'}}>
                <circle cx="12" cy="12" r="12" fill="red" />
            </svg> 
        </div>
    )
}

export default User1
