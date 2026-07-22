Day 20: JavaScript দিয়ে Advanced DOM Tips, Tricks ও Best Practices

ভূমিকা

Day 20-এ স্বাগতম। ৪০ দিনের JavaScript initiative-এর আমরা আজ ঠিক ৫০% সম্পন্ন করলাম। তাই এটি নিঃসন্দেহে একটি গুরুত্বপূর্ণ এবং সফল দিন।

আজ আমরা JavaScript ব্যবহার করে DOM-এর কিছু তুলনামূলক advanced tips, tricks এবং best practices শিখব। এগুলো project বা product-এ ব্যবহার করলে কম code লিখে আরও clean, maintainable এবং efficient solution তৈরি করা যায়।

এই lesson-এ আমরা বিশেষভাবে শিখব:

Efficient DOM traversal

HTML template এবং cloning

DocumentFragment

Range

Shadow DOM

Advanced class manipulation

Large-scale DOM updates

MutationObserver

আমাদের লক্ষ্য শুধু syntax শেখা নয়। বরং কেন একটি approach অন্যটির তুলনায় ভালো, কোথায় performance problem হতে পারে, এবং কীভাবে DOM manipulation আরও professionalভাবে করা যায়—সেগুলো বোঝা।

Programming fundamentals, logic building এবং problem solving শেখার জন্য নিয়মিত practice করো, আলোচনা করো এবং developer community-এর সঙ্গে যুক্ত থাকো। এখন আর দেরি না করে শুরু করা যাক।

1. Efficient DOM Traversal

আমরা ইতিমধ্যে DOM traversal সম্পর্কে জেনেছি। DOM মূলত একটি hierarchical structure। এখানে:

parent থেকে child-এ যাওয়া যায়,

child থেকে parent-এ যাওয়া যায়,

এক sibling থেকে আরেক sibling-এ যাওয়া যায়।

কিন্তু শুধু traversal করতে পারলেই হবে না; traversal-এর optimal উপায়ও জানতে হবে। কারণ complex DOM tree বা বড় DOM structure-এ traversal costly হতে পারে।

ধরা যাক, index.html-এ একটি div আছে যার class হলো card, এবং তার ভেতরে আরও কয়েকটি div আছে। Structure-টি এমন হতে পারে:

<div class="card">
  <div>First Child</div>
  <div>Second Child</div>
  <div>Last Child</div>
</div>

এখন প্রশ্ন হলো: প্রতিটি element-এ আলাদা id না বসিয়ে, unnecessary loop না চালিয়ে এবং প্রতিটি element আলাদাভাবে query না করে কীভাবে efficiently traverse করা যায়?

Beginner-দের একটি সাধারণ ভুল

অনেক beginner প্রতিটি element-এ আলাদা id যোগ করে এবং পরে সেই id দিয়ে প্রতিটি element access করতে চায়। যেমন:

<div id="first-child">...</div>
<div id="second-child">...</div>
<div id="third-child">...</div>

তারপর JavaScript-এ:

const firstChild = document.getElementById("first-child");
const secondChild = document.getElementById("second-child");
const thirdChild = document.getElementById("third-child");

এই approach-এর কয়েকটি সমস্যা আছে:

অনেক variable manage করতে হয়।

প্রতিটি variable-এর সঙ্গে আলাদা element reference রাখতে হয়।

Code অপ্রয়োজনীয়ভাবে বড় ও messy হয়ে যায়।

DOM query বারবার করার কারণে performance cost বাড়তে পারে।

এর পরিবর্তে একটি parent element query করে, সেখান থেকে তার child, sibling, parent বা grandchild-এ traverse করা যায়।

Parent element query করা

প্রথমে card class-যুক্ত parent element-টি query করি:

const parent = document.querySelector(".card");

এখন parent variable-এর মাধ্যমে পুরো structure-এর বিভিন্ন অংশে যাওয়া যাবে।

First child access করা

প্রথম child element পেতে:

const firstChild = parent.firstElementChild;

এখানে firstElementChild ব্যবহার করছি, কারণ আমরা HTML element চাই। শুধু firstChild ব্যবহার করলে text node-ও পাওয়া যেতে পারে।

এই rule-টি মনে রাখো:

HTML element নিয়ে কাজ করলে সাধারণত firstElementChild, lastElementChild, nextElementSibling ইত্যাদি ব্যবহার করা নিরাপদ ও পরিষ্কার।

Next sibling access করা

প্রথম child-এর পরের sibling পেতে:

const nextSibling = firstChild.nextElementSibling;

এটি firstChild-এর ঠিক পরের element sibling return করবে।

Last child access করা

Parent-এর শেষ child পেতে:

const lastChild = parent.lastElementChild;

firstElementChild যেমন প্রথম child দেয়, lastElementChild তেমনি শেষ child দেয়।

Child থেকে parent-এ যাওয়া

কোনো child element থেকে তার parent পেতে:

const parentAgain = firstChild.parentElement;

এক্ষেত্রে parentAgain আবার সেই .card element-টিকেই নির্দেশ করবে।

Traversal flow বোঝা

একটি element reference পেলে সেখান থেকে বিভিন্ন দিকে যাওয়া যায়:

Parent → Child

Child → Parent

Child → Next sibling

Child → Previous sibling

Child → Grandchild

Child → Parent → Parent-এর sibling

