````md
# ES6 Template String (`) — Multi-line & Dynamic String

## Complete Practice Question Set

## 📌 Context

এই practice set টা **Template String (backtick ` `)** ব্যবহার করে:

- Multiple line string
- Dynamic value injection
- Expression evaluation  
  এসব concept **practice করে শেখার জন্য** বানানো।

---

## 1️⃣ Concept Analysis

### Core Concepts to Learn

1. **Template String (` `) কী**
   - Single quote / double quote এর alternative
   - ES6 feature

2. **Multi-line String**
   - `\n` বা `+` ছাড়াই multiple line লেখা যায়

3. **Dynamic String / Interpolation**
   - `${variable}` দিয়ে value inject করা
   - Expression evaluate করা যায়

4. **Expression Inside Template**
   - Arithmetic
   - Function call
   - Logical expression

5. **Readability & Maintainability**
   - Complex string সহজে readable করা

---

## 2️⃣ Code Analysis (Given Code)

### Multi-line String

```js
const poem = `Amm pata jora jora
marbo chabuk chorbe ghora
ore babu ghure dara
asche amar pagla ghora`;
```
````

- Line break preserve হয়
- No `\n`, no concatenation

---

### Dynamic String

```js
const output = `sum of ${num1} and ${num2} is equal to ${result}`;
```

- Variable interpolation
- Expression support

---

### Expression Evaluation

```js
const discountedPrice = `Discounted Price of ${price} after 20% discount ${price * 0.8}`;
```

- Arithmetic inside template string

---

## 3️⃣ Practice Question Set

---

## 🟢 A. Beginner Practice

### Q1

নিচের দুইটা code এর output একই হবে নাকি different? explain করো।

```js
const text1 = "Hello\nWorld";
const text2 = `Hello
World`;
```

**Think about:**

- Line break behavior

**Concept:**

- Multi-line string

---

### Q2

নিচের code এর output কী হবে?

```js
const a = 5;
const b = 10;
console.log(`Total is ${a + b}`);
```

**Think about:**

- Expression evaluation

**Concept:**

- Interpolation

---

### Q3

এই code টা template string ব্যবহার করে rewrite করো:

```js
const msg = "My name is " + name + " and I am " + age + " years old";
```

**Think about:**

- `${}` syntax

**Concept:**

- Dynamic string conversion

---

### Q4

নিচের code এ কয়টা line print হবে?

```js
const poem = `one
two
three`;
```

**Think about:**

- Newline counting

**Concept:**

- Multi-line preservation

---

## 🟡 B. Core Practice

### Q5

একটা function বানাও যেটা:

- product name
- price
- quantity
  নিয়ে একটা readable invoice line বানাবে (template string দিয়ে)

**Think about:**

- Multiple interpolation

**Concept:**

- Realistic string building

---

### Q6

নিচের code টাকে template string দিয়ে simplify করো:

```js
const total = price * qty;
const text = "Price: " + price + ", Quantity: " + qty + ", Total: " + total;
```

**Think about:**

- Readability

**Concept:**

- Refactoring

---

### Q7

একটা multi-line address format বানাও template string দিয়ে।

**Think about:**

- Real-world formatting

**Concept:**

- Multi-line string

---

## 🟠 C. Intermediate Practice

### Q8

একটা function বানাও:

- student name
- marks array
  নিয়ে multi-line report generate করবে।

**Think about:**

- Loop + template string

**Concept:**

- Dynamic multi-line output

---

### Q9

HTML-like string generate করো template string দিয়ে:

```html
<div>
  <h1>Name</h1>
  <p>Price</p>
</div>
```

Value গুলো dynamic হবে।

**Think about:**

- Indentation
- Readability

**Concept:**

- UI string generation

---

### Q10

নিচের code এর output predict করো:

```js
const x = 10;
console.log(`${x > 5 ? "Big" : "Small"} number`);
```

**Think about:**

- Ternary inside `${}`

**Concept:**

- Expression flexibility

---

## 🔴 D. Advanced / Interview Practice

### Q11

Template string কেন string concatenation থেকে better?
👉 Minimum 4টা reason লেখো।

**Think about:**

- Readability
- Bug reduction

**Concept:**

- Code quality

---

### Q12

এই code টা analyze করো:

```js
const str = `${undefined} ${null} ${true}`;
```

Output কী হবে? কেন?

**Think about:**

- Type coercion

**Concept:**

- JS behavior

---

### Q13 (Interview-style)

Template string ব্যবহার না করে dynamic string বানালে কোন scenario তে bug বেশি হয়?
👉 Real example দাও।

**Think about:**

- Complex concatenation

**Concept:**

- Defensive programming

---

## 4️⃣ Coverage Check

- [x] Multi-line string
- [x] Dynamic interpolation
- [x] Expression evaluation
- [x] Real-world formatting
- [x] Interview reasoning

---

## ✅ Next Step

চাও তো next আমি দিতে পারি:

- Destructuring + Template String
- Tagged Template Literal
- Rest / Spread with String

👉 বলো, কোনটা next? 🚀

```

```
