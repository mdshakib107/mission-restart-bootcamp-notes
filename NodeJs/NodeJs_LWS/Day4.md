
```markdown
# 📘 Node.js Global Object & Module System — Extended Study Notes

## 📋 Table of Contents
1. [Introduction to Node.js Runtime](#1-introduction-to-nodejs-runtime)
2. [Window Object (Browser) vs Global Object (Node.js)](#2-window-object-browser-vs-global-object-nodejs)
3. [Deep Dive into Node.js Global Object & Scope](#3-deep-dive-into-nodejs-global-object--scope)
4. [Node.js Module System (The Core Foundation)](#4-nodejs-module-system-the-core-foundation)
5. [The Module Wrapper Function (Behind the Scenes Mechanism)](#5-the-module-wrapper-function-behind-the-scenes-mechanism)
6. [Types of Modules & Third-Party Module Integration](#6-types-of-modules--third-party-module-integration)
7. [Important Differences (Comparison Table)](#7-important-differences-comparison-table)
8. [Common Mistakes & Mental Models](#8-common-mistakes--mental-models)
9. [Assignment / Practical Tasks (Step-by-Step)](#9-assignment--practical-tasks-step-by-step)
10. [Final Summary & Practice Checklist](#10-final-summary--practice-checklist)

---

## 1. Introduction to Node.js Runtime
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) ঐতিহাসিকভাবে শুধুমাত্র ব্রাউজারের (Client-side) এনভায়রনমেন্টে রান করার জন্য তৈরি হয়েছিল। কিন্তু **Node.js** হলো একটি ওপেন-সোর্স, ক্রস-প্ল্যাটফর্ম JavaScript runtime environment যা JavaScript-কে ব্রাউজারের বাইরে, সরাসরি আপনার লোকাল মেশিন বা সার্ভারে রান করার এক্সিকিউশন পাওয়ার দেয়। 

এটি কোনো প্রোগ্রামিং ল্যাঙ্গুয়েজ নয়, বরং Google Chrome-এর বিখ্যাত **V8 JavaScript Engine** ব্যবহার করে তৈরি একটি রানটাইম প্ল্যাটফর্ম。

---

## 2. Window Object (Browser) vs Global Object (Node.js)
ব্রাউজার এনভায়রনমেন্ট এবং নোড রানটাইমের মধ্যে সবচেয়ে বড় পার্থক্য হলো তাদের **Top-Level Root Object**-এ।

### ব্রাউজারে `window` অবজেক্ট:
যখন আমরা ব্রাউজারে কোনো JavaScript ফাইল চালাই, তখন গ্লোবাল স্কোপের সবকিছু একটি মাদার অবজেক্টের আন্ডারে থাকে, যাকে বলা হয় `window`। ব্রাউজারের UI রেন্ডারিং, DOM Manipulation (`document.querySelector`), ইভেন্ট লিসেনার (`onchange`, `onclick`) সবকিছু এই উইন্ডো অবজেক্টের সাথে যুক্ত থাকে।

### নোড-এ `global` অবজেক্ট:
Node.js যেহেতু সার্ভারে চলে এবং এর কোনো গ্রাফিক্যাল ইউজার ইন্টারফেস (UI) বা উইন্ডো নেই, তাই নোড রানটাইমে `window` বা `document` অবজেক্টের কোনো অস্তিত্ব নেই। আপনি যদি নোড ফাইলে `window` অবজেক্ট অ্যাক্সেস করতে যান, তবে নোড একটি এরর ছুড়ে দেবে: `ReferenceError: window is not defined`।

Node.js-এ এই রুট অবজেক্টের নাম হলো `global`। 

---

## 3. Deep Dive into Node.js Global Object & Scope
Node.js-এর `global` অবজেক্টের ভেতরে এমন কিছু গুরুত্বপূর্ণ প্রপার্টি ও মেথড থাকে, যা কোনো প্রকার ইমপোর্ট বা রিকোয়ার (`require`) করা ছাড়াই পুরো অ্যাপ্লিকেশনের যেকোনো জায়গা থেকে অ্যাক্সেস করা যায়。

### 🛠️ Common Global Features:
* `console.log()` / `console.error()`: টার্মিনালে আউটপুট দেখানোর জন্য।
* `setTimeout()` / `clearTimeout()`: নির্দিষ্ট সময় পর কোড এক্সিকিউট করার জন্য।
* `setInterval()` / `clearInterval()`: লুপের মতো নির্দিষ্ট সময় পর পর কোড ট্রিগার করার জন্য।

### 📁 Special Variables (যা দেখতে গ্লোবাল কিন্তু আসলে লোকাল):
Node.js-এ দুটি বহুল ব্যবহৃত ভ্যারিয়েবল হলো `__dirname` এবং `__filename`। প্রথম দেখায় এদের গ্লোবাল মনে হলেও, এরা মূলত মডিউল-লেভেল ভ্যারিয়েবল (নিচের সেকশনে এর কারণ ব্যাখ্যা করা হয়েছে)।

* `__dirname`: বর্তমান স্ক্রিপ্টটি বা ফাইলটি যে ফোল্ডারে (Directory) অবস্থান করছে, তার সম্পূর্ণ পাথ (Absolute Path) প্রদান করে।
* `__filename`: ফাইলটির নামসহ তার সম্পূর্ণ পাথ প্রদান করে।

#### 💻 Code Example:
```javascript
// index.js ফাইলের ভেতরে কোড
console.log("ডিরেক্টরি পাথ (__dirname): ", __dirname);
console.log("ফাইলের নিজস্ব পাথ (__filename): ", __filename);

