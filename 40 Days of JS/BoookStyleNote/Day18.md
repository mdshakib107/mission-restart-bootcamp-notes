# JavaScript DOM Manipulation Mastery  
## Dynamic Element Creation, Traversal, Styling, Classes, Visibility ও Real-World Projects

> এটি কোনো summary বা short note নয়। এখানে Instructor-এর lecture flow, examples, code walkthrough, warnings, security discussion, project-building process, common mistakes, recap এবং tasks বজায় রেখে বিষয়গুলোকে বাংলা programming book-এর পূর্ণাঙ্গ অধ্যায়ের মতো সাজানো হয়েছে।

---

# ১. ভূমিকা: HTML না ছুঁয়েও Web Page বদলে দেওয়া

তুমি কি কখনও চেয়েছ:

- JavaScript দিয়ে dynamically element তৈরি করতে
- Existing element modify করতে
- Element remove করতে
- UI-এর এক জায়গা থেকে আরেক জায়গায় element move করতে
- HTML file change না করেই page content update করতে
- Button click-এর মাধ্যমে page structure বদলে দিতে

এসবই সম্ভব:

```text
DOM Manipulation
```

এই lesson হলো 40 Days of JavaScript-এর Day 18, Module 3-এর DOM manipulation lesson।

আগের lesson-এ আমরা শিখেছি:

- DOM কী
- DOM tree কী
- Node ও Element-এর পার্থক্য
- DOM query
- `getElementById()`
- `querySelector()`
- `querySelectorAll()`
- DevTools দিয়ে DOM inspect

এখন আমরা সেই selected element-গুলোর ওপর কাজ করব।

---

# ২. এই Lesson-এ আমরা কী শিখব

এই অধ্যায়ে শিখব:

1. Dynamically element create করা
2. Element insert করা
3. Existing content modify করা
4. `innerText`
5. `innerHTML`
6. `textContent`
7. `innerHTML` security risk
8. Element remove করা
9. Children replace করা
10. Attribute read, write, remove
11. DOM traversal
12. Parent, child এবং sibling navigation
13. Style manipulation
14. Class manipulation
15. `className`
16. `classList`
17. Visibility control
18. Toggle Paragraph project
19. Task Manager project
20. Project tasks

DOM theory শুধু পড়লে হবে না। তাই এই lesson project দিয়ে শেষ হবে।

---

# ৩. Element Dynamically Create করা

ধরা যাক HTML file-এ আগে থেকেই আছে:

```html
<body>
  <h1>Welcome to Day 18</h1>

  <p>
    Hope you are enjoying 40 Days of JavaScript
  </p>
</body>
```

Browser load হওয়ার সময় DOM এই elements থেকে তৈরি হয়েছে।

এগুলো statically লেখা।

কিন্তু JavaScript দিয়ে নতুন element তৈরি করতে চাইলে ব্যবহার করতে হবে:

```js
document.createElement()
```

---

# ৪. `document.createElement()`

একটি paragraph তৈরি করতে:

```js
const pElem =
  document.createElement("p");

console.log(pElem);
```

Console-এ দেখা যাবে:

```html
<p></p>
```

এর prototype হবে:

```text
HTMLParagraphElement
```

অর্থাৎ আমরা একটি paragraph element node তৈরি করেছি।

কিন্তু এখনো এটি page-এ দেখা যাবে না।

কারণ element তৈরি হয়েছে, কিন্তু DOM tree-তে attach হয়নি।

---

# ৫. Element-এ Text যোগ করা

```js
const pElem =
  document.createElement("p");

pElem.innerText =
  "This is a text added dynamically";
```

এখন paragraph-এর content set হয়েছে।

কিন্তু page-এ দেখাতে হলে DOM-এ append করতে হবে।

---

# ৬. `appendChild()`

Body-এর শেষে paragraph add করতে:

```js
document.body.appendChild(pElem);
```

Full example:

```js
const pElem =
  document.createElement("p");

pElem.innerText =
  "This is a text added dynamically";

document.body.appendChild(pElem);
```

এখন browser UI-তে নতুন paragraph দেখা যাবে।

HTML source file-এ paragraph নেই, কিন্তু DOM-এ dynamically তৈরি হয়েছে।

---

# ৭. Create বনাম Insert

`createElement()` element তৈরি করে।

`appendChild()` parent-এর শেষে attach করে।

কিন্তু সবসময় শেষে add করতে হবে না।

কখনও প্রয়োজন হতে পারে:

- Existing element-এর আগে
- Existing element-এর পরে
- Specific position-এ

এখানে insertion methods দরকার।

---

# ৮. `insertBefore()`

ধরা যাক:

```html
<body>
  <h1>Heading</h1>
  <p>Paragraph</p>
</body>
```

