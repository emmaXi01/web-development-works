const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const chat = require('./chat');
const chatWeb = require('./chat-web');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  let uid = req.cookies.uid;

  if(!chat.users[uid]) {
    uid = '';
    res.cookie('uid', '');
  }
  res.send(chatWeb.chatPage(chat, uid));
});

app.post('/sendMessage', (req, res) => {
  const { text  } = req.body;
  const uid = req.cookies.uid;
  if(!chat.users[uid]) {
    res.status(403).send('You are not allowed!');
    return;
  }
  chat.addMessage({ uid, text });
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  const uid = req.cookies.uid;
  chat.removeUser(uid);
  res.cookie('uid', '');
  res.redirect('/');
});

app.post('/sendUser', ( req, res ) => {
  const { username } = req.body;

  // Sanitize before saving
  const clean = username.replace(/[^A-Za-z0-9_\-]/g, '');

  // if( clean !== username ) {
    // They did bad things
    // But we won't complain this time
  // }

  const id = chat.addUser(clean);
  res.cookie('uid', id);
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
