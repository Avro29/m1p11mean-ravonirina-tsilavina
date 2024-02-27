const express = require('express');
const checkAuth = require('../../middlewares/checkAuth.middleware');
const checkRole = require('../../middlewares/checkRole.middleware');
const serviceControllers = require('./service.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.post('/addService', [checkAuth, checkRole([UserRole.ROLE_USER_MANAGER])], serviceControllers.addService);
router.put('/:servId', [checkAuth, checkRole([UserRole.ROLE_USER_MANAGER])], serviceControllers.updateService);

router.get('/allService', checkAuth, serviceControllers.getAllService);
router.get('/search', checkAuth, serviceControllers.searchService);
router.get('/:servId', checkAuth, serviceControllers.getServiceById);

module.exports = router;