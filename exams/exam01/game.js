const users = {};

function addUser(uid, words) {
    const secretWord = pickSecretWord(words);
    users[uid] = { "secretWord": secretWord, "turns": 0, "guessedWords": [], "guessResults": [], isCompleted: false};
    console.log(secretWord);
}

function removeUser(uid) { 
    delete users[uid];     
}

//randomly generate a secret word at the start of the game
function pickSecretWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function addGuessResult({ uid, guess, words }) {
    guess = guess.toUpperCase();
    const secretWord = users[uid].secretWord;

     //if guess is not on the valid word list
    if(words.indexOf(guess) === -1) {
        users[uid].guessResults.push('Invalid Word! You can continue game!');
        users[uid].guessedWords.push(guess);
        return;
    }

    users[uid].turns += 1;
    if(exactMatch(guess, secretWord)) {
        users[uid].isCompleted = true; 
        users[uid].guessResults.push(`Correct! You won the game in ${users[uid].turns} turns! You can Play Again!`);
        users[uid].guessedWords.push(guess);  
        return;
    }

    const match = compare(guess, secretWord);
    users[uid].guessResults.push(`You macthed ${match} letters out of ${secretWord.length}!`); 
    users[uid].guessedWords.push(guess);
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