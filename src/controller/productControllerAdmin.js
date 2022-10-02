const fs = require('fs');
const { Product } = require('../models');
const cloudinary = require('../utils/cloudinary');
const AppError = require('../utils/appError');

exports.createProduct = async (req, res, next) => {
	const { productName, productType, price, stock } = req.body;

	// console.log(productName, productType, price, stock);
	// console.log(req.file);
	try {
		if (!productName) {
			throw new AppError('productName is required', 400);
		}
		if (!productType) {
			throw new AppError('ProductType is required', 400);
		}
		if (!price) {
			throw new AppError('price is required', 400);
		}
		if (!stock) {
			throw new AppError('stock is required', 400);
		}
		if (!req.file) {
			throw new AppError('image is required', 400);
		}

		const filePath = await cloudinary.upload(req.file.path); // เอา path ที่แสดงรูปภาพอัพโหลดขึ้น cloudinary ตัวอย่าง path --> path: 'public\\images\\16646423181158004117809.jpeg'
		// console.log(filePath); // filePath คือ link รูปที่อยู่บน cloudinary
		fs.unlinkSync(req.file.path); // ลบ path ที่แสดงรูปภาพออกจากคอมเรา (คือการลบไฟล์รูปภาพที่อัพโหลดขึ้น cloudinary แล้ว ออกจากคอม)

		const newProduct = await Product.create({
			productName: productName,
			productType: productType,
			price: price,
			stock: stock,
			image: filePath
		});
		// console.log(newProduct);
		res.status(201).json({ message: 'success create product' });
	} catch (err) {
		next(err);
	}
};

exports.deleteProduct = async (req, res, next) => {
	const { productId } = req.params;
	try {
		await Product.destroy({ where: { id: productId } }); // middleware นี้ ตอนนี้จะลบได้แค่ข้อมูลใน database แต่ไม่ได้ลบรูปที่ upload ขึ้นไปบน cloudinary แล้ว
		res.status(200).json({ message: 'success delete product' });
	} catch (err) {
		next(err);
	}
};

exports.updateProduct = async (req, res, next) => {
	const { productId } = req.params;
	const { productName, productType, price, stock } = req.body;
	try {
		if (!productName) {
			throw new AppError('productName is required', 400);
		}
		if (!productType) {
			throw new AppError('ProductType is required', 400);
		}
		if (!price) {
			throw new AppError('price is required', 400);
		}
		if (!stock) {
			throw new AppError('stock is required', 400);
		}
		if (!req.file) {
			throw new AppError('image is required', 400);
		}

		const oldProduct = await Product.findOne({ where: { id: productId } });
		const urlOldImage = oldProduct.image; // หา link ของรูปเก่า เพื่อที่จะนำไปหาค่า publicId เพื่อให้รูปใหม่ที่อัพเดท อัพทับรูปเก่า

		// console.log(urlOldImage);
		// urlOldImage ของ p2 --> https://res.cloudinary.com/dhri6u7jf/image/upload/v1664642120/16646421176472906243565.jpg
		const filePath = await cloudinary.upload(
			req.file.path,
			cloudinary.getPublicId(urlOldImage)
		);
		fs.unlinkSync(req.file.path);

		await Product.update(
			{
				productName: productName,
				productType: productType,
				price: price,
				stock: stock,
				image: filePath
			},
			{ where: { id: productId } }
		);
		res.status(200).json({ message: 'success update product' });
	} catch (err) {
		next(err);
	}
};
