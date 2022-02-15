require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const transactionRouter = require("./controllers/transactions");
const typeRouter = require("./controllers/types");
const categoryRouter = require("./controllers/categories");
const tokenExtractor = require("./middleware/tokenExtractor");

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

app.use(express.json());
app.use(tokenExtractor);

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/types", typeRouter);
app.use("/api/categories", categoryRouter);

module.exports = app;
