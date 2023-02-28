const fs = require('fs') ; //we import the fs module and use it 

console.log("Hello this is my first Node Js Project");

/* -----------------------------------------------------------*/

//Synchronous File Read
const file = fs.readFileSync('./txt/final.txt','utf-8');
console.log("File:-",file);
const textOut = `Writing into this file - ${file}`;
fs.writeFileSync("./txt/input.txt",textOut);
console.log(textOut);

/* -----------------------------------------------------------*/

// Asynchronous File Read