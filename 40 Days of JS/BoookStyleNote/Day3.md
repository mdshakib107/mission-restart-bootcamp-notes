# JavaScript Day 03 Study Notes: Operators and Expressions

**ভাষা:** বাংলা  
**Topic:** JavaScript Operators and Expressions  
**Level:** Beginner-friendly  
**লক্ষ্য:** শুধু এই notes পড়েই যেন ভিডিওর সব concept পরিষ্কারভাবে বোঝা যায়।

---

## Table of Contents

1. [Lesson Overview](#lesson-overview)
2. [Basic Setup: HTML থেকে JavaScript load করা](#basic-setup-html-থেকে-javascript-load-করা)
3. [Operands, Operators, Expressions](#operands-operators-expressions)
4. [Different Types of Operators](#different-types-of-operators)
5. [Arithmetic Operators](#arithmetic-operators)
6. [Assignment Operators](#assignment-operators)
7. [Comparison Operators](#comparison-operators)
8. [Logical Operators](#logical-operators)
9. [Conditional / Ternary Operator](#conditional--ternary-operator)
10. [Bitwise Operators](#bitwise-operators)
11. [Relational Operators](#relational-operators)
12. [Grouping and Operator Precedence](#grouping-and-operator-precedence)
13. [`typeof` Operator](#typeof-operator)
14. [`instanceof` Operator](#instanceof-operator)
15. [Important Differences](#important-differences)
16. [Common Mistakes](#common-mistakes)
17. [Assignment / Task Section](#assignment--task-section)
18. [Final Summary](#final-summary)
19. [Practice Checklist](#practice-checklist)

---

## Lesson Overview

এই lesson-এ JavaScript-এর **operators** এবং **expressions** নিয়ে আলোচনা করা হয়েছে। আগের lesson-এ variables, data types, primitive এবং non-primitive values নিয়ে ধারণা দেওয়া হয়েছিল। এই lesson থেকে আস্তে আস্তে **logic building** শুরু হয়।

Programming-এ logic তৈরি করার জন্য আমাদের expression লিখতে হয়, আর expression তৈরির জন্য operators দরকার হয়। যেমন:

```js
let result = 4 + 5;
```

এখানে `+` একটি operator, `4` এবং `5` হলো operands, আর পুরো `let result = 4 + 5` হলো একটি expression.

এই lesson-এ মূলত নিচের operator group-গুলো শেখানো হয়েছে:

| Operator Type | কাজ |
|---|---|
| Arithmetic | যোগ, বিয়োগ, গুণ, ভাগ, remainder, power, increment/decrement |
| Assignment | variable-এ value assign বা update করা |
| Comparison | দুই value compare করে `true` বা `false` পাওয়া |
| Logical | multiple condition combine করা |
| Conditional / Ternary | condition অনুযায়ী value return করা |
| Bitwise | binary level-এ operation করা |
| Relational | object-এর property existence ইত্যাদি check করা |
| Grouping | expression evaluation-এর priority control করা |
| `typeof` | value-এর type জানা |
| `instanceof` | কোনো object নির্দিষ্ট object type-এর instance কিনা check করা |

---

## Basic Setup: HTML থেকে JavaScript load করা

ভিডিওতে একটি basic project setup ব্যবহার করা হয়েছে:

- `index.html`
- `index.js`

HTML file থেকে JavaScript file load করার জন্য `script` tag ব্যবহার করা হয়েছে।

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Day 03</title>
  <script src="index.js" defer></script>
</head>
<body>
  <h1>Day 03</h1>
</body>
</html>
```

### `defer` কেন ব্যবহার করা হয়?

`defer` ব্যবহার করলে browser HTML parse করা শেষ করে তারপর JavaScript file execute করে। এতে DOM পুরোপুরি ready হওয়ার আগে JavaScript run হয়ে unexpected problem হওয়ার chance কমে যায়।

মনে রাখার নিয়ম:

> `defer` মানে: JavaScript file download হবে, কিন্তু execute হবে HTML parsing শেষ হওয়ার পর।

---

## Operands, Operators, Expressions

এই lesson-এর সবচেয়ে foundational concept হলো তিনটি term:

1. **Operator**
2. **Operand**
3. **Expression**

### Operator কী?

Operator হলো এমন একটি symbol বা keyword, যা কোনো value-এর উপর operation চালায়।

উদাহরণ:

```js
let sum = 10 + 20;
```

এখানে `+` হলো operator.

আরও operator:

| Operator | Meaning |
|---|---|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Remainder |
| `**` | Exponentiation |
| `=` | Assignment |
| `===` | Strict equality |
| `&&` | Logical AND |
| `||` | Logical OR |

### Operand কী?

Operand হলো সেই value বা variable, যার উপর operator কাজ করে।

```js
let result = x + y;
```

এখানে:

- `+` হলো operator
- `x` এবং `y` হলো operands

### Expression কী?

Expression হলো এমন code, যা শেষ পর্যন্ত কোনো value-তে resolve হয়।

```js
4 + 5
```

এটি একটি expression, কারণ এর final value হবে `9`.

```js
let x = 4 + 5;
```

এখানে পুরো statement-এ `4 + 5` evaluate হয়ে `9` হয়, তারপর `x` variable-এ assign হয়।

### দুই ধরনের expression

ভিডিওতে দুই ধরনের expression বোঝানো হয়েছে:

| Expression Type | কী করে | Example |
|---|---|---|
| Assignment expression | value assign করে | `x = 2` |
| Evaluating expression | operation করে নতুন value তৈরি করে | `3 + 4` |

#### Assignment expression

```js
let x = 2;
```

এখানে `2` value টি `x` variable-এ assign করা হচ্ছে।

#### Evaluating expression

```js
3 + 4
```

এখানে `3` এবং `4` যোগ হয়ে final value `7` হয়।

#### Combined example

```js
let x = 4 + 5;
```

এখানে:

1. `4 + 5` evaluate হয়।
2. result হয় `9`.
3. `9` value টি `x` variable-এ assign হয়।

মনে রাখার নিয়ম:

> Operator কাজ করে operand-এর উপর, আর expression শেষ পর্যন্ত একটি value তৈরি করে।

---

## Different Types of Operators

এই lesson-এ নিচের operator types আলোচনা করা হয়েছে:

1. Arithmetic operators
2. Assignment operators
3. Comparison operators
4. Relational operators
5. Logical operators
6. Bitwise operators
7. Conditional / Ternary operator
8. Grouping operator
9. `typeof`
10. `instanceof`

---

# Arithmetic Operators

Arithmetic operators numeric values-এর উপর mathematical operation করে এবং সাধারণত একটি numeric value return করে।

## Basic Arithmetic Operators

```js
let a = 10;
let b = 20;

console.log(a + b); // 30
console.log(a - b); // -10
console.log(b - a); // 10
console.log(a * b); // 200
console.log(a / b); // 0.5
```

| Operator | Name | Example | Result |
|---|---|---|---|
| `+` | Addition | `10 + 20` | `30` |
| `-` | Subtraction | `10 - 20` | `-10` |
| `*` | Multiplication | `10 * 20` | `200` |
| `/` | Division | `10 / 20` | `0.5` |

---

## `+` Operator with String

JavaScript-এ `+` operator শুধু number যোগ করে না। String-এর ক্ষেত্রে এটি **concatenation** করে।

```js
let firstName = "Tapas";
let lastName = "Adhikary";

console.log(firstName + lastName);
// TapasAdhikary
```

### Beginner note

Number-এর ক্ষেত্রে:

```js
10 + 20 // 30
```

String-এর ক্ষেত্রে:

```js
"Tapas" + "Adhikary" // "TapasAdhikary"
```

### Common mistake

```js
console.log("10" + 20);
// "1020"
```

এখানে `"10"` string, তাই `+` operator addition না করে concatenation করেছে।

### Better practice

String combine করার জন্য future lesson-এ **template literals** শেখানো হবে। সেটি সাধারণত বেশি readable হয়।

```js
let fullName = `${firstName} ${lastName}`;
```

---

## Exponentiation Operator: `**`

`**` operator power বের করে।

```js
console.log(2 ** 3); // 8
```

কারণ:

```txt
2 ** 3 = 2 × 2 × 2 = 8
```

আরেকটি example:

```js
let a = 10;
let b = 20;

console.log(a ** b);
```

এটি `10` to the power `20` calculate করবে, তাই output অনেক বড় number হবে।

মনে রাখার নিয়ম:

> `a ** b` মানে `a` to the power `b`.

---

## Remainder Operator: `%`

`%` operator division করার পরে remainder return করে।

```js
let a = 12;
let b = 5;

console.log(a % b); // 2
```

কারণ:

```txt
12 / 5 = 2 remainder 2
5 × 2 = 10
12 - 10 = 2
```

### Important

`%` operator percentage বের করার জন্য নয়। এটি remainder বের করে।

### Example: even/odd check

```js
let number = 10;

console.log(number % 2); // 0
```

যদি কোনো number কে `2` দিয়ে ভাগ করলে remainder `0` হয়, তাহলে number টি even.

```js
let number = 11;

console.log(number % 2); // 1
```

এখানে number টি odd.

---

## Increment Operator: `++`

`++` operator কোনো variable-এর value `1` বাড়ায়।

```js
let count = 5;
count++;
console.log(count); // 6
```

কিন্তু `++` operator দুইভাবে ব্যবহার করা যায়:

1. Post-increment: `count++`
2. Pre-increment: `++count`

---

## Post-increment: `count++`

Post-increment প্রথমে current value return করে, তারপর value বাড়ায়।

```js
let count = 5;

console.log(count++); // 5
console.log(count);   // 6
```

Step-by-step:

| Step | কী হলো | count value |
|---|---|---|
| Initial | `count = 5` | `5` |
| `console.log(count++)` | আগে `5` return হলো | `5` print |
| তারপর | count `1` বাড়লো | `6` |
| `console.log(count)` | updated value print হলো | `6` |

মনে রাখার নিয়ম:

> `count++` = আগে use, পরে increase.

---

## Pre-increment: `++count`

Pre-increment আগে value বাড়ায়, তারপর updated value return করে।

```js
let count = 5;

console.log(++count); // 6
console.log(count);   // 6
```

Step-by-step:

| Step | কী হলো | count value |
|---|---|---|
| Initial | `count = 5` | `5` |
| `++count` | আগে count `1` বাড়লো | `6` |
| তারপর | updated value return হলো | `6` print |

মনে রাখার নিয়ম:

> `++count` = আগে increase, পরে use.

---

## Decrement Operator: `--`

`--` operator value `1` কমায়।

এটিও দুইভাবে ব্যবহার হয়:

1. Post-decrement: `count--`
2. Pre-decrement: `--count`

### Post-decrement

```js
let count = 5;

console.log(count--); // 5
console.log(count);   // 4
```

### Pre-decrement

```js
let count = 5;

console.log(--count); // 4
console.log(count);   // 4
```

### Combined example

```js
let count = 5;

console.log(count--); // 5
console.log(count);   // 4
console.log(--count); // 3
```

মনে রাখার নিয়ম:

| Syntax | Meaning |
|---|---|
| `count++` | আগে value return, তারপর `+1` |
| `++count` | আগে `+1`, তারপর value return |
| `count--` | আগে value return, তারপর `-1` |
| `--count` | আগে `-1`, তারপর value return |

---

# Assignment Operators

Assignment operators variable-এ value assign বা update করতে ব্যবহৃত হয়।

## Basic Assignment

```js
let x = 10;
```

এখানে `=` operator `10` value টি `x` variable-এ assign করেছে।

---

## Compound Assignment Operators

Compound assignment operator হলো shorthand.

```js
let x = 10;

x = x + 5;
```

উপরের code shorthand-এ লেখা যায়:

```js
x += 5;
```

দুটোর meaning একই।

## Examples

```js
let x = 10;

x += 5; // x = x + 5 => 15
x -= 3; // x = x - 3 => 12
x *= 2; // x = x * 2 => 24
x /= 4; // x = x / 4 => 6

console.log(x); // 6
```

### Step-by-step explanation

| Line | Operation | x value |
|---|---|---|
| `let x = 10` | initial value | `10` |
| `x += 5` | `x = 10 + 5` | `15` |
| `x -= 3` | `x = 15 - 3` | `12` |
| `x *= 2` | `x = 12 * 2` | `24` |
| `x /= 4` | `x = 24 / 4` | `6` |

### Common mistake

অনেকে ভাবে প্রতিটি line-এ `x` আবার `10` থেকে শুরু হচ্ছে। এটি ভুল।

```js
let x = 10;

x += 5; // এখন x = 15
x -= 3; // এখানে x হলো 15, 10 নয়
```

মনে রাখার নিয়ম:

> Assignment operator variable-এর current value ব্যবহার করে নতুন value তৈরি করে।

---

# Comparison Operators

Comparison operators দুইটি value compare করে এবং result হিসেবে Boolean value return করে:

- `true`
- `false`

## Basic Comparison Operators

| Operator | Name | Example | Meaning |
|---|---|---|---|
| `==` | Loose equality | `3 == "3"` | type conversion করে compare |
| `===` | Strict equality | `3 === "3"` | type ও value দুটোই compare |
| `!=` | Loose not equal | `3 != "3"` | type conversion করে not equal check |
| `!==` | Strict not equal | `3 !== "3"` | type ও value ধরে not equal check |
| `>` | Greater than | `4 > 3` | left বড় কিনা |
| `<` | Less than | `2 < 7` | left ছোট কিনা |
| `>=` | Greater than or equal | `2 >= 2` | বড় অথবা equal কিনা |
| `<=` | Less than or equal | `3 <= 9` | ছোট অথবা equal কিনা |

---

## Loose Equality: `==`

Loose equality operator value compare করার আগে type conversion বা coercion করতে পারে।

```js
console.log(4 == 5); // false
```

এটি expected.

কিন্তু:

```js
console.log(0 == false); // true
```

এখানে `0` number এবং `false` Boolean. তবুও output `true`, কারণ JavaScript loose equality-তে type conversion করে।

আরেকটি example:

```js
console.log(3 == "3"); // true
```

এখানে `3` number, `"3"` string. কিন্তু loose equality type coercion করে result `true` করে।

### কেন সমস্যা?

ধরা যাক API থেকে number `3` আসছে, আর input box থেকে value আসছে string `"3"` হিসেবে।

```js
let apiValue = 3;
let inputValue = "3";

console.log(apiValue == inputValue); // true
```

এটি অনেক সময় misleading হতে পারে, কারণ value দেখতে একই হলেও type আলাদা।

---

## Strict Equality: `===`

Strict equality operator type এবং value দুটোই compare করে।

```js
console.log(3 === "3"); // false
```

কারণ:

- left side: number
- right side: string

```js
console.log(3 === 3); // true
```

কারণ type এবং value দুটোই same.

### Strict equality rules

| Case | Result |
|---|---|
| operands-এর type আলাদা | `false` |
| দুটোই `null` | `true` |
| দুটোই `undefined` | `true` |
| কোনো operand `NaN` হলে | `false` |
| object compare করলে reference compare হয় | same reference না হলে `false` |

Examples:

```js
console.log(null === null);           // true
console.log(undefined === undefined); // true
console.log(NaN === NaN);             // false
```

### `NaN` note

`NaN` মানে **Not a Number**. JavaScript-এ `NaN === NaN` false হয়। এটি special case.

---

## Object comparison with `===`

```js
let obj1 = {
  name: "TapasScript"
};

let obj2 = {
  name: "TapasScript"
};

console.log(obj1 === obj2); // false
```

দেখতে object দুটো same, কিন্তু result `false`.

### কেন?

Non-primitive values যেমন object memory-এর heap area-তে store হয়। Variable আসলে object value ধরে না, reference বা memory address ধরে।

ধরি:

```txt
obj1 -> memory address XX11
obj2 -> memory address YY22
```

দুই object-এর ভিতরের value same হলেও তারা আলাদা memory location-এ আছে। তাই `obj1 === obj2` false.

### Same reference হলে true

```js
let obj1 = {
  name: "TapasScript"
};

let obj2 = obj1;

console.log(obj1 === obj2); // true
```

এখানে `obj2` নতুন object না; `obj1`-এর same reference ব্যবহার করছে।

মনে রাখার নিয়ম:

> Object compare করলে value নয়, reference compare হয়।

---

## Loose Not Equal: `!=`

```js
console.log(3 != "3"); // false
```

কারণ loose comparison type conversion করে `"3"` কে `3` হিসেবে consider করতে পারে।

ভিডিওতে বলা হয়েছে, `==` এবং `!=` avoid করা ভালো।

---

## Strict Not Equal: `!==`

```js
console.log(3 !== "3"); // true
```

কারণ type আলাদা।

Better practice:

```js
if (value !== null) {
  // do something
}
```

---

## Greater Than: `>`

```js
console.log(4 > 3); // true
console.log(1 > 7); // false
```

---

## Greater Than or Equal: `>=`

```js
console.log(2 >= 4); // false
console.log(2 >= 2); // true
```

`>=` check করে:

1. left value কি বড়?
2. না হলে equal?

যেকোনো একটি true হলেই result true.

---

## Less Than: `<`

```js
console.log(4 < 3); // false
console.log(2 < 7); // true
```

---

## Less Than or Equal: `<=`

```js
console.log(3 <= 9); // true
console.log(3 <= 3); // true
```

---

## `>=` vs `=>` confusion

Beginner-রা অনেক সময় `>=` এবং `=>` গুলিয়ে ফেলে।

| Symbol | Meaning |
|---|---|
| `>=` | Greater than or equal |
| `=>` | Arrow function syntax |

Correct:

```js
age >= 18
```

Arrow function:

```js
const add = (a, b) => a + b;
```

মনে রাখার নিয়ম:

> Comparison-এ আগে `>` তারপর `=` হয়: `>=`.  
> Function-এর arrow হলো `=>`.

---

# Logical Operators

Logical operators সাধারণত Boolean values বা Boolean expression-এর সাথে ব্যবহার করা হয়।

ভিডিওতে আলোচিত logical operators:

1. Logical AND: `&&`
2. Logical OR: `||`
3. Logical NOT: `!`
4. Nullish coalescing: `??`

---

## Truthy এবং Falsy ধারণা

Logical operator বোঝার আগে `truthy` এবং `falsy` জানা দরকার।

JavaScript-এ কিছু value Boolean context-এ `false` হিসেবে behave করে। এগুলোকে falsy values বলা হয়।

### Common falsy values

| Value | Meaning |
|---|---|
| `false` | Boolean false |
| `0` | zero |
| `""` | empty string |
| `null` | intentionally empty |
| `undefined` | value assigned হয়নি |
| `NaN` | Not a Number |

বাকি বেশিরভাগ value truthy.

```js
"cow"  // truthy
"hello" // truthy
1      // truthy
[]     // truthy
{}     // truthy
```

---

## Logical AND: `&&`

Syntax:

```js
op1 && op2
```

### Rule

`&&` operator left থেকে check করে।

- যদি first operand falsy হয়, তাহলে first operand return করে।
- যদি first operand truthy হয়, তাহলে second operand return করে।

### Boolean examples

```js
console.log(false && false); // false
console.log(true && false);  // false
console.log(true && true);   // true
console.log(false && true);  // false
```

Truth table:

| op1 | op2 | op1 && op2 |
|---|---|---|
| `false` | `false` | `false` |
| `true` | `false` | `false` |
| `true` | `true` | `true` |
| `false` | `true` | `false` |

মনে রাখার shortcut:

> `&&`-এ সব condition true হলে final result true হয়। একটিও false হলে সাধারণ Boolean case-এ false.

### Non-Boolean example

```js
console.log("cow" && "horse"); // "horse"
```

কেন?

- `"cow"` truthy
- তাই `&&` second operand return করে
- output: `"horse"`

### Real programming example

```js
console.log(4 > 5 && 4 == 6);
```

Step-by-step:

```js
4 > 5  // false
4 == 6 // false
```

So:

```js
false && false // false
```

Final output:

```js
false
```

---

## Logical OR: `||`

Syntax:

```js
op1 || op2
```

### Rule

`||` operator left থেকে check করে।

- যদি first operand truthy হয়, তাহলে first operand return করে।
- যদি first operand falsy হয়, তাহলে second operand return করে।

### Boolean examples

```js
console.log(false || false); // false
console.log(true || false);  // true
console.log(true || true);   // true
console.log(false || true);  // true
```

Truth table:

| op1 | op2 | op1 \|\| op2 |
|---|---|---|
| `false` | `false` | `false` |
| `true` | `false` | `true` |
| `true` | `true` | `true` |
| `false` | `true` | `true` |

মনে রাখার shortcut:

> `||`-এ যেকোনো একটি condition true হলেই result true হয়।

### Non-Boolean example

```js
console.log("cow" || "horse"); // "cow"
```

কেন?

- `"cow"` truthy
- `||` first truthy value return করে
- তাই output `"cow"`

---

## Logical NOT: `!`

`!` operator কোনো value-এর Boolean meaning reverse করে।

```js
console.log(!true);  // false
console.log(!false); // true
```

### Truthy/Falsy value-এর সাথে

```js
console.log(!"hello"); // false
console.log(!0);       // true
```

কারণ:

- `"hello"` truthy, তাই `!"hello"` false
- `0` falsy, তাই `!0` true

### Double NOT: `!!`

ভিডিওতে direct না থাকলেও practice-এর জন্য useful:

```js
console.log(!!"hello"); // true
console.log(!!0);       // false
```

`!!` দিয়ে কোনো value-এর Boolean equivalent পাওয়া যায়।

---

## Nullish Coalescing Operator: `??`

Syntax:

```js
op1 ?? op2
```

### Rule

- যদি first operand `null` বা `undefined` হয়, তাহলে second operand return করবে।
- না হলে first operand return করবে।

```js
let a1 = null ?? 1;
console.log(a1); // 1

let a2 = undefined ?? 3;
console.log(a2); // 3

let a3 = false ?? "TapasScript";
console.log(a3); // false

let a4 = 0 ?? "Tapas";
console.log(a4); // 0
```

### কেন `false` বা `0` return হলো?

কারণ `??` শুধু `null` এবং `undefined` check করে।  
`false`, `0`, `""` falsy হলেও nullish নয়।

### `||` vs `??`

| Expression | Result | Explanation |
|---|---|---|
| `0 || "default"` | `"default"` | `0` falsy |
| `0 ?? "default"` | `0` | `0` null/undefined নয় |
| `false || "default"` | `"default"` | `false` falsy |
| `false ?? "default"` | `false` | `false` null/undefined নয় |
| `null ?? "default"` | `"default"` | `null` nullish |
| `undefined ?? "default"` | `"default"` | `undefined` nullish |

মনে রাখার নিয়ম:

> `??` default value দেওয়ার সময় useful, যখন শুধু `null` বা `undefined` হলে fallback চাই।

---

# Conditional / Ternary Operator

Ternary operator condition-এর উপর ভিত্তি করে দুটি value-এর মধ্যে একটি return করে।

Syntax:

```js
condition ? valueIfTrue : valueIfFalse
```

### Structure

| Part | Meaning |
|---|---|
| `condition` | এমন expression যা true/false result দেয় |
| `?` | true হলে কোন value return হবে |
| `:` | false হলে কোন value return হবে |

### Example

```js
let age = 23;

let result = age >= 60 ? "Senior citizen" : "Non senior citizen";

console.log(result); // Non senior citizen
```

Step-by-step:

```js
age >= 60
23 >= 60
false
```

Condition false, তাই `:`-এর পরের value return হবে:

```js
"Non senior citizen"
```

### আরেকটি example

```js
let marks = 80;

let grade = marks >= 40 ? "Pass" : "Fail";

console.log(grade); // Pass
```

### Common mistake

Ternary operator অতিরিক্ত nested করলে code unreadable হয়ে যায়।

Bad:

```js
let result = score > 90 ? "A" : score > 80 ? "B" : score > 70 ? "C" : "D";
```

Beginner stage-এ complex condition হলে `if...else` বেশি readable হতে পারে।

মনে রাখার নিয়ম:

> Ternary হলো ছোট decision-making expression.

---

# Bitwise Operators

Bitwise operators operands-কে binary বা 32-bit representation হিসেবে treat করে operation করে।

JavaScript-এ number decimal হিসেবে লিখলেও bitwise operation করার সময় সেটি binary form-এ consider করা হয়।

ভিডিওতে আলোচিত bitwise operators:

| Operator | Name |
|---|---|
| `&` | Bitwise AND |
| `|` | Bitwise OR |
| `^` | Bitwise XOR |
| `~` | Bitwise NOT |
| `<<` | Left shift |
| `>>` | Right shift |

---

## Decimal থেকে Binary বুঝা

ধরা যাক decimal number `15`.

15 কে binary করতে বারবার 2 দিয়ে divide করে remainder নিতে হয়।

```txt
15 / 2 = 7 remainder 1
7 / 2  = 3 remainder 1
3 / 2  = 1 remainder 1
1 / 2  = 0 remainder 1
```

তাই `15` এর binary:

```txt
1111
```

Decimal `9`:

```txt
9 / 2 = 4 remainder 1
4 / 2 = 2 remainder 0
2 / 2 = 1 remainder 0
1 / 2 = 0 remainder 1
```

তাই `9` এর binary:

```txt
1001
```

---

## Bitwise AND: `&`

```js
console.log(15 & 9); // 9
```

Binary representation:

```txt
15 = 1111
9  = 1001
```

Bitwise AND:

```txt
  1111
& 1001
------
  1001
```

Binary `1001` decimal-এ `9`.

### AND rule

| Bit 1 | Bit 2 | Result |
|---|---|---|
| 1 | 1 | 1 |
| 1 | 0 | 0 |
| 0 | 1 | 0 |
| 0 | 0 | 0 |

মনে রাখার নিয়ম:

> Bitwise AND-এ দুটো bit-ই `1` হলে result `1`.

---

## Binary থেকে Decimal

Binary `1001` কে decimal করতে:

```txt
Position: 3 2 1 0
Binary:   1 0 0 1
```

Calculation:

```txt
1 × 2^0 = 1
0 × 2^1 = 0
0 × 2^2 = 0
1 × 2^3 = 8

Total = 1 + 0 + 0 + 8 = 9
```

---

## Bitwise OR: `|`

```js
console.log(15 | 9); // 15
```

Binary:

```txt
15 = 1111
9  = 1001
```

OR operation:

```txt
  1111
| 1001
------
  1111
```

Binary `1111` decimal-এ `15`.

### OR rule

| Bit 1 | Bit 2 | Result |
|---|---|---|
| 1 | 1 | 1 |
| 1 | 0 | 1 |
| 0 | 1 | 1 |
| 0 | 0 | 0 |

মনে রাখার নিয়ম:

> Bitwise OR-এ অন্তত একটি bit `1` হলেই result `1`.

---

## Bitwise XOR: `^`

```js
console.log(15 ^ 9); // 6
```

Binary:

```txt
15 = 1111
9  = 1001
```

XOR operation:

```txt
  1111
^ 1001
------
  0110
```

Binary `0110` decimal-এ:

```txt
0 × 2^0 = 0
1 × 2^1 = 2
1 × 2^2 = 4
0 × 2^3 = 0

Total = 6
```

### XOR rule

| Bit 1 | Bit 2 | Result |
|---|---|---|
| 1 | 1 | 0 |
| 1 | 0 | 1 |
| 0 | 1 | 1 |
| 0 | 0 | 0 |

মনে রাখার নিয়ম:

> XOR-এ exactly one bit `1` হলে result `1`; দুটো same হলে `0`.

---

## Left Shift: `<<`

Left shift bits-কে left side-এ সরায় এবং right side-এ zero বসায়।

```js
console.log(9 << 2); // 36
```

Decimal `9` এর binary:

```txt
1001
```

`<< 2` মানে দুই ঘর left shift:

```txt
1001 << 2 = 100100
```

Binary `100100` decimal-এ `36`.

### Easy formula

Positive number-এর ক্ষেত্রে সাধারণভাবে:

```txt
x << n ≈ x × 2^n
```

So:

```txt
9 << 2 = 9 × 2^2 = 9 × 4 = 36
```

---

## Right Shift: `>>`

Right shift bits-কে right side-এ সরায়।

```js
console.log(9 >> 2); // 2
```

Decimal `9` এর binary:

```txt
1001
```

`>> 2` করলে right side-এ দুই bit shift হয়:

```txt
1001 >> 2 = 10
```

Binary `10` decimal-এ `2`.

### Easy formula

Positive number-এর ক্ষেত্রে সাধারণভাবে:

```txt
x >> n ≈ Math.floor(x / 2^n)
```

So:

```txt
9 >> 2 = Math.floor(9 / 4) = 2
```

---

## Bitwise NOT: `~`

ভিডিওতে operator হিসেবে mention করা হয়েছে, detail-এ explain করা হয়নি। Beginner-friendly ধারণা:

```js
console.log(~5); // -6
```

JavaScript-এ `~x` সাধারণত `-(x + 1)` এর মতো result দেয়।

```txt
~5 = -6
~0 = -1
```

Bitwise NOT advanced topic হিসেবে পরে আরও ভালোভাবে বোঝা যায়।

---

## Bitwise Operators কখন দরকার?

Beginner JavaScript-এ bitwise operators প্রতিদিন ব্যবহার নাও হতে পারে। তবে এগুলো দরকার হতে পারে:

- binary flags
- permissions
- low-level operation
- performance-sensitive code
- graphics বা algorithmic problems
- interview question

মনে রাখার নিয়ম:

> Bitwise operation করার আগে decimal number binary হিসেবে চিন্তা করতে হবে।

---

# Relational Operators

ভিডিওতে relational operator হিসেবে `in` keyword mention করা হয়েছে।

## `in` Operator

`in` operator কোনো object-এ নির্দিষ্ট property আছে কিনা check করতে পারে।

```js
const user = {
  name: "Tapas",
  age: 30
};

console.log("name" in user); // true
console.log("email" in user); // false
```

ভিডিওতে বলা হয়েছে, object lesson-এ এটি ভালোভাবে শেখানো হবে। Instructor এটিও বলেছেন যে তিনি `in` operator ব্যবহার করতে খুব encourage করেন না; object শেখার সময় এর reason explain করবেন।

### Beginner note

এখন শুধু মনে রাখুন:

> `in` operator object-এর property existence check করতে পারে।

---

# Grouping and Operator Precedence

Grouping operator হলো parentheses:

```js
()
```

এটি expression evaluation-এর priority control করে।

---

## Operator Precedence কী?

এক expression-এ multiple operator থাকলে JavaScript কোন operator আগে evaluate করবে, সেটিই operator precedence.

Mathematics-এর BODMAS/BIDMAS rule-এর মতো programming-এও precedence আছে।

### Example without grouping

```js
let p = 1;
let q = 2;
let r = 3;

console.log(p + q * r); // 7
```

কেন?

Multiplication-এর precedence addition-এর চেয়ে বেশি।

Step-by-step:

```txt
p + q * r
1 + 2 * 3
1 + 6
7
```

---

## Grouping দিয়ে precedence change করা

```js
let p = 1;
let q = 2;
let r = 3;

console.log((p + q) * r); // 9
```

Step-by-step:

```txt
(p + q) * r
(1 + 2) * 3
3 * 3
9
```

### Comparison

| Expression | Evaluation | Result |
|---|---|---|
| `1 + 2 * 3` | `1 + 6` | `7` |
| `(1 + 2) * 3` | `3 * 3` | `9` |

মনে রাখার নিয়ম:

> Parentheses দিলে JavaScript আগে parentheses-এর ভিতরের expression evaluate করে।

---

# `typeof` Operator

`typeof` operator কোনো value বা variable-এর type string হিসেবে return করে।

Syntax:

```js
typeof operand
```

এখানে operand একটি value বা variable হতে পারে।

## Examples

```js
console.log(typeof "Tapas"); // "string"
console.log(typeof false);   // "boolean"

let size = 100;
console.log(typeof size);    // "number"
```

### Important

`typeof` result সবসময় string.

```js
typeof 100
```

এটির result:

```js
"number"
```

---

## `typeof` with object

```js
const user = {
  name: "Tapas"
};

console.log(typeof user); // "object"
```

---

## `typeof` with array

```js
let numbers = [1, 2, 3, 4];

console.log(typeof numbers); // "object"
```

### কেন array-এর type object?

JavaScript-এ array technically object type-এর অংশ। তাই `typeof array` করলে `"array"` না এসে `"object"` আসে।

Array check করার better way:

```js
Array.isArray(numbers); // true
```

---

## `typeof` with function

```js
function greet() {
  console.log("Hello");
}

console.log(typeof greet); // "function"
```

---

## Infamous case: `typeof null`

```js
console.log(typeof null); // "object"
```

এটি JavaScript-এর historical mistake হিসেবে পরিচিত। `null` নিজে object নয়, কিন্তু `typeof null` result `"object"` আসে।

### Common mistake

```js
if (typeof value === "object") {
  // value null হতে পারে
}
```

Better check:

```js
if (value !== null && typeof value === "object") {
  // safely object
}
```

মনে রাখার নিয়ম:

> `typeof null` হলো `"object"` — এটা JavaScript-এর special historical behavior.

---

# `instanceof` Operator

`instanceof` operator check করে কোনো object নির্দিষ্ট object type বা constructor/class থেকে তৈরি কিনা।

Syntax:

```js
object instanceof ObjectType
```

## Conceptual example

ধরা যাক একটি `Car` type আছে। সেই type থেকে BMW, Audi, Mahindra car object তৈরি হলো।

তাহলে:

```js
bmw instanceof Car
```

এটি true হতে পারে।

কিন্তু:

```js
fish instanceof Car
```

এটি false হবে, কারণ fish car type থেকে তৈরি নয়।

## JavaScript example

```js
let numbers = [1, 2, 3];

console.log(numbers instanceof Array);  // true
console.log(numbers instanceof Object); // true
```

### Instructor note

ভিডিওতে বলা হয়েছে, `instanceof` object, prototype, class ইত্যাদি শেখার পর আরও পরিষ্কার হবে। তাই এখন high-level ধারণা রাখাই যথেষ্ট।

মনে রাখার নিয়ম:

> `instanceof` check করে object কোন object type থেকে এসেছে।

---

# Important Differences

## `==` vs `===`

| Topic | `==` | `===` |
|---|---|---|
| Name | Loose equality | Strict equality |
| Type conversion করে? | হ্যাঁ | না |
| Value compare করে? | হ্যাঁ | হ্যাঁ |
| Type compare করে? | না, আগে convert করতে পারে | হ্যাঁ |
| Safer? | কম safe | বেশি safe |
| Example | `3 == "3"` → `true` | `3 === "3"` → `false` |
| Recommendation | avoid | use |

---

## `!=` vs `!==`

| Topic | `!=` | `!==` |
|---|---|---|
| Name | Loose not equal | Strict not equal |
| Type conversion করে? | হ্যাঁ | না |
| Safer? | কম safe | বেশি safe |
| Example | `3 != "3"` → `false` | `3 !== "3"` → `true` |
| Recommendation | avoid | use |

---

## `&&` vs `||`

| Operator | Rule | Boolean shortcut |
|---|---|---|
| `&&` | first falsy হলে first return, না হলে second return | সব true হলে true |
| `||` | first truthy হলে first return, না হলে second return | যেকোনো এক true হলে true |

---

## `||` vs `??`

| Topic | `||` | `??` |
|---|---|---|
| Checks | falsy value | only `null` or `undefined` |
| `0` হলে | fallback return করে | `0` return করে |
| `false` হলে | fallback return করে | `false` return করে |
| Use case | truthy fallback | null/undefined fallback |

Example:

```js
console.log(0 || "default");  // "default"
console.log(0 ?? "default");  // 0
```

---

## `count++` vs `++count`

| Operator | আগে কী করে? | পরে কী করে? |
|---|---|---|
| `count++` | current value return | increment |
| `++count` | increment | updated value return |

Example:

```js
let count = 5;

console.log(count++); // 5
console.log(++count); // 7
```

Step:

1. `count++` prints `5`, তারপর count হয় `6`
2. `++count` আগে count `7` করে, তারপর print করে `7`

---

## Primitive comparison vs Object comparison

| Type | কী compare হয়? | Example |
|---|---|---|
| Primitive | actual value | `3 === 3` → `true` |
| Object | reference/address | `{a:1} === {a:1}` → `false` |

---

# Common Mistakes

## Mistake 1: `==` ব্যবহার করা

```js
console.log(0 == false); // true
```

এটি beginner-দের confuse করতে পারে।

Better:

```js
console.log(0 === false); // false
```

---

## Mistake 2: `typeof null` দেখে null কে object ভাবা

```js
console.log(typeof null); // "object"
```

Better null check:

```js
if (value === null) {
  console.log("value is null");
}
```

---

## Mistake 3: Array check করতে `typeof` ব্যবহার করা

```js
let numbers = [1, 2, 3];

console.log(typeof numbers); // "object"
```

Better:

```js
console.log(Array.isArray(numbers)); // true
```

---

## Mistake 4: Object value same দেখে `===` true হবে ভাবা

```js
console.log({ name: "A" } === { name: "A" }); // false
```

কারণ দুটো object আলাদা reference.

---

## Mistake 5: `>=` এবং `=>` গুলিয়ে ফেলা

Wrong comparison:

```js
age => 18
```

এটি comparison নয়; এটি arrow function syntax-এর মতো parse হতে পারে।

Correct:

```js
age >= 18
```

---

## Mistake 6: `%` কে percentage ভাবা

```js
console.log(12 % 5); // 2
```

এটি percentage না, remainder.

---

## Mistake 7: `??` এবং `||` একই ভাবা

```js
let value = 0;

console.log(value || 10); // 10
console.log(value ?? 10); // 0
```

`0` falsy, কিন্তু nullish নয়।

---

## Mistake 8: Increment/decrement-এর order না বোঝা

```js
let count = 5;

console.log(count++); // 5
console.log(count);   // 6
```

`count++` দেখে অনেকে প্রথম line-এই `6` expect করে। কিন্তু post-increment আগে old value return করে।

---

# Assignment / Task Section

ভিডিওতে Day 03-এর জন্য GitHub repository-তে `task.md` file থেকে task solve করতে বলা হয়েছে। Transcript-এ actual task list নেই, তাই এখানে lesson-based practice tasks দেওয়া হলো।

## Video-mentioned assignment

- GitHub repository-তে Day 03 folder খুলতে হবে।
- `task.md` file থেকে questions solve করতে হবে।
- Questions মূলত এই video-তে শেখানো operators ও expressions-এর উপর based.
- কিছু task multiple operators combine করে tricky হতে পারে।
- Solve করার পর GitHub link বা solution community/Discord-এ share করতে বলা হয়েছে।

---

## Practice Task 1: Operand, Operator, Expression identify করো

নিচের code-এ operator, operands এবং expression identify করো:

```js
let result = 10 + 20;
```

Expected thinking:

- Operator: `+`, `=`
- Operands: `10`, `20`
- Expression: `10 + 20`, `let result = 10 + 20`

---

## Practice Task 2: Arithmetic output predict করো

```js
let a = 12;
let b = 5;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(a ** 2);
```

নিজে আগে output predict করো, তারপর browser console-এ run করো।

---

## Practice Task 3: Increment/decrement trace করো

```js
let count = 10;

console.log(count++);
console.log(count);
console.log(++count);
console.log(count--);
console.log(--count);
```

প্রতিটি line-এর পাশে count-এর current value লিখে trace করো।

---

## Practice Task 4: Assignment operator use করো

```js
let x = 20;

x += 10;
x -= 5;
x *= 2;
x /= 5;

console.log(x);
```

Step-by-step value table বানাও।

---

## Practice Task 5: Loose vs strict equality

Output predict করো:

```js
console.log(0 == false);
console.log(0 === false);
console.log(3 == "3");
console.log(3 === "3");
console.log(null === null);
console.log(undefined === undefined);
console.log(NaN === NaN);
```

---

## Practice Task 6: Object comparison

```js
let user1 = { name: "Rahim" };
let user2 = { name: "Rahim" };
let user3 = user1;

console.log(user1 === user2);
console.log(user1 === user3);
```

Explain করো কেন প্রথমটি false এবং দ্বিতীয়টি true.

---

## Practice Task 7: Logical operator output

```js
console.log(false && "hello");
console.log(true && "hello");
console.log("cow" && "horse");

console.log(false || "hello");
console.log(true || "hello");
console.log("cow" || "horse");
```

প্রতিটি output-এর জন্য rule লিখে explain করো।

---

## Practice Task 8: `??` operator

```js
console.log(null ?? "default");
console.log(undefined ?? "default");
console.log(false ?? "default");
console.log(0 ?? "default");
console.log("" ?? "default");
```

কোনগুলো fallback return করেছে, কোনগুলো করেনি—কারণ লিখো।

---

## Practice Task 9: Ternary operator

একটি variable `marks` নাও। যদি marks `40` বা তার বেশি হয়, তাহলে `"Pass"` return করবে, না হলে `"Fail"`.

```js
let marks = 75;

let result = marks >= 40 ? "Pass" : "Fail";

console.log(result);
```

আরও practice:

- age `18` বা বেশি হলে `"Adult"`
- age `60` বা বেশি হলে `"Senior citizen"`
- temperature `30` এর বেশি হলে `"Hot"`

---

## Practice Task 10: Bitwise calculation manually করো

Manually calculate করো:

```js
console.log(15 & 9);
console.log(15 | 9);
console.log(15 ^ 9);
console.log(9 << 2);
console.log(9 >> 2);
```

প্রতিটি ক্ষেত্রে decimal to binary এবং binary to decimal conversion দেখাও।

---

## Practice Task 11: Grouping and precedence

Output predict করো:

```js
let p = 1;
let q = 2;
let r = 3;

console.log(p + q * r);
console.log((p + q) * r);
console.log(p * q + r);
console.log(p * (q + r));
```

---

## Practice Task 12: `typeof`

```js
console.log(typeof "hello");
console.log(typeof 100);
console.log(typeof false);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof [1, 2, 3]);
console.log(typeof function () {});
```

Special cases আলাদা করে লিখো:

- `typeof null`
- `typeof array`
- `typeof function`

---

# Final Summary

এই lesson থেকে সবচেয়ে গুরুত্বপূর্ণ বিষয়গুলো:

1. **Operator** হলো symbol বা keyword যা value-এর উপর কাজ করে।
2. **Operand** হলো সেই value বা variable যার উপর operator কাজ করে।
3. **Expression** হলো code যা শেষ পর্যন্ত value-তে resolve হয়।
4. Arithmetic operators দিয়ে mathematical operation করা হয়।
5. `+` number-এর ক্ষেত্রে addition, string-এর ক্ষেত্রে concatenation করতে পারে।
6. `%` remainder দেয়, percentage না।
7. `++` এবং `--` pre/post position অনুযায়ী আলাদা behavior করে।
8. Assignment operators variable-এর current value update করতে shorthand দেয়।
9. `==` এবং `!=` type coercion করে; beginner এবং real project-এ এগুলো avoid করা ভালো।
10. `===` এবং `!==` strict comparison করে, তাই safer.
11. Object compare করলে value নয়, reference compare হয়।
12. Logical `&&` first falsy অথবা second operand return করে।
13. Logical `||` first truthy অথবা second operand return করে।
14. `??` শুধু `null` এবং `undefined` হলে fallback দেয়।
15. Ternary operator ছোট condition-based expression লেখার জন্য useful.
16. Bitwise operators binary level-এ কাজ করে।
17. Grouping `()` দিয়ে precedence control করা যায়।
18. `typeof` type string return করে, কিন্তু `typeof null` হলো `"object"` — এটি special case.
19. Array-এর `typeof` result `"object"` আসে, তাই array check করতে `Array.isArray()` better.
20. `instanceof` object কোনো object type/class/constructor থেকে তৈরি কিনা check করে।

---

# Practice Checklist

নিজে check করো তুমি নিচেরগুলো পারো কিনা:

- [ ] Operator, operand এবং expression identify করতে পারি।
- [ ] Assignment expression এবং evaluating expression-এর difference বুঝি।
- [ ] Arithmetic operators দিয়ে calculation করতে পারি।
- [ ] `%` operator দিয়ে remainder বের করতে পারি।
- [ ] `count++`, `++count`, `count--`, `--count` trace করতে পারি।
- [ ] Compound assignment operators যেমন `+=`, `-=`, `*=`, `/=` ব্যবহার করতে পারি।
- [ ] `==` vs `===` difference explain করতে পারি।
- [ ] `!=` vs `!==` difference explain করতে পারি।
- [ ] Object comparison কেন reference-based তা বুঝি।
- [ ] `>`, `<`, `>=`, `<=` ব্যবহার করতে পারি।
- [ ] `&&` এবং `||`-এর return rule বুঝি।
- [ ] Truthy এবং falsy values identify করতে পারি।
- [ ] `!` দিয়ে Boolean negate করতে পারি।
- [ ] `??` দিয়ে null/undefined fallback দিতে পারি।
- [ ] Ternary operator দিয়ে simple condition লিখতে পারি।
- [ ] Decimal থেকে binary এবং binary থেকে decimal basic conversion করতে পারি।
- [ ] Bitwise `&`, `|`, `^`, `<<`, `>>` manually trace করতে পারি।
- [ ] Grouping `()` দিয়ে precedence change করতে পারি।
- [ ] `typeof`-এর common result বলতে পারি।
- [ ] `typeof null` এবং `typeof array` special case মনে আছে।
- [ ] `instanceof` কী high-level idea বুঝি।
- [ ] ভিডিওতে দেওয়া Day 03 task নিজে solve করার জন্য প্রস্তুত।

---

## Revision Tip

প্রতিটি operator মুখস্থ করার চেয়ে ভালো হলো:

1. ছোট code লিখো।
2. output আগে predict করো।
3. তারপর console-এ run করো।
4. mismatch হলে step-by-step reason লিখো।

এইভাবে practice করলে JavaScript operators শুধু theoretical নয়, practical logic building-এর অংশ হয়ে যাবে।