আমরা `<p>`-এর আগে একটি `<span>` add করব।

---

## ৮.১ Span Create

```js
const spanElem =
  document.createElement("span");

spanElem.innerText =
  "I am a span";
```

---

## ৮.২ Reference Element Select

```js
const pElem =
  document.querySelector("p");
```

---

## ৮.৩ Parent-এর ওপর `insertBefore()`

```js
document.body.insertBefore(
  spanElem,
  pElem
);
```

Result:

```html
<body>
  <h1>Heading</h1>
  <span>I am a span</span>
  <p>Paragraph</p>
</body>
```

---

# ৯. Common Error: Wrong Parent

Wrong:

```js
document.insertBefore(
  spanElem,
  pElem
);
```

এতে error হতে পারে:

```text
NotFoundError:
The node before which the new node is to be inserted is not a child of this node.
```

কারণ `<p>`-এর direct parent `document` নয়।

তার direct parent হলো:

```html
<body>
```

তাই `insertBefore()` call করতে হবে reference node-এর parent-এর ওপর।

Correct:

```js
pElem.parentNode.insertBefore(
  spanElem,
  pElem
);
```

অথবা:

```js
document.body.insertBefore(
  spanElem,
  pElem
);
```

---

# ১০. Insert After কীভাবে করা যায়?

Standard DOM API-তে পুরোনো pattern-এ `insertAfter()` নামে method নেই।

তবে `insertBefore()` এবং `nextElementSibling` ব্যবহার করে simulate করা যায়।

---

## ১০.১ Example Structure

```html
<h1>Heading</h1>
<p>Paragraph</p>
<h2>Subheading</h2>
```

`<p>`-এর পরে span insert করতে:

```js
const pElem =
  document.querySelector("p");

const spanElem =
  document.createElement("span");

spanElem.innerText =
  "I am after paragraph";

pElem.parentNode.insertBefore(
  spanElem,
  pElem.nextElementSibling
);
```

এখানে:

```js
pElem.nextElementSibling
```

return করবে `<h2>`।

Span `<h2>`-এর আগে insert হবে, অর্থাৎ `<p>`-এর পরে।

---

## ১০.২ যদি Next Sibling না থাকে

যদি `<p>` last element হয়:

```js
pElem.nextElementSibling
```

return করবে:

```text
null
```

তখন:

```js
parent.insertBefore(
  newNode,
  null
);
```

নতুন node parent-এর শেষে add হবে।

---

# ১১. Modern Alternative: `before()` এবং `after()`

Modern browsers-এ আরও সরাসরি ব্যবহার করা যায়:

```js
pElem.before(spanElem);
```

অথবা:

```js
pElem.after(spanElem);
```

তবে lecture-এর মূল focus ছিল `insertBefore()` এবং sibling logic বোঝানো।

---

# ১২. Content Modify করা

DOM element-এর content modify করার common properties:

```js
innerText
innerHTML
textContent
```

তিনটির behaviour এক নয়।

---

# ১৩. `innerHTML`

একটি paragraph:

```html
<p>
  Hope you are enjoying 40 Days of JavaScript
</p>
```

Select:

```js
const pElem =
  document.querySelector("p");
```

Read:

```js
console.log(
  pElem.innerHTML
);
```

Output:

```text
Hope you are enjoying 40 Days of JavaScript
```

Set:

```js
pElem.innerHTML =
  "Hello, how are you doing?";
```

---

## ১৩.১ HTML Markup Insert

```js
pElem.innerHTML =
  "<u>Hello</u>, how are you doing?";
```

Browser `<u>` tag render করবে।

Result:

```html
<p>
  <u>Hello</u>, how are you doing?
</p>
```

---

# ১৪. `innerText` বনাম `innerHTML`

If:

```js
pElem.innerText =
  "<u>Hello</u>";
```

Browser দেখাবে:

```text
<u>Hello</u>
```

এটি markup হিসেবে render করবে না।

কিন্তু:

```js
pElem.innerHTML =
  "<u>Hello</u>";
```

Browser underlined text render করবে।

---

# ১৫. `innerHTML`-এর Security Risk

`innerHTML` powerful, কিন্তু dangerous হতে পারে।

সবচেয়ে বড় risk:

```text
Cross-Site Scripting (XSS)
```

যদি user input directly `innerHTML`-এ দেওয়া হয়, malicious script inject হতে পারে।

---

## ১৫.১ Unsafe Example

```js
const userInput =
  inputElem.value;

outputElem.innerHTML =
  userInput;
```

User লিখতে পারে:

```html
<img
  src="x"
  onerror="alert('Hacked')"
/>
```

Browser malicious code execute করতে পারে।

