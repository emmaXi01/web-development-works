# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.
A： "URL represents a resource" means that URL is something that the client interacts with. It is the target of action, and we can get, create or delete operations on this resource. It is often a noun. 

For example, The URL does not represent a resource
```
HTTP METHOD /addStudent
```
It represents an 'add' action instead of a target of action to interact with. So it should be 
```
HTTP METHOD /students
```

## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  
A: `fetch('/username')` returns is a promise, so username is a promise not a plain text string. The promise resolves with a response object. We can call method .text() or .json() to parse the response to get the data. So we can fix it as below
```javascript
fetch('/username')
	.then( response => {
		if(!response.ok) {
			return response.json().then( err => Promise.reject(err) );
		}

		return response.json();
	}
	.then( username => console.log(`user is named ${username}`) );
````

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
A: The `state` in web application is the summary of current values for all things that can change, for example, in chat application, messages(list of message) is a state, it can be changed beased on users' actions. "Store state in the DOM" means we need to read the DOM to get these values(states).

We should not store our state in the DOM, because firstly, The DOM represents the rendered page, it is just the visual output; secondly, if we alter the display, we will change how to get the states that way; finally, as our display gets more complicated, all our state interaction will become more complicated. We can store our state in variables or an object, and use them to update the screen as needed.

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
A: Single-page-web-application(SPA) is an application that does not require page reloading during use. So we don't need to wait for page loading. It is faster. Each new page's content generated through manipulating the DOM elements on the existing page by client-side JavaScript. So, We send a request to the server to get data and based on the data to render the screen by manipulating the DOM，instead of loading a new HTML page.

While multiple-page-web-application(MPA) is an application that renders a new HTML from the server with a form or a link submission in the browser. In the MPA, we send a request to the server，the server will return us a new HTML based on our request. So Each time MPA will redirect to a new url and reload a new page and downloads all resources again.

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?
A: Progressive Enhancement is a strategy of web design that emphasizes the page content first. So every user can access the basic content and functionality of a web page using any browser or internet connection, while also providing an enhanced version of the page to those with more advanced browser software or greater bandwidth. To be specific, we take a non-client-side JS web application and augment it with JS. 

With using Progressive Enhancement, SPA remains working when users turn off client-side JS. It is great for search engines and great for accessibility and various devices. Also it is great for ensuring backend security.

Without using Progressive Enhancement, on the other hand, SPA must work relying on client-side JS to render the page content or screen based on users' actions. That means it cannot work without client-side JS. And for some older browsers or devices with low performance, it cannot be accessed. 

## Q6: Explain how a REST service is or is not similar to a dynamic asset.
A: The difference between rest services and dynamic assets is in how they are used. When calling the rest services, it will return structured data such as JSON, XML, etc for programmatic use. It is a way to use web requests to get data. On the other hand, dynamic assets are content like HTML intended for the browser which is returned by pages and other CSS, JS or images with HTML loading returned by other endpoints. 

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
A: An example of a piece of information we should not store in a cookie is personal data, such as our phone number or our SSN number.

It is because Cookies are just an HTTP header. Everyone can access and see this information in the browser, so it has limited security.

## Q8: Explain why it is useful to separate a function that fetches data from the what you do with that data
A: This is because when separating a function that fetched data from what we do with that data, it makes our codes more readable and we know what the function does without looking at the code. Besides, the function is decoupled with any HTML, we just pass data to the function, then it returns data or errors as data, the caller can decide how to react to this data. And the function does not change if the HTML changes. Also, we can reuse the function for different purposes and debug easily.

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
A: Because try/catch is synchronous. JS engine will begin with try/block, when it meets a callback function, the callback will be put into the Event Queue. It isn't executed, so it doesn't give us an error. Thus, `catch` doesn't happen. After running other codes, JS engine will go to the Event Queue to check if any code has been triggered to run. If so, it will run the code. Then it throws an error, but it won't be catched, because it’s not in the try/catch any more. Try/catch is synchronous and already over. Thus, try/catch is useless when dealing with asynchronous errors.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
A: Separation of concerns is a both front-end and server-side issue. 

For example, in our chat project, in the front-end, when we do send message operation, we should separate all tasks instead of putting all things together, such as button disable, read data from input fields, send a call to a service, read results to update the list of task or handle errors and so on. One function should only have one job. Code looks like:

```javascript
const sendButton = document.querySelector('.send-message');
const addMessage = document.querySelector('.to-add-message');

sendButton.addEventListener('click', (event) => {
 	const text = addMessage.value;
    	addMessage.value = '';

    fetchSendMessage(text)
        .then( (messages) => {
            appState.messages = messages;
            renderPage();
        })
        .catch( (err) => {
            appState.error = err.errorCode;
            renderPage();
        });
    });

//change button disabled attribute
addMessage.addEventListener('keyup', (event) => {
	const text = event.target.value;
	sendButton.disabled = !text;
});

// call service 
const fetchSendMessage = (text) => {
    return fetch('/chat', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ text }),
        credentials: 'include',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) )
        }
        return response.json();
    });
};

//in the renderPage() function we also have renderMessage() and renderErrors() function

//in the renderMessages() function, based on fetch() result we just update the list of message in the page

//in the renderErrors() function, based on error message，we just show the error message in the page.
````

On the server-side, we should also separate tasks into small pieces. For example, we can store messages data and users data in different files, and import it to our server.js. We can also separate add messages operation as a function. Code looks like:

```javascript
const messages = require('./messages.js');
const users = require('./users.js');
app.post('/messages', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    if(!uid || !users[uid] ) {
        res.clearCookie('uid');
        res.status(401).json({ errorCode: 'invalid-user'});
        return;
    }

    const sender = users[uid].username;
    messages.addMessage({ sender, text });
    res.json(chat.messages);

});

//in messages.js, it has a function called addMessage()
function addMessage({ sender, text, timeStamp = new Date().toLocaleTimeString() }) {
    messages.push( { sender, text, timeStamp });
}
````

