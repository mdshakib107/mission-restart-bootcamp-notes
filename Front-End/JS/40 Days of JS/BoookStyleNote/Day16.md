# JavaScript Debugging Mastery  
## Chrome DevTools ও VS Code ব্যবহার করে Professional Debugging

> এটি কোনো summary বা short note নয়। এখানে Instructor-এর lecture flow, examples, warnings, debugging workflow, keyboard shortcuts, real bug-fix walkthrough, DevTools panels, VS Code configuration, motivational advice এবং task guidance বজায় রেখে বিষয়গুলোকে বইয়ের পূর্ণাঙ্গ অধ্যায়ের মতো সাজানো হয়েছে।

---

# ১. ভূমিকা: “কেন কাজ করছে না?”

একজন developer হিসেবে তুমি নিশ্চয়ই এমন পরিস্থিতির মুখোমুখি হয়েছ:

> “কেন কাজ করছে না?”  
> “Console-এ তো সব ঠিক দেখাচ্ছে।”  
> “Bug কোথায়?”  
> “আমি তো কিছুই দেখতে পাচ্ছি না!”

তারপর হয়তো code-এর প্রায় প্রতিটি জায়গায় `console.log()` বসাতে শুরু করেছ। একেকটি variable print করছ, function call print করছ, execution flow বোঝার চেষ্টা করছ।

এটি শুধু তোমার সমস্যা নয়। প্রায় সব developer-ই এই অভিজ্ঞতার মধ্য দিয়ে যায়।

Bug fix করার সময় আমরা প্রায়ই বিভ্রান্ত হয়ে যাই:

- কিছু code যোগ করতে হবে?
- কিছু code remove করতে হবে?
- কোনো condition change করতে হবে?
- আরেকটি function লিখতে হবে?
- একই code বারবার run করলে কি হঠাৎ কাজ করবে?
- Internet-এ অন্য কেউ কীভাবে solve করেছে তা search করব?

Coding যেমন একটি skill, debugging-ও একটি skill—বরং debugging একটি art।

Programming শুধু code লেখা নয়। বাস্তবে একজন developer-এর বড় একটি সময় চলে যায়:

- ভুল খুঁজতে
- error reproduce করতে
- data flow inspect করতে
- function call trace করতে
- broken state identify করতে
- fix verify করতে

Instructor-এর ভাষায়, programming-এর প্রায় ৬০% সময় debugging-এ চলে যেতে পারে।

তাই শুধু `console.log()`-এর ওপর নির্ভর করলে চলবে না। এর চেয়ে শক্তিশালী, পরিষ্কার এবং professional উপায় আছে।

আজ আমরা JavaScript debug করব:

- Chrome DevTools দিয়ে
- VS Code debugger দিয়ে

Firefox, Edge বা Safari ব্যবহার করলেও ভয় নেই। নাম ও layout কিছুটা ভিন্ন হতে পারে, কিন্তু সমমানের debugging tools সেখানে আছে।

---

# ২. এই Lesson-এ আমরা কী শিখব

এই অধ্যায়ে আমরা শিখব:

1. Debugging কী
2. Bug কী
3. একটি sample application inspect করা
4. `console.log()`-এর গুরুত্ব
5. DevTools overview
6. Sources panel
7. Breakpoint
8. Step, Step Over, Step Into, Step Out, Resume
9. Conditional breakpoint
10. Event listener breakpoint
11. DOM breakpoint
12. Real bug debug ও fix
13. Scope inspection
14. Call stack inspection
15. Watch expression
16. `debugger` keyword
17. Workspace
18. VS Code debugging
19. `launch.json`
20. Debugging tips
21. Practice task

এই lesson-এ আলাদা formal assignment নেই। কিন্তু একটি গুরুত্বপূর্ণ task আছে:

> একটি sample application-এ প্রতিটি debugging technique নিজে ব্যবহার করো, যতক্ষণ না DevTools এবং VS Code debugger নিয়ে আত্মবিশ্বাস তৈরি হয়।

---

# ৩. Debugging কী?

ধরা যাক, তুমি একটি application তৈরি করছ। তোমার লক্ষ্য হলো customer বা end user-এর জন্য একটি feature implement করা।

তুমি:

- requirement পড়েছ
- logic লিখেছ
- function তৈরি করেছ
- UI তৈরি করেছ
- data process করেছ

Expected behaviour ছিল একরকম। কিন্তু application অন্যরকম behave করছে।

এই expected behaviour এবং actual behaviour-এর mismatch-ই হলো bug।

## Bug কেন হয়?

Bug ইচ্ছাকৃতভাবে তৈরি করা হয় না। বিভিন্ন কারণে bug আসতে পারে:

- Requirement সঠিকভাবে বোঝা হয়নি
- Technology সম্পর্কে understanding কম
- Logic ভুল
- Typo
- Type conversion
- Environment issue
- API response unexpected
- Edge case miss হয়েছে
- Dependency behaviour আলাদা
- Browser difference
- State inconsistency

