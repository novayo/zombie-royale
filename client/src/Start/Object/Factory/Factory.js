import User1 from './User1'
import Wall1 from './Wall1'
import Bullet1 from './Bullet1'

function Factory(props) {
    switch (props.data.kind) {
      case "z":
        return <User1 data = {props.data}/>;
      case "x":
        return <Wall1 data = {props.data}/>;
      case "Bullet":
        return <Bullet1 data = {props.data}/>;
      default:
        return null;
    }
}

export default Factory;