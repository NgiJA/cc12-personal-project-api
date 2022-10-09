const { sequelize } = require('./models');
// sequelize.sync({ alter: true });

require('dotenv').config(); // เรียกใช้ทุกอย่างใน .env
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./middlewares/notFound');
const error = require('./middlewares/error');

const authRouteUser = require('./routes/authRouteUser');
const authRouteAdmin = require('./routes/authRouteAdmin');
const productRouteAdmin = require('./routes/productRouteAdmin');
const orderRouteAdmin = require('./routes/orderRouteAdmin');
const featureRouteUser = require('./routes/featureRouteUser');
const dataRoute = require('./routes/dataRoute');
const authenticate = require('./middlewares/authenticate');

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cors()); // ให้ server สามารถรับ request ที่มาจากต่าง domain ได้
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user/auth', authRouteUser);
app.use('/data', dataRoute);
app.use('/user/feature', authenticate, featureRouteUser);
app.use('/admin/auth', authRouteAdmin);
app.use('/admin/product', productRouteAdmin);
app.use('/admin/order', orderRouteAdmin);

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port: ${port}`));
