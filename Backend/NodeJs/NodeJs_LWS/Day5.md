# Node.js Core Modules: `path`, `os`, `fs`, `events`, এবং `http`

## Overview

এই নোটটি Node.js tutorial series-এর পঞ্চম ভিডিওর transcript থেকে তৈরি করা হয়েছে। ভিডিওতে মূলত Node.js-এর গুরুত্বপূর্ণ built-in বা core modules নিয়ে আলোচনা করা হয়েছে। আগের ভিডিওতে global object এবং module system নিয়ে আলোচনা ছিল; এই ভিডিওতে সেই foundation ব্যবহার করে দেখা হয়েছে Node.js কীভাবে operating system, file system, event-driven architecture এবং HTTP server-এর মতো server-side কাজগুলো করতে পারে।

Browser JavaScript-এর দুনিয়া মূলত `window`, `document`, DOM event, browser API ইত্যাদির মধ্যে সীমাবদ্ধ। কিন্তু Node.js browser-এ চলে না; এটি কোনো machine বা server-এ runtime হিসেবে চলে। তাই Node.js-এর সামনে browser-এর বদলে থাকে:

- Operating system
- File system
- Network
- Server process
- CPU, memory, platform information
- Incoming HTTP request
- Event loop এবং asynchronous I/O

এই system-level জিনিসগুলোর access দেওয়ার জন্য Node.js core-এ অনেক built-in module দেওয়া আছে। এগুলো ব্যবহার করতে আলাদা করে `npm install` করতে হয় না। যেমন:

- `path`
- `os`
- `fs`
- `events`
- `http`
- `url`
- `querystring`
- `crypto`
- `dns`

ভিডিওতে সব module বিস্তারিত দেখানো হয়নি। সবচেয়ে বেশি ব্যবহৃত এবং conceptually গুরুত্বপূর্ণ কয়েকটি module দেখানো হয়েছে: `path`, `os`, `fs`, `events`, এবং `http`।

> গুরুত্বপূর্ণ ধারণা: npm-এর million external packages থাকলেও, অনেক package internally Node.js-এর core modules-এর ওপর দাঁড়িয়ে কাজ করে। তাই core modules বুঝলে Node.js ecosystem-এর ভিতরের কাজ বোঝা সহজ হয়।

---

## Prerequisites

এই নোট ভালোভাবে বুঝতে নিচের বিষয়গুলো জানা থাকলে সুবিধা হবে:

1. **Basic JavaScript**
   - `const`, `let`
   - function
   - arrow function
   - object
   - template literal
   - callback

2. **Node.js basic**
   - Node.js runtime কী
   - terminal থেকে `.js` file run করা
   - `node index.js`
   - CommonJS module system
   - `require()`
   - `module.exports`

3. **Basic asynchronous JavaScript**
   - synchronous vs asynchronous
   - callback
   - non-blocking I/O
   - event loop-এর basic ধারণা

4. **Basic web concept**
   - HTTP request
   - HTTP response
   - URL path
   - localhost
   - port number

---

## Main Concepts

| Concept | সংক্ষিপ্ত ধারণা | এই ভিডিওতে ভূমিকা |
|---|---|---|
| Core Module | Node.js-এর built-in module | npm install ছাড়াই ব্যবহার করা যায় |
| `require()` | module import করার CommonJS syntax | `path`, `os`, `fs`, `events`, `http` আনার জন্য ব্যবহৃত |
| `path` | file/directory path নিয়ে কাজ করে | basename, dirname, extname, parse |
| `os` | operating system information দেয় | platform, home directory, free memory, CPU info |
| `fs` | file system নিয়ে কাজ করে | file write, append, read |
| Sync API | main thread block করে কাজ শেষ করে | `readFileSync`, `writeFileSync` |
| Async API | non-blocking ভাবে কাজ করে | `readFile`, callback |
| Buffer | binary data representation | `fs.readFileSync()` defaultভাবে Buffer দেয় |
| EventEmitter | event emit এবং listen করার class | custom event তৈরি এবং handle করা |
| Listener | event ঘটলে যে callback run করে | `emitter.on()` |
| Emit | event fire বা raise করা | `emitter.emit()` |
| HTTP Server | network request handle করার server | `http.createServer()` |
| Request/Response | client-server communication-এর দুই দিক | `req`, `res` object |
| Routing | URL অনুযায়ী response দেওয়া | `/`, `/about`, fallback `Not Found` |

---

## Detailed Explanation

# 1. Node.js Core Modules

## ধারণা কী

Core modules হলো Node.js-এর সাথে built-in ভাবে পাওয়া module। এগুলো use করতে `npm install` করতে হয় না। সরাসরি `require()` দিয়ে import করা যায়।

উদাহরণ:

```js
const path = require('path');
const fs = require('fs');
const http = require('http');
```

এখানে `path`, `fs`, `http`—সবই core module।

## কেন দরকার

Browser JavaScript file system, operating system, network server ইত্যাদিতে direct access পায় না। কিন্তু Node.js server-side runtime, তাই তাকে এসব system-level কাজ করতে হয়।

Core modules দরকার হয়:

- file read/write করার জন্য
- server বানানোর জন্য
- path manipulate করার জন্য
- operating system information জানার জন্য
- custom event-driven system বানানোর জন্য
- network communication করার জন্য

## কীভাবে কাজ করে

Node.js core runtime-এর ভিতরে এসব module already available থাকে। তাই যখন লেখা হয়:

```js
const fs = require('fs');
```

Node.js বুঝে যায় এটি npm package নয়, বরং built-in `fs` module। তাই `node_modules` folder থেকে খোঁজার দরকার হয় না।

## বাস্তব জীবনে কোথায় ব্যবহার হয়

| কাজ | Core module |
|---|---|
| upload করা file save করা | `fs` |
| static file serve করা | `fs`, `path`, `http` |
| server health check করা | `os` |
| HTTP server তৈরি করা | `http` |
| real-time বা event-based logic | `events` |
| file path normalize করা | `path` |
| server-side logs write করা | `fs` |
| CPU/memory monitoring | `os` |

## মনে রাখার মতো পয়েন্ট

- Core module install করতে হয় না।
- External package use করলেও internally অনেক সময় core module use হয়।
- Node.js documentation-এ core module ছাড়াও কিছু global object বা API দেখা যায়, যেমন `console`; সব entry core module নয়।
- Beginner হলে official documentation একটু overwhelming লাগতে পারে। তবে documentation পড়ার অভ্যাস গড়তে হবে।

---

# 2. `path` Module

## ধারণা কী

`path` module file path এবং directory path নিয়ে কাজ করার জন্য ব্যবহৃত হয়। কোনো file path থেকে filename, directory name, extension, root ইত্যাদি বের করা যায়।

উদাহরণ path:

```txt
/Users/rahim/projects/node/index.js
```

এখান থেকে পাওয়া যায়:

| অংশ | মান |
|---|---|
| basename | `index.js` |
| dirname | `/Users/rahim/projects/node` |
| extension | `.js` |
| filename without extension | `index` |
| root | `/` |

## কেন দরকার

Real application-এ file নিয়ে কাজ করলে absolute path, relative path, directory name, file extension ইত্যাদি বারবার প্রয়োজন হয়। হাতে string split করে এগুলো বের করা error-prone। `path` module cross-platform ভাবে এসব কাজ সহজ করে।

ব্যবহার হয়:

- file upload path তৈরি করতে
- static file serve করতে
- log file path বানাতে
- template file load করতে
- project directory structure manage করতে
- extension check করতে
- absolute path resolve করতে

## কীভাবে কাজ করে

