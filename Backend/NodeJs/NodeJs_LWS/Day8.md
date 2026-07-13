# Raw Node.js দিয়ে Uptime Monitoring REST API Project: Server, Request Handling ও Routing Setup

## ভূমিকা

এই chapter-এ আমরা raw Node.js ব্যবহার করে একটি বাস্তবধর্মী REST API project তৈরি করা শুরু করব। Project-টি হবে একটি **uptime monitoring application**। একজন user তার প্রয়োজনীয় URL বা link monitor করার জন্য application-এ যোগ করতে পারবে। নির্দিষ্ট সময় পরপর application link-টি check করবে। Link-এর status যদি `up` থেকে `down` অথবা `down` থেকে `up` হয়, তাহলে user-কে SMS notification পাঠানো হবে।

এই project-এ আমরা কোনো external framework, যেমন `Express.js`, ব্যবহার করব না। একইভাবে application logic তৈরির জন্য কোনো third-party npm module ব্যবহার করা হবে না। Node.js-এর core module এবং ইতোমধ্যে শেখা basic JavaScript ব্যবহার করেই পুরো project-এর foundation তৈরি করা হবে।

শুধু linting এবং code formatting-এর জন্য development package ব্যবহার করা যেতে পারে। কিন্তু application-এর server, routing, request parsing, response handling এবং data processing raw Node.js দিয়েই করা হবে।

এই chapter-এ project-এর প্রথম অংশ হিসেবে আমরা শিখব:

- Project requirement analysis
- Primary `index.js` file তৈরি
- Raw Node.js HTTP server তৈরি
- Port configuration
- `nodemon` ব্যবহার
- `package.json` script তৈরি
- Request URL parse করা
- Path normalize করা
- HTTP method নেওয়া
- Query string নেওয়া
- Request headers নেওয়া
- Request body বা payload stream থেকে decode করা
- বড় code refactor করে helper module তৈরি
- Route map তৈরি
- Route handler তৈরি
- `404 Not Found` handler তৈরি
- Callback-এর মাধ্যমে status code ও payload পাঠানো
- Final JSON response তৈরি

---

# Tutorial Format এবং Practice-এর গুরুত্ব

Instructor project-টি একবারে একটি বিশাল video হিসেবে না দেখিয়ে বড় বড় কয়েকটি part-এ ভাগ করে দেখানোর সিদ্ধান্ত নিয়েছেন। কারণ একটি দীর্ঘ project video record, edit, encode এবং publish করতে অনেক সময় লাগে। Part-by-part করলে learner দ্রুত content পায়, আবার প্রতিটি part যথেষ্ট বড় রাখলে learning flow-ও ভেঙে যায় না।

Beginner learner-এর জন্য প্রতিটি step বিস্তারিতভাবে ব্যাখ্যা করা হবে। যাদের Node.js সম্পর্কে আগে থেকেই ভালো ধারণা আছে, তাদের কাছে কিছু explanation repetitive মনে হতে পারে। কিন্তু এই series-এর উদ্দেশ্য হলো JavaScript জানা একজন beginner-কে Node.js-এর runtime এবং core API ব্যবহার করে project তৈরি শেখানো।

সবচেয়ে গুরুত্বপূর্ণ নির্দেশনা হলো: শুধু video বা chapter দেখে গেলে হবে না। প্রতিটি step নিজে practice করতে হবে।

---

# Development Environment

পুরো project-এ মূলত তিনটি window বা tool ব্যবহার করা হবে।

## ১. Code Editor

Code editor হিসেবে Visual Studio Code ব্যবহার করা হচ্ছে।

Project folder-এর নাম:

```text
raw-node-api-project
```

Editor-এ আগে থেকেই formatting এবং linting setup করা আছে।

## ২. Terminal

Node.js application run করা, npm script execute করা এবং development server চালানোর জন্য terminal ব্যবহার করা হবে।

## ৩. Postman

REST API endpoint test করার জন্য Postman ব্যবহার করা হবে।

Postman দিয়ে:

- Different URL-এ request পাঠানো যায়
- `GET`, `POST`, `PUT`, `DELETE` method test করা যায়
- Query string পাঠানো যায়
- Custom header পাঠানো যায়
- Request body পাঠানো যায়
- Response body এবং status code দেখা যায়

Postman desktop application অথবা browser extension—দুইভাবেই ব্যবহার করা যায়।

---

# Project Specification: Uptime Monitoring Application

Code শুরু করার আগে requirement analysis করা জরুরি। সরাসরি coding শুরু না করে application কী করবে, কী কী feature থাকবে এবং কোন data flow প্রয়োজন—এসব আগে বোঝা উচিত।

## Feature 1: API Server

Application একটি নির্দিষ্ট port-এ listen করবে এবং incoming HTTP request গ্রহণ করবে।

Supported method হবে:

- `GET`
- `POST`
- `PUT`
- `DELETE`

## Feature 2: User Management

API client-এর মাধ্যমে:

- নতুন user create করা যাবে
- existing user edit করা যাবে
- user delete করা যাবে

## Feature 3: Token-based Authentication

User sign in করতে পারবে।

প্রতিটি protected request-এর সময় username এবং password পাঠানোর পরিবর্তে user login করার পরে একটি secure unique token পাবে।

পরবর্তী authenticated request-এ সেই token পাঠাবে।

