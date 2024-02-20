const express = require('express');
const checkAuth = require('../../middlewares/checkAuth.middleware');
const checkRole = require('../../middlewares/checkRole.middleware');
const userControllers = require('./user.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.post('/signup', userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.post('/empRegister', [checkAuth, checkRole([UserRole.ROLE_USER_MANAGER])], userControllers.empRegister);

router.get('/me', checkAuth, userControllers.getMe);
router.get('/allEmploye', checkAuth, userControllers.getAllEmp);
router.get('/allClient', checkAuth, userControllers.getAllClient);

router.get('/:empId', checkAuth, userControllers.getEmpById);
router.put('/:userId', checkAuth, userControllers.updateUsers);

module.exports = router;