অতএব, প্রতিটি element-এ আলাদা id বসিয়ে query করা সবসময় প্রয়োজন হয় না। একটি useful parent বা nearby element ধরে traversal করলে code অনেক cleaner হয়।

Common Mistake

প্রতিটি element-এ id যোগ করা

DOM access সহজ করার জন্য প্রতিটি element-এ id দেওয়া tempting হতে পারে। কিন্তু এতে:

variable বেড়ে যায়,

query বেড়ে যায়,

code tightly coupled হয়,

maintainability কমে।

Best Practice

যেখানে সম্ভব:

একটি meaningful parent query করো।

firstElementChild, lastElementChild, children, parentElement, nextElementSibling ইত্যাদি ব্যবহার করো।

Unnecessary DOM query এড়িয়ে চলো।

UI-কে sluggish কোরো না। প্রয়োজনের অতিরিক্ত manipulation না করে এমনভাবে DOM traverse করো যাতে code flexible এবং clean থাকে।

2. HTML Template এবং Cloning

এখন আমরা template এবং cloning নিয়ে আলোচনা করব।

HTML-এর <template> একটি বিশেষ tag। এই tag-এর ভেতরে যা রাখা হয়, তা সরাসরি main DOM-এ render হয় না। বরং সেটি একটি fragment হিসেবে থাকে, যেটি JavaScript দিয়ে access, clone এবং পরে DOM-এ insert করা যায়।

ধরা যাক, আমরা একই structure-এর একাধিক card dynamically তৈরি করতে চাই। প্রতিটি card-এর title এবং description আলাদা হবে, কিন্তু HTML structure একই থাকবে।

index.html-এ একটি template লেখা যেতে পারে:

<template id="card-template">
  <div class="card">
    <h2 class="title"></h2>
    <p class="description"></p>
  </div>
</template>

Template কেন useful?

এখানে card-এর পুরো structure template-এর ভেতরে রাখা হয়েছে। কিন্তু browser page-এ এটি এখনো visible নয়। DevTools-এ inspect করলে template-এর ভেতরে একটি DocumentFragment দেখা যাবে।

অর্থাৎ:

Structure browser জানে,

JavaScript এটিকে access করতে পারে,

কিন্তু এটি এখনো main DOM-এর অংশ নয়,

তাই page-এ render হয় না।

এই structure clone করে প্রয়োজনমতো বহু card তৈরি করা যায়।

Template access করা

প্রথমে template-টি access করি:

const template = document.getElementById("card-template");

Template content clone করা

এরপর template-এর content clone করি:

const clone = template.content.cloneNode(true);

এখানে true দেওয়ার অর্থ হলো deep cloning। অর্থাৎ template-এর nested structure-সহ সব child element clone হবে।

যদি false দেওয়া হতো, তাহলে শুধু top-level node clone হতো; nested content clone নাও হতে পারত।

Clone-এর title পরিবর্তন করা

Clone-এর ভেতরের .title element query করে text বসাই:

clone.querySelector(".title").textContent = "DOM Advanced Topic";

Clone-এর description পরিবর্তন করা

একইভাবে description বসাই:

clone.querySelector(".description").textContent =
  "Hope you are learning something new.";

Clone main DOM-এ append করা

সবশেষে clone-টিকে document body-তে append করি:

document.body.appendChild(clone);

এখন page-এ একটি নতুন card render হবে। Expected structure হবে:

<div class="card">
  <h2 class="title">DOM Advanced Topic</h2>
  <p class="description">Hope you are learning something new.</p>
</div>

এই code-কে reusable function-এ রূপান্তর করা

Template cloning-এর code একটি function-এর ভেতরে রাখা যায়। Function-টি title এবং description parameter গ্রহণ করবে:

function createCard(title, description) {
  const template = document.getElementById("card-template");
  const clone = template.content.cloneNode(true);

  clone.querySelector(".title").textContent = title;
  clone.querySelector(".description").textContent = description;

  document.body.appendChild(clone);
}

এখন বিভিন্ন data দিয়ে function call করা যায়:

createCard("DOM Advanced Topic", "Hope you are learning something new.");
createCard("JavaScript Template", "Templates make reusable UI easier.");

এভাবে একই structure বারবার manually create করতে হয় না।

কেন এটি ভালো approach?

এই approach-এ:

HTML structure এক জায়গায় থাকে,

UI component reusable হয়,

JavaScript code cleaner হয়,

main DOM-এর বাইরে structure প্রস্তুত করা যায়,

clone করে দ্রুত multiple element তৈরি করা যায়।

Template মূলত DocumentFragment-এর সুবিধা ব্যবহার করে। পরের section-এ আমরা DocumentFragment আরও বিস্তারিতভাবে দেখব।

3. DocumentFragment

DocumentFragment-কে একটি lightweight, invisible container হিসেবে ভাবা যায়। এটি একাধিক DOM node অস্থায়ীভাবে group করে রাখতে ব্যবহৃত হয়, main DOM-এ attach করার আগে।

এটি page-এ নিজে visible হয় না। কিন্তু এর ভেতরে element create, append এবং modify করা যায়। সব কাজ শেষ হলে পুরো fragment একবারে main DOM-এ যোগ করা যায়।

কেন DocumentFragment ব্যবহার করা হয়?

