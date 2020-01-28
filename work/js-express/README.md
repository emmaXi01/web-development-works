# JS Express

* start from the up-to-date master branch (`git checkout master; git pull origin master`)
* Create a feature branch named 'js-express' (`git checkout -b js-express`)
* modify the files in this directory to have the require features
* add, commit, and push the branch to github
* Create a PR to merge to master
* Be sure to include the TA(s) and I as reviewers.  
* Due by 11:59pm (PT) Sun Feb 2

## Goal and Requirements

You will need to:
* Create the package.json and add express as a dependency (see class notes)
* Fill in the contents of chat.js and chat-web.js

The Chat application will:

* Allow a user to see the list of messages and users
* Will have an input field for the username to post as
* Will have an input field for the new message text
* Will allow users to post new message using the listed username
  * Does not need to "remember" the username in the form, user will have to type it again
* Will NOT add messages that have no message text or no username
  * They will simply see the same list of messages/users without a change
* Will NOT have any default messages/users
* Will NOT repost messages if the page is reloaded after sending a message
* Will add the username to the list of users if the user isn't already there
* Will NOT show duplicate usernames
* It should be reasonably attractive
  * A basic `chat.css` is included, feel free to modify it/replace it
* The visuals should make it easy to use
* It should maintain/extend the separation of concerns used in the existing files
* It should follow the best practices outlined in class
* I should be able to run your code with `npm install` and then `node server.js`

## Allowances
* You may modify the HTML as you see fit
    * But it must be fundamentally semantically valid and other best practices from class
* You may modify the CSS as you see fit
    * But you must follow the best practices given in class
* You must use the correct HTTP methods (GET for loading pages, POST for adding content) as listed
* You may add additional JS files (server-side ONLY) that you write
    * But they must maintain/extend the existing separation of concerns

## Restrictions
* DO NOT HAVE ANY "PASSWORD" or "LOGIN"  behavior
    * Just use the username from the form each time a new message is sent.  User is completely able to change it.
    * Poor security is bad security - we aren't even pretending to have security yet
* Do not include any files in `node_modules` in your PR - add to `.gitignore` as needed
* Do not include files from outside this assignment in your PR (such as files from other assignments)
* Do not add extra routes
* Do not change how the routes get/pass data except as described here
* Do not use external JS other than express itself
* Do not use external CSS libraries
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* You may NOT use client-side/browser-side Javascript
* You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  * I and the TA(s) must be able to read it easily

