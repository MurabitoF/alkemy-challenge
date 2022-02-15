const categoryRouter = require("express").Router();
const Category = require("../models/Category");

categoryRouter.get("/", (req, res) => {
	Category.findAll({ attributes: ["categoryID", "name"] }).then(
		(categories) => {
			res.json(categories);
		}
	);
});

module.exports = categoryRouter;
