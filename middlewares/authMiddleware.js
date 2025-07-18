const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleWare = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // check if token present and is Bearer typr
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ success: false, message: 'Unauthoriazed:Token missing' });
    }
    const token = authHeader.split(' ')[1];

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user to req
        const user = await User.findById(decoded.userId).select('-password'); // hide password
        if (!user) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Unauthorized:User not found',
                });
        }
        req.user = user;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ success: false, message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleWare;
