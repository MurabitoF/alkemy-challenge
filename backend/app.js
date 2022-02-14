const express = require("express");
const sequelize = require("./utils/database");

const app = express();

sequelize
	.authenticate()
	.then(() => {
		console.log("Connected to database");
	})
	.catch((error) => {
		console.log("Error on connection to database:", error);
	});

sequelize.sync().then(() => {
	console.log("Tables synchronized");
});

module.exports = app;