যেসব operation-এর জন্য login দরকার হবে, সেগুলো token ছাড়া করা যাবে না। কিন্তু signup-এর মতো public operation token ছাড়া করা যাবে।

## Feature 4: Sign Out

User যেকোনো সময় logout করতে পারবে।

Logout করলে তার token invalid হয়ে যাবে।

## Feature 5: Link Check

Logged-in user monitor করার জন্য URL add করতে পারবে।

User define করতে পারবে কোন status code-গুলোকে সে `up` হিসেবে গণ্য করবে।

উদাহরণ:

- কোনো URL-এর জন্য শুধু `200` মানে `up`
- অন্য URL-এর ক্ষেত্রে কিছু non-error status code-ও acceptable হতে পারে

## Feature 6: Check Edit, Delete এবং Limit

User নিজের check edit বা delete করতে পারবে।

প্রতি user সর্বোচ্চ নির্দিষ্ট সংখ্যক check create করতে পারবে। Instructor example হিসেবে সর্বোচ্চ পাঁচটি monitored link-এর কথা বলেছেন।

অর্থাৎ:

```text
Maximum checks per user = 5
```

ষষ্ঠ check create করতে দেওয়া হবে না।

## Feature 7: Background Monitoring

একটি background process নির্দিষ্ট সময় পরপর সব user-এর monitored URL ping করবে।

এই project-এ প্রতি এক minute পরপর check করা হবে।

যদি status change হয়:

```text
up -> down
```

অথবা:

```text
down -> up
```

তাহলে SMS notification পাঠানো হবে।

Status একই থাকলে কোনো notification দেওয়া হবে না।

---

# Database হিসেবে File System

এই project-এ MongoDB, MySQL বা অন্য কোনো third-party database ব্যবহার করা হবে না।

Data JSON format-এ আলাদা file-এ save করা হবে এবং Node.js file system API দিয়ে read করা হবে।

উদাহরণ:

```text
.data/
├── users/
├── tokens/
└── checks/
```

Production application-এ সাধারণত file system-কে এভাবে primary database হিসেবে ব্যবহার করা হয় না। কিন্তু raw Node.js এবং persistence flow শেখার জন্য এটি গুরুত্বপূর্ণ।

এই project-এর উদ্দেশ্য database technology শেখানো নয়। উদ্দেশ্য হলো raw Node.js দিয়ে API architecture তৈরি বোঝানো।

---

# Primary File তৈরি

Node.js application একটি primary JavaScript file দিয়ে start হয়।

উদাহরণ:

```bash
node index.js
```

Project-এর entry file হিসেবে তৈরি করা হলো:

```text
index.js
```

File-এর শুরুতে comment block রাখা যেতে পারে:

```js
/*
 * Title: Uptime Monitoring Application
 * Description: RESTful API to monitor up or downtime of user-defined links
 */
```

এটি বাধ্যতামূলক নয়, কিন্তু file-এর purpose পরিষ্কার রাখার জন্য ভালো practice।

---

# Dependencies Section

HTTP server তৈরি করার জন্য Node.js core `http` module প্রয়োজন।

```js
const http = require('http');
```

`http` একটি core module। তাই আলাদা করে install করতে হয় না।

ভুল:

```bash
npm install http
```

সঠিক:

```js
const http = require('http');
```

---

# Application Scaffolding

Standard structure বজায় রাখার জন্য blank `app` object তৈরি করা হলো:

```js
const app = {};
```

Application-এর function এবং configuration এই object-এর property হিসেবে যোগ করা হবে।

---

# Configuration Object

Application-এর পরিবর্তনযোগ্য value আলাদা configuration section-এ রাখা হবে।

```js
app.config = {
  port: 3000,
};
```

এখন server-এর port hard-code না করে config থেকে ব্যবহার করা যাবে।

```js
app.config.port
```

পরে `3000` থেকে `5000` করতে হলে শুধু config object পরিবর্তন করলেই হবে।

---

# Request এবং Response Handler

HTTP server-এর callback incoming request এবং outgoing response handle করে।

প্রথমে handler function তৈরি করা হলো:

```js
app.handleRequestResponse = function (req, res) {
  res.end('Hello World');
};
```

এখানে:

- `req` হলো request object
- `res` হলো response object

Client request করলে server আপাতত সব request-এর জন্য একই response দেবে:

```text
Hello World
```

---

# Server তৈরি

`http.createServer()` ব্যবহার করে server object তৈরি করা হয়।

```js
app.createServer = function () {
  const server = http.createServer(
    app.handleRequestResponse
  );
};
```

`createServer()`-এ callback হিসেবে request-response handler দেওয়া হয়েছে।

অর্থাৎ request এলেই Node.js call করবে:

```js
app.handleRequestResponse(req, res);
```

---

# Server Listen করা

Server object তৈরি করলেই server network request গ্রহণ করা শুরু করে না। Server-কে একটি port-এ listen করাতে হয়।

```js
app.createServer = function () {
  const server = http.createServer(
    app.handleRequestResponse
  );

  server.listen(
    app.config.port,
    function () {
      console.log(
        `Listening to port ${app.config.port}`
      );
    }
  );
};
```

`listen()` এখানে দুইটি input নিচ্ছে:

1. Port number
2. Server successfully start হলে callback

Expected terminal output:

```text
Listening to port 3000
```

---

# Server Start করা

এতক্ষণ শুধু function define করা হয়েছে। Function define করলেই execute হয় না।

