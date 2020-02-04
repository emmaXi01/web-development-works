const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

app.use(cookieParser());
app.get('/', (req, res) => {
  const store = req.query.store;
  if(store) {
    res.cookie('saved', store, { maxAge: 15000, sameSite: 'Lax'});
  }

  const saw = req.cookies.saved;
  res.send(`<p>Request had the value for cookie "saved": ${saw}</p>`);
});

app.listen(PORT, () => console.log(`Running`));

