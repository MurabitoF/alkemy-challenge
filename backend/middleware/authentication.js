const jwt = require("jsonwebtoken");

const key = process.env.JWT_KEY;

const verifyToken = (req, res, next) => {
	const authorization = req.get("authorization");
	const token = authorization.substring(7);

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		const decoded = jwt.verify(token, key);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
};

module.exports = verifyToken;