Server start করতে function call করতে হবে:

```js
app.createServer();
```

---

# প্রাথমিক সম্পূর্ণ `index.js`

```js
/*
 * Title: Uptime Monitoring Application
 * Description: RESTful API to monitor up or downtime of user-defined links
 */

// Dependencies
const http = require('http');

// App object - module scaffolding
const app = {};

// Configuration
app.config = {
  port: 3000,
};

// Handle request and response
app.handleRequestResponse = function (req, res) {
  res.end('Hello World');
};

// Create server
app.createServer = function () {
  const server = http.createServer(
    app.handleRequestResponse
  );

  server.listen(
    app.config.port,
    function () {
      console.log(
        `Listening to port ${app.config.port}`
      );
    }
  );
};

// Start server
app.createServer();
```

---

# Application Run করা

Terminal-এ:

```bash
node index.js
```

অথবা:

```bash
node index
```

Expected terminal output:

```text
Listening to port 3000
```

Postman-এ request:

```text
GET http://localhost:3000
```

Expected response:

```text
Hello World
```

কারণ handler-এ লেখা হয়েছে:

```js
res.end('Hello World');
```

---

# Common Debugging: Function Reference Typo

Instructor server run করার সময় editor suggestion দেখে একটি typo ধরেছেন। Server callback-এ handler function-এর সঠিক reference দিতে হবে।

ভুল reference দিলে server request handle করতে পারবে না অথবা runtime error হতে পারে।

সঠিক:

```js
http.createServer(app.handleRequestResponse);
```

এই ধরনের ছোট typo editor linting বা IntelliSense দিয়ে দ্রুত ধরা যায়।

---

# Code Change করলে Response Update না হওয়ার কারণ

ধরা যাক response change করা হলো:

```js
res.end('Hello Programmers');
```

কিন্তু server পুরোনো process-এ চলছে। শুধু file save করলে raw `node index.js` process নিজে থেকে restart হবে না।

তাই নতুন code কার্যকর করতে server manually stop এবং restart করতে হবে।

এই repetitive কাজ developer experience খারাপ করে।

---

# `nodemon` ব্যবহার

`nodemon` file change detect করে Node.js process automatically restart করে।

Global install:

```bash
npm install -g nodemon
```

অথবা Yarn ব্যবহার করলে:

```bash
yarn global add nodemon
```

Application run:

```bash
nodemon index.js
```

অথবা:

```bash
nodemon index
```

এখন file save করলেই `nodemon` server restart করবে।

Expected behavior:

1. Response text change করা হলো
2. File save করা হলো
3. `nodemon` change detect করল
4. Server restart হলো
5. Postman request-এ নতুন response দেখা গেল

---

# `package.json` Script তৈরি

বারবার command লিখতে না চাইলে `package.json`-এর `scripts` section ব্যবহার করা যায়।

```json
{
  "scripts": {
    "start": "nodemon index"
  }
}
```

এখন npm দিয়ে:

```bash
npm start
```

Yarn দিয়ে:

```bash
yarn start
```

এটি internally execute করবে:

```bash
nodemon index
```

## `start` ছাড়া অন্য Script Name

যদি script-এর নাম হয়:

```json
{
  "scripts": {
    "jasim": "nodemon index"
  }
}
```

তাহলে run করতে হবে:

```bash
npm run jasim
```

শুধু:

```bash
npm jasim
```

সাধারণভাবে কাজ করবে না।

`start` একটি special script name, তাই লেখা যায়:

```bash
npm start
```

কিন্তু custom script-এর জন্য:

```bash
npm run <script-name>
```

---

# এখন পর্যন্ত Server Flow

এখন application flow হলো:

```text
app.createServer()
        |
        v
http.createServer(handler)
        |
        v
server.listen(3000)
        |
        v
Incoming request
        |
        v
app.handleRequestResponse(req, res)
```

এখন পর্যন্ত response object ব্যবহার করা হয়েছে, কিন্তু request object থেকে কিছু read করা হয়নি।

পরবর্তী লক্ষ্য হলো request object analyse করা।

---

# সব URL-এ একই Response কেন আসছে?

বর্তমান handler:

```js
app.handleRequestResponse = function (req, res) {
  res.end('Hello World');
};
```

তাই নিচের সব URL-এ একই response আসবে:

```text
http://localhost:3000
http://localhost:3000/about
http://localhost:3000/services
http://localhost:3000/anything
```

সবক্ষেত্রে:

```text
Hello World
```

কারণ route অনুযায়ী কোনো decision এখনো নেওয়া হয়নি।

Real-world application-এ:

- `/about` route-এর জন্য about response
- `/services` route-এর জন্য services response
- unknown route-এর জন্য `404`

দিতে হবে।

এ জন্য request object থেকে path, method, query string, headers এবং payload নিতে হবে।

---

# URL Core Module

Request URL parse করার জন্য Node.js core `url` module নেওয়া হলো:

```js
const url = require('url');
```

Request object-এর URL পাওয়া যায়:

```js
req.url
```

---

# URL Parse করা

```js
const parsedUrl = url.parse(
  req.url,
  true
);
```

`url.parse()`-এর প্রথম argument:

```js
req.url
```

দ্বিতীয় argument:

```js
true
```

এটি query string parse করে object আকারে দিতে বলে।

উদাহরণ request:

```text
/about?a=5&b=6
```

