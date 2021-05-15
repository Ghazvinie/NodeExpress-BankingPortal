const express = require('express');
const router = express.Router();

const { accounts, writeJSON } = require('../data');



// Transfer routes
router.get('/transfer', (req, res) => {
    res.render('transfer');
});

router.post('/transfer', (req, res) => {
    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);
    const accountsJSON = JSON.stringify(accounts);

    // fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON, 'utf8');
    writeJSON();

    res.render('transfer', { message: 'Transfer Completed' });
});

// Payment routes
router.get('/payment', (req, res) => {
    res.render('payment', { account: accounts.credit });
});

router.post('/payment', (req, res) => {
    accounts.credit.balance = parseInt(accounts.credit.balance - req.body.amount);
    accounts.credit.available = parseInt(accounts.credit.available + req.body.amount);
    const accountsJSON = JSON.stringify(accounts);

    // fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON, 'utf8');
    writeJSON();

    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;