const express = require('express');
const app = express();

// Notice this port is different than the front end dev server
// On production servers this would be 80/443 for HTTP/HTTPS
const PORT = 4000;

// Showing just a single user for simplicity
// in reality this would be a full session per user
// like in previous assignments

let isLoggedIn = false;

// The front end being react changes nothing in the services:
app.get('/session', (req, res) => {
  res.json({ isLoggedIn });
});

app.post('/session', (req, res) => {
  isLoggedIn = true;
  res.json({ isLogged });
});

app.delete('/session', (req, res) => {
  isLoggedIn = false;
  res.json({ isLoggedIn });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`) );