Parsed object-এর মধ্যে থাকতে পারে:

- `pathname`
- `query`
- `search`
- `path`
- অন্যান্য URL-related property

### Technical Note

Modern Node.js application-এ WHATWG `URL` API বেশি recommended হতে পারে। তবে lecture-এর flow অনুযায়ী এখানে legacy `url.parse()` ব্যবহার করা হয়েছে।

---

# Query String কী?

URL-এর `?`-এর পরের অংশ query string।

উদাহরণ:

```text
/about?a=5&b=6
```

এখানে:

```text
a=5
b=6
```

হলো query parameter।

দ্বিতীয় argument `true` দিলে query object হিসেবে parse হবে।

সম্ভাব্য result:

```js
{
  a: '5',
  b: '6'
}
```

---

# Request Path নেওয়া

Parsed URL থেকে path নেওয়া যায়:

```js
const path = parsedUrl.pathname;
```

যদি request হয়:

```text
http://localhost:3000/about
```

তাহলে:

```text
path = "/about"
```

---

# Trailing Slash Problem

User একই route দুইভাবে request করতে পারে:

```text
/about
```

এবং:

```text
/about/
```

দুইটি logically একই route হলেও raw pathname আলাদা string।

```text
"/about"
"/about/"
```

Routing reliable করতে path normalize করতে হবে।

---

# Trimmed Path তৈরি

শুরু এবং শেষে থাকা slash remove করা হলো:

```js
const trimmedPath = path.replace(
  /^\/+|\/+$/g,
  ''
);
```

উদাহরণ:

```text
/about
```

হবে:

```text
about
```

এবং:

```text
/about/
```

হবে:

```text
about
```

Nested route:

```text
/about/index/
```

হবে:

```text
about/index
```

মাঝের slash remove হবে না।

Regular expression-এর উদ্দেশ্য:

- শুরুতে এক বা একাধিক slash remove করা
- শেষে এক বা একাধিক slash remove করা
- মাঝের slash রেখে দেওয়া

Instructor regular expression-এর বিস্তারিত শেখাননি; এখানে শুধু route normalization-এর জন্য pattern ব্যবহার করেছেন।

---

# HTTP Method নেওয়া

Request method পাওয়া যায়:

```js
req.method
```

Uniform comparison-এর জন্য lowercase করা হলো:

```js
const method = req.method.toLowerCase();
```

Possible output:

```text
get
post
put
delete
```

এতে uppercase/lowercase variation নিয়ে routing logic-এ সমস্যা হয় না।

---

# Query String Object নেওয়া

```js
const queryStringObject =
  parsedUrl.query;
```

Request:

```text
/sample?a=5&b=6
```

Expected object:

```js
{
  a: '5',
  b: '6'
}
```

Query না থাকলে blank object পাওয়া যেতে পারে:

```js
{}
```

---

# Request Headers নেওয়া

Request headers পাওয়া যায়:

```js
const headersObject = req.headers;
```

Headers হলো request metadata।

Postman automatically পাঠাতে পারে:

- `host`
- `user-agent`
- `cache-control`
- `postman-token`
- `accept`
- অন্যান্য metadata

Custom header-ও পাঠানো যায়।

উদাহরণ:

```text
Title: Learn with Sumit
```

Node.js-এ headers object-এর property সাধারণত lowercase হয়ে আসে:

```js
{
  title: 'Learn with Sumit'
}
```

User uppercase বা mixed case-এ header name পাঠালেও server-side object-এ lowercase key পাওয়া যেতে পারে।

---

# Request Body বা Payload

`GET` request-এ data query string দিয়ে পাঠানো হয়।

কিন্তু `POST` বা `PUT` request-এ সাধারণত body-তে data পাঠানো হয়।

Body data হতে পারে:

- Form data
- JSON
- Plain text
- অন্য binary বা textual data

Node.js request body direct complete string হিসেবে আসে না। এটি stream আকারে আসে এবং chunk বা `Buffer` হিসেবে receive করতে হয়।

---

# `StringDecoder` Core Module

Buffer decode করতে Node.js-এর `string_decoder` core module ব্যবহার করা হলো।

```js
const {
  StringDecoder,
} = require('string_decoder');
```

পুরো module না নিয়ে destructuring করে শুধু `StringDecoder` class নেওয়া হয়েছে।

Decoder instance:

```js
const decoder = new StringDecoder(
  'utf8'
);
```

এটি buffer chunk-কে UTF-8 string-এ decode করবে।

---

# Body Data Collect করা

প্রথমে blank variable:

```js
let realData = '';
```

`let` ব্যবহার করতে হবে, কারণ variable বারবার update হবে।

Request stream-এর `data` event listen করা হলো:

```js
req.on('data', function (buffer) {
  realData += decoder.write(buffer);
});
```

প্রতিটি chunk আসলে:

1. `buffer` পাওয়া যায়
2. `decoder.write(buffer)` string তৈরি করে
3. `realData`-এর সঙ্গে concatenate হয়

---

# Request Stream End হওয়া

সব chunk শেষ হলে request object `end` event fire করে।

```js
req.on('end', function () {
  realData += decoder.end();
});
```

`decoder.end()` decoder-এর remaining buffered character flush করে।

Complete body শুধু `end` event-এর পর নিশ্চিতভাবে পাওয়া যায়।

---

# Asynchronous Execution Flow

এই code ভুল:

