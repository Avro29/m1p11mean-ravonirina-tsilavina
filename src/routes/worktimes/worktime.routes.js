const express = require('express');
const checkAuth = require('../../middlewares/checkAuth.middleware');
const checkRole = require('../../middlewares/checkRole.middleware');
const worktimeControllers = require('./worktime.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.post('/addWorktime', [checkAuth, checkRole([UserRole.ROLE_USER_EMPLOYE])], worktimeControllers.addWorktime);
router.put('/:worktId', checkAuth, worktimeControllers.updateWorktime);

router.get('/all', checkAuth, worktimeControllers.getAll);
router.get('/:empId', checkAuth, worktimeControllers.findByEmp);

module.exports = router;