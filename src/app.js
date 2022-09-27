require('dotenv').config(); // เรียกใช้ทุกอย่างใน .env
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port: ${port}`));
