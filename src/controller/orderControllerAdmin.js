const { Order } = require('../models');

exports.updateOrder = async (req, res, next) => {
	const { orderId } = req.params;
	try {
		await Order.update(
			{
				status: 'SUCCESS'
			},
			{ where: { id: orderId } }
		);
		res.status(200).json({ message: 'success update order' });
	} catch (err) {
		next(err);
	}
};
