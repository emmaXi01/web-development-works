"use strict";
const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const auth = require('./auth');
const users = require('./users');
const { messages, addMessage } = require('./message');

const app = express();
const PORT = 3000;

app.use(express.static('./build'));
app.use(cookieParser());

app.get('/session', (req, res) => {
    const uid = req.cookies.uid;
    if(!uid) {
        res.status(401).json({ errorCode: 'invalid-user' });
        return;
    }

    if(!users[uid]) {
        res.clearCookie('uid');
        res.status(403).json({ errorCode: 'login-unauthorized' });
        return;
    }

    res.status(200).json(uid);
});

//login
app.post('/session', express.json(), (req, res) => {
    const { username } = req.body;
    res.clearCookie('uid');

    if(!username) {
        res.status(400).json({ errorCode: 'username-required' });
        return;
    }

    if(!auth.isPermitted(username)) {
        res.status(403).json({ errorCode: 'login-unauthorized' });
        return;
    }

    const uid = uuidv4();
    res.cookie('uid', uid);
    users[uid] = { username, uid };
    res.status(200).json(uid);
});

//get the list of users
app.get('/users', (req, res) => {
    const uid = req.cookies.uid;

    if(!uid) {
        res.status(401).json({ errorCode: 'invalid-user' });
        return;
    }

    if(!users[uid]) {
        res.clearCookie('uid');
        res.status(403).json({ errorCode: 'login-unauthorized' });
        return;
    }

    res.status(200).json(Object.values(users));
});

//get the list of messages
app.get('/messages', (req, res) => {
    const uid = req.cookies.uid;
    if(!uid) {
        res.status(401).json({ errorCode: 'invalid-user' });
        return;
    }

    if(!users[uid]) {
        res.clearCookie('uid');
        res.status(403).json({ errorCode: 'login-unauthorized' });
        return;
    }

    res.status(200).json(messages);
});

//send a message
app.post('/messages', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    if(!uid) {
        res.status(401).json({ errorCode: 'invalid-user' });
        return;
    }

    if(!users[uid]) {
        res.clearCookie('uid');
        res.status(403).json({ errorCode: 'login-unauthorized' });
        return;
    }

    const { text } = req.body;
    if(!text || text.trim() === '') {
        res.status(400).json({ errorCode: 'missing-text'});
        return;
    }

    const sender = users[uid].username;
    addMessage({ sender, text });
    res.status(200).json(messages);

});

//logout
app.delete('/session', (req, res) => {
    const uid = req.cookies.uid;
    delete users[uid];
    res.clearCookie('uid');
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Listening on the http://localhost:${PORT}`);
})
