var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {
    res.render("index");
});

//Get current account
router.get('/account', (req, res) => {
    throw new NotImplementedException;
});

//Create new account
router.post('/account', (req, res) => {
    throw new NotImplementedException;
});

//Get all transactions
router.get('/transaction', (req, res) => {
    throw new NotImplementedException;
});

//Get transaction By id
router.get('/transaction/:id', (req, res) => {
    throw new NotImplementedException;
});


//Create new transaction
router.post('/transaction', (req, res) => {
    throw new NotImplementedException;
});

module.exports = router;