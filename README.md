
## 7) Answers to the following questions are given below: -

## 1) What is the difference between var, let, and const?
### Ans: The main differences between var, let, and const in JavaScript are their scope, whether they can be reassigned or re-declared, and their hoisting behavior. var is function-scoped, can be re-declared and reassigned, and is initialized with undefined at the top of its scope. let is block-scoped, can be reassigned but not re-declared, and is not initialized until its declaration. const is also block-scoped, cannot be reassigned or re-declared, and must be initialized when declared.  

## 2) What is the difference between map(), forEach(), and filter()? 
### Ans: forEach() will not return anything. forEach() returns undefined. filter() method will return an array of matching elements else will return an empty array if no matching happens. If you have a requirement to modify the current array and are expecting a modified one, then you should go with map() 

## 3) What are arrow functions in ES6?
### Ans: Arrow functions, introduced in ECMAScript 2015 (ES6), provide a concise syntax for writing function expressions in JavaScript. They offer a shorter and more elegant way to define functions compared to traditional function expressions.

## 4) How does destructuring assignment work in ES6?
### Ans: Destructuring assignment in ES6 (ECMAScript 2015) provides a concise and convenient way to extract values from arrays or properties from objects and assign them to distinct variables. It simplifies code by reducing the need for repetitive access to array elements or object properties. 

## 5) Explain template literals in ES6. How are they different from string concatenation?
### Ans: Template literals in ES6 are a modern way of writing strings in JavaScript. They use backticks instead of single or double quotes. The biggest advantage is that you can directly insert variables and expressions inside the string using ${ }.

### They are also useful for writing multi-line strings without needing special characters like \n. This makes the code more readable and easier to maintain.

### String concatenation (the old way) joins strings and variables together using the + operator. It works, but becomes messy and hard to read when you have long strings, many variables, or multiple lines.
