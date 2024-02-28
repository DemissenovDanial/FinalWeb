const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { log } = require('console');
const loginRouter = require('../routers/login');
const registerRouter = require('../routers/register');
const mainRouter = require('../routers/main');
const adminRouter = require('../routers/admin');
const edituserRouter = require('../routers/edit-user');
const editMainContentRouter = require('../routers/edit-mainContent');
const numbersRouter = require('../routers/numbers');
const numbersFuncRouter = require('../routers/numbersFunc');
const chuckJokesRouter = require('../routers/chuckJokes');

const app = express();
const port = 3000;
app.set('views', path.join(__dirname, '..', '..', 'front-end', 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', '..', 'front-end')));

app.use('/', loginRouter);
app.use(registerRouter);
app.use(mainRouter);
app.use(adminRouter);
app.use(edituserRouter);
app.use(editMainContentRouter);
app.use(numbersRouter);
app.use(numbersFuncRouter);
app.use(chuckJokesRouter);
app.use(express.static(path.join(__dirname, '..', '..', 'uploads')));
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/main', async (req, res) => {
    res.render('main');
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});