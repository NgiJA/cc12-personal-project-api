module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		'Product',
		{
			productName: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			productType: {
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
			stock: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				validate: {
					notEmpty: true
				}
			},
			sale: {
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
		{ underscored: true, paranoid: true }
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
