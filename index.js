const fs = require("fs"); //we import the fs module and use it
const http = require("http");

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
// const server = http.createServer((req, res) => {
//   const pathname = req.url;

//   if (pathname === "/" || pathname === "/overview") {
//     res.end("This is Over View Page");
//   } else if (pathname === "/product") {
//     res.end("This is our Product Page");
//   }
//    else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "My own Header",
//     });
//     res.end(`<h1>Page not Found !! </h1>`);
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to request on port 8000");
// });

/* -----------------------------------------------------------*/

//Creating a simple API (Asynchronous File Read - Not Efficient))
// const server = http.createServer((req, res) => {
//   const pathname = req.url;

//   if (pathname === "/" || pathname === "/overview") {
//     res.end("This is Over View Page");
//   } else if (pathname === "/product") {
//     res.end("This is our Product Page");
//   } else if (pathname === "/api") {
//     fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (error, data) => {
//       res.writeHead(200, { "Content-type": "application/json" });
//       res.end(data);
//     });
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "My own Header",
//     });
//     res.end(`<h1>Page not Found !! </h1>`);
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to request on port 8000");
// });

/* -----------------------------------------------------------*/

//Creating a simple API (Synchronous File Read -Efficient))

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const server = http.createServer((req, res) => {
  const pathname = req.url;

  if (pathname === "/" || pathname === "/overview") {
    res.end("This is Over View Page");
  } else if (pathname === "/product") {
    res.end("This is our Product Page");
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "My own Header",
    });
    res.end(`<h1>Page not Found !! </h1>`);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
