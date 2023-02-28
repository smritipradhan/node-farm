# node-farm 🥑

Simple Project using Node in which we create a WebServer , include routings and build a simple API and work with HTML Templating.

### 1. Reading and Writing Files.
There are two ways of Reading and Writing files. 
1. Asynchronous File Read
2. Synchronous File Read 

-------------------------------------------------------------------------
### 1. Synchronous File Read and Write

```
const fs = require('fs') ; 
const file = fs.readFileSync('./txt/final.txt','utf-8');
console.log("File:-",file);
```

Import the fs module and the the file using fs.readFileSync which reads the file and blocks the execution as Node is Single Threaded.It takes up two arguement. The path and the encoding.

```
Output:-
File:- The avocado 🥑 is also used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices. APPENDIX: Generally, avocados 🥑 are served raw, but some cultivars can be cooked for a short time without becoming bitter.
```

```
const fs = require('fs') ; 
const file = fs.readFileSync('./txt/final.txt','utf-8');
console.log("File:-",file);

const textOut = `Writing into this file - ${file}`;
fs.writeFileSync("./txt/input.txt",textOut);
console.log(textOut);

```
If there are no matching file in which we want to write then it creates a file with that name and write into it. If the path is matched then the Data is replaced and we write into that file.

### 2. Asynchronous File Read

```
fs.readFile('./txt/read-this.txt','utf-8',(error,data)=>{
    console.log(`Here is your file : - ${data}`,);
    console.log("error:",error);
})

console.log("Reading File Asynchronously.....");
```
The asynchronous file Read function takes three arguements. The file path,encoding and a callback which gets executed after File Reads gets completed and this block of code does not block the execution of the Next line. The next line gets executed followed by the execution of this function when file Read is completed.

```
Output-
Reading File Asynchronously.....
Here is your file : - The avocado 🥑 is also used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices.
error: null
```

### 3. Creating a Web Server

1. Create a Server
2. Listening incoming request from the client

```
const http = require('http');
const server = http.createServer((req,res)=>{
    res.end("Hello from the Server !!");
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening to request on port 8000");
})
```

We create a Server and then listen to it. createServer will accept a callback function which will be fired off each time a new requests hits our server.

```
Output in Terminal - 
Listening to request on port 8000
```

```
Output at PORT : 127.0.0.1:8000
Hello from the Server !!
```

### 4. Routing
```
const server = http.createServer((req,res)=>{
    res.end("Hello from the Server !!");
    console.log(req.url);
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening to request on port 8000");
})
```

Output

```
/
/favicon.ico
```
Here we will create a server with different route paths for overview , products and and Error page. For Error Page we have a fallback in which we return a HTML Code. For /product we return This is our Product Page and for /overview or / we return This is Over View Page .

```
const server = http.createServer((req,res)=>{
    
    const pathname = req.url;

    if(pathname === "/" || pathname === "/overview")
    {
        res.end("This is Over View Page");
    }

    else if(pathname === "/product")
    {
        res.end("This is our Product Page")
    }
    else
    {
        res.writeHead(404,{
            'Content-type':"text/html",
            'my-own-header':"My own Header",
        })
        res.end(`<h1>Page not Found !! </h1>`)
    }

})

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening to request on port 8000");
})

```

```
Output in 127.0.0.1:8000/overview and  127.0.0.1:8000
This is Over View Page

Output in 127.0.0.1:8000/product 
This is our Product Page

Output in 127.0.0.1:8000/fkejfhw
Page not Found !!
```

For the fallback we send the status code as 404 , with a html code of Page not found and custom Headers.