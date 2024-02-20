require('dotenv').config();

const express = require('express')
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

var usersRouter = require('./src/routes/users/user.routes');
var servicesRouter = require('./src/routes/services/service.routes');
var appointmentsRouter = require('./src/routes/appointments/appointment.routes');
var worktimesRouter = require('./src/routes/worktimes/worktime.routes');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/services', servicesRouter);
app.use('/appointments', appointmentsRouter);
app.use('/worktimes', worktimesRouter);

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})