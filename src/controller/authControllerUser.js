const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { User } = require('../models');

const genToken = (payload) =>
	jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', {
		expiresIn: process.env.JWT_EXPIRES || '1d'
	});

exports.register = async (req, res, next) => {
	try {
		const {
			username,
			password,
			confirmPassword,
			firstName,
			lastName,
			email,
			mobile,
			role
		} = req.body;

		const isEmail = validator.isEmail(String(email));
		const isMobile = validator.isMobilePhone(String(mobile));

		if (!username) {
			throw new AppError('username is required', 400);
		}
		if (!password) {
			throw new AppError('password is required', 400);
		}
		if (password !== confirmPassword) {
			throw new AppError('password and confirm password must be equal', 400);
		}
		if (!firstName) {
			throw new AppError('firstname is required', 400);
		}
		if (!lastName) {
			throw new AppError('lastname is required', 400);
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

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			username: username,
			password: hashedPassword,
			firstName: firstName,
			lastName: lastName,
			mobile: mobile,
			email: email,
			role: role
		});
		// console.log(user);
		res.status(201).json({ message: 'success signup' });
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ where: { username: username } });
		// console.log(user);

		if (!user) {
			throw new AppError('username is invalid', 400);
		}

		const isCorrect = await bcrypt.compare(password, user.password); // ถ้า password ถูกจะเป็น true ถ้าไม่ถูกจะเป็น false
		if (!isCorrect) {
			throw new AppError('password is invalid', 400);
		}

		const token = genToken({ id: user.id });
		res.status(200).json({ token: token });
	} catch (err) {
		next(err);
	}
};
