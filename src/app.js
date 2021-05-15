const fs = require('fs');
const path = require('path');
const express = require('express');
const { json } = require('body-parser');

const app = express();

// Set view engine (don't need to use path.join())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static directory (don't need to use path.join())
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST data
app.use(express.urlencoded({ extended: true }));

// Read account data
const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);

// Read user data
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), "utf8");
const users = JSON.parse(userData);

// Account routes
app.get('/savings', (req, res) => {
    res.render('account', { account: accounts.savings });
});

app.get('/checking', (req, res) => {
    res.render('account', { account: accounts.checking });
});

app.get('/credit', (req, res) => {
    res.render('account', { account: accounts.credit });
});

// Profile route
app.get('/profile', (req, res) => {
    res.render('profile', { user: users[0] });
});

// Transfer routes
app.get('/transfer', (req, res) => {
    res.render('transfer');
});

app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);
    const accountsJSON = JSON.stringify(accounts);



    fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON, 'utf8');

    res.render('transfer', { message: 'Transfer Completed' });
});

// Payment routes
app.get('/payment', (req, res) => {
    res.render('payment', { account: accounts.credit });
});

app.post('/payment', (req, res) => {
    accounts.credit.balance = parseInt(accounts.credit.balance - req.body.amount);
    accounts.credit.available = parseInt(accounts.credit.available + req.body.amount);
    const accountsJSON = JSON.stringify(accounts);

    fs.writeFileSync(path.join(__dirname, '/json/accounts.json'),accountsJSON, 'utf8');

    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

// Root route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts
    });
});


app.listen(3000, () => console.log('PS Project Running on Port 3000!'));
