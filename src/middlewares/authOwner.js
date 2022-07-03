const jwt = require('jsonwebtoken');
const {SECRET} = process.env;

const verifyJWT = (request, response, next) => {
	const token = request.headers['x-access-token'];
	jwt.verify(token, SECRET, (err, decoded) => {
		if (err) {
			return response.status(401).end();
		}

		request.ownerId = decoded.ownerId;
		next();
	});
};

module.exports = {
	verifyJWT,
};
