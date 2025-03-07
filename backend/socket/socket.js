import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:['https://baatcheet-gamma.vercel.app'],
        methods:['GET','POST'],
    },
});

export const getReceiverSocketId = (recieverId) => {
    return userSocketMap[recieverId];
}

const userSocketMap = {};

io.on('connection', (socket)=>{
    const userId = socket.handshake.query.userId
    console.log("user connected",socket.id)
    if(userId != undefined){
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers',Object.keys(userSocketMap));

    socket.on('disconnect', ()=> {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })
})

export {app, io, server}
