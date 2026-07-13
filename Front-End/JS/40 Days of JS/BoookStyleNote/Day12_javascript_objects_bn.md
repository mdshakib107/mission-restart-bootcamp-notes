# JavaScript Day 12: Object ও Object Manipulation

> **মূল পাঠের ধরন:** এটি summary বা short notes নয়। Instructor-এর lecture flow, explanation, analogy, code walkthrough, warning, recap এবং task reference বজায় রেখে বইয়ের একটি পূর্ণাঙ্গ বাংলা অধ্যায় হিসেবে সাজানো হয়েছে।

---

## স্বাগতম: Day 12

সবাইকে স্বাগতম। কেমন আছো? আবারও ফিরে এসেছ **40 Days of JavaScript**-এর Day 12-তে। আজ আমরা আলোচনা করব **object** এবং **object manipulation** নিয়ে।

তুমি যদি 40 Days of JavaScript progress tracker অনুসরণ করে থাকো, তাহলে হয়তো একটি ছোট পরিবর্তন লক্ষ্য করেছ। আগে closure-এর পরপরই `this` keyword শুরু করার কথা ছিল। কিন্তু এখন `this`-এর আগে object এবং object manipulation আনা হয়েছে। কারণ `this` keyword-কে আগের যেকোনো সময়ের তুলনায় অনেক গভীরভাবে বুঝতে হলে object সম্পর্কে ভালো ধারণা থাকা প্রয়োজন। শুধু সামান্য নয়—আজ আমরা object manipulation এবং object-সম্পর্কিত আরও অনেক গুরুত্বপূর্ণ বিষয় বিস্তারিতভাবে শিখব।

আজকের session-এ আমরা দেখব:

- JavaScript object-এর পরিচয়
- Object property
- Nested object
- Object তৈরির বিভিন্ন pattern
- Object reference এবং non-primitive data type হিসেবে object-এর আচরণ
- `Object`-এর গুরুত্বপূর্ণ static method
- Object destructuring এবং এর বাস্তব use case
- Optional chaining

এই ভিডিওতে prototype এবং object-oriented programming গভীরভাবে আলোচনা করা হবে না। তবে এগুলো বাদ দেওয়া হচ্ছে না। JavaScript শেখার সময় একটি সঠিক mental model ধরে এগোনো প্রয়োজন। শুধু দ্রুত syllabus শেষ করার জন্য একটি বিষয় থেকে আরেকটিতে লাফিয়ে গেলে শেখাগুলোর মধ্যে সংযোগ তৈরি হয় না। শেখাগুলোকে একে অপরের সঙ্গে যুক্ত করতে হবে, যাতে দীর্ঘদিন মনে রাখা যায়।

Prototype এবং object-oriented programming পরবর্তী module-এ বিস্তারিত আলোচনা করা হবে। তার আগে object, object manipulation, reference এবং আরও কিছু foundational বিষয় বুঝে নেওয়া জরুরি। তাই কৌতূহল ধরে রাখো এবং আজকের lesson শুরু করা যাক।

---

# 1. JavaScript Object কী?

একটি application-এর data প্রয়োজন। এখন পর্যন্ত আমরা সাধারণ variable ব্যবহার করে data সংরক্ষণ করেছি। সেই variable-গুলোর value ছিল primitive type-এর, যেমন:

- `number`
- `boolean`
- `string`

কিন্তু programming-এ এমন পরিস্থিতি আসবে, যেখানে complex data handle করতে হবে। যেমন:

- একজন user-এর data
- একটি company-এর data
- একজন employee-এর data

এ ধরনের data শুধু একটি `number`, `boolean` বা `string` দিয়ে যথাযথভাবে প্রকাশ করা যায় না। আমাদের এমন একটি structured data format দরকার, যেখানে related information একসঙ্গে রাখা যায় এবং application-এর প্রয়োজন অনুযায়ী পরে retrieve করা যায়।

JavaScript-এ বহুল ব্যবহৃত এমন একটি data structure হলো **object**।

## Object-এর সংজ্ঞা

Object হলো **key-value pair-এর collection**। একে **keyed collection**-ও বলা হয়। অর্থাৎ প্রতিটি value-কে একটি unique key দিয়ে চিহ্নিত করা হয়। পরে সেই key ব্যবহার করে value retrieve করা যায়।

একটি object একাধিক উপায়ে তৈরি করা যায়। প্রথমে সবচেয়ে সরল পদ্ধতি দেখব।

---

# 2. Object Literal Syntax দিয়ে Object তৈরি

Object তৈরির সবচেয়ে straightforward পদ্ধতি হলো **object literal syntax**। এর জন্য এক জোড়া curly braces ব্যবহার করা হয়:

```js
{}
```

এই curly braces নিজেই একটি object। কিন্তু এর ভেতরে কোনো information না থাকায় এটি একটি **empty object**।

Object-ও একটি value। যেমন `10`, `"Tapascript"`, `true` বা `false` একটি value—একইভাবে `{}`-ও একটি value। তাই এটিকে variable-এ assign করা যায়:

```js
let user = {};
```

এখন `user` variable এমন একটি value ধরে রেখেছে, যার type হলো `object`।

## Object-এ Property যোগ করা

এখন `user` object-এ কিছু information রাখি। ধরা যাক, আমরা user-এর `name` এবং `age` রাখতে চাই। Object-এর প্রতিটি information-কে **property** বলা হয়।

Property key-value pair আকারে লেখা হয়। Key এবং value-এর মধ্যে colon (`:`) থাকে এবং একাধিক property comma দিয়ে আলাদা করা হয়।

```js
let user = {
  name: "Tapas",
  age: 40,
};
```

এখানে:

- প্রথম property-এর key হলো `name`, value হলো `"Tapas"`
- দ্বিতীয় property-এর key হলো `age`, value হলো `40`

এই structure-টি মনে রাখো। Object মূলত property-এর collection, আর প্রতিটি property একটি key-value pair।

---

# 3. Object Property Access করা

Object তৈরি করার উদ্দেশ্য হলো application-এর অন্য জায়গায় এর data ব্যবহার করা। তাই object থেকে property value retrieve করতে হবে।

## Dot Notation

Property access করার সবচেয়ে সাধারণ উপায় হলো dot notation:

```js
console.log(user.name);
console.log(user.age);
```

Expected output:

```text
Tapas
40
```

`user.name`-এ:

- `user` হলো object
- `.` হলো property access operator
- `name` হলো property key

