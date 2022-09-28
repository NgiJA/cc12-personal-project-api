const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { User } = require('../models');

const genToken = (payload) =>
	jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', {
		expiresIn: process.env.JWT_EXPIRES || '1d'
	});

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const admin = await User.findOne({ where: { username: username } });
		console.log(admin);

		if (!admin) {
			throw new AppError('username is invalid', 400);
		}

		const isCorrect = await bcrypt.compare(password, admin.password); // ถ้า password ถูกจะเป็น true ถ้าไม่ถูกจะเป็น false
		if (!isCorrect) {
			throw new AppError('password is invalid', 400);
		}

		if (admin.role !== 'ADMIN') {
			throw new AppError('you are not admin', 400);
		}

		const token = genToken({ id: admin.id });

		res.status(200).json({ token: token });
	} catch (err) {
		next(err);
	}
};
