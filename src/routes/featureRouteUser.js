const express = require('express');

const featureControllerUser = require('../controller/featureControllerUser');

const router = express.Router();

router.get('/product', featureControllerUser.getProduct);

module.exports = router;
