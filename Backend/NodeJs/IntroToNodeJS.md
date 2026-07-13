চলো শুরু করি। এটা Node.js শেখার জন্য খুব গুরুত্বপূর্ণ Documentation অংশ।

# 1. Introduction to Node.js

## Line 1

> Node.js is an open-source and cross-platform JavaScript runtime environment.

## এটি কী বলছে

**Node.js** হলো একটি **JavaScript runtime environment**।

মানে, Node.js এমন একটি environment যেখানে আমরা Browser ছাড়াই JavaScript চালাতে পারি।

আগে JavaScript মূলত Browser-এ চলত। যেমন Chrome, Firefox, Safari। কিন্তু Node.js আসার পর JavaScript দিয়ে server-side program লেখা সম্ভব হলো।

## Technical Terms

**Open-source**
এর source code public. যে কেউ দেখতে, ব্যবহার করতে, modify করতে পারে।

**Cross-platform**
Windows, Linux, macOS—সব জায়গায় চলে।

**JavaScript runtime environment**
এটি এমন environment যা JavaScript code execute করার জন্য প্রয়োজনীয় জিনিস দেয়।

Runtime-এর ভিতরে থাকে:

```text
JavaScript Code
      ↓
V8 Engine
      ↓
Node.js APIs
      ↓
libuv
      ↓
Operating System
```

## কেন এটি দরকার

Browser-এর JavaScript দিয়ে তুমি directly file system, server, network socket, database এসব handle করতে পারো না।

Node.js এসব করার ক্ষমতা দেয়।

## Real-world Use Case

Node.js দিয়ে বানানো যায়:

- Backend API
- Web server
- Chat application
- File upload system
- Payment backend
- Real-time notification system
- CLI tool

## ছোট Example

```js
console.log("Hello from Node.js");
```

এটা Browser ছাড়াই terminal-এ চালানো যায়:

```bash
node app.js
```

## Analogy

Browser হলো একটি ঘর যেখানে JavaScript আগে বন্দি ছিল।
Node.js হলো দরজা খুলে JavaScript-কে বাইরে server world-এ নিয়ে আসা।

---

# 2. Line 2

> It is a popular tool for almost any kind of project!

## এটি কী বলছে

Node.js অনেক ধরনের project-এ ব্যবহার করা যায়।

## কেন

কারণ Node.js fast, lightweight, asynchronous এবং JavaScript-based।

## Real-world Use Case

Netflix, Uber, PayPal, LinkedIn-এর মতো বড় system-এ Node.js ব্যবহার হয়েছে বা হয়।

## মনে রাখার Trick

Node.js শুধু web server না।
Node.js হলো JavaScript দিয়ে system-level এবং backend কাজ করার platform।

---

# 3. V8 Engine

> Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser.

## এটি কী বলছে

Node.js Chrome-এর **V8 JavaScript engine** ব্যবহার করে।

V8 হলো সেই engine যা JavaScript code-কে machine code-এ convert করে execute করে।

## কেন দরকার

Computer সরাসরি JavaScript বোঝে না।

তাই দরকার:

```text
JavaScript Code
      ↓
V8 Engine
      ↓
Machine Code
      ↓
CPU executes
```

## Browser vs Node.js

Browser-এ:

```text
JavaScript + V8 + Browser APIs
```

Node.js-এ:

```text
JavaScript + V8 + Node.js APIs
```

Browser API example:

```js
document.querySelector("h1");
```

Node.js-এ এটা কাজ করবে না, কারণ Node.js-এর `document` নেই।

Node.js API example:

```js
const fs = require("node:fs");
```

Browser-এ এটা কাজ করবে না, কারণ Browser সরাসরি file system access দেয় না।

## Real-world Use Case

V8 Node.js-কে fast করে, কারণ এটি JavaScript interpret না করে optimized machine code-এ convert করে।

## Analogy

JavaScript হলো বাংলা ভাষায় লেখা নির্দেশ।
CPU শুধু machine language বোঝে।
V8 হলো translator।

---

# 4. Performance

> This allows Node.js to be very performant.

## এটি কী বলছে