// আউটপুট (টার্মিনালে যেমন দেখাবে):
// ডিরেক্টরি পাথ (__dirname):  C:\Users\Sumit\Desktop\node-tutorial
// ফাইলের নিজস্ব পাথ (__filename):  C:\Users\Sumit\Desktop\node-tutorial\index.js

```

---

## 4. Node.js Module System (The Core Foundation)

প্রথাগতভাবে ব্রাউজারে যখন একাধিক JavaScript ফাইল `<script src="file1.js"></script>` এবং `<script src="file2.js"></script>` এভাবে লিঙ্ক করা হতো, তখন একটি ফাইলের গ্লোবাল ভ্যারিয়েবল অন্য ফাইলের ভ্যারিয়েবলকে ওভাররাইট বা কনফ্লিক্ট করতে পারত। কারণ ব্রাউজারে তারা সবাই একই `window` স্কোপ শেয়ার করে।

Node.js এই মারাত্মক আর্কিটেকচারাল সমস্যা দূর করার জন্য **Module System (CommonJS)** প্রবর্তন করে।

### মডিউল কী?

Node.js-এ প্রতিটি একক ফাইল (`.js` ফাইল) হলো একটি স্বতন্ত্র এবং আইসোলেটেড (Isolated) **Module**। একটি ফাইলের ভেতরে তৈরি করা সমস্ত variable, function, বা class সম্পূর্ণভাবে প্রাইভেট থাকে এবং অন্য কোনো ফাইল তা দেখতে বা ব্যবহার করতে পারে না, যতক্ষণ না আপনি সেটিকে ম্যানুয়ালি এক্সপোর্ট করছেন।

### 🔄 এক্সপোর্ট এবং ইমপোর্ট করার প্র্যাক্টিক্যাল মেকানিজম:

#### স্টেপ ১: ডেটা এক্সপোর্ট করা (`people.js`)

কোনো ফাইলের ডেটা বাইরে পাঠানোর জন্য Node.js আমাদের `module.exports` নামক একটি অবজেক্ট দেয়।

```javascript
// people.js
const students = ['Rakib', 'Sultana', 'Jamil'];
const totalCount = students.length;

function greet(user) {
    return `Hello ${user}, welcome to Node.js study room!`;
}

// এক্সপোর্ট করার সবচেয়ে বেস্ট প্র্যাকটিস হলো অবজেক্ট আকারে পাঠানো
module.exports = {
    students: students,
    totalCount: totalCount,
    greet: greet
};

