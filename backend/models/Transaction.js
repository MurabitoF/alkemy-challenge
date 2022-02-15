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
	value: {
		type: DataTypes.FLOAT,
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

Transaction.belongsTo(User, { ...options, foreignKey: "userID" });

Transaction.belongsTo(Type, { ...options, foreignKey: "typeID" });

Transaction.belongsTo(Category, { ...options, foreignKey: "categoryID" });

module.exports = Transaction;
