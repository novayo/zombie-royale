import { useEffect, useContext, useCallback, useState } from 'react'
import GetData from '../Data/GetData'
import SplitData from './Init/SplitData'
import SendData from '../Data/SendData'
import UpdateData from '../Data/UpdateData'
import RenderUser from './Init/RenderUser'
import InitUser from './Init/InitUser'
import { userContext } from '../Core/Index';
import { wallContext } from '../Core/Index';
import { KeyUp, KeyDown } from './function/KeyBoard'
import { Shoot } from './Object/Action/Shoot'
import Factory from './Object/Factory/Factory'
import GetMyUser from './function/GetMyUser'

const TEST = true

function Start() {
    // console.log(GetData("name"));
    const user = useContext(userContext);
    const wall = useContext(wallContext);
    const [mousePos, setMousePos] = useState([null, null]);
    const [bulletPos, setBulletPos] = useState([]);

    /*==================================== Start Process ============================================*/

    useEffect(() => {
        if (GetData("update").state) {
            InitUser(UpdateData, SendData, () => RenderUser(user, wall));
        } else {
            InitUser(UpdateData, SendData, () => RenderUser(user, wall)); // 之後要拿掉或改成LoadData()
        }

        // eslint-disable-next-line
    }, [])


    /*==================================== KeyBoard Event ============================================*/

    const handleKeyUp = useCallback((event) => {
        KeyUp(event.key);
        // eslint-disable-next-line
    }, [user.get, wall.get])

    const handleKeyDown = useCallback((event) => {
        KeyDown(event.key, {allUser: user.get, myUser: GetMyUser(user.get)}, wall.get)
        // eslint-disable-next-line
    }, [user.get, wall.get])

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown, handleKeyUp])


    /*==================================== Mouse Event ============================================*/
    // 處理中

    const handleMouseMove = (event) => {
        setMousePos([event.x, event.y]);
    }

    const handleMouseDown = (event) => {
        if (!TEST) {
            const shoot = Shoot(SplitData(user.get).myUser.r, mousePos, 12, 2);
            var totalTime = shoot.totalTime;
            var start = shoot.start;

            const bulletFly = setInterval(() => {
                if (totalTime === 0) {
                    clearInterval(bulletFly);
                }

                start = [start[0] + shoot.speedVector[0], start[1] + shoot.speedVector[1]];
                SendData("setUser", { r: start, kind: "Bullet", name: GetData("name"), room: GetData("room") });
                totalTime -= shoot.timeStep;

            }, shoot.timeStep);
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        // window.addEventListener('touchmove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            // window.removeEventListener('touchmove', handleMouseMove)
        }
    }, [setMousePos])

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown)

        return () => {
            window.removeEventListener('mousedown', handleMouseDown)
        }
    }, [bulletPos, mousePos])


    /*==================================== Render Object ============================================*/

    return (
        <div>
            {user.get.map((data, index) => {
                return <Factory key={index} data={data} />
            })}
            {wall.get.map((data, index) => {
                return <Factory key={index} data={data} />
            })}
            {bulletPos.map((data, index) => {
                return <Factory key={index} data={data} />
            })}
            <h>{mousePos[0]} {mousePos[1]}</h>
        </div>
    )
}

export default Start
