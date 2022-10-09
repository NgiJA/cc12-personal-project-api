const express = require('express');

const orderControllerAdmin = require('../controller/orderControllerAdmin');

const router = express.Router();

router.patch('/update/:orderId', orderControllerAdmin.updateOrder);

module.exports = router;