`path` module path string নিয়ে কাজ করে। এটি actual file read করে না। শুধু path-এর structure analyze করে।

Import:

```js
const path = require('path');
```

### Example

```js
const path = require('path');

const myPath = '/Users/rahim/projects/node/index.js';

console.log(path.basename(myPath));
console.log(path.dirname(myPath));
console.log(path.extname(myPath));
console.log(path.parse(myPath));
```

### Output ধারণা

```txt
index.js
/Users/rahim/projects/node
.js
{
  root: '/',
  dir: '/Users/rahim/projects/node',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
```

## গুরুত্বপূর্ণ methods

| Method | কী করে | উদাহরণ |
|---|---|---|
| `path.basename(filePath)` | path থেকে শেষের file বা folder name দেয় | `index.js` |
| `path.dirname(filePath)` | file যে directory-তে আছে সেই directory path দেয় | `/Users/rahim/projects/node` |
| `path.extname(filePath)` | file extension দেয় | `.js` |
| `path.parse(filePath)` | path ভেঙে object আকারে দেয় | `{ root, dir, base, ext, name }` |

## Code line-by-line ব্যাখ্যা

```js
const path = require('path');
```

- Node.js-এর built-in `path` module import করা হচ্ছে।
- এটি npm install করতে হবে না।

```js
const myPath = '/Users/rahim/projects/node/index.js';
```

- একটি sample file path variable-এ রাখা হয়েছে।
- বাস্তবে VS Code-এ file-এর উপর right click করে “Copy Path” করলে এমন path পাওয়া যায়।

```js
console.log(path.basename(myPath));
```

- path-এর শেষ অংশ অর্থাৎ file name return করবে।

```js
console.log(path.dirname(myPath));
```

- file যে folder-এর ভিতরে আছে, সেই directory path return করবে।

```js
console.log(path.extname(myPath));
```

- file extension return করবে।

```js
console.log(path.parse(myPath));
```

- পুরো path-এর details object হিসেবে return করবে।

## Windows path নিয়ে সতর্কতা

Windows path সাধারণত এমন হয়:

```txt
C:\Users\Rahim\projects\node\index.js
```

JavaScript string-এর ভিতরে `\` escape character হিসেবে কাজ করে। তাই সরাসরি লিখলে সমস্যা হতে পারে।

ভুল বা risky:

```js
const myPath = 'C:\Users\Rahim\projects\node\index.js';
```

ভালো উপায়:

```js
const myPath = 'C:\\Users\\Rahim\\projects\\node\\index.js';
```

অথবা:

```js
const myPath = 'C:/Users/Rahim/projects/node/index.js';
```

> ভিডিওতে সহজভাবে বলা হয়েছে Windows-এর backward slash replace করে forward slash ব্যবহার করতে। Beginner হিসেবে forward slash ব্যবহার করলে অনেক confusion কমে।

## বাস্তব জীবনের ব্যবহার

ধরা যাক user profile image upload করছে। File save করার সময় path বানাতে হতে পারে:

```js
const path = require('path');

const uploadFolder = '/var/www/app/uploads';
const fileName = 'profile.png';

const fullPath = path.join(uploadFolder, fileName);

console.log(fullPath);
```

`path.join()` video-তে বিস্তারিত দেখানো হয়নি, কিন্তু practical project-এ খুব বেশি ব্যবহৃত হয়। এটি path segments নিরাপদভাবে join করে।

## সাধারণ ভুল বা সতর্কতা

- `path` module file read করে না; শুধু path string process করে।
- Windows path-এর backslash escape issue ভুলে যাওয়া।
- hard-coded path ব্যবহার করা।
- `path.basename()` আর `path.dirname()` গুলিয়ে ফেলা।
- extension check করার সময় `.js` এবং `js` পার্থক্য ভুলে যাওয়া।

## মনে রাখার মতো পয়েন্ট

- `path` হলো file path utility module।
- `basename`, `dirname`, `extname`, `parse` beginner-এর জন্য সবচেয়ে useful।
- Cross-platform app বানাতে path manually concatenate না করে `path` module ব্যবহার করা উচিত।

---

# 3. `os` Module

## ধারণা কী

`os` module operating system সম্পর্কিত information দেয়। Node.js যেহেতু server বা machine-এ run করে, তাই server-এর OS, memory, CPU, home directory ইত্যাদি জানা অনেক সময় দরকার হয়।

Import:

```js
const os = require('os');
```

## কেন দরকার

Server-side application-এ কখনো কখনো system resource জানা দরকার হয়। যেমন:

- server কোন platform-এ চলছে
- কত free memory আছে
- CPU core কয়টি
- user-এর home directory কোথায়
- monitoring বা diagnostics information
- system-aware logging

Browser JavaScript এসব information পায় না, কিন্তু Node.js পায়।

## কীভাবে কাজ করে

`os` module current machine বা server-এর operating system থেকে information নেয় এবং JavaScript method-এর মাধ্যমে তা return করে।

### Example

```js
const os = require('os');

console.log(os.platform());
console.log(os.homedir());
console.log(os.freemem());
console.log(os.cpus());
```

## গুরুত্বপূর্ণ methods

| Method | কী return করে | Example output |
|---|---|---|
| `os.platform()` | OS platform | `darwin`, `win32`, `linux` |
| `os.homedir()` | current user-এর home directory | `/Users/rahim` |
| `os.freemem()` | free system memory, bytes হিসেবে | `1234567890` |
| `os.cpus()` | CPU/core information array | model, speed, times |

## Code line-by-line ব্যাখ্যা

```js
const os = require('os');
```

- Node.js-এর built-in `os` module import করা হচ্ছে।

```js
console.log(os.platform());
```

- current OS platform দেখাবে।
- Mac হলে `darwin`, Windows হলে `win32`, Linux হলে `linux` আসতে পারে।

```js
console.log(os.homedir());
```

- current user-এর home directory দেখাবে।

```js
console.log(os.freemem());
```

- কত memory free আছে তা bytes আকারে দেখাবে।

```js
console.log(os.cpus());
```

- CPU cores-এর array দেখাবে।
- প্রতিটি core-এর model, speed এবং time statistics থাকতে পারে।

## বাস্তব জীবনের ব্যবহার

### Server health check example

```js
const os = require('os');

function getServerHealth() {
  return {
    platform: os.platform(),
    freeMemoryInMB: Math.round(os.freemem() / 1024 / 1024),
    totalMemoryInMB: Math.round(os.totalmem() / 1024 / 1024),
    cpuCores: os.cpus().length
  };
}

