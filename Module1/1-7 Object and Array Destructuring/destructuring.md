````md
# ES6 Advanced: Object & Array Destructuring

## Complete Practice Question Set

## 📌 Context

এই practice set টা **Object & Array Destructuring (Advanced level)** পুরোপুরি **practice করে শেখার জন্য** বানানো।

লক্ষ্য:

- Clean code লেখা
- Repetitive access কমানো
- Real-world calculation & data extraction সহজ করা

---

## 1️⃣ Concept Analysis

### Core Concepts to Learn

1. **Object Destructuring**
   - Object থেকে property extract করা
   - Default value assign করা
   - Clean & readable code

2. **Array Destructuring**
   - Position-based value extract
   - Partial extraction
   - Skip values

3. **Default Value in Destructuring**
   - Missing property হলে fallback value

4. **Destructuring + Calculation**
   - Business logic simplify করা
   - Repetitive `obj.property` avoid করা

5. **Real-world Usage**
   - API response
   - Configuration object
   - Data processing

---

## 2️⃣ Code Analysis (Given Code)

### Object Destructuring with Default

```js
const { price, quantity, tax = 7 } = { name: "shirt", price: 500, quantity: 7 };
```
````

- `price` → 500
- `quantity` → 7
- `tax` → default value (7), কারণ object এ tax নেই

---

### Destructuring + Business Logic

```js
const discount = (price * 20) / 100;
const yourPay = price - discount;
const vatAmount = (price * 7) / 100;
const totalAmount = yourPay + vatAmount;
```

- Clean calculation
- No repeated `product.price`

---

### Partial Object Destructuring

```js
const device = { name: "phone", brand: "samsung", price: 17000 };
const { brand } = device;
```

- Only needed property extract

---

### Array Destructuring

```js
const numbers = [25, 88, 89, 101];
const [first, second] = numbers;
```

- Position-based extraction

```js
const [math, physics] = [90, 99];
console.log(physics);
```

- Variable naming is developer-controlled

---

## 3️⃣ Practice Question Set

---

## 🟢 A. Beginner Practice

### Q1

নিচের code এর output কী হবে?

```js
const product = { name: "pen", price: 10 };
const { price, quantity = 1 } = product;
console.log(price, quantity);
```

**Think about:**

- Default value

**Concept:**

- Object destructuring with default

---

### Q2

এই code টা destructuring দিয়ে rewrite করো:

```js
const user = { name: "Rahim", age: 25 };
const age = user.age;
```

**Think about:**

- Direct extraction

**Concept:**

- Basic destructuring

---

### Q3

নিচের array destructuring এ `b` এর value কী হবে?

```js
const arr = [5, 10, 15];
const [a, b] = arr;
```

**Think about:**

- Index order

**Concept:**

- Array destructuring basics

---

### Q4

এই code এ error হবে নাকি হবে না? explain করো।

```js
const { x } = { y: 10 };
```

**Think about:**

- Missing property

**Concept:**

- Undefined vs error

---

## 🟡 B. Core Practice

### Q5

একটা product object নাও এবং destructuring করে বের করো:

- price
- discountRate (default 10)

**Think about:**

- Default value use

**Concept:**

- Defensive destructuring

---

### Q6

এই code টা destructuring ব্যবহার করে simplify করো:

```js
const phone = { brand: "Apple", price: 120000 };
const brand = phone.brand;
const price = phone.price;
```

**Think about:**

- One-line extraction

**Concept:**

- Clean code

---

### Q7

একটা array থেকে:

- first value
- third value
  destructure করে বের করো।

**Think about:**

- Skipping index

**Concept:**

- Advanced array destructuring

---

## 🟠 C. Intermediate Practice

### Q8

একটা shopping product object নাও:

- price
- vat (optional)

👉 Destructuring করে total payable amount calculate করো।

**Think about:**

- Default vat
- Calculation reuse

**Concept:**

- Real-world business logic

---

### Q9

API response simulate করো:

```js
const response = {
  status: 200,
  data: {
    user: "Kamal",
    role: "Admin",
  },
};
```

👉 Destructuring করে শুধু `user` আর `role` বের করো।

**Think about:**

- Nested destructuring

**Concept:**

- Real API handling

---

### Q10

নিচের code এর output predict করো:

```js
const [a, , c] = [1, 2, 3];
console.log(c);
```

**Think about:**

- Skipped value

**Concept:**

- Array position control

---

## 🔴 D. Advanced / Interview Practice

### Q11

Destructuring কেন performance না হলেও **code quality** improve করে?
👉 Minimum 3টা reason লেখো।

**Think about:**

- Readability
- Maintainability

**Concept:**

- Engineering mindset

---

### Q12

এই code টা analyze করো:

```js
const { price = 100 } = {};
```

- Error হবে?
- `price` এর value কী?

**Think about:**

- Empty object destructuring

**Concept:**

- Safe defaults

---

### Q13 (Interview-style)

কখন destructuring avoid করা উচিত?
👉 Real example দাও।

**Think about:**

- Over-destructuring
- Readability loss

**Concept:**

- Balanced engineering decision

---

