const transactionRouter = require("express").Router();
const Transaction = require("../models/Transaction");
const Type = require("../models/Type");
const Category = require("../models/Category");

transactionRouter.get("/", (req, res) => {
	const id = 1;
	Transaction.findAll({ where: { userID: id } }).then((transactions) => {
		res.json(transactions);
	});
});

transactionRouter.get("/:limit", (req, res) => {
	const limit = Number(req.params.limit);

	Transaction.findAll({
		where: {
			userID: 1,
		},
		limit: limit,
	}).then((transactions) => {
		res.json(transactions);
	});
});

transactionRouter.post("/", (req, res) => {
	const { details, value, date, userID, typeID, categoryID } = req.body;
	if (!(details && value && userID && typeID && categoryID)) {
		res.status(400).json({ error: "all inputs are required" });
	}
	if (value <= 0) {
		res.status(400).json({ error: "value must be greater than zero" });
	}
	Transaction.create({ details, value, date, userID, typeID, categoryID })
		.then((newTransaction) => {
			res.json(newTransaction);
		})
		.catch((error) => {
			res.status(400).json({
				error: "an error occurred while saving the data",
			});
		});
});

module.exports = transactionRouter;
