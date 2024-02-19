require('dotenv').config();

const express = require('express')
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

var usersRouter = require('./src/routes/users/user.routes');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', usersRouter);

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})