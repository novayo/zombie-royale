import React from 'react'
import Svg from './Svg';

function Wall1(props) {
    const [ID, posx, posy] = [props.data.name, props.data.r[0], props.data.r[1]];
    return (
        <div>
            <svg id = {ID} width="20" height="100" style = {{left: posx + 'px', top: posy + 'px', position:'absolute'}}>
                <rect width="20" height="100" />
            </svg>
            {/* <Svg id={ID} width="20" height="100" left={posx} top={posy}>
                <rect width="20" height="100" />
            </Svg> */}
        </div>
    )
}

export default Wall1
