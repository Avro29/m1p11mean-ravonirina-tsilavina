const express = require('express');
const checkAuth = require('../../middlewares/checkAuth.middleware');
const checkRole = require('../../middlewares/checkRole.middleware');
const expensesControllers = require('./expenses.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.post('/addExpenses', checkAuth, expensesControllers.addExpenses);

router.get('/all', checkAuth, expensesControllers.getAll);

module.exports = router;