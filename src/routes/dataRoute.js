const express = require('express');

const dataController = require('../controller/dataController');

const router = express.Router();

router.get('/product', dataController.getAllProduct);
router.get('/product/:productId', dataController.getSelectedProduct);
router.get('/order', dataController.getOrderAdmin);
router.get('/order/cartProduct/:productId', dataController.getCartProductData);

module.exports = router;