JavaScript `name` key-এর value খুঁজে `"Tapas"` return করে। একইভাবে `user.age` থেকে `40` পাওয়া যায়।

---

# 4. Existing Object-এ নতুন Property যোগ করা

Object তৈরি হয়ে যাওয়ার পরও নতুন property যোগ করা যায়।

```js
user.isSeniorCitizen = false;
```

এখন `user` object-এ তিনটি property থাকবে:

```js
console.log(user);
```

Expected structure:

```js
{
  name: "Tapas",
  age: 40,
  isSeniorCitizen: false
}
```

User-এর বয়স 40 হওয়ায় `isSeniorCitizen`-এর value `false` রাখা হয়েছে।

---

# 5. Special Character-যুক্ত Key

Object key লেখার সময় সাধারণত quotation mark প্রয়োজন হয় না:

```js
const user = {
  name: "Tapas",
  age: 40,
};
```

JavaScript internally এই key-গুলোকে string হিসেবে বিবেচনা করে।

কিন্তু key-এর মধ্যে special character—বিশেষ করে space—থাকলে quotation mark দিতে হবে।

```js
const user = {
  name: "Tapas",
  age: 40,
  "is admin": true,
};
```

এখানে `"is admin"` key-এর মধ্যে space আছে। তাই quotation mark বাধ্যতামূলক।

## Special Key-তে Dot Notation কাজ করে না

নিচের code invalid:

```js
user.is admin;
```

JavaScript `user.is` পর্যন্ত একটি expression হিসেবে বুঝতে চেষ্টা করবে এবং `admin`-কে unexpected identifier হিসেবে দেখবে। ফলে syntax error হবে।

এক্ষেত্রে bracket বা subscript notation ব্যবহার করতে হবে:

```js
console.log(user["is admin"]);
```

Expected output:

```text
true
```

### Rule

যখন object key-এর মধ্যে space বা অন্য special character থাকবে:

1. Object তৈরির সময় key quotation mark-এর মধ্যে লিখবে।
2. Value access করার সময় bracket notation ব্যবহার করবে।

## পরে Special Character-যুক্ত Property যোগ করা

```js
user["movie lover"] = true;
```

এখন object-এ `"movie lover"` নামে property যুক্ত হয়েছে।

```js
console.log(user["movie lover"]);
```

Expected output:

```text
true
```

---

# 6. Existing Property-এর Value পরিবর্তন

Object-এর existing property value update করা খুব সহজ।

```js
user.age = 34;
```

আগে `age` ছিল `40`; এখন তা `34`।

```js
console.log(user.age);
```

Expected output:

```text
34
```

Special character-যুক্ত key-এর value-ও bracket notation দিয়ে update করতে হবে:

```js
user["movie lover"] = false;
```

---

# 7. Object Property Delete করা

Property delete করতে JavaScript-এর `delete` keyword ব্যবহার করা হয়।

```js
delete user["movie lover"];
```

এখন `"movie lover"` property object থেকে সম্পূর্ণভাবে মুছে যাবে।

সাধারণ key হলে dot notation-ও ব্যবহার করা যায়:

```js
delete user.age;
```

এতে `age` property মুছে যাবে।

---

# 8. Dynamic Key দিয়ে Property Access

এখন পর্যন্ত আমরা property key hardcode করে ব্যবহার করেছি:

```js
user.name;
user.age;
```

কিন্তু real-world programming-এ key dynamically আসতে পারে। যেমন:

- User input থেকে
- API response থেকে
- Program-এর ভেতরে computed value হিসেবে

ধরা যাক:

```js
const someKey = "age";
```

এখানে `someKey` variable-এর value হলো `"age"`। এখন এই dynamic key ব্যবহার করে `user` object-এর `age` property access করতে চাই।

নিচের code সঠিক নয়:

```js
user.someKey;
```

কারণ JavaScript এখানে `someKey` variable-এর value খুঁজবে না। বরং object-এর মধ্যে সরাসরি `someKey` নামে property খুঁজবে।

সঠিক পদ্ধতি:

```js
console.log(user[someKey]);
```

Runtime-এ `someKey`-এর জায়গায় `"age"` বসবে। অর্থাৎ expression কার্যত হবে:

```js
user["age"];
```

যদি `user.age`-এর value `34` হয়, output হবে:

```text
34
```

### মনে রাখবে

Dynamic key access করার সময় dot notation নয়, bracket notation ব্যবহার করতে হবে।

---

# 9. Dynamic Key দিয়ে Object তৈরি

এবার উল্টো পরিস্থিতি দেখি। আগে dynamic key ব্যবহার করে object থেকে value পড়েছি। এবার object তৈরি করার সময় key dynamically নির্ধারণ করব।

ধরা যাক, user-এর favourite car prompt-এর মাধ্যমে নেওয়া হচ্ছে:

```js
const car = prompt("Which is your favorite car?");
```

এখন user যে value দেবে, সেটিকে property key হিসেবে ব্যবহার করতে চাই।

```js
const favoriteCars = {
  [car]: 5,
};
```

যদি user `BMW` লিখে, object হবে:

```js
{
  BMW: 5
}
```

যদি user `Audi` লিখে, object হবে:

```js
{
  Audi: 5
}
```

এখানে square bracket-এর ভেতরে variable লিখে **computed property name** তৈরি করা হয়েছে।

```js
console.log(favoriteCars);
```

এভাবে object key user input বা programmatically computed value থেকে তৈরি করা যায়।

---

# 10. Constructor Function দিয়ে Object তৈরি

Object literal সবচেয়ে common পদ্ধতি হলেও object তৈরির আরও কিছু pattern আছে। এগুলো পরবর্তীতে prototype এবং object-oriented programming বুঝতে গুরুত্বপূর্ণ হবে।

## Regular Function এবং Constructor Function

Regular function আমরা এভাবে লিখি:

```js
function car(name, model) {
  // function body
}
```

Constructor function-এর syntax প্রায় একই। তবে convention অনুযায়ী constructor function-এর নাম capital letter দিয়ে শুরু হয়:

```js
function Car(name, model) {
  this.name = name;
  this.model = model;
}
```

এখানে:

- `name` এবং `model` হলো parameter
- `this.name` এবং `this.model` হলো object-এর property
- বাইরে থেকে দেওয়া argument property value হিসেবে assign হবে

Parameter হলো function definition-এর placeholder। Argument হলো function call-এর সময় পাঠানো actual value।

## `new` Keyword ব্যবহার

Constructor function থেকে object তৈরি করতে `new` keyword ব্যবহার করতে হয়:

```js
const bmwCar = new Car("BMW", "X1");
```

এখন:

```js
console.log(bmwCar);
```

Expected output:

```js
Car {
  name: "BMW",
  model: "X1"
}
```

Object literal দিয়ে তৈরি object দেখে সবসময় বোঝা যায় না সেটি user, employee, profile নাকি অন্য কিছু। কিন্তু constructor function থেকে তৈরি object-এর custom type বোঝা যায়। এখানে objectটি `Car` type-এর।

একই blueprint থেকে একাধিক instance তৈরি করা যায়:

```js
const bmwCar = new Car("BMW", "X1");
const audiCar = new Car("Audi", "A8");
```

দুটি আলাদা object তৈরি হয়েছে, কিন্তু দুটিই `Car` constructor থেকে তৈরি।

## `instanceof` দিয়ে পরীক্ষা

```js
console.log(bmwCar instanceof Car);
```

Expected output:

```text
true
```

কারণ `bmwCar`, `Car` constructor function-এর একটি instance।

### গুরুত্বপূর্ণ পার্থক্য

Constructor function-এর ক্ষেত্রে:

- Function name সাধারণত capital letter দিয়ে শুরু হয়
- Property তৈরিতে `this` ব্যবহার করা হয়
- Object তৈরিতে `new` keyword ব্যবহার করা আবশ্যক

`this` keyword পরবর্তী lesson-এ বিস্তারিতভাবে শেখানো হবে। আপাতত syntax এবং ব্যবহারটি মনে রাখো।

---

# 11. Built-in `Object` Constructor ব্যবহার

JavaScript-এর built-in `Object` constructor দিয়েও object তৈরি করা যায়:

```js
const person = new Object();

person.name = "Alpha";
person.age = 76;

console.log(person);
```

Expected output:

```js
{
  name: "Alpha",
  age: 76
}
```

এটি object তৈরি করে, কিন্তু custom type দেয় না। অর্থাৎ `BMW` এবং `Audi`-কে `Car` type হিসেবে চিহ্নিত করার মতো এখানে কোনো user-defined type পাওয়া যায় না।

---

# 12. Factory Function দিয়ে Object তৈরি

Factory function হলো এমন function, যা call করলে নতুন object return করে।

```js
function createUser(name, age) {
  return {
    name: name,
    age: age,
  };
}
```

এখন function call করলে প্রতিবার নতুন object পাওয়া যাবে:

```js
const user1 = createUser("Tapas", 39);
const user2 = createUser("Bob", 32);
```

এখানে `new` keyword নেই। কারণ এটি constructor function নয়; এটি একটি সাধারণ function, যা object return করছে।

```js
console.log(user1);
console.log(user2);
```

Expected output:

```js
{ name: "Tapas", age: 39 }
{ name: "Bob", age: 32 }
```

### Constructor Function বনাম Factory Function

Constructor function:

```js
const car = new Car("BMW", "X1");
```

Factory function:

```js
const user = createUser("Tapas", 39);
```

Factory function call করার সময় `new` ব্যবহার করা হয় না।

---

# 13. Object Shorthand

Factory function-এর return object-এ key এবং parameter name একই হলে shorthand syntax ব্যবহার করা যায়।

পূর্ণ syntax:

```js
function createUser(name, age) {
  return {
    name: name,
    age: age,
  };
}
```

Shorthand syntax:

```js
function createUser(name, age) {
  return {
    name,
    age,
  };
}
```

দুটি code একই object তৈরি করে।

### Rule

শুধু তখন shorthand ব্যবহার করা যাবে, যখন property key এবং value হিসেবে ব্যবহৃত variable-এর নাম একই হবে।

```js
{
  name,
  age
}
```

JavaScript internally এটিকে এভাবে বুঝবে:

```js
{
  name: name,
  age: age
}
```

---

# 14. Object Method

এখন পর্যন্ত object property-এর value হিসেবে primitive data ব্যবহার করেছি। কিন্তু object property-এর value non-primitive-ও হতে পারে। JavaScript-এর non-primitive value-এর মধ্যে রয়েছে:

- Object
- Array
- Function

অর্থাৎ object-এর property value একটি function, array বা অন্য object হতে পারে।

## Function যখন Object-এর Property

```js
const user1 = {
  name: "Tapas",
  age: 39,
  greet: function () {
    console.log(this.name);
  },
};
```

Function call করতে:

```js
user1.greet();
```

Expected output:

```text
Tapas
```

Object-এর ভেতরে থাকা function-কে **method** বলা হয়।

## আরেকটি Example

```js
const profile = {
  name: "Tapas",
  company: "Creovate",
  message: function () {
    console.log(`${this.name} works at ${this.company}`);
  },
};
```

Property access:

```js
console.log(profile.name);
console.log(profile.company);
```

Method call:

```js
profile.message();
```

Expected output:

```text
Tapas
Creovate
Tapas works at Creovate
```

এখানে template literal ব্যবহার করা হয়েছে। Backtick-এর মধ্যে `${...}` syntax ব্যবহার করলে runtime-এ expression-এর value string-এর মধ্যে বসে যায়।

`this.name` object-এর `name` property এবং `this.company` object-এর `company` property নির্দেশ করছে। `this` keyword পরবর্তী session-এ আরও গভীরভাবে ব্যাখ্যা করা হবে।

---

# 15. Nested Object

একটি object-এর property value যদি আরেকটি object হয়, তাকে **nested object** বলা হয়।

`profile` object-এ `address` যোগ করি:

```js
const profile = {
  name: "Tapas",
  company: "Creovate",
  address: {
    city: "Bangalore",
    zip: 560032,
    state: "Karnataka",
    country: "India",
  },
};
```

এখানে `address` property-এর value আরেকটি object। এই inner object-এর মধ্যে `city`, `zip`, `state` এবং `country` property আছে।

## Nested Property Access

```js
console.log(profile.address.country);
```

Expected output:

```text
India
```

Access flow:

1. `profile` object
2. তার `address` property
3. `address` object-এর `country` property

Nested object-এর ভেতর method-ও থাকতে পারে:

```js
const profile = {
  name: "Tapas",
  address: {
    city: "Bangalore",
    country: "India",
    greeting: function () {
      console.log("Welcome to India");
    },
  },
};
```

Call:

```js
profile.address.greeting();
```

Expected output:

```text
Welcome to India
```

Object যত প্রয়োজন তত depth পর্যন্ত nested হতে পারে। এভাবেই complex data structure object-এর মধ্যে represent করা যায়।

---

