# Answer of the following questions-

**1. What is the difference between var, let, and const?**

Answer:

- `var` : One can reassign & redeclare his/her variable in var .

- `let` : One can reassign but cannot redeclare his/her variable in let .

- `Const` :

cannot be reassigned

cannot be redeclared

**2. What is the difference between map(), forEach(), and filter()?**

Answer:

- ` map()`: it creates a new array in loop and returns it .

- `forEach()` : it creates a new array in loop but don't returns it .

- `filter()` : it worked in conditions and returns what condition says .

**3. What are arrow functions in ES6?**

Answer: it makes functions short & readable

**4. How does destructuring assignment work in ES6?**

Answer:

- destructuring assignment is a way to take values from arrays & object and put them into a variable .

ex: ```const [a,b,c]=[10,20,30]
here --> a = 10 , b = 20 , c = 30

const {name , age} = {name:"Abul" , age:21 }
here --> name = "Abul" & age: 21

**5. Explain template literals in ES6. How are they different from string concatenation?**

Answer :

- template literals are new thing to work with strings in ES6.They use backticks(``) instead of single strings ('')/double strings(" "). it allows multi-line-strings. it helps you to crete dynamically put variables by ${} . it is much easier than repeatedly using + in strings.

ex: const name = "Fahim"
const age = 21

console.log(`${name} is ${age} years old)

output: Fahim is 21 years old

in strings :

console.log("name + is + age + years old )

you use + operator repeatedly & harder to read .
