const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Type = sequelize.define("types", {
	typeID: {
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

module.exports = Type;
