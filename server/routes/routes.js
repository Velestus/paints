const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Expense = require('../models/Expense');

router.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

module.exports = router;
