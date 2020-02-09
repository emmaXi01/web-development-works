const gameWeb = {
    gamePage: function({ game, words, uid, isCompleted }) {
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
            <div class="instruction-panel">
                <h3>instructions:</h3>
                <ul >
                    <li>The game do not care about case-sensitivity!</li>  
                    <li>You can get a response about the number of "matching" letters, regardless of position!</li> 
                    <li>"Invalid Word!" warning means it is not one of the permitted words. You can continue to guess!</li>
                </ul>
            </div>
            <div class="display-panel">
                <img id="wordguess-picture" src="images/guessword.png">
                <div class="words-info">
                    <h3>Please guess the word from the following word list:</h3>
                    <p class="valid-words">${words.join(",   ")}</p>
                </div>     
            </div>
            <div class="guess-panel">
                ${gameWeb.getOutGoing({ uid, isCompleted })}  
            </div>
            <div class="result-panel">
                ${gameWeb.getGuessedWordList(game, uid)}
                ${gameWeb.getGuessResultList(game, uid)}   
            </div>    
        </body>
        </html>`
    },

    getOutGoing: function({ uid, isCompleted }) {
        if(!isCompleted) {
            return gameWeb.allowGuess(uid);
        } else {
            return gameWeb.getPlayAgain(uid);
        }  
    },

    allowGuess: function(uid) {
        return ` 
            <div class="outgoing">
                <form action="/guessWord" method="POST">
                    <input class="to-guess" type="text" name="guess" placeholder="Enter a guess word"/>
                    <button class="submit-button" type="submit">submit</button>
                    <input class="userId" name="uid" value=${uid} type="hidden"/>
                </form>
            <div>
        `;
    },

    getPlayAgain: function(uid){
        return ` 
            <div class="outgoing">
                <form action='/restart' method='POST'>
                    <input class="userId" name="uid" value=${uid} type="hidden"/>
                    <button class="play-again-button" type = "submit" name="restar"> Play Again </button>
                </form>
            </div>  
        `;
    },

    getGuessedWordList: function(game, uid) {
        return `<ul>` + 
            game.users[uid].guessedWords.map(guess => {
                return `
                <div class="guess-info">
                    <span class="guess-word">${guess}</span>
                </div>`;
            }).join('\n') +
            `</ul>`;
    },

    getGuessResultList: function(game, uid) {
        return `<ul>` + 
            game.users[uid].guessResults.map(result => {
                return `
                <div class="result-info">
                    <span class="result">${result}</span>
                </div>`;
            }).join('\n')+
            `</ul>`;
    },
}

module.exports = gameWeb;