# 16. Property আছে কি না: `in` Operator

কোনো object-এর মধ্যে নির্দিষ্ট property আছে কি না, programmatically পরীক্ষা করা প্রয়োজন হতে পারে।

ধরা যাক:

```js
const profile = {
  name: "Tapas",
};
```

একটি সাধারণ check হতে পারে:

```js
if (!profile.salary) {
  console.log("The salary property does not exist");
}
```

যদি `salary` না থাকে, `profile.salary` হবে `undefined`; `!undefined` হবে `true`; তাই message print হবে।

কিন্তু এই পদ্ধতিতে একটি flaw আছে।

```js
const profile = {
  name: "Tapas",
  salary: undefined,
};
```

এখানে `salary` property বাস্তবে আছে, কিন্তু তার value `undefined`। আগের check এখনও বলবে property নেই, যা ভুল।

## সঠিক পদ্ধতি: `in` Operator

```js
console.log("salary" in profile);
```

যদি property থাকে, output:

```text
true
```

যদি property মুছে দেওয়া হয়:

```js
delete profile.salary;
console.log("salary" in profile);
```

Output:

```text
false
```

### Rule

Property-এর value কী তা না দেখে property সত্যিই object-এর মধ্যে আছে কি না পরীক্ষা করতে `in` operator ব্যবহার করো।

---

# 17. `for...in` Loop দিয়ে Object Iterate করা

Object-এর সব property key এবং value loop-এর মাধ্যমে access করতে `for...in` ব্যবহার করা যায়।

```js
const profile = {
  name: "Tapas",
  company: "Creovate",
  message: function () {
    console.log("Hello");
  },
  address: {
    city: "Bangalore",
  },
};
```

Key iterate করা:

```js
for (let key in profile) {
  console.log(key);
}
```

Expected keys:

```text
name
company
message
address
```

Dynamic key দিয়ে value access করতে bracket notation ব্যবহার করব:

```js
for (let key in profile) {
  console.log(key, profile[key]);
}
```

এখানে:

- `key` প্রতিটি iteration-এ property name ধরে
- `profile[key]` সেই property-এর value return করে

Function value হলে function reference print হবে এবং nested object হলে object structure print হবে।

---

# 18. `Object.keys()` Method

কোনো object-এর সব key array আকারে পেতে `Object.keys()` ব্যবহার করা হয়।

```js
console.log(Object.keys(profile));
```

Expected output:

```js
["name", "company", "message", "address"]
```

এটি real-world project-এ খুব useful, কারণ object-এর key-গুলো array হিসেবে পেলে array operation বা iteration করা সহজ হয়।

---

# 19. Object Reference

Execution context lesson-এ আমরা শিখেছি, non-primitive value memory-তে reference আকারে handle করা হয়। Object একটি non-primitive data type। তাই object value দিয়ে নয়, reference দিয়ে compare করা হয়।

ধরা যাক:

```js
const fruit = {
  name: "Mango",
};

const anotherFruit = {
  name: "Mango",
};
```

দুটি object দেখতে একই। কিন্তু memory-তে এগুলো দুইটি আলাদা location-এ stored। তাই দুইটির reference আলাদা।

```js
console.log(fruit === anotherFruit);
console.log(fruit == anotherFruit);
```

Expected output:

```text
false
false
```

Strict equality এবং loose equality—দুটিতেই false হবে। কারণ comparison value-এর content দেখে নয়, reference দেখে হচ্ছে।

## একই Reference Assign করা

```js
let fruit = {
  name: "Mango",
};

let anotherFruit = {
  name: "Mango",
};

fruit = anotherFruit;
```

এখন `fruit` এবং `anotherFruit` একই object reference point করছে।

```js
console.log(fruit === anotherFruit);
```

Expected output:

```text
true
```

এখানে `fruit`-কে `const` দিয়ে declare করলে reassignment সম্ভব হতো না। তাই `let` ব্যবহার করা হয়েছে।

### মূল Rule

দুটি object compare করার সময় তাদের property value একই কি না, শুধু সেটি দেখে equality নির্ধারিত হয় না। দুটি variable একই object reference point করছে কি না, সেটিই গুরুত্বপূর্ণ।

---

# 20. বিরতি: B.R.E.A.K

এ পর্যন্ত পৌঁছে থাকলে দারুণ কাজ করেছ। Sessionটি আগেরগুলোর তুলনায় দীর্ঘ, কিন্তু object ভবিষ্যতের JavaScript programming-এ খুব গুরুত্বপূর্ণ। তাই session দীর্ঘ হওয়ায় demotivated হয়ো না। প্রয়োজন হলে break নাও, পরে ফিরে এসে বাকি অংশ শেষ করো।

পুরো session শেষ করো, task সম্পন্ন করো এবং submit করো। তাহলে শেখার জন্য যে সময় invest করছ, সেটি পূর্ণতা পাবে।

এখন দ্বিতীয় অংশে আমরা `Object`-এর গুরুত্বপূর্ণ static method এবং object destructuring শিখব। এগুলো real-world programming-এ বারবার ব্যবহৃত হবে।

---

# 21. `Object.assign()`

`Object.assign()` একটি static method। এটি source object-এর own property-গুলো target object-এ copy করে।

```js
const target = {
  p: 1,
  q: 2,
};

const source = {
  a: 3,
  b: 5,
};

const returnedObject = Object.assign(target, source);
```

```js
console.log(returnedObject);
```

Expected output:

```js
{
  p: 1,
  q: 2,
  a: 3,
  b: 5
}
```

Source-এর property target-এ copy হয়েছে।

## একই Key থাকলে Override

```js
const target = {
  p: 1,
  a: 2,
};

const source = {
  a: 3,
  b: 5,
};

const returnedObject = Object.assign(target, source);
```

Final output:

```js
{
  p: 1,
  a: 3,
  b: 5
}
```

Target এবং source-এ `a` key common। Source target-এ copy হওয়ায় target-এর `a: 2` source-এর `a: 3` দিয়ে override হয়েছে।

## Object Clone করা

```js
const obj = {
  name: "Tapascript",
};

const obj2 = Object.assign({}, obj);
```

এখানে empty object target এবং `obj` source।

```js
console.log(obj2);
```

Output:

```js
{ name: "Tapascript" }
```

তবে `obj` এবং `obj2` একই reference নয়:

```js
console.log(obj === obj2);
```

Expected output:

```text
false
```

কারণ clone দেখতে একই হলেও নতুন object reference তৈরি হয়েছে।

---

# 22. Shallow Copy বনাম Deep Copy

