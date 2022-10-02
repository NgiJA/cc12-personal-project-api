const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images');
	},
	filename: (req, file, cb) => {
		// console.log(file);
		cb(
			null,
			new Date().getTime() +
				'' +
				Math.round(Math.random() * 10000000000) +
				'.' +
				file.mimetype.split('/')[1]
		);
	}
});

module.exports = multer({ storage }); // สิ่งที่ return จาก multer() จะเป็น middleware ตัวนึง
