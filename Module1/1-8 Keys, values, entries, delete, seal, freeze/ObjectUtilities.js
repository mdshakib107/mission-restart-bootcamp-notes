// 1-8 Keys, values, entries, delete, seal, freeze
const employee = {
    name: 'Raja Rani',
    designation: 'QA',
    salary: '20000',
    experience: 1
}

const keys = Object.keys(employee)
const values = Object.values(employee)
const entries = Object.entries(employee)
console.log(keys)
console.log(values)
console.log(entries)
const employee = {
    name: 'Raja Rani',
    designation: 'QA',
    salary: 20000,
    experience: 1,
    age: 22
}

Object.freeze(employee)
// delete employee.salary
delete employee.experience

employee.salary = employee.salary + 5000;
employee.location = 'Dhaka'
console.log(employee)
const employee = {
    name: 'Raja Rani',
    designation: 'QA',
    salary: 20000,
    experience: 1,
    age: 22
}

Object.seal(employee)
// delete employee.salary
delete employee.experience

employee.salary = employee.salary + 5000;
employee.location = 'Dhaka'
console.log(employee)