V8 Engine ব্যবহার করার কারণে Node.js অনেক fast হতে পারে।

## কেন

V8-এর আছে:

- Just-in-Time Compilation
- Optimization
- Garbage Collection
- Efficient memory management

## Real-world Use Case

High traffic API server:

```text
Client → Node.js Server → Database → Response
```

Node.js দ্রুত request handle করতে পারে, বিশেষ করে I/O-heavy কাজের ক্ষেত্রে।

## গুরুত্বপূর্ণ

Node.js সব কাজে fast না।

Node.js ভালো:

- API
- I/O
- Network
- File
- Real-time app

Node.js দুর্বল:

- Heavy CPU calculation
- Video processing
- Large image processing
- Machine learning training

---

# 5. Single Process

> A Node.js app runs in a single process, without creating a new thread for every request.

## এটি কী বলছে

Node.js সাধারণত একটি **single process**-এ চলে এবং প্রতিটি request-এর জন্য নতুন **thread** তৈরি করে না।

## Prerequisite: Process এবং Thread

**Process**
একটি running program।

**Thread**
Process-এর ভিতরের execution unit।

Analogy:

```text
Process = Restaurant
Thread = Waiter
Request = Customer
```

অনেক traditional server প্রতিটি request-এর জন্য নতুন thread তৈরি করে।

```text
Request 1 → Thread 1
Request 2 → Thread 2
Request 3 → Thread 3
```

Node.js সাধারণত এমন করে না।

Node.js করে:

```text
Request 1 \
Request 2  → Event Loop → Async I/O
Request 3 /
```

## কেন দরকার

Thread বেশি হলে সমস্যা:

- Memory বেশি লাগে
- Context switching লাগে
- Race condition হতে পারে
- Deadlock হতে পারে
- Debug কঠিন হয়

Node.js এই complexity কমায়।

## Real-world Use Case

একটি chat server হাজার হাজার user connection handle করতে পারে, প্রতিটির জন্য আলাদা thread না বানিয়েও।

## Common Confusion

Node.js কি পুরোপুরি single-threaded?

না।

JavaScript execution সাধারণত single thread-এ হয়। কিন্তু Node.js internally **libuv thread pool** ব্যবহার করতে পারে কিছু কাজের জন্য, যেমন file system, crypto, DNS ইত্যাদি।

---

# 6. Asynchronous I/O

> Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking.

## এটি কী বলছে

Node.js-এর standard library-তে এমন API আছে যা **asynchronous I/O** করে। ফলে JavaScript code আটকে থাকে না।

## Technical Terms

**I/O** = Input/Output
যেমন:

- File read
- Database query
- Network request
- API call
- Disk operation

**Asynchronous**
কাজ শুরু করে দিয়ে result আসা পর্যন্ত অপেক্ষা না করে অন্য কাজ চালিয়ে যাওয়া।

**Blocking**
একটি কাজ শেষ না হওয়া পর্যন্ত পরের কাজ শুরু না হওয়া।

## Blocking Example

```js
const fs = require("node:fs");

const data = fs.readFileSync("file.txt", "utf-8");
console.log(data);
console.log("Done");
```

Execution:

```text
readFileSync starts
      ↓
Thread waits
      ↓
File read complete
      ↓
console.log(data)
      ↓
console.log("Done")
```

## Non-blocking Example

```js
const fs = require("node:fs");

fs.readFile("file.txt", "utf-8", (err, data) => {
  console.log(data);
});

console.log("Done");
```

Execution:

```text
fs.readFile starts
      ↓
Node delegates work
      ↓
console.log("Done")
      ↓
File read complete
      ↓
Callback runs
```

Output হতে পারে:

```text
Done
file content
```

## কেন দরকার

Server-এ যদি একটি request database থেকে data আনতে ২ সেকেন্ড নেয়, তাহলে server ওই ২ সেকেন্ড বসে থাকলে বাকিরা আটকে যাবে।

Node.js সেটা করে না।

---

# 7. Non-blocking Paradigm

> In addition, libraries in Node.js are generally written using non-blocking paradigms.

## এটি কী বলছে

Node.js ecosystem-এর বেশিরভাগ library non-blocking style follow করে।

যেমন:

```js
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
```

এখানে `await` দেখলে মনে হতে পারে block করছে। কিন্তু এটি JavaScript thread block করে না। Function pause হয়, Event Loop অন্য কাজ চালাতে পারে।

## Real-world Use Case

Database call:

```js
const user = await User.findById(id);
```

এই সময় Node.js অন্য request handle করতে পারে।

## মনে রাখার Trick

`await` মানে পুরো server অপেক্ষা করছে না।
শুধু current async function pause করছে।

---

# 8. Blocking is Exception

> Accordingly, blocking behavior is the exception rather than the norm in Node.js.

## এটি কী বলছে

Node.js-এ সাধারণ নিয়ম হলো non-blocking behavior। Blocking behavior কম ব্যবহার করা উচিত।

## কেন

Blocking code server performance নষ্ট করে।

Bad:

```js
fs.readFileSync("large-file.txt");
```

Good:

```js
fs.readFile("large-file.txt", callback);
```

অথবা:

```js
const data = await fs.promises.readFile("large-file.txt", "utf-8");
```

## Best Practice

Production server code-এ বড় file, database, network কাজের ক্ষেত্রে blocking API এড়ানো উচিত।

---

# 9. I/O Operation

> When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem...

## এটি কী বলছে

Node.js অনেক ধরনের I/O কাজ করে:

- Network request
- Database access
- File system access

## Example

```js
fs.readFile("data.txt", callback);
```

```js
fetch("https://api.example.com");
```

```js
User.find();
```

## Internal Flow

```text
JavaScript Code
      ↓
Node.js API
      ↓
libuv
      ↓
Operating System
      ↓
Result comes back
      ↓
Callback / Promise resolved
```

---

# 10. Instead of Blocking Thread

> instead of blocking the thread and wasting CPU cycles waiting...

## এটি কী বলছে

Node.js thread-কে বসিয়ে রাখে না।

## কেন

I/O কাজের সময় CPU আসলে কাজ করে না, wait করে।

যেমন file read:

```text
CPU: আমি কাজ করতে প্রস্তুত
Disk: একটু অপেক্ষা করো, data আনছি
```

যদি CPU অপেক্ষা করে বসে থাকে, সেটা waste।

Node.js বলে:

```text
Disk, তুমি data আনো।
আমি meanwhile অন্য request handle করি।
```

## Analogy

Restaurant-এ waiter kitchen-এ খাবার বানানো পর্যন্ত দাঁড়িয়ে থাকে না।
সে meanwhile অন্য customer serve করে।

Node.js Event Loop সেই waiter-এর মতো।

---

# 11. Resume Operation

> Node.js will resume the operations when the response comes back.

## এটি কী বলছে

I/O result আসলে Node.js callback চালায় অথবা Promise resolve করে।

## Example

```js
fs.readFile("a.txt", "utf-8", (err, data) => {
  console.log(data);
});

console.log("Other work");
```

Flow:

```text
1. fs.readFile called
2. Work delegated
3. console.log("Other work") runs
4. File result comes back
5. Callback added to queue
6. Event Loop sends callback to Call Stack
7. console.log(data) runs
```

---

# 12. Thousands of Concurrent Connections

> This allows Node.js to handle thousands of concurrent connections with a single server...

## এটি কী বলছে

Node.js এক server দিয়েই অনেক concurrent connection handle করতে পারে।

## Concurrent মানে কী?

একই সময় অনেক কাজ progress-এ থাকা।

Concurrent মানেই parallel না।

```text
Concurrent:
Task A started
Task B started
Task C started
সবগুলো progress-এ

Parallel:
Task A, B, C একই মুহূর্তে আলাদা CPU core-এ চলছে
```

## Node.js Model

```text
Client 1 ┐
Client 2 ├── Event Loop ── Async I/O
Client 3 ┘
```

## Real-world Use Case

- Chat app
- Notification server
- Live dashboard
- Streaming API
- WebSocket server

---

# 13. Without Thread Concurrency Burden

> without introducing the burden of managing thread concurrency, which could be a significant source of bugs.