---

## ১৫.২ Safer Approach

Plain text হলে:

```js
outputElem.textContent =
  userInput;
```

এটি markup execute করবে না।

---

## ১৫.৩ Sanitization

যদি trusted formatting allow করতে হয়, sanitizer ব্যবহার করতে হবে।

Example:

```js
const cleanHTML =
  DOMPurify.sanitize(userInput);

outputElem.innerHTML =
  cleanHTML;
```

`DOMPurify` XSS risk কমাতে popular library।

---

# ১৬. `textContent`

`textContent` element-এর ভিতরের সব text return করে, visibility বিবেচনা না করে।

---

## ১৬.১ Example

```html
<div>
  <h2 style="display: none">
    Test
  </h2>
</div>
```

JavaScript:

```js
const divElem =
  document.querySelector("div");

console.log(
  divElem.innerText
);

console.log(
  divElem.textContent
);
```

Possible output:

```text
innerText: ""
textContent: "Test"
```

---

## ১৬.২ Difference

`innerText`:

- Visible text consider করে
- CSS layout ও visibility-এর প্রভাব পড়ে

`textContent`:

- DOM-এর raw text content দেয়
- Hidden text-ও return করে
- Generally faster
- HTML parse করে না

---

# ১৭. Content Properties Comparison

| Property | HTML Parse করে? | Hidden Text দেয়? | Main Use |
|---|---:|---:|---|
| `innerText` | না | সাধারণত না | Visible text |
| `textContent` | না | হ্যাঁ | Safe raw text |
| `innerHTML` | হ্যাঁ | Markup structure | HTML insert/read |

---

# ১৮. Element Remove করা

DOM থেকে element remove করার কয়েকটি উপায় আছে।

---

# ১৯. Parent থেকে Child Remove

HTML:

```html
<ul id="my-list">
  <li>A</li>
  <li>B</li>
  <li>C</li>
  <li>D</li>
  <li>E</li>
</ul>
```

Select parent:

```js
const list =
  document.getElementById(
    "my-list"
  );
```

Children:

```js
console.log(
  list.children
);
```

`children` একটি `HTMLCollection` return করে।

First child:

```js
const itemToRemove =
  list.children[0];
```

Remove:

```js
list.removeChild(
  itemToRemove
);
```

এখন `A` remove হবে।

---

# ২০. Direct `remove()`

যদি target element সরাসরি select করা থাকে:

```html
<div id="remove-me">
  I am going to be removed
</div>
```

JavaScript:

```js
const removableElem =
  document.getElementById(
    "remove-me"
  );

removableElem.remove();
```

এটি element-টিকে DOM থেকে সরিয়ে দেবে।

---

# ২১. সব Children Remove করা

একটি parent-এর সব child remove করার কয়েকটি approach আছে।

---

## ২১.১ `innerText = ""`

```js
list.innerText = "";
```

---

## ২১.২ `textContent = ""`

```js
list.textContent = "";
```

---

## ২১.৩ `replaceChildren()`

```js
list.replaceChildren();
```

Argument না দিলে সব children remove হবে।

এটি modern এবং clean approach।

---

# ২২. Children Replace করা

```js
const pElem =
  document.querySelector("p");

list.replaceChildren(
  pElem
);
```

এখন পুরোনো সব `<li>` remove হবে এবং `<p>` list-এর child হবে।

একাধিক node:

```js
list.replaceChildren(
  firstElem,
  secondElem,
  thirdElem
);
```

---

## ২২.১ String দিলে কী হয়?

```js
list.replaceChildren(
  "Hello"
);
```

এটি text node insert করবে।

Element নয়।

Element চাইলে `createElement()` বা existing DOM element pass করতে হবে।

---

# ২৩. Attribute Read করা

HTML:

```html
<img
  src="some-image.png"
  alt="Some image"
/>
```

Select:

```js
const imageElem =
  document.querySelector("img");
```

Read:

```js
console.log(
  imageElem.getAttribute("src")
);

console.log(
  imageElem.getAttribute("alt")
);
```

---

# ২৪. Attribute Set করা

```js
imageElem.setAttribute(
  "src",
  "banner.png"
);
```

Alt change:

```js
imageElem.setAttribute(
  "alt",
  "This is a banner"
);
```

---

# ২৫. Attribute Remove করা

```js
imageElem.removeAttribute(
  "height"
);
```

---

# ২৬. Attribute Exists কি না Check করা

```js
console.log(
  imageElem.hasAttribute("src")
);
```

Result:

```text
true
```

```js
console.log(
  imageElem.hasAttribute("height")
);
```

If removed:

```text
false
```

---

# ২৭. Attribute Methods Recap