DOM-এর ছোট একটি অংশ পরিবর্তন করলেও browser-কে UI update বা repaint করতে হতে পারে। বারবার main DOM পরিবর্তন করলে performance খারাপ হতে পারে।

তাই আমরা:

Main DOM-এর বাইরে element তৈরি করি,

DocumentFragment-এ সেগুলো রাখি,

প্রয়োজনীয় processing শেষ করি,

তারপর fragment-টি একবারে main DOM-এ append করি।

এতে repaint কমে এবং performance improve হয়।

DocumentFragment-এর key features

Main DOM tree-তে insert না করা পর্যন্ত এটি main DOM-এর অংশ নয়।

এটি temporary container হিসেবে কাজ করে।

DOM-এর একটি chunk তৈরি করার জন্য খুব useful।

একাধিক node একবারে append করা যায়।

Repaint এবং reflow কমাতে সাহায্য করে।

Example: list item তৈরি করা

index.html-এ একটি unordered list আছে:

<ul id="list"></ul>

এখন JavaScript-এ একটি fragment তৈরি করি:

const fragment = document.createDocumentFragment();

এরপর loop চালিয়ে কয়েকটি li তৈরি করি। Instructor তিনটি item বললেও condition i <= 3 হওয়ায় বাস্তবে চারটি item তৈরি হবে—Item 0 থেকে Item 3 পর্যন্ত।

for (let i = 0; i <= 3; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}

এখানে লক্ষ্য করো, আমরা সরাসরি ul-এ li append করছি না। প্রতিটি li fragment-এ append করছি।

সব item তৈরি হওয়ার পর fragment-টি list-এ append করি:

document.getElementById("list").appendChild(fragment);

Expected output

DOM-এ list হবে:

<ul id="list">
  <li>Item 0</li>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

কেন চারটি item তৈরি হলো?

Loop condition ছিল:

i <= 3

অতএব i-এর value হবে:

0

1

2

3

মোট চারবার loop চলবে। যদি সত্যিই তিনটি item প্রয়োজন হতো, condition হতে পারত:

i < 3

তবে মূল lecture flow অনুযায়ী এখানে চারটি item তৈরি হয়েছে এবং সেটিই expected behavior।

Main DOM-এ সরাসরি append না করার সুবিধা

যদি loop-এর ভেতরে এমন করা হতো:

document.getElementById("list").appendChild(li);

তাহলে প্রতি iteration-এ main DOM পরিবর্তিত হতো। কিন্তু fragment ব্যবহারে main DOM শেষে একবার পরিবর্তিত হচ্ছে।

এই difference ছোট example-এ খুব noticeable নাও হতে পারে, কিন্তু শত বা হাজার element create করার সময় এটি গুরুত্বপূর্ণ।

4. Range

Range একটি document-এর এমন অংশকে represent করে, যা দুটি boundary point-এর মাঝখানে অবস্থিত।

অর্থাৎ, document বা element content-এর একটি নির্দিষ্ট অংশ select, manipulate, extract বা clone করতে Range ব্যবহার করা যায়।

Range কোথায় useful?

Range বিশেষভাবে useful:

Text selection

Content highlighting

Selected content replace করা

Rich text editor

Programmatic editor

নির্দিষ্ট text বা node fragment clone করা

Monaco Editor বা অন্যান্য rich text editor-এ user যখন একটি text অংশ select করে, highlight করে বা replace করে, তখন Range-এর মতো DOM API কাজে লাগে।

Example HTML

index.html-এ একটি paragraph ধরা যাক:

<p id="para">Hello <strong>World</strong> and Universe</p>

Browser-এ এটি render হবে:

Hello World and Universe

এখন আমরা Hello -এর পর থেকে and-এর একটি অংশ পর্যন্ত content select করার চেষ্টা করব।

Paragraph access করা

const p = document.getElementById("para");

Range তৈরি করা

const range = document.createRange();

document.createDocumentFragment()-এর মতোই document.createRange() একটি Range object তৈরি করে।

Start boundary নির্ধারণ করা

range.setStart(p.firstChild, 6);

এখানে:

p.firstChild হলো Hello  text node,

offset 6 মানে ছয়টি character পার হওয়ার পর selection শুরু হবে।

Hello-এর পাঁচটি letter এবং একটি space মিলিয়ে offset 6। তাই selection Hello -এর পরে, অর্থাৎ <strong>World</strong> থেকে শুরু হবে।

End boundary নির্ধারণ করা

range.setEnd(p.childNodes[2], 4);

p.childNodes-এ element এবং text node—দুটিই থাকে। এই paragraph-এর child nodes আনুমানিকভাবে:

0 → "Hello " text node
1 → <strong>World</strong>
2 → " and Universe" text node

p.childNodes[2] হলো " and Universe" text node। Offset 4 দিলে এই text node-এর প্রথম চারটি character পর্যন্ত selection যাবে।

Character count:

" "  → 1
"a"  → 2
"n"  → 3
"d"  → 4

অতএব selection হবে:

<strong>World</strong> and

Selected content clone করা

const content = range.cloneContents();
console.log(content);

cloneContents() selected portion-টিকে clone করে এবং একটি DocumentFragment return করে। এটি সরাসরি মূল DOM element return করে না।

Expected cloned fragment conceptually হবে:

<strong>World</strong> and

Expected output এবং কারণ