`Object.assign()` **shallow copy** করে। Nested object থাকলে nested object-এর নতুন copy তৈরি করে না; তার reference copy করে।

```js
const obj3 = {
  a: 1,
  b: {
    c: 2,
  },
};

const obj4 = Object.assign({}, obj3);
```

Top-level object আলাদা reference। কিন্তু `obj3.b` এবং `obj4.b` একই nested object reference point করছে।

```js
obj4.b.c = 3;
```

এখন:

```js
console.log(obj3.b.c);
console.log(obj4.b.c);
```

Expected output:

```text
3
3
```

প্রথমে মনে হতে পারে `obj3.b.c` তো `2` থাকার কথা, কারণ পরিবর্তন করা হয়েছে `obj4`-এ। কিন্তু `Object.assign()` nested object-এর reference copy করেছে। তাই এক জায়গায় পরিবর্তন করলে অন্য জায়গাতেও দেখা যাচ্ছে। এটি bug নয়; shallow copy-এর স্বাভাবিক আচরণ।

## Top-level Primitive Property আলাদা থাকে

```js
obj4.a = 100;

console.log(obj4.a);
console.log(obj3.a);
```

Expected output:

```text
100
1
```

কারণ `a` top-level primitive value। সেটি independentভাবে copy হয়েছে।

## Deep Clone: `structuredClone()`

Nested object-সহ সম্পূর্ণ independent copy চাইলে `structuredClone()` ব্যবহার করা যায়:

```js
const obj5 = structuredClone(obj3);

obj5.a = 300;
obj5.b.c = 30;
```

এখন:

```js
console.log(obj5.a);
console.log(obj3.a);
console.log(obj5.b.c);
console.log(obj3.b.c);
```

Expected output:

```text
300
1
30
3
```

যদি `obj3.b.c` পরিবর্তনের আগে `2` থাকে, deep clone-এর পরে source-এর value `2`-ই থাকবে। মূল কথা হলো—`structuredClone()` nested object-এর জন্যও আলাদা reference তৈরি করে।

### Warning

Nested data clone করার সময় `Object.assign()` ব্যবহার করলে shallow copy হবে। Deep clone প্রয়োজন হলে `structuredClone()` ব্যবহার করো।

---

# 23. Object থেকে Array: `Object.entries()`

`Object.entries()` object-কে key-value pair-এর array-তে convert করে।

```js
const obj = {
  a: "Tapas",
  b: 32,
};

const myArray = Object.entries(obj);
```

```js
console.log(myArray);
```

Expected output:

```js
[
  ["a", "Tapas"],
  ["b", 32]
]
```

প্রতিটি inner array-তে দুইটি element থাকে:

1. Property key
2. Property value

API response object আকারে এলে কিন্তু UI-তে array loop দরকার হলে `Object.entries()` খুব useful হতে পারে।

---

# 24. Array/Map-like Structure থেকে Object: `Object.fromEntries()`

`Object.entries()` object-কে array-তে convert করে। এর বিপরীত কাজ করে `Object.fromEntries()`।

```js
const entries = [
  ["foo", "bar"],
  ["baz", 42],
];

const objFromEntries = Object.fromEntries(entries);
```

```js
console.log(objFromEntries);
```

Expected output:

```js
{
  foo: "bar",
  baz: 42
}
```

Key-value pair-এর array থেকে object তৈরি হয়েছে।

---

# 25. Immutability: `Object.freeze()`

Immutable মানে এমন কিছু, যা পরিবর্তন করা যায় না। Mutable মানে পরিবর্তন করা যায়।

ধরা যাক, একটি employee object তৈরি করার পর তার salary পরিবর্তন করতে দিতে চাই না:

```js
const employee = {
  salary: 100,
};

Object.freeze(employee);
```

এখন salary পরিবর্তনের চেষ্টা করি:

```js
employee.salary = 200;
console.log(employee);
```

Expected output:

```js
{ salary: 100 }
```

Object freeze করা থাকায় value পরিবর্তন হয়নি।

## Frozen কি না পরীক্ষা

```js
console.log(Object.isFrozen(employee));
```

Expected output:

```text
true
```

## Freeze করলে কী কী বন্ধ হয়?

```js
employee.name = "Alex";
delete employee.salary;
employee.salary = 300;
```

Freeze করা object-এ:

- Existing property value পরিবর্তন করা যায় না
- নতুন property যোগ করা যায় না
- Existing property delete করা যায় না

Object সম্পূর্ণভাবে immutable হয়ে যায়।

---

# 26. Immutability: `Object.seal()`

`Object.seal()`-ও object-এর structure protect করে, কিন্তু `freeze()`-এর সঙ্গে একটি গুরুত্বপূর্ণ পার্থক্য আছে।

```js
const department = {
  name: "Finance",
};

Object.seal(department);
```

Sealed object-এ নতুন property যোগ করা যাবে না:

```js
department.address = "Bangalore";
```

Property delete করাও যাবে না:

```js
delete department.name;
```

কিন্তু existing property-এর value পরিবর্তন করা যাবে:

```js
department.name = "HR";
```

```js
console.log(department);
```

Expected output:

```js
{ name: "HR" }
```

## `freeze()` বনাম `seal()`

`Object.freeze()`:

- Add করা যায় না
- Delete করা যায় না
- Existing value modify করা যায় না

`Object.seal()`:

- Add করা যায় না
- Delete করা যায় না
- Existing value modify করা যায়

দুটিই object immutability-এর সঙ্গে সম্পর্কিত, তবে restriction-এর level আলাদা।

---

# 27. `Object.hasOwn()`

কোনো object-এর নিজের property আছে কি না পরীক্ষা করতে `Object.hasOwn()` ব্যবহার করা যায়।

```js
const department = {
  name: "Finance",
};

console.log(Object.hasOwn(department, "name"));
```

Expected output:

```text
true
```

যদি property না থাকে:

```js
console.log(Object.hasOwn(department, "address"));
```

Expected output:

```text
false
```

Prototype এবং object configuration-এর সঙ্গে সম্পর্কিত আরও static method পরে object-oriented programming এবং prototype lesson-এ শেখানো হবে। আপাতত এই method-গুলো practice করো। Task-এর মধ্যেও এগুলোর ব্যবহার পাওয়া যাবে।

---

# 28. Object Destructuring কী?

Destructure অর্থ কোনো structure ভেঙে তার অংশগুলো আলাদা করে নেওয়া। Object-এর ক্ষেত্রে object-এর property value আলাদা variable-এ বের করে নেওয়াকে object destructuring বলা হয়।

