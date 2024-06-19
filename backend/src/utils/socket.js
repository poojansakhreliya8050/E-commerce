// socket.js
const socketIo = require('socket.io');
let io;
const initSocket = (server) => {

    io = socketIo(server, {
        cors: {
            origin: 'http://localhost:3000',// Replace with your client app's URL
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            credentials: true
        }
    }
    );
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('message', (message) => {
            console.log('Message received: ', message);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return io;
};

const getSocket = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

module.exports = { initSocket, getSocket };