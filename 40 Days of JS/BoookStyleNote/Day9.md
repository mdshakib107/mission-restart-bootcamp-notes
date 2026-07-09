# JavaScript Hoisting এবং Temporal Dead Zone (TDZ) — Detailed Study Notes

> **Topic:** Hoisting, Variable Hoisting, Function Hoisting, `var` vs `let` vs `const`, Temporal Dead Zone (TDZ), Function Declaration vs Function Expression  
> **Level:** Beginner-friendly  
> **Language style:** সহজ বাংলা + programming terms English  
> **Source context:** 40 Days of JavaScript — Day 9 transcript

---

## Table of Contents

1. [Lesson Overview](#lesson-overview)
2. [Prerequisite: Execution Context বুঝতে হবে কেন](#prerequisite-execution-context-বুঝতে-হবে-কেন)
3. [Hoisting সম্পর্কে সবচেয়ে বড় misconception](#hoisting-সম্পর্কে-সবচেয়ে-বড়-misconception)
4. [Global Execution Context: Creation Phase ও Execution Phase](#global-execution-context-creation-phase-ও-execution-phase)
5. [Variable Hoisting with `var`](#variable-hoisting-with-var)
6. [`let` এবং `const`-এর সাথে Hoisting](#let-এবং-const-এর-সাথে-hoisting)
7. [Temporal Dead Zone (TDZ)](#temporal-dead-zone-tdz)
8. [Block কী এবং TDZ block-এর মধ্যে কীভাবে কাজ করে](#block-কী-এবং-tdz-block-এর-মধ্যে-কীভাবে-কাজ-করে)
9. [Function Hoisting: Function Declaration](#function-hoisting-function-declaration)
10. [Function Execution Context দিয়ে `chase()` example ব্যাখ্যা](#function-execution-context-দিয়ে-chase-example-ব্যাখ্যা)
11. [Function Expression Hoisting Trap: `test()` example](#function-expression-hoisting-trap-test-example)
12. [Important Differences](#important-differences)
13. [Error Types: ReferenceError, TypeError, SyntaxError](#error-types-referenceerror-typeerror-syntaxerror)
14. [Code Examples with Explanation](#code-examples-with-explanation)
15. [Common Mistakes](#common-mistakes)
16. [মনে রাখার নিয়ম](#মনে-রাখার-নিয়ম)
17. [Assignment / Practice Tasks](#assignment--practice-tasks)
18. [Final Summary](#final-summary)
19. [Practice Checklist](#practice-checklist)

---

## Lesson Overview

এই lesson-এ JavaScript-এর দুইটি গুরুত্বপূর্ণ concept শেখানো হয়েছে:

- **Hoisting**
- **Temporal Dead Zone (TDZ)**

শুরুতে instructor বলেন, JavaScript-এ অনেক term বা jargon শুনতে scary মনে হতে পারে। যেমন: **Hoisting**, **Temporal Dead Zone**, **Execution Context** ইত্যাদি। কিন্তু এগুলো যদি fundamentals দিয়ে বোঝা যায়, তাহলে concept সহজ হয়ে যায়।

এই lesson-এর মূল লক্ষ্য হলো:

1. Hoisting আসলে কী, সেটা ভুল ধারণা ছাড়া বোঝা।
2. `var`, `let`, `const`-এর behavior compare করা।
3. TDZ কীভাবে কাজ করে বোঝা।
4. Function declaration কেন আগে call করলেও চলে, সেটা বোঝা।
5. Function expression কেন আগে call করলে error দেয়, সেটা বোঝা।

---

## Prerequisite: Execution Context বুঝতে হবে কেন

এই lesson পুরোপুরি বুঝতে হলে **Execution Context** সম্পর্কে basic ধারণা থাকা জরুরি। Instructor আগের session অর্থাৎ Day 8-এ Execution Context নিয়ে আলোচনা করেছিলেন।

JavaScript code চালানোর সময় engine শুধু line-by-line blindly পড়ে না। তার আগে code-এর জন্য একটি environment তৈরি হয়, যেটাকে বলা হয় **Execution Context**।

Execution Context-এর মধ্যে সাধারণত দুইটি phase থাকে:

| Phase | কাজ |
|---|---|
| **Creation Phase (CP)** | variable এবং function-এর memory তৈরি হয়। কিছু ক্ষেত্রে initial value দেওয়া হয়। |
| **Execution Phase (EP)** | code line by line execute হয়। assignment, function call, console log—এসব এখানে ঘটে। |

এই CP এবং EP না বুঝলে Hoisting-কে অনেকেই ভুলভাবে ব্যাখ্যা করে। যেমন, “JavaScript variable/function উপরে তুলে দেয়”—এটা beginner-level shorthand হলেও technically accurate নয়।

---

## Hoisting সম্পর্কে সবচেয়ে বড় misconception

### English meaning বনাম JavaScript meaning

English-এ **hoist** মানে কোনো কিছু উপরে তোলা বা pull up করা। তাই JavaScript beginner-দের মধ্যে একটি common ধারণা তৈরি হয়:

> JavaScript variable declaration বা function declaration-কে code-এর উপরে তুলে দেয়।

কিন্তু instructor স্পষ্টভাবে বলেন, এইভাবে ভাবলে fundamentals ভুল হয়ে যায়। JavaScript আসলে source code-এর line physically উপরে move করে না।

### Correct mental model

Hoisting বোঝার সঠিক উপায় হলো **Execution Context** দিয়ে চিন্তা করা।

JavaScript code execute করার আগে Creation Phase-এ:

- variable declaration-এর জন্য memory তৈরি করে।
- function declaration-এর জন্য memory তৈরি করে।
- কিছু variable initialize করে।
- function declaration-এর ক্ষেত্রে function body সহ reference তৈরি করে।

তাই কোনো variable বা function “আগে থেকেই available” মনে হয়। কিন্তু সেটা code move করার কারণে নয়; সেটা memory allocation এবং initialization-এর কারণে।

### Beginner-friendly definition

**Hoisting হলো Execution Context-এর Creation Phase-এ variable এবং function-এর জন্য memory তৈরি হওয়া, এবং সম্ভব হলে তাদের initialize হওয়া।**

আরও সহজভাবে:

> Hoisting মানে JavaScript আগে memory প্রস্তুত করে, তারপর code execute করে।

---

## Global Execution Context: Creation Phase ও Execution Phase

Browser environment-এ JavaScript code চালালে প্রথমে তৈরি হয় **Global Execution Context (GEC)**।

GEC-এর দুইটি বড় অংশ:

```text
Global Execution Context (GEC)
├── Creation Phase (CP)
│   ├── window object তৈরি/available হয়
│   ├── this keyword set হয়
│   ├── global variable declarations-এর memory তৈরি হয়
│   └── global function declarations-এর memory তৈরি হয়
│
└── Execution Phase (EP)
    └── code line by line execute হয়
```

### Creation Phase-এ কী হয়?

Creation Phase-এ JavaScript engine দেখে:

- global scope-এ কোন variable declare করা হয়েছে?
- global scope-এ কোন function declare করা হয়েছে?
- কোনটির জন্য memory allocate করতে হবে?
- কোনটি initialize করতে হবে?

### Execution Phase-এ কী হয়?

Execution Phase-এ JavaScript line by line চলে। যেমন:

- `console.log()` execute হয়।
- variable assignment হয়।
- function call হলে নতুন Function Execution Context তৈরি হয়।

---

## Variable Hoisting with `var`

এখন `var` দিয়ে variable hoisting বোঝা যাক।

### Code

```javascript
{
  console.log('name is ', name);
  var name = "tom";
  name = 'tom';
  console.log('name is ', name);
}
```

### Beginner expectation

অনেক beginner ভাবতে পারে:

> `name` declare করার আগেই `console.log(name)` করা হয়েছে, তাই error হওয়া উচিত।

অনেক programming language-এ সত্যিই error হতো। কিন্তু JavaScript-এ `var`-এর ক্ষেত্রে output হবে:

```text
name is  undefined
name is  tom
```

Chrome DevTools-এ অনেক সময় প্রথম line blank/undefined হিসেবে দেখা যেতে পারে, কিন্তু আসল value হলো `undefined`।

### কেন error হলো না?

কারণ `var` declaration Creation Phase-এ memory পায় এবং automatically `undefined` দিয়ে initialize হয়।

এটা মনে রাখতে হবে:

```javascript
var name = "tom";
```

এই line-এ দুইটি কাজ আছে:

1. declaration: `var name`
2. assignment: `name = "tom"`

JavaScript Creation Phase-এ declaration handle করে। কিন্তু assignment Execution Phase-এ গিয়ে হয়।

### Execution Context দিয়ে step-by-step

#### Creation Phase

```text
name → undefined
```

এখনও code execute হয়নি। শুধু memory তৈরি হয়েছে এবং `var` variable হিসেবে `name`-এর initial value হয়েছে `undefined`।

#### Execution Phase

| Line | কী ঘটে | `name`-এর value |
|---|---|---|
| `console.log('name is ', name);` | `name` print করার চেষ্টা | `undefined` |
| `var name = "tom";` | declaration already handled, এখন assignment হয় | `"tom"` |
| `name = 'tom';` | আবার assignment হয় | `'tom'` |
| `console.log('name is ', name);` | final value print হয় | `'tom'` |

### Easy explanation

`var` দিয়ে declare করা variable code execution শুরু হওয়ার আগেই memory-তে জায়গা পায় এবং `undefined` value পায়। তাই declaration-এর আগে access করলে JavaScript variable-টাকে চিনতে পারে, কিন্তু actual assigned value তখনও পাওয়া যায়নি। তাই `undefined` আসে।

### Common mistake

ভুল ধারণা:

> JavaScript `var name` line-কে উপরে তুলে দিয়েছে।

সঠিক ধারণা:

> JavaScript Creation Phase-এ `name`-এর memory তৈরি করেছে এবং value `undefined` দিয়েছে। Source code physically move হয়নি।

### মনে রাখার নিয়ম

> `var` = আগে memory + `undefined`, পরে actual value।

---

## `let` এবং `const`-এর সাথে Hoisting

অনেকে মনে করে `let` এবং `const` hoisted হয় না। এটা পুরোপুরি সঠিক নয়।

`let` এবং `const`-এর জন্যও Creation Phase-এ memory তৈরি হয়। কিন্তু difference হলো:

- `var` memory পেয়ে `undefined` দিয়ে initialize হয়।
- `let` memory পায়, কিন্তু initialize হয় না।
- `const` memory পায়, কিন্তু initialize হয় না; এবং declaration-এর সময় value দিতেই হয়।

এই uninitialized অবস্থার কারণেই TDZ তৈরি হয়।

---

### `let` example

```javascript
{
  console.log('name is ', name);
  let name = "tom";
  name = 'tom';
  console.log('name is ', name);
}
```

### Output

```text
ReferenceError: Cannot access 'name' before initialization
```

### কেন error হলো?

Creation Phase-এ `name` variable-এর memory তৈরি হয়েছে, কিন্তু `undefined` দিয়ে initialize হয়নি। তাই Execution Phase-এ প্রথম line-এ যখন `name` access করা হচ্ছে, তখন JavaScript বলে:

> এই variable আছে, কিন্তু এখনও initialize হয়নি। তাই access করা যাবে না।

এটাই **Temporal Dead Zone**-এর effect।

### Easy explanation

`let` variable declaration-এর আগে access করলে JavaScript তাকে `undefined` হিসেবে ব্যবহার করতে দেয় না। কারণ variable এখনও usable state-এ আসেনি।

### Common mistake

ভুল ধারণা:

> `let` hoisted হয় না।

সঠিক ধারণা:

> `let` hoisted হয়, কিন্তু initialize হয় না। তাই declaration/initialization-এর আগে access করলে ReferenceError হয়।

### মনে রাখার নিয়ম

> `let` = memory আছে, কিন্তু value না আসা পর্যন্ত access নিষিদ্ধ।

---

### `const` example

```javascript
{
  console.log('name is ', name);
  const name = "tom";
  // name = 'tom';
  console.log('name is ', name);
}
```

### Output

```text
ReferenceError: Cannot access 'name' before initialization
```

`const`-এর ক্ষেত্রেও `let`-এর মতো declaration/initialization-এর আগে access করলে ReferenceError হয়।

### `const`-এর extra rule

`const` declare করার সময় value দিতেই হবে। নিচের code invalid:

```javascript
const name;
```

এতে error হবে:

```text
SyntaxError: Missing initializer in const declaration
```

কারণ `const` মানে constant binding; declare করার সাথে সাথে initialize করতে হবে।

আরেকটি বিষয়:

```javascript
const name = "tom";
name = "jerry";
```

এতে error হবে, কারণ `const` reassign করা যায় না।

```text
TypeError: Assignment to constant variable
```

### Easy explanation

`const` হলো এমন variable declaration যেখানে value declaration-এর সময়ই set করতে হয় এবং পরে reassign করা যায় না। তবে declaration-এর আগে access করলে `let`-এর মতোই TDZ-এর কারণে ReferenceError হয়।

### Common mistake

ভুল ধারণা:

> `const` মানে value কখনও পরিবর্তন করা যায় না।

আরও accurate ধারণা:

> `const` binding reassign করা যায় না। Object/Array হলে ভিতরের property/item mutate করা যেতে পারে, কিন্তু variable-টাকে নতুন value-তে point করানো যায় না।

এই lesson-এ মূল focus ছিল `const`-এর hoisting, TDZ, initialization এবং reassignment rule।

### মনে রাখার নিয়ম

> `const` = declaration-এর সময় value বাধ্যতামূলক + reassign নিষিদ্ধ + TDZ আছে।

---

## Temporal Dead Zone (TDZ)

### Definition

**Temporal Dead Zone (TDZ)** হলো code-এর এমন একটি area যেখানে কোনো variable initialize হওয়ার আগে তাকে access করা যায় না।

সহজভাবে:

> TDZ হলো variable usable হওয়ার আগের “no access zone”।

### TDZ কখন হয়?

TDZ mainly `let` এবং `const` variable-এর ক্ষেত্রে বোঝা গুরুত্বপূর্ণ।

`let`/`const` variable-এর memory Creation Phase-এ তৈরি হয়, কিন্তু variable initialize না হওয়া পর্যন্ত তাকে access করা যায় না। এই access-না-করা-যাওয়া সময়/area-ই TDZ।

### TDZ access করলে কী হয়?

যদি TDZ-এর মধ্যে variable access করা হয়, JavaScript throw করে:

```text
ReferenceError
```

যেমন:

```javascript
{
  console.log(name); // ReferenceError
  let name = "tapaScript";
}
```

এখানে `name` variable-এর TDZ block-এর শুরু থেকে `let name = "tapaScript"` line execute হওয়া পর্যন্ত।

---

## Block কী এবং TDZ block-এর মধ্যে কীভাবে কাজ করে

### Block কী?

JavaScript-এ `{ }` curly braces দিয়ে block তৈরি হয়।

```javascript
{
  // এটি একটি block
}
```

Instructor বলেন, scope session-এ block নিয়ে আরও বিস্তারিত আলোচনা হবে। এই lesson-এ block ব্যবহার করা হয়েছে TDZ বোঝানোর জন্য।

### TDZ কোথা থেকে শুরু হয়?

একটি `let` বা `const` variable-এর জন্য TDZ সাধারণত তার scope/block-এর শুরু থেকে শুরু হয়।

### TDZ কোথায় শেষ হয়?

যখন variable initialize হয়, TDZ শেষ হয়।

Example:

```javascript
{
  // name variable-এর TDZ শুরু এখানে

  // console.log(name); // ReferenceError

  let name = "tapaScript"; // name variable-এর TDZ শেষ এখানে

  console.log(name); // OK
}
```

### Multiple variable হলে TDZ আলাদা হয়

একই block-এর মধ্যে একাধিক `let` variable থাকলে প্রত্যেক variable-এর TDZ আলাদা হতে পারে।

```javascript
{
  // address-এর TDZ শুরু
  // name-এর TDZ শুরু

  console.log(address); // ReferenceError
  let address = "bangalore"; // address-এর TDZ শেষ

  let name = "tapaScript"; // name-এর TDZ শেষ
  console.log(name); // OK
}
```

এই code বাস্তবে চালালে প্রথমেই `console.log(address)` line-এ ReferenceError হবে। তাই তার পরের lines execute হবে না।

### যদি access initialization-এর পরে হয়

```javascript
{
  let address = "bangalore";
  console.log(address); // OK

  let name = "tapaScript";
  console.log(name); // OK
}
```

Output:

```text
bangalore
tapaScript
```

### Easy explanation

TDZ হলো এমন সময়/area যেখানে variable memory-তে আছে, কিন্তু এখনো use করার অনুমতি নেই। Declaration/initialization line execute হওয়ার পর variable safe হয়।

### Common mistake

ভুল ধারণা:

> TDZ শুধু line-এর ওপরের অংশ।

আরও accurate ধারণা:

> TDZ scope/block-এর শুরু থেকে variable initialization পর্যন্ত। এটা variable-specific। প্রত্যেক `let`/`const` variable-এর TDZ আলাদা হতে পারে।

### মনে রাখার নিয়ম

> `let`/`const` variable declaration-এর আগের block-area = TDZ। TDZ-এ access করলে ReferenceError।

---

## Function Hoisting: Function Declaration

এখন function hoisting দেখা যাক।

### Code

```javascript
// Invoke a function, chase()
chase();

// Declare a function, chase()
function chase() {
  console.log('Tom chases Jerry!');
  // Invoke a function, caught();
  caught();
}

// Declare a function, caught()
function caught() {
  console.log('Tom caught Jerry :(');
}
```

### Output

```text
Tom chases Jerry!
Tom caught Jerry :(
```

### Beginner expectation

অনেকেই ভাবতে পারে:

> `chase()` call করা হয়েছে function declaration-এর আগে। তাহলে error হওয়া উচিত।

কিন্তু function declaration-এর ক্ষেত্রে error হয় না। কারণ Creation Phase-এ function declaration memory-তে তৈরি হয় এবং function body সহ available থাকে।

### Easy explanation

Function declaration-এর ক্ষেত্রে JavaScript Creation Phase-এ পুরো function definition memory-তে রাখে। তাই Execution Phase-এ function call declaration-এর আগে থাকলেও JavaScript function-টিকে খুঁজে পায়।

### Important point

Function declaration:

```javascript
function chase() {
  console.log('Tom chases Jerry!');
}
```

এটা Creation Phase-এ function হিসেবে memory পায়। তাই আগে call করা possible:

```javascript
chase();

function chase() {
  console.log('Tom chases Jerry!');
}
```

### Common mistake

ভুল ধারণা:

> Function declaration line উপরে চলে গেছে।

সঠিক ধারণা:

> Creation Phase-এ function-এর memory তৈরি হয়েছে এবং function reference/body available হয়েছে।

### মনে রাখার নিয়ম

> Function declaration = পুরো function আগে memory-তে ready।

---

## Function Execution Context দিয়ে `chase()` example ব্যাখ্যা

`chase()` example-টা Execution Context দিয়ে step-by-step বুঝলে concept পরিষ্কার হয়।

### Full code আবার দেখি

```javascript
chase();

function chase() {
  console.log('Tom chases Jerry!');
  caught();
}

function caught() {
  console.log('Tom caught Jerry :(');
}
```

### Step 1: Global Execution Context তৈরি হয়

```text
GEC
├── Creation Phase
└── Execution Phase
```

### Step 2: GEC Creation Phase

JavaScript global scope scan করে। এখানে দুইটি function declaration আছে:

- `chase`
- `caught`

তাই Creation Phase-এ memory তৈরি হয়:

```text
chase  → function chase() { ... }
caught → function caught() { ... }
```

এখানে কোনো global variable নেই। তাই variable memory তৈরির বিষয় নেই।

### Step 3: GEC Execution Phase

Execution Phase line-by-line শুরু হয়। প্রথম line:

```javascript
chase();
```

JavaScript memory-তে দেখে `chase` আছে কি না। Creation Phase-এ `chase` already available, তাই function call valid।

### Step 4: `chase()` call হলে Function Execution Context তৈরি হয়

```text
Function Execution Context: chase
├── Creation Phase
└── Execution Phase
```

`chase` function-এর ভিতরে নতুন variable বা nested function নেই। তাই এর Creation Phase-এ বিশেষ কিছু করার নেই।

Execution Phase-এ প্রথমে চলে:

```javascript
console.log('Tom chases Jerry!');
```

Output:

```text
Tom chases Jerry!
```

তারপর চলে:

```javascript
caught();
```

### Step 5: `caught()` call হলে আরেকটি Function Execution Context তৈরি হয়

```text
Function Execution Context: caught
├── Creation Phase
└── Execution Phase
```

`caught` function-এর ভিতরে শুধু একটি `console.log()` আছে। তাই Execution Phase-এ print হয়:

```text
Tom caught Jerry :(
```

তারপর `caught()` শেষ হয়, control ফিরে যায় `chase()`-এ। তারপর `chase()` শেষ হয়, control ফিরে যায় GEC-তে।

### Call Stack style mental model

```text
1. GEC starts
2. chase() called
3. chase FEC pushed
4. caught() called inside chase
5. caught FEC pushed
6. caught finishes and pops
7. chase finishes and pops
8. GEC continues/finishes
```

### Easy story from video

এই example-এ Tom এবং Jerry ব্যবহার করে function flow বোঝানো হয়েছে:

1. `chase()` call হলে Tom Jerry-কে chase করে।
2. `chase()`-এর ভিতর থেকে `caught()` call হয়।
3. `caught()` print করে Tom Jerry-কে ধরেছে।

Output order তাই:

```text
Tom chases Jerry!
Tom caught Jerry :(
```

---

## Function Expression Hoisting Trap: `test()` example

এটি lesson-এর সবচেয়ে গুরুত্বপূর্ণ interview trap-এর একটি।

### Code

```javascript
test();

var test = function() {
  console.log('I am being tested');
};
```

### Beginner expectation

অনেকে ভাবতে পারে:

> আগের example-এ function declaration আগে call করলে কাজ করেছে। এখানে `test()`-ও আগে call করা হয়েছে, নিচে function আছে। তাই এটাও কাজ করবে।

কিন্তু output হবে না। Error হবে।

### Actual error

```text
TypeError: test is not a function
```

### কেন TypeError হলো?

এখানে `test` কোনো function declaration নয়। এটা **function expression**।

এই line:

```javascript
var test = function() {
  console.log('I am being tested');
};
```

এর অর্থ:

1. `test` নামে একটি variable declare করা হচ্ছে।
2. সেই variable-এর value হিসেবে একটি function assign করা হচ্ছে।

অর্থাৎ, JavaScript Creation Phase-এ এটাকে function declaration হিসেবে দেখে না। এটাকে দেখে `var test` variable declaration হিসেবে।

### Execution Context দিয়ে explanation

#### Creation Phase

`var test` memory পায় এবং `undefined` দিয়ে initialize হয়:

```text
test → undefined
```

#### Execution Phase

প্রথম line:

```javascript
test();
```

এখানে `test`-এর current value হলো `undefined`। তাই JavaScript আসলে চেষ্টা করছে:

```javascript
undefined();
```

`undefined` function নয়। তাই error:

```text
TypeError: test is not a function
```

### কেন ReferenceError নয়?

কারণ `test` নামে binding আছে। Creation Phase-এ `var test` memory-তে এসেছে। তাই JavaScript বলতে পারছে না “test নেই”।

কিন্তু `test`-এর value হলো `undefined`, আর `undefined` call করা যায় না। তাই TypeError।

### Fix 1: Function expression call করার আগে assign করো

```javascript
var test = function() {
  console.log('I am being tested');
};

test();
```

Output:

```text
I am being tested
```

### Fix 2: Function declaration ব্যবহার করো

```javascript
test();

function test() {
  console.log('I am being tested');
}
```

Output:

```text
I am being tested
```

### Easy explanation

Function declaration আগে থেকেই memory-তে full function হিসেবে থাকে। কিন্তু function expression-এ variable আগে memory পায়, function value পরে assign হয়। তাই assignment হওয়ার আগে call করলে error।

### Common mistake

ভুল ধারণা:

> নিচে function keyword আছে, তাই এটা function hoisting পাবে।

সঠিক ধারণা:

> `var test = function() {}` হলো variable declaration + function value assignment। তাই `test` প্রথমে `undefined`।

### মনে রাখার নিয়ম

> Function expression = variable আগে, function value পরে। আগে call করলে trap।

---

## Important Differences

### `var`, `let`, `const` comparison

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Hoisted? | হ্যাঁ | হ্যাঁ | হ্যাঁ |
| Creation Phase-এ memory তৈরি হয়? | হ্যাঁ | হ্যাঁ | হ্যাঁ |
| Creation Phase-এ initialize হয়? | হ্যাঁ, `undefined` | না | না |
| Declaration-এর আগে access করলে | `undefined` | ReferenceError | ReferenceError |
| TDZ আছে? | practical sense-এ নেই | আছে | আছে |
| Reassign করা যায়? | যায় | যায় | যায় না |
| Declaration-এর সময় value বাধ্যতামূলক? | না | না | হ্যাঁ |
| Modern JS recommendation | avoid করা ভালো | variable বদলালে use করো | default choice হিসেবে use করো |

---

### Function Declaration vs Function Expression

| Topic | Function Declaration | Function Expression with `var` |
|---|---|---|
| Syntax | `function test() {}` | `var test = function() {}` |
| Creation Phase-এ কী memory পায়? | পুরো function definition | `test` variable |
| Initial value | function body/reference | `undefined` |
| Declaration/assignment-এর আগে call করা যায়? | যায় | যায় না |
| আগে call করলে error? | না | `TypeError: test is not a function` |
| Mental model | function আগে ready | variable আগে ready, function পরে assign |

---

### Hoisting vs TDZ

| Concept | Meaning |
|---|---|
| Hoisting | Creation Phase-এ memory allocation এবং initialization যেখানে applicable |
| TDZ | `let`/`const` variable initialize হওয়ার আগ পর্যন্ত access নিষিদ্ধ area |
| Hoisting code move করে? | না |
| TDZ কি variable নেই বলে হয়? | না; variable memory-তে আছে, কিন্তু uninitialized |

---

## Error Types: ReferenceError, TypeError, SyntaxError

এই lesson-এ তিন ধরনের error দেখা যায়।

| Error | কখন হয় | Example |
|---|---|---|
| `ReferenceError` | variable initialize হওয়ার আগে access করলে | `console.log(name); let name = "tom";` |
| `TypeError` | কোনো value আছে, কিন্তু সেই value-কে ভুলভাবে ব্যবহার করা হচ্ছে | `var test; test();` |
| `SyntaxError` | code structure invalid হলে | `const name;` |

### 1. ReferenceError

```javascript
console.log(name);
let name = "tom";
```

Error:

```text
ReferenceError: Cannot access 'name' before initialization
```

কারণ `name` TDZ-এর মধ্যে access করা হয়েছে।

### 2. TypeError

```javascript
test();
var test = function() {};
```

Error:

```text
TypeError: test is not a function
```

কারণ `test` আছে, কিন্তু value `undefined`; `undefined` call করা যায় না।

### 3. SyntaxError

```javascript
const name;
```

Error:

```text
SyntaxError: Missing initializer in const declaration
```

কারণ `const` declaration-এর সময় value দিতে হয়।

---

## Code Examples with Explanation

### Example 1: `var` before declaration

```javascript
{
  console.log('name is ', name);
  var name = "tom";
  name = 'tom';
  console.log('name is ', name);
}
```

Expected output:

```text
name is  undefined
name is  tom
```

Reason:

```text
Creation Phase:
name → undefined

Execution Phase:
console.log(name) → undefined
name = "tom"
name = 'tom'
console.log(name) → tom
```

---

### Example 2: `let` before declaration

```javascript
{
  console.log('name is ', name);
  let name = "tom";
  name = 'tom';
  console.log('name is ', name);
}
```

Expected output:

```text
ReferenceError: Cannot access 'name' before initialization
```

Reason:

```text
Creation Phase:
name → memory created but uninitialized

Execution Phase:
console.log(name) → TDZ access → ReferenceError
```

---

### Example 3: `const` before declaration

```javascript
{
  console.log('name is ', name);
  const name = "tom";
  // name = 'tom';
  console.log('name is ', name);
}
```

Expected output:

```text
ReferenceError: Cannot access 'name' before initialization
```

Reason:

```text
Creation Phase:
name → memory created but uninitialized

Execution Phase:
console.log(name) → TDZ access → ReferenceError
```

---

### Example 4: TDZ with multiple variables

```javascript
{
  // name variable's TDZ starts here
  // address variable's TDZ starts here

  console.log(address); // ReferenceError
  let address = "bangalore";

  let name = "tapaScript"; // name variable's TDZ ends here
  console.log(name);
}
```

Important:

- `address`-এর TDZ block-এর শুরু থেকে `let address = "bangalore"` পর্যন্ত।
- `name`-এর TDZ block-এর শুরু থেকে `let name = "tapaScript"` পর্যন্ত।
- `console.log(address)` TDZ-এর মধ্যে, তাই ReferenceError।
- Error হলে তার পরের code execute হবে না।

Correct version:

```javascript
{
  let address = "bangalore";
  console.log(address);

  let name = "tapaScript";
  console.log(name);
}
```

Output:

```text
bangalore
tapaScript
```

---

### Example 5: Function declaration before definition

```javascript
chase();

function chase() {
  console.log('Tom chases Jerry!');
  caught();
}

function caught() {
  console.log('Tom caught Jerry :(');
}
```

Expected output:

```text
Tom chases Jerry!
Tom caught Jerry :(
```

Reason:

```text
GEC Creation Phase:
chase  → full function
caught → full function

GEC Execution Phase:
chase() call
  → chase FEC
  → console.log('Tom chases Jerry!')
  → caught() call
      → caught FEC
      → console.log('Tom caught Jerry :(')
```

---

### Example 6: Function expression before assignment

```javascript
test();

var test = function() {
  console.log('I am being tested');
};
```

Expected output:

```text
TypeError: test is not a function
```

Reason:

```text
GEC Creation Phase:
test → undefined

GEC Execution Phase:
test() → undefined() → TypeError
```

Correct version:

```javascript
var test = function() {
  console.log('I am being tested');
};

test();
```

Output:

```text
I am being tested
```

---

## Common Mistakes

### Mistake 1: Hoisting মানে code উপরে উঠে যায় ভাবা

Hoisting-কে “JavaScript code উপরে তুলে দেয়” হিসেবে ভাবলে অনেক trap বোঝা যায় না।

Correct thinking:

> Hoisting = Creation Phase-এ memory allocation + initialization যেখানে possible।

---

### Mistake 2: `let` এবং `const` hoisted হয় না বলা

`let` এবং `const` hoisted হয়, কারণ তাদের memory Creation Phase-এ তৈরি হয়। কিন্তু তারা `undefined` দিয়ে initialize হয় না। তাই TDZ থাকে।

Correct thinking:

> `let`/`const` hoisted কিন্তু uninitialized থাকে।

---

### Mistake 3: `var` ব্যবহার করে declaration-এর আগে variable access করা

`var` declaration-এর আগে access করলে error না দিয়ে `undefined` আসতে পারে। এতে bug hide হয়ে যেতে পারে।

Bad style:

```javascript
console.log(userName);
var userName = "Tom";
```

Better style:

```javascript
const userName = "Tom";
console.log(userName);
```

---

### Mistake 4: Function declaration এবং function expression confuse করা

Function declaration আগে call করলে কাজ করতে পারে:

```javascript
sayHi();

function sayHi() {
  console.log("Hi");
}
```

Function expression আগে call করলে কাজ করবে না:

```javascript
sayHi();

var sayHi = function() {
  console.log("Hi");
};
```

---

### Mistake 5: `const` declare করে পরে value দিতে চাওয়া

Invalid:

```javascript
const age;
age = 20;
```

Correct:

```javascript
const age = 20;
```

---

### Mistake 6: TDZ-কে পুরো program-এর জন্য same ভাবা

TDZ variable-specific এবং scope-specific। একই block-এর মধ্যে `address` এবং `name` variable-এর TDZ আলাদা হতে পারে।

---

### Mistake 7: Error হওয়ার পরও নিচের code চলবে ভাবা

যদি ReferenceError বা TypeError throw হয় এবং handle না করা হয়, সাধারণ script execution stop হয়ে যায়। তাই error line-এর পরের code run করবে না।

---

## মনে রাখার নিয়ম

### Hoisting

> Hoisting মানে code move নয়; memory create হয়।

### `var`

> `var` আগে memory পায়, value হয় `undefined`; assignment পরে হয়।

### `let`

> `let` memory পায়, কিন্তু initialize হওয়ার আগে access করলে ReferenceError।

### `const`

> `const` memory পায়, কিন্তু initialize হওয়ার আগে access করলে ReferenceError; declare করার সময় value দেওয়া mandatory; reassign করা যায় না।

### TDZ

> TDZ হলো scope/block-এর শুরু থেকে variable initialization পর্যন্ত no-access area।

### Function Declaration

> Function declaration Creation Phase-এ full function হিসেবে ready থাকে।

### Function Expression

> Function expression-এ variable আগে hoisted হয়, function value পরে assign হয়। তাই আগে call করলে `undefined()` call করার মতো error হয়।

### Interview answer

কেউ জিজ্ঞেস করলে “Hoisting কী?”—এভাবে বলো:

> Hoisting is the behavior where, during the Creation Phase of an Execution Context, JavaScript allocates memory for variables and functions and initializes them where applicable. `var` is initialized with `undefined`, function declarations are initialized with the function definition, but `let` and `const` remain uninitialized until their declaration is executed, which creates the Temporal Dead Zone.

বাংলায়:

> Hoisting হলো Execution Context-এর Creation Phase-এ variable/function-এর memory তৈরি হওয়া এবং যেখানে সম্ভব initialization হওয়া। `var` `undefined` পায়, function declaration full function হিসেবে ready হয়, কিন্তু `let`/`const` initialize না হওয়া পর্যন্ত TDZ-এ থাকে।

---

## Assignment / Practice Tasks

Transcript-এ এই Day 9 lesson-এর শেষে আলাদা কোনো explicit assignment দেওয়া হয়নি। তবে future revision-এর জন্য নিচের practice tasks করা উচিত। এগুলো lesson-এর concepts থেকেই তৈরি।

### Task 1: Output predict করো

```javascript
console.log(a);
var a = 10;
console.log(a);
```

Expected answer:

```text
undefined
10
```

Explain using CP/EP:

```text
CP: a → undefined
EP: first log undefined, then a = 10, then second log 10
```

---

### Task 2: Error identify করো

```javascript
console.log(a);
let a = 10;
```

Expected answer:

```text
ReferenceError: Cannot access 'a' before initialization
```

Reason: `a` TDZ-এর মধ্যে access করা হয়েছে।

---

### Task 3: `const` rule explain করো

```javascript
const city;
city = "Dhaka";
```

Expected answer:

```text
SyntaxError: Missing initializer in const declaration
```

Reason: `const` declaration-এর সময়ই value দিতে হয়।

---

### Task 4: Function declaration flow draw করো

```javascript
run();

function run() {
  console.log("Running");
}
```

Expected output:

```text
Running
```

Reason:

```text
CP: run → full function
EP: run() executes successfully
```

---

### Task 5: Function expression trap explain করো

```javascript
run();

var run = function() {
  console.log("Running");
};
```

Expected output:

```text
TypeError: run is not a function
```

Reason:

```text
CP: run → undefined
EP: run() means undefined()
```

---

### Task 6: TDZ boundary mark করো

```javascript
{
  // line 1
  // line 2
  console.log(user);
  // line 4
  let user = "Tom";
  console.log(user);
}
```

Answer:

```text
user-এর TDZ শুরু block-এর শুরু থেকে।
user-এর TDZ শেষ let user = "Tom" execute হওয়ার সময়।
console.log(user) TDZ-এর মধ্যে, তাই ReferenceError।
```

---

## Final Summary

এই lesson-এর core message হলো: Hoisting কোনো magic নয়। JavaScript code execute করার আগে Execution Context তৈরি করে। সেই Execution Context-এর Creation Phase-এ variable এবং function-এর memory তৈরি হয়।

`var` variable Creation Phase-এ `undefined` দিয়ে initialize হয়। তাই declaration-এর আগে access করলে error না হয়ে `undefined` পাওয়া যায়। কিন্তু `let` এবং `const` memory পেলেও initialize হয় না। তাই declaration/initialization-এর আগে access করলে ReferenceError হয়। এই নিষিদ্ধ area-ই Temporal Dead Zone বা TDZ।

Function declaration-এর ক্ষেত্রে পুরো function Creation Phase-এ memory-তে available থাকে। তাই function declaration-এর আগে function call করলেও কাজ করে। কিন্তু function expression যেমন `var test = function() {}`-এ `test` আসলে variable। Creation Phase-এ `test` হয় `undefined`; function value assign হয় Execution Phase-এ line পৌঁছানোর পরে। তাই assignment-এর আগে `test()` করলে TypeError হয়।

সবচেয়ে গুরুত্বপূর্ণ হলো, Hoisting বোঝার সময় “JavaScript code উপরে তুলে দেয়” এই idea বাদ দিতে হবে। বরং ভাবতে হবে:

```text
Creation Phase → memory allocation + initialization
Execution Phase → line by line execution
```

এই mental model থাকলে variable hoisting, function hoisting, TDZ, ReferenceError, TypeError—সব clear হয়ে যায়।

---

## Practice Checklist

Revision করার সময় নিচের checklist follow করো।

- [ ] Hoisting-এর correct definition বলতে পারি।
- [ ] “JavaScript code physically উপরে তুলে দেয় না”—এটা explain করতে পারি।
- [ ] Global Execution Context-এর Creation Phase এবং Execution Phase explain করতে পারি।
- [ ] `var` declaration-এর আগে access করলে কেন `undefined` আসে বুঝি।
- [ ] `let` declaration-এর আগে access করলে কেন ReferenceError হয় বুঝি।
- [ ] `const` declaration-এর আগে access করলে কেন ReferenceError হয় বুঝি।
- [ ] `const` declaration-এর সময় initializer কেন mandatory বুঝি।
- [ ] TDZ কী এবং কোথা থেকে কোথায় পর্যন্ত থাকে explain করতে পারি।
- [ ] একই block-এ multiple variable-এর TDZ আলাদা হতে পারে বুঝি।
- [ ] Function declaration আগে call করলে কেন কাজ করে explain করতে পারি।
- [ ] Function expression আগে call করলে কেন TypeError হয় explain করতে পারি।
- [ ] ReferenceError, TypeError, SyntaxError-এর পার্থক্য বলতে পারি।
- [ ] কোনো code দেখে CP/EP table বানিয়ে output predict করতে পারি।
- [ ] Interview-style answer হিসেবে Hoisting ব্যাখ্যা করতে পারি।

---

## One-page Revision Sheet

### Hoisting definition

```text
Hoisting = Execution Context-এর Creation Phase-এ variable/function-এর memory তৈরি হওয়া এবং applicable হলে initialization হওয়া।
```

### `var`

```text
CP: variable → undefined
EP: assignment হলে actual value
```

### `let` / `const`

```text
CP: memory তৈরি, কিন্তু uninitialized
EP: declaration/initialization-এর আগে access → ReferenceError
```

### TDZ

```text
Scope/block শুরু → variable initialize হওয়া পর্যন্ত
```

### Function declaration

```text
CP: function → full function body/reference
EP: আগে call করলেও কাজ করে
```

### Function expression with `var`

```text
CP: variable → undefined
EP: assignment-এর আগে call → TypeError
```

### Best practice

```text
Declare before use.
Prefer const by default.
Use let when reassignment needed.
Avoid var in modern JavaScript.
```
