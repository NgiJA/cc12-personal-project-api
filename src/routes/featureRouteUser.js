const express = require('express');

const featureControllerUser = require('../controller/featureControllerUser');
const upload = require('../middlewares/upload');

const router = express.Router();

router
	.route('/order')
	.post(upload.single('slip'), featureControllerUser.createOrder);

router.get('/purchaseorder', featureControllerUser.getUserOrder);
router.get('/user', featureControllerUser.getUserData);

module.exports = router;
