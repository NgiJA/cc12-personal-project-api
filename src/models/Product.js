module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		'Product',
		{
			ProductName: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			ProductType: {
				type: DataTypes.ENUM('TOP', 'BOTTOM', 'FOOTWARE'),
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
			},
			quantity: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: true
				}
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{ underscored: true }
	);

	Product.associate = (db) => {
		Product.hasMany(db.OrderItem, {
			foreignKey: {
				name: 'productId',
				allowNull: false
			},
			onDelete: 'RESTRICT',
			onUpdate: 'RESTRICT'
		});
	};

	return Product;
};