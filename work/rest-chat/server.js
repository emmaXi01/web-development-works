"use strict";
const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

const chat = require('./chat.js');

app.use(cookieParser());
app.use(express.static('./public'));

//login
app.post('/session', express.json(), (req, res) => {
    const { username } = req.body;

    if(!username || username.includes('dog') || username.includes(' ')) {
        res.status(400).json({ errorCode: 'invalid-username' });
        return;
    }

    const uid = uuidv4();
    res.cookie('uid', uid);
    chat.users[uid] = { username };
    res.json(chat);
});

//get the list of messages
app.get('/chat', (req, res) => {
    const uid = req.cookies.uid;
    if(!uid || !chat.users[uid] ) {
        res.clearCookie('uid');
        res.status(401).json({ errorCode: 'invalid-user'});
        return;
    }

    res.json(chat);
});

//send a message
app.post('/chat', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    if(!uid || !chat.users[uid] ) {
        res.clearCookie('uid');
        res.status(401).json({ errorCode: 'invalid-user'});
        return;
    }

    const { text } = req.body;
    if(!text || text.trim() === '') {
        res.status(400).json({ errorCode: 'missing-text'});
        return;
    }

    const sender = chat.users[uid].username;
    chat.addMessage({ sender, text });
    res.json(chat.messages);

});

//logout
app.delete('/session', (req, res) => {
    const uid = req.cookies.uid;
    delete chat.users[uid];
    res.clearCookie('uid');
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Listening on the http://localhost${PORT}`);
})