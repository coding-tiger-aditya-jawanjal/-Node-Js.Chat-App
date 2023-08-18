const express = require("express");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);
app.use(express.static(__dirname + "/public"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(process.env.PORT, () => {
  console.log(`app is listening on PORT : ${process.env.PORT}`);
});

//socket

const io = require("socket.io")(http);

io.on('connection',(socket)=>{
    console.log("Someone Connected...");

    socket.on("message",(msg)=>{
        socket.broadcast.emit("messages",msg);
    })
})