## Debugging এবং Fixing

Bug track করার process:

```text
Debugging
```

Bug খুঁজে পাওয়ার পরে code change করে issue eliminate করা:

```text
Fixing
```

অর্থাৎ:

```text
Find the bug → Debugging
Remove the bug → Fixing
```

---

# ৪. Sample Application: Make a Wish

আমরা একটি simple “Make a Wish” application ব্যবহার করব।

User:

- নাম লিখবে
- একটি wish লিখবে
- button click করবে
- greeting message দেখবে

ধরা যাক input:

```text
Name: Tapas Adhikary
Wish: Teach JavaScript to millions of developers
```

Expected output:

```text
Hey Tapas Adhikary, your wish "Teach JavaScript to millions of developers" may come true.
```

কিন্তু actual output:

```text
Hey Tapas Adhikary, your wish NaN may come true.
```

এখানে স্পষ্ট mismatch আছে।

Name সঠিক এসেছে, কিন্তু wish-এর জায়গায় `NaN` এসেছে।

এটাই আমাদের bug।

---

# ৫. `console.log()`-এর গুরুত্ব

Developers `console.log()` খুব পছন্দ করে—এবং এটি খারাপ কিছু নয়।

```js
console.log("Something happened");
```

Execution flow বোঝা, variable value দেখা, error context জানা—এসব ক্ষেত্রে logging খুব useful।

ধরা যাক:

```js
function logger(text) {
  console.log("I am a logger function");
  console.log(text);
}
```

তারপর wish print করার function থেকে:

```js
logger(message);
```

DevTools-এর Console tab-এ আমরা দেখতে পারি:

```text
I am a logger function
Hey Tapas Adhikary, your wish NaN may come true
```

এমনকি browser দেখাতে পারে log কোন file এবং কোন line থেকে এসেছে।

উদাহরণ:

```text
index.js:17
```

এটি investigation শুরু করার জন্য useful।

কিন্তু সমস্যা হলো—log দেখে আমরা বুঝলাম output ভুল, কিন্তু ঠিক কোন expression ভুল তা সবসময় বোঝা যায় না।

---

# ৬. Production Environment-এ Logging কেন দরকার

Customer সাধারণত source code পায় না।

Developer source code থেকে application build করে deploy করে। Customer browser-এ final application ব্যবহার করে।

Customer-এর কাছে থাকে:

- UI
- deployed JavaScript bundle
- browser
- error message
- console output

Customer সাধারণত বলবে না:

> “Line 74-এ bug আছে।”

কিন্তু সে DevTools খুলে error screenshot পাঠাতে পারে।

যেমন:

```text
Uncaught TypeError ...
```

Developer screenshot দেখে investigation শুরু করতে পারে:

- কোন file
- কোন line
- কোন function
- কোন error type
- কোন action-এর পরে ঘটেছে

তাই `console.log()` ও error logging production debugging-এর useful starting point।

তবে logging debugging-এর শেষ নয়। শক্তিশালী debugging-এর জন্য breakpoint প্রয়োজন।

---

# ৭. Chrome DevTools খোলা

DevTools খোলার common উপায়:

```text
F12
```

অথবা webpage-এর ওপর right-click:

```text
Inspect
```

Chrome DevTools-এ বিভিন্ন tab থাকে:

- Elements
- Console
- Sources
- Network
- Performance
- Memory
- Application
- Lighthouse
- Privacy and Security

এই lesson-এ মূল focus:

```text
Sources
```

---

# ৮. DevTools Dock Position

DevTools বিভিন্ন জায়গায় dock করা যায়:

- Right side
- Bottom
- Left side
- Separate window

Top-right three-dot menu থেকে dock position change করা যায়।

## কোন layout ভালো?

### Right-side layout

UI left-এ, DevTools right-এ।

Side-by-side debugging-এর জন্য useful।

### Bottom layout

Horizontal monitor space কম হলে useful।

### Separate window

Intense debugging-এর সময় খুব useful। UI distraction কমে।

Instructor-এর পছন্দ—গভীর debugging-এর সময় DevTools আলাদা window-তে রাখা।

---

# ৯. গুরুত্বপূর্ণ DevTools Tabs

## Elements

DOM inspect করা যায়।

- Element select
- HTML structure দেখা
- CSS styles change
- Attribute inspect
- DOM breakpoint set

## Console

- Information log
- Warning
- Error
- Expression test
- Runtime values

## Sources

- Source code open
- Breakpoint set
- Step-by-step debug
- Scope inspect
- Call stack inspect
- Watch expression

## Network

API call inspect করার জন্য।

- Request
- Response
- Status code
- Timing
- Headers
- Payload

Async JavaScript lesson-এ এটি আরও গুরুত্বপূর্ণ।

## Performance

Application performance analyse করতে।

## Memory

Memory leak এবং memory usage analyse করতে।

## Application

Storage, cookies, cache, service worker ইত্যাদি inspect করতে।

