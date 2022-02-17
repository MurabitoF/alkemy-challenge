const transactionRouter = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/authentication");
const Type = require("../models/Type");
const Category = require("../models/Category");

transactionRouter.get("/", auth, (req, res) => {
	const userID = req.user.userID;

	Transaction.findAll({
		include: [
			{ model: Type, as: "type", attributes: ["name"] },
			{
				model: Category,
				as: "category",
				attributes: ["name"],
			},
		],
		where: { userID: userID, active: true },
		attributes: ["transactionID", "details", "value", "date"],
		order: [["date", "DESC"]],
	}).then((transactions) => {
		res.json(transactions);
	});
});

transactionRouter.post("/", auth, (req, res) => {
	const { details, value, type, category } = req.body;
	const userID = req.user.userID;

	if (!(details && value && type)) {
		return res.status(400).json({ error: "all inputs are required" });
	}

	if (type === 2 && !category) {
		return res.status(400).json({ error: "category is required" });
	}

	if (value <= 0) {
		return res
			.status(400)
			.json({ error: "value must be greater than zero" });
	}

	Transaction.create({
		details,
		value,
		userID,
		typeID: type,
		categoryID: category || null,
	})
		.then((newTransaction) => {
			Transaction.findOne({
				include: [
					{ model: Type, as: "type", attributes: ["name"] },
					{
						model: Category,
						as: "category",
						attributes: ["name"],
					},
				],
				where: { transactionID: newTransaction.transactionID },
				attributes: ["transactionID", "details", "value", "date"],
			}).then((savedTransaction) => {
				console.log(savedTransaction);
				res.json(savedTransaction);
			});
		})

		.catch((error) => {
			res.status(400).json({
				error: "an error occurred while saving the data",
			});
		});
});

transactionRouter.put("/:id", auth, (req, res) => {
	const id = req.params.id;
	const { type, details, value, category, date } = req.body;
	Transaction.findByPk(id)
		.then((transaction) => {
			if (type !== transaction.Type.typeID) {
				return res.status(400).send("Cannot change the type");
			}
			transaction.details = details;
			transaction.value = value;
			(transaction.categoryID = category), (transaction.date = date);

			transaction.save().then((updatedTransaction) => {
				res.json(updatedTransaction);
			});
		})
		.catch((error) => {
			res.status(400).send("Transaction not found");
		});
});

transactionRouter.delete("/:id", auth, (req, res) => {
	const id = req.params.id;
	Transaction.findByPk(id)
		.then((transaction) => {
			transaction.active = false;
			transaction.save().then((deletedTransaction) => {
				res.sendStatus(204);
			});
		})
		.catch((error) => {
			res.status(400).send("Transaction not found");
		});
});

module.exports = transactionRouter;