ধরা যাক, আমাদের একটি complex student object আছে:

```js
const student = {
  name: "John Williamson",
  age: 9,
  standard: 3,
  subjects: ["Math", "English", "Science"],
  parents: {
    father: "Mr. Williamson",
    mother: "Mrs. Williamson",
    email: "john.parents@abcd.com",
  },
  address: {
    street: "12 Main Street",
    city: "John City",
    country: "India",
    zip: 5791,
  },
};
```

এখানে primitive এবং non-primitive—দুই ধরনের value আছে:

- `name`, `age`, `standard` primitive
- `subjects` array
- `parents` এবং `address` nested object

## Traditional Property Access

```js
const name = student.name;
const city = student.address.city;
```

এটি ঠিকভাবে কাজ করে, কিন্তু property বেশি হলে code দীর্ঘ হয়।

## Basic Destructuring Syntax

```js
const { name } = student;
```

JavaScript:

1. `student` object থেকে `name` property খুঁজবে
2. `name` নামে variable তৈরি করবে
3. `student.name`-এর value variable-এ assign করবে

```js
console.log(name);
```

Expected output:

```text
John Williamson
```

একাধিক property একসঙ্গে নেওয়া যায়:

```js
const { name, age } = student;
```

এখন `name` এবং `age`—দুটি variable তৈরি হবে।

```js
console.log(name, age);
```

Expected output:

```text
John Williamson 9
```

Object destructuring কম code লিখে cleanভাবে property value extract করতে সাহায্য করে।

---

# 29. Destructuring Use Case 1: Default Value-সহ নতুন Variable

Object-এ property না থাকলেও destructuring-এর সময় default value দেওয়া যায়।

```js
const { name, age, meal = "Bread" } = student;
```

`student` object-এ `meal` property নেই। তাই `meal` variable default value `"Bread"` পাবে।

```js
console.log(name, age, meal);
```

Expected output:

```text
John Williamson 9 Bread
```

Destructuring ছাড়া একই কাজ করতে অনেক বেশি code লাগত:

```js
const meal = student.meal ? student.meal : "Bread";
```

Destructuring syntax একই কাজকে এক লাইনে সহজ করে দেয়।

---

# 30. Destructuring Use Case 2: Dynamic Default Value

Default value hardcoded হওয়া বাধ্যতামূলক নয়। অন্য destructured value থেকে dynamically compute করা যায়।

```js
const {
  subjects,
  numberOfSubjects = subjects.length,
} = student;
```

এখানে:

- `subjects` array destructure হয়েছে
- `subjects.length` থেকে `numberOfSubjects`-এর value এসেছে

```js
console.log(numberOfSubjects);
```

Expected output:

```text
3
```

Hardcoded value-এর পরিবর্তে destructured data থেকে computed default value তৈরি হয়েছে।

---

# 31. Destructuring Use Case 3: Alias

Destructuring-এর সময় variable-এর অন্য নাম দেওয়া যায়। এটিকে alias বলা হয়।

ধরা যাক, object-এ property-এর নাম `standard`, কিন্তু আমরা variable-এর নাম `gradeLevel` রাখতে চাই:

```js
const { standard: gradeLevel } = student;
```

এখন:

```js
console.log(gradeLevel);
```

Expected output:

```text
3
```

এখানে `standard` নামে variable তৈরি হয়নি। তৈরি হয়েছে `gradeLevel` নামে variable।

```js
console.log(standard);
```

এটি error দিতে পারে, যদি `standard` নামে অন্য কোনো variable আগে declare না থাকে।

## Alias কেন দরকার?

React, Angular, asynchronous API call বা multiple data source-এর ক্ষেত্রে একই property name বারবার আসতে পারে। যেমন বিভিন্ন source থেকে `loading` নামে property আসতে পারে। একই scope-এ একই variable name ব্যবহার করলে conflict হবে। তখন alias ব্যবহার করা যায়:

```js
const { loading: graphQLLoading } = graphQLResponse;
const { loading: restLoading } = restResponse;
const { loading: webhookLoading } = webhookResponse;
```

এভাবে variable name conflict এড়ানো যায়।

---

# 32. Destructuring Use Case 4: Nested Object Destructuring

Top-level property destructure করা সহজ:

```js
const { address } = student;
```

কিন্তু `address` object-এর ভেতর থেকে সরাসরি `zip` নিতে চাইলে nested destructuring ব্যবহার করা যায়।

```js
const {
  address: { zip },
} = student;
```

```js
console.log(zip);
```

Expected output:

```text
5791
```

এখানে access flow:

1. `student` থেকে `address`
2. `address` object থেকে `zip`
3. `zip` নামে variable তৈরি

একাধিক nested level থাকলে একই pattern ব্যবহার করে আরও গভীরে যাওয়া যায়:

```js
const {
  levelOne: {
    levelTwo: {
      value,
    },
  },
} = someObject;
```

তবে transcript-এর মূল উদাহরণে `address` থেকে `zip` নেওয়াই প্রধান use case।

---

# 33. Destructuring Use Case 5: Function Parameter-এ Destructuring

ধরা যাক, একটি function student-এর parent email-এ email পাঠানোর message print করবে।

Traditional approach:

```js
function sendEmail(student) {
  console.log(`Sent an email to ${student.parents.email}`);
}

sendEmail(student);
```

Expected output:

```text
Sent an email to john.parents@abcd.com
```

এখানে পুরো `student` object function-এ পাঠানো হয়েছে, যদিও function-এর প্রয়োজন শুধু `parents.email`।

Function parameter level-এই destructuring করা যায়:

```js
function sendEmail({ parents: { email } }) {
  console.log(`Sent an email to ${email}`);
}

sendEmail(student);
```

Expected output একই:

```text
Sent an email to john.parents@abcd.com
```

এখন function body-তে বারবার `student.parents.email` লিখতে হচ্ছে না। `email` variable সরাসরি ব্যবহার করা যাচ্ছে।

এটি বিশেষভাবে useful যখন একই nested property function-এর একাধিক জায়গায় ব্যবহার করতে হয়।

---

# 34. Destructuring Use Case 6: Function Return Value Destructure করা

Function object return করলে return value destructure করা যায়।

```js
const getStudent = () => student;
```

Traditional approach:

```js
const anotherStudent = getStudent();
const anotherName = anotherStudent.name;
const anotherSubjects = anotherStudent.subjects;
```

Destructuring approach:

```js
const {
  name: anotherName,
  subjects: anotherSubjects,
} = getStudent();
```

এখানে:

- `getStudent()` object return করেছে
- `name` property `anotherName` alias-এ গেছে
- `subjects` property `anotherSubjects` alias-এ গেছে

```js
console.log(anotherName);
console.log(anotherSubjects);
```

Expected output:

```text
John Williamson
["Math", "English", "Science"]
```

এভাবে intermediate object variable এবং একাধিক assignment line বাদ দেওয়া যায়।

---

# 35. Destructuring Use Case 7: Loop-এর মধ্যে Destructuring

এবার একটি students array ধরা যাক। Array-এর প্রতিটি element একটি object:

```js
const students = [
  { name: "William", grade: "A" },
  { name: "Tom", grade: "A+" },
  { name: "Bob", grade: "B" },
];
```

`for...of` loop-এর মধ্যে প্রতিটি object destructure করা যায়:

```js
for (let { name, grade } of students) {
  console.log(name, grade);
}
```

Expected output:

```text
William A
Tom A+
Bob B
```

প্রতিটি iteration-এ:

1. Array থেকে একটি student object আসে
2. Object-এর `name` এবং `grade` destructure হয়
3. দুইটি variable সরাসরি loop body-তে ব্যবহার করা যায়

Object-এর key-value loop-এর মধ্যে দরকার হলে এই pattern খুব useful।

---

# 36. Optional Chaining

Optional chaining nested object property safely access করতে সাহায্য করে। এটি ES2020-এ এসেছে।

Nested object-এর কোনো intermediate property `null` বা `undefined` হলে regular property access runtime error দিতে পারে। Optional chaining সেই error এড়িয়ে `undefined` return করতে পারে।

ধরা যাক:

```js
const employee = {
  salary: {
    amount: 100,
  },
};
```

Existing property access:

```js
console.log(employee.salary);
```

এটি salary object return করবে।

কিন্তু:

```js
console.log(employee.department);
```

Expected output:

```text
undefined
```

কারণ `department` property নেই।

এখন যদি লিখি:

```js
console.log(employee.department.name);
```

এটি runtime error দেবে:

```text
Cannot read properties of undefined (reading 'name')
```

কারণ `employee.department` ইতিমধ্যে `undefined`; `undefined`-এর উপর `.name` access করা যায় না।

## Optional Chaining Syntax

```js
const departmentName = employee.department?.name;
```

`?.` হলো optional chaining operator।

```js
console.log(departmentName);
```

Expected output:

```text
undefined
```

এখানে program crash করবে না। Intermediate value অনুপস্থিত হওয়ায় gracefully `undefined` পাওয়া যাবে।

## Optional Chaining ছাড়া সম্ভাব্য Check

```js
const departmentName = employee.department
  ? employee.department.name
  : undefined;
```

Optional chaining একই কাজ আরও সংক্ষিপ্তভাবে করে:

```js
const departmentName = employee.department?.name;
```

## কখন Optional Chaining ব্যবহার করবে?

API response থেকে কোনো nested property সবসময় আসবে কি না নিশ্চিত না হলে optional chaining useful।

তবে যদি কোনো value অবশ্যই আসার কথা এবং না এলে error report হওয়া দরকার, তাহলে optional chaining ব্যবহার না করাই ভালো হতে পারে। কারণ `?.` error-কে `undefined`-এ রূপান্তর করে দিতে পারে।

অর্থাৎ:

- Missing value gracefully handle করতে চাইলে `?.` ব্যবহার করো
- Missing value-কে programming error হিসেবে ধরতে চাইলে regular access ব্যবহার করো

Optional chaining `undefined` এবং `null`—দুই ক্ষেত্রেই সহায়ক।

---

# 37. Common Mistakes ও Tricky Cases

## Mistake 1: Dynamic Key-তে Dot Notation ব্যবহার

ভুল:

```js
const key = "age";
console.log(user.key);
```

এটি `age` property পড়বে না; `key` নামে property খুঁজবে।

সঠিক:

```js
console.log(user[key]);
```

## Mistake 2: Space-যুক্ত Key Dot Notation দিয়ে Access

ভুল:

```js
user.is admin;
```

সঠিক:

```js
user["is admin"];
```

## Mistake 3: Property Existence শুধু Value দেখে Check করা

Tricky case:

```js
const profile = {
  salary: undefined,
};

if (!profile.salary) {
  console.log("Salary does not exist");
}
```

এখানে property আছে, কিন্তু check ভুল result দিচ্ছে।

সঠিক:

```js
console.log("salary" in profile);
```

অথবা own property-এর ক্ষেত্রে:

```js
console.log(Object.hasOwn(profile, "salary"));
```

## Mistake 4: Object Value দেখে Equality ধরে নেওয়া

```js
{ name: "Mango" } === { name: "Mango" }
```

Result:

```text
false
```

কারণ reference আলাদা।

## Mistake 5: `Object.assign()`-কে Deep Clone মনে করা

Nested object-এর ক্ষেত্রে `Object.assign()` reference copy করে। ফলে clone-এর nested value পরিবর্তন করলে source-ও পরিবর্তিত হতে পারে। Deep clone-এর জন্য `structuredClone()` ব্যবহার করো।

## Mistake 6: Constructor Function-এ `new` বাদ দেওয়া

Constructor pattern:

```js
function Car(name, model) {
  this.name = name;
  this.model = model;
}
```

সঠিক call:

```js
const car = new Car("BMW", "X1");
```

Factory function-এর মতো সাধারণভাবে call করা উচিত নয়।

## Mistake 7: Destructuring Alias দেওয়ার পর Original Variable ব্যবহার

```js
const { standard: gradeLevel } = student;
```

এখানে variable হলো `gradeLevel`, `standard` নয়।

---

# 38. সম্ভাব্য Interview Questions

Transcript-এর আলোচনার ভিত্তিতে নিচের প্রশ্নগুলো interview বা practical discussion-এ গুরুত্বপূর্ণ হতে পারে।

## 1. Object literal কী?

Curly braces ব্যবহার করে সরাসরি object তৈরি করার syntax-কে object literal syntax বলা হয়।

```js
const user = {
  name: "Tapas",
  age: 40,
};
```

## 2. Dot notation এবং bracket notation-এর পার্থক্য কী?

Dot notation সাধারণ static key-এর জন্য ব্যবহার করা হয়। Bracket notation ব্যবহার করা হয়:

- Dynamic key-এর ক্ষেত্রে
- Space বা special character-যুক্ত key-এর ক্ষেত্রে