## Lighthouse

Application audit করতে:

- Performance
- Accessibility
- Best practices
- SEO

---

# ১০. Sources Panel-এর তিনটি অংশ

Sources panel সাধারণত তিনটি primary section-এ ভাগ করা থাকে।

## ১. File Navigator

বাম পাশে।

এখানে application-এর:

- JavaScript files
- CSS files
- HTML files
- loaded scripts
- extension scripts

দেখা যায়।

## ২. Code Editor

মাঝে।

এখানে selected source file-এর code দেখা যায়।

## ৩. Debugger Panel

ডান পাশে বা নিচে।

এখানে থাকে:

- Breakpoints
- Scope
- Call stack
- Watch
- Event listener breakpoints
- DOM breakpoints

---

# ১১. Source File দ্রুত খোলা

Mac:

```text
Command + P
```

Windows/Linux:

```text
Ctrl + P
```

তারপর file name:

```text
index.js
```

Enter press করলে file code editor-এ open হবে।

---

# ১২. Breakpoint কী?

Breakpoint হলো code-এর এমন একটি point যেখানে execution pause হবে।

Pause হওয়ার পরে developer inspect করতে পারে:

- Variable value
- Scope
- Function argument
- Call stack
- Expression result
- Current line
- Previous state
- Next operation

Breakpoint developer নিজে set করে।

---

# ১৩. Breakpoint Set করা

Code editor-এর line number-এর পাশে click করো।

একটি marker দেখা যাবে।

Chrome-এ সাধারণত blue marker।

Example:

```js
const wish = getWish();
```

এই line-এ breakpoint দিলে execution এখানে pause করবে।

## Empty line-এ Breakpoint

Empty line-এ breakpoint set করা যায় না।

একটি multi-line expression যদি line 6 থেকে 10 পর্যন্ত লেখা হয়, browser কখনও শুধু expression-এর executable starting line-এ breakpoint allow করবে।

---

# ১৪. প্রথম ধাপ: Issue Reproduce করা

Customer bug report করলে প্রথম কাজ:

```text
Reproduce the issue
```

অর্থাৎ customer যে steps অনুসরণ করেছে, একই steps অনুসরণ করো।

Example:

1. Name লিখেছে
2. Wish লিখেছে
3. Button click করেছে
4. Output-এ `NaN` এসেছে

যদি reproduce হয়, debugging সহজ হয়।

যদি reproduce না হয়, আরও information দরকার:

- Exact steps
- Browser
- OS
- Input
- Screenshot
- Console logs
- Network logs

---

# ১৫. Debugging Control Buttons

DevTools-এ কয়েকটি গুরুত্বপূর্ণ control থাকে।

- Resume
- Step
- Step Over
- Step Into
- Step Out
- Deactivate Breakpoints

এগুলোর shortcut browser ও OS অনুযায়ী কিছুটা differ করতে পারে। Instructor-এর demonstration অনুযায়ী Chrome DevTools-এর common shortcuts নিচে দেওয়া হলো।

---

# ১৬. Step — `F9`

`Step` code line-by-line execute করে।

যদি current line-এ function call থাকে, Step function-এর ভিতরেও ঢুকে execution দেখায়।

Example:

```js
logger(message);
```

`F9` press করলে:

1. `logger()` function-এর ভিতরে যাবে
2. function-এর line-by-line execution দেখাবে
3. function শেষে caller function-এ ফিরে আসবে

## কখন ব্যবহার করবে?

যখন তুমি নিশ্চিত নও bug কোথায়।

তুমি সব function-এর ভিতরে গিয়ে execution inspect করতে চাও।

---

# ১৭. Step Over — `F10`

`Step Over` current line execute করে, কিন্তু called function-এর ভিতরে debug করে না।

Example:

```js
logger(message);
```

`F10` press করলে:

- `logger()` execute হবে
- কিন্তু debugger function body-তে ঢুকবে না
- পরবর্তী line-এ যাবে

## গুরুত্বপূর্ণ

Step Over function skip করে না। Function execute হয়, শুধু ভিতরের line-by-line debugging দেখানো হয় না।

## কখন ব্যবহার করবে?

যখন function trusted এবং bug ওই function-এর ভিতরে নয় বলে মনে হয়।

---

# ১৮. Resume / Continue — `F8`

এক breakpoint থেকে পরবর্তী breakpoint-এ jump করতে ব্যবহৃত হয়।

ধরা যাক:

- Breakpoint ১ → line 4
- Breakpoint ২ → line 30

`F8` press করলে line-by-line না গিয়ে next breakpoint-এ যাবে।

যদি আর কোনো breakpoint না থাকে, program continue করবে।

---

# ১৯. Step Into — `F11`

Step Over করতে করতে যদি নির্দিষ্ট function suspicious মনে হয়, তখন Step Into ব্যবহার করা যায়।

```js
logger(message);
```

Function-এর ভিতরে ঢুকতে:

```text
F11
```