```

#### স্টেপ ২: ডেটা ইমপোর্ট করা (`index.js`)

অন্য ফাইল থেকে এক্সপোর্ট করা ডেটা নিজের ফাইলে টেনে আনার জন্য `require()` ফাংশন ব্যবহার করতে হয়।

```javascript
// index.js

// নিজের তৈরি করা ফাইলের ক্ষেত্রে অবশ্যই আপেক্ষিক পাথ (Relative Path) দিতে হবে।
// ডট-স্ল্যাশ (./) এর মানে হলো বর্তমান ডিরেক্টরি।
const peopleModule = require('./people'); 

console.log(peopleModule.students);    // Output: ['Rakib', 'Sultana', 'Jamil']
console.log(peopleModule.totalCount);  // Output: 3

const message = peopleModule.greet('Sumit');
console.log(message);                  // Output: Hello Sumit, welcome to Node.js study room!

```

---

## 5. The Module Wrapper Function (Behind the Scenes Mechanism)

ইন্টারভিউ এবং ডিপ লার্নিংয়ের জন্য এটি একটি ক্রুশিয়াল টপিক। প্রশ্ন হলো, Node.js কীভাবে প্রতিটা ফাইলের স্কোপ আলাদা রাখে?

যখনই আপনি নোড-এ কোনো ফাইল এক্সিকিউট করেন (যেমন: `node index.js`), নোড ইঞ্জিন ব্যাকএন্ডে আপনার পুরো কোডটিকে সরাসরি রান করে না। রান করার ঠিক আগ মুহূর্তে নোড আপনার কোডটিকে একটি ইনভিজিবিল (অদৃশ্য) ফাংশন দিয়ে মুড়িয়ে দেয়, যাকে **Module Wrapper Function** বলা হয়।

### 🔍 নোড ব্যাকএন্ডে কোডটিকে যেভাবে রূপান্তর করে:

```javascript
(function(exports, require, module, __filename, __dirname) {
    // --------------------------------------------------
    // আপনার লেখা কোডগুলো মূলত এই ব্লকের ভেতরে বসে!
    const students = ['Rakib', 'Sultana'];
    module.exports = students;
    // --------------------------------------------------
});

```

### 💡 এই মেকানিজমের গুরুত্ব ও ফলাফল:

1. **স্কোপ সিকিউরিটি (Scope Isolation):** JavaScript-এর নিয়ম অনুযায়ী, কোনো ফাংশনের ভেতরে ডিক্লেয়ার করা ভ্যারিয়েবল ফাংশনের বাইরে অ্যাক্সেস করা যায় না (Local Scope)। যেহেতু আমাদের কোড একটি ফাংশনের ভেতরে র‍্যাপ করা থাকে, তাই আমাদের তৈরি কোনো ভ্যারিয়েবল কখনো গ্লোবাল স্কোপকে নষ্ট বা পলিউট (Pollute) করে না।
2. **প্যারামিটার সাপ্লাই:** লক্ষ্য করুন, এই অদৃশ্য ফাংশনের প্যারামিটার হিসেবে `exports`, `require`, `module`, `__filename`, এবং `__dirname` পাস করা হচ্ছে। এই কারণেই আমরা কোনো কিছু ইমপোর্ট না করেই প্রতিটা ফাইলে এই ভ্যারিয়েবলগুলো সরাসরি ব্যবহার করতে পারি। এরা আসলে গ্লোবাল ভ্যারিয়েবল নয়, এরা হলো এই মডিউল র‍্যাপার ফাংশনের লোকাল আর্গুমেন্ট!

---

## 6. Types of Modules & Third-Party Module Integration

Node.js-এ মূলত তিন ধরনের মডিউল আর্কিটেকচার দেখা যায়:

1. **Local Modules (লোকাল মডিউল):** আপনার নিজের তৈরি করা `.js` ফাইলসমূহ (যেমন: `./people.js`, `./database/connection.js`)।
2. **Core Modules (কোর মডিউল):** Node.js ইনস্টল করার সাথে সাথে এই মডিউলগুলো বিল্ট-ইন সিস্টেমে চলে আসে। এগুলো ব্যবহারের জন্য এক্সটার্নাল ডাউনলোডের প্রয়োজন হয় না (যেমন: `fs` বা File System, `path`, `http` ইত্যাদি)।
3. **Third-Party Modules (থার্ড-পার্টি মডিউল):** এগুলো ওপেন-সোর্স প্যাকেজ যা বিশ্বজুড়ে অন্য ডেভেলপাররা তৈরি করে **NPM (Node Package Manager)** এ আপলোড করে রেখেছেন। আমাদের প্রয়োজন অনুযায়ী এগুলো প্রজেক্টে ইনস্টল করে নিতে হয় (যেমন: `lodash`, `express`, `mongoose`)。

### 📦 থার্ড-পার্টি মডিউল ব্যবহারের প্র্যাক্টিক্যাল উদাহরণ (`lodash`):

`lodash` হলো একটি জনপ্রিয় ইউটিলিটি লাইব্রেরি যা অ্যারে, অবজেক্ট ইত্যাদি নিয়ে কাজ করা সহজ করে。

**ধাপ ১: টার্মিনালে ইনস্টলেশন**

```bash
npm install lodash

