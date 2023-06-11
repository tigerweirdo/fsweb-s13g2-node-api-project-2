// server için gerekli olanları burada ayarlayın
const express = require("express"); 
const server = express();
const postRouter = require("./posts/posts-router");


server.use(express.json());//json isteklerini desteklemesi için

server.use("/api/posts", postRouter) 

// posts router'ını buraya require edin ve bağlayın


module.exports = server;