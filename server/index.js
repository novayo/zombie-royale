const SOCKET = require('./utils/socket');
const gv_ = require('./utils/globalVariable');


const PORT = process.env.SERVER_PORT || 5000;

SOCKET.SERVER.listen(PORT, () => console.log(`Server has started on port ${PORT}`));



