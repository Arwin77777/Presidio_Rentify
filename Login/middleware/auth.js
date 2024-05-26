const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decodedToken = jwt.verify(token, "whjg72tb6732t");
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.userType === 'seller') {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }
};

module.exports = { authenticate, authorizeAdmin };