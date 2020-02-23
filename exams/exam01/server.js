const express = require('express');
const app = express();
const PORT = 3000;

const words = require('./words');
const game = require('./game');
const gameWeb = require('./game-web');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    let userId = req.query.userId;
    let isCompleted = false;

    if(userId && game.users[userId]) {  
        isCompleted = game.users[userId].isCompleted;  
    } else {
        do{
            userId = Math.floor(Math.random() * 1000);
        } while(game.users[userId]);
        game.addUser(userId, words);
    } 
    
    res.send(gameWeb.gamePage({ game, words, userId, isCompleted }));
    
});

app.post('/guessWord', (req, res) => {
    const { guess, userId } = req.body;
    game.addGuessResult({ userId, guess, words });
    res.redirect('/?userId=' + userId);
});

//play again
app.post('/restart', (req, res) => {
    const { userId }= req.body;
    game.removeUser(userId)
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Listen on the http://localhost:${PORT}`);
});