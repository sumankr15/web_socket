const express=require("express");
const http=require("http");
const path=require("path");
const {Server}=require("socket.io");


const app=express();
const server=http.createServer(app);
//handle socket.input-output
const io= new Server(server);

// io.on('connection',(socket)=>{
//     socket.on("user-message",(message)=>{
//         console.log("a new user connected ", socket.id, message);
//         io.emit("message",message);

//     })
// })
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });


//http request is handeled by
app.use(express.static(path.resolve("./public")));


app.get("/",(req,res)=>{
    return res.sendFile("/public.index.html");
})
server.listen(9000,()=>{
    console.log(`server started on port: 9000`)
})