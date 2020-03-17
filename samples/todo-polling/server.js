const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const todos = require('./todos');
const { v4: uuidv4 } = require('uuid');

app.use(cookieParser());
app.use(express.static('./public'));

app.get('/session', (req, res) => {
  const uid = req.cookies.uid;
  if(!uid) {
    res.status(401).json({ code: 'provide-error'});
    return;
  }
  if(!todos.users[uid]) {
    res.clearCookie('uid');
    res.status(403).json({ code: 'provide-error'});
    return;
  }
  res.sendStatus(200);
});

app.post('/session', express.json(), (req, res) => {
  const username = req.body.username;
  if(username === 'dog') {
    res.status(403).json({ code: 'provide-error'});
    return;
  }
  const uid = uuidv4();
  todos.lists[username] = todos.lists[username] || [ 'fix code'];
  const list = todos.lists[username];
  todos.users[uid] = { username, list };
  res.cookie('uid', uid);
  res.json(list);
});

app.get('/todos', (req, res) => {
  const uid = req.cookies.uid;
  if(!uid || !todos.users[uid] ) {
    res.clearCookie('uid');
    res.status(401).json({ code: 'provide-error'});
    return;
  }

  res.json(todos.users[uid].list);
});

app.post('/todos', express.json(), (req, res) => {
  const uid = req.cookies.uid;
  if(!uid || !todos.users[uid] ) {
    res.clearCookie('uid');
    res.status(401).json({ code: 'provide-error'});
    return;
  }

  const task = req.body.task;
  todos.users[uid].list.push(task); // Don't use push, this is fast for class
  res.json(todos.users[uid].list);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );

