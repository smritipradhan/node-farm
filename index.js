const fs = require('fs') ; //we import the fs module and use it 
const http = require('http');

// console.log("Hello this is my first Node Js Project");

/* -----------------------------------------------------------*/

//Synchronous File Read
// const file = fs.readFileSync('./txt/final.txt','utf-8');
// console.log("File:-",file);
// const textOut = `Writing into this file - ${file}`;
// fs.writeFileSync("./txt/input.txt",textOut);
// console.log(textOut);

/* -----------------------------------------------------------*/

// Asynchronous File Read
// fs.readFile('./txt/read-this.txt','utf-8',(error,data)=>{
//     console.log(`Here is your file : - ${data}`,);
//     console.log("error:",error);
// })

// console.log("Reading File Asynchronously.....");

/* -----------------------------------------------------------*/

// Creating a Web Server
const server = http.createServer((req,res)=>{
    res.end("Hello from the Server !!");
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening to request on port 8000");
})