## 3. Constructor function এবং factory function-এর পার্থক্য কী?

Constructor function:

- সাধারণত capital letter দিয়ে শুরু হয়
- `this` ব্যবহার করে property তৈরি করে
- `new` keyword দিয়ে call করতে হয়

Factory function:

- সাধারণ function
- Object return করে
- `new` প্রয়োজন হয় না

## 4. Object equality কেন property value দিয়ে নির্ধারিত হয় না?

Object reference type। Equality operator পরীক্ষা করে দুইটি variable একই memory reference point করছে কি না।

## 5. `Object.assign()` shallow copy কেন?

Top-level property copy করলেও nested object-এর নতুন copy তৈরি করে না; nested reference copy করে।

## 6. `Object.freeze()` এবং `Object.seal()`-এর পার্থক্য কী?

Freeze existing value পরিবর্তনসহ add/delete সব বন্ধ করে। Seal add/delete বন্ধ করে, কিন্তু existing property value পরিবর্তন করতে দেয়।

## 7. Object destructuring-এর সুবিধা কী?

কম code-এ property extract, default value, alias, nested value access, function parameter handling, return value handling এবং loop iteration সহজ হয়।

## 8. Optional chaining কখন ব্যবহার করা হয়?

Nested property `null` বা `undefined` হতে পারে এবং runtime error এড়িয়ে graceful `undefined` return দরকার হলে optional chaining ব্যবহার করা হয়।

---

# 39. Lecture Recap

আজ আমরা object এবং object manipulation-এর বিস্তৃত ভিত্তি তৈরি করেছি। প্রথমে বুঝেছি, primitive variable complex data handle করার জন্য যথেষ্ট নয়। Related data structuredভাবে রাখতে object ব্যবহৃত হয়। Object key-value pair-এর keyed collection।

আমরা object literal syntax দিয়ে object তৈরি করেছি এবং dot notation ও bracket notation দিয়ে property access করেছি। নতুন property যোগ করা, value modify করা, property delete করা, special character-যুক্ত key handle করা এবং dynamic key দিয়ে value access ও object তৈরি করা শিখেছি।

এরপর constructor function, built-in `Object` constructor এবং factory function দিয়ে object তৈরির pattern দেখেছি। Constructor function-এর ক্ষেত্রে capitalized name, `this` এবং `new` keyword-এর ভূমিকা বুঝেছি। Factory function-এর ক্ষেত্রে object return এবং shorthand property syntax শিখেছি।

Object-এর property value function হলে তাকে method বলা হয়। Object-এর property value আরেকটি object হলে nested object তৈরি হয়। `in` operator এবং `Object.hasOwn()` দিয়ে property existence check করেছি। `for...in` এবং `Object.keys()` দিয়ে object-এর key ও value নিয়ে কাজ করেছি।

Object reference বুঝেছি: একই property value থাকলেও আলাদা object literal আলাদা reference, তাই equality false হয়। একই reference assign করলে equality true হয়।

Static method-এর মধ্যে `Object.assign()`, `Object.entries()`, `Object.fromEntries()`, `Object.freeze()`, `Object.isFrozen()`, `Object.seal()` এবং `Object.hasOwn()` আলোচনা করেছি। বিশেষভাবে shallow copy এবং deep copy-এর পার্থক্য দেখেছি। Nested object safely clone করার জন্য `structuredClone()` ব্যবহার করেছি।

Object destructuring-এর ক্ষেত্রে basic extraction, default value, dynamic default, alias, nested destructuring, function parameter destructuring, function return destructuring এবং loop-এর মধ্যে destructuring—সবগুলো practical use case দেখেছি।

শেষে optional chaining শিখেছি, যা missing nested property-এর কারণে runtime error এড়িয়ে `undefined` return করতে সাহায্য করে।

---

# 40. Assignment / Task

Instructor-এর নির্দেশনা অনুযায়ী Day 12-এর task আলাদা `task.md` file-এ দেওয়া আছে। GitHub repository থেকে file খুলে task সম্পন্ন করতে হবে।

Task করার সময় বিশেষভাবে practice করো:

- Object literal তৈরি
- Property add, update এবং delete
- Dynamic key access
- Constructor function এবং factory function
- Object method এবং nested object
- `in`, `for...in`, `Object.keys()`
- Object reference comparison
- `Object.assign()` এবং `structuredClone()`
- `Object.entries()` এবং `Object.fromEntries()`
- `Object.freeze()` এবং `Object.seal()`
- Object destructuring-এর সব use case
- Optional chaining

Task complete করে submit করো। Repository helpful মনে হলে star দিতে পারো এবং community discussion-এর জন্য Tapascript Discord-এ যোগ দিতে পারো। সেখানে task নিয়ে আলোচনা করা যাবে এবং community থেকে সহায়তা পাওয়া যাবে।

---

# 41. পরবর্তী Lesson

পরবর্তী ভিডিও Day 13-এ `this` keyword আলোচনা করা হবে। আজ object, method, constructor এবং nested structure সম্পর্কে যে groundwork তৈরি হয়েছে, তা `this` বুঝতে সরাসরি কাজে লাগবে।

এখন object সম্পর্কে প্রয়োজনীয় ভিত্তি তৈরি হয়েছে। তাই Day 13-এ `this` keyword আরও পরিষ্কারভাবে বোঝা সম্ভব হবে। ততক্ষণ পর্যন্ত নিজের যত্ন নাও, task শেষ করো এবং practice চালিয়ে যাও।

---

# Final Recap

- Object হলো key-value pair-এর keyed collection।
- Object literal, constructor function, built-in `Object` constructor এবং factory function দিয়ে object তৈরি করা যায়।
- Static key dot notation দিয়ে, dynamic বা special character-যুক্ত key bracket notation দিয়ে access করা হয়।
- Object method হলো object-এর property হিসেবে থাকা function।
- Nested object complex data represent করতে ব্যবহৃত হয়।
- Object reference দিয়ে compare হয়, property content দিয়ে নয়।
- `Object.assign()` shallow copy করে; deep clone-এর জন্য `structuredClone()` ব্যবহার করা যায়।
- `Object.freeze()` object সম্পূর্ণভাবে lock করে; `Object.seal()` add/delete বন্ধ করলেও existing value modify করতে দেয়।
- Object destructuring কম code-এ property extract, alias, default value, nested access এবং function/loop handling সহজ করে।
- Optional chaining missing nested value safely handle করে এবং runtime error এড়িয়ে `undefined` return করতে পারে।
