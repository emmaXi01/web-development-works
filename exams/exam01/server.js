const express = require('express');
const app = express();
const PORT = 3000;

const words = require('./words');
const game = require('./game');
const gameWeb = require('./game-web');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    let uid = req.query.uid;
    let isCompleted = false;

    if(uid) {  
        isCompleted = game.users[uid].isCompleted;  
    } else {
        do{
            uid = Math.floor(Math.random() * 1000);
        } while(game.users[uid]);
        game.addUser(uid, words);
    } 
    
    res.send(gameWeb.gamePage({ game, words, uid, isCompleted }));
    
});

app.post('/guessWord', (req, res) => {
    const { guess, uid } = req.body;
    game.addGuessResult({ uid, guess, words });
    res.redirect('/?uid=' + uid);
});

//play again
app.post('/restart', (req, res) => {
    const { uid }= req.body;
    game.removeUser(uid)
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Listen on the http://localhost:${PORT}`);
});