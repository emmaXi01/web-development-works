"use strict";
const recipeList = {
    "16": {
        recipeId: "16",
        title: "Strawberry Cupcake",
        author: "Amit",
        ingredients: "all-purpose flour, Strawberry, baking powder, egg, sugar, butter",
        instructions: `Step1: Preheat oven to 350 degrees F. 
                       Step2: Beat eggs, one at a time, into sugar mixture until well mixed. 
                       Step3: Beat eggs, one at a time, into sugar mixture until well mixed. 
                       Step4: Whisk flour, baking power, and butter together in a separate bowl.
                       Step5: Add eggs, mix togehter.
                       Step6: Bake in the preheated oven, 25 to 30 minutes`
    },  
    "22": {
        recipeId: "22",
        title: "Scrambled Eggs",
        author: "Bao",
        ingredients: "milk, eggs, salt, black pepper, butter, onion",
        instructions: `Step1: Whisk together the eggs, milk, onions, salt, 
                             and pepper in a large bowl until it looks slightly fluffy.
                      Step2: Melt the butter in a large pan over medium to high heat; 
                             coat the pan evenly with the butter. Stir in eggs and continue stirring until 
                             they have just cooked. Serve immediately.`
    }
};

function addRecipe({ recipeId, title, author, ingredients, instructions }) {
    recipeList[recipeId] = { recipeId, title, author, ingredients, instructions };
}

function getTitlesAndAuthors() {
    const titlesAndAuthors = [];
    for( const id in recipeList ) {
        const recipeId = recipeList[id].recipeId;
        const title = recipeList[id].title;
        const author = recipeList[id].author;
        titlesAndAuthors.push({ "recipeId": `${recipeId}`, "title": `${title}`, "author": `${author}` });
    }

    return titlesAndAuthors;
} 

const recipes = {
    recipeList,
    addRecipe,
    getTitlesAndAuthors,
}

module.exports = recipes;