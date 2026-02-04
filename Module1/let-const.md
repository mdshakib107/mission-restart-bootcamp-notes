````md
# ES6 Intro: var vs let vs const — Complete Practice Set

## Topic Overview

**ES6 (ECMAScript 2015)** এ `var`, `let`, `const`—এই তিনটা keyword দিয়ে variable declare করা হয়।  
এই Topic-এর মূল লক্ষ্য হলো:

- **Scope বোঝা**
- **Reassignment vs Mutation বোঝা**
- **Real-world code এ কোনটা কখন ব্যবহার করবে সেটা clear হওয়া**

তুমি যে code দিয়েছো, সেটার উপর ভিত্তি করেই পুরো practice set বানানো হয়েছে।

---

## 1️⃣ Concept Analysis

### Core Concepts যা এই Topic থেকে শিখতে হবে

1. **var vs let vs const**
   - `var` → function scoped, hoisted (undefined)
   - `let` → block scoped, reassignment allowed
   - `const` → block scoped, reassignment NOT allowed

2. **Hoisting Behavior**
   - `var` hoisted হয়
   - `let` ও `const` hoisted হলেও TDZ (Temporal Dead Zone) থাকে

3. **Reassignment vs Mutation**
   - Primitive (`number`, `string`) → reassignment মানে value বদলানো
   - Non-primitive (`array`, `object`) → reference same রেখে ভিতরের value বদলানো = mutation

4. **const with Array/Object**
   - `const` মানে reference constant
   - ভিতরের data change করা যায়

---

## 2️⃣ Code Analysis (তোমার দেওয়া Code থেকে)

```js
const name = "Bangladesh";
const countryName = "BD" + name;
```
````

➡️ String concatenation + const usage

```js
let price = 120;
price = 150;
```

➡️ let → reassignment allowed

```js
const charge = 50;
// charge = 45;
```

➡️ const → reassignment করলে error

```js
const dress = ["shirt", "pant", "jacket"];
dress.push("maflar");
```

➡️ const array → mutation allowed

```js
const student = { name: "jaglul", marks: 50 };
student.marks = 60;
```

➡️ const object → property mutation allowed

---

# 3️⃣ Practice Question Set

---

## 🟢 A. Beginner Practice (Concept Clear করা)

### Q1

নিচের code টা uncomment করলে কী হবে?

```js
console.log(device);
var device = "laptop";
```

**Hint:**

- `var` hoisting
- value না assignment আগে access করলে কী হয়

**Concept:**
`var` hoisting, undefined

---

### Q2

নিচের code টা চালালে কী output হবে? কেন?

```js
let price = 100;
price = 200;
console.log(price);
```

**Hint:**

- let reassignment rule

**Concept:**
let reassignment

---

### Q3

এই code টা কেন error দেবে?

```js
const charge = 50;
charge = 45;
```

**Hint:**

- const মানে কী constant?

**Concept:**
const reassignment restriction

---

### Q4

নিচের code এ error হবে নাকি হবে না? explain করো।

```js
const dress = ["shirt"];
dress.push("pant");
```

**Hint:**

- array reference vs array content

**Concept:**
Mutation vs reassignment

---

## 🟡 B. Core Practice (Logic Apply করা)

### Q5

নিচের code টা `let` ব্যবহার করে rewrite করো যেন same output আসে।

```js
const price = 100;
// price = 120;
```

**Hint:**

- কোন keyword এ reassignment allowed?

**Concept:**
Choosing correct variable type

---

### Q6

একটা object declare করো `const` দিয়ে, তারপর:

- একটি property add করো
- একটি property update করো

**Hint:**

- const object এর ভিতরের data change করা যায়

**Concept:**
Object mutation

---

### Q7

এই code টাকে এমনভাবে ঠিক করো যেন error না দেয়:

```js
const country = "BD";
country = "Bangladesh";
```

**Hint:**

- Either keyword change OR logic change

**Concept:**
const vs let decision

---

## 🟠 C. Intermediate Practice (Real-world Thinking)

### Q8

একটা **shopping cart system** চিন্তা করো:

- `cartItems` → array
- item add করা যাবে
- cart reference change করা যাবে না

👉 কোন keyword ব্যবহার করবে? code লেখো।

**Hint:**

- array mutation allowed কিন্তু reassignment নয়

**Concept:**
const with array in real-world

---

### Q9

একজন student এর data store করবে:

- name (never change)
- marks (update হবে)

👉 Object structure + keyword decide করো।

**Hint:**

- property-level change

**Concept:**
const object + mutation

---

### Q10

এই code টা কেন bad practice হতে পারে explain করো:

```js
var total = 0;
if (true) {
  var total = 100;
}
console.log(total);
```

**Hint:**

- scope leak

**Concept:**
var scoping issue

---

## 🔴 D. Advanced / Thinking / Interview Practice

### Q11

তুমি কেন modern JavaScript এ `var` avoid করবে?
👉 Minimum 3টা reason লেখো।

**Hint:**

- scope
- hoisting behavior
- bugs

**Concept:**
Best practices

---

### Q12

এই code টা predict করো:

```js
console.log(name);
const name = "JS";
```

- Error হবে?
- হলে কেন?

**Hint:**

- TDZ (Temporal Dead Zone)

**Concept:**
let/const hoisting difference

---

### Q13 (Interview-style)

একটা rule তৈরি করো:

> “কখন `const`, কখন `let` ব্যবহার করা উচিত?”

👉 নিজের ভাষায় guideline লেখো।

**Hint:**

- future mutation
- readability

**Concept:**
Decision making in code design

---

## 4️⃣ Coverage Check ✅

✔ var hoisting
✔ let reassignment
✔ const restriction
✔ array & object mutation
✔ real-world usage
✔ interview-level reasoning

---

### পরের ধাপ?

তুমি চাইলে:

- এই প্রশ্নগুলোর **answer check** করতে পারি
- অথবা next Topic:
  👉 **Arrow Function**,
  👉 **Template String**,
  👉 **Destructuring**

👉 বলো, কোনটা next? 🚀
