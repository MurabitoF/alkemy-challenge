const loginRouter = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

loginRouter.post("/", (req, res) => {
	const { username, password } = req.body;

	if (!(username && password)) {
		res.status(400).json({ error: "all input are required" });
	}

	User.findOne({ where: { username: username } })
		.then((user) => {
			if (user.password === password) {
				const token = jwt.sign(
					{ userID: user.userID, username: user.username },
					process.env.JWT_KEY,
					{ expiresIn: "2h" }
				);
				res.json({ token });
			}
			res.status(400).json({ error: "invalid credentials" });
		})
		.catch((error) => {
			res.status(400).json({ error: "invalid credentials" });
		});
});

module.exports = loginRouter;
