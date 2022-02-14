const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Category = require("./Category");
const Type = require("./Type");

const Transaction = sequelize.define("transactions", {
	transactionID: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	details: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
});

const options = {
	onDelete: "RESTRICT",
	onUpdate: "CASCADE",
};

User.hasMany(Transaction);
Transaction.belongsTo(User, options);
Transaction.belongsTo(Type, options);
Transaction.belongsTo(Category, options);

module.exports = Transaction;