## এটি কী বলছে

Traditional multi-threaded programming-এ thread manage করা কঠিন। Node.js সেই burden কমায়।

## Thread Concurrency Problems

- Race condition
- Deadlock
- Shared memory bug
- Locking complexity

## Example Race Condition

ধরো bank balance 1000 টাকা।

Thread A withdraw করছে 500
Thread B withdraw করছে 700

দুই thread একসাথে old balance পড়ে ফেললে ভুল result হতে পারে।

## Node.js Advantage

JavaScript execution single-threaded হওয়ায় shared memory-related অনেক bug কম হয়।

তবে Node.js-এও bug হতে পারে, বিশেষ করে async logic ভুল হলে।

---

# 14. Frontend Developers Advantage

> Node.js has a unique advantage because millions of frontend developers that write JavaScript for the browser are now able to write the server-side code...

## এটি কী বলছে

যারা Browser-এর জন্য JavaScript জানে, তারা একই language দিয়ে backend লিখতে পারে।

## কেন দরকার

একই language:

```text
Frontend: JavaScript
Backend: JavaScript
Database logic: JavaScript/JSON style
```

## Real-world Use Case

MERN Stack:

```text
MongoDB
Express.js
React
Node.js
```

## Advantage

- কম context switching
- একই language full-stack
- shared validation logic
- faster development

---

# 15. ECMAScript Standards

> In Node.js the new ECMAScript standards can be used without problems...

## এটি কী বলছে

Node.js-এ নতুন JavaScript feature ব্যবহার করা তুলনামূলক সহজ, কারণ browser user update-এর জন্য wait করতে হয় না।

## ECMAScript কী?

ECMAScript হলো JavaScript language-এর official standard।

JavaScript হলো implementation।
ECMAScript হলো specification।

## Browser Problem

Frontend-এ user-এর browser পুরনো হতে পারে।

তাই নতুন feature সব user-এর browser-এ কাজ নাও করতে পারে।

## Node.js Advantage

Server তোমার control-এ। তুমি Node.js version choose করতে পারো।

```bash
node -v
```

## Example

Modern syntax:

```js
const user = {
  name: "Rahim",
  address: {
    city: "Dhaka",
  },
};

console.log(user.address?.city);
```

`?.` হলো optional chaining।

## Experimental Features

> you can also enable specific experimental features by running Node.js with flags.

কিছু feature stable হওয়ার আগে flag দিয়ে চালানো যায়।

Example:

```bash
node --experimental-something app.js
```

সব experimental feature production-এ ব্যবহার করা উচিত না।

---

# এখন Code Example

Documentation-এর code:

```js
const { createServer } = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

---

# Line-by-line Explanation

## Line 1

```js
const { createServer } = require("node:http");
```

## এটি কী করছে

Node.js-এর built-in **http module** থেকে `createServer` function import করছে।

## `require()` কী?

`require()` হলো CommonJS module system-এর function। এটি অন্য module load করে।

## `node:http` কী?

এটি Node.js-এর built-in HTTP module।

আগে লেখা হতো:

```js
require("http");
```

এখন modern style:

```js
require("node:http");
```

`node:` prefix বোঝায় এটি built-in Node.js module।

## Destructuring

```js
const { createServer } = require("node:http");
```

মানে:

```js
const http = require("node:http");
const createServer = http.createServer;
```

## কেন দরকার

HTTP server বানানোর জন্য `createServer()` দরকার।

---

## Line 2

```js
const hostname = "127.0.0.1";
```

## এটি কী করছে

Server কোন host address-এ listen করবে সেটি define করছে।

## `127.0.0.1` কী?

এটি **localhost** address।

মানে তোমার নিজের computer।

```text
127.0.0.1 = এই machine নিজে
```

## Real-world

Development-এ:

```text
127.0.0.1
localhost
```

Production-এ:

```text
0.0.0.0
public server IP
domain name
```

---

## Line 3

```js
const port = 3000;
```

## এটি কী করছে

Server port number define করছে।

## Port কী?

একই computer-এ অনেক network service চলতে পারে। Port দিয়ে বোঝা যায় কোন application request receive করবে।

Analogy:

```text
IP Address = Building address
Port = Room number
```

Example:

```text
localhost:3000
localhost:5000
localhost:8000
```

সব আলাদা server হতে পারে।

---

## Line 4

```js
const server = createServer((req, res) => {
```

## এটি কী করছে

একটি HTTP server তৈরি করছে।

`createServer()`-এর ভিতরে একটি callback function দেওয়া হয়েছে।

এই callback function প্রতিবার request এলে run হবে।

## `req` কী?

`req` = request object
Client কী পাঠিয়েছে তার information থাকে।

যেমন:

- URL
- Method
- Headers
- Body

## `res` কী?

`res` = response object
Server client-কে কী পাঠাবে তা control করে।

---

## Line 5

```js
res.statusCode = 200;
```

## এটি কী করছে

HTTP response status code set করছে।

`200` মানে request successful।

## Common Status Codes

```text
200 = OK
201 = Created
400 = Bad Request
401 = Unauthorized
403 = Forbidden
404 = Not Found
500 = Server Error
```

## Real-world

API success হলে:

```js
res.statusCode = 200;
```

User not found হলে:

```js
res.statusCode = 404;
```

---

## Line 6

```js
res.setHeader("Content-Type", "text/plain");
```

## এটি কী করছে

Response-এর header set করছে।

## Header কী?

Header হলো metadata। অর্থাৎ response body সম্পর্কে অতিরিক্ত information।

এখানে বলা হচ্ছে response content plain text।

## `Content-Type`

Client-কে বলে response data কী ধরনের।

Examples:

```text
text/plain
application/json
text/html
image/png
```

## Example

JSON পাঠালে:

```js
res.setHeader("Content-Type", "application/json");
```

---

## Line 7

```js
res.end("Hello World");
```

## এটি কী করছে

Response শেষ করছে এবং client-কে `"Hello World"` পাঠাচ্ছে।

## কেন `end()` দরকার

HTTP response শেষ না করলে client অপেক্ষা করতে থাকবে।

Analogy:

Waiter যদি বলে না “এই নিন, order complete”, customer অপেক্ষা করবে।

`res.end()` মানে:

```text
Response complete
আর data নেই
```

---

## Line 8

```js
});
```

`createServer()` callback শেষ।

---

## Line 9

```js
server.listen(port, hostname, () => {
```

## এটি কী করছে

Server-কে বলা হচ্ছে নির্দিষ্ট port এবং hostname-এ listen শুরু করো।

মানে:

```text
127.0.0.1:3000 address-এ request গ্রহণ করো
```

## Callback কখন run হয়?

Server successfully start হলে এই callback run হয়।

---

## Line 10

```js
console.log(`Server running at http://${hostname}:${port}/`);
```

## এটি কী করছে

Terminal-এ message দেখাচ্ছে যে server চলছে।

Output:

```text
Server running at http://127.0.0.1:3000/
```

---

# Execution Flow

এখন সবচেয়ে গুরুত্বপূর্ণ অংশ: কোন line আগে execute হয়?

```text
1. require('node:http') runs
2. createServer function import হয়
3. hostname variable তৈরি হয়
4. port variable তৈরি হয়
5. createServer() call হয়
6. server object তৈরি হয়
7. server.listen() call হয়
8. Server listening শুরু করে
9. listen callback run করে console.log দেখায়
10. Program শেষ হয় না
11. Node.js process alive থাকে
12. Browser থেকে request এলে createServer callback run হয়
```

## Flow Diagram

```text
Start node server.js
        ↓
Load http module
        ↓
Define hostname and port
        ↓
Create server
        ↓
Start listening
        ↓
Event Loop keeps process alive
        ↓
Request comes from browser
        ↓
(req, res) callback executes
        ↓
Set statusCode
        ↓
Set Content-Type
        ↓
Send Hello World
        ↓
Wait for next request
```

---

# Important Internal Point

এই code-এ:

```js
const server = createServer((req, res) => {
  res.end("Hello World");
});
```

এই callback সঙ্গে সঙ্গে run হয় না।

এটা তখনই run হয় যখন request আসে।

## Example

তুমি server start করলে:

```bash
node server.js
```

তখন run হবে:

```js
console.log(`Server running...`);
```

কিন্তু এই অংশ run হবে না:

```js
(req, res) => {
  res.end("Hello World");
};
```

এটা run হবে যখন browser থেকে যাবে:

```text
http://127.0.0.1:3000
```

---

# Memory/Execution Concept

Server start হওয়ার পর Node.js process বন্ধ হয় না, কারণ server একটি active handle ধরে রাখে।

```text
Node.js Process
    ├── V8 Engine
    ├── Event Loop
    ├── HTTP Server Handle
    └── Waiting for incoming requests
```

যতক্ষণ server listen করছে, process alive থাকবে।

---

# CJS vs ESM

Documentation-এ আছে:

```text
CJS
ESM
```

## CJS কী?

CommonJS module system।

```js
const { createServer } = require("node:http");
```

## ESM কী?

ECMAScript Module system।

```js
import { createServer } from "node:http";
```

## Difference

CJS পুরনো Node.js style।
ESM modern JavaScript standard।

আমরা শুরুতে CJS বুঝব, তারপর ESM শিখব।

---

# Same Server with ESM

```js
import { createServer } from "node:http";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Save as:

```text
server.mjs
```

Run:

```bash
node server.mjs
```

---

# Key Points

- Node.js হলো JavaScript runtime environment.
- এটি Browser-এর বাইরে JavaScript চালায়।
- Node.js V8 Engine ব্যবহার করে।
- JavaScript execution সাধারণত single-threaded।
- Node.js asynchronous এবং non-blocking I/O model follow করে।
- প্রতিটি request-এর জন্য নতুন thread তৈরি করে না।
- Event Loop অনেক concurrent request manage করতে সাহায্য করে।
- `http` module দিয়ে raw HTTP server বানানো যায়।
- `req` client request represent করে।
- `res` server response represent করে।
- `res.end()` response complete করে।

---

# Common Mistakes

1. Node.js-কে programming language ভাবা।
   Node.js language না, runtime।

2. `await` মানেই server block হচ্ছে ভাবা।
   না, শুধু current async function pause হয়।

3. Node.js পুরোপুরি single-threaded ভাবা।
   JavaScript execution single-threaded, কিন্তু internally libuv thread pool আছে।

4. `createServer()` callback সঙ্গে সঙ্গে run হয় ভাবা।
   এটি request এলে run হয়।

5. `res.end()` না দিলে response hanging হতে পারে।

---

# Interview Notes

## Q1: What is Node.js?

Node.js is an open-source, cross-platform JavaScript runtime environment that allows JavaScript to run outside the browser using the V8 JavaScript engine.

## Q2: Why is Node.js fast?

Because it uses V8 Engine and follows asynchronous non-blocking I/O, which helps it handle many I/O operations efficiently.

## Q3: Is Node.js single-threaded?

JavaScript execution in Node.js is single-threaded, but Node.js internally uses libuv and thread pool for some asynchronous operations.

## Q4: What is non-blocking I/O?

Non-blocking I/O means Node.js does not wait idly for I/O operations to finish. It delegates the work and continues executing other tasks. When the result is ready, callback or Promise continuation runs.

## Q5: What are `req` and `res`?

`req` contains incoming request data.
`res` is used to send response back to the client.

---

# Best Practices

- Server code-এ blocking API avoid করো।
- `node:` prefix ব্যবহার করা ভালো built-in modules-এর জন্য।
- Response পাঠানোর সময় proper `statusCode` এবং `Content-Type` set করো।
- Development-এ `127.0.0.1` বা `localhost` ব্যবহার করো।
- Production-এ environment variable দিয়ে port manage করো।

Example:

```js
const port = process.env.PORT || 3000;
```

---

# ছোট Quiz

এই code-এ:

```js
const server = createServer((req, res) => {
  console.log("Request received");
  res.end("Hello");
});

server.listen(3000, () => {
  console.log("Server started");
});
```

Server start করার পর terminal-এ আগে কোনটা print হবে?

1. `Request received`
2. `Server started`

আর কেন?
