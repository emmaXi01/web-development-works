const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

app.get('/session', routes.session.status);
app.post('/session', routes.session.create);
app.delete('/session', routes.session.delete);

app.get('/jobs/:username', routes.jobs.all.read);
app.post('/jobs/:username', routes.jobs.one.add);
app.get('/jobs/:username/:jobId', routes.jobs.one.read);
app.put('/jobs/:username/:jobId', routes.jobs.one.update);
app.delete('/jobs/:username/:jobId', routes.jobs.one.delete);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
});