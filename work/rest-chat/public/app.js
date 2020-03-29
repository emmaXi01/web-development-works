/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");



var login = document.querySelector('.login-panel');
var status = document.querySelector('.status');
var chatRoom = document.querySelector('.chat-panel'); //error messages

var errMessages = {
  'invalid-user': "User not found, please login!",
  'invalid-username': "Bad login, Please enter a valid user name without containing whitespace and 'dog'!",
  'network-error': "There is a problem connecting to the network, try again!",
  'missing-text': "The message content cannot be empty"
};
var appState = {
  pollId: null,
  isLoggedIn: false,
  users: [],
  messages: [],
  error: ''
};

function renderPage() {
  if (appState.isLoggedIn) {
    renderLogin(false);
    renderChatRoom(true);
  } else {
    renderLogin(true);
    renderChatRoom(false);
  }

  renderErrors(appState.error);
}

function renderLogin(show) {
  if (show) {
    login.innerHTML = "\n            <input class=\"user-name\" type=\"text\" placeholder=\"Enter a user name\" />\n            <button class=\"login-button\" type=\"button\">Sign in</button>\n        ";
    login.querySelector('.login-button').disabled = true;
  } else {
    login.innerHTML = "";
  }
}

function renderErrors(error) {
  status.innerText = errMessages[error] || error;
}

function renderChatRoom(show) {
  if (show) {
    chatRoom.innerHTML = "\n            <h1 class=\"title\">Chat Room</h1>\n            <div class=\"logout\">\n                <button class=\"logout-button\" type=\"button\">Sign out</button>\n            </div>\n            <div class=\"display-panel\">\n                <div class=\"users-panel\">\n                    <h3 class=\"title\">Users</h3>\n                    <ul class=\"users\"></ul> \n                </div>\n                <div class=\"messages-panel\"> \n                    <h3 class=\"title\">Chat Messages</h3>  \n                    <ul class=\"messages\"></ul> \n                </div>   \n            </div>\n            <div class=\"outgoing\">\n                <div>\n                    <label>Message: </label>\n                    <input class=\"to-add-message\" type=\"text\" placeholder=\"Enter a message\" />\n                    <button class=\"send-button\" type=\"button\">Send</button>\n                </div>\n            </div> \n        ";
    chatRoom.querySelector('.send-button').disabled = true;
    renderUsers(appState.users);
    renderMessages(appState.messages);
  } else {
    chatRoom.innerHTML = "";
  }
}

function renderUsers(users) {
  var usersList = chatRoom.querySelector('.users');
  usersList.innerHTML = users.map(function (user) {
    return "<li class=\"user\"> ".concat(user.username, "</li>");
  }).join('');
}

function renderMessages(messages) {
  var messageList = chatRoom.querySelector('.messages');
  messageList.innerHTML = messages.map(function (message) {
    return "\n            <li class=\"message-info\">\n                <div class=\"meta-info\">\n                    <span class=\"sender\">".concat(message.sender, "</span>\n                    <span class=\"timestamp\">").concat(message.timeStamp, "</span>\n                </div>\n                <div class=\"text-info\">\n                    <span class=\"message-text\">").concat(message.text, "</span>\n                </div>\n            </li>\n            ");
  }).join(' ');
} //login


login.addEventListener('click', function (event) {
  if (!event.target.classList.contains('login-button')) {
    return;
  }

  var addUser = login.querySelector('.user-name');
  var username = addUser.value;
  addUser.value = '';
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogin"])(username).then(function (chat) {
    appState.isLoggedIn = true;
    appState.users = Object.values(chat.users);
    appState.messages = chat.messages;
    appState.error = '';
    renderPage();
    poll(true);
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderPage();
  });
}); //get username

login.addEventListener('keyup', function (event) {
  if (!event.target.classList.contains('user-name')) {
    return;
  }

  var text = event.target.value;
  login.querySelector('.login-button').disabled = !text;
}); //polling

function poll(shouldPoll) {
  if (shouldPoll && !appState.pollId) {
    appState.pollId = setInterval(function () {
      Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchMessage"])().then(function (chat) {
        appState.users = Object.values(chat.users);
        appState.messages = chat.messages;
        appState.error = '';
        renderUsers(appState.users);
        renderMessages(appState.messages);
      })["catch"](function (err) {
        if (err.errorCode === 'invalid-user') {
          appState.isLoggedIn = false;
          appState.error = '';
          renderPage();
          poll(false);
          return;
        }

        appState.error = err.errorCode;
        renderErrors(appState.error);
      });
    }, 3000);
  } //when a user lohout


  if (!shouldPoll && appState.pollId) {
    clearTimeout(appState.pollId);
    appState.pollId = null;
  }
} //send message


chatRoom.addEventListener('click', function (event) {
  if (!event.target.classList.contains('send-button')) {
    return;
  }

  var addMessage = chatRoom.querySelector('.to-add-message');
  var text = addMessage.value;
  addMessage.value = '';
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchSendMessage"])(text).then(function (messages) {
    appState.messages = messages;
    renderPage();
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderPage();
  });
}); //get message

chatRoom.addEventListener('keyup', function (event) {
  if (!event.target.classList.contains('to-add-message')) {
    return;
  }

  var text = event.target.value;
  chatRoom.querySelector('.send-button').disabled = !text;
}); //logout

chatRoom.addEventListener('click', function (event) {
  if (!event.target.classList.contains('logout-button')) {
    return;
  }

  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogout"])().then(function () {
    appState.isLoggedIn = false;
    appState.users = [];
    appState.message = [];
    appState.error = '';
    poll(false);
    renderPage();
  })["catch"](function (err) {
    appState.error = err.errorCode;
    poll(false);
    renderPage();
  });
}); //initial load

Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchMessage"])().then(function (chat) {
  appState.users = Object.values(chat.users);
  appState.messages = chat.messages;
  appState.error = '';
  appState.isLoggedIn = true;
  renderPage();
  poll(true);
})["catch"](function (err) {
  appState.isLoggedIn = false;
  poll(false);
  renderPage();
});

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: fetchLogin, fetchMessage, fetchSendMessage, fetchLogout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogin", function() { return fetchLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchMessage", function() { return fetchMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSendMessage", function() { return fetchSendMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogout", function() { return fetchLogout; });


var fetchLogin = function fetchLogin(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      errorCode: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return response.json();
  });
};
var fetchMessage = function fetchMessage() {
  return fetch('/chat', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      errorCode: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return response.json();
  });
};
var fetchSendMessage = function fetchSendMessage(text) {
  return fetch('/chat', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      text: text
    }),
    credentials: 'include'
  })["catch"](function () {
    return Promise.reject({
      errorCode: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return response.json();
  });
};
var fetchLogout = function fetchLogout() {
  return fetch('/session', {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json'
    })
  })["catch"](function () {
    return Promise.reject({
      errorCode: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return;
  });
};

/***/ })

/******/ });
//# sourceMappingURL=app.js.map