```js
req.on('data', function (buffer) {
  realData += decoder.write(buffer);
});

console.log(realData);
```

কারণ `console.log()` data event complete হওয়ার আগেই execute হতে পারে।

সঠিক:

```js
req.on('end', function () {
  realData += decoder.end();
  console.log(realData);
});
```

একই কারণে final response-ও body complete হওয়ার পরে পাঠানো উচিত।

---

# Common Mistake: `const` দিয়ে Mutable Payload Variable

Instructor প্রথমে body collector variable এমনভাবে নিয়েছিলেন যে পরে `+=` দিয়ে reassign করতে গিয়ে error হয়েছে।

ভুল:

```js
const realData = '';

realData += decoder.write(buffer);
```

এটি invalid, কারণ `const` variable reassign করা যায় না।

সঠিক:

```js
let realData = '';
```

তারপর:

```js
realData += decoder.write(buffer);
```

---

# Postman দিয়ে Payload Test

Postman body section-এ raw data পাঠানো হলো:

```text
This is my requested data or body or payload
```

Server-side `realData` output:

```text
This is my requested data or body or payload
```

অর্থাৎ request body successfully stream থেকে decode হয়েছে।

---

# Request Object থেকে সংগৃহীত Data

এখন আমরা request থেকে পেয়েছি:

```js
const parsedUrl = url.parse(req.url, true);
const path = parsedUrl.pathname;
const trimmedPath = path.replace(/^\/+|\/+$/g, '');
const method = req.method.toLowerCase();
const queryStringObject = parsedUrl.query;
const headersObject = req.headers;
```

এবং stream শেষে:

```js
realData
```

এখন application request routing-এর জন্য প্রস্তুত।

---

# Refactoring-এর প্রয়োজন

সব request handling logic `index.js`-এ থাকলে file খুব বড় হয়ে যাবে।

Application-এর main handler future-এ আরও বড় হবে। তাই logic আলাদা helper file-এ move করা হলো।

Directory:

```text
helpers/
```

File:

```text
helpers/handleReqRes.js
```

---

# `handleReqRes.js` Module Structure

```js
/*
 * Title: Handle Request Response
 * Description: Handle incoming request and outgoing response
 */

// Dependencies
const url = require('url');
const {
  StringDecoder,
} = require('string_decoder');

// Module scaffolding
const handler = {};

// Main request-response handler
handler.handleReqRes = function (req, res) {
  // Request parsing logic
};

// Export
module.exports = handler;
```

`url` এবং `StringDecoder` যেখানে ব্যবহার হচ্ছে, dependency সেখানেই move করা হয়েছে।

---

# `index.js` থেকে Helper Import

```js
const {
  handleReqRes,
} = require('./helpers/handleReqRes');
```

তারপর server creation:

```js
const server = http.createServer(
  handleReqRes
);
```

এখন `index.js` ছোট এবং focused।

---

# Refactored `index.js`

```js
/*
 * Title: Uptime Monitoring Application
 * Description: RESTful API to monitor up or downtime of user-defined links
 */

// Dependencies
const http = require('http');

const {
  handleReqRes,
} = require('./helpers/handleReqRes');

// App object
const app = {};

// Configuration
app.config = {
  port: 3000,
};

// Create server
app.createServer = function () {
  const server = http.createServer(
    handleReqRes
  );

  server.listen(
    app.config.port,
    function () {
      console.log(
        `Listening to port ${app.config.port}`
      );
    }
  );
};

// Start server
app.createServer();
```

এই refactoring separation of concerns তৈরি করেছে:

- `index.js`: server bootstrap
- `handleReqRes.js`: request-response processing

---

# Routing Setup

এখন লক্ষ্য হলো `trimmedPath` দেখে কোন handler call হবে তা নির্ধারণ করা।

সব route একটি আলাদা file-এ রাখা হলো:

```text
routes.js
```

---

# Route Object

```js
/*
 * Title: Routes
 * Description: Application routes
 */

const routes = {};

module.exports = routes;
```

Test route হিসেবে `sample` route যোগ করা হবে।

Route map-এর concept:

```js
{
  sample: sampleHandler,
  about: aboutHandler
}
```

অর্থাৎ:

```text
Route name -> Handler function
```

---

# Handler Directory Structure

সব handler আলাদা directory-তে রাখা হবে।

```text
handlers/
└── routeHandlers/
    ├── sampleHandler.js
    └── notFoundHandler.js
```

---

# Sample Handler

```js
/*
 * Title: Sample Handler
 * Description: Handle sample route
 */

const handler = {};

handler.sampleHandler = function (
  requestProperties,
  callback
) {
  console.log(requestProperties);

  callback(200, {
    message: 'This is a sample URL',
  });
};

module.exports = handler;
```

Handler দুইটি parameter নেয়:

1. `requestProperties`
2. `callback`

Handler নিজের business logic শেষ করে callback call করবে।

Callback-এ পাঠাবে:

- HTTP status code
- Response payload object

---

# Route File-এ Sample Handler Import

```js
const {
  sampleHandler,
} = require(
  './handlers/routeHandlers/sampleHandler'
);
```

Route mapping:

```js
const routes = {
  sample: sampleHandler,
};
```

Export:

```js
module.exports = routes;
```

সম্পূর্ণ:

```js
/*
 * Title: Routes
 * Description: Application routes
 */

const {
  sampleHandler,
} = require(
  './handlers/routeHandlers/sampleHandler'
);

const routes = {
  sample: sampleHandler,
};

module.exports = routes;
```

