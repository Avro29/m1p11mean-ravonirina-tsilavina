require('dotenv').config();

const express = require('express')
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

var usersRouter = require('./src/routes/users/user.routes');
var servicesRouter = require('./src/routes/services/service.routes');
var appointmentsRouter = require('./src/routes/appointments/appointment.routes');
var worktimesRouter = require('./src/routes/worktimes/worktime.routes');
var finishappointmentsRouter = require('./src/routes/finishappointments/finishappointment.routes');
var paymentRouter = require('./src/routes/payments/payment.routes');
var offerRouter = require('./src/routes/offers/offer.routes');
var expensesRouter = require('./src/routes/expenses/expenses.routes');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/services', servicesRouter);
app.use('/appointments', appointmentsRouter);
app.use('/worktimes', worktimesRouter);
app.use('/finishappointments', finishappointmentsRouter);
app.use('/payments', paymentRouter);
app.use('/offers', offerRouter);
app.use('/expenses', expensesRouter);

app.use(function(req, res, next) {
  res.status(404).json({
    message: "No such route exists"
  })
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});

module.exports = app;