## 4️⃣ Coverage Check

- [x] Object destructuring
- [x] Default values
- [x] Array destructuring
- [x] Skipping values
- [x] Real-world calculations
- [x] Interview-level thinking

---

## ✅ Next Step

চাও তো next আমি দিতে পারি:

- Nested Destructuring (Deep)
- Destructuring in Function Parameter
- Spread Operator (`...`) with Object & Array

👉 বলো, কোনটা next? 🚀

```

```

````md
# ES6 Destructuring Advanced

## Alias, Deep Property & Dynamic Property Name — Explained with Practice

## 📌 Context

এই অংশটা **Object Destructuring-এর Advanced ব্যবহার** নিয়ে।  
এখানে আমরা ৩টা জিনিস শিখবো:

1. **Alias (rename করে destructuring)**
2. **Deep / Nested property destructuring**
3. **Dynamic property name destructuring**

Goal:

- Real-world object (API / config) সহজে handle করা
- Clean, readable, bug-free code লেখা

---

## 1️⃣ Alias (Rename while Destructuring)

### 🔹 Problem

Object-এর property নাম অনেক সময়:

- খুব লম্বা
- conflict করে
- business meaning clear না

### 🔹 Example

```js
const product = {
  product_name: "Shirt",
  product_price: 500,
};
```
````

### ❌ Without Alias (bad readability)

```js
const productName = product.product_name;
const productPrice = product.product_price;
```

### ✅ With Alias (Destructuring)

```js
const { product_name: name, product_price: price } = product;
```

👉 এখানে:

- `product_name` → `name`
- `product_price` → `price`

🧠 **Rule:**
`propertyName : newVariableName`

---

### 🟢 Practice

```js
const device = { brand_name: "Samsung", device_price: 17000 };
```

👉 Alias ব্যবহার করে:

- `brand`
- `price`
  এই দুইটা variable বানাও।

---

## 2️⃣ Deep / Nested Property Destructuring

### 🔹 Problem

Real-world data (API response) সাধারণত nested হয়।

```js
const response = {
  status: 200,
  data: {
    user: {
      name: "Rahim",
      email: "rahim@gmail.com",
    },
  },
};
```

### ❌ Traditional way

```js
const name = response.data.user.name;
const email = response.data.user.email;
```

### ✅ Deep Destructuring

```js
const {
  data: {
    user: { name, email },
  },
} = response;
```

👉 Directly `name`, `email` পেয়ে গেলে।

🧠 **Rule:**
Object structure অনুযায়ী destructuring structure লিখতে হবে।

---

### 🟢 Practice

```js
const order = {
  id: 1,
  customer: {
    info: {
      name: "Kamal",
      phone: "0123",
    },
  },
};
```

👉 Deep destructuring করে বের করো:

- `name`
- `phone`

---

## 3️⃣ Dynamic Property Name Destructuring

### 🔹 Problem

Property নাম আগে থেকে জানা থাকে না।

```js
const key = "price";

const product = {
  name: "Pen",
  price: 10,
};
```

### ❌ This will NOT work

```js
const { key } = product;
```

### ✅ Correct Way (Computed Property Name)

```js
const { [key]: value } = product;
```

👉 এখানে:

- `key` → `'price'`
- `value` → `product.price`

🧠 **Rule:**
Dynamic property destructuring এর জন্য `[]` ব্যবহার করতে হয়।

---

### 🟢 Practice

```js
const field = "email";
const user = { email: "test@gmail.com", age: 25 };
```

👉 Dynamic destructuring করে `email` বের করো।

---

## 4️⃣ Combining All (Real-world Example)

```js
const apiResponse = {
  status: 200,
  data: {
    product: {
      product_name: "Laptop",
      product_price: 50000,
    },
  },
};

const dynamicKey = "product_price";

const {
  data: {
    product: { product_name: name, [dynamicKey]: price },
  },
} = apiResponse;

console.log(name, price);
```

✅ এখানে একসাথে ব্যবহার হয়েছে:

- Alias
- Deep destructuring
- Dynamic property name

---

## 5️⃣ Common Mistakes ⚠️

1. ❌ Property name ভুল লেখা
2. ❌ Too deep destructuring → unreadable
3. ❌ Dynamic key ছাড়া direct variable name ব্যবহার
4. ❌ Undefined nested level destructuring (optional chaining দরকার হতে পারে)

---

## 6️⃣ Interview Tips 💡

- Alias → naming clarity
- Deep destructuring → API handling
- Dynamic destructuring → flexible config / metadata

👉 Interview এ question আসতে পারে:

> “How do you extract a deeply nested property with a dynamic key?”

---

## ✅ Summary Cheat Sheet

```js
// Alias
const { oldName: newName } = obj;

// Deep
const {
  a: {
    b: { c },
  },
} = obj;

// Dynamic
const { [key]: value } = obj;
```

---

## 🚀 Next Step

চাও তো next আমি দিতে পারি:

- Destructuring in Function Parameters
- Optional Chaining (`?.`) + Destructuring
- Spread Operator Advanced Patterns

👉 বলো, কোনটা next? 🔥

```

```