---

# Not Found Handler

Unknown route-এর জন্য fallback handler প্রয়োজন।

```js
/*
 * Title: Not Found Handler
 * Description: Handle unknown route
 */

const handler = {};

handler.notFoundHandler = function (
  requestProperties,
  callback
) {
  callback(404, {
    message:
      'Your requested URL was not found',
  });
};

module.exports = handler;
```

Status code:

```text
404
```

Payload:

```json
{
  "message": "Your requested URL was not found"
}
```

---

# Routes এবং Not Found Handler Import

`handleReqRes.js`-এ:

```js
const routes = require('../routes');

const {
  notFoundHandler,
} = require(
  '../handlers/routeHandlers/notFoundHandler'
);
```

Path project structure অনুযায়ী adjust করতে হবে।

---

# Chosen Handler নির্বাচন

`trimmedPath` route object-এর property কিনা check করা হবে।

```js
const chosenHandler =
  routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;
```

যদি:

```text
trimmedPath = "sample"
```

এবং route map-এ `sample` থাকে, তাহলে:

```js
chosenHandler = sampleHandler
```

অন্যথায়:

```js
chosenHandler = notFoundHandler
```

---

# Request Properties Object

Handler আলাদা file-এ আছে। তাই request থেকে collect করা data এক object-এর মধ্যে পাঠানো হবে।

```js
const requestProperties = {
  parsedUrl,
  path,
  trimmedPath,
  method,
  queryStringObject,
  headersObject,
  body: realData,
};
```

Instructor প্রথমে body ছাড়া অন্যান্য property gather করেছেন; final flow-এ body-ও রাখা যুক্তিযুক্ত, কারণ handler-এর business logic payload ব্যবহার করবে।

---

# Handler Call করা

Request body complete হওয়ার পরে chosen handler call করা হবে:

```js
chosenHandler(
  requestProperties,
  function (statusCode, payload) {
    // Final response তৈরি হবে
  }
);
```

Handler business logic execute করে callback call করবে।

Sample handler:

```js
callback(200, {
  message: 'This is a sample URL',
});
```

Not found handler:

```js
callback(404, {
  message:
    'Your requested URL was not found',
});
```

---

# Status Code Validate করা

Handler application-এর অন্য file থেকে status code পাঠাচ্ছে। তাই final response layer-এ type validate করা ভালো।

```js
const validStatusCode =
  typeof statusCode === 'number'
    ? statusCode
    : 500;
```

যদি valid number হয়, সেটি ব্যবহার করা হবে।

অন্যথায় default:

```text
500
```

এটি internal server error বোঝায়।

Strict checking-এর জন্য `typeof` result compare করা হয়:

```js
typeof statusCode === 'number'
```

---

# Payload Validate করা

```js
const validPayload =
  typeof payload === 'object'
    ? payload
    : {};
```

Payload object না হলে blank object ব্যবহার করা হবে।

এতে response layer predictable থাকে।

---

# Payload JSON String-এ Convert করা

Raw JavaScript object সরাসরি response body হিসেবে পাঠানোর আগে string-এ convert করতে হবে।

```js
const payloadString =
  JSON.stringify(validPayload);
```

উদাহরণ object:

```js
{
  message: 'This is a sample URL',
}
```

Stringified output:

```json
{"message":"This is a sample URL"}
```

---

# Final Response

Status code set:

```js
res.writeHead(validStatusCode);
```

Response body send:

```js
res.end(payloadString);
```

আরও proper JSON API response-এর জন্য content type header দেওয়া যেতে পারে, কিন্তু Instructor এই অংশে মূলত status code এবং payload flow দেখিয়েছেন।

---

# Complete `handleReqRes.js` Flow

```js
/*
 * Title: Handle Request Response
 * Description: Handle incoming request and outgoing response
 */

// Dependencies
const url = require('url');

const {
  StringDecoder,
} = require('string_decoder');

const routes = require('../routes');

const {
  notFoundHandler,
} = require(
  '../handlers/routeHandlers/notFoundHandler'
);

// Module scaffolding
const handler = {};

// Handle request and response
handler.handleReqRes = function (req, res) {
  // Parse URL
  const parsedUrl = url.parse(
    req.url,
    true
  );

  // Get path
  const path = parsedUrl.pathname;

  // Normalize path
  const trimmedPath = path.replace(
    /^\/+|\/+$/g,
    ''
  );

  // Get method
  const method =
    req.method.toLowerCase();

  // Get query string
  const queryStringObject =
    parsedUrl.query;

  // Get headers
  const headersObject = req.headers;

  // Decode payload
  const decoder = new StringDecoder(
    'utf8'
  );

  let realData = '';

  req.on('data', function (buffer) {
    realData += decoder.write(buffer);
  });

  req.on('end', function () {
    realData += decoder.end();

    // Build request properties
    const requestProperties = {
      parsedUrl,
      path,
      trimmedPath,
      method,
      queryStringObject,
      headersObject,
      body: realData,
    };

    // Choose handler
    const chosenHandler =
      routes[trimmedPath]
        ? routes[trimmedPath]
        : notFoundHandler;

    // Execute handler
    chosenHandler(
      requestProperties,
      function (statusCode, payload) {
        const validStatusCode =
          typeof statusCode === 'number'
            ? statusCode
            : 500;

        const validPayload =
          typeof payload === 'object'
            ? payload
            : {};

        const payloadString =
          JSON.stringify(validPayload);

        // Return final response
        res.writeHead(validStatusCode);
        res.end(payloadString);
      }
    );
  });
};

module.exports = handler;
```

