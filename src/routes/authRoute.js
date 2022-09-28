const authController = require('../controller/authController');

const express = require('express');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
