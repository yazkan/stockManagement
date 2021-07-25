const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
 
const app = express();
const appServer = http.createServer(app);
//const io = socketIo(appServer);
const io = require("socket.io")(appServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 5555;

//product id
var id = 0;
var productArr = [];

io.on("connection", socket => {
    console.log(`${Date(Date.now()).toLocaleString()}: Client Connected.`);
    //ürün arrayi client servera bağlandıktan sonra clienta gönderilir
    //hiç ürün yoksa boş array gönderilir
    io.emit("startout", productArr);

    socket.on("create", (product) => {
        //create isteği üzerine oluşrulan yeni ürünün id'sinin eklenip product arrayinin gönderilmesi
        product.id = id;
        productArr = productArr.concat(product);
        io.emit("createout", productArr);

        //server tarafından üretilen product id
        ++id;
    });

    socket.on("update", (product) =>{
        var index = productArr.findIndex((element) => element.id == product.id);
        productArr[index] = product;
        io.emit("updateout", productArr);
    });

    socket.on("delete", (product) =>{
        var index = productArr.findIndex((element) => element.id == product.id);
        productArr.splice(index, 1);
        io.emit("deleteout", productArr);
    });

    socket.on("disconnect", () => {
        console.log(`${Date(Date.now()).toLocaleString()}: Client Disconneted.`);
    });
});
 

appServer.listen(port, () => {
    console.log(`${Date(Date.now()).toLocaleString()}: Server activated. Port: ${port}`);
});