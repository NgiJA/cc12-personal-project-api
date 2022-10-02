const { Product } = require('../models');

exports.getProduct = async (req, res, next) => {
	try {
		const products = await Product.findAll();
		console.log(products);
		res.status(200).json({ products: products });
	} catch (err) {
		next(err);
	}
};
