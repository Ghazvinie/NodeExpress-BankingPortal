const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');
const servicesRoutes = require('./routes/services');
const accountRoutes = require('./routes/accounts');

const app = express();

// Routes use
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

// Set view engine (don't need to use path.join())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static directory (don't need to use path.join())
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST data
app.use(express.urlencoded({ extended: true }));

// Profile route
app.get('/profile', (req, res) => {
    res.render('profile', { user: users[0] });
});

// Root route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts
    });
});


app.listen(3000, () => console.log('PS Project Running on Port 3000!'));
