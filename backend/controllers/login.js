const loginRouter = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

loginRouter.post("/", (req, res) => {
	const { email, password } = req.body;

	if (!(email && password)) {
		res.status(400).send("all input are required");
	}

	User.findOne({ where: { email: email } })
		.then((user) => {
			if (user.password === password) {
				const token = jwt.sign(
					{ userID: user.userID, email: user.email },
					process.env.JWT_KEY,
					{ expiresIn: "2h" }
				);
				return res.json({ email: user.email, token });
			}
			res.status(400).send("invalid credentials");
		})
		.catch((error) => {
			res.status(400).send("invalid credentials");
		});
});

module.exports = loginRouter;
