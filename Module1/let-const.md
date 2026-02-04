# 📘 ES6: Difference between var, let, and const

---

## 1️⃣ Concept Analysis

### 🔑 Core Concepts

### 🔹 Scope Difference

#### var

- **Function scope**
- Block (`{}`) scope মানে না

#### let / const

- **Block scope**
- `{}` এর বাইরে access করা যায় না

```js
{
  var a = 10;
  let b = 20;
}
console.log(a); // 10
console.log(b); // ReferenceError
🔹 Global Scope
Global এ declare করলে:

var → window object এর property হয়

let/const → হয় না

🔹 Reassignment Rules
Keyword	Reassign
var	✅
let	✅
const	❌
🔹 Hoisting Behavior
var
Hoist হয়

Initialize হয় undefined দিয়ে

console.log(a);
var a = 10;
let / const
Hoist হয়

Temporal Dead Zone (TDZ) এ থাকে

console.log(b);
let b = 20;
🔹 const with Primitive vs Reference
Primitive
const x = 5;
x = 10;
Array
const arr = [1, 2];
arr.push(3);
arr = [];
Object
const obj = { a: 1 };
obj.a = 2;
obj = {};
2️⃣ Practice Question Set
🟢 A. Beginner Practice
Q1. Output Prediction
console.log(a);
var a = 10;
Q2. Error or Not?
console.log(b);
let b = 20;
Q3. Reassignment Check
const x = 5;
x = 10;
🟡 B. Core Practice
Q4. Code Rewrite
var total = 100;
total = 120;
Q5. Block Scope Test
{
  var a = 10;
  let b = 20;
}
console.log(a);
console.log(b);
Q6. Fix the Code
const price = 100;
price = price + 20;
🟠 C. Intermediate Practice
Q7. Shopping Cart Scenario
cartItems → array

totalPrice → number

Q8. Object Update Task
const user = {
  name: "Rahim",
  balance: 500
};
Q9. Loop Variable Choice
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}
🔴 D. Advanced / Interview Practice
Q10. Best Practice Question
কেন var avoid করা হয়?

কেন const default?

Q11. What-if Scenario
শুধু var থাকলে কী সমস্যা হতো?

ES6 কেন দরকার?

Q12. Interview Challenge
“const মানে value constant নয়, binding constant”

3️⃣ Coverage Check ✅
✔ var / let / const scope
✔ Hoisting behavior
✔ Reassignment rules
✔ Array & Object mutation
✔ Real-world usage
✔ Interview-level reasoning
```