## কখন ব্যবহার করবে?

যখন:

- Function unexpected behave করছে
- Argument wrong হতে পারে
- Internal logic inspect করতে হবে
- Return value সন্দেহজনক

---

# ২০. Step Out — `Shift + F11`

Function-এর ভিতরে ঢোকার পরে যদি বুঝো সেখানে bug নেই, তাহলে function থেকে বের হয়ে caller-এ ফিরে যেতে Step Out ব্যবহার করো।

```text
Shift + F11
```

---

# ২১. Shortcut Table

| Action | Shortcut | কাজ |
|---|---|---|
| Resume / Continue | `F8` | Next breakpoint পর্যন্ত চলে |
| Step | `F9` | Line-by-line, function-এর ভিতরেও যায় |
| Step Over | `F10` | Line execute করে, function-এর ভিতরে যায় না |
| Step Into | `F11` | Function-এর ভিতরে যায় |
| Step Out | `Shift + F11` | Current function থেকে বের হয় |

> Practice task: এই table লিখে monitor-এর পাশে রাখো এবং নিজে ব্যবহার করো।

---

# ২২. Breakpoint Disable করা

সব breakpoint temporary disable করতে:

```text
Deactivate Breakpoints
```

এতে breakpoint delete হয় না, কিন্তু execution pause করবে না।

পরে আবার activate করা যায়।

---

# ২৩. Conditional Breakpoint

Normal breakpoint hit হলেই execution pause হয়।

কিন্তু অনেক function বহুবার call হতে পারে। প্রতি call-এ pause করলে debugging slow হয়ে যায়।

Conditional breakpoint শুধু condition true হলে pause করে।

Example condition:

```js
name === "John"
```

এখন:

- `Tapas` হলে pause করবে না
- `James` হলে pause করবে না
- `John` হলে pause করবে

## কীভাবে Set করবে?

Line number-এর ওপর right-click:

```text
Add conditional breakpoint
```

তারপর condition লিখো:

```js
name === "John"
```

Conditional breakpoint marker সাধারণত question mark-সহ আলাদা colour-এ দেখা যায়।

## Real-World Use Case

ধরা যাক function ১০০০ বার call হচ্ছে, কিন্তু bug শুধু:

```js
user.id === 782
```

তাহলে condition:

```js
user.id === 782
```

এতে শুধু relevant execution pause হবে।

---

# ২৪. Event Listener Breakpoints

Code-এর line না জেনেও event-এর ওপর breakpoint set করা যায়।

Debugger panel-এ:

```text
Event Listener Breakpoints
```

Category:

- Mouse
- Keyboard
- Control
- Clipboard
- Animation
- Timer

Example:

```text
Keyboard → keyup
```

এখন user key release করলে execution pause করবে।

## Use Case

যখন:

- কোন handler execute হচ্ছে জানো না
- UI event থেকে কোন code trigger হচ্ছে খুঁজছ
- Large codebase
- Third-party code
- Dynamic event binding

Mouse click breakpoint set করলে যেকোনো click handler trigger হওয়ার সময় pause হতে পারে।

---

# ২৫. DOM Breakpoints

DOM change হলেও breakpoint set করা যায়।

Elements panel-এ target element select করে right-click:

```text
Break on
```

Options:

1. Subtree modifications
2. Attribute modifications
3. Node removal

---

## Subtree Modification

Element-এর ভিতরে child add/remove হলে pause।

Example:

```html
<div id="output"></div>
```

Button click-এর পরে:

```html
<div id="output">
  <span>Hello...</span>
</div>
```

এখানে child `<span>` add হয়েছে। এটি subtree modification।

---

## Attribute Modification

যদি element-এর attribute change হয়:

```html
<div class="hidden">
```

থেকে:

```html
<div class="visible">
```

Breakpoint hit করবে।

---

## Node Removal

Element remove হলে pause।

```js
element.remove();
```

---

# ২৬. DOM Breakpoint দিয়ে Wish App Debug

Output element:

```html
<div id="output" class="content"></div>
```

Button click করলে JavaScript:

```js
document.getElementById("output").innerHTML =
  `<span>${message}</span>`;
```

Output div-এ right-click:

```text
Break on → Subtree modifications
```

Button click করলে execution ঠিক সেই code-এর কাছাকাছি pause করবে যেখানে DOM modify হচ্ছে।

এটি খুব শক্তিশালী, কারণ developer UI element থেকে JavaScript source পর্যন্ত trace করতে পারে।

---

# ২৭. Real Bug Debug করা

Bug:

```text
Hello Tapas, your wish NaN may come true.
```

Name সঠিক। Wish ভুল।

তাই name-এর আগে breakpoint দেওয়ার দরকার নেই। Wish read হওয়ার পরে breakpoint দেওয়া হবে।

Example:

```js
const name = getName();
const wish = getWish();

const message =
  "Hello " +
  name +
  ", your wish " +
  +wish +
  " may come true";
```

এখানে suspicious expression:

```js
+wish
```

---

# ২৮. Hover করে Variable Value দেখা

Execution pause অবস্থায় variable-এর ওপর mouse hover করলে value দেখা যায়।

```js
name
```

দেখায়:

```text
Tapas
```

```js
wish
```

দেখায়:

```text
Want to go to London
```

কিন্তু `message` line execute না হওয়া পর্যন্ত message value পাওয়া যাবে না।

Step করলে:

```text
Hello Tapas, your wish NaN may come true
```

এখন বোঝা গেল bug message construction-এ।

---

# ২৯. Unary Plus কেন `NaN` তৈরি করেছে

Expression:

```js
+wish
```

Unary plus string-কে number-এ convert করার চেষ্টা করে।

```js
+"123"
```

Result:

```text
123
```

কিন্তু:

```js
+"Want to go to London"
```

Result:

```text
NaN
```

কারণ string numeric নয়।

তাই extra `+` bug তৈরি করেছে।

Wrong:

```js
", your wish " + +wish + " may come true"
```

Correct:

```js
", your wish " + wish + " may come true"
```

আরও readable:

```js
const message =
  `Hello ${name}, your wish ${wish} may come true`;
```

---

# ৩০. DevTools-এ Temporary Code Edit

Sources editor-এ code temporary edit করা যায়।

Extra plus remove:

```js
+wish
```

থেকে:

```js
wish
```

তারপর:

```text
Ctrl + S
```

বা Mac:

```text
Command + S
```

Execution আবার test করলে output:

```text
Hello Tapas, your wish Want to go to Alaska may come true.
```

Bug fix হয়েছে।

---

# ৩১. গুরুত্বপূর্ণ Warning: Temporary Edit

DevTools-এ code edit করলে সবসময় original project file save হয় না।

Page refresh করলে change হারিয়ে যেতে পারে।

তাই test successful হলে actual source file-এ একই fix apply করতে হবে।

Example VS Code:

```js
const message =
  `Hello ${name}, your wish ${wish} may come true`;
```

---

# ৩২. Debugging Scope

Execution pause হলে Scope panel-এ variable দেখা যায়।

Scope categories:

- Local
- Closure
- Script
- Global

ধরা যাক:

```js
function printWish() {
  const name = getName();
  const wish = getWish();

  const message =
    `Hello ${name}, your wish ${wish} may come true`;

  logger(message);
}
```

Breakpoint message declaration-এর আগে হলে:

- `name` initialized
- `wish` initialized
- `message` unavailable

---

# ৩৩. `var` বনাম `let` / `const` Scope Observation

যদি:

```js
var message;
```

তাহলে initialization phase-এ value হতে পারে:

```text
undefined
```

কিন্তু:

```js
const message = ...
```

Line execute হওয়ার আগে DevTools দেখাতে পারে:

```text
unavailable
```

কারণ `let` এবং `const` temporal dead zone-এ থাকে।

---

# ৩৪. `this` Value Inspect

Non-strict regular function-এ `this` অনেক ক্ষেত্রে browser global object `window` হতে পারে।

Scope panel-এ:

```text
this: Window
```

দেখা যেতে পারে।

Strict mode, arrow function, method call ইত্যাদিতে `this` behaviour আলাদা হতে পারে।

---

# ৩৫. Call Stack Debugging

Call Stack panel দেখায় function call chain।

Example:

```text
logger
print
onclick
```

Meaning:

1. User click করেছে
2. `print()` call হয়েছে
3. `print()` থেকে `logger()` call হয়েছে
4. বর্তমানে debugger `logger()`-এর ভিতরে

এটি execution context বোঝার জন্য খুব useful।

---

# ৩৬. Restart Frame

Current function আবার শুরু থেকে run করতে চাইলে call stack item-এর ওপর right-click:

```text
Restart frame
```

এতে পুরো form fill বা UI action repeat না করেও function frame আবার debug করা যায়।

## Use Case

একই function logic বারবার inspect করতে চাইলে।

---

# ৩৭. Copy Stack

Call stack right-click:

```text
Copy stack
```

Paste করলে এমন trace পাওয়া যায়:

```text
logger at index.js:12
print at index.js:18
onclick at index.html:16
```

Bug report, team discussion বা issue tracker-এ useful।

---

# ৩৮. Watch Panel

একটি variable বারবার hover না করে Watch panel-এ add করা যায়।

Example:

```js
wish
```

Add করতে:

```text
Watch → + → wish
```

Breakpoint hit হলে value automatically update হবে।

আরেকটি:

```js
message
```

Line execute হওয়ার আগে unavailable, পরে computed value দেখাবে।

---

# ৩৯. Watch Expression

শুধু variable নয়, expression-ও watch করা যায়।

Example:

```js
`My wish is ${wish}`
```

Debugger pause থাকলে expression runtime value দেখাবে।

আরও example:

```js
name.length
```

```js
wish.toUpperCase()
```

```js
Number.isNaN(+wish)
```

