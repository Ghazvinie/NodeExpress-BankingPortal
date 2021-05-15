const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('static', path.join(__dirname, 'public'));