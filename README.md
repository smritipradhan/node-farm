# node-farm 🥑

Simple Project using Node in which we create a WebServer , include routings and build a simple API and work with HTML Templating.

<img width="1440" alt="Screenshot 2023-03-01 at 12 56 37 AM" src="https://user-images.githubusercontent.com/47382260/221958219-45c8f98c-9da3-487d-bf00-485e463ae4e0.png">

<img width="1440" alt="Screenshot 2023-03-01 at 12 54 47 AM" src="https://user-images.githubusercontent.com/47382260/221957984-2889ce05-9b2a-4cf0-8423-bedf53c727dd.png">

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
OUTPUT IN PORT :

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

So, we have placeholders in the templates and we will be replacing the them based the json data we have by looping through it and replacing the html code to the overview page . 

```


const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const templateProduct  = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathname = req.url;

  //Overview Page
  if (pathname === "/" || pathname === "/overview") {
    
    res.writeHead(200, { "Content-type": "text/html" });
    const cardHtml = dataObj.map(el => replaceTemplate(templateCard,el)).join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}",cardHtml);
    res.end(output);
} 
  //Product Page
  ...
  //API
  ...
  //Fallback
  ...
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});

```
 We will be filling the Overview Page first.We read the templateOverview using fs.readFileSync and then read the json file we have (data.json in the dev-data folder) and then we loop through the dataObj are parsing it and for each object we fill the template using replaceTemplate function.

```
const replaceTemplate = (template,product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);

    if(!product.organic)
    {
        output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    }
  
    return output;
}
```
We got the cards with data and we join and replace the overview page with all the cards.

### PARSING VARIABLES FROM URLS

```
const url = require("url");

...
...
const { query, pathname } = url.parse(req.url, true);
...
...
//Product Page
  else if (pathname === "/product") {
    const productData = dataObj[query.id];
    const productDetails = replaceTemplate(templateProduct, productData)

    res.end(productDetails);
  }
...

```
When we click on any product we get navigated to href="/product?id={%ID%}" where id is our data.json each data id. We use url which gives us query and pathname .
query --  { id: '0' } 
pathname --- /product 
Now we get the product Data from the array of objects using the query id and use replaceTemplate function to fill the placeholders based on the data object.

-----------------------------------------------------------------------------------
For any doubts - Contact - smritipradhan545@gmail.com 
Credits - Jonas Udemy.