| Method | কাজ |
|---|---|
| `getAttribute()` | Value read |
| `setAttribute()` | Value set |
| `removeAttribute()` | Attribute remove |
| `hasAttribute()` | Exists কি না |

---

# ২৮. Creative Practice: Image Dimension Controller

তিনটি button:

1. Square
2. Height Only
3. Width Only

Possible logic:

```js
function makeSquare() {
  imageElem.setAttribute(
    "width",
    "200"
  );

  imageElem.setAttribute(
    "height",
    "200"
  );
}
```

```js
function heightOnly() {
  imageElem.removeAttribute(
    "width"
  );

  imageElem.setAttribute(
    "height",
    "200"
  );
}
```

```js
function widthOnly() {
  imageElem.removeAttribute(
    "height"
  );

  imageElem.setAttribute(
    "width",
    "200"
  );
}
```

---

# ২৯. DOM Traversal কী?

DOM traversal মানে DOM hierarchy-এর মধ্যে navigate করা।

যেমন:

- Parent থেকে child
- Child থেকে parent
- Sibling থেকে sibling
- Grandchild থেকে grandparent

DOM tree বুঝলে manipulation অনেক সহজ হয়।

---

# ৩০. Node বনাম Element মনে রাখা

Node হতে পারে:

- Element node
- Text node
- Comment node
- Document node

Element শুধু HTML tag-কে represent করে।

এই পার্থক্য traversal properties বোঝার জন্য জরুরি।

---

# ৩১. `parentElement` এবং `parentNode`

HTML:

```html
<div>
  <p class="info">
    <span id="text">
      Some text
    </span>
  </p>
</div>
```

Select span:

```js
const spanElem =
  document.getElementById(
    "text"
  );
```

Parent element:

```js
console.log(
  spanElem.parentElement
);
```

Parent node:

```js
console.log(
  spanElem.parentNode
);
```

দুটিই এখানে `<p>` return করবে।

---

## ৩১.১ Upward Traversal

```js
spanElem.parentElement
  .parentElement
```

Return করবে `<div>`।

একইভাবে:

```js
spanElem.parentNode
  .parentNode
```

---

# ৩২. `children` বনাম `childNodes`

HTML:

```html
<div id="main-id">
  <p class="info">
    <span>Text</span>
  </p>

  <!-- A comment -->
</div>
```

Select:

```js
const mainElem =
  document.getElementById(
    "main-id"
  );
```

---

## ৩২.১ `children`

```js
console.log(
  mainElem.children
);
```

Return:

```text
HTMLCollection
```

শুধু element nodes।

এখানে `<p>`।

---

## ৩২.২ `childNodes`

```js
console.log(
  mainElem.childNodes
);
```

Return:

```text
NodeList
```

এতে থাকতে পারে:

- Whitespace text node
- `<p>`
- Comment node
- Newline text node

---

# ৩৩. কেন Whitespace Text Node আসে?

HTML formatting:

```html
<div>
  <p>Text</p>
</div>
```

`<div>` এবং `<p>`-এর মাঝের newline ও spaces text node হিসেবে count হতে পারে।

তাই:

```js
childNodes
```

unexpected extra nodes দেখাতে পারে।

Element নিয়ে কাজ করলে সাধারণত:

```js
children
```

আরও convenient।

---

# ৩৪. First এবং Last Child

Node-based:

```js
mainElem.firstChild
mainElem.lastChild
```

Element-based:

```js
mainElem.firstElementChild
mainElem.lastElementChild
```

---

## ৩৪.১ Difference

`firstChild` text node হতে পারে।

`firstElementChild` প্রথম HTML element দেয়।

---

# ৩৫. Sibling Traversal

Node-based:

```js
nextSibling
previousSibling
```

Element-based:

```js
nextElementSibling
previousElementSibling
```

---

## ৩৫.১ Example

```html
<div>
  <h1 id="one">
    Something
  </h1>

  <p id="two">
    Something more
  </p>

  <p id="three">
    Something even more
  </p>
</div>
```

Select middle paragraph:

```js
const middle =
  document.getElementById(
    "two"
  );
```

Try:

```js
console.log(
  middle.previousSibling
);

console.log(
  middle.previousElementSibling
);

console.log(
  middle.nextSibling
);

console.log(
  middle.nextElementSibling
);
```

Node properties whitespace return করতে পারে।

Element properties actual HTML element return করবে।

---

# ৩৬. Traversal Summary

| Property | Return |
|---|---|
| `parentNode` | Parent node |
| `parentElement` | Parent element |
| `children` | Element children |
| `childNodes` | সব child nodes |
| `firstChild` | First node |
| `firstElementChild` | First element |
| `lastChild` | Last node |
| `lastElementChild` | Last element |
| `nextSibling` | Next node |
| `nextElementSibling` | Next element |
| `previousSibling` | Previous node |
| `previousElementSibling` | Previous element |

