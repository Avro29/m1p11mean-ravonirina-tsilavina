const express = require('express');
const checkAuth = require('../../middlewares/checkAuth.middleware');
const checkRole = require('../../middlewares/checkRole.middleware');
const finishappointmentControllers = require('./finishappointment.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.post('/addFinishAppointment', [checkAuth, checkRole([UserRole.ROLE_USER_EMPLOYE])], finishappointmentControllers.addFinishAppointment);

router.get('/all', checkAuth, finishappointmentControllers.getAll);
router.get('/appointment/:appointmentId', checkAuth, finishappointmentControllers.getAll);

module.exports = router;