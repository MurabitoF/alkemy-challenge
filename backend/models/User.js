const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("users", {
	userID: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = User;
