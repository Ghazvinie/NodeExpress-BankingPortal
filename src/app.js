const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// Set view engine (don't need to use path.join())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static directory (don't need to use path.join())
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index', {title: 'Index'});

});

app.listen(3000, () => console.log('PS Project Running on Port 3000!'));