console.log(getServerHealth());
```

### ব্যাখ্যা

- `os.freemem()` এবং `os.totalmem()` bytes দেয়।
- MB করতে `1024 * 1024` দিয়ে ভাগ করা হয়েছে।
- `os.cpus().length` দিয়ে CPU core count পাওয়া যায়।

## সাধারণ ভুল বা সতর্কতা

- `os.freemem()` bytes return করে—MB/GB নয়।
- `os.platform()` human-friendly OS name নয়; এটি platform identifier দেয়।
- Browser JavaScript-এ `os` module কাজ করবে না।
- OS information নিয়ে application logic খুব বেশি hard-code করা ঠিক নয়।

## মনে রাখার মতো পয়েন্ট

- `os` module server/machine সম্পর্কে information দেয়।
- Monitoring, diagnostics, logging, environment-aware logic-এ useful।
- এটি Node.js-এর server-side nature বোঝার জন্য গুরুত্বপূর্ণ।

---

# 4. `fs` Module: File System

## ধারণা কী

`fs` মানে File System। এটি Node.js-এর সবচেয়ে বেশি ব্যবহৃত core modules-এর একটি। File read, write, append, rename, delete ইত্যাদি কাজ করা যায়।

Import:

```js
const fs = require('fs');
```

## কেন দরকার

Server-side application-এ file system নিয়ে কাজ খুব common:

- text file read/write
- log file তৈরি
- uploaded file save
- configuration file read
- generated report save
- static file serve
- template read
- temporary file manage

## কীভাবে কাজ করে

`fs` module operating system-এর file system API ব্যবহার করে। এখানে দুই ধরনের API pattern দেখা যায়:

1. **Synchronous API**
   - যেমন: `writeFileSync`, `readFileSync`, `appendFileSync`
   - কাজ শেষ না হওয়া পর্যন্ত main thread block করে রাখে।

2. **Asynchronous API**
   - যেমন: `writeFile`, `readFile`, `appendFile`
   - কাজ background/system layer-এ পাঠিয়ে main thread free রাখে।
   - কাজ শেষ হলে callback call হয়।

---

## 4.1 File Write: `fs.writeFileSync()`

### ধারণা

`writeFileSync()` দিয়ে file-এ data লেখা যায়। File না থাকলে নতুন file তৈরি করে। File থাকলে আগের content overwrite করে।

### Example

```js
const fs = require('fs');

fs.writeFileSync('my-file.txt', 'Hello Programmers');
```

### কী হবে

- project folder-এ `my-file.txt` তৈরি হবে।
- file-এর ভিতরে লেখা থাকবে:

```txt
Hello Programmers
```

### Line-by-line ব্যাখ্যা

```js
const fs = require('fs');
```

- `fs` core module import করা হয়েছে।

```js
fs.writeFileSync('my-file.txt', 'Hello Programmers');
```

- `my-file.txt` নামে file তৈরি বা overwrite করবে।
- দ্বিতীয় argument file-এর content।

### Overwrite behavior

```js
const fs = require('fs');

fs.writeFileSync('my-file.txt', 'Hello Programmers');
fs.writeFileSync('my-file.txt', 'How are you?');
```

Final file content হবে:

```txt
How are you?
```

কারণ `writeFileSync()` আগের content replace করে দেয়।

## 4.2 File Append: `fs.appendFileSync()`

### ধারণা

Existing file-এর শেষে নতুন content যোগ করতে `appendFileSync()` ব্যবহার করা হয়। এটি আগের content মুছে ফেলে না।

### Example

```js
const fs = require('fs');

fs.writeFileSync('my-file.txt', 'Hello Programmers');
fs.appendFileSync('my-file.txt', '\nHow are you?');
```

Final file content:

```txt
Hello Programmers
How are you?
```

### Line-by-line ব্যাখ্যা

```js
fs.writeFileSync('my-file.txt', 'Hello Programmers');
```

- প্রথমে file তৈরি করে initial content লেখা হয়েছে।

```js
fs.appendFileSync('my-file.txt', '\nHow are you?');
```

- file-এর শেষে নতুন line সহ content যোগ করা হয়েছে।
- `\n` new line তৈরি করে।

## 4.3 File Read: `fs.readFileSync()`

### ধারণা

`readFileSync()` দিয়ে file-এর content read করা যায়। কিন্তু defaultভাবে এটি string নয়, `Buffer` return করে।

### Example

```js
const fs = require('fs');

const data = fs.readFileSync('my-file.txt');

console.log(data);
console.log(data.toString());
```

### Possible output

```txt
<Buffer 48 65 6c 6c 6f ...>
Hello Programmers
How are you?
```

## Buffer কী

Buffer হলো binary data handle করার জন্য Node.js-এর বিশেষ data structure। File system, network, stream—এসব জায়গায় data অনেক সময় binary format-এ আসে। `fs.readFileSync()` defaultভাবে সেই binary data Buffer হিসেবে return করে।

ভিডিওতে Buffer এবং Stream গভীরভাবে আলোচনা করা হয়নি; শুধু বলা হয়েছে এগুলো খুব গুরুত্বপূর্ণ এবং আলাদা topic। এই নোটে basic idea দেওয়া হলো।

### Buffer থেকে string

```js
console.log(data.toString());
```

- Buffer data readable text-এ convert করে।
- text file read করলে সাধারণত `.toString()` দরকার হয়।

### Alternative: encoding দেওয়া

```js
const data = fs.readFileSync('my-file.txt', 'utf8');

console.log(data);
```

এখানে `utf8` encoding দিলে সরাসরি string পাওয়া যায়। ভিডিওতে `.toString()` method দেখানো হয়েছে; practical code-এ encoding দেওয়াও common।

---

## 4.4 Sync vs Async: সবচেয়ে গুরুত্বপূর্ণ ধারণা

ভিডিওর অন্যতম গুরুত্বপূর্ণ অংশ হলো `Sync` এবং non-sync API-এর পার্থক্য।

### Synchronous

```js
const data = fs.readFileSync('my-file.txt');
console.log(data.toString());
console.log('Hello');
```

এখানে order হবে:

```txt
file content
Hello
```

কারণ `readFileSync()` শেষ না হওয়া পর্যন্ত পরের line execute হবে না।

### Asynchronous

```js
const fs = require('fs');

fs.readFile('my-file.txt', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data.toString());
});

console.log('Hello');
```

Possible output:

```txt
Hello
file content
```

কারণ `fs.readFile()` asynchronous। Node.js file read operation অন্য layer-এ পাঠিয়ে দেয় এবং পরের line execute করে। File read শেষ হলে callback call হয়।

## Error-first callback pattern

Node.js callback pattern সাধারণত এমন:

```js
(err, data) => {
  // ...
}
```

এখানে:

| Parameter | অর্থ |
|---|---|
| `err` | কোনো error হলে এখানে error object থাকবে |
| `data` | কাজ successful হলে result থাকবে |

সাধারণ নিয়ম:

- Error থাকলে `data` নাও থাকতে পারে।
- Error না থাকলে `err` সাধারণত `null` হয়।
- সবসময় আগে error check করতে হয়।

### Example

```js
fs.readFile('my-file.txt', (err, data) => {
  if (err) {
    console.error('File read failed:', err.message);
    return;
  }

  console.log(data.toString());
});
```

## কেন async ব্যবহার করা উচিত

Node.js event-driven, non-blocking runtime। File system, database, network request—এসব I/O operation main thread block করলে server অন্য request handle করতে পারবে না।

তাই production server-side code-এ sync API avoid করা উচিত, বিশেষ করে request handler-এর ভিতরে।

### খারাপ practice

```js
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const data = fs.readFileSync('big-file.txt');
  res.end(data);
}).listen(3000);
```

সমস্যা:

- বড় file read করতে সময় লাগলে পুরো server block হতে পারে।
- অন্য request wait করবে।

### ভালো practice

```js
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.readFile('big-file.txt', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Server error');
      return;
    }

    res.end(data);
  });
}).listen(3000);
```

## বাস্তব জীবনের ব্যবহার

| Use case | `fs` method |
|---|---|
| log write করা | `appendFile` |
| config read করা | `readFile` |
| upload save করা | `writeFile` |
| old file delete করা | `unlink` |
| file rename করা | `rename` |
| folder তৈরি | `mkdir` |
| file existence/stat জানা | `stat` |

## সাধারণ ভুল বা সতর্কতা

- `writeFileSync()` overwrite করে—append নয়।
- `readFileSync()` Buffer return করে—string চাইলে `.toString()` বা encoding ব্যবহার করতে হবে।
- Async callback-এ error ignore করা যাবে না।
- Server request handler-এর ভিতরে sync file operation avoid করতে হবে।
- Relative path current working directory-এর ওপর depend করে; path ভুল হলে file not found হতে পারে।

## মনে রাখার মতো পয়েন্ট

- `fs` module file system access দেয়।
- Sync version সহজ, কিন্তু blocking।
- Async version একটু বেশি code, কিন্তু Node.js-style।
- Error-first callback Node.js ecosystem-এর common pattern।
- I/O operation যতটা সম্ভব asynchronous হওয়া উচিত।

---

# 5. `events` Module এবং EventEmitter

## ধারণা কী

Node.js-কে event-driven runtime বলা হয়। Event মানে “কিছু একটা ঘটেছে”। যেমন:

- user click করেছে
- file read শেষ হয়েছে
- database থেকে data এসেছে
- server-এ new connection এসেছে
- memory threshold cross করেছে
- custom application event ঘটেছে

Node.js-এর `events` module আমাদের custom event create, emit এবং listen করতে দেয়।

Import:

```js
const EventEmitter = require('events');
```

এখানে module-এর নাম `events`, `event` নয়।

## EventEmitter কী

`EventEmitter` একটি class। Class হলো blueprint। Blueprint থেকে actual object বা instance তৈরি করা হয়।

```js
const EventEmitter = require('events');

