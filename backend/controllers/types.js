const typeRouter = require("express").Router();
const Type = require("../models/Type");

typeRouter.get("/", (req, res) => {
	Type.findAll({ attributes: ["typeID", "name"] }).then((types) => {
		res.json({ types });
	});
});

module.exports = typeRouter;
