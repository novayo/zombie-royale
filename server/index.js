const SOCKET = require('./utils/socket');
const gv_ = require('./utils/globalVariable');

const PORT = process.env.SERVER_PORT || 5000;

SOCKET.SERVER.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

setInterval(() => {
    all_username = gv_.getAllUserName() // read
    console.log(`當前所有使用者名稱：${all_username}`)
}, 1000)