---

# ৩৭. Style Manipulation

HTML element-এর `style` property দিয়ে inline style read এবং write করা যায়।

HTML:

```html
<p
  id="p-id"
  style="
    background-color: green;
    color: white;
  "
>
  Some text
</p>
```

Select:

```js
const pElem =
  document.getElementById(
    "p-id"
  );
```

Read:

```js
console.log(
  pElem.style
);
```

---

# ৩৮. Style Set করা

```js
pElem.style.backgroundColor =
  "pink";
```

Text color:

```js
pElem.style.color =
  "black";
```

Padding:

```js
pElem.style.padding =
  "10px";
```

---

# ৩৯. CSS Property Camel Case

CSS:

```css
background-color
font-size
border-radius
```

JavaScript:

```js
backgroundColor
fontSize
borderRadius
```

কারণ dot notation-এ hyphen ব্যবহার করা যায় না।

Alternative bracket notation:

```js
pElem.style[
  "background-color"
] = "pink";
```

তবে camelCase বেশি common।

---

# ৪০. Inline Style-এর Limitation

Inline style:

- Reusable নয়
- Maintain করা কঠিন
- CSS separation কমায়
- অনেক element-এ repeat হয়

তাই reusable styling-এর জন্য class-based approach ভালো।

---

# ৪১. CSS Class দিয়ে Styling

HTML:

```html
<div
  id="main-id"
  class="main-class"
>
  I love DOM
</div>
```

CSS:

```css
.main-class {
  font-size: large;
  padding: 2px;
  border: 2px solid red;
  background-color: pink;
  border-radius: 5px;
}
```

---

# ৪২. `className`

Select:

```js
const mainDivElem =
  document.getElementById(
    "main-id"
  );
```

Read:

```js
console.log(
  mainDivElem.className
);
```

Set:

```js
mainDivElem.className =
  "secondary-class";
```

---

## ৪২.১ `className`-এর Limitation

If HTML:

```html
<div
  class="main-class layout"
>
```

Then:

```js
mainDivElem.className =
  "secondary-class";
```

পুরোনো সব class replace হবে।

Result:

```html
<div
  class="secondary-class"
>
```

`layout` হারিয়ে যাবে।

এই কারণে `classList` বেশি flexible।

---

# ৪৩. `classList`

```js
console.log(
  mainDivElem.classList
);
```

Return:

```text
DOMTokenList
```

যদি classes:

```text
main-class layout
```

তাহলে indexed structure-এর মতো দেখা যাবে।

---

# ৪৪. `classList.add()`

```js
mainDivElem.classList.add(
  "test"
);
```

এখন class হবে:

```text
main-class layout test
```

---

# ৪৫. `classList.remove()`

```js
mainDivElem.classList.remove(
  "layout"
);
```

---

# ৪৬. `classList.replace()`

```js
mainDivElem.classList.replace(
  "main-class",
  "secondary-class"
);
```

শুধু target class replace হবে।

Other classes থাকবে।

---

# ৪৭. `classList.contains()`

```js
console.log(
  mainDivElem.classList.contains(
    "test"
  )
);
```

Return:

```text
true
```

---

# ৪৮. `classList.toggle()`

```js
mainDivElem.classList.toggle(
  "test"
);
```

যদি class থাকে:

- Remove করবে

যদি না থাকে:

- Add করবে

Equivalent long logic:

```js
if (
  mainDivElem.classList.contains(
    "test"
  )
) {
  mainDivElem.classList.remove(
    "test"
  );
} else {
  mainDivElem.classList.add(
    "test"
  );
}
```

`toggle()` এক line-এ এই কাজ করে।

---

# ৪৯. Class Methods Recap

| Method | কাজ |
|---|---|
| `add()` | Class add |
| `remove()` | Class remove |
| `replace()` | Class replace |
| `contains()` | Class আছে কি না |
| `toggle()` | Add/remove toggle |

---

# ৫০. Visibility Control

Element visibility control করার common ways:

```js
display
visibility
opacity
```

---

# ৫১. `display: none`

```js
mainDivElem.style.display =
  "none";
```

Element:

- Hidden
- Layout space নেয় না
- DOM-এ থাকে

Show:

```js
mainDivElem.style.display =
  "block";
```

---

# ৫২. `visibility: hidden`

```js
mainDivElem.style.visibility =
  "hidden";
```

Element hidden হবে, কিন্তু space থাকবে।

Show:

```js
mainDivElem.style.visibility =
  "visible";
```

---

# ৫৩. `opacity`

```js
mainDivElem.style.opacity =
  "0";
```

