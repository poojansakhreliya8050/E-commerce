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

        // When a client joins a category room
        socket.on('joinCategory', (categoryId) => {
            console.log("Joining category room: ", categoryId);
            socket.join(categoryId);
        });

        // When a client leaves a specific category room
        socket.on('leaveCategory', (categoryId) => {
            socket.leave(categoryId);
            console.log(`Left category: ${categoryId}`);
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