const emitter = new EventEmitter();
```

এখানে:

- `EventEmitter` হলো class
- `emitter` হলো object/instance
- `emitter.emit()` দিয়ে event raise করা যায়
- `emitter.on()` দিয়ে event listener register করা যায়

## স্কুলের ঘন্টা analogy

ভিডিওতে event বোঝাতে স্কুলের ঘন্টা analogy ব্যবহার করা হয়েছে।

ধরা যাক class period শেষ হলো। তখন কেউ bell বাজায়। Bell বাজানো মানে event raise করা। Students bell শুনে class থেকে বের হয় বা দৌড়ায়। Bell শোনা এবং action নেওয়া মানে listener কাজ করা।

Node.js ভাষায়:

| Real life | Node.js |
|---|---|
| Period শেষ | event ঘটেছে |
| Bell বাজানো | `emit()` |
| Bell শোনা | `on()` listener |
| Students দৌড়ানো | callback function execute |

## Basic Event Example

```js
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('bellRing', () => {
  console.log('We need to run');
});

emitter.emit('bellRing');
```

Output:

```txt
We need to run
```

## Line-by-line ব্যাখ্যা

```js
const EventEmitter = require('events');
```

- `events` module import করা হয়েছে।
- এটি একটি class return করে, তাই variable নাম capital letter দিয়ে লেখা হয়েছে।

```js
const emitter = new EventEmitter();
```

- `EventEmitter` class থেকে একটি real emitter object তৈরি করা হয়েছে।

```js
emitter.on('bellRing', () => {
  console.log('We need to run');
});
```

- `bellRing` event-এর জন্য listener register করা হয়েছে।
- Event ঘটলে callback function run করবে।

```js
emitter.emit('bellRing');
```

- `bellRing` event raise বা fire করা হয়েছে।
- এই event-এর registered listener থাকলে তা execute হবে।

---

## Listener আগে, Emit পরে

এই order খুব গুরুত্বপূর্ণ।

### সঠিক

```js
emitter.on('bellRing', () => {
  console.log('We need to run');
});

emitter.emit('bellRing');
```

এখানে কাজ করবে।

### ভুল

```js
emitter.emit('bellRing');

emitter.on('bellRing', () => {
  console.log('We need to run');
});
```

এখানে listener পরে register হয়েছে। Event আগে fire হয়ে গেছে। তাই listener event ধরতে পারবে না।

> মনে রাখুন: সাধারণ `EventEmitter` past event remember করে না। Listener event fire হওয়ার আগে register থাকতে হয়।

---

## Delayed Event Example

```js
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('bellRing', () => {
  console.log('We need to run');
});

setTimeout(() => {
  emitter.emit('bellRing');
}, 2000);
```

Output দুই সেকেন্ড পরে:

```txt
We need to run
```

এখানে listener আগে register করা আছে, event পরে fire হচ্ছে।

---

## Event-এর সাথে data পাঠানো

Event emit করার সময় listener callback-এ data পাঠানো যায়।

### Single parameter

```js
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('bellRing', (period) => {
  console.log(`We need to run because ${period}`);
});

emitter.emit('bellRing', 'second period ended');
```

Output:

```txt
We need to run because second period ended
```

### Multiple data পাঠানোর best practice

Multiple parameter আলাদা আলাদা পাঠানো যায়, কিন্তু ভালো practice হলো object পাঠানো।

```js
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('bellRing', ({ period, text }) => {
  console.log(`We need to run because ${period} ${text}`);
});

emitter.emit('bellRing', {
  period: 'first period',
  text: 'ended'
});
```

Output:

```txt
We need to run because first period ended
```

## কেন object payload ভালো

| Problem | Object payload-এর benefit |
|---|---|
| parameter order ভুল হতে পারে | property name দিয়ে access করা যায় |
| future-এ নতুন data যোগ করতে হতে পারে | backward-compatible ভাবে field যোগ করা যায় |
| code readability কমে | object self-documenting |
| অনেক argument হলে messy | একটাই payload object থাকে |

---

## Modular EventEmitter Problem

ভিডিওতে খুব গুরুত্বপূর্ণ একটি practical problem দেখানো হয়েছে।

ধরা যাক `school.js` file থেকে event emit করা হচ্ছে, আর `index.js` file-এ listener register করা হচ্ছে। কিন্তু দুই file-এ আলাদা আলাদা `new EventEmitter()` করা হলে event কাজ করবে না।

### Problem version

#### `school.js`

```js
const EventEmitter = require('events');

const emitter = new EventEmitter();

function startPeriod() {
  console.log('Class started');

  emitter.emit('bellRing', {
    period: 'first period',
    text: 'ended'
  });
}

module.exports = startPeriod;
```

#### `index.js`

```js
const EventEmitter = require('events');
const startPeriod = require('./school');

const emitter = new EventEmitter();

emitter.on('bellRing', ({ period, text }) => {
  console.log(`We need to run because ${period} ${text}`);
});

startPeriod();
```

### Output

```txt
Class started
```

`We need to run...` print হবে না।

### কেন কাজ করল না

কারণ:

- `school.js`-এ একটি emitter object আছে।
- `index.js`-এ আরেকটি emitter object আছে।
- Event emit করা হয়েছে `school.js`-এর emitter দিয়ে।
- Listener register করা হয়েছে `index.js`-এর emitter দিয়ে।
- দুইটি object আলাদা, তাই listener event পায়নি।

### মূল শিক্ষা

যে object দিয়ে event emit করবেন, সেই object দিয়েই listener register করতে হবে।

---

## Correct Modular Approach: Class extends EventEmitter

Real project-এ usually custom class বানিয়ে সেটিকে `EventEmitter` extend করানো হয়। এতে সেই class-এর instance নিজেই event emit এবং listen করতে পারে।

#### `school.js`

```js
const EventEmitter = require('events');

class School extends EventEmitter {
  startPeriod() {
    console.log('Class started');

    this.emit('bellRing', {
      period: 'first period',
      text: 'ended'
    });
  }
}

module.exports = School;
```

#### `index.js`

```js
const School = require('./school');

const school = new School();

school.on('bellRing', ({ period, text }) => {
  console.log(`We need to run because ${period} ${text}`);
});