```

**ধাপ ২: কোডে ইমপোর্ট ও ব্যবহার**

```javascript
// index.js
// নোড-এর নিয়ম: থার্ড-পার্টি বা কোর মডিউল ইমপোর্ট করার সময় কোনো পাথ (./) দিতে হয় না, শুধু নাম দিলেই হয়。
const _ = require('lodash'); 

const array = ['JavaScript', 'Python', 'Node.js', 'GoLang'];

// lodash-এর .last() মেথড ব্যবহার করে অ্যারের শেষ উপাদান বের করা
const lastLanguage = _.last(array);

console.log("সর্বশেষ ল্যাঙ্গুয়েজ: ", lastLanguage); // Output: GoLang

```

---

## 7. Important Differences (Comparison Table)

| বৈশিষ্ট্য / ফিচার | Browser Environment | Node.js Runtime |
| --- | --- | --- |
| **Global Object** | `window` | `global` |
| **DOM Manipulation** | করা যায় (`document`, `window`) | করা যায় না (উইন্ডো বা UI নেই) |
| **ফাইল লিঙ্কিং আর্কিটেকচার** | HTML ফাইলের ভেতর `<script>` ট্যাগ দিয়ে | JavaScript ফাইলের ভেতর `require()` ফাংশন দিয়ে |
| **ডিফল্ট স্কোপিং** | গ্লোবাল স্কোপ (সব ফাইল একে অপরের কোড দেখতে পায়) | মডিউল স্কোপ (প্রতিটি ফাইল আইসোলেটেড ও প্রাইভেট) |
| **ফাইল বা ডিরেক্টরি পাথ ট্র্যাকিং** | সরাসরি ব্রাউজারে পাথ ট্র্যাক করার মেকানিজম নেই | `__dirname` এবং `__filename` দিয়ে নিখুঁতভাবে করা যায় |

---

## 8. Common Mistakes & Mental Models

* ❌ **ভুল মেন্টাল মডেল (উইন্ডো খোঁজা):** ব্রাউজার থেকে নোড-এ এসে অনেকেই অভ্যাসবশত `window.setTimeout()` বা `document.getElementById()` লেখার চেষ্টা করেন, যা নোড সার্ভারে ক্র্যাশ করবে। সার্ভার সাইডে এগুলো ইনভ্যালিড।
* ❌ **পাথ ডিটেকশনে ভুল (Local Module):** নিজের তৈরি ফাইল লোড করার সময় যদি আপনি `require('people')` লেখেন, নোড ভাববে এটি কোনো বিল্ট-ইন বা থার্ড-পার্টি মডিউল এবং তা খুঁজে না পেয়ে `MODULE_NOT_FOUND` এরর দেবে।
* **সঠিক নিয়ম:** লোকাল ফাইলের জন্য সবসময় রিলেটিভ পাথ দিতে হবে: `require('./people')`।


* ❌ **Exports অবজেক্ট ওভাররাইট করা:**
```javascript
// ভুল পদ্ধতি:
module.exports.name = "Sumit";
module.exports = { greet }; // এখানে আগের 'name' প্রপার্টিটি ডিলিট বা ওভাররাইট হয়ে যাবে!

