const http = require('http');
// const express = require('express');

// const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// app.get(hostname,(req,res) => {
//     res.send('Hello World');
// })

// app.listen(port)


const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hola Mundo');
});

server.listen(port, hostname,()=>{
    console.log(`El servidor esta corriendo en http://${hostname}:${port}/`);
});