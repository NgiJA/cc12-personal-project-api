const { Product, Order, OrderItem, User } = require('../models');

exports.getAllProduct = async (req, res, next) => {
	try {
		const products = await Product.findAll();
		console.log(products);
		res.status(200).json({ products: products });
	} catch (err) {
		next(err);
	}
};

exports.getSelectedProduct = async (req, res, next) => {
	const { productId } = req.params;
	try {
		const product = await Product.findOne({ where: { id: productId } });
		console.log(product);
		res.status(200).json({ product: product });
	} catch (err) {
		next(err);
	}
};

exports.getOrderAdmin = async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			include: [
				{ model: OrderItem, include: { model: Product } },
				{ model: User, attributes: { exclude: 'password' } }
			]
		});
		res.status(200).json({ orders: orders });
	} catch (err) {
		next(err);
	}
};

exports.getCartProductData = async (req, res, next) => {
	try {
		const { productId } = req.params;
		const product = await Product.findOne({ where: { id: productId } });
		res.status(200).json({ product: product });
	} catch (err) {
		next(err);
	}
};
