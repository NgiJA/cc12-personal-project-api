const express = require('express');

const productControllerAdmin = require('../controller/productControllerAdmin');
const upload = require('../middlewares/upload');

const router = express.Router();

router
	.route('/create')
	.post(upload.single('image'), productControllerAdmin.createProduct);

router
	.route('/update/:productId')
	.patch(upload.single('image'), productControllerAdmin.updateProduct);

router.delete('/delete/:productId', productControllerAdmin.deleteProduct);

module.exports = router;
