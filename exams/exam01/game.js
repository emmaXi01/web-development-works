const users = {};

function addUser(userId, words) {
    const secretWord = pickSecretWord(words);
    users[userId] = { "secretWord": secretWord, "turns": 0, "guessedWords": [], "guessResults": [], isCompleted: false};
    console.log(secretWord);
}

function removeUser(userId) { 
    delete users[userId];     
}

//randomly generate a secret word at the start of the game
function pickSecretWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function addGuessResult({ userId, guess, words }) {
    guess = guess.toUpperCase();
    const secretWord = users[userId].secretWord;

     //if guess is not on the valid word list
    if(words.indexOf(guess) === -1) {
        users[userId].guessResults.push('Invalid Word! You can continue game!');
        users[userId].guessedWords.push(guess);
        return;
    }

    users[userId].turns += 1;
    if(exactMatch(guess, secretWord)) {
        users[userId].isCompleted = true; 
        users[userId].guessResults.push(`Correct! You won the game in ${users[userId].turns} turns! You can Play Again!`);
        users[userId].guessedWords.push(guess);  
        return;
    }

    const match = compare(guess, secretWord);
    users[userId].guessResults.push(`You matched ${match} letters out of ${secretWord.length}!`); 
    users[userId].guessedWords.push(guess);
}

//compare guess with secret word
function compare(guess, secretWord) {
    let matches = 0;
    const letterCount = {};

    for( let letter of secretWord.toUpperCase() ) {
        letterCount[letter] = letterCount[letter] + 1 || 1;
    }

    for( let letter of guess.toUpperCase() ) {
        if( letterCount[letter] ) {
            letterCount[letter] -= 1;
            matches += 1;
        }
    }
    return matches;
}

//check if guess is exactly same as secret word
function exactMatch(guess, secretWord) {
    return guess.toUpperCase() === secretWord.toUpperCase();
}

const game = {
    users,
    addUser,
    removeUser,
    addGuessResult,
};

module.exports = game;