```



---

## 9. Assignment / Practical Tasks (Step-by-Step)

### 🎯 লক্ষ্য: একটি নিজস্ব ম্যাথ লাইব্রেরি মডিউল তৈরি করা।

#### ধাপ ১: `calculator.js` নামে একটি ফাইল তৈরি করুন এবং নিচের কোডটি লিখুন:

```javascript
// calculator.js
const PI = 3.14159;

function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

// এই ভ্যারিয়েবল এবং ফাংশনগুলোকে অন্য ফাইলের জন্য এক্সপোর্ট করুন
module.exports = {
    PI: PI,
    add: add,
    multiply: multiply
};

```

#### ধাপ ২: `app.js` নামে আরেকটি মূল ফাইল তৈরি করুন এবং সেখানে এক্সপোর্ট করা ডেটা ইমপোর্ট করুন:

```javascript
// app.js
const math = require('./calculator');

const radius = 5;
const area = math.PI * math.multiply(radius, radius); // PI * r^2

console.log(`যোগফলের ফলাফল: ${math.add(10, 20)}`);
console.log(`বৃত্তের ক্ষেত্রফল: ${area.toFixed(2)}`);

```

#### ধাপ ৩: টার্মিনালে রান করুন:

```bash
node app.js

```

---

## 10. Final Summary & Practice Checklist

### 📌 Final Summary

Node.js হলো একটি পাওয়ারফুল ব্যাকএন্ড রানটাইম প্ল্যাটফর্ম যেখানে কোনো ব্রাউজার উইন্ডো বা DOM এলিমেন্ট থাকে না। নোড তার অ্যাপ্লিকেশন আর্কিটেকচারকে ক্লিন ও কনফ্লিক্ট-মুক্ত রাখার জন্য **CommonJS Module System** ব্যবহার করে。 এখানে প্রতিটি ফাইল একটি নিরাপদ দেয়াল বা স্কোপের ভেতরে থাকে, যা ব্যাকএন্ডে **Module Wrapper Function** দ্বারা নিয়ন্ত্রিত হয়। এক ফাইলের ডেটা অন্য ফাইলে পাঠাতে আমরা `module.exports` অবজেক্ট কনফিগার করি এবং তা রিসিভ করতে `require()` ফাংশন কল করি।

### ✅ Practice Checklist

* [ ] টার্মিনালে `node` লিখে নোড REPL মোড ওপেন করে `global` অবজেক্টটি প্রিন্ট করে দেখেছেন কি না?
* [ ] নিজের কোনো ফাইলে `console.log(__dirname)` এবং `__filename` চালিয়ে আউটপুট চেক করেছেন কি না?
* [ ] `module.exports` ব্যবহার করে অবজেক্ট আকারে এবং ফাংশন আকারে আলাদাভাবে এক্সপোর্ট টেস্ট করেছেন কি না?
* [ ] `npm install lodash` কমান্ড দিয়ে থার্ড-পার্টি প্যাকেজ প্রজেক্টে সফলভাবে যুক্ত করে ব্যবহার করতে পেরেছেন কি না?

```

আপনি এই ব্লকের ভেতরের সম্পূর্ণ টেক্সট কপি করে আপনার লোকাল কম্পিউটারে `Node_Module_System_Notes.md` নামে একটি ফাইল তৈরি করে সংরক্ষণ করতে পারেন। যেকোনো Markdown Viewer বা VS Code-এ এটি অত্যন্ত সুন্দর ও স্ট্রাকচার্ড দেখাবে।

```