Fully transparent।

```js
mainDivElem.style.opacity =
  "0.5";
```

Partially transparent।

```js
mainDivElem.style.opacity =
  "1";
```

Fully visible।

---

# ৫৪. Visibility Comparison

| Method | Visible? | Space নেয়? |
|---|---:|---:|
| `display: none` | না | না |
| `visibility: hidden` | না | হ্যাঁ |
| `opacity: 0` | না | হ্যাঁ |

`opacity: 0` element interaction ধরে রাখতে পারে, unless pointer-events change করা হয়।

---

# ৫৫. Project 1: Toggle Paragraph

Objective:

Button click করলে paragraph hide/show হবে।

---

## ৫৫.১ HTML

```html
<h2>
  Toggle Paragraph Example
</h2>

<button
  class="action"
  onclick="toggleInfo()"
>
  Show/Hide Paragraph
</button>

<p
  id="my-paragraph"
  class="info"
>
  This paragraph can be toggled.
</p>
```

---

## ৫৫.২ CSS

```css
.info {
  padding: 10px;
  background-color: lightblue;
}

.action {
  padding: 8px 12px;
}

.hidden {
  display: none;
}
```

---

## ৫৫.৩ JavaScript

```js
function toggleInfo() {
  const paragraph =
    document.getElementById(
      "my-paragraph"
    );

  paragraph.classList.toggle(
    "hidden"
  );
}
```

---

## ৫৫.৪ Flow

First click:

- `hidden` নেই
- Add হবে
- `display: none`
- Paragraph hide

Second click:

- `hidden` আছে
- Remove হবে
- Paragraph show

---

# ৫৬. Project 2: Task Manager

এটি বড় project।

Features:

- Task add
- Task list display
- Task delete
- Task complete
- Task filter
- Task edit

Lecture-এ প্রথম অংশ build করা হয়েছে, filter এবং edit task হিসেবে রাখা হয়েছে।

---

# ৫৭. Task Manager HTML

```html
<h2>Task Manager</h2>

<input
  type="text"
  id="task-input"
  placeholder="Add a new task"
/>

<button onclick="addTask()">
  Add Task
</button>

<input
  type="text"
  id="filter-input"
  placeholder="Filter tasks"
  onkeyup="filterTask()"
/>

<ul id="task-list"></ul>
```

---

# ৫৮. Add Task Function

```js
function addTask() {
  const taskInput =
    document.getElementById(
      "task-input"
    );

  const taskList =
    document.getElementById(
      "task-list"
    );

  const task =
    taskInput.value.trim();

  if (!task) {
    return;
  }

  const li =
    document.createElement("li");

  li.innerText =
    task;

  taskList.appendChild(li);

  taskInput.value =
    "";
}
```

---

# ৫৯. Input Validation

```js
const task =
  taskInput.value.trim();

if (!task) {
  return;
}
```

এটি prevent করে:

- Empty task
- Space-only task

---

# ৬০. Delete Button Create

```js
const deleteButton =
  document.createElement(
    "button"
  );

deleteButton.innerText =
  "❌";
```

Style:

```js
deleteButton.style.marginLeft =
  "5px";
```

Append to list item:

```js
li.appendChild(
  deleteButton
);
```

---

# ৬১. Delete Handler

```js
deleteButton.onclick =
  function () {
    li.remove();
  };
```

এখানে anonymous function ব্যবহার করা হয়েছে।

কারণ function শুধু এই button-এর জন্য।

---

# ৬২. Complete Button Create

```js
const completeButton =
  document.createElement(
    "button"
  );

completeButton.innerText =
  "✅";

completeButton.style.marginLeft =
  "5px";
```

Append:

```js
li.appendChild(
  completeButton
);
```

Button order:

1. Task text
2. Complete button
3. Delete button

---

# ৬৩. Completed Class

CSS:

```css
.completed {
  text-decoration:
    line-through;
}
```

JavaScript:

```js
completeButton.onclick =
  function () {
    li.classList.toggle(
      "completed"
    );
  };
```

Click করলে:

- Complete
- আবার click করলে incomplete

---

# ৬৪. Full Add Task Function

```js
function addTask() {
  const taskInput =
    document.getElementById(
      "task-input"
    );

  const taskList =
    document.getElementById(
      "task-list"
    );

  const task =
    taskInput.value.trim();

  if (!task) {
    return;
  }

  const li =
    document.createElement("li");

  li.innerText =
    task;

  const completeButton =
    document.createElement(
      "button"
    );

  completeButton.innerText =
    "✅";

  completeButton.style.marginLeft =
    "5px";

  completeButton.onclick =
    function () {
      li.classList.toggle(
        "completed"
      );
    };

  const deleteButton =
    document.createElement(
      "button"
    );

  deleteButton.innerText =
    "❌";

  deleteButton.style.marginLeft =
    "5px";

  deleteButton.onclick =
    function () {
      li.remove();
    };

  li.appendChild(
    completeButton
  );

  li.appendChild(
    deleteButton
  );

  taskList.appendChild(
    li
  );

  taskInput.value =
    "";
}
```

