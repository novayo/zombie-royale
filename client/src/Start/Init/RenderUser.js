import GetData from '../../Data/GetData'
import SplitData from '../function/SplitData'


function RenderUser(user, wall) {
    setInterval(() => {
        const data = SplitData(GetData("updateGameData"));
        user.set({opr: "set", data: data.user});
        wall.set({opr: "set", data: data.wall});
    }, 1000 / 60);

}

export default RenderUser