Selection শুরু হয়েছে Hello -এর পর থেকে এবং শেষ হয়েছে " and Universe" text node-এর প্রথম চারটি character পর্যন্ত। তাই output-এ <strong>World</strong> এবং  and থাকবে।

Console-এ এটি DocumentFragment হিসেবে দেখা যাবে। কারণ Range.cloneContents() একটি fragment তৈরি করে।

Range দিয়ে highlighting

Range থেকে content clone করার পর সেটিকে main DOM-এর বাইরে modify করা যায়। যেমন selected portion-এ yellow background দেওয়া যেতে পারে। তারপর modified fragment main DOM-এ append করা যায়।

Conceptually:

const content = range.cloneContents();

const wrapper = document.createElement("span");
wrapper.style.backgroundColor = "yellow";
wrapper.appendChild(content);

document.body.appendChild(wrapper);

এখানে মূল ধারণা হলো: main DOM-এ সরাসরি বারবার change না করে, selection বা content fragment আগে prepare করা যায়, তারপর একবারে insert করা যায়।

Rich text editor-এ ব্যবহার

কোনো editor-এ user একটি sentence বা phrase select করে “Highlight” চাপলে সাধারণত flow হতে পারে:

Selection-এর boundary identify করা,

Range তৈরি করা,

Selected content extract বা clone করা,

Styling apply করা,

Modified content DOM-এ insert করা।

এই কারণেই Range এবং DocumentFragment dynamic DOM manipulation-এ গুরুত্বপূর্ণ।

5. Shadow DOM

এখন আমরা Shadow DOM-এর একটি introduction দেখব। এটি একটি বড় এবং আলাদা বিষয়, তাই এখানে খুব গভীরে যাওয়া হবে না। বিস্তারিত শেখার জন্য MDN বা অন্য নির্ভরযোগ্য tutorial পড়া যেতে পারে।

Main DOM কী?

DOM বা Document Object Model হলো পুরো web page structure-এর representation।

আমরা DOM ব্যবহার করি:

HTML element access করতে,

dynamic behavior যোগ করতে,

content render করতে,

element manipulate করতে,

JavaScript দিয়ে page update করতে,

CSS দিয়ে styling পরিবর্তন করতে।

ধরা যাক:

<div class="card">
  <h2>Title</h2>
  <p>Description</p>
</div>

এটি query করা যায়:

const card = document.querySelector(".card");

তার পুরো HTML structure পাওয়া যায়:

console.log(card.innerHTML);

Main DOM-এর element সাধারণত JavaScript এবং CSS দিয়ে accessible ও modifiable।

Shadow DOM কী?

Shadow DOM main DOM নয়। এটি মূলত web component তৈরির জন্য ব্যবহৃত একটি isolated, encapsulated DOM tree।

এখানে:

HTML structure isolate করা যায়,

CSS scope isolate করা যায়,

internal logic encapsulate করা যায়,

বাইরের page থেকে access control করা যায়।

Shadow DOM একটি regular HTML element-এর সঙ্গে attach করা হয়। যে element-এর সঙ্গে Shadow DOM attach হয়, তাকে shadow host বলা হয়।

Shadow host

ধরা যাক HTML-এ একটি div আছে:

<div id="box"></div>

এই div-টিকে regular DOM element হিসেবে access করা যায়:

const shadowHost = document.querySelector("#box");

এখনও এটি Shadow DOM নয়। এটি শুধু একটি normal element। Shadow DOM তৈরি করতে এর সঙ্গে shadow root attach করতে হবে।

Shadow root attach করা

const shadow = shadowHost.attachShadow({ mode: "open" });

এখানে attachShadow() একটি shadow root তৈরি করে।

mode: "open" এবং mode: "closed"

Open mode

{ mode: "open" }

Open mode হলে বাইরের JavaScript থেকে shadow root access করা যায়। Developer চাইলে encapsulated HTML, CSS বা element modify করতে পারে।

Closed mode

{ mode: "closed" }

Closed mode হলে বাইরের code থেকে shadow root সরাসরি access করা যায় না।

কোন mode ব্যবহার করবে, তা use case-এর ওপর নির্ভর করে।

Shadow DOM-এ HTML এবং CSS যোগ করা

shadow.innerHTML = `
  <style>
    p {
      color: red;
    }
  </style>
  <p>Hello Shadow</p>
`;

এখন page-এ Hello Shadow দেখা যাবে। DevTools-এ inspect করলে এটি shadow-root-এর ভেতরে দেখা যাবে।

এই style শুধু shadow root-এর ভেতরের p element-এর জন্য প্রযোজ্য। সাধারণ page-এর অন্য p tag-এ এই style প্রভাব ফেলবে না।

Encapsulation-এর সুবিধা

Shadow DOM-এর ভেতরে একসঙ্গে রাখা যায়:

HTML structure

CSS style

JavaScript behavior

এগুলো মিলে একটি reusable custom component তৈরি হতে পারে। পরে সেই component web component হিসেবে অন্য জায়গায় ব্যবহার করা যায়।

Custom element

Raw HTML এবং JavaScript দিয়েও custom element তৈরি করা যায়। Custom element-এর নাম সাধারণত hyphen-সহ লেখা হয়, যেমন:

<my-component></my-component>