---

# ৬৫. DOM Composition চিন্তা করার নিয়ম

Task Manager project-এর সবচেয়ে গুরুত্বপূর্ণ mental model:

```text
ul
└── li
    ├── text node
    ├── complete button
    └── delete button
```

Element create করার সময় hierarchy আগে ভাবতে হবে।

Recommended order:

1. `li` create
2. Text set
3. Complete button create
4. Delete button create
5. Buttons `li`-তে append
6. Final `li` list-এ append

---

# ৬৬. কেন Final Append শেষে করা ভালো?

যতক্ষণ element পুরো compose না হচ্ছে, memory-তে build করা যায়।

তারপর একবার DOM-এ insert করা হয়।

এতে:

- Logic clean হয়
- Hierarchy সহজ বোঝা যায়
- Repeated DOM updates কমে
- Debug সহজ হয়

---

# ৬৭. Filter Task — Assignment

HTML:

```html
<input
  type="text"
  id="filter-input"
  onkeyup="filterTask()"
/>
```

Task:

```js
function filterTask() {
  // implement
}
```

Logic:

1. Filter input read
2. সব list item select
3. Task text lowercase
4. Search text lowercase
5. `includes()` দিয়ে match
6. Match হলে show
7. Match না হলে hide

Possible solution pattern:

```js
function filterTask() {
  const filterInput =
    document.getElementById(
      "filter-input"
    );

  const query =
    filterInput.value
      .trim()
      .toLowerCase();

  const tasks =
    document.querySelectorAll(
      "#task-list li"
    );

  tasks.forEach(task => {
    const text =
      task.firstChild
        .textContent
        .toLowerCase();

    task.style.display =
      text.includes(query)
        ? "list-item"
        : "none";
  });
}
```

---

# ৬৮. Edit Task — Assignment

Edit button add করতে হবে।

Button order:

1. Complete
2. Edit
3. Delete

দুটি implementation approach:

---

## Approach 1: Inline Edit

Task text editable করা।

Possible:

```js
li.contentEditable =
  "true";
```

তারপর save mechanism দরকার।

---

## Approach 2: Input Field Reuse

Edit click করলে:

- Existing task input box-এ populate
- Add Task button text change
- `Add Task` → `Edit Task`
- Submit করলে selected task update
- তারপর mode reset

এটি state management require করবে।

Possible variables:

```js
let taskBeingEdited = null;
```

---

# ৬৯. Edit Mode Concept

```js
function startEdit(li) {
  taskBeingEdited = li;

  taskInput.value =
    li.firstChild.textContent;

  addButton.innerText =
    "Edit Task";
}
```

Then main handler:

```js
if (taskBeingEdited) {
  taskBeingEdited.firstChild.textContent =
    task;

  taskBeingEdited =
    null;

  addButton.innerText =
    "Add Task";
} else {
  // create new task
}
```

---

# ৭০. Project Improvement Ideas

Task Manager-এ আরও add করা যায়:

- Enter key submit
- Local storage
- Due date
- Priority
- Category
- Completed task filter
- Active task filter
- Task counter
- Clear all
- Confirmation before delete
- Empty-state message
- Drag and drop

---

# ৭১. Common DOM Manipulation Mistakes

## Mistake 1: Create করে Append না করা

```js
document.createElement("p");
```

Element memory-তে তৈরি হয়, UI-তে নয়।

---

## Mistake 2: Wrong Parent-এ `insertBefore()`

Reference node যে parent-এর child, সেই parent-এর ওপর method call করতে হবে।

---

## Mistake 3: User Input-এ `innerHTML`

XSS risk।

---

## Mistake 4: `childNodes` এবং `children` গুলিয়ে ফেলা

Whitespace node unexpected result দিতে পারে।

---

## Mistake 5: `className` দিয়ে সব Class Overwrite

Selective manipulation-এর জন্য `classList` ব্যবহার করো।

---

## Mistake 6: Style Property Hyphen ব্যবহার

Wrong:

```js
elem.style.background-color
```

Correct:

```js
elem.style.backgroundColor
```

---

## Mistake 7: Empty Task Allow করা

`trim()` এবং validation দরকার।

---

## Mistake 8: Button Create করে Parent-এ Append না করা

Hierarchy check করতে হবে।

---

# ৭২. Technical Clarifications