school.startPeriod();
```

### Output

```txt
Class started
We need to run because first period ended
```

## Line-by-line ব্যাখ্যা

### `school.js`

```js
const EventEmitter = require('events');
```

- EventEmitter class import করা হয়েছে।

```js
class School extends EventEmitter {
```

- `School` class তৈরি করা হয়েছে।
- `extends EventEmitter` মানে `School` class EventEmitter-এর methods পাবে।
- তাই `School` instance-এর মধ্যে `.on()` এবং `.emit()` থাকবে।

```js
startPeriod() {
```

- class-এর method।
- এখানে `function` keyword লাগে না।

```js
console.log('Class started');
```

- period start হলে message দেখানো হচ্ছে।

```js
this.emit('bellRing', {
  period: 'first period',
  text: 'ended'
});
```

- `this` মানে current `School` object।
- সেই same object event emit করছে।
- payload হিসেবে object পাঠানো হয়েছে।

```js
module.exports = School;
```

- `School` class export করা হয়েছে।

### `index.js`

```js
const School = require('./school');
```

- `school.js` থেকে `School` class import করা হয়েছে।

```js
const school = new School();
```

- `School` class থেকে actual object বা instance তৈরি করা হয়েছে।

```js
school.on('bellRing', ({ period, text }) => {
  console.log(`We need to run because ${period} ${text}`);
});
```

- same `school` object-এর ওপর listener register করা হয়েছে।

```js
school.startPeriod();
```

- period শুরু করা হয়েছে।
- ভিতরে `this.emit()` call হবে।
- যেহেতু listener একই object-এ registered, callback run করবে।

## বাস্তব জীবনে কোথায় ব্যবহার হয়

| Use case | Event idea |
|---|---|
| User registered | `userRegistered` event |
| Order placed | `orderPlaced` event |
| Payment completed | `paymentCompleted` event |
| File uploaded | `fileUploaded` event |
| Chat message received | `messageReceived` event |
| Server connection | `connection` event |
| Stream data পাওয়া | `data` event |
| Stream শেষ | `end` event |

### Practical example idea

```js
class OrderService extends EventEmitter {
  placeOrder(order) {
    console.log('Order placed');

    this.emit('orderPlaced', order);
  }
}
```

তারপর listener:

```js
orderService.on('orderPlaced', (order) => {
  console.log('Send confirmation email for order:', order.id);
});
```

## Subscriber bell analogy

ভিডিওর শেষে instructor মজারভাবে subscribe bell-এর সাথে event emitter-এর মিল করেছেন। যখন creator নতুন video upload করেন, সেটি একটি event-এর মতো। Subscriber bell on থাকলে notification listener কাজ করে এবং user notification পায়। এই analogy event-driven system মনে রাখতে সাহায্য করে।

## সাধারণ ভুল বা সতর্কতা

- `require('event')` লেখা ভুল; module name `events`।
- Listener register করার আগে event emit করলে listener কাজ করবে না।
- Different emitter instance ব্যবহার করলে event ধরা যাবে না।
- Event payload হিসেবে অনেক parameter পাঠালে code confusing হয়।
- `this.emit()` ব্যবহার করার সময় `this` কোন object নির্দেশ করছে তা বুঝতে হবে।
- Class extend না করে scattered emitter বানালে modular project-এ bug হতে পারে।

## মনে রাখার মতো পয়েন্ট

- Node.js event-driven runtime।
- `EventEmitter` class থেকে emitter object তৈরি হয়।
- `.on(eventName, listener)` listener register করে।
- `.emit(eventName, payload)` event fire করে।
- Same object দিয়ে listen এবং emit করতে হবে।
- Modular code-এ `class extends EventEmitter` খুব useful pattern।

---

# 6. `http` Module

## ধারণা কী

`http` module Node.js দিয়ে HTTP server তৈরি করতে ব্যবহৃত হয়। এটি network communication handle করে। Web server বানানোর সবচেয়ে fundamental core module হলো `http`.

Import:

```js
const http = require('http');
```

## কেন দরকার

Full-stack বা backend development-এ server তৈরি করা জরুরি। Server client/browser থেকে request নেয় এবং response পাঠায়। Node.js-এর `http` module দিয়ে external Apache/Nginx ছাড়াও application code-এর ভিতরেই server তৈরি করা যায়।

## PHP/Apache-এর সাথে তুলনা

PHP background-এ সাধারণত Apache বা XAMPP/WAMP-এর মতো software server আগে থেকেই run করে। Developer `htdocs` বা root folder-এ PHP file রাখে, Apache সেই file serve করে।

Node.js-এ application-এর ভিতরেই server create করা যায়:

```js
const server = http.createServer();
server.listen(3000);
```

অর্থাৎ server process নিজেই Node.js application।

## Basic HTTP Server

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello Programmers');
  res.end();
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

তারপর terminal-এ:

```bash
node http.js
```

Browser-এ যান:

```txt
http://localhost:3000
```

Output:

```txt
Hello Programmers
```

## Line-by-line ব্যাখ্যা

```js
const http = require('http');
```

- Node.js-এর built-in `http` module import করা হলো।

```js
const server = http.createServer((req, res) => {
```

- একটি HTTP server তৈরি করা হলো।
- `createServer()`-এর callback প্রতিটি incoming request-এর জন্য run করে।
- callback দুইটি object পায়:
  - `req` = request object
  - `res` = response object

```js
res.write('Hello Programmers');
```

- response body-তে text লেখা হলো।

```js
res.end();
```

- response শেষ করা হলো।
- `res.end()` না দিলে browser loading অবস্থায় থাকতে পারে।

```js
server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

- server port `3000`-এ listen করছে।
- server start হলে callback message print করবে।

## Port কী

Port হলো machine-এর নির্দিষ্ট network door-এর মতো। একই machine-এ বিভিন্ন service আলাদা port-এ চলতে পারে।

| URL | অর্থ |
|---|---|
| `localhost:3000` | local machine-এর port 3000 |
| `localhost:5000` | local machine-এর port 5000 |
| `localhost:80` | default HTTP port |

Node.js development-এ conventionally `3000` port বেশি ব্যবহার হয়।

## Server কেন terminal আটকে রাখে

যখন `server.listen(3000)` call করা হয়, server continuously incoming request-এর জন্য wait করে। তাই terminal prompt ফিরে আসে না। এটি normal behavior।

Server stop করতে:

```txt
Ctrl + C
```

## Event loop connection

Server listen করলে Node.js event loop alive থাকে। কারণ server-এর কাজ হলো বারবার incoming request/check করা। যতক্ষণ server চলছে, process exit করবে না।

## Server object একটি EventEmitter

ভিডিওতে দেখানো হয়েছে `server` object নিজেই EventEmitter-এর মতো আচরণ করে। এর ওপর `.on()` method ব্যবহার করা যায়।

### Connection event example

```js
const http = require('http');

const server = http.createServer();

server.on('connection', () => {
  console.log('New connection');
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

Browser থেকে `localhost:3000` hit করলে terminal-এ দেখা যাবে:

```txt
New connection
```

### সতর্কতা

Real application-এ সাধারণত low-level `connection` event সরাসরি handle করা হয় না। এটি concept বোঝানোর জন্য useful। Practical request handling-এর জন্য `createServer()` callback ব্যবহার করা হয়।

---

## Request এবং Response

HTTP server-এর মূল কাজ:

1. Client request পাঠায়।
2. Server request receive করে।
3. Server processing করে।
4. Server response পাঠায়।

```js
const server = http.createServer((req, res) => {
  // req = client কী চেয়েছে
  // res = server কী পাঠাবে
});
```

| Object | অর্থ |
|---|---|
| `req` | incoming request information |
| `res` | outgoing response তৈরি করার object |

## Multiple response writes

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello Programmers\n');
  res.write('How are you doing?');
  res.end();
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

Output:

```txt
Hello Programmers
How are you doing?
```

`res.write()` একাধিকবার call করা যায়, কিন্তু শেষে `res.end()` দিতে হবে।

---

## Basic Routing with `req.url`

Routing মানে URL path অনুযায়ী আলাদা response দেওয়া।

যেমন:

| URL | Response |
|---|---|
| `/` | home page |
| `/about` | about page |
| অন্য কিছু | not found |

### Example

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello Programmers');
    res.end();
  } else if (req.url === '/about') {
    res.write('This is about us page');
    res.end();
  } else {
    res.write('Not Found');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

### Test

```txt
http://localhost:3000/
```

Response:

```txt
Hello Programmers
```

```txt
http://localhost:3000/about
```

Response:

```txt
This is about us page
```

```txt
http://localhost:3000/anything
```

Response:

```txt
Not Found
```

## আরও ভালো version: status code এবং header সহ

ভিডিওতে simple `res.write()` এবং `res.end()` দেখানো হয়েছে। Practical code-এ status code এবং content type দেওয়া ভালো।

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Programmers');
  } else if (req.url === '/about') {
    res.statusCode = 200;
    res.end('This is about us page');
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

### কেন ভালো

- Browser জানে response plain text।
- বাংলা বা special character থাকলে encoding issue কমে।
- Not found হলে proper HTTP status code `404` দেওয়া হয়।
- `res.end('text')` দিয়ে write + end একসাথে করা যায়।

## Raw Node.js vs Express.js

ভিডিওতে গুরুত্বপূর্ণ point এসেছে: Raw Node.js দিয়ে enterprise-level application বানানো সম্ভব। Node.js নিজেই powerful। তবে real-life application-এ route, middleware, request parsing, error handling, static file serving—এসব manually লিখতে গেলে অনেক code লিখতে হয়।

এই কারণেই Express.js-এর মতো framework ব্যবহৃত হয়।

| Raw Node.js | Express.js |
|---|---|
| low-level control বেশি | developer experience ভালো |
| performance overhead কম | productivity বেশি |
| routing manually করতে হয় | routing সহজ |
| boilerplate বেশি | code clean |
| learning-এর জন্য গুরুত্বপূর্ণ | real project-এ common |
| core concept বোঝায় | practical app দ্রুত বানায় |

## বাস্তব জীবনে কোথায় ব্যবহার হয়

- Web server
- REST API
- microservice
- webhook receiver
- static file server
- proxy server
- development server
- health check endpoint

## সাধারণ ভুল বা সতর্কতা

- `res.end()` না দেওয়া।
- server start করার পর code change করলে manually restart না করা।
- port already in use হলে server run না হওয়া।
- route manually `if/else` দিয়ে অনেক বড় করে ফেলা।
- status code না দেওয়া।
- request URL-এ query string থাকলে direct comparison fail করতে পারে।
  - যেমন `/about?name=rahim` সরাসরি `/about`-এর সমান নয়।
- production app raw `http` দিয়ে unnecessarily complex করে ফেলা।

## মনে রাখার মতো পয়েন্ট

- `http.createServer()` দিয়ে Node.js server তৈরি হয়।
- `server.listen(port)` server চালু করে।
- `req` client request represent করে।
- `res` server response represent করে।
- `res.write()` response body-তে data লেখে।
- `res.end()` response finish করে।
- Server object EventEmitter-এর মতো কাজ করতে পারে।
- Real-world routing-এর জন্য সাধারণত Express.js ব্যবহার করা হয়।

---

# Code Examples

এই section-এ tutorial-এর মূল code snippets একসাথে সাজানো হলো।

---

## Example 1: `path` module

```js
const path = require('path');

const myPath = '/Users/rahim/projects/node/index.js';

console.log(path.basename(myPath));
console.log(path.dirname(myPath));
console.log(path.extname(myPath));
console.log(path.parse(myPath));
```

### কী শিখবেন

- file path থেকে file name পাওয়া
- directory path পাওয়া
- extension পাওয়া
- path breakdown object পাওয়া

---

## Example 2: `os` module

```js
const os = require('os');

console.log('Platform:', os.platform());
console.log('Home Directory:', os.homedir());
console.log('Free Memory:', os.freemem());
console.log('CPU Info:', os.cpus());
```

### কী শিখবেন

- server/machine information read করা
- memory এবং CPU সম্পর্কে জানা
- Node.js browser-এর বাইরের system access করতে পারে

---

## Example 3: File write, append, read

```js
const fs = require('fs');

fs.writeFileSync('my-file.txt', 'Hello Programmers');
fs.appendFileSync('my-file.txt', '\nHow are you?');

const data = fs.readFileSync('my-file.txt');

console.log(data.toString());
```

### কী শিখবেন

- `writeFileSync()` file create/overwrite করে
- `appendFileSync()` file-এর শেষে content যোগ করে
- `readFileSync()` Buffer return করে
- `.toString()` দিয়ে text পাওয়া যায়

---

## Example 4: Async file read

```js
const fs = require('fs');

fs.readFile('my-file.txt', (err, data) => {
  if (err) {
    console.error('Something went wrong:', err.message);
    return;
  }

  console.log(data.toString());
});

console.log('This line runs first');
```

### Expected output order

```txt
This line runs first
Hello Programmers
How are you?
```

### কী শিখবেন

- asynchronous I/O main thread block করে না
- callback কাজ শেষ হলে run হয়
- Node.js callback pattern: `err` first, `data` second

---

## Example 5: Basic custom event

```js
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('bellRing', () => {
  console.log('We need to run');
});

emitter.emit('bellRing');
```

### কী শিখবেন

- `EventEmitter` class থেকে object তৈরি
- listener register করা
- event emit করা

---

## Example 6: Event payload object

```js
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('bellRing', ({ period, text }) => {
  console.log(`We need to run because ${period} ${text}`);
});

emitter.emit('bellRing', {
  period: 'first period',
  text: 'ended'
});
```

### কী শিখবেন

- event-এর সাথে data পাঠানো
- object destructuring
- clean event payload design

---

## Example 7: Modular EventEmitter with class

### `school.js`

```js
const EventEmitter = require('events');

class School extends EventEmitter {
  startPeriod() {
    console.log('Class started');

    this.emit('bellRing', {
      period: 'first period',
      text: 'ended'
    });
  }
}

module.exports = School;
```

### `index.js`

```js
const School = require('./school');

const school = new School();

school.on('bellRing', ({ period, text }) => {
  console.log(`We need to run because ${period} ${text}`);
});

school.startPeriod();
```

### কী শিখবেন

- class extend করে EventEmitter behavior পাওয়া
- same object দিয়ে `on()` এবং `emit()` করা
- modular Node.js code structure

---

## Example 8: Basic HTTP server

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello Programmers');
  res.end();
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

### Run

```bash
node http.js
```

### Visit

```txt
http://localhost:3000
```

---

## Example 9: HTTP server with routing

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Programmers');
  } else if (req.url === '/about') {
    res.statusCode = 200;
    res.end('This is about us page');
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

### কী শিখবেন

- request URL check করা
- route অনুযায়ী response দেওয়া
- status code set করা
- `res.end()` দিয়ে response শেষ করা

---

# Common Mistakes

## 1. Core module npm install করতে যাওয়া

ভুল:

```bash
npm install fs
```

`fs`, `path`, `os`, `events`, `http` core modules। এগুলো install করতে হয় না।

## 2. `events` module-এর নাম ভুল লেখা

ভুল:

```js
const EventEmitter = require('event');
```

সঠিক:

```js
const EventEmitter = require('events');
```

## 3. `writeFileSync()` append করবে ভাবা

`writeFileSync()` file overwrite করে। Append করতে হলে:

```js
fs.appendFileSync('my-file.txt', 'new text');
```

## 4. Buffer দেখে confused হওয়া

```js
const data = fs.readFileSync('my-file.txt');
console.log(data);
```

এতে Buffer দেখা যেতে পারে। Text পেতে:

```js
console.log(data.toString());
```

অথবা:

```js
const data = fs.readFileSync('my-file.txt', 'utf8');
```

## 5. Async callback-এ error handle না করা

ভুল:

```js
fs.readFile('my-file.txt', (err, data) => {
  console.log(data.toString());
});
```

সঠিক:

```js
fs.readFile('my-file.txt', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data.toString());
});
```

## 6. Server route handler-এ sync I/O ব্যবহার করা

Server request handler-এর ভিতরে `readFileSync()` ব্যবহার করলে server block হতে পারে।

## 7. Listener event emit করার পরে register করা

ভুল:

```js
emitter.emit('bellRing');
emitter.on('bellRing', () => {});
```

সঠিক:

```js
emitter.on('bellRing', () => {});
emitter.emit('bellRing');
```

## 8. Different emitter instance ব্যবহার করা

ভুল:

```js
const emitter1 = new EventEmitter();
const emitter2 = new EventEmitter();

emitter1.on('bellRing', () => {});
emitter2.emit('bellRing');
```

এতে listener call হবে না।

## 9. `res.end()` ভুলে যাওয়া

ভুল:

```js
res.write('Hello');
```

সঠিক:

```js
res.write('Hello');
res.end();
```

অথবা:

```js
res.end('Hello');
```

## 10. Route comparison-এ query string ignore করা

```js
if (req.url === '/about') {
  // ...
}
```

`/about?name=rahim` এলে এটি match করবে না। পরে `url` বা `URL` parsing দরকার হতে পারে।

## 11. Code change করার পর server restart না করা

`node http.js` দিয়ে server run করলে code change করার পর restart করতে হয়। না করলে পুরোনো code চলতে থাকবে।

---

# Best Practices

## 1. Core modules আগে বুঝুন

Express.js শেখার আগে `http`, `events`, `fs` basic বুঝলে framework-এর ভিতরের কাজ পরিষ্কার হয়।

## 2. File I/O async করুন

Server application-এ:

```js
fs.readFile(...)
```

prefer করুন। `readFileSync()` শুধু script, startup config load, quick experiment বা unavoidable case-এ ব্যবহার করুন।

## 3. Error-first callback respect করুন

প্রতিটি Node.js callback-এ আগে error handle করুন।

```js
if (err) {
  // handle error
  return;
}
```

## 4. Event payload object হিসেবে পাঠান

ভালো:

```js
emitter.emit('userRegistered', {
  userId: 10,
  email: 'user@example.com'
});
```

এটি clean এবং maintainable।

## 5. Same emitter instance ব্যবহার করুন

যে object event emit করে, listener-ও সেই object-এ register করুন।

## 6. Modular event-driven class বানান

Complex project-এ:

```js
class Service extends EventEmitter {}
```

pattern ব্যবহার করুন।

## 7. HTTP response properly close করুন

সব branch-এ `res.end()` আছে কিনা নিশ্চিত করুন।

## 8. HTTP status code ব্যবহার করুন

Not found হলে:

```js
res.statusCode = 404;
```

Server error হলে:

```js
res.statusCode = 500;
```

## 9. Content-Type header দিন

```js
res.setHeader('Content-Type', 'text/plain; charset=utf-8');
```

## 10. বড় routing system-এর জন্য framework ব্যবহার করুন

Raw Node.js শেখা জরুরি, কিন্তু বড় real-life app-এ Express.js বা অন্য framework productivity বাড়ায়।

## 11. Documentation explore করুন

ভিডিওতে instructor দেখিয়েছেন documentation থেকে method explore করার process। সব method মুখস্থ করার দরকার নেই; docs দেখে use করতে শেখা বেশি গুরুত্বপূর্ণ।

---

# Quick Revision

## Core Modules

- Node.js core module install করতে হয় না।
- `require('moduleName')` দিয়ে import করা যায়।
- Browser JavaScript-এর বাইরে server-side access দেয়।

## `path`

- file/directory path নিয়ে কাজ করে।
- `basename()` file name দেয়।
- `dirname()` directory path দেয়।
- `extname()` extension দেয়।
- `parse()` path object আকারে ভেঙে দেয়।

## `os`

- operating system information দেয়।
- `platform()` OS platform দেয়।
- `homedir()` home directory দেয়।
- `freemem()` free memory bytes-এ দেয়।
- `cpus()` CPU cores information দেয়।

## `fs`

- file system নিয়ে কাজ করে।
- `writeFileSync()` create/overwrite করে।
- `appendFileSync()` content যোগ করে।
- `readFileSync()` default Buffer দেয়।
- `.toString()` Buffer থেকে text দেয়।
- Async method Node.js-style এবং non-blocking।
- Callback pattern: `(err, data)`।

## Sync vs Async

- Sync API main thread block করে।
- Async API event loop block করে না।
- I/O operation সাধারণত async হওয়া উচিত।

## `events`

- Node.js event-driven।
- `EventEmitter` class থেকে emitter object তৈরি হয়।
- `emitter.on()` listener register করে।
- `emitter.emit()` event fire করে।
- Listener আগে register করতে হয়।
- Same object দিয়ে listen এবং emit করতে হয়।
- Modular pattern: `class School extends EventEmitter`.

## `http`

- HTTP server তৈরি করে।
- `http.createServer()` server object দেয়।
- callback পায় `req` এবং `res`।
- `server.listen(3000)` server চালু করে।
- `res.write()` response body লেখে।
- `res.end()` response শেষ করে।
- `req.url` দিয়ে basic routing করা যায়।
- Real app-এ Express.js productivity বাড়ায়।

---

# Interview / Exam Style Questions

## 1. Node.js core module কী?

Node.js core module হলো built-in module, যা Node.js runtime-এর সাথে আসে এবং আলাদা করে npm install করতে হয় না। যেমন `fs`, `path`, `os`, `events`, `http`.

## 2. `require('fs')` লিখলে Node.js কোথা থেকে module নেয়?

Node.js প্রথমে বুঝে এটি core module কিনা। `fs` core module হওয়ায় Node.js runtime থেকেই module load হয়; `node_modules` থেকে install করা package লাগে না।

## 3. Browser JavaScript এবং Node.js environment-এর মূল পার্থক্য কী?

Browser JavaScript DOM, window, browser API নিয়ে কাজ করে। Node.js server/machine-এ চলে এবং file system, operating system, network ইত্যাদিতে access দিতে পারে।

## 4. `path.basename()` কী করে?

একটি path থেকে শেষের অংশ বা file name return করে।

```js
path.basename('/app/index.js'); // index.js
```

## 5. `path.dirname()` কী করে?

File যে directory-তে আছে সেই directory path return করে।

```js
path.dirname('/app/index.js'); // /app
```

## 6. `path.extname()` কী করে?

File extension return করে।

```js
path.extname('/app/index.js'); // .js
```

## 7. `path.parse()` কী return করে?

Path-এর details object হিসেবে return করে: `root`, `dir`, `base`, `ext`, `name`.

## 8. `os.platform()` কী return করে?

Current operating system platform identifier return করে। যেমন `darwin`, `win32`, `linux`.

## 9. `os.freemem()` কী unit-এ value দেয়?

Bytes হিসেবে free memory return করে।

## 10. `fs.writeFileSync()` এবং `fs.appendFileSync()`-এর পার্থক্য কী?

`writeFileSync()` file create বা overwrite করে। `appendFileSync()` existing file-এর শেষে data যোগ করে।

## 11. `fs.readFileSync()` defaultভাবে কী return করে?

Defaultভাবে `Buffer` return করে। Text পেতে `.toString()` বা encoding ব্যবহার করতে হয়।

## 12. Buffer কী?

Buffer হলো binary data represent করার জন্য Node.js-এর data structure। File, network, stream ইত্যাদি binary data handle করতে Buffer ব্যবহৃত হয়।

## 13. Sync API কেন server application-এ risky?

Sync API main thread block করে। Server request handler-এর ভিতরে sync I/O থাকলে অন্য request wait করতে পারে, ফলে performance কমে।

## 14. Node.js callback pattern-এ error parameter আগে কেন থাকে?

Node.js convention হলো error-first callback: `(err, data)`. কাজ fail করলে `err`-এ error থাকে; successful হলে `data` থাকে। আগে error check করলে safe flow maintain হয়।

## 15. `EventEmitter` কী?

`EventEmitter` হলো Node.js-এর `events` module-এর একটি class, যা দিয়ে custom event emit এবং listen করা যায়।

## 16. `.on()` এবং `.emit()`-এর পার্থক্য কী?

- `.on(eventName, callback)` event listener register করে।
- `.emit(eventName, payload)` event fire বা raise করে।

## 17. Listener আগে register করা কেন জরুরি?

Event emit হওয়ার সময় যদি listener registered না থাকে, তাহলে callback run হবে না। সাধারণ EventEmitter past event store করে রাখে না।

## 18. দুইটি আলাদা EventEmitter instance থাকলে event কেন কাজ নাও করতে পারে?

কারণ listener যদি এক emitter object-এ থাকে এবং event অন্য emitter object দিয়ে emit হয়, তাহলে listener event পাবে না। Same object দিয়ে listen এবং emit করতে হয়।

## 19. `class School extends EventEmitter` করলে কী সুবিধা?

`School` class EventEmitter-এর `.on()` এবং `.emit()` capability পায়। তাই `School` instance নিজেই event-driven object হিসেবে কাজ করতে পারে।

## 20. HTTP server তৈরি করতে কোন method ব্যবহার হয়?

```js
http.createServer()
```

এটি server object তৈরি করে।

## 21. `server.listen(3000)` কী করে?

Server-কে port `3000`-এ incoming request listen করতে বলে।

## 22. `req` এবং `res` কী?

`req` হলো incoming request object। `res` হলো outgoing response object, যার মাধ্যমে client-কে data পাঠানো হয়।

## 23. `res.write()` এবং `res.end()`-এর পার্থক্য কী?

`res.write()` response body-তে data যোগ করে। `res.end()` response শেষ করে client-কে complete signal দেয়।

## 24. `res.end()` না দিলে কী সমস্যা হতে পারে?

Client/browser loading অবস্থায় থাকতে পারে, কারণ response complete হয়নি।

## 25. `req.url` কী কাজে লাগে?

Client কোন URL path request করেছে তা জানার জন্য `req.url` ব্যবহার করা যায়। Basic routing করা যায়।

## 26. Raw Node.js routing বড় app-এ কেন practical নয়?

অনেক route হলে বারবার `if/else` বা manual logic লিখতে হয়। Code complex এবং hard to maintain হয়। Express.js-এর মতো framework routing সহজ করে।

## 27. Node.js server object EventEmitter কেন বলা যায়?

HTTP server object event emit করতে পারে এবং `.on()` দিয়ে event listen করা যায়। যেমন `connection` event listen করা যায়।

## 28. Express.js কেন ব্যবহৃত হয়?

Express.js raw Node.js-এর ওপর built একটি framework, যা routing, middleware, request handling, error handling ইত্যাদি সহজ করে developer productivity বাড়ায়।

## 29. Raw Node.js কি Express.js ছাড়া powerful?

হ্যাঁ। Raw Node.js দিয়ে powerful server এবং enterprise-level application বানানো সম্ভব। তবে বেশি boilerplate লিখতে হয়, তাই real project-এ framework বেশি ব্যবহৃত হয়।

## 30. এই ভিডিওর সবচেয়ে গুরুত্বপূর্ণ concept কোনটি?

বিশেষভাবে গুরুত্বপূর্ণ হলো:

- asynchronous vs synchronous I/O
- EventEmitter
- HTTP server request-response model

---

# Key Takeaways

1. Node.js-এর core modules server-side programming-এর foundation।
2. `path` module path string safely analyze এবং manipulate করতে সাহায্য করে।
3. `os` module current machine/server সম্পর্কে useful system information দেয়।
4. `fs` module file read/write/append/delete/rename-এর জন্য ব্যবহৃত হয়।
5. `fs`-এর sync API সহজ হলেও blocking; production server code-এ async API prefer করা উচিত।
6. `readFileSync()` defaultভাবে Buffer দেয়; text পেতে `.toString()` বা encoding দরকার।
7. Node.js callback convention হলো error-first callback: `(err, data)`.
8. Node.js event-driven runtime; `events` module দিয়ে custom event-driven architecture বানানো যায়।
9. `EventEmitter` থেকে object তৈরি করে `.on()` দিয়ে listener এবং `.emit()` দিয়ে event fire করা হয়।
10. Listener অবশ্যই event emit হওয়ার আগে register করতে হয়।
11. Same emitter instance দিয়ে event listen এবং emit করতে হবে।
12. Modular event system বানাতে `class extends EventEmitter` pattern খুব কার্যকর।
13. `http` module দিয়ে application-এর ভিতরেই HTTP server তৈরি করা যায়।
14. `server.listen(port)` server চালু করে এবং event loop alive রাখে।
15. `req` client request এবং `res` server response represent করে।
16. `res.write()` data পাঠায়; `res.end()` response শেষ করে।
17. `req.url` দিয়ে basic routing করা যায়।
18. Raw Node.js শেখা জরুরি, কারণ Express.js-এর ভিতরের অনেক concept এর ওপর দাঁড়িয়ে।
19. Real-life application-এ Express.js developer experience এবং productivity বাড়ায়।
20. Documentation পড়ার অভ্যাস Node.js developer হিসেবে খুব গুরুত্বপূর্ণ।

---

## Final Study Advice

এই chapter পড়ার পর নিজে terminal-এ প্রতিটি example run করুন। শুধু code দেখে বোঝা আর নিজে run করে output দেখা এক জিনিস নয়। বিশেষ করে নিচের experiments করুন:

1. `path.basename`, `dirname`, `extname`, `parse` আলাদা আলাদা path দিয়ে test করুন।
2. `os.freemem()` output MB-তে convert করুন।
3. `writeFileSync()` দিয়ে file overwrite behavior দেখুন।
4. `appendFileSync()` দিয়ে new line সহ content যোগ করুন।
5. `readFileSync()` Buffer output এবং `.toString()` output compare করুন।
6. `readFile()` async output order observe করুন।
7. Listener আগে/পরে register করে EventEmitter behavior বুঝুন।
8. দুই file-এ আলাদা emitter ব্যবহার করে bug reproduce করুন।
9. `class extends EventEmitter` pattern দিয়ে bug fix করুন।
10. `http.createServer()` দিয়ে `/`, `/about`, `/contact` route তৈরি করুন।
11. `res.end()` remove করে browser behavior observe করুন।
12. Server run করে `Ctrl + C` দিয়ে stop করুন।

এই practice করলে core module, event-driven architecture, asynchronous I/O এবং HTTP server—সব concept অনেক পরিষ্কার হবে।