Browser-এর built-in কিছু element-ও নিজেদের internal structure hide করে রাখে। যেমন video element-এর internal controls সাধারণ DOM structure-এর মতো সরাসরি দেখা যায় না। Shadow DOM-এর ধারণা এই ধরনের encapsulation-এর সঙ্গে সম্পর্কিত।

Main DOM বনাম Shadow DOM

বিষয়

Main/Browser DOM

Shadow DOM

Scope

Global এবং shared

Local এবং encapsulated

Styling

সাধারণত global CSS

Scoped এবং isolated CSS

Accessibility

বাইরে থেকে fully accessible

mode-এর ওপর নির্ভরশীল

Use case

Regular page ও element

Web component ও internal UI

Structure

Main document tree-এর অংশ

Shadow root-এর isolated tree

Important Note

Shadow DOM main DOM-এর বিকল্প নয়। এটি বিশেষভাবে encapsulated component তৈরির জন্য ব্যবহৃত হয়। DevTools-এও shadow root, shadow host এবং main DOM আলাদা করে দেখানো হয়।

এই lesson-এ শুধু high-level ধারণা নেওয়া হলো। বিষয়টি আলাদাভাবে practice করা উচিত।

6. Advanced Class Manipulation

এই অংশটি মূলত revision। আমরা class manipulation নিয়ে আগেও আলোচনা করেছি।

ধরা যাক HTML-এ একটি button আছে:

<button class="btn">Some Button</button>

Button query করি:

const button = document.querySelector(".btn");

Class manipulate করার জন্য className overwrite না করে সাধারণত classList ব্যবহার করা ভালো।

Class add করা

button.classList.add("active");

Class remove করা

button.classList.remove("active");

Class toggle করা

একই class conditionally add/remove করতে manual if দিয়ে বারবার add() এবং remove() করার প্রয়োজন নেই।

button.classList.toggle("active");

Class থাকলে remove হবে, না থাকলে add হবে।

Class replace করা

button.classList.replace("btn", "primary-btn");

এটি পুরোনো class-এর জায়গায় নতুন class বসায়।

সবচেয়ে বেশি ব্যবহৃত methods

Class manipulation-এ সাধারণত সবচেয়ে বেশি ব্যবহৃত হয়:

classList.add()
classList.remove()
classList.toggle()
classList.replace()

এই methods মনে রাখো। এগুলো code-কে concise এবং intention-revealing করে।

7. Handling Large-Scale DOM Updates

ধরা যাক, একসঙ্গে ১,০০০টি data বা element DOM-এ insert করতে হবে। কীভাবে efficientভাবে করা যায়?

এই lesson-এই আমরা solution দেখেছি: DocumentFragment ব্যবহার করা।

Function example

function addItems(count) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
  }

  document.body.appendChild(fragment);
}

Function call:

addItems(1000);

Step-by-step reasoning

Step 1: count parameter

function addItems(count)

count বলে দেয় কতটি element তৈরি হবে। এখানে 1000 pass করলে loop ১,০০০ বার চলবে।

Step 2: Fragment তৈরি

const fragment = document.createDocumentFragment();

Main DOM-এর বাইরে একটি temporary container তৈরি হলো।

Step 3: Loop-এর ভেতরে element তৈরি

const div = document.createElement("div");
div.textContent = `Item ${i}`;

প্রতি iteration-এ একটি নতুন div তৈরি হচ্ছে এবং text content বসানো হচ্ছে।

Step 4: Fragment-এ append

fragment.appendChild(div);

প্রতিটি div main DOM-এ নয়, fragment-এ যোগ হচ্ছে।

Step 5: একবারে main DOM-এ append

document.body.appendChild(fragment);

Loop শেষ হওয়ার পর পুরো fragment একবারে document.body-তে append হচ্ছে।

Direct append করলে কী সমস্যা হতো?

যদি loop-এর ভেতরে এমন লেখা হতো:

document.body.appendChild(div);

তাহলে ১,০০০ iteration-এ main DOM ১,০০০ বার পরিবর্তিত হতো। Browser-কে বহুবার repaint বা layout update করতে হতে পারত।

Fragment ব্যবহার করলে main DOM-এ append হচ্ছে মাত্র একবার।

Performance comparison

Costly approach

for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  document.body.appendChild(div);
}

এখানে main DOM repeatedly update হচ্ছে।

Efficient approach

const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  fragment.appendChild(div);
}

document.body.appendChild(fragment);

এখানে main DOM একবার update হচ্ছে।

কেন এটি গুরুত্বপূর্ণ?

এই ধরনের বিষয়ই amateur code এবং informed professional code-এর পার্থক্য তৈরি করে। শুধু code কাজ করছে কি না তা নয়; code কীভাবে কাজ করছে, browser-এর ওপর কত cost ফেলছে এবং scale করলে কী হবে—সেগুলোও বুঝতে হবে।

8. MutationObserver

এই video-এর শেষ topic হলো MutationObserver। এটি একটি built-in JavaScript API এবং DOM change observe করার জন্য অত্যন্ত useful।

ধরা যাক DOM-এ:

নতুন node যোগ হয়েছে,

কোনো node remove হয়েছে,

text পরিবর্তিত হয়েছে,

attribute পরিবর্তিত হয়েছে।

প্রতিনিয়ত polling করে এসব check করার পরিবর্তে MutationObserver change ঘটলে automatically callback execute করতে পারে।

