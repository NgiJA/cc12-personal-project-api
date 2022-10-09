const dataController = require('../controller/dataController');

const express = require('express');

const router = express.Router();

router.get('/product', dataController.getAllProduct);
router.get('/product/:productId', dataController.getSelectedProduct);
router.get('/order', dataController.getOrderAdmin);
router.get('/orderitem', dataController.getAllOrderItem);

module.exports = router;
