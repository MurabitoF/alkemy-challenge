const transactionRouter = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/authentication");

transactionRouter.get("/", auth, (req, res) => {
	const userID = req.user.userID;

	Transaction.findAll({ where: { userID: userID } }).then((transactions) => {
		res.json(transactions);
	});
});

transactionRouter.get("/:limit", auth, (req, res) => {
	const limit = Number(req.params.limit);

	const userID = req.user.userID;

	Transaction.findAll({
		where: {
			userID: userID,
		},
		limit: limit,
	}).then((transactions) => {
		res.json(transactions);
	});
});

transactionRouter.post("/", auth, (req, res) => {
	const { details, value, typeID, categoryID } = req.body;
	const userID = req.user.userID;

	if (!(details && value && typeID && categoryID)) {
		res.status(400).json({ error: "all inputs are required" });
	}

	if (value <= 0) {
		res.status(400).json({ error: "value must be greater than zero" });
	}

	Transaction.create({ details, value, userID, typeID, categoryID })
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
