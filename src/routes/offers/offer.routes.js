const express = require('express');
const checkAuth = require('../../middlewares/checkAuth.middleware');
const checkRole = require('../../middlewares/checkRole.middleware');
const offerControllers = require('./offer.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.post('/addOffer', checkAuth, offerControllers.addOffer);

router.get('/all', checkAuth, offerControllers.getAll);
router.get('/offer/:id', checkAuth, offerControllers.getById);

module.exports = router;