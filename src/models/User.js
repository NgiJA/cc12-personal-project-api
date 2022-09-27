module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
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
			role: {
				type: DataTypes.ENUM('USER', 'ADMIN'),
				allowNull: false,
				defaultValue: 'USER'
			}
		},
		{ underscored: true }
	);

	User.associate = (db) => {
		User.hasMany(db.Order, {
			foreignKey: {
				name: 'customerId',
				allowNull: false
			},
			onDelete: 'RESTRICT',
			onUpdate: 'RESTRICT'
		});
	};

	return User;
};
