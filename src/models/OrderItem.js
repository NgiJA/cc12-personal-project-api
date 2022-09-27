module.exports = (sequelize, DataTypes) => {
	const OrderItem = sequelize.define(
		'OrderItem',
		{
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			}
		},
		{ underscored: true }
	);

	OrderItem.associate = (db) => {
		OrderItem.belongsTo(db.Order, {
			foreignKey: {
				name: 'orderId',
				allowNull: false
			},
			onDelete: 'RESTRICT',
			onUpdate: 'RESTRICT'
		});

		OrderItem.belongsTo(db.Product, {
			foreignKey: {
				name: 'productId',
				allowNull: false
			},
			onDelete: 'RESTRICT',
			onUpdate: 'RESTRICT'
		});
	};

	return OrderItem;
};
