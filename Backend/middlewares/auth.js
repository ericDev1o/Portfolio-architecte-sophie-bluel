const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	try {
		console.log("auth's req.headers.authorization: " + req.headers.authorization);
		const token = req.headers.authorization.split(' ')[1]
		console.log("token: " + token);
		console.log("process: " + process);
		console.log("process.env: " + process.env);
		console.log("process.env.TOKEN_SECRET: " + process.env.TOKEN_SECRET);
		// console.log("jwt.verify(token, process.env.TOKEN_SECRET): " + jwt.verify(token, process.env.TOKEN_SECRET));
		// const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		// verified OK on https://jwt.io/
		// console.log("decodedToken: " + decodedToken);
		const userId = 1; //decodedToken.userId
		req.auth = { userId }
		console.log("req.auth.userId: " + req.auth.userId);

		if (req.body.userId && req.body.userId !== userId) {
			throw 'Invalid user ID'
		} else {
			next()
		}
	} catch {
		console.error("auth.js error.");
	}
}