---

# Sample Route Test

Postman request:

```text
GET http://localhost:3000/sample
```

Expected status:

```text
200
```

Expected response:

```json
{
  "message": "This is a sample URL"
}
```

Trailing slash দিলেও:

```text
GET http://localhost:3000/sample/
```

Expected:

```text
200
```

কারণ path normalize হয়ে:

```text
sample
```

হয়েছে।

---

# Unknown Route Test

Request:

```text
GET http://localhost:3000/random
```

Expected status:

```text
404
```

Expected response:

```json
{
  "message": "Your requested URL was not found"
}
```

---

# Routing Flow Step-by-Step

পুরো request flow:

```text
Client request
      |
      v
HTTP server
      |
      v
handleReqRes(req, res)
      |
      v
URL parse
      |
      v
Path normalize
      |
      v
Method / query / headers / body collect
      |
      v
requestProperties object
      |
      v
routes[trimmedPath] check
      |
      +---- found ----> Matching route handler
      |
      +---- missing --> Not found handler
                              |
                              v
                    callback(statusCode, payload)
                              |
                              v
                    Validate response values
                              |
                              v
                    JSON.stringify(payload)
                              |
                              v
                    res.writeHead(statusCode)
                              |
                              v
                    res.end(payloadString)
```

---

# কেন Callback ব্যবহার করা হয়েছে?

Route handler application-এর আলাদা module-এ থাকে। Handler business logic শেষ করে final response-এর প্রয়োজনীয় data callback-এর মাধ্যমে central response layer-এ পাঠায়।

Handler নির্ধারণ করে:

- Success না error
- Status code কত
- Payload কী

Central request-response helper নির্ধারণ করে:

- Status code valid কি না
- Payload valid object কি না
- JSON string conversion
- HTTP response পাঠানো

এতে responsibility আলাদা থাকে।

---

# Common Mistakes এবং Tricky Cases

## ১. Server Create করেই Listen না করা

শুধু:

```js
http.createServer(handler);
```

লিখলে server request গ্রহণ শুরু করবে না।

প্রয়োজন:

```js
server.listen(port);
```

## ২. Function Define করে Call না করা

```js
app.createServer = function () {
  // ...
};
```

শুধু definition।

Start করতে:

```js
app.createServer();
```

## ৩. Code Change-এর পরে Raw Node Process Restart না করা

`node index.js` file change detect করে না।

Development-এ:

```bash
nodemon index
```

## ৪. Custom npm Script-এ `run` বাদ দেওয়া

Custom script:

```json
"dev": "nodemon index"
```

Run:

```bash
npm run dev
```

## ৫. Trailing Slash Normalize না করা

```text
/sample
/sample/
```

দুইটি আলাদা string হতে পারে। Normalize না করলে routing mismatch হতে পারে।

## ৬. Method Lowercase না করা

Comparison inconsistent হতে পারে।

Normalize:

```js
req.method.toLowerCase();
```

## ৭. Body Complete হওয়ার আগে Response পাঠানো

Request body stream asynchronous।

Final processing `end` event-এর মধ্যে করা উচিত।

## ৮. Body Collector-এ `const` ব্যবহার

ভুল:

```js
const data = '';
data += chunk;
```

সঠিক:

```js
let data = '';
```

## ৯. Buffer সরাসরি String ধরে নেওয়া

Request body chunk `Buffer` হতে পারে।

Decode করতে:

```js
decoder.write(buffer);
```

## ১০. Handler-এর Status Code Trust করা

External module ভুল value পাঠাতে পারে।

Validation:

```js
typeof statusCode === 'number'
```

## ১১. Object সরাসরি `res.end()`-এ দেওয়া

Object stringify করতে হবে:

```js
res.end(JSON.stringify(payload));
```

---

# Technical Notes

## `url.parse()`

Lecture-এ Node.js-এর legacy `url.parse()` ব্যবহার করা হয়েছে। Modern code-এ `URL` class ব্যবহার করা যেতে পারে। তবে মূল concept একই:

- URL parse করা
- pathname নেওয়া
- query parameter নেওয়া

## `res.writeHead()`

শুধু status code পাঠানো যায়:

```js
res.writeHead(200);
```

JSON API-এর জন্য পরে header যোগ করা যেতে পারে:

```js
res.setHeader(
  'Content-Type',
  'application/json'
);
```

Instructor-এর এই part-এর মূল focus routing architecture, তাই additional response header এখনো central discussion নয়।

## File System Database

Learning project-এর জন্য file-based persistence useful। Production environment-এ concurrency, locking, indexing, query performance, backup এবং consistency-এর জন্য real database ব্যবহার করা উচিত।

---

# Interview Questions

## Question 1: `http.createServer()` কী return করে?

**Answer:**  
এটি একটি HTTP server object return করে। Server-কে port-এ listen করাতে `server.listen()` call করতে হয়।

## Question 2: `req` এবং `res` কী?

**Answer:**  
`req` incoming request object এবং `res` outgoing response object।

## Question 3: `nodemon` কেন ব্যবহার করা হয়?

