import { useEffect, useContext, useCallback, useState } from 'react'
import { LoadData } from '../Data/LoadData'
import { GetData } from '../Data/GetData'
import { originUser, InitUser } from './Init/InitUser'
import { userContext } from '../Data/Index';
import { wallContext } from '../Data/Index';
import { Keyboard, Move } from './KeyBoard/KeyBoard'
import Factory from './Object/Factory/Factory'
import Collision from './Object/Collision/Collision'
import { Shoot } from './Object/Action/Shoot'
import io from 'socket.io-client';
import { URL } from '../Data/Restore'

let socket = GetData("socket");

function Start() {
    // console.log(GetData("name"));
    const user = useContext(userContext);
    const wall = useContext(wallContext);
    const [mousePos, setMousePos] = useState([null, null]);
    const [bulletPos, setBulletPos] = useState([]);
    // const originUser = InitUser();

    const sendDataToServer = (data) => {
        console.log('送資料給server')
        // console.log("Client Send:");
        console.log(data);

        // user.set({ opr: "set", user: data });
        // if (data.kind === "Bullet") {
        //     setBulletPos([data]);
        // } else if (data.kind === "x") {
        //     wall.set({ opr: "add", wall: data });
        // } else if (data.kind === "move") {
        //     user.set({ opr: "update", user: data });
        // } else {
        //     user.set({ opr: "add", user: data });
        // }
        socket.emit("setUser", data);
    }

    const getDataFromServer = () => {
        console.log('從Server取得所有使用者資料')
        socket.on("updateGameData", (data) => {
            console.log("Client Get:");
            console.log(data)
            user.set({opr: "set", user: data});
        });
    }

    // 遊戲開始流程
    useEffect(() => {
        if (!GetData("update").state) {
            LoadData();
            InitUser(getDataFromServer, sendDataToServer); // 之後要拿掉
        } else {
            InitUser(getDataFromServer, sendDataToServer);
        }
        // getDataFromServer();
        // sendDataToServer(originUser.myUser)

        // eslint-disable-next-line
    }, [])


    const handleKeyUp = useCallback((event) => {
        if (Keyboard('keyup', event.key)) {
            sendDataToServer({ r: [Math.floor(Math.random() * 500), Math.floor(Math.random() * 500)], kind: event.key, name: GetData("name"), room: GetData("room") });
        }

        // eslint-disable-next-line
    }, [user.get, wall.get])


    const handleKeyDown = useCallback((event) => {
        if (Keyboard('keydown', event.key)) {
            var move = Move(event.key, 5);
            var collision = Collision(originUser.myUser.r, move, user.get, wall.get, 12, 20, 100, { left: [0, 500], top: [0, 500] });
            if (collision.move !== undefined) {
                move = collision.move;
            }
            if (collision.event) {
                originUser.myUser.r = [originUser.myUser.r[0] + move[0], originUser.myUser.r[1] + move[1]];
                sendDataToServer({ r: originUser.myUser.r, kind: "move", name: GetData("name"), room: GetData("room") });
            }

        }

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

    const handleMouseMove = (event) => {
        setMousePos([event.x, event.y]);
    }

    const handleMouseDown = (event) => {
        const shoot = Shoot(originUser.myUser.r, mousePos, 12, 2);
        var totalTime = shoot.totalTime;
        var start = shoot.start;

        const bulletFly = setInterval(() => {
            if (totalTime === 0) {
                clearInterval(bulletFly);
            }

            start = [start[0] + shoot.speedVector[0], start[1] + shoot.speedVector[1]];
            sendDataToServer({ r: start, kind: "Bullet", name: GetData("name"), room: GetData("room") });
            totalTime -= shoot.timeStep;

        }, shoot.timeStep);


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