MutationObserver কী?

MutationObserver একটি built-in JavaScript API, যা কোনো DOM element বা subtree-এর পরিবর্তন observe করে এবং change ঘটলে callback function-এর মাধ্যমে react করতে সাহায্য করে।

কখন ব্যবহার করা হয়?

এটি ব্যবহার করা যায় যখন জানতে হবে:

নতুন child node যোগ হয়েছে কি না,

child node remove হয়েছে কি না,

text content বদলেছে কি না,

attribute value পরিবর্তিত হয়েছে কি না,

subtree-এর কোথাও DOM mutation ঘটেছে কি না।

Basic syntax

MutationObserver ব্যবহারের দুটি মূল অংশ আছে:

Observer তৈরি করা

Target node observe করা

Conceptual syntax:

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

callback mutation ঘটলে execute হবে। config-এর মাধ্যমে বলা হবে কোন ধরনের mutation observe করতে চাই।

Example HTML

<div id="watch-me">Hello</div>
<button onclick="changeDOM()">Change DOM</button>

এখানে button click করলে DOM change করা হবে এবং observer সেই change detect করবে।

Target node access করা

const target = document.getElementById("watch-me");

এটি সেই node যেটি observe করা হবে।

Observer তৈরি করা

const observer = new MutationObserver((mutationList, observerReference) => {
  for (const mutation of mutationList) {
    console.log("Type of mutation is:", mutation.type);
  }
});

Callback দুটি parameter পায়:

mutationList: কী কী mutation হয়েছে তার list

observerReference: observer object-এর reference

Mutation list iterable, তাই for...of loop দিয়ে প্রতিটি mutation দেখা যায়।

Mutation type

Mutation-এর type বিভিন্ন হতে পারে। গুরুত্বপূর্ণ কয়েকটি হলো:

childList

Child node add বা remove হলে mutation type হয়:

childList

attributes

কোনো attribute change হলে mutation type হয়:

attributes

characterData

Text node-এর data পরিবর্তিত হলে mutation type হয়:

characterData

সব mutation type সম্পর্কে বিস্তারিত MDN documentation-এ পাওয়া যায়।

বিভিন্ন mutation handle করা

const observer = new MutationObserver((mutationList, observerReference) => {
  for (const mutation of mutationList) {
    console.log("Type of mutation is:", mutation.type);

    if (mutation.type === "childList") {
      console.log("A child node was added or removed.");
    }

    if (mutation.type === "attributes") {
      console.log(
        `The attribute ${mutation.attributeName} was changed.`
      );
    }

    if (mutation.type === "characterData") {
      console.log("The text content of the target data changed.");
    }
  }
});

Observer configuration

Observer কোন ধরনের change track করবে, তা config object-এ নির্ধারণ করা হয়:

const config = {
  subtree: true,
  characterData: true,
  childList: true,
  attributes: true,
};

এখানে:

subtree: true → target-এর descendants-এ change হলেও observe করবে

characterData: true → text node change track করবে

childList: true → child add/remove track করবে

attributes: true → attribute change track করবে

Target observe করা

observer.observe(target, config);

এখন observer target node এবং config অনুযায়ী mutation track করা শুরু করবে।

DOM change function

Button click করলে changeDOM() function execute হবে:

function changeDOM() {
  target.textContent = "Goodbye";
  target.setAttribute("data-status", "changed");
}

এখানে দুটি change হচ্ছে:

Hello থেকে text content Goodbye হচ্ছে।

data-status="changed" attribute যোগ হচ্ছে।

Expected mutation output

Button click করার পর console-এ সাধারণত এমন output দেখা যেতে পারে:

Type of mutation is: childList
A child node was added or removed.

Type of mutation is: attributes
The attribute data-status was changed.

কেন childList mutation হলো?

target.textContent = "Goodbye" দিলে browser পুরোনো text node remove করে নতুন text node বসাতে পারে। ফলে child list change হিসেবে mutation report হতে পারে।

অর্থাৎ:

Hello text node সরেছে,

Goodbye text node যোগ হয়েছে।

এই কারণে childList mutation পাওয়া যায়।

কেন attributes mutation হলো?

এই line:

target.setAttribute("data-status", "changed");

একটি attribute যোগ বা modify করছে। তাই mutation type হবে attributes।

MutationObserver দিয়ে কী করা যায়?

Callback-এর ভেতরে শুধু console.log() নয়, প্রয়োজন অনুযায়ী আরও কাজ করা যায়:

কোনো element hide করা,

element show করা,

নতুন fragment তৈরি করা,

main DOM-এ fragment append করা,

UI state update করা,

কোনো dependent action trigger করা।

ধরা যাক user button click করে একটি section expand করল। Expand করার কারণে DOM-এ নতুন node যোগ হলো। MutationObserver সেই change detect করে অন্য কোনো action trigger করতে পারে।

Polling-এর তুলনায় সুবিধা

MutationObserver ব্যবহার করলে বারবার এমন check করতে হয় না:

setInterval(() => {
  // DOM changed কি না check করা
}, 100);

Polling resource waste করতে পারে। MutationObserver event-drivenভাবে change ঘটলে callback চালায়।

Complete example

<div id="watch-me">Hello</div>
<button onclick="changeDOM()">Change DOM</button>

