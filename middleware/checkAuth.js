const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY) // You can also use req.body.token
        req.userData = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Not authorized"
        })
    }
}

// To use this piece of middleware, pass it as a second argument to
// the route tht requires authentication for access