---

# ৪০. Console Drawer

Sources panel-এর ভেতর Console drawer open করা যায়।

Menu:

```text
Show console drawer
```

এতে একই screen-এ দেখা যায়:

- Source code
- Breakpoint
- Console
- Runtime expression

এটি debugging environment আরও powerful করে।

---

# ৪১. `debugger` Keyword

JavaScript নিজেই execution pause করার keyword দেয়:

```js
debugger;
```

Example:

```js
function printWish() {
  const name = getName();
  const wish = getWish();

  debugger;

  const message =
    `Hello ${name}, your wish ${wish} may come true`;
}
```

DevTools open থাকলে execution `debugger` line-এ pause করবে।

## সুবিধা

Explicit breakpoint manually set করতে হয় না।

## অসুবিধা

Source code-এ রেখে দিলে unwanted pause হতে পারে।

## Instructor-এর পরামর্শ

DevTools breakpoint available থাকলে `debugger` keyword বেশি ব্যবহার না করাই ভালো।

---

# ৪২. Debugging Intuition Experience-এর সঙ্গে বাড়ে

Beginner অবস্থায় অনেক breakpoint set করা স্বাভাবিক।

Experience বাড়লে developer আন্দাজ করতে পারে:

- Problem data conversion-এ
- Problem API response-এ
- Problem condition-এ
- Problem DOM update-এ
- Problem async timing-এ
- Problem scope-এ

তখন breakpoint কম লাগে এবং relevant জায়গার কাছাকাছি set করা যায়।

---

# ৪৩. Workspace কী?

DevTools Sources editor-এ change করলে সাধারণত temporary change হয়।

Workspace ব্যবহার করলে DevTools local source folder-এর সঙ্গে sync করতে পারে।

তখন DevTools-এ edit করলে actual local file update হয়।

---

# ৪৪. Workspace Add করা

Sources panel থেকে Workspace section-এ যাও।

তারপর:

```text
Add folder
```

Project folder select করো।

Browser permission চাইবে:

```text
DevTools requests full access to this folder
```

Allow করো।

এরপর project files DevTools-এ দেখা যাবে:

- `index.html`
- `index.css`
- `index.js`

---

# ৪৫. Workspace দিয়ে CSS Edit

ধরা যাক:

```css
.button {
  border-color: #ec70db;
}
```

DevTools থেকে change:

```css
.button {
  border-color: teal;
}
```

Save:

```text
Ctrl + S
```

এখন:

- Browser UI change হবে
- Local `index.css` file-ও update হবে

---

# ৪৬. Workspace দিয়ে Bug Fix

Wrong code:

```js
const message =
  "Hello " +
  name +
  ", your wish " +
  +wish +
  " may come true";
```

DevTools workspace থেকে extra plus remove:

```js
const message =
  "Hello " +
  name +
  ", your wish " +
  wish +
  " may come true";
```

Save করলে local `index.js` file-ও update হবে।

এখন DevTools এবং VS Code sync থাকবে।

---

# ৪৭. Workspace Two-Way Sync

VS Code থেকে file edit করলে browser update হতে পারে।

DevTools থেকে edit করলে local file update হতে পারে।

এটি two-way workflow তৈরি করে।

Workspace remove করতে:

```text
Right-click folder → Remove from workspace
```

---

# ৪৮. VS Code-এ Debugging

Chrome DevTools-এর মতো VS Code-এও breakpoint set করা যায়।

Line number-এর পাশে click করলে red dot দেখা যায়।

কিন্তু আগে debugging environment configure করতে হবে।

---

# ৪৯. Run and Debug

VS Code sidebar:

```text
Run and Debug
```

Click করলে environment select করতে পারে:

- Node.js
- Chrome Web App
- Edge Web App
- Jest
- VS Code Extension

Web application Chrome-এ run করলে select:

```text
Web App (Chrome)
```

---

# ৫০. `launch.json`

VS Code `.vscode` folder-এর ভিতরে `launch.json` তৈরি করে।

Example:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5500",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

## Properties

### `type`

Debugger type।

```json
"type": "chrome"
```

### `request`

New browser launch করবে:

```json
"request": "launch"
```

### `name`

Configuration display name।

### `url`

Application URL:

```json
"url": "http://localhost:5500"
```

### `webRoot`

Source mapping-এর root:

```json
"webRoot": "${workspaceFolder}"
```

---

# ৫১. VS Code Debug Start

Run and Debug panel থেকে play button press করো।

VS Code Chrome launch করবে।

Application open হবে।

তারপর source line-এ breakpoint set করো।

Button click করলে VS Code breakpoint hit করবে।

---

# ৫২. VS Code Debugger Features

VS Code-এ পাওয়া যায়:

- Breakpoint
- Step Over
- Step Into
- Step Out
- Continue
- Scope
- Variables
- Watch
- Call Stack
- Debug Console
- Event listener breakpoints
- Restart frame
- Copy call stack

