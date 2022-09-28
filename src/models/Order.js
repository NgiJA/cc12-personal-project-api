module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define(
		'Order',
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				validate: {
					isEmail: true
				}
			},
			mobile: {
				type: DataTypes.STRING,
				unique: true
			},
			optional: {
				type: DataTypes.STRING,
				allowNull: false
			},
			slip: {
				type: DataTypes.STRING,
				allowNull: false
			},
			status: {
				type: DataTypes.ENUM('PENDING', 'SUCCESS', 'CANCEL'),
				allowNull: false,
				defaultValue: 'PENDING'
			}
		},
		{ underscored: true }
	);

	Order.associate = (db) => {
		Order.belongsTo(db.User, {
			foreignKey: {
				name: 'customerId',
				allowNull: false
			},
			onDelete: 'RESTRICT',
			onUpdate: 'RESTRICT'
		});

		Order.hasMany(db.OrderItem, {
			foreignKey: {
				name: 'orderId',
				allowNull: false
			},
			onDelete: 'RESTRICT',
			onUpdate: 'RESTRICT'
		});
	};

	return Order;
};
