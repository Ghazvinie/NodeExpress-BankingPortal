const fs = require('fs');
const path = require('path');

const writeJSON = () => {
// Read account data
const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);

// Read user data
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), "utf8");
const users = JSON.parse(userData);
};

module.exports = { accounts, users, writeJSON };