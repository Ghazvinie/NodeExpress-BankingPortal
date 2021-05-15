const fs = require('fs');
const path = require('path');

// Read account data
const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);

// Read user data
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), "utf8");
const users = JSON.parse(userData);

const writeJSON = () => {

};

module.exports = { accounts, users, writeJSON };