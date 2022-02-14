const Sequelize = require("sequelize");

const sequelize = new Sequelize("alkemy_challenge", "root", "", {
	host: "localhost",
	dialect: "mysql",
});

module.exports = sequelize;
