const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define("categories", {
	categoryID: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
});

module.exports = Category;
