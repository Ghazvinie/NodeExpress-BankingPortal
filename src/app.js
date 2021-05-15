const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// Set view engine (don't need to use path.join())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static directory (don't need to use path.join())
app.use(express.static(path.join(__dirname, 'public')));


// Read account data
const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);

// Read user data
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), "utf8");
const users = JSON.parse(userData);

// Account routes
app.get('/savings', (req, res) => {
    res.render('account', { account: accounts.savings});
});

app.get('/checking', (req, res) => {
    res.render('account', { account: accounts.checking});
});

app.get('/credit', (req, res) => {
    res.render('account', { account: accounts.credit});
});

// Profile route
app.get('/profile', (req, res) => {
    res.render('account', { user: users[0]});
});

// Root route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Accounts Summary',
        accounts: accounts
    });

});

app.listen(3000, () => console.log('PS Project Running on Port 3000!'));
