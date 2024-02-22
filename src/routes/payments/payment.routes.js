const express = require('express');
const checkAuth = require('../../middlewares/checkAuth.middleware');
const checkRole = require('../../middlewares/checkRole.middleware');
const paymentControllers = require('./payment.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.post('/addPayment', checkAuth, paymentControllers.addPayment);

router.get('/all', checkAuth, paymentControllers.getAll);
router.get('/appointment/:appointmentId', checkAuth, paymentControllers.getByAppointment);

module.exports = router;