"use strict";
const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const PORT = 3000;

const app = express();

const users = require('./users');
const recipes = require('./recipes');

app.use(express.static('./public'));
app.use(cookieParser());

//get recipes
app.get('/recipes', (req, res) => {
    const titlesAndAuthors = recipes.getTitlesAndAuthors();
    res.json(titlesAndAuthors);
});

//get recipe details
app.get('/recipes/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId;
    if(!recipes.recipeList[recipeId]) {
        res.status(404).json({ errorCode: 'no-recipe' });
        return;
    }

    const recipeDetails = recipes.recipeList[recipeId];
    res.json(recipeDetails);
});


app.get('/session', (req, res) => {
    const uid = req.cookies.uid;
    if(!uid || !users[uid]) {
        res.status(401).json({ errorCode: 'invalid-user'});
        return;
    }

    res.sendStatus(200);
});

//login
app.post('/session', express.json(), (req, res) => {
    const username = req.body.username;
    if(!username || username.includes('dog') || username.includes(' ')) {
        res.status(400).json({ errorCode: 'invalid-username' });
        return;
    }

    const uid = uuidv4();
    res.cookie('uid', uid);
    users[uid] = { username };
    const titlesAndAuthors = recipes.getTitlesAndAuthors();
    res.json(titlesAndAuthors);
});

//get new recipe form
app.get('/newRecipe', (req, res) => {
    const uid = req.cookies.uid;
    if(!uid || !users[uid]) {
        res.status(401).json({ errorCode: 'invalid-user'});
        return;
    }

    res.sendStatus(200);
})

// post a new recipe
app.post('/newRecipe', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    if(!uid || !users[uid]) {
        res.status(401).json({ errorCode: 'invalid-user'});
        return;
    }

    const { title, ingredients, instructions } = req.body;
    if(!title || !ingredients || !instructions) {
        res.status(400).json({ errorCode: 'missing-content'});
        return;   
    }
    
    let recipeId = 0;
    do {
        recipeId = Math.floor(Math.random() * 1000);
    } while (recipes.recipeList[recipeId]);

    const author = users[uid].username;
    recipes.addRecipe({ recipeId, title, author, ingredients, instructions });

    const newRecipe = recipes.recipeList[recipeId];
    res.json(newRecipe);
});

//logout
app.delete('/session', (req, res) => {
    const uid = req.cookies.uid;
    delete users[uid];
    res.clearCookie('uid');
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});