**Answer:**  
Source file change হলে Node.js application automatically restart করার জন্য।

## Question 4: npm-এর `start` script এবং custom script-এর command-এর পার্থক্য কী?

**Answer:**  
`start` run করা যায়:

```bash
npm start
```

Custom script run করতে হয়:

```bash
npm run custom-name
```

## Question 5: Query string parse করার জন্য `url.parse(req.url, true)`-এ `true` কেন?

**Answer:**  
Query string-কে parsed object হিসেবে পাওয়ার জন্য।

## Question 6: Trailing slash remove করার কারণ কী?

**Answer:**  
`/sample` এবং `/sample/`-কে একই route হিসেবে normalize করার জন্য।

## Question 7: Request body সরাসরি পাওয়া যায় না কেন?

**Answer:**  
Node.js incoming request একটি readable stream। Body chunk আকারে `Buffer` হিসেবে আসে।

## Question 8: `StringDecoder` কী কাজে লাগে?

**Answer:**  
Buffer chunk safely character string-এ decode করতে।

## Question 9: `data` এবং `end` event-এর পার্থক্য কী?

**Answer:**  
`data` event প্রতিটি incoming chunk-এর জন্য fire হয়। `end` event সব chunk শেষ হলে fire হয়।

## Question 10: Central response callback pattern-এর সুবিধা কী?

**Answer:**  
Route handler business logic এবং HTTP response formatting আলাদা রাখা যায়।

## Question 11: Unknown route কীভাবে handle করা হয়েছে?

**Answer:**  
Route map-এ path না থাকলে fallback `notFoundHandler` call করা হয়েছে।

## Question 12: Payload কেন `JSON.stringify()` করা হয়?

**Answer:**  
HTTP response body string বা byte data হিসেবে পাঠানো হয়; JavaScript object-কে JSON string-এ convert করতে হয়।

---

# Lecture Recap

এই project part-এ প্রথমে uptime monitoring application-এর requirement analysis করা হয়েছে।

Application ভবিষ্যতে:

- User create, edit ও delete করবে
- Token-based authentication করবে
- Login ও logout support করবে
- User-defined link monitor করবে
- Maximum check limit রাখবে
- Background process দিয়ে link ping করবে
- State change হলে SMS alert পাঠাবে

তারপর raw Node.js server foundation তৈরি করা হয়েছে।

শেখা হয়েছে:

- `http` core module import
- Application scaffolding object
- Config object
- `http.createServer()`
- Request-response callback
- `server.listen()`
- `nodemon`
- `package.json` start script

তারপর request object analyse করা হয়েছে:

- `req.url`
- `url.parse()`
- `pathname`
- Trimmed path
- `req.method`
- Query string
- `req.headers`
- Request payload stream
- `StringDecoder`
- `data` event
- `end` event

Code বড় হয়ে যাওয়ায় refactor করে:

- `helpers/handleReqRes.js`
- `routes.js`
- `handlers/routeHandlers/sampleHandler.js`
- `handlers/routeHandlers/notFoundHandler.js`

তৈরি করা হয়েছে।

শেষে route map, chosen handler, callback, status code validation, payload validation এবং JSON response setup করা হয়েছে।

---

# Assignment / Task

Transcript-এর teaching flow অনুসরণ করে নিজে project structure তৈরি করুন।

```text
raw-node-api-project/
├── index.js
├── package.json
├── routes.js
├── helpers/
│   └── handleReqRes.js
└── handlers/
    └── routeHandlers/
        ├── sampleHandler.js
        └── notFoundHandler.js
```

তারপর নিচের test সম্পন্ন করুন:

1. `npm start` বা `yarn start` দিয়ে server run করুন।
2. Postman থেকে `/sample` route request করুন।
3. `200` status এবং sample JSON payload পাচ্ছেন কি না দেখুন।
4. `/sample/` request করে একই response আসে কি না দেখুন।
5. Unknown route request করে `404` response যাচাই করুন।
6. Query string পাঠিয়ে `requestProperties`-এ object দেখুন।
7. Custom header পাঠিয়ে headers object দেখুন।
8. Raw body পাঠিয়ে decoded payload console-এ দেখুন।
9. `GET`, `POST`, `PUT`, `DELETE` method পাঠিয়ে lowercase method output যাচাই করুন।
10. `const realData` ব্যবহার করে error observe করুন, তারপর `let` দিয়ে ঠিক করুন।

নিজে practice করার সময় নতুন business route যোগ করার আগে বর্তমান routing architecture পুরোপুরি বুঝে নিন।

---

# Final Recap

এই chapter-এ raw Node.js দিয়ে একটি REST API-এর মূল foundation তৈরি হয়েছে।

মূল architecture:

```text
index.js
   |
   v
HTTP Server
   |
   v
handleReqRes
   |
   +--> URL, method, query, headers, body parse
   |
   +--> Route নির্বাচন
   |
   +--> Route handler execute
   |
   +--> callback(statusCode, payload)
   |
   +--> JSON response
```

এই foundation-এর ওপর পরবর্তী chapter-গুলোতে user, token, check এবং uptime monitoring-এর business logic তৈরি করা যাবে।

সবচেয়ে গুরুত্বপূর্ণ শিক্ষা হলো: framework ব্যবহার করার আগে raw Node.js request-response flow বুঝলে Express.js বা অন্য framework-এর abstraction অনেক পরিষ্কারভাবে বোঝা যায়।
