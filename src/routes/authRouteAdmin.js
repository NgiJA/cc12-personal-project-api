const authControllerAdmin = require('../controller/authControllerAdmin');

const express = require('express');

const router = express.Router();

router.post('/login', authControllerAdmin.login);

module.exports = router;
