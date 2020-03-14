const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');

const users = require('./model/users');
const store = require('./model/store');

app.use(express.static('./public'));
app.use(cookieParser());

//check if user has a uid cookie,
function doesUserLogin(req) {
    const userId = req.cookies.userId;
    if(userId && users[userId]) {
        return true;    
    } 
    return false; 
};

//login
app.post('/session', express.json(), (req, res) => {
    const { username } = req.body;
    if(!username || username.includes('dog') || username.includes(' ')) {
        res.status(400).json( { errorCode: 'invalid-username' });
        return;
    }
    
    do {
        var userId = Math.floor(Math.random() * 1000);
    } while(users[userId])

    res.cookie('userId', userId);
    users[userId] = { username };
    res.sendStatus(200);
});

//get the list of items
app.get('/items', (req, res) => {
    if(!doesUserLogin(req)) {
        res.status(403).json({ errorCode: 'invalid-user'});
        return;
    }

    res.json(Object.values(store.items));
});

//add an item
app.post('/items', express.json(), (req, res) => {
    if(!doesUserLogin(req)) {
        res.status(403).json({ errorCode: 'invalid-user'});
        return;
    }

    const { itemName, quantity } = req.body;
    if(!itemName || itemName.trim() === '') {
        res.status(400).json({ errorCode: 'missing-item-name' });
        return;
    }

    if(store.itemExisting(itemName)) {
        res.status(409).json({ errorCode: 'duplicate' });
        return;
    }

    if(isNaN(quantity) || quantity < 0) {
        res.status(400).json({ errorCode: 'invalid-quantity' });
        return;
    }
    
    do {
        var itemId = Math.floor(Math.random() * 1000);
    } while(store.items[itemId])

    store.items[itemId] = { itemId, itemName, quantity };
    res.json(Object.values(store.items));
});

//update an item
app.patch('/items/:itemid', express.json(), (req, res) => {
    if(!doesUserLogin(req)) {
        res.status(403).json({ errorCode: 'invalid-user'});
        return;
    }

    const itemId = req.params.itemid;
    const { quantity } = req.body;
    if(!store.items[itemId]) {
        res.status(404).json({ errorCode: 'no-item' });
        return;
    }

    if(!quantity) {
        res.status(400).json({ errorCode: 'missing-quantity'});
        return;
    }

    if(isNaN(quantity) || quantity < 0) {
        res.status(400).json({ errorCode: 'invalid-quantity' });
        return;
    }

    store.items[itemId].quantity = quantity;
    res.json(Object.values(store.items));
});

//remove an item
app.delete('/items/:itemid', (req, res) => {
    if(!doesUserLogin(req)) {
        res.status(403).json({ errorCode: 'invalid-user'});
        return;
    }

    const itemId = req.params.itemid;
    if(!store.items[itemId]) {
        res.status(404).json({ errorCode: 'no-item' });
        return;
    }

    delete store.items[itemId];
    res.json(Object.values(store.items));
});

//logout
app.delete('/session', (req, res) => {
    const userId = req.cookies.userId;
    delete users[userId];
    res.clearCookie('userId');
    res.sendStatus(200); 
});

app.listen(PORT, () => {
    console.log(`Listen on the http://localhost:${PORT}`);
});