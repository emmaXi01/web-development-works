const express = require('express');
const cookieParser = require('cookie-parser');
const { sessions, addSession, deleteSession } = require('./session');
const auth = require('./auth');

const app = express();
const PORT = 4000;

app.use(cookieParser());
app.use(express.static('./build'));

app.get('/session', (req, res) => {
  const sid = req.cookies.sid;
  if(!sid) {
    res.status(401).json({ code: 'LOGIN_REQUIRED' });
    return;
  }
  if(!sessions[sid]) {
    res.clearCookie('sid');
    res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
    return;
  }
  res.status(200).json(sessions[sid]);
});

app.post('/session', express.json(), (req, res) => {
  const { username } = req.body;
  res.clearCookie('sid');
  if(!username) {
    res.status(400).json({ code: 'USERNAME_REQUIRED' });
    return;
  }
  if(!auth.isPermitted(username)) {
    res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
    return;
  }
  const session = addSession( { username } );
  res.cookie('sid', session.id);
  res.status(200).json(session);
});

app.delete('/session', express.json(), (req, res) => {
  const sid = req.cookies.sid;
  res.clearCookie('sid');
  deleteSession(sid);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
