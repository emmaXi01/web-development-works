"use strict";
import { 
    fetchRecipes,
    fetchRecipeDetails,
    fetchLogin,
    fetchLoginStatus,
    fetchNewRecipeForm,
    createNewRecipe,
    logout } from './services';

const header = document.querySelector('.header-info');
const login = document.querySelector('.login-panel');
const status = document.querySelector('.status');
const recipeList = document.querySelector('.recipe-list-panel');
const newRecipeForm = document.querySelector('.new-recipe-panel');
const recipeInfo = document.querySelector('.recipe-details-panel');
const outgoing = document.querySelector('.outgoing');

//error messages
const errMessages = {
    'invalid-user': "User not found, please login!",
    'invalid-username': "Bad login, Please enter a valid user name without containing whitespace and 'dog'!",
    'network-error': "There is a problem connecting to the network, try again!",
    'missing-content': "The title, ingredients and instructions cannot be empty",
    'no-recipe' : "The recipe doesn't exist",
}

const appState = {
    isInHomePage: false,
    isLoggedIn: false,
    toLogin: false,
    isAddRecipe: false,
    recipes:[],
    recipeDetails:{},
    error:'',
}

function renderHomePage() {
    if(appState.toLogin) {
        header.innerHTML = ``;
        recipeList.innerHTML = ``;
        outgoing.innerHTML = ``;
        renderErrors(appState.error);
        return;
    }

    if(appState.isLoggedIn) {
        header.innerHTML = `<button class="logout-button">Sign out</button>`;
    } else {
        header.innerHTML = `<button class="login-button">Sign in</button>`;
    }

    if(appState.isInHomePage) {
        recipeList.innerHTML = `
            <h1 class="title">Recipes</h1>
            <div class="recipes-display">
                <ul class="recipes"></ul> 
            </div>
        `;

        renderRecipes(appState.recipes);
        outgoing.innerHTML = `<button class="new-recipe-button">New Recipe</button>`;
    } else {
        recipeList.innerHTML = ``;
        outgoing.innerHTML = `<button class="back-home-button">Back to Home</button>`
    }  
    
    renderErrors(appState.error);
}

function renderRecipes(recipes) {
    const recipesInfo = recipeList.querySelector('.recipes');
    recipesInfo.innerHTML = recipes.map(recipe => { 
        return `
            <li class="recipe-info">
                <span 
                    data-recipe-id="${recipe.recipeId}"
                    class="recipe-title">${recipe.title}</span>
                <span
                    data-recipe-id="${recipe.recipeId}"
                    class="recipe-author">${recipe.author}</span>
            </li>
        `;
    }).join(' ');
}

function renderErrors(error) {
    status.innerText = errMessages[error] || error;
}

//go to login screen
header.addEventListener('click', (event) => {
    if(!event.target.classList.contains('login-button')) {
        return;
    }
    event.preventDefault();

    fetchLoginStatus()
    .then( () => {
        appState.toLogin = false;
        renderHomePage(appState.toLogin);
    })
    .catch( (err) => {
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
    if(show) {
        login.innerHTML = `
            <input class="username" type="text" placeholder="Enter a user name" />
            <button class="to-login" type="button">Sign in</button>
        `;
        login.querySelector('.to-login').disabled = true;
    } else {
        login.innerHTML = ``;
    }   
}

login.addEventListener('click', (event) => {
    if(!event.target.classList.contains('to-login')) {
        return;
    }
    event.preventDefault();

    const addUser = login.querySelector('.username');
    const username = addUser.value;
    addUser.value = '';

    fetchLogin(username)
    .then( (data) => {
        appState.isInHomePage = true;
        appState.isLoggedIn = true;
        appState.toLogin = false;
        appState.recipes = data;
        appState.error = ''
        renderHomePage();
        renderLogin(appState.toLogin);
    })
    .catch( (err) => {
        appState.error = err.errorCode;  
        renderHomePage(); 
        renderLogin(appState.toLogin);
        renderErrors(appState.error);
    });
});

//get username
login.addEventListener('keyup', (event) => {
    if(!event.target.classList.contains('username')) {
        return;
    }
    
    const text = event.target.value;
    login.querySelector('.to-login').disabled = !text;
});


//see recipe details
recipeList.addEventListener('click', (event) => {
    if(!event.target.classList.contains('recipe-title')) {
        return;
    }
    event.preventDefault();

    const recipeId = event.target.dataset.recipeId;
    event.preventDefault();
    fetchRecipeDetails(recipeId)
    .then((recipeDetails) => {
        appState.isInHomePage = false;
        appState.recipeDetails = recipeDetails; 
        appState.error = '';
        renderHomePage();
        renderRecipeDetail(appState.recipeDetails);
    })
    .catch( (err) => {
        appState.error = err.errorCode;   
        renderHomePage(appState.isInHomePage);
    });
});

function renderRecipeDetail(recipeDetails) {
    if(Object.keys(recipeDetails).length === 0) {
        recipeInfo.innerHTML = ``;   
    } else {
        recipeInfo.innerHTML = `
            <h2 class="title"> Recipt Details </h2>
            <div class="recipe-title">
                <label>Title:</label>
                <span>${recipeDetails.title}</span>
            </div>
            <div class="recipe-author">
                <label>Author:</label>
                <span>${recipeDetails.author}</span>
            </div>
            <div class="recipe-ingredients">
                <label>Ingredients:</label><br/>
                <span>${recipeDetails.ingredients}</span>
            </div>
            <div class="recipe-instrcutions">
                <label>Instructions:</label><br/>
                <span>${recipeDetails.instructions}</span>
            </div>
        `;
    }    
}


//back to home screen
outgoing.addEventListener('click', (event) => {
    if(!event.target.classList.contains('back-home-button')) {
        return;
    }
    event.preventDefault();

    fetchRecipes()
    .then((data) => {
        appState.isInHomePage = true;
        appState.recipes = data;
        appState.recipeDetails = {};
        appState.isAddRecipe = false;
        appState.error = '';
        renderHomePage();
        renderRecipeDetail(appState.recipeDetails);
        renderNewRecipeForm(appState.isAddRecipe);
    });  
});


//go to new recipe screen
outgoing.addEventListener('click', (event) => {
    if(!event.target.classList.contains('new-recipe-button')) {
        return;
    }
    event.preventDefault();

    fetchNewRecipeForm()
    .then( () => {
        appState.isInHomePage = false;
        appState.isLoggedIn = true;
        appState.isAddRecipe = true;
        renderHomePage();
        appState.error = '';
        renderNewRecipeForm(appState.isAddRecipe);
    })
    .catch( (err) => {
        appState.isInHomePage = true;
        appState.isLoggedIn = false;
        appState.error = err.errorCode;   
        renderHomePage();
    });
});

function renderNewRecipeForm(show) {
    if(show) {
        newRecipeForm.innerHTML = `
            <h2 class="title"> New Recipt </h2>
            <div>
                <label>Title: </label><br/>
                <textarea class="new-recipe-title" rows="2" cols="100"></textarea>
            </div>
            <div>
                <label>Ingredients: </label><br/>
                <textarea class="new-recipe-ingredients" rows="4" cols="100"></textarea>
            </div>
            <div>
                <label>Instructions: </label><br/>
                <textarea class="new-recipe-instructions" rows="6" cols="100"></textarea>
            </div>
            <div>
                <button class="to-add-recipe">Add</button>
            </div>
        `; 
    } else {
        newRecipeForm.innerHTML = ``;
    }   
}

//add new recipe
newRecipeForm.addEventListener('click', (event) => {
    if(!event.target.classList.contains('to-add-recipe')) {
        return;
    }
    event.preventDefault();

    const addTitle = newRecipeForm.querySelector('.new-recipe-title');
    const title = addTitle.value;

    const addIngredients = newRecipeForm.querySelector('.new-recipe-ingredients');
    const ingredients = addIngredients.value;

    const addInstructions = newRecipeForm.querySelector('.new-recipe-instructions');
    const instructions = addInstructions.value;

    //reset to empty
    addTitle.value = '';
    addIngredients.value = '';
    addInstructions.value = '';

    createNewRecipe({ title, ingredients, instructions })
    .then( (newRecipe) => {
        appState.isInHomePage = false;
        appState.isLoggedIn = true;
        appState.recipeDetails = newRecipe;
        appState.isAddRecipe = false;
        appState.error = '';
        renderHomePage();
        renderNewRecipeForm(appState.isAddRecipe);
        renderRecipeDetail(appState.recipeDetails);
    })
    .catch( (err) => {
        appState.isInHomePage = false;
        appState.isLoggedIn = true;
        appState.error = err.errorCode;   
        renderHomePage();
        renderNewRecipeForm(appState.isAddRecipe);
    });    
});


//logout
header.addEventListener('click', (event) => {
    if(!event.target.classList.contains('logout-button')) {
        return;
    }
    event.preventDefault();

    logout()
    .then( () => {
        appState.isInHomePage = true;
        appState.isLoggedIn = false;
        appState.recipeDetails = {};
        appState.isAddRecipe = false;
        appState.error = '';
        renderHomePage();
        renderRecipeDetail(appState.recipeDetails);
        renderNewRecipeForm(appState.isAddRecipe);
    })
    .catch( (err) => {
        appState.error = err.errorCode;   
        renderErrors();
    });
});


//Initial load
fetchLoginStatus()
.then( () => {
    appState.isLoggedIn = true;
    renderHomePage();
})
.catch( () => {
    appState.isLoggedIn = false;
    renderHomePage();
});

fetchRecipes()
.then( (data) => {
    appState.isInHomePage = true;
    appState.recipes = data;
    renderHomePage();
});
