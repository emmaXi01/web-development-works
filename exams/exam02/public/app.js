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



var header = document.querySelector('.header-info');
var login = document.querySelector('.login-panel');
var status = document.querySelector('.status');
var recipeList = document.querySelector('.recipe-list-panel');
var newRecipeForm = document.querySelector('.new-recipe-panel');
var recipeInfo = document.querySelector('.recipe-details-panel');
var outgoing = document.querySelector('.outgoing'); //error messages

var errMessages = {
  'invalid-user': "User not found, please login!",
  'invalid-username': "Bad login, Please enter a valid user name without containing whitespace and 'dog'!",
  'network-error': "There is a problem connecting to the network, try again!",
  'missing-content': "The title, ingredients and instructions cannot be empty",
  'no-recipe': "The recipe doesn't exist"
};
var appState = {
  isInHomePage: false,
  isLoggedIn: false,
  toLogin: false,
  isAddRecipe: false,
  recipes: [],
  recipeDetails: {},
  error: ''
};

function renderHomePage() {
  if (appState.toLogin) {
    header.innerHTML = "";
    recipeList.innerHTML = "";
    outgoing.innerHTML = "";
    renderErrors(appState.error);
    return;
  }

  if (appState.isLoggedIn) {
    header.innerHTML = "<button class=\"logout-button\">Sign out</button>";
  } else {
    header.innerHTML = "<button class=\"login-button\">Sign in</button>";
  }

  if (appState.isInHomePage) {
    recipeList.innerHTML = "\n            <h1 class=\"title\">Recipes</h1>\n            <div class=\"recipes-display\">\n                <ul class=\"recipes\"></ul> \n            </div>\n        ";
    renderRecipes(appState.recipes);
    outgoing.innerHTML = "<button class=\"new-recipe-button\">New Recipe</button>";
  } else {
    recipeList.innerHTML = "";
    outgoing.innerHTML = "<button class=\"back-home-button\">Back to Home</button>";
  }

  renderErrors(appState.error);
}

function renderRecipes(recipes) {
  var recipesInfo = recipeList.querySelector('.recipes');
  recipesInfo.innerHTML = recipes.map(function (recipe) {
    return "\n            <li class=\"recipe-info\">\n                <span \n                    data-recipe-id=\"".concat(recipe.recipeId, "\"\n                    class=\"recipe-title\">").concat(recipe.title, "</span>\n                <span\n                    data-recipe-id=\"").concat(recipe.recipeId, "\"\n                    class=\"recipe-author\">").concat(recipe.author, "</span>\n            </li>\n        ");
  }).join(' ');
}

function renderErrors(error) {
  status.innerText = errMessages[error] || error;
} //go to login screen


header.addEventListener('click', function (event) {
  if (!event.target.classList.contains('login-button')) {
    return;
  }

  event.preventDefault();
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLoginStatus"])().then(function () {
    appState.toLogin = false;
    renderHomePage(appState.toLogin);
  })["catch"](function (err) {
    appState.toLogin = true;
    appState.recipeDetails = {};
    appState.isAddRecipe = false;
    appState.error = '';
    renderHomePage();
    renderLogin(appState.toLogin);
    renderRecipeDetail(appState.recipeDetails);
    renderNewRecipeForm(appState.isAddRecipe);
  });
});

function renderLogin(show) {
  if (show) {
    login.innerHTML = "\n            <input class=\"username\" type=\"text\" placeholder=\"Enter a user name\" />\n            <button class=\"to-login\" type=\"button\">Sign in</button>\n        ";
    login.querySelector('.to-login').disabled = true;
  } else {
    login.innerHTML = "";
  }
}

login.addEventListener('click', function (event) {
  if (!event.target.classList.contains('to-login')) {
    return;
  }

  event.preventDefault();
  var addUser = login.querySelector('.username');
  var username = addUser.value;
  addUser.value = '';
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogin"])(username).then(function (data) {
    appState.isInHomePage = true;
    appState.isLoggedIn = true;
    appState.toLogin = false;
    appState.recipes = data;
    appState.error = '';
    renderHomePage();
    renderLogin(appState.toLogin);
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderHomePage();
    renderLogin(appState.toLogin);
    renderErrors(appState.error);
  });
}); //get username

login.addEventListener('keyup', function (event) {
  if (!event.target.classList.contains('username')) {
    return;
  }

  var text = event.target.value;
  login.querySelector('.to-login').disabled = !text;
}); //see recipe details

recipeList.addEventListener('click', function (event) {
  if (!event.target.classList.contains('recipe-title')) {
    return;
  }

  event.preventDefault();
  var recipeId = event.target.dataset.recipeId;
  event.preventDefault();
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipeDetails"])(recipeId).then(function (recipeDetails) {
    appState.isInHomePage = false;
    appState.recipeDetails = recipeDetails;
    appState.error = '';
    renderHomePage();
    renderRecipeDetail(appState.recipeDetails);
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderHomePage(appState.isInHomePage);
  });
});

function renderRecipeDetail(recipeDetails) {
  if (Object.keys(recipeDetails).length === 0) {
    recipeInfo.innerHTML = "";
  } else {
    recipeInfo.innerHTML = "\n            <h2 class=\"title\"> Recipt Details </h2>\n            <div class=\"recipe-title\">\n                <label>Title:</label>\n                <span>".concat(recipeDetails.title, "</span>\n            </div>\n            <div class=\"recipe-author\">\n                <label>Author:</label>\n                <span>").concat(recipeDetails.author, "</span>\n            </div>\n            <div class=\"recipe-ingredients\">\n                <label>Ingredients:</label><br/>\n                <span>").concat(recipeDetails.ingredients, "</span>\n            </div>\n            <div class=\"recipe-instrcutions\">\n                <label>Instructions:</label><br/>\n                <span>").concat(recipeDetails.instructions, "</span>\n            </div>\n        ");
  }
} //back to home screen


outgoing.addEventListener('click', function (event) {
  if (!event.target.classList.contains('back-home-button')) {
    return;
  }

  event.preventDefault();
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipes"])().then(function (data) {
    appState.isInHomePage = true;
    appState.recipes = data;
    appState.recipeDetails = {};
    appState.isAddRecipe = false;
    appState.error = '';
    renderHomePage();
    renderRecipeDetail(appState.recipeDetails);
    renderNewRecipeForm(appState.isAddRecipe);
  });
}); //go to new recipe screen

outgoing.addEventListener('click', function (event) {
  if (!event.target.classList.contains('new-recipe-button')) {
    return;
  }

  event.preventDefault();
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchNewRecipeForm"])().then(function () {
    appState.isInHomePage = false;
    appState.isLoggedIn = true;
    appState.isAddRecipe = true;
    renderHomePage();
    appState.error = '';
    renderNewRecipeForm(appState.isAddRecipe);
  })["catch"](function (err) {
    appState.isInHomePage = true;
    appState.isLoggedIn = false;
    appState.error = err.errorCode;
    renderHomePage();
  });
});

function renderNewRecipeForm(show) {
  if (show) {
    newRecipeForm.innerHTML = "\n            <h2 class=\"title\"> New Recipt </h2>\n            <div>\n                <label>Title: </label><br/>\n                <textarea class=\"new-recipe-title\" rows=\"2\" cols=\"100\"></textarea>\n            </div>\n            <div>\n                <label>Ingredients: </label><br/>\n                <textarea class=\"new-recipe-ingredients\" rows=\"4\" cols=\"100\"></textarea>\n            </div>\n            <div>\n                <label>Instructions: </label><br/>\n                <textarea class=\"new-recipe-instructions\" rows=\"6\" cols=\"100\"></textarea>\n            </div>\n            <div>\n                <button class=\"to-add-recipe\">Add</button>\n            </div>\n        ";
  } else {
    newRecipeForm.innerHTML = "";
  }
} //add new recipe


newRecipeForm.addEventListener('click', function (event) {
  if (!event.target.classList.contains('to-add-recipe')) {
    return;
  }

  event.preventDefault();
  var addTitle = newRecipeForm.querySelector('.new-recipe-title');
  var title = addTitle.value;
  var addIngredients = newRecipeForm.querySelector('.new-recipe-ingredients');
  var ingredients = addIngredients.value;
  var addInstructions = newRecipeForm.querySelector('.new-recipe-instructions');
  var instructions = addInstructions.value; //reset to empty

  addTitle.value = '';
  addIngredients.value = '';
  addInstructions.value = '';
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["createNewRecipe"])({
    title: title,
    ingredients: ingredients,
    instructions: instructions
  }).then(function (newRecipe) {
    appState.isInHomePage = false;
    appState.isLoggedIn = true;
    appState.recipeDetails = newRecipe;
    appState.isAddRecipe = false;
    appState.error = '';
    renderHomePage();
    renderNewRecipeForm(appState.isAddRecipe);
    renderRecipeDetail(appState.recipeDetails);
  })["catch"](function (err) {
    appState.isInHomePage = false;
    appState.isLoggedIn = true;
    appState.error = err.errorCode;
    renderHomePage();
    renderNewRecipeForm(appState.isAddRecipe);
  });
}); //logout

header.addEventListener('click', function (event) {
  if (!event.target.classList.contains('logout-button')) {
    return;
  }

  event.preventDefault();
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["logout"])().then(function () {
    appState.isInHomePage = true;
    appState.isLoggedIn = false;
    appState.recipeDetails = {};
    appState.isAddRecipe = false;
    appState.error = '';
    renderHomePage();
    renderRecipeDetail(appState.recipeDetails);
    renderNewRecipeForm(appState.isAddRecipe);
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderErrors();
  });
}); //Initial load

Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLoginStatus"])().then(function () {
  appState.isLoggedIn = true;
  renderHomePage();
})["catch"](function () {
  appState.isLoggedIn = false;
  renderHomePage();
});
Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipes"])().then(function (data) {
  appState.isInHomePage = true;
  appState.recipes = data;
  renderHomePage();
});

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: fetchRecipes, fetchRecipeDetails, fetchLogin, fetchLoginStatus, fetchNewRecipeForm, createNewRecipe, logout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecipes", function() { return fetchRecipes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecipeDetails", function() { return fetchRecipeDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogin", function() { return fetchLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLoginStatus", function() { return fetchLoginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNewRecipeForm", function() { return fetchNewRecipeForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNewRecipe", function() { return createNewRecipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
var fetchRecipes = function fetchRecipes() {
  return fetch('/recipes', {
    method: "GET"
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
var fetchRecipeDetails = function fetchRecipeDetails(recipeId) {
  return fetch("/recipes/".concat(recipeId), {
    method: 'GET',
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
var fetchLogin = function fetchLogin(username) {
  return fetch('/session', {
    method: "POST",
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
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
var fetchLoginStatus = function fetchLoginStatus() {
  return fetch('/session', {
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

    return;
  });
};
var fetchNewRecipeForm = function fetchNewRecipeForm() {
  return fetch('/newRecipe', {
    method: 'GET',
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

    return;
  });
};
var createNewRecipe = function createNewRecipe(_ref) {
  var title = _ref.title,
      ingredients = _ref.ingredients,
      instructions = _ref.instructions;
  return fetch('/newRecipe', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      title: title,
      ingredients: ingredients,
      instructions: instructions
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
var logout = function logout() {
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