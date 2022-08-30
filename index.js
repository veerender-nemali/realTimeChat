const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// const port = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const users = {};

io.on("connection",socket => {
    socket.on("new-user-joined",name =>{
        console.log("new user : ",name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
       socket.broadcast.emit('recieve',{ message: message, name: users[socket.id] });
    })

    socket.on('disconnect', message => {
       socket.broadcast.emit('left',users[socket.id]);
       delete users[socket.id];
    })
})

server.listen(process.env.PORT, () => {
  console.log("listening on : ",process.env.PORT);
});