Conceptually Chrome DevTools-এর মতো।

---

# ৫৩. VS Code-এ Breakpoint Manage

Breakpoints panel থেকে:

- Enable
- Disable
- Delete
- Conditional breakpoint
- Exception breakpoint

Breakpoint uncheck করলে delete হয় না, শুধু inactive হয়।

---

# ৫৪. Chrome DevTools বনাম VS Code Shortcut

Chrome DevTools-এ next breakpoint:

```text
F8
```

VS Code-এ continue সাধারণত:

```text
F5
```

Concept একই, shortcut কিছুটা ভিন্ন।

---

# ৫৫. কখন Chrome DevTools ব্যবহার করবে?

Chrome DevTools বেশি useful যখন:

- DOM inspect করতে হবে
- CSS live edit
- Network request debug
- Storage inspect
- Performance profile
- Browser-specific issue
- Event listener breakpoint
- DOM breakpoint
- Runtime source inspect

---

# ৫৬. কখন VS Code ব্যবহার করবে?

VS Code debugger useful যখন:

- Source code-এর মধ্যে থাকতে চাও
- Node.js debug
- Full project context দরকার
- Local variables inspect
- Call stack inspect
- Breakpoint source-এর পাশে রাখতে চাও
- Multiple files navigate করতে হবে

---

# ৫৭. Seven Top Debugging Tips

এখন tooling-এর বাইরে debugging-এর art নিয়ে আলোচনা করা যাক।

---

## Tip 1: Bug তৈরি হওয়া Accept করো

Debugging অনেকটা crime movie-এর detective work-এর মতো—কিন্তু culprit অনেক সময় developer নিজেই।

Developer-রা bug তৈরি করে। এটি স্বাভাবিক।

গুরুত্বপূর্ণ হলো:

- দায়িত্ব নেওয়া
- Bug reproduce করা
- Root cause খোঁজা
- Fix করা
- একই mistake থেকে শেখা

নিজেকে ব্যর্থ ভাবার দরকার নেই।

---

## Tip 2: Bigger Picture দেখো

এক component-এর bug fix অন্য component ভেঙে দিতে পারে।

তাই fix করার আগে বোঝো:

- Module সম্পর্ক
- Data flow
- Component communication
- State ownership
- API dependency
- Shared utility
- Side effect

একটি local fix global regression তৈরি করছে কি না দেখতে হবে।

---

## Tip 3: অন্যের Code Debug করো

Organization-এ অনেক developer কাজ করে।

তুমি অন্যের code debug করবে, অন্য কেউ তোমার code debug করবে।

অন্যের code debug করলে:

- Code reading skill বাড়ে
- Assumption কমে
- Confidence বাড়ে
- Architecture understanding বাড়ে
- Pattern recognition উন্নত হয়

Open-source project-এ issue explore করা ভালো practice।

---

## Tip 4: Discuss করো এবং অন্য Angle দেখো

অনেকক্ষণ debug করেও solution না পেলে peer-এর সঙ্গে discuss করো।

অন্য developer:

- Similar issue আগে solve করেছে
- Different perspective দিতে পারে
- Missed assumption ধরতে পারে
- Simpler approach দেখাতে পারে

Discussion debugging accelerate করে।

---

## Tip 5: Right Tool ব্যবহার করো

শুধু `console.log()` নয়।

Use:

- Breakpoint
- Conditional breakpoint
- Watch
- Scope
- Call stack
- Network tab
- DOM breakpoint
- Event listener breakpoint
- Performance profiler
- Workspace
- VS Code debugger

Tool selection problem অনুযায়ী হওয়া উচিত।

---

## Tip 6: Break নাও

দীর্ঘ সময় একই bug দেখলে cognitive fatigue হয়।

অনেক developer experience করেছে:

- রাত ৩টা পর্যন্ত solve হয়নি
- ঘুমের পরে সকালে solution স্পষ্ট হয়েছে

Break creativity ও productivity বাড়াতে পারে।

করতে পারো:

- Coffee break
- Fresh air
- Short walk
- Food
- অন্য কারও সঙ্গে কথা
- কিছু সময় screen থেকে দূরে থাকা

Break মানে give up নয়। Break মানে reset।

---

## Tip 7: Give Up করো না

Debugging-এর জন্য দরকার:

- Time
- Patience
- Energy
- Curiosity
- Discipline
- Attitude

কখনও মনে হবে:

> “সব চেষ্টা শেষ।”

তখন:

1. আবার শুরু থেকে দেখো
2. Steps compare করো
3. Assumption verify করো
4. Input inspect করো
5. State compare করো
6. Gap খুঁজো
7. Different tool ব্যবহার করো
8. Peer-এর সঙ্গে discuss করো
9. Break নিয়ে ফিরে আসো

Giving up solution নয়।

---

# ৫৮. Common Debugging Mistakes

## Mistake 1: Code বারবার run করা

Same input, same code, same state—শুধু repeat করলে magically fix হবে না।

## Mistake 2: Everywhere `console.log()`

Too many logs noise তৈরি করে।

## Mistake 3: Reproduce না করে Fix শুরু

Issue reproduce না করলে fix verify কঠিন।

## Mistake 4: Symptom Fix, Root Cause নয়

`NaN` hide করলেই bug solve নয়। কেন `NaN` হলো তা জানতে হবে।

## Mistake 5: Function-এর ভিতরে না দেখা

Wrong input, wrong return, wrong side effect miss হতে পারে।

## Mistake 6: Call Stack Ignore

Caller ভুল হতে পারে, callee নয়।

## Mistake 7: Temporary DevTools Fix-কে Final Fix ভাবা

Refresh-এর পরে হারাতে পারে।

## Mistake 8: Bigger Picture না দেখা

এক fix অন্য flow break করতে পারে।

## Mistake 9: Break না নেওয়া

Fatigue error detection কমায়।

## Mistake 10: Tooling না শেখা

Professional debugging slow হয়।

---

# ৫৯. Practical Debugging Workflow

একটি professional debugging flow:

## Step 1: Bug Report বুঝো

- Expected কী?
- Actual কী?
- Steps কী?
- Environment কী?

## Step 2: Reproduce করো

Exact same flow run করো।

## Step 3: Logs দেখো

Console, network, error stack।

## Step 4: Scope Narrow করো

কোন function বা module responsible?

## Step 5: Breakpoint Set করো

Relevant line-এর আগে।

## Step 6: State Inspect করো

- Input
- Variable
- Scope
- Call stack
- Return value

## Step 7: Step Carefully

- F9
- F10
- F11
- Shift + F11
- F8

## Step 8: Root Cause Confirm করো

Guess নয়—evidence।

## Step 9: Temporary Fix Test করো

DevTools edit বা local change।

## Step 10: Source Fix করো

Actual codebase update।

## Step 11: Regression Test

Related flow test করো।

## Step 12: Document করো

Root cause এবং fix note করো।

---

# ৬০. Practice Task

এই lesson-এর formal coding task নেই। তোমার task হলো debugging tools নিজে ব্যবহার করা।

## Task 1: Basic Breakpoint

একটি function-এ breakpoint set করো।

## Task 2: Step Controls

Practice:

```text
F8
F9
F10
F11
Shift + F11
```

## Task 3: Conditional Breakpoint

Condition:

```js
name === "John"
```

## Task 4: Event Listener Breakpoint

Keyboard:

```text
keyup
```

Mouse:

```text
click
```

## Task 5: DOM Breakpoint

একটি element-এ:

```text
Subtree modification
```

## Task 6: Scope

Local variable এবং global variable inspect করো।

## Task 7: Call Stack

Nested function call debug করো।

## Task 8: Watch

দুটি variable এবং একটি expression watch করো।

## Task 9: `debugger`

একবার source code-এ ব্যবহার করো, তারপর remove করো।

## Task 10: Workspace

Local folder DevTools-এর সঙ্গে connect করো।

## Task 11: VS Code

`launch.json` configure করে browser debug করো।

## Task 12: Bug Fix

Intentional bug তৈরি করো:

```js
const value = +"hello";
```

তারপর breakpoint দিয়ে `NaN` root cause খুঁজে fix করো।

---

# ৬১. Final Recap

এই chapter-এ আমরা শিখেছি:

- Bug হলো expected এবং actual behaviour-এর mismatch
- Debugging bug track করার process
- Fixing bug remove করার process
- `console.log()` useful, কিন্তু যথেষ্ট নয়
- DevTools-এর Sources panel professional debugging-এর core tool
- Breakpoint execution pause করে
- `F9` line-by-line এবং function-এর ভিতরে যায়
- `F10` function execute করে কিন্তু ভিতরে debug করে না
- `F11` function-এর ভিতরে যায়
- `Shift + F11` function থেকে বের হয়
- `F8` next breakpoint-এ যায়
- Conditional breakpoint নির্দিষ্ট condition-এ pause করে
- Event listener breakpoint global event trace করে
- DOM breakpoint UI change থেকে JavaScript code trace করে
- Hover, Scope, Call Stack এবং Watch state inspection সহজ করে
- `debugger` keyword code থেকে pause করতে পারে
- Workspace DevTools এবং local files sync করে
- VS Code debugger একই concept source editor-এর ভিতরে দেয়
- `launch.json` VS Code debugging configure করে
- Debugging science এবং art—দুটিই
- Break নেওয়া, discuss করা, bigger picture দেখা এবং give up না করা গুরুত্বপূর্ণ

সবচেয়ে গুরুত্বপূর্ণ কথা:

> একজন ভালো programmer শুধু code লিখতে জানে না। সে bug reproduce করতে পারে, execution বুঝতে পারে, root cause identify করতে পারে এবং confidence-এর সঙ্গে fix verify করতে পারে।

Debugging যত ভালো হবে, development তত reliable, predictable এবং professional হবে।