Lecture-এর মূল flow বজায় রেখে কিছু precise clarification:

## `append()` বনাম `appendChild()`

`appendChild()` শুধু Node নেয়।

`append()`:

- Multiple arguments নিতে পারে
- String-ও নিতে পারে

Example:

```js
parent.append(
  childOne,
  childTwo,
  "text"
);
```

---

## `insertAdjacentElement()`

Alternative:

```js
pElem.insertAdjacentElement(
  "beforebegin",
  spanElem
);
```

Positions:

- `beforebegin`
- `afterbegin`
- `beforeend`
- `afterend`

---

## `innerHTML` Sanitization

Sanitizer ছাড়া untrusted input pass করা উচিত নয়।

---

## `opacity: 0`

Element invisible হলেও clickable থাকতে পারে।

Need:

```css
pointer-events: none;
```

depending on requirement।

---

# ৭৩. Practice Tasks

## Task 1

Create a paragraph dynamically and append to body।

## Task 2

Create a span and insert before `<h1>`।

## Task 3

Insert an element after a paragraph using `nextElementSibling`।

## Task 4

Compare:

```js
innerText
textContent
innerHTML
```

## Task 5

Remove first item from list।

## Task 6

Clear all children using:

```js
replaceChildren()
```

## Task 7

Read, set, remove এবং check attributes।

## Task 8

Traverse:

```js
parentElement
children
firstElementChild
nextElementSibling
```

## Task 9

Button click-এ style change করো।

## Task 10

`classList.toggle()` দিয়ে theme change করো।

## Task 11

Toggle Paragraph project recreate করো।

## Task 12

Task Manager-এর filter complete করো।

## Task 13

Task Manager-এর edit feature complete করো।

## Task 14

Project deploy করো:

- Vercel
- Netlify
- Render

---

# ৭৪. Interview Questions

1. `createElement()` কী করে?
2. Created element page-এ দেখাতে কী করতে হয়?
3. `appendChild()` কী?
4. `insertBefore()` কীভাবে কাজ করে?
5. Wrong parent দিলে error কেন হয়?
6. `innerText`, `textContent`, `innerHTML` পার্থক্য কী?
7. `innerHTML` কেন risky?
8. XSS কী?
9. `remove()` এবং `removeChild()` পার্থক্য কী?
10. `replaceChildren()` কী?
11. Attribute কীভাবে read করা হয়?
12. `children` এবং `childNodes` পার্থক্য কী?
13. `firstChild` এবং `firstElementChild` পার্থক্য কী?
14. `className` এবং `classList` পার্থক্য কী?
15. `classList.toggle()` কী করে?
16. `display: none` এবং `visibility: hidden` পার্থক্য কী?
17. `opacity: 0` কি layout space নেয়?
18. Dynamic task list কীভাবে তৈরি করা যায়?
19. Event handler-এ anonymous function কেন ব্যবহার করা হয়?
20. DOM composition কী?

---

# ৭৫. Final Recap

এই chapter-এ আমরা শিখেছি:

- `createElement()` দিয়ে element তৈরি
- `innerText` দিয়ে text set
- `appendChild()` দিয়ে DOM-এ attach
- `insertBefore()` দিয়ে specific position-এ insert
- `nextElementSibling` দিয়ে after simulation
- `innerHTML` markup render করে
- `innerHTML` XSS risk তৈরি করতে পারে
- `textContent` hidden text-ও read করে
- `removeChild()` parent থেকে child remove করে
- `remove()` direct element remove করে
- `replaceChildren()` children clear বা replace করে
- `getAttribute()` attribute read করে
- `setAttribute()` attribute set করে
- `removeAttribute()` attribute remove করে
- `hasAttribute()` existence check করে
- `parentElement` এবং `parentNode` upward traversal
- `children` শুধু elements দেয়
- `childNodes` সব nodes দেয়
- `firstElementChild`, `nextElementSibling` element navigation
- `style` দিয়ে inline style change
- CSS property JavaScript-এ camelCase
- `className` পুরো class string replace করে
- `classList` selective manipulation দেয়
- `toggle()` add/remove automate করে
- `display`, `visibility`, `opacity` দিয়ে visibility control
- Toggle project class-based state change দেখায়
- Task Manager dynamic DOM composition শেখায়
- Filter এবং edit feature assignment হিসেবে complete করতে হবে

সবচেয়ে গুরুত্বপূর্ণ কথা:

> DOM manipulation মানে শুধু element change করা নয়; DOM tree-এর hierarchy বুঝে সঠিক node তৈরি, compose, insert, update, traverse এবং remove করা।

এই skill যত শক্তিশালী হবে, JavaScript দিয়ে interactive web application তৈরি করা তত সহজ হবে।
