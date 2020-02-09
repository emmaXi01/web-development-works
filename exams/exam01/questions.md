# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?

A: static assets won't change from request to request, like CSS, images, and HTML files. However, dynamic assets are the content that change based on requests from users. For example, a chat webpage will not look the same for everybody, and it can change based on devices, time of visit and logged in users. Besides, dynamic assets are loaded into the server's RAM. if we make changes to dynamic assets, dynamic assets on disk is updated, but the old version remains in RAM, so we need to restart the server to pick up the changes. However, static assets are not loaded in the server's RAM, so any changes to the static assets don't require the server to restart.

## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?

A: A relative path is based on navigation from the path of the currently loaded page, while an absolute path is taken from the root directory of the server. Webserver root/document root is the directory that is accessed when you navigate to the website's domain, it is the location from which the web server loads files for document requests. for example localhost:3000 is a document root. Document root is the root directory of absolute paths. For example, if we were on the http://example.com/foo/, for absolute path `<img src="/images/cat.png"/>`, its path is http://example.com/images/cat.png, for relative path `<img src="images/cat.png"/>`, its path is http://example.com/foo/images/cat.png.

## Q: What is the difference between server-side and client-side JS?

A: The server-side JS involves server for its processing, it works in the back end which could not be visible at the client end. With the Node.js, JavaScript code can executes over a server local resources, outside of a browser. On the other hand, client-side JS requires browsers to run it on the client machine but does not interact with the server while processing the client-side scripts which are visible among the users.

## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?

A: differences between `var`, `const`, and `let`:
(1) `var` declarations are globally scoped or function scoped, while `let` and `const` are block scoped.  
(2) `var` variables can be updated and re-declared within its scope; `let` variables can be updated but not re-declared; `const` variables cannot be updated and re-declared.
(3) `var` variables are hoisted to the top of its scope and initialized with a value of undefined. However, when accessing a `let` or `const` variable before declaration, we'll get a Reference Error. 

`var` should not be used unless targeting older JS engines. 80 - 90% variables we used should be `const`. when we need to reassign the value, we can use `let`.

## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)

A: First, use constructor function to create inheritance. we can use `new` keyword on a function call, the prototype property will be assigned as the prototype of new object.

Second, use Object.create() function to create a new object, with the new object's prototype set to passed object(default is Object).

Third, with the `class` keyword in ES6. Define a parent class, and define a child class inherited from parent class.

Forth, set the prototype directly use `	Object.setPrototypeOf(child, parent)`, set parent as child.prototype.


## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".

A: Using constructor function to create inheritance:
```javascript
const Cat = function(name) {
	this.name = name;
};
Cat.prototype.purr = function() {
	console.log(`${this.name} says 'Hello'`);
};

const leo = new Cat('Leo');
console.log(leo.purr());//inherited 
```

## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".

A: Using Object.create() function to create inheritance
```javascript
const cat = {
	hiss: function() {
		console.log("Hi");
	}
};

const leo = Object.create(cat);
console.log(leo.hiss());//inherited 
```

## Q: Explain what a callback is, and give an example.

A:  A callback is a function passed to another function as a parameter, so that the receiving function can call the callback(the function that is passed as a parameter).

```javascript
const numbers = [10, 10];
const calculate = function( numbers, callback ) {
	return callback(numbers);
};

const addition = function(numbers) {
	let sum = 0;
	for( let number of numbers ) {
		sum += number;
	}
	return sum;
};

const multiplication = function(numbers) {
	let product = 1;
	for( let number of numbers ) {
		product *= number;
	}
	return product;
};

calculate( numbers, addition);//output: 20
calculate (numbers, multiplication); //output: 100
```

## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is `_used as a callback_`, then `this` will not have the expected implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.

A: It means that classes should be named for what they identify and what they mean or represent, not for the intended effect or what they look like. The name should be  "Semantic" 

Bad name: `bold, list, red`
Good name: `username, menu, messages`
