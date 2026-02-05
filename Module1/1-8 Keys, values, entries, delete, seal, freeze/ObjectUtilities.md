````md
# ES6 Object Utilities — keys, values, entries, delete, seal, freeze

## Complete Practice Question Set (Advanced Object Control)

## 📌 Context

এই Topic টা **JavaScript Object কে inspect, control, protect** করার জন্য খুব গুরুত্বপূর্ণ।  
Real-world এ:

- API response iterate করা
- Object কে accidental change থেকে protect করা
- Interview প্রশ্নে frequently আসে

এই practice set এ থাকবে:

- Explanation + Behavior analysis
- Beginner → Advanced practice
- `freeze` vs `seal` clear difference

---

## 1️⃣ Concept Analysis

### Core Concepts to Learn

1. **Object.keys(obj)**
   - Object এর সব property name → array

2. **Object.values(obj)**
   - Object এর সব value → array

3. **Object.entries(obj)**
   - `[key, value]` pair → array of arrays

4. **delete operator**
   - Object থেকে property remove করে

5. **Object.freeze(obj)**
   - ❌ add
   - ❌ delete
   - ❌ update  
     → Object fully immutable (top-level)

6. **Object.seal(obj)**
   - ❌ add
   - ❌ delete
   - ✅ update existing property

---

## 2️⃣ Code Analysis (Given Code)

### 🔹 keys, values, entries

```js
const keys = Object.keys(employee);
const values = Object.values(employee);
const entries = Object.entries(employee);
```
````

- `keys` → `['name', 'designation', 'salary', 'experience']`
- `values` → corresponding values
- `entries` → `[ ['name','Raja Rani'], ... ]`

👉 Loop, map, filter করার জন্য খুব useful

---

### 🔹 Object.freeze()

```js
Object.freeze(employee);

delete employee.experience;
employee.salary = employee.salary + 5000;
employee.location = "Dhaka";
```

👉 কোনটাই কাজ করবে না
Object unchanged থাকবে

---

### 🔹 Object.seal()

```js
Object.seal(employee);

delete employee.experience; // ❌
employee.location = "Dhaka"; // ❌
employee.salary += 5000; // ✅
```

👉 Existing property update allowed

---

## 3️⃣ Practice Question Set

---

## 🟢 A. Beginner Practice

### Q1

নিচের code এর output কী হবে?

```js
const person = { name: "A", age: 20 };
console.log(Object.keys(person));
```

**Think about:**

- keys output format

**Concept:**

- Object.keys

---

### Q2

এই code এ `values` array তে কয়টা element থাকবে?

```js
const book = { title: "JS", price: 500, author: "X" };
const v = Object.values(book);
```

**Think about:**

- Property count

**Concept:**

- Object.values

---

### Q3

নিচের code টা explain করো:

```js
Object.entries({ a: 1, b: 2 });
```

**Think about:**

- Structure of result

**Concept:**

- entries basics

---

### Q4

এই code এ delete কাজ করবে নাকি করবে না?

```js
const obj = { x: 10 };
delete obj.x;
```

**Think about:**

- delete behavior

**Concept:**

- delete operator

---

## 🟡 B. Core Practice

### Q5

একটা employee object নাও এবং:

- keys বের করো
- values বের করো
- entries বের করো

👉 Output structure লিখো।

**Think about:**

- Difference between 3 methods

**Concept:**

- Object inspection

---

### Q6

`Object.entries()` ব্যবহার করে object এর সব key-value loop করো।

**Think about:**

- for...of loop

**Concept:**

- Iteration with entries

---

### Q7

নিচের code টা কেন dangerous explain করো:

```js
delete user.isAdmin;
```

**Think about:**

- Data integrity

**Concept:**

- delete misuse

---

## 🟠 C. Intermediate Practice

### Q8

একটা config object বানাও:

- App name
- version
- debug mode

👉 Object.freeze ব্যবহার করে config protect করো।

**Think about:**

- Accidental mutation prevention

**Concept:**

- Freeze in real-world

---

### Q9

একটা user profile object নাও:

- name
- email
- age

👉 Object.seal দিয়ে:

- age update করো
- নতুন property add করার চেষ্টা করো

👉 Behavior explain করো।

**Think about:**

- Seal rules

**Concept:**

- Controlled mutability

---

### Q10

নিচের code এর final object কেমন হবে?

```js
const data = { a: 1, b: 2 };
Object.seal(data);
delete data.a;
data.b = 5;
data.c = 10;
```

**Think about:**

- Which operations allowed

**Concept:**

- Seal behavior analysis

---

## 🔴 D. Advanced / Interview Practice

### Q11

`Object.freeze()` কেন shallow freeze?
👉 Nested object example দিয়ে explain করো।

**Think about:**

- Reference behavior

**Concept:**

- Shallow vs deep immutability

---

### Q12

Freeze আর Seal এর পার্থক্য table আকারে লেখো।

**Think about:**

- Add
- Delete
- Update

**Concept:**

- Comparison clarity

---

### Q13 (Interview-style)

Production code এ:

- কখন `freeze`
- কখন `seal`
- কখন কিছুই না
  ব্যবহার করবে?

👉 Real-world scenario দাও।

**Think about:**

- Performance
- Flexibility

**Concept:**

- Engineering judgment

---

## 4️⃣ Coverage Check

- [x] Object.keys
- [x] Object.values
- [x] Object.entries
- [x] delete operator
- [x] Object.freeze
- [x] Object.seal
- [x] Real-world usage
- [x] Interview depth

---

## 🧠 Quick Cheat Sheet

```js
Object.keys(obj); // ['key1', 'key2']
Object.values(obj); // [value1, value2]
Object.entries(obj); // [[k,v],[k,v]]

Object.freeze(obj); // no add, delete, update
Object.seal(obj); // update allowed only
```

---

## ✅ Next Step

চাও তো next আমি দিতে পারি:

- for...in vs Object methods
- Deep Freeze utility function
- Immutable update patterns

👉 বলো, কোনটা next? 🚀

```

```
