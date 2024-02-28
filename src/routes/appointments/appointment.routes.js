const express = require('express');
const checkAuth = require('../../middlewares/checkAuth.middleware');
const checkRole = require('../../middlewares/checkRole.middleware');
const appointmentControllers = require('./appointment.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.post('/addAppointment', [checkAuth, checkRole([UserRole.ROLE_USER_CLIENT])], appointmentControllers.addAppointment);
router.put('/appointment/:appointId', [checkAuth, checkRole([UserRole.ROLE_USER_CLIENT])], appointmentControllers.updateAppointment);

router.get('/all', checkAuth, appointmentControllers.getAll);
router.get('/servicePrefered', [checkAuth, checkRole([UserRole.ROLE_USER_CLIENT])], appointmentControllers.getServicePrefered);
router.get('/employePrefered', [checkAuth, checkRole([UserRole.ROLE_USER_CLIENT])], appointmentControllers.getEmployePrefered);
router.get('/rendezVousFini', [checkAuth, checkRole([UserRole.ROLE_USER_EMPLOYE])], appointmentControllers.getAppointmentFinished);
router.get('/commission', [checkAuth, checkRole([UserRole.ROLE_USER_EMPLOYE])], appointmentControllers.getCommissionToday);
router.get('/task', [checkAuth, checkRole([UserRole.ROLE_USER_EMPLOYE])], appointmentControllers.getTaskToday);
router.get('/montant/:appointId', checkAuth, appointmentControllers.getMontantToPaid);
router.get('/client/:clientId', checkAuth, appointmentControllers.findByClient);
router.get('/employe/:empId', checkAuth, appointmentControllers.findByEmp);

module.exports = router;