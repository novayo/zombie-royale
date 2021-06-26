import GetData from '../../Data/GetData'

function GetMyUser(allUser) {
    var myUser = undefined;
    for(let i = 0; i < allUser.length; i++){
        if(allUser[i].kind === "z" && GetData("name") === allUser[i].name){ // 這裡之後要用_id去判斷
            myUser = allUser[i];
            break;

        }
    }
    return myUser;
}

export default GetMyUser
