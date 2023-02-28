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


### 5. Building a very Simple API
API is a service from which we can request some data. We have data.json . Here, this is data what our API will sent to client when requested.We have a local data.json in dev-data which we need to read , parse and send back to the client.
dirname = variable always translates to the directory in which the script that we are currently executed is located.So in this case its actually the same place because index.js is also in this node farm folder.

```
const server = http.createServer((req, res) => {
  const pathname = req.url;

  if (pathname === "/" || pathname === "/overview") {
    res.end("This is Over View Page");
  } else if (pathname === "/product") {
    res.end("This is our Product Page");
  } else if (pathname === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (error, data) => {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    });
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

```
Here the problem with the code is the file is read each time there is a request to /api so the solution to this problem can be reading the file outside synchronously . This wont be a problem because the code will run only once when the server starts.So, instead of reading the file every time a request is made, we can read the file Synchronously.The secret here is simply to know which code is only executed once and only at the beginning,and which code gets executed over and over again.


```
//Effient way.
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
```

```
OUTPUT:

[
  {
    "id": 0,
    "productName": "Fresh Avocados",
    "image": "🥑",
    "from": "Spain",
    "nutrients": "Vitamin B, Vitamin K",
    "quantity": "4 🥑",
    "price": "6.50",
    "organic": true,
    "description": "A ripe avocado yields to gentle pressure when held in the palm of the hand and squeezed. The fruit is not sweet, but distinctly and subtly flavored, with smooth texture. The avocado is popular in vegetarian cuisine as a substitute for meats in sandwiches and salads because of its high fat content. Generally, avocado is served raw, though some cultivars, including the common 'Hass', can be cooked for a short time without becoming bitter. It is used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices."
  },
  {
    ...
    ...
    ...
    ... 
```

### HTML TEMPLATING

First we need to build these templates. 
1. The Product Overview Page
2. The Product Details Page.
SO, we are going to create template based on the static webpages in templates folder.

We are going to add placeholder in the static webpages and then later replace those placeholder with the actual data from data.json file.

for eg .   <h2 class="product__name">{%PRODUCTNAME%}</h2>

SO we added the placeholders to the static webpages and now its time to replace/ fill those placeholder with the actual content.

### HTML TEMPLATING : FILLING THE TEMPLATES

