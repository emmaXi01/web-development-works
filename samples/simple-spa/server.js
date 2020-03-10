const express = require('express');
const app = express();

app.use(express.static('./public'));

// Note: A good applciation would have this model logic in a separate file(s)
const people = {
  amit: {
    age: 23,
    grade: 76,
  },
  bao: {
    age: 24,
    grade: 92,
  },
};

app.get('/people/:name', (req, res) => {
  const name = req.params.name;
  if(people[name]) {
    res.json(people[name]);
  } else {
    res.status(404).json({ error: `Unknown user: ${name}`});
  }
});

app.get('/people/', (req, res) => {
  res.json(Object.keys(people));
});

app.post('/people/:name', express.json(), (req, res) => {
  const name = req.params.name;
  if(!name) {
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  if(people[name]) {
    res.status(409).json({ error: 'duplicate' });
    return;
  }
  people[name] = req.body;
  res.json(Object.keys(people));
});

app.delete('/people/:name', (req, res) => {
  const name = req.params.name;
  if(!name) {
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  delete people[name];
  res.json(Object.keys(people));
});

app.listen(3000, () => console.log('running'));