<script>
  const target = document.getElementById("watch-me");

  const observer = new MutationObserver((mutationList, observerReference) => {
    for (const mutation of mutationList) {
      console.log("Type of mutation is:", mutation.type);

      if (mutation.type === "childList") {
        console.log("A child node was added or removed.");
      }

      if (mutation.type === "attributes") {
        console.log(
          `The attribute ${mutation.attributeName} was changed.`
        );
      }

      if (mutation.type === "characterData") {
        console.log("The text content of the target data changed.");
      }
    }
  });

  const config = {
    subtree: true,
    characterData: true,
    childList: true,
    attributes: true,
  };

  observer.observe(target, config);

  function changeDOM() {
    target.textContent = "Goodbye";
    target.setAttribute("data-status", "changed");
  }
</script>

Practice Warning

MutationObserver শুধু পড়ে রাখলে আয়ত্ত হবে না। নিজে DOM change করে observe করো:

একটি child add করো,

একটি child remove করো,

একটি class বা data attribute change করো,

nested element-এর text change করো,

config option একেকবার একেকভাবে চালাও।

Practice করলে mutation types এবং callback behavior পরিষ্কার হবে।

9. Common Mistakes এবং Tricky Cases

9.1 প্রতিটি element আলাদাভাবে query করা

প্রতিটি child-এর জন্য আলাদা id এবং variable তৈরি করলে code messy হয়। Parent ধরে traversal করা অধিক clean হতে পারে।

9.2 firstChild এবং firstElementChild গুলিয়ে ফেলা

firstChild text node return করতে পারে। HTML element দরকার হলে firstElementChild ব্যবহার করো।

9.3 Template clone করার সময় deep clone না করা

Nested structure clone করতে:

cloneNode(true)

ব্যবহার করতে হবে।

9.4 Loop-এর ভেতরে main DOM update করা

Large-scale update-এ loop-এর প্রতিটি iteration-এ main DOM append করলে repeated repaint হতে পারে। Fragment ব্যবহার করো।

9.5 i <= 3-কে তিনটি iteration ভাবা

0 থেকে 3 পর্যন্ত মোট চারটি value। তাই চারটি element তৈরি হবে।

9.6 Range offset ভুল হিসাব করা

Range offset character position বা child node position অনুযায়ী নির্ধারিত হয়। Text node-এর leading space-ও character হিসেবে গণনা হয়।

9.7 Shadow DOM-কে main DOM ভাবা

Shadow DOM isolated tree। এটি main DOM-এর সাধারণ global scope-এর মতো আচরণ করে না।

9.8 className দিয়ে পুরো class overwrite করা

একটি class add/remove করতে classList safer এবং clearer।

9.9 MutationObserver config অসম্পূর্ণ রাখা

যে mutation observe করতে চাই, তার option true না করলে callback সেই mutation report নাও করতে পারে।

10. Technical Note

Lecture-এ target.textContent = "Goodbye" change-টি childList mutation হিসেবে ব্যাখ্যা করা হয়েছে, কারণ পুরোনো text node replace হয়ে নতুন text node যোগ হতে পারে। Browser এবং exact DOM operation অনুযায়ী mutation record-এর behaviour বোঝার জন্য DevTools-এ actual mutationList inspect করা ভালো।

এছাড়া mode: "closed" Shadow DOM-কে বাইরের code থেকে সাধারণ property দিয়ে access করা কঠিন করে, তবে এটি absolute security boundary নয়। এখানে মূল teaching point হলো encapsulation এবং access control।

11. Interview-Focused Questions

প্রশ্ন ১: প্রতিটি DOM element-এ id ব্যবহার না করে কীভাবে efficiently traverse করা যায়?

Parent element query করে firstElementChild, lastElementChild, parentElement, nextElementSibling এবং related traversal properties ব্যবহার করা যায়।

প্রশ্ন ২: <template> tag-এর content page-এ সরাসরি render হয় না কেন?

কারণ template content একটি DocumentFragment হিসেবে থাকে এবং main DOM-এ attach না হওয়া পর্যন্ত render হয় না।

প্রশ্ন ৩: cloneNode(true)-এ true কেন দেওয়া হয়?

Nested child structure-সহ deep clone করার জন্য।

প্রশ্ন ৪: DocumentFragment performance improve করে কীভাবে?

একাধিক DOM node main DOM-এর বাইরে build করে শেষে একবারে append করা যায়। ফলে repeated repaint/reflow কমে।

প্রশ্ন ৫: Range কী represent করে?

একটি document-এর দুটি boundary point-এর মধ্যবর্তী fragment বা selected অংশ।

প্রশ্ন ৬: Shadow DOM-এর প্রধান সুবিধা কী?

HTML, CSS এবং internal logic encapsulate ও isolate করা যায়, বিশেষ করে web component তৈরির ক্ষেত্রে।

প্রশ্ন ৭: classList.toggle() কী করে?

Class থাকলে remove করে, না থাকলে add করে।

প্রশ্ন ৮: MutationObserver কেন polling-এর চেয়ে ভালো?

এটি event-drivenভাবে DOM change ঘটলে callback execute করে; বারবার manual check করতে হয় না।

প্রশ্ন ৯: MutationObserver-এর common mutation types কী?

childList

attributes

characterData

প্রশ্ন ১০: ১,০০০ element add করার efficient উপায় কী?

সব element একটি DocumentFragment-এ append করে শেষে fragment-টি main DOM-এ একবার append করা।

12. Lecture Recap

আজ আমরা DOM-এর কয়েকটি advanced concept এবং best practice দেখলাম।

প্রথমে শিখলাম efficient DOM traversal। প্রতিটি element-এ আলাদা id বসিয়ে query করার পরিবর্তে parent-child-sibling relationship ব্যবহার করে cleanভাবে traverse করা যায়।

তারপর <template> এবং cloning দেখলাম। Template-এর content main DOM-এ সরাসরি render হয় না; সেটিকে clone করে dynamic UI element তৈরি করা যায়।

এরপর DocumentFragment দেখলাম। Fragment main DOM-এর বাইরে multiple node build করতে দেয় এবং শেষে একবারে append করার মাধ্যমে repaint কমাতে সাহায্য করে।

Range ব্যবহার করে document content-এর দুটি boundary point-এর মধ্যবর্তী অংশ select, clone বা manipulate করা যায়। Rich text editor এবং highlighting-এর মতো feature-এ এটি useful।

Shadow DOM-এর introductory ধারণা নিলাম। এটি isolated, encapsulated DOM tree, যা web component তৈরিতে বিশেষভাবে ব্যবহৃত হয়।

Class manipulation-এর জন্য classList.add(), remove(), toggle() এবং replace() revise করলাম।

Large-scale DOM update-এ loop-এর ভেতরে main DOM বারবার update না করে fragment ব্যবহার করার গুরুত্ব দেখলাম।

সবশেষে MutationObserver শিখলাম, যা DOM element বা subtree-এর mutation observe করে এবং callback-এর মাধ্যমে react করতে দেয়।

13. Assignment / Task

নিচের task-গুলো নিজে করে practice করো:

Task 1: DOM Traversal

একটি parent div-এর ভেতরে অন্তত চারটি child element তৈরি করো। শুধু parent query করে:

first child,

last child,

first child-এর next sibling,

last child-এর parent

console-এ print করো।

Task 2: Template Card Generator

একটি <template> তৈরি করো যার ভেতরে থাকবে:

title

description

button

একটি createCard(title, description, buttonText) function লিখে অন্তত তিনটি card তৈরি করো।

Task 3: DocumentFragment

একটি ul-এ DocumentFragment ব্যবহার করে ১০০টি li যোগ করো। Loop-এর ভেতরে main DOM append করবে না।

Task 4: Range

একটি paragraph-এর নির্দিষ্ট phrase Range দিয়ে select করে clone করো এবং cloned content page-এর অন্য জায়গায় append করো।

Task 5: Shadow DOM

একটি div-কে shadow host হিসেবে ব্যবহার করো। Shadow root-এর ভেতরে:

একটি heading,

একটি paragraph,

scoped CSS

যোগ করো। Open mode এবং closed mode আলাদাভাবে test করো।

Task 6: Class Manipulation

একটি button click করলে একটি box-এর class:

add,

remove,

toggle,

replace

করার আলাদা control তৈরি করো।

Task 7: Large-scale Update

একই page-এ দুটি button তৈরি করো:

Direct DOM append দিয়ে ১,০০০ element তৈরি করবে

DocumentFragment দিয়ে ১,০০০ element তৈরি করবে

DevTools Performance panel ব্যবহার করে পার্থক্য observe করো।

Task 8: MutationObserver

একটি target element observe করো। তিনটি button তৈরি করো:

Child add করবে

Attribute change করবে

Text change করবে

প্রতিটি mutation-এর type console-এ print করো।

14. সামনে কী আসছে?

আমরা গত কয়েকটি lesson-এ DOM নিয়ে অনেক কিছু শিখেছি। DOM module এখন প্রায় শেষ পর্যায়ে।

পরবর্তী lesson-এ DOM-এর সব concept ব্যবহার করে একটি mega project তৈরি করা হবে। সেটি হবে Day 21।

Mega project-এর পর DOM module শেষ হবে এবং নতুন module শুরু হবে: Asynchronous JavaScript। JavaScript world-এর সবচেয়ে গুরুত্বপূর্ণ ও exciting অংশগুলোর একটি হলো asynchronous programming। সামনে আমরা async, defer, callback, Promise এবং related concept-এর দিকে এগোব।

তাই আজকের concept-গুলো practice করো এবং পরবর্তী project lesson-এর জন্য প্রস্তুত থাকো।

Final Recap

DOM traversal-এ unnecessary id ও repeated query এড়িয়ে relationship-based traversal ব্যবহার করো।

<template> reusable DOM structure তৈরি করতে সাহায্য করে।

cloneNode(true) nested structure-সহ clone করে।

DocumentFragment main DOM-এর বাইরে node build করে performance improve করতে পারে।

Range দুটি boundary point-এর মধ্যবর্তী content select ও clone করতে ব্যবহৃত হয়।

Shadow DOM isolated এবং encapsulated component structure তৈরি করে।

Class manipulation-এ classList methods ব্যবহার করো।

Large-scale update-এ main DOM বারবার repaint না করিয়ে fragment একবারে append করো।

MutationObserver DOM change automatically detect করে callback-এর মাধ্যমে react করতে দেয়।

পরবর্তী lesson-এ DOM-based mega project তৈরি করা হবে, তারপর শুরু হবে Asynchronous JavaScript module।
