const express = require('express');
const router = express.Router();
const BusinessRoutes = require('./../controllers/business');

router.post('/signup', BusinessRoutes.signup)

router.post('/login', BusinessRoutes.login)

module.exports = router
