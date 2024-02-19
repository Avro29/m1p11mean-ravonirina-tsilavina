const express = require('express');
const checkAuth = require('../../middlewares/checkAuth.middleware');
const checkRole = require('../../middlewares/checkRole.middleware');
const serviceControllers = require('./service.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.post('/addService', serviceControllers.addService);

module.exports = router;