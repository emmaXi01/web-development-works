const gameWeb = {
    gamePage: function({ game, words, userId, isCompleted }) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Word Guessing Game</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <header class="page-header">
                <img id="logo" src="images/logo.png" alt="game logo">
            </header>
            ${gameWeb.getInstructions()} 
            <div class="display-panel">
                <img id="wordguess-picture" src="images/guessword.png">
                <div class="words-info">
                    <h3>Please guess the word from the following word list:</h3>
                    <p class="valid-words">${words.join(",   ")}</p>
                </div> 
            </div> 
            <div class="guess-panel">
                ${gameWeb.getOutGoing({ userId, isCompleted })}  
            </div>
            <div class="result-panel">
                ${gameWeb.getGuessedWordList(game, userId)}
                ${gameWeb.getGuessResultList(game, userId)}   
            </div>    
                 
        </body>
        </html>`
    },

    getInstructions: function() {
        return `
            <div class="instruction-panel">
                <h3>instructions:</h3>
                <ul >
                    <li>The game do not care about case-sensitivity!</li>  
                    <li>You can get a response about the number of "matching" letters, regardless of position!</li> 
                    <li>"Invalid Word!" warning means it is not one of the permitted words. You can continue to guess!</li>
                </ul>
            </div>
    `;
    },

    getOutGoing: function({ userId, isCompleted }) {
        if(!isCompleted) {
            return gameWeb.allowGuess(userId);
        } else {
            return gameWeb.getPlayAgain(userId);
        }  
    },

    allowGuess: function(userId) {
        return ` 
            <div class="outgoing">
                <form action="/guessWord" method="POST">
                    <input class="to-guess" type="text" name="guess" placeholder="Enter a guess word"/>
                    <button class="submit-button" type="submit">submit</button>
                    <input class="user-id" name="userId" value=${userId} type="hidden"/>
                </form>
            <div>
        `;
    },

    getPlayAgain: function(userId){
        return ` 
            <div class="outgoing">
                <form action='/restart' method='POST'>
                    <input class="user-id" name="userId" value=${userId} type="hidden"/>
                    <button class="play-again-button" type = "submit" name="restart"> Play Again </button>
                </form>
            </div>  
        `;
    },

    getGuessedWordList: function(game, userId) {
        return `<ul>` + 
            game.users[userId].guessedWords.map(guess => {
                return `
                <div class="guess-info">
                    <span class="guess-word">${guess}</span>
                </div>`;
            }).join('\n') +
            `</ul>`;
    },

    getGuessResultList: function(game, userId) {
        return `<ul>` + 
            game.users[userId].guessResults.map(result => {
                return `
                <div class="result-info">
                    <span class="result">${result}</span>
                </div>`;
            }).join('\n')+
            `</ul>`;
    },
}

module.exports = gameWeb;