const userRouter = require("express").Router();
const User = require("../models/User");

userRouter.get("/", (req, res) => {
	User.findAll().then((response) => {
		res.json(response);
	});
});

userRouter.post("/", (req, res) => {
	const body = req.body;
	User.create({ ...body })
		.then((response) => {
			res.json(response);
		})
		.catch((error) => {
			res.status(400).json({ error: error.errors });
		});
});

module.exports = userRouter;
