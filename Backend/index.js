// Node Sever which will handle socket.io connections
// const io=require("socket.io")(8000);   //We can use any port,here we are using 8000
const io=require("socket.io")(8000);
const users={};
io.on("connection",socket=>{
    socket.on("new-user-joined",name=>{    
    //socket.on ek event listener hai,isko jab bhi "new-user-joined" milega tb ye us socket ki id ko users ke name mai store krdega
        users[socket.id]=name;
        socket.broadcast.emit("user-joined",name)   
        //Broadcast.emit ye krta hai ki jis new user ne join kiya usko chochkar sbko event emit krdeta hai.
    });

    socket.on("send",message=>{     //Agar kisi ne koi msg send kiya toh ye event fire hoga
        socket.broadcast.emit("recieve",{message,name:users[socket.id]});    
        //ye "recieve" event baki sbko bta dega ki msg kya hai or kisne bheja hai
    })
    socket.on("disconnect",message=>{     //Agar kisi ne chat leave kri hogi toh
        socket.broadcast.emit("left-the-chat",users[socket.id]);    
        delete users[socket.id]
    })

})