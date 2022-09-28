const authControllerUser = require('../controller/authControllerUser');

const express = require('express');

const router = express.Router();

router.post('/register', authControllerUser.register);
router.post('/login', authControllerUser.login);

module.exports = router;
