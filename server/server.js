const express = require('express');
const router = require('./routes/routes.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

// mongoose.connect('mongodb://username:password@ds115573.mlab.com:15573/paints');

app.use('/', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
