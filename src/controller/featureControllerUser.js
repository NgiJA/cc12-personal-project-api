const fs = require('fs');
const validator = require('validator');
const cloudinary = require('../utils/cloudinary');
const AppError = require('../utils/appError');
const { Order, OrderItem, Product } = require('../models');

exports.createOrder = async (req, res, next) => {
	try {
		const { firstName, lastName, address, email, mobile, optional } = req.body;
		const orderItems = JSON.parse(req.body.orderItems);
		// const firstName = JSON.parse(req.body.firstName);
		// const lastName = JSON.parse(req.body.lastName);
		// const address = JSON.parse(req.body.address);
		// const email = JSON.parse(req.body.email);
		// const mobile = JSON.parse(req.body.mobile);
		// const optional = JSON.parse(req.body.optional);

		console.log(orderItems);

		const isEmail = validator.isEmail(String(email));
		const isMobile = validator.isMobilePhone(String(mobile));

		if (!firstName) {
			throw new AppError('first name is required', 400);
		}
		if (!lastName) {
			throw new AppError('last name is required', 400);
		}
		if (!address) {
			throw new AppError('address is required', 400);
		}
		if (!email) {
			throw new AppError('email is required', 400);
		}
		if (!mobile) {
			throw new AppError('mobile is required', 400);
		}
		if (!isEmail) {
			throw new AppError('email invalid format', 400);
		}
		if (!isMobile) {
			throw new AppError('mobile invalid format', 400);
		}
		if (!req.file) {
			throw new AppError('image is required', 400);
		}

		const filePath = await cloudinary.upload(req.file.path);
		const customerId = req.user.id;
		fs.unlinkSync(req.file.path);

		const newOrder = await Order.create({
			firstName: firstName,
			lastName: lastName,
			address: address,
			email: email,
			mobile: mobile,
			optional: optional,
			slip: filePath,
			customerId: customerId
		});

		for (let item of orderItems) {
			console.log(item);
			item.orderId = newOrder.id;
			await OrderItem.create(item);
		}

		// orderItems.for(async (item, index) => {
		// 	// const product = await Product.findOne({ where: { id: item.productId } }); // หา product object เพื่อหาค่า price
		// 	// const order = await Order.findOne({ where: { id: newOrder.id } }); // หา order object เพื่อหาค่า orderId
		// 	// console.log(order);

		// 	// orderItems[index].price = product.price; // เพิ่ม key price ใน object orderItem
		// 	item.orderId = newOrder.id; // เพิ่ม key orderId ใน object orderItem

		// 	await OrderItem.create(item); // สร้าง orderItem
		// });

		res.status(201).json({ message: 'create order success' });
	} catch (err) {
		next(err);
	}
};
