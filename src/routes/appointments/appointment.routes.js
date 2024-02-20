const express = require('express');
const checkAuth = require('../../middlewares/checkAuth.middleware');
const checkRole = require('../../middlewares/checkRole.middleware');
const appointmentControllers = require('./appointment.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.post('/addAppointment', [checkAuth, checkRole([UserRole.ROLE_USER_CLIENT])], appointmentControllers.addAppointment);
router.put('/appointment/:appointId', [checkAuth, checkRole([UserRole.ROLE_USER_CLIENT])], appointmentControllers.updateAppointment);

router.get('/all', checkAuth, appointmentControllers.getAll);
router.get('/client/:clientId', checkAuth, appointmentControllers.findByClient);
router.get('/employe/:empId', checkAuth, appointmentControllers.